import { useState, useEffect, useRef, useCallback } from 'react';
import { type LucideIcon } from "lucide-react";
import { useRemoteRelease } from './useRemoteRelease';

interface Release {
    title: string;
    location: string;
    date: Date;  // Changed from dateOffset
    reasons?: string[];
}

interface Exceptions {
    reasons: string[];
    delay: string;
    release: Release;
}

// This is the interface for stages AFTER processing by useJourneyStages
interface Stage {
    id: string;
    title: string;
    location: string;
    date: Date;  // This is what useJourneyStages returns
    icon: LucideIcon;
    exceptions?: Exceptions;
    status?: 'completed' | 'current' | 'pending' | 'exception' | 'released';
}

export function useLiveTracking(fullSchedule: Stage[], isActive: boolean) {
    const [activeStages, setActiveStages] = useState<Stage[]>([]);
    const [currentStatus, setCurrentStatus] = useState<string>('Initializing...');
    const [isInterrupted, setIsInterrupted] = useState(false);

    const timeoutRef = useRef<number | undefined>(undefined);

    // The Signal: Changing this number forces the effect to re-run
    const [resumeSignal, setResumeSignal] = useState(0);

    // Call the remote hook
    const isRemoteReleased = useRemoteRelease(isInterrupted);

    useEffect(() => {
        // CLEAR EXISTING TIMERS immediately upon re-run
        if (timeoutRef.current) clearTimeout(timeoutRef.current);

        const processTimeline = () => {
            if (!isActive) return;

            const now = new Date().getTime();

            /* --- DETERMINE CURRENT STATE --- */
            // Filter stages that have theoretically passed based on time
            const passedStages = fullSchedule.filter(stage =>
                new Date(stage.date).getTime() <= now
            );

            const exceptionIndex = passedStages.findIndex(s => s.exceptions);

            const { visibleStages, statusText, interrupted, releaseTime } =
                exceptionIndex !== -1
                    ? (() => {
                        const exceptionStage = passedStages[exceptionIndex];
                        const release = exceptionStage.exceptions?.release;

                        // The hold is released if the Gist is true OR we manually forced it
                        // (Note: resumeSignal forces this whole function to re-evaluate)
                        return isRemoteReleased
                            ? {
                                visibleStages: passedStages,
                                statusText: release?.title || 'Released',
                                interrupted: false,
                                releaseTime: null,
                            }
                            : {
                                visibleStages: passedStages.slice(0, exceptionIndex + 1),
                                statusText: exceptionStage.exceptions?.reasons[0] || 'Exception',
                                interrupted: true,
                                releaseTime: release?.date || null
                            };
                    })()
                    : {
                        visibleStages: passedStages,
                        statusText: passedStages[passedStages.length - 1].title || 'Pending...',
                        interrupted: false,
                        releaseTime: null,
                    }

            // Map status for UI
            const processedStages = visibleStages.map((stage, index) => {
                const isLast = index === visibleStages.length - 1;
                let status: Stage["status"] = 'completed';

                if (isLast) {
                    if (interrupted && !isRemoteReleased) status = 'exception';
                    else if (stage.exceptions && isRemoteReleased) status = 'released';
                    else status = 'current';
                }

                return { ...stage, status };
            });

            // Update State (only if length changed to prevent flicker)
            setActiveStages(processedStages);
            setCurrentStatus(statusText);
            setIsInterrupted(interrupted);

            // Triggers an interruption, it saves the ID of the stage that caused the interruption.
            if (interrupted && !localStorage.getItem('paused_at_id')) localStorage.setItem('paused_at_id', visibleStages[visibleStages.length - 1].id);

            // 4. Scheduling Logic
            const futureStage = fullSchedule.find(s => new Date(s.date).getTime() > now);
            const target = releaseTime || (futureStage ? new Date(futureStage.date) : null);

            if (target) {
                const delay = Math.max(0, target.getTime() - now);
                timeoutRef.current = setTimeout(processTimeline, delay + 20);
            };
        };

        // Run immediately on mount or when schedule changes
        processTimeline();

        // Capture the current timeout id for cleanup
        const timeoutId = timeoutRef.current;

        // Cleanup: Clear timeout if component unmounts or schedule changes
        return () => {
            if (timeoutId) clearTimeout(timeoutId);
        };
    }, [fullSchedule, isActive, resumeSignal, isRemoteReleased]);

    // Expose a way to manually trigger re-processing when ref changes
    const resumeTracking = useCallback(() => {
        console.log('=== Manual Resume Signal Triggered ===');
        setResumeSignal(prev => prev + 1);
    }, [])

    return { activeStages, currentStatus, isInterrupted, resumeTracking };
}