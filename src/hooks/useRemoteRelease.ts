// src/hooks/useRemoteRelease.ts
import { useState, useEffect } from 'react';

const CONTROL_URL = 'https://gist.githubusercontent.com/zod-codes/959c34f4425826204d3bfd2ee55e713b/raw/tracking-status.json'; // <--- PASTE RAW URL HERE

export function useRemoteRelease(isInterrupted: boolean) {
    const [isRemoteReleased, setIsRemoteReleased] = useState<boolean>(false);

    useEffect(() => {
        // Get the specific stage we are currently stuck on
        const currentPausedId = localStorage.getItem('paused_at_id');

        // If we aren't interrupted, or if THIS specific stage is already released, stop polling
        const isThisStageAlreadyReleased = currentPausedId && localStorage.getItem(`released_${currentPausedId}`) === 'true';

        // If already released, no need to poll
        if (!isInterrupted || isThisStageAlreadyReleased) {
            setIsRemoteReleased(isThisStageAlreadyReleased || false);
            return;
        };

        const checkStatus = async () => {
            try {
                // Cache-busting to ensure we get the fresh file
                const response = await fetch(`${CONTROL_URL}?t=${Date.now()}`, {
                    cache: 'no-store'
                });

                if (!response.ok) throw new Error('Network response was not ok');

                const data = await response.json();
                const release: boolean = data.released;
                const currentTime = Date.now();

                if (release === true && currentPausedId) {
                    console.log(`🎉 Remote release detected for ${currentPausedId}!`);

                    // Mark this specific stage as released
                    localStorage.setItem(`released_${currentPausedId}`, release.toString());
                    localStorage.setItem(`release_timestamp_${currentPausedId}`, currentTime.toString());
                    setIsRemoteReleased(true);
                };
            } catch (error) {
                console.error('Error polling remote status:', error);
            }
        };

        const interval = setInterval(checkStatus, 5000); // Check every 5 seconds
        return () => clearInterval(interval);

    }, [isInterrupted, isRemoteReleased]);

    return isRemoteReleased;
}