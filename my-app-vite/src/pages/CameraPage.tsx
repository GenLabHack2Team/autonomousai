import { Button } from '@/components/ui/button';
import { CameraIcon } from 'lucide-react';
import React, { useState, useRef, useEffect } from 'react';
import { useOpenAI } from '@/hooks/useOpenAI';
import { playAudio } from '@/lib/utils'
import { blobToBase64 } from '@/lib/utils';
import { SettingsSheet } from '@/components/settings-sheet';
import { Subtitles } from '@/components/subtitles';

const CameraComponent: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const mediaStreamRef = useRef<MediaStream | null>(null);
    const [isRecording, setIsRecording] = useState(false);
    const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
    const [content, setContent] = useState('')
    let pressTimer: ReturnType<typeof setTimeout>;
    const { vision, speech } = useOpenAI()

    useEffect(() => {
        // Request access to the camera
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
                mediaStreamRef.current = stream;
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            })
            .catch(console.error);

        return () => {
            // Clean up
            mediaStreamRef.current?.getTracks().forEach(track => track.stop());
        };
    }, []);

    const handleButtonDown = () => {
        // Prepare to start recording or take photo
        pressTimer = setTimeout(() => {
            if (mediaStreamRef.current) {
                const recorder = new MediaRecorder(mediaStreamRef.current);
                setMediaRecorder(recorder);
                recorder.start();
                setIsRecording(true);
                recorder.ondataavailable = (event) => {
                    if (event.data && event.data.size > 0) {
                        console.log(event.data); // Video data
                    }
                };
            }
        }, 200); // Long press detection threshold
    };

    const handleButtonUp = () => {
        clearTimeout(pressTimer); // Cancel the timer
        if (isRecording) {
            mediaRecorder?.stop();
            setIsRecording(false);
        } else {
            // Take a photo
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
    };

    return (
        <div className='h-screen'>
            <SettingsSheet />
            <Subtitles className='absolute pointer-events-none px-8 py-32' text={content} />
            <video ref={videoRef} autoPlay muted className='w-full h-[100dvh] pointer-events-none' />
            <div className='absolute bottom-10 w-full flex justify-center'>
                <Button
                    onMouseDown={handleButtonDown}
                    onMouseUp={handleButtonUp}
                    onTouchStart={handleButtonDown}
                    onTouchEnd={handleButtonUp}
                    variant="default"
                >
                    {isRecording ? 'Recording...' : <CameraIcon />}
                </Button>
            </div>
        </div>
    );
};

export default CameraComponent;
