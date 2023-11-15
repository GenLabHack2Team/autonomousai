import { vision, speech } from '@/lib/openai'
import { WebcamCapture } from '@/components/webcam-capture'
import { useCallback } from 'react'
import { playAudio } from '@/lib/audio'

function App() {
    const handleScreenShot = useCallback(async (base64Image: string) => {
        const content = await vision(base64Image)
        if (content == null) return;
        const mp3 = await speech(content)
        playAudio(mp3)
    }, [])
    return <WebcamCapture onScreenShot={handleScreenShot} />
}

export default App
