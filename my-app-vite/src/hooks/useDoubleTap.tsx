import { useState, useEffect } from 'react';

function useDoubleTap(ref: React.RefObject<HTMLElement>, onDoubleTap: (event: React.TouchEvent) => void) {
    const [lastTap, setLastTap] = useState(0);
    const doubleTapDelay = 300;
    const elementRef = ref

    useEffect(() => {
        const element = elementRef.current;
        if (!element) return;

        function handleDoubleTap(event: React.TouchEvent) {
            const currentTime = new Date().getTime();
            const tapLength = currentTime - lastTap;
            if (tapLength < doubleTapDelay && tapLength > 0) {
                onDoubleTap(event);
            }
            setLastTap(currentTime);
        }

        element.addEventListener('touchstart', handleDoubleTap as any);

        return () => {
            element.removeEventListener('touchstart', handleDoubleTap as any);
        };
    }, [lastTap, onDoubleTap]);

    return elementRef;
}

export { useDoubleTap };
