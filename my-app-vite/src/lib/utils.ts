import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onload = () => {
      const result = reader.result;
      if (typeof result === "string") {
        resolve(result);
      } else {
        reject(new Error("Blob could not be converted to a Base64 string"));
      }
    };
    reader.onerror = (error) => reject(error);
  });
}

export async function playAudio(arrayBuffer: ArrayBuffer) {
  const audioContext = new AudioContext();
  const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
  const source = audioContext.createBufferSource();
  source.buffer = audioBuffer;
  source.connect(audioContext.destination);
  source.start(0);
}

export async function getCameraStream(cameraId?: string) {
  const constraints = {
    video: cameraId ? { deviceId: { exact: cameraId } } : true,
  };

  return navigator.mediaDevices.getUserMedia(constraints);
}
