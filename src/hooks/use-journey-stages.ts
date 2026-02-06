import { useMemo, useEffect, useState } from "react";
import { JOURNEY_STAGES, SHIPMENT_START_DATE } from '../config/journeyConfig.ts';

function useJourneyStages(isActive: boolean = true) {

    const TRACKING_START_TIME = 'tracking_start_time';

    // This ensures every refresh is a "clean slate"
    useEffect(() => {
        localStorage.clear();
    }, []);

    // Use the hardcoded start date as the "Now" reference
    const [fixedStart] = useState(() => new Date(SHIPMENT_START_DATE).getTime());

    // 2. REAL STATE: Map specific stage IDs to their release timestamps
    // Example: { "OhioSorting": 1738590000000, "IllinoisToll": 1738599000000 }
    const [releases, setReleases] = useState<Record<string, number>>({});

    // Poll for reactivity (so the UI updates instantly when storage changes)
    useEffect(() => {
        const syncStorageToState = () => {
            const newReleases: Record<string, number> = {};            
            let hasChanges = false;

            JOURNEY_STAGES.forEach( stage => {
                const key = `release_timestamp_${stage.id}`;
                const storedValue = localStorage.getItem(key);

                if (storedValue) {
                    const timestamp = parseInt(storedValue);
                    newReleases[stage.id] = timestamp

                    // Check if this is new/different from the current state
                    if (releases[stage.id] !== timestamp) hasChanges = true;
                }
            });

            // Only update state if data actually changed (prevents re-renders)
            if (hasChanges || Object.keys(newReleases).length !== Object.keys(newReleases).length) setReleases(newReleases);
        };

        const interval = setInterval(syncStorageToState, 500);
        return () => clearInterval(interval);
    }, [releases]);


    const calculateDates = useMemo(() => {
        if (!isActive) return { effectiveStart: fixedStart, stages: [] };

        // Get or set start time
        const storedStart = localStorage.getItem(TRACKING_START_TIME);
        let currentBaseTime = storedStart ? parseInt(storedStart) : fixedStart;

        let accumulatedMs = 0;

        const processedStages = JOURNEY_STAGES.map((stage, index) => {
            if (index > 0) accumulatedMs += stage.durationFromPrev;

            // USE THE STATE (Not LocalStorage directly)
            const releaseTime = releases[stage.id];

            // Check if we hit the release point for a paused stage
            if (releaseTime) {
                const offset = stage.exceptions?.release.dateOffset || 0;

                // The new base becomes: (The moment of release) + (Processing delay) - (Time spent getting here)
                currentBaseTime = releaseTime + offset - accumulatedMs;

                const processedExceptions = stage.exceptions ? {
                    ...stage.exceptions,
                    release: {
                        ...stage.exceptions.release,
                        date: new Date(releaseTime + offset),
                        location: stage.location
                    }
                } : undefined;

                return { ...stage, date: new Date(currentBaseTime + accumulatedMs), exceptions: processedExceptions };
            }

            // Normal stage processing
            const stageDate = new Date(currentBaseTime + accumulatedMs);
            return { ...stage, date: stageDate };
        });

        return { effectiveStart: currentBaseTime, stages: processedStages };
    }, [isActive, fixedStart, releases]);

    useEffect(() => {
        if (isActive && !localStorage.getItem(TRACKING_START_TIME)) {
            localStorage.setItem(TRACKING_START_TIME, fixedStart.toString());
        }
    }, [isActive, fixedStart]);

    return calculateDates.stages;
}

export { useJourneyStages };