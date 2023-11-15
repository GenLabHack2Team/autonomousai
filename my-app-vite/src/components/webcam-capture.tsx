import { useRef, useCallback } from "react";
import Webcam from "react-webcam";

const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
};

type WebcamCaptureProps = {
    onScreenShot: (base64Image: string) => void
}

const WebcamCapture = ({ onScreenShot }: WebcamCaptureProps) => {
    const webcamRef = useRef<any>(null);

    const capture = useCallback(
        () => {
            const imageSrc = webcamRef.current.getScreenshot();
            onScreenShot(imageSrc)
        },
        [webcamRef, onScreenShot]
    );

    return (
        <>
            <Webcam
                audio={false}
                height={720}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width={1280}
                videoConstraints={videoConstraints}
            />
            <button onClick={capture}>Capture photo</button>
        </>
    );
};

export { WebcamCapture }