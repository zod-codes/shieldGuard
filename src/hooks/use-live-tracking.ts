import { useState, useEffect, useRef, useCallback } from 'react';
import { type LucideIcon } from "lucide-react";
import { useRemoteRelease } from './useRemoteRelease';
import { DateUtils } from "../utils/DateUtils.ts";

interface Release {
    title: string;
    location: string;
    dateOffset: number;
    reasons?: string[];
}

interface Exceptions {
    reasons: string[];
    delay: string;
    release: Release;
}

interface Stage {
    id: string;
    title: string;
    location: string;
    date: Date;
    durationFromPrev?: number;
    icon: LucideIcon;
    exceptions?: Exceptions;
    status?: 'completed' | 'current' | 'pending' | 'exception' | 'released';
}

export function useLiveTracking(fullSchedule: Stage[], isActive: boolean) {
    const [activeStages, setActiveStages] = useState<Stage[]>([]);
    const [currentStatus, setCurrentStatus] = useState<string>('Initializing...');
    const [isInterrupted, setIsInterrupted] = useState(false);

    const timeoutRef = useRef<number | undefined>(undefined);
    const [resumeSignal, setResumeSignal] = useState(0);

    // Call the hook - it will auto-detect the ID from localStorage
    const isRemoteReleased = useRemoteRelease(isInterrupted);

    useEffect(() => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);

        const processTimeline = () => {
            if (!isActive) return;

            const now = Date.now();

            // Get all stages that have reached their scheduled time
            const passedStages = fullSchedule.filter(stage =>
                !DateUtils.isFuture(stage.date)
            );

            console.log("Passed stages:", passedStages.map(s => s.id))

            // Build visible queue - always show all passed stages
            let visibleStages = [...passedStages];
            let currentStatusText = 'Initializing...';
            let interrupted = false;
            let nextTargetTime: number | null = null;

            // Find first UNRELEASED exception in passed stages
            const unreleasedExceptionStage = passedStages.find(s =>
                s.exceptions && localStorage.getItem(`released_${s.id}`) !== 'true'
            );

            if (unreleasedExceptionStage) {
                // STUCK at unreleased exception
                const exceptionIndex = passedStages.indexOf(unreleasedExceptionStage);
                visibleStages = passedStages.slice(0, exceptionIndex + 1);
                currentStatusText = unreleasedExceptionStage.exceptions?.reasons[0] || 'Exception';
                interrupted = true;

                // Save where we're stuck
                localStorage.setItem('paused_at_id', unreleasedExceptionStage.id);

                // Check if it just got released
                if (isRemoteReleased && localStorage.getItem(`release_${unreleasedExceptionStage.id}`) === 'true') {
                    // Change status but don't advance yet
                    currentStatusText = unreleasedExceptionStage.exceptions?.release.title || 'Released';
                    interrupted = false;

                    // Schedule resume at the release time
                    const resumeTime = unreleasedExceptionStage.exceptions?.release.dateOffset;
                    if (resumeTime) {
                        nextTargetTime = resumeTime;
                    }
                    console.log("Gotten here");                    
                };               
            } else {
                // No unreleased exceptions - check if last stage is a released exception
                const lastStage = passedStages[passedStages.length - 1];

                if (lastStage?.exceptions && localStorage.getItem(`released_${lastStage.id}`) === 'true') {
                    // Show as released and schedule next stage
                    currentStatusText = lastStage.exceptions.release.title || 'Released';
                    const resumeTime = lastStage.exceptions.release.dateOffset;
                    if (resumeTime && resumeTime > now) {
                        nextTargetTime = resumeTime;
                    } 
                } else {
                    // Normal progress
                    currentStatusText = lastStage?.title || 'Processing...';
                }

                // Clear paused state if we've moved past it
                const pausedId = localStorage.getItem('paused_at_id');
                if (pausedId && pausedId !== lastStage?.id) {
                    localStorage.removeItem('paused_at_id');
                }
            }

            // Check for journey completion
            const hasUnreleasedExceptions = passedStages.some(s => {
                if (!s.exceptions) return false;

                // Check if this exception has the "Green Light" in storage
                const isReleased = localStorage.getItem(`released_${s.id}`) === 'true';

                // If it has an exception and is NOT released, the journey is NOT complete.
                return !isReleased;
            });

            // Check for completion
            const isJourneyComplete = fullSchedule.length > 0 && passedStages.length === fullSchedule.length && !hasUnreleasedExceptions;

            if (isJourneyComplete) {
                console.log('===== 🎉 Journey Complete! Clearing Storage... =====');
                localStorage.removeItem('paused_at_id');
                localStorage.removeItem('tracking_start_time');
                setActiveStages(fullSchedule.map(s => ({ ...s, status: 'completed' as const })));
                setCurrentStatus('Delivered');
                setIsInterrupted(false);
                return;
            }

            // Update UI Statuses
            const processedStages = visibleStages.map((stage, index) => {
                const isLast = index === visibleStages.length - 1;
                let status: Stage["status"] = 'completed';

                if (isLast) {
                    if (interrupted) status = 'exception';
                    else if (stage.exceptions && localStorage.getItem(`released_${stage.id}`) === 'true') status = 'released';
                    else status = 'current';
                }

                return { ...stage, status };
            });

            setActiveStages(processedStages);
            setCurrentStatus(currentStatusText);
            setIsInterrupted(interrupted);

            // STRICT ID SYNC
            // If we are interrupted, ensure the ID is saved so useRemoteRelease knows what to check.
            if (!nextTargetTime) {
                // Find next stage that hasn't happened yet
                const futureStage = fullSchedule.find(s => DateUtils.isFuture(s.date.getTime()));
                if (futureStage) nextTargetTime = futureStage.date.getTime();
            }
    
            if (nextTargetTime && nextTargetTime > now) {
                const delay = Math.max(0, nextTargetTime - now);
                console.log(`Scheduling next update in ${(delay / 1000).toFixed(1)}s`);
                timeoutRef.current = setTimeout(processTimeline, delay + 100);
            };
        };

        processTimeline();

        const timeoutId = timeoutRef.current;
        return () => {
            if (timeoutId) clearTimeout(timeoutId);
        };
    }, [fullSchedule, isActive, resumeSignal, isRemoteReleased]);

    const resumeTracking = useCallback(() => {
        setResumeSignal(prev => prev + 1);
    }, []);

    return { activeStages, currentStatus, isInterrupted, resumeTracking };
}