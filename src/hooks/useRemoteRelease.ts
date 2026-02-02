// src/hooks/useRemoteRelease.ts
import { useState, useEffect } from 'react';

const CONTROL_URL = 'https://gist.githubusercontent.com/zod-codes/959c34f4425826204d3bfd2ee55e713b/raw/tracking-status.json'; // <--- PASTE RAW URL HERE

export function useRemoteRelease(isInterrupted: boolean) {
    const [isRemoteReleased, setIsRemoteReleased] = useState<boolean>(
        localStorage.getItem('tracking_released') === 'true'
    );

    useEffect(() => {
        // If already released, no need to poll
        if (isRemoteReleased || !isInterrupted) return;

        const checkStatus = async () => {
            try {
                // Cache-busting to ensure we get the fresh file
                const response = await fetch(`${CONTROL_URL}?t=${Date.now()}`, {
                    cache: 'no-store'
                });
                if (!response.ok) throw new Error('Network response was not ok');

                const data = await response.json();

                console.log(response, data)

                if (data.released === true) {
                    console.log('REMOTE RELEASE SIGNAL RECEIVED');
                    localStorage.setItem('tracking_released', 'true');
                    // We also store the timestamp of WHEN we released to calculate offset
                    if (!localStorage.getItem('release_timestamp')) localStorage.setItem('release_timestamp', Date.now().toString());
                    
                    setIsRemoteReleased(true);
                }
            } catch (error) {
                console.error('Error polling remote status:', error);
            }
        };

        const interval = setInterval(checkStatus, 5000); // Check every 5 seconds
        return () => clearInterval(interval);

    }, [isInterrupted, isRemoteReleased]);

    return isRemoteReleased;
}