import { Clock, Loader2, AlertCircle, CheckCircle } from 'lucide-react';
import { useJourneyStages } from '../hooks/use-journey-stages';
import { useLiveTracking } from '../hooks/use-live-tracking';
import { DateUtils } from '../utils/DateUtils';
import helper from '../utils/helpers.ts';

interface TrackingDisplayProps {
    trackingNumber: string;
    isActive: boolean;
}

const { convertTime } = helper

const TrackingDisplay = ({ trackingNumber, isActive }: TrackingDisplayProps) => {
    const journeyStages = useJourneyStages(isActive);
    const { activeStages, currentStatus, isInterrupted } = useLiveTracking(journeyStages, isActive);

    const lastStage = activeStages.length > 0 ? activeStages[activeStages.length - 1] : null;

    // Get the final delivery date from the last stage in the full journey
    const finalDeliveryStage = journeyStages.length > 0 ? journeyStages[journeyStages.length - 1] : null;
    const estimatedDeliveryDate = finalDeliveryStage?.date;

    // Check if the last stage is released
    const isReleased = lastStage?.status === 'released';

    return (
        <>
            {/* Tracking Number */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-100">
                <p className="text-sm text-gray-600 mb-1">Tracking Number:</p>
                <p className="font-semibold text-lg">{trackingNumber}</p>
            </div>

            {/* Current Status Card */}
            <div className={`${isInterrupted ? 'bg-red-50 border border-red-100' : isReleased ? 'bg-green-50 border border-green-100' : 'bg-gray-50 border border-gray-100'} shadow-sm rounded-xl p-4 mb-6 relative overflow-hidden`}>
                <div className="flex items-start space-x-3">
                    <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${isInterrupted ? 'bg-red-500' : isReleased ? 'bg-green-500' : ''}`}
                        style={{ backgroundColor: (!isInterrupted && !isReleased) ? 'var(--primary)' : undefined }}
                    >
                        {lastStage ? <lastStage.icon size={24} className="text-white" /> : <Loader2 className="animate-spin text-white" />}
                    </div>
                    <div className="flex-1">
                        <div className="mb-2">
                            <span
                                className={`px-3 py-1 rounded-full text-sm font-medium ${isInterrupted ? 'bg-red-100 text-red-700' : isReleased ? 'bg-green-100 text-green-700' : 'text-white'}`}
                                style={(!isInterrupted && !isReleased) ? { backgroundColor: 'var(--primary)', color: 'white' } : {}}
                            >
                                {currentStatus || 'Initializing...'}
                            </span>
                        </div>
                        <h4 className="mb-1 font-semibold text-gray-900">Current Location</h4>
                        <p className="text-gray-600 mb-2">{lastStage?.location || 'Processing data...'}</p>
                        <div className="flex items-center text-gray-500 text-sm">
                            <Clock size={14} className="mr-2" />
                            <span>Updated: {lastStage ? DateUtils.formatDateTime(lastStage.date) : 'Just now'}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Journey Timeline */}
            <div className="space-y-4 mb-6 relative">
                <h4 className="mb-4 font-semibold text-gray-900">Shipment History</h4>

                <div className="pl-2">
                    {activeStages.length === 0 && (
                        <div className="text-center py-8 text-gray-400 italic">
                            <Loader2 className="animate-spin mx-auto mb-2" />
                            Retrieving live data...
                        </div>
                    )}

                    {activeStages.map((stage, index) => {
                        const Icon = stage.icon;
                        const isCurrent = stage.status === 'current';
                        const isCompleted = stage.status === 'completed';
                        const isStageReleased = stage.status === 'released';
                        const isException = stage.status === 'exception';

                        return (
                            <div key={stage.id || index} className="relative pb-8 last:pb-0 animate-in slide-in-from-bottom-2 duration-500">

                                {/* Connecting Line */}
                                {index !== activeStages.length - 1 && (
                                    <div
                                        className="absolute left-[19px] top-10 w-0.5 h-full bg-gray-200"
                                        style={{
                                            backgroundColor: (isCompleted || isStageReleased) ? 'var(--primary)' : '#e5e7eb'
                                        }}
                                    />
                                )}

                                {/* Stage Item */}
                                <div className="flex items-start space-x-4 pb-8 last:pb-0">

                                    {/* Icon Bubble */}
                                    <div
                                        className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 z-10 border-4 border-white shadow-sm transition-colors duration-500 ${isException ? 'bg-red-500' :
                                            isStageReleased ? 'bg-green-500' : ''
                                            }`}
                                        style={{
                                            backgroundColor: (!isException && !isStageReleased) ?
                                                (isCurrent || isCompleted ? 'var(--primary)' : '#e5e7eb') :
                                                undefined
                                        }}
                                    >
                                        <Icon size={18} className={
                                            isCompleted || isCurrent || isException || isStageReleased ? 'text-white' : 'text-gray-400'
                                        } />
                                    </div>

                                    {/* Text Content */}
                                    <div className="flex-1 pt-1">
                                        <h4 className={`text-base font-medium ${isCurrent ? 'text-black' : 'text-gray-800'}`}>
                                            {stage.title}
                                        </h4>

                                        {/* Exception Details (Red) - Only show if status is 'exception' */}
                                        {isException && stage.exceptions && (
                                            <div className="mt-2 mb-2 bg-red-50 p-3 rounded-md border border-red-100">
                                                <div className="text-red-800 text-xs font-bold uppercase mb-1 flex items-center">
                                                    <AlertCircle size={12} className="mr-1" />
                                                    Estimated Delay: {stage.exceptions.delay}
                                                </div>
                                                <ul className="list-disc list-inside text-xs text-red-600 space-y-1">
                                                    {stage.exceptions.reasons.map((reason, i) => (
                                                        <li key={i}>{reason}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}

                                        {/* Release Details (Green) - Show if status is 'released' */}
                                        {isStageReleased && stage.exceptions?.release && (
                                            <div className="mt-2 mb-2 bg-green-50 p-3 rounded-md border border-green-100">
                                                <div className="text-green-800 text-xs font-bold uppercase mb-1 flex items-center">
                                                    <CheckCircle size={12} className="mr-1" />
                                                    {stage.exceptions.release.title}
                                                </div>
                                                <ul className="list-disc list-inside text-xs text-green-600 space-y-1">
                                                    {stage.exceptions.release.reasons?.map((reason, i) => (
                                                        <li key={i}>{reason}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}

                                        <p className="text-gray-600 text-sm mb-1">{stage.location}</p>
                                        <p className="text-gray-400 text-xs">
                                            {DateUtils.formatDateTime(stage.date)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Estimated Delivery */}
            <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                <div className="flex items-center space-x-3">
                    <Clock size={20} style={{ color: 'var(--primary)' }} />
                    <div>
                        <p className="text-sm text-gray-600">Estimated Delivery Date</p>
                        <p className="font-semibold">
                            {estimatedDeliveryDate
                                ? DateUtils.formatDateTime(estimatedDeliveryDate.getTime() + convertTime(48, 'hours', 'milliseconds'))
                                : 'Calculating...'
                            }
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default TrackingDisplay;