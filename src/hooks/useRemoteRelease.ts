// src/hooks/useRemoteRelease.ts
import { useState, useEffect } from 'react';

const CONTROL_URL = 'https://gist.githubusercontent.com/zod-codes/959c34f4425826204d3bfd2ee55e713b/raw/tracking-status.json'; // <--- PASTE RAW URL HERE

const TRACKING_RELEASED = 'tracking_released';
const RELEASE_TIMESTAMP = 'release_timestamp';

export function useRemoteRelease(isInterrupted: boolean) {
    const [isRemoteReleased, setIsRemoteReleased] = useState<boolean>(false);

    useEffect(() => {
        // If already released, no need to poll
        if (!isInterrupted || isRemoteReleased)  return;

        const checkStatus = async () => {
            try {
                // Cache-busting to ensure we get the fresh file
                const response = await fetch(`${CONTROL_URL}?t=${Date.now()}`, {
                    cache: 'no-store'
                });
                
                if (!response.ok) throw new Error('Network response was not ok');

                const data = await response.json();

                const release = data.released;

                const currentTime = Date.now();

                const lastSecret = localStorage.getItem(TRACKING_RELEASED);

                if (release === true && release !== lastSecret) {
                    console.log(`🎉 Remote release detected!, ${release} \t ${currentTime.toLocaleString()}`);
                    localStorage.setItem(TRACKING_RELEASED, release);
                    localStorage.setItem(RELEASE_TIMESTAMP, currentTime.toString());
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