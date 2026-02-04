import { Package, MapPin, Truck, CheckCircle, type LucideIcon } from 'lucide-react';
import helper from '../utils/helpers.ts';

export interface JourneyStage {
    id: string;
    title: string;
    location: string;
    durationFromPrev: number; // ms
    icon: LucideIcon;
    exceptions?: {
        reasons: string[];
        delay: string;
        release: {
            title: string;
            location: string;
            dateOffset: number; // The "Processing Time" after Gist flip
            reasons: string[];
        }
    };
}

const { calculateDelayToUSTime, convertTimeToAll } = helper;

export const JOURNEY_STAGES = [
    {
        id: "Processing",
        title: 'Processing shipment...',
        location: 'Warehouse',
        durationFromPrev: 0, 
        icon: Package
    },
    {
        id: "PickUp",
        title: 'Shipment Picked up.',
        location: 'Washington, DC',
        durationFromPrev: calculateDelayToUSTime(5, 0, 'America/New_york').milliseconds,
        icon: Package
    },
    {
        id: "marylandToll",
        title: 'Passed I-95 Fort McHenry Tunnel Toll Facility (MDTA).',
        location: 'Maryland',
        durationFromPrev: calculateDelayToUSTime(6, 45, 'America/New_york').milliseconds,
        icon: Truck
    },
    {
        id: "PennsylvaniaTurnpike",
        title: 'Entered Pennsylvania Turnpike (I-76).',
        location: 'Pennsylvania',
        durationFromPrev: calculateDelayToUSTime(9, 30, 'America/New_york').milliseconds,
        icon: Truck
    },
    {
        id: "OhioSorting",
        title: 'Arrived at Sorting Center',
        location: 'Ohio / Indiana State Line',
        durationFromPrev: calculateDelayToUSTime(14, 15, 'America/New_york').milliseconds,
        icon: MapPin,
        exceptions: {
            reasons: [
                'Joint Ohio–Indiana toll corridor verification.',
                'Review required for state delivery authorization records.',
                'Documentation flagged as incomplete at state level'
            ],
            delay: '6 to 24 hours',
            release: {
                title: 'REALESED PACREL',
                location: 'Ohio / Indiana State Line',
                dateOffset: convertTimeToAll(24, 'hours').milliseconds,
                reasons: [
                    'Verification completed',
                    'State documentation cleared',
                    'Shipment authorized to proceed'
                ],
            }
        }
    },
    {
        id: "IndianaToll",
        title: 'Entered Indiana Toll Road.',
        location: 'Indiana',
        durationFromPrev: calculateDelayToUSTime(7, 30, 'America/Indiana/Indianapolis').milliseconds,
        icon: Truck
    },
    {
        id: "IllinoisToll",
        title: 'On route to Illinois tollway',
        location: 'Illinois Tollway (I‑90)',
        durationFromPrev: calculateDelayToUSTime(10, 30, 'America/Chicago').milliseconds,
        icon: MapPin,
        exceptions: {
            reasons: [
                'High‑level local department review',
                "Verification related to:\n\tFederal tax documentation.\n\tCourt‑related shipment processing records.\n\tCompliance review required prior to interstate continuation."
            ],
            delay: '24 to 36 hours',
            release: {
                title: 'HOLD RELEASED',
                location: 'Illinois Tollway (I‑90)',
                dateOffset: convertTimeToAll(24, 'hours').milliseconds,
                reasons: [
                    'All verification checks completed',
                    'Shipment cleared for interstate continuation',
                    'Authorized for final delivery routing'
                ],
            },
        }
    },
    {
        id: "IowaTransit",
        title: 'Transit through state',
        location: 'Iowa',
        durationFromPrev: calculateDelayToUSTime(1, 45, 'America/Chicago').milliseconds,
        icon: Truck
    },
    {
        id: "NebraskaTransit",
        title: 'Transit through state',
        location: 'Nebraska',
        durationFromPrev: calculateDelayToUSTime(7, 0, 'America/Chicago').milliseconds,
        icon: Truck
    },
    {
        id: "WyomingTransit",
        title: 'Transit through state',
        location: ' Wyoming',
        durationFromPrev: calculateDelayToUSTime(14, 0, 'America/Denver').milliseconds,
        icon: Truck
    },
    {
        id: "MontanaTransit",
        title: 'Transit through state',
        location: ' Montana',
        durationFromPrev: calculateDelayToUSTime(19, 30, 'America/Denver').milliseconds,
        icon: Truck
    },
    {
        id: "IdahoExit",
        title: 'Entered Idaho',
        location: 'Idaho',
        durationFromPrev: calculateDelayToUSTime(23, 0, 'America/Denver').milliseconds,
        icon: CheckCircle
    }
] as JourneyStage[]