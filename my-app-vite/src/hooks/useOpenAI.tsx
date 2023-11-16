import OpenAI from "openai";
import { useAppContext } from "@/context/appContext";
import { useRef, useEffect } from "react";
import prompts from '@/lib/prompts.json'

type UseOpenAIProps = {
    language: Language
}

const useOpenAI = ({ language }: UseOpenAIProps) => {
    const { apiKey } = useAppContext()
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
        if (language === "") {
            throw new Error('Language is not selected.')
        };
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
                    content: prompts[language]
                },
            ],
        });
        return response.choices[0].message.content;
    }

    async function speech(text: string) {
        const mp3 = await openaiRef.current.audio.speech.create({
            model: "tts-1",
            voice: "alloy",
            input: text,
        });
        const buffer = await mp3.arrayBuffer();
        return buffer;
    }

    return { vision, speech }
}

export { useOpenAI }