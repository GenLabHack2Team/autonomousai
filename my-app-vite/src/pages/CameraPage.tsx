import { Button } from '@/components/ui/button';
import React, { useState, useRef } from 'react';
import { useOpenAI } from '@/hooks/useOpenAI';
import { playAudio } from '@/lib/utils'
import { blobToBase64 } from '@/lib/utils';
import { SettingsSheet } from '@/components/settings-sheet';
import { Subtitles } from '@/components/subtitles';
import { useCamera } from '@/hooks/useCamera';
import { CameraIcon, SwitchCamera } from 'lucide-react';

const CameraComponent: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [content, setContent] = useState('')
    const { switchCamera } = useCamera(videoRef)
    const { vision, speech } = useOpenAI()
    const [isProcessing, setIsProcessing] = useState(false)
    const [isNormal, setIsNormal] = useState(true)

    const handleClick = () => {
        if (videoRef.current) {
            const canvas = document.createElement('canvas');
            canvas.width = videoRef.current.videoWidth;
            canvas.height = videoRef.current.videoHeight;
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
                canvas.toBlob(async (blob) => {
                    try {
                        if (videoRef.current == null) return;
                        setIsProcessing(true)
                        videoRef.current.pause()
                        if (blob == null) return;
                        const base64Image = await blobToBase64(blob)
                        const content = await vision(base64Image)
                        if (content == null) return;
                        setIsNormal(false)
                        setContent(content)
                        const mp3 = await speech(content)
                        await playAudio(mp3)
                    } catch (error) {
                        console.error(error)
                    } finally {
                        setIsProcessing(false)
                    }
                });
            }
        }
    }

    return (
        <div className='h-[100dvh] overflow-y-hidden'>
            <SettingsSheet />
            <Button className='absolute top-4 left-4 z-10 sm:hidden inline-flex' onClick={switchCamera} variant='outline' size='icon'><SwitchCamera className='w-4 h-4' /></Button>
            {!isNormal && <Subtitles className={'text-white absolute z-[100] py-8 px-4 mt-20 pointer-events-none backdrop-blur-md rounded m-4'} text={content} />}
            <video ref={videoRef} muted className='w-full h-full' controls={false} onClick={() => {
                if (!isNormal) {
                    setIsNormal(true)
                    videoRef.current!.play()
                }
            }} playsInline style={{ objectFit: 'cover' }} />
            <div className='absolute bottom-10 w-full flex justify-center'>
                <Button
                    onClick={handleClick}
                    variant={"secondary"}
                    className='w-[200px] z-50'
                    disabled={isProcessing}
                >
                    {isProcessing ? 'Processing...' : <CameraIcon />}
                </Button>
            </div>
        </div >
    );
};

export default CameraComponent;
