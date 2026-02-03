import { useMemo, useEffect, useState } from "react";
import { JOURNEY_STAGES } from '../config/journeyConfig.ts';

function useJourneyStages(isActive: boolean = true) {

    const TRACKING_START_TIME = 'tracking_start_time';
    const RELEASE_TIMESTAMP = 'release_timestamp';
    const PAUSED_AT_ID = 'paused_at_id';

    const [currentDate] = useState(() => Date.now());

    const calculateDates = useMemo(() => {
        if (!isActive) return { effectiveStart: currentDate, stages: [] };

        // Get or set start time
        const storedStart = localStorage.getItem(TRACKING_START_TIME);
        const effectiveStart = storedStart ? parseInt(storedStart) : currentDate;

        // Get release info
        const releaseTimestamp = localStorage.getItem(RELEASE_TIMESTAMP);
        const pausedAtId = localStorage.getItem(PAUSED_AT_ID);

        let baseTime = effectiveStart;
        let accumulatedMs = 0;
        // let afterRelease = false;
        // let releaseOccurred = false;

        const processedStages = JOURNEY_STAGES.map((stage) => {
            // Add duration from previous stage
            accumulatedMs += stage.durationFromPrev;

            // Check if this is the stage that was paused
            const isReleasedStage = pausedAtId && stage.id === pausedAtId;

            if (isReleasedStage && releaseTimestamp) {
                // releaseOccurred = true;
                const releaseTime = parseInt(releaseTimestamp);

                // The exception stage date stays at its original time
                const stageDate = new Date(baseTime + accumulatedMs);

                // Process exception with release date
                const processedExceptions = stage.exceptions ? {
                    ...stage.exceptions,
                    release: {
                        ...stage.exceptions.release,
                        date: new Date(releaseTime + stage.exceptions.release.dateOffset),
                        location: stage.location
                    }
                } : undefined;

                // After this stage, restart timeline from release time + dateOffset
                baseTime = releaseTime + (stage.exceptions?.release.dateOffset || 0);
                accumulatedMs = 0;
                // afterRelease = true;

                return {
                    id: stage.id,
                    title: stage.title,
                    location: stage.location,
                    date: stageDate,
                    icon: stage.icon,
                    exceptions: processedExceptions
                };
            }

            // Normal stage processing
            const stageDate = new Date(baseTime + accumulatedMs);

            const processedExceptions = stage.exceptions ? {
                ...stage.exceptions,
                release: {
                    ...stage.exceptions.release,
                    date: new Date(stageDate.getTime() + stage.exceptions.release.dateOffset),
                    location: stage.location
                }
            } : undefined;

            return {
                id: stage.id,
                title: stage.title,
                location: stage.location,
                date: stageDate,
                icon: stage.icon,
                exceptions: processedExceptions
            };
        });

        return { effectiveStart, stages: processedStages };
    }, [isActive, currentDate]);

    useEffect(() => {
        if (isActive && !localStorage.getItem(TRACKING_START_TIME)) {
            localStorage.setItem(TRACKING_START_TIME, calculateDates.effectiveStart.toString());
        }
    }, [isActive, calculateDates.effectiveStart]);

    return calculateDates.stages;
}

export { useJourneyStages };