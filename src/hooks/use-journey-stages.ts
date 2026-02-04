import { useMemo, useEffect, useState } from "react";
import { JOURNEY_STAGES, SHIPMENT_START_DATE } from '../config/journeyConfig.ts';

function useJourneyStages(isActive: boolean = true) {

    const TRACKING_START_TIME = 'tracking_start_time';
    const RELEASE_TIMESTAMP = 'release_timestamp';
    const PAUSED_AT_ID = 'paused_at_id';

    // This ensures every refresh is a "clean slate"
    useEffect(() => {
        localStorage.clear();
    }, []);

    // Use the hardcoded start date as the "Now" reference
    const [fixedStart] = useState(() => new Date(SHIPMENT_START_DATE).getTime());

    const [journeyState, setJourneyState] = useState(() => ({
        releaseTime: localStorage.getItem(RELEASE_TIMESTAMP),
        pausedId: localStorage.getItem(PAUSED_AT_ID)
    }));

    // Poll for changes to the release timestamp in localStorage
    useEffect(() => {
        const interval = setInterval(() => {
            const r = localStorage.getItem(RELEASE_TIMESTAMP);
            const p = localStorage.getItem(PAUSED_AT_ID);
            if (r !== journeyState.releaseTime || p !== journeyState.pausedId) {
                setJourneyState({ releaseTime: r, pausedId: p });
            }
        }, 500);
        return () => clearInterval(interval);
    }, [journeyState]);


    const calculateDates = useMemo(() => {
        if (!isActive) return { effectiveStart: fixedStart, stages: [] };

        // Get or set start time
        const storedStart = localStorage.getItem(TRACKING_START_TIME);
        let currentBaseTime = storedStart ? parseInt(storedStart) : fixedStart;

        const { releaseTime, pausedId } = journeyState;

        let accumulatedMs = 0;

        const processedStages = JOURNEY_STAGES.map((stage) => {
            accumulatedMs += stage.durationFromPrev;

            // Check if we hit the release point for a paused stage
            if (pausedId && stage.id === pausedId && releaseTime) {
                const rTime = parseInt(releaseTime);
                const stageArrivalDate = new Date(currentBaseTime + accumulatedMs);

                const offset = stage.exceptions?.release.dateOffset || 0;

                const processedExceptions = stage.exceptions ? {
                    ...stage.exceptions,
                    release: {
                        ...stage.exceptions.release,
                        date: new Date(rTime + offset),
                        location: stage.location
                    }
                } : undefined;

                // CRITICAL: Shift the timeline for all FOLLOWING stages
                // The new base becomes: (The moment of release) + (Processing delay) - (Time spent getting here)
                currentBaseTime = rTime + offset - accumulatedMs;

                return { ...stage, date: stageArrivalDate, exceptions: processedExceptions };
            }

            // Normal stage processing
            const stageDate = new Date(currentBaseTime + accumulatedMs);
            return { ...stage, date: stageDate };
        });

        return { effectiveStart: currentBaseTime, stages: processedStages };
    }, [isActive, fixedStart, journeyState]);

    useEffect(() => {
        if (isActive && !localStorage.getItem(TRACKING_START_TIME)) {
            localStorage.setItem(TRACKING_START_TIME, fixedStart.toString());
        }
    }, [isActive, fixedStart]);

    return calculateDates.stages;
}

export { useJourneyStages };