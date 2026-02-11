import { useMemo, useEffect, useState } from "react";
import { JOURNEY_STAGES, SHIPMENT_START_DATE } from '../config/journeyConfig.ts';

/**
 * Hook: useJourneyStages
 * ----------------------
 * Returns a processed list of journey stages enriched with computed
 * timestamps and any release/exception metadata derived from
 * persisted localStorage values.
 *
 * Behavior summary:
 * - Uses a fixed start date (from `SHIPMENT_START_DATE`) as the timeline origin.
 * - Reads persisted release timestamps from `localStorage` on first render
 *   to avoid visual flicker and to make the first render deterministic.
 * - Polls localStorage periodically (1s) and updates internal `releases`
 *   state only when values changed.
 * - For each stage, advances a timeline cursor by `durationFromPrev`,
 *   computes an arrival `Date`, and if a release (jump) exists, computes
 *   a release timestamp and advances the cursor to that timestamp so the
 *   following stage starts after the jump.
 *
 * @param isActive - when falsy, the hook returns an empty stage list and
 *                   exposes the fixed start time only.
 * @returns an array of processed `JourneyStage` objects with `date` and
 *          normalized `exceptions.release` timestamps where applicable.
 */
function useJourneyStages(isActive: boolean = true) {

    // Storage key used to persist the tracking start time for debugging/inspection
    const TRACKING_START_TIME = 'tracking_start_time';
    const dev = false;

    // Clear storage on first mount — intentionally destructive so runtime
    // experiments don't carry state between dev refreshes. This is synchronous
    // and runs once because of the empty dependency array.
    useEffect(() => {
        if (dev) {
            console.log("==== First Clear ====");
            localStorage.clear();
        }
    }, [dev]);

    // Convert the configured shipment start date to a numeric epoch ms value.
    // We wrap in useState with an initializer to compute it once per-hook instance.
    const [fixedStart] = useState(() => new Date(SHIPMENT_START_DATE).getTime());

    // Immediately read persisted release timestamps from localStorage so the
    // first render matches the stored state (prevents UI flicker).
    // The initializer returns a map: { [stageId]: timestamp }
    const [releases, setReleases] = useState<Record<string, number>>(() => {
        // Guard for server-side rendering environments where `window` is undefined
        if (typeof window === 'undefined') return {};

        const initial: Record<string, number> = {};

        // For each stage, attempt to read `release_timestamp_<id>` and parse it.
        JOURNEY_STAGES.forEach(stage => {
            const key = `release_timestamp_${stage.id}`; // storage key per-stage
            const val = localStorage.getItem(key); // raw string or null
            if (val) initial[stage.id] = parseInt(val); // store as number if present
            console.log(`Release timestamp for ${key}: ${val? new Date(parseInt(val)).toLocaleTimeString() : 'Nothing'},`);
        });
        
        return initial;
    });

    // Poll localStorage every second to detect updates made outside React
    // (for example, by other tabs or manual dev changes). We compute a new
    // `newReleases` map each tick and only call setReleases when the data
    // actually changed to avoid unnecessary re-renders.
    useEffect(() => {
        const syncStorageToState = () => {
            const newReleases: Record<string, number> = {};
            let hasChanges = false;

            // Build current snapshot from storage
            JOURNEY_STAGES.forEach(stage => {
                const key = `release_timestamp_${stage.id}`;
                const storedValue = localStorage.getItem(key);

                if (storedValue) {
                    const timestamp = parseInt(storedValue);
                    newReleases[stage.id] = timestamp;

                    // If the timestamp differs from memory, mark that we must update
                    if (releases[stage.id] !== timestamp) hasChanges = true;
                }
            });

            // Only update React state if either the keys count changed or some value changed
            if (hasChanges || Object.keys(releases).length !== Object.keys(newReleases).length) setReleases(newReleases);
            // console.log(releases, newReleases, hasChanges);
        };

        syncStorageToState();

        // Start the poll and return a cleanup to stop it when the component unmounts
        const interval = setInterval(syncStorageToState, 1000);
        return () => clearInterval(interval);
    }, [releases]);


    // Memoize the core date calculation so it only recomputes when inputs change.
    // It returns an object containing the effective start and the processed stages.
    const calculateDates = useMemo(() => {
        // If the hook is paused/inactive, don't perform processing — return empty list.
        if (!isActive) return { effectiveStart: fixedStart, stages: [] };

        // --- Timeline cursor logic ---
        // `timelineCursor` is the moving pointer (epoch ms) that represents the
        // current time in the simulated journey. We initialize it to the fixed start.
        let timelineCursor = fixedStart;

        // Process each configured journey stage in order, producing a computed
        // `date` for arrival and normalizing any exception release timestamps.
        const processedStages = JOURNEY_STAGES.map((stage) => {
            // Advance the cursor by the duration from the previous stage. For the
            // first stage, durationFromPrev is typically 0 so the cursor will stay
            // at the start time.
            timelineCursor += stage.durationFromPrev ?? 0;

            // Convert the numeric cursor into a Date object representing arrival.
            const arrivalDate = new Date(timelineCursor);

            // See if a persisted release timestamp exists for this stage id.
            const releaseTime = releases[stage.id];

            // Copy any exceptions structure so we can safely mutate/augment it.
            let processedExceptions= stage?.exceptions;

            // If the releaseTime exists and the stage defines a release exception,
            // compute a concrete release timestamp and advance the timeline cursor
            // so subsequent stages start after the release (the "jump").
            if (releaseTime && processedExceptions) {
                const offset = processedExceptions.release.dateOffset; // relative offset in ms (domain-specific)

                // Compute the absolute release timestamp (ms) by adding stored releaseTime and the configured offset.
                // We store the computed timestamp in the `dateOffset` field for now
                // to preserve existing shape; consider moving to `releaseTimestamp`
                // if you want to keep offsets and timestamps separate.
                processedExceptions = {
                    ...processedExceptions,
                    release: {
                        ...processedExceptions.release,
                        dateOffset: releaseTime + offset,
                    }
                };

                // Advance the timeline cursor to the departure time so later stages
                // use the jumped time as their starting point.
                timelineCursor = releaseTime + offset;
            }

            // Return the original stage augmented with the computed `date` and
            // the possibly normalized `exceptions` structure.
            return { ...stage, date: arrivalDate, exceptions: processedExceptions };
        });

        console.log("Timeline calculated:", processedStages.map(s => ({ 
            id: s.id, 
            date: s.date.toLocaleTimeString(),
            released: !!releases[s.id]
        })));

        return { effectiveStart: fixedStart, stages: processedStages };
    }, [isActive, fixedStart, releases]);

    // Persist the effective start time to localStorage when active so it can be
    // inspected or used by other scripts/tools.
    useEffect(() => {
        if (isActive) {
            localStorage.setItem(TRACKING_START_TIME, calculateDates.effectiveStart.toString());
        }
    }, [isActive, calculateDates.effectiveStart]);

    // The hook exposes only the computed stages array to consumers.
    return calculateDates.stages;
}

export { useJourneyStages };