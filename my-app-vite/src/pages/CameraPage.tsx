import { Button } from '@/components/ui/button';
import React, { useState, useRef, useCallback } from 'react';
import { useOpenAI } from '@/hooks/useOpenAI';
import { playAudio } from '@/lib/utils'
import { blobToBase64 } from '@/lib/utils';
import { SettingsSheet } from '@/components/settings-sheet';
import { Subtitles } from '@/components/subtitles';
import { useCamera } from '@/hooks/useCamera';
import { useDoubleTap } from '@/hooks/useDoubleTap';

const CameraComponent: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement>(null);

    const [content, setContent] = useState('')
    const { switchCamera } = useCamera(videoRef)
    useDoubleTap(videoRef, switchCamera)

    const { vision, speech } = useOpenAI()

    const handleClick = () => {
        if (videoRef.current) {
            const canvas = document.createElement('canvas');
            canvas.width = videoRef.current.videoWidth;
            canvas.height = videoRef.current.videoHeight;
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
                canvas.toBlob(async (blob) => {
                    console.log(blob);
                    if (blob == null) return;
                    const base64Image = await blobToBase64(blob)
                    const content = await vision(base64Image)
                    if (content == null) return;
                    setContent(content)
                    const mp3 = await speech(content)
                    playAudio(mp3)
                });
            }
        }
    }

    return (
        <div className='h-screen overflow-y-hidden'>
            <SettingsSheet />
            <Subtitles className='absolute p-8 pointer-events-none' text={content} />
            <video ref={videoRef} muted className='w-full h-full' controls={false} playsInline style={{ objectFit: 'cover' }} />
            <div className='absolute bottom-10 w-full flex justify-center'>
                <Button
                    onClick={handleClick}
                    variant={"secondary"}
                    className='w-[200px]'
                >
                </Button>
            </div>
        </div >
    );
};

export default CameraComponent;
