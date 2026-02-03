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

const { convertTimeToAll, } = helper;

export const JOURNEY_STAGES = [
    {
        id: "PickUp",
        title: 'Shipment Picked up.',
        location: 'Washington, DC',
        durationFromPrev: 0,
        icon: Package
    },
    {
        id: "marylandToll",
        title: 'Passed I-95 Fort McHenry Tunnel Toll Facility (MDTA).',
        location: 'Maryland',
        durationFromPrev: convertTimeToAll(5, 'seconds').milliseconds,
        icon: Truck
    },
    {
        id: "PennsylvaniaTurnpike",
        title: 'Entered Pennsylvania Turnpike (I-76).',
        location: 'Pennsylvania',
        durationFromPrev: convertTimeToAll(18, 'seconds').milliseconds,
        icon: Truck
    },
    {
        id: "OhioSorting",
        title: 'Arrived at Sorting Center',
        location: 'Ohio / Indiana State Line',
        durationFromPrev: convertTimeToAll(15, 'seconds').milliseconds,
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
                dateOffset: convertTimeToAll(15, 'seconds').milliseconds,
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
        durationFromPrev: convertTimeToAll(25, 'seconds').milliseconds,
        icon: Truck
    },
    {
        id: "IllinoisToll",
        title: 'On route to Illinois tollway',
        location: 'Illinois Tollway (I‑90)',
        durationFromPrev: convertTimeToAll(30, 'seconds').milliseconds,
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
                dateOffset: convertTimeToAll(30, 'seconds').milliseconds,
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
        durationFromPrev: convertTimeToAll(20, 'seconds').milliseconds,
        icon: Truck
    },
    {
        id: "NebraskaTransit",
        title: 'Transit through state',
        location: 'Nebraska',
        durationFromPrev: convertTimeToAll(8, 'seconds').milliseconds,
        icon: Truck
    },
    {
        id: "WyomingTransit",
        title: 'Transit through state',
        location: ' Wyoming',
        durationFromPrev: convertTimeToAll(18, 'seconds').milliseconds,
        icon: Truck
    },
    {
        id: "MontanaTransit",
        title: 'Transit through state',
        location: ' Montana',
        durationFromPrev: convertTimeToAll(10, 'seconds').milliseconds,
        icon: Truck
    },
    {
        id: "IdahoExit",
        title: 'Entered Idaho',
        location: 'Idaho',
        durationFromPrev: convertTimeToAll(7, 'seconds').milliseconds,
        icon: CheckCircle
    }
] as JourneyStage[]