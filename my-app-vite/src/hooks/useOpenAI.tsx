import OpenAI from "openai";
import { useAppContext } from "@/context/appContext";
import { useRef, useEffect } from "react";
import basePrompts from '@/lib/base-prompts.json'
import charactorPrompts from '@/lib/charactor-prompts.json'
import wordsPrompts from '@/lib/words-prompts.json'

const voices: { [key: string]: 'alloy' | 'echo' | 'fable' | 'onyx' | 'nova' | 'shimmer' } = {
    "casual-neutral": 'fable',
    "casual-male": 'echo',
    "casual-female": 'nova',
    "formal": 'shimmer'
}

const createCharatorPrompt = (language: Language, teacher: Teacher) => {
    if (teacher.startsWith('casual')) {
        return charactorPrompts[language].casual
    }
    return ''
}

const useOpenAI = () => {
    const { apiKey, selectedLanguage, selectedTeacher, selectedMode } = useAppContext()
    const openaiRef = useRef<OpenAI>(new OpenAI({
        apiKey: apiKey,
        dangerouslyAllowBrowser: true,
    }));

    useEffect(() => {
        openaiRef.current = new OpenAI({
            apiKey: apiKey,
            dangerouslyAllowBrowser: true,
        });
    }, [apiKey]);

    async function vision(base64Image: string) {
        const response = await openaiRef.current.chat.completions.create({
            model: "gpt-4-vision-preview",
            max_tokens: 1024,
            messages: [
                {
                    role: "user",
                    content: [
                        {
                            type: "image_url",
                            image_url: {
                                url: base64Image,
                                detail: "low",
                            },
                        },
                    ],
                },
                {
                    role: "system", // https://community.openai.com/t/the-system-role-how-it-influences-the-chat-behavior/87353/8
                    content: basePrompts[selectedMode ?? 'long'][selectedLanguage] + createCharatorPrompt(selectedLanguage, selectedTeacher)
                },
            ],
        });
        return response.choices[0].message.content;
    }

    async function extract(text: string) {
        const response = await openaiRef.current.chat.completions.create({
            model: "gpt-4-1106-preview",
            max_tokens: 512,
            response_format: { type: "json_object" },
            messages: [
                {
                    role: "user",
                    content: [
                        { type: "text", "text": text }
                    ],
                },
                {
                    role: "system", // https://community.openai.com/t/the-system-role-how-it-influences-the-chat-behavior/87353/8
                    content: wordsPrompts[selectedLanguage]
                },
            ],
        });
        return response.choices[0].message.content;
    }

    async function speech(text: string) {
        const mp3 = await openaiRef.current.audio.speech.create({
            model: "tts-1",
            voice: voices[selectedTeacher],
            input: text,
        });
        const buffer = await mp3.arrayBuffer();
        return buffer;
    }

    return { vision, speech, extract }
}

export { useOpenAI }