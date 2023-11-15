import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: "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",
  dangerouslyAllowBrowser: true,
});

export async function vision(base64Image: string) {
  const response = await openai.chat.completions.create({
    model: "gpt-4-vision-preview",
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: "What’s in this image?" },
          {
            type: "image_url",
            image_url: {
              url: base64Image,
              detail: "low",
            },
          },
        ],
      },
    ],
  });
  return response.choices[0].message.content;
}

export async function speech(text: string) {
  const mp3 = await openai.audio.speech.create({
    model: "tts-1",
    voice: "alloy",
    input: text,
  });
  const buffer = await mp3.arrayBuffer();
  return buffer;
}
