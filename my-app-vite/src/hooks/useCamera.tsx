import { getCameraStream } from "@/lib/utils";
import { RefObject, useEffect, useRef } from "react";

const useCamera = (videoRef: RefObject<HTMLVideoElement>) => {
    const mediaStreamRef = useRef<MediaStream | null>(null);

    useEffect(() => {
        const setVideoStream = async () => {
            const videoStream = await getCameraStream()
            mediaStreamRef.current = videoStream
            if (videoRef.current) {
                videoRef.current.srcObject = videoStream
                await videoRef.current?.play()
            }
        }
        setVideoStream().catch(console.error)

        return () => {
            if (mediaStreamRef.current) {
                mediaStreamRef.current.getTracks().forEach(track => track.stop());
            }
        }
    }, [])

    async function switchCamera() {
        try {
            const devices = await navigator.mediaDevices.enumerateDevices();
            const videoDevices = devices.filter(device => device.kind === 'videoinput');

            console.log(videoDevices)

            if (videoDevices.length > 0) {
                const currentCameraId = mediaStreamRef.current?.getVideoTracks()[0].getSettings().deviceId;
                const newCameraId = videoDevices.find(device => device.deviceId !== currentCameraId)?.deviceId;
                if (newCameraId) {
                    mediaStreamRef.current?.getTracks().forEach(track => track.stop());
                    mediaStreamRef.current = await getCameraStream(newCameraId);

                    if (videoRef.current && mediaStreamRef.current) {
                        videoRef.current.srcObject = mediaStreamRef.current;
                        await videoRef.current.play();
                    }
                }
            }
        } catch (error) {
            console.error(error);
        }
    }

    return { switchCamera }
}

export { useCamera }