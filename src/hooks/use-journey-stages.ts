import { useMemo, useEffect, useState } from "react";
import { JOURNEY_STAGES } from '../config/journeyConfig.ts';


function useJourneyStages(isActive: boolean = true) {

    const TRACKING_START_TIME = 'tracking_start_time';
    const RELEASE_TIMESTAMP = 'release_timestamp';
    // We need to know WHICH exception paused us. 
    // In a real app, you'd save this ID in LocalStorage when the error hits.
    // For this demo, we'll auto-detect the stage with the exception.
    const ACTIVE_EXCEPTION_ID = localStorage.getItem('paused_at_id') || null;

    // Capture the moment the hook is first used
    const [currentDate] = useState(() => Date.now());

    const { effectiveStart, totalPauseDuration } = useMemo(() => {
        if (!isActive) return { effectiveStart: currentDate, totalPauseDuration: 0 };

        // Persistent Start Time
        // If we have a stored start time, use it. Otherwise, set NOW as start.
        const storedStart = localStorage.getItem(TRACKING_START_TIME);

        const effectiveStart = storedStart ? parseInt(storedStart) : currentDate;

        // DYNAMIC CALCULATION: We loop the imported config to find the time
        let timeToException = 0;
        let found = false;

        for (const stage of JOURNEY_STAGES) {
            timeToException += stage.durationFromPrev;
            if (ACTIVE_EXCEPTION_ID && stage.id === ACTIVE_EXCEPTION_ID) {
                found = true;
                break;
            };
        }

        /* --- Calculate Pause Offset --- */
        // Logic: You need to know WHEN the exception happened to calc the difference.
        const exceptionScheduledTime = found ? (effectiveStart + timeToException) : 0;

        // If we were paused, we need to "freeze" the timeline during that pause.
        const releaseTime = localStorage.getItem(RELEASE_TIMESTAMP);

        // The time we "lost" waiting for you to click the button
        const totalPauseDuration = (releaseTime && found) ? Math.max(0, parseInt(releaseTime) - exceptionScheduledTime) : 0;

        return { effectiveStart, totalPauseDuration }
    }, [isActive, ACTIVE_EXCEPTION_ID, currentDate]);


    useEffect(() => {
        if (isActive && !localStorage.getItem(TRACKING_START_TIME)) localStorage.setItem(TRACKING_START_TIME, effectiveStart.toString());
    }, [isActive, effectiveStart]);


    return useMemo(() => {
        if (!isActive) return [];

        const baseTime = effectiveStart + totalPauseDuration;
        let accumulatedMs = 0;

        // MAP THE CONFIG (This generates the array automatically)
        return JOURNEY_STAGES.map(stage => {
            accumulatedMs += stage.durationFromPrev;
            const stageArrivalDate = new Date(baseTime + accumulatedMs);

            // Handle exception date math dynamically
            let processedExceptions = undefined;
            if (stage.exceptions) {
                // If this stage has an exception, its "Release" happens after the offset
                const releaseDate = new Date(stageArrivalDate.getTime() + stage.exceptions.release.dateOffset);

                processedExceptions = {
                    ...stage.exceptions,
                    release: {
                        ...stage.exceptions.release,
                        date: releaseDate,
                    }
                };

                // CRITICAL: If the hold has been released, all FOLLOWING stages must be pushed back by this processing offset as well.
                const isThisStageReleased = localStorage.getItem('tracking_released') === 'true' &&
                    ACTIVE_EXCEPTION_ID === stage.id;

                if (isThisStageReleased) {
                    accumulatedMs += stage.exceptions.release.dateOffset;
                }
            }

            return {
                ...stage,
                date: stageArrivalDate,
                exceptions: processedExceptions
            };
        });
    }, [isActive, effectiveStart, totalPauseDuration, ACTIVE_EXCEPTION_ID]);
};

export { useJourneyStages };