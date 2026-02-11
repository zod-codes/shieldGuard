import { Package, MapPin, Truck, CheckCircle, type LucideIcon } from 'lucide-react';
import helper from '../utils/helpers.ts';

export interface JourneyStage {
    id: string;
    title: string;
    location: string;
    durationFromPrev?: number; // ms
    icon: LucideIcon;
    exceptions?: {
        reasons: string[];
        delay: string;
        release: {
            title: string;
            location: string;
            dateOffset: number; 
            reasons: string[];
        }
    };
}

const { convertTimeToAll } = helper;

// SET START TIME: Feb 4, 2026, 2:28 AM ET (UTC-5)
// This ISO string ensures the math works globally.
export const SHIPMENT_START_DATE = "2026-02-04T02:28:00-05:00";

export const JOURNEY_STAGES = [
    {
        id: "Processing",
        title: 'Processing shipment...',
        location: 'Warehouse',
        // Starts exactly at 2:28 AM ET
        durationFromPrev: 0, 
        icon: Package
    },
    {
        id: "PickUp",
        title: 'Shipment Picked up.',
        location: 'Washington, DC',
        // Target: 5:00 AM ET (2 hours 32 mins after Processing)
        durationFromPrev: convertTimeToAll(152, 'minutes').milliseconds,
        icon: Truck
    },
    {
        id: "marylandToll",
        title: 'Passed I-95 Fort McHenry Tunnel Toll Facility (MDTA).',
        location: 'Maryland',
        // Target: 6:45 AM ET (1 hour 45 mins after Pickup)
        durationFromPrev: convertTimeToAll(105, 'minutes').milliseconds,
        icon: Truck
    },
    {
        id: "PennsylvaniaTurnpike",
        title: 'Entered Pennsylvania Turnpike (I-76).',
        location: 'Pennsylvania',
        // Target: 9:30 AM ET (2 hours 45 mins after Maryland)
        durationFromPrev: convertTimeToAll(165, 'minutes').milliseconds,
        icon: Truck
    },
    {
        id: "OhioSorting",
        title: 'Arrived at Sorting Center',
        location: 'Ohio / Indiana State Line',
        // Target: 2:15 PM ET (4 hours 45 mins after PA)
        durationFromPrev: convertTimeToAll(285, 'minutes').milliseconds,
        icon: MapPin,
        exceptions: {
            reasons: [
                'Joint Ohio–Indiana toll corridor verification.',
                'Review required for state delivery authorization records.',
                'Documentation flagged as incomplete at state level'
            ],
            delay: '6 to 24 hours',
            release: {
                title: 'RELEASED PARCEL',
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
        // Target: 7:30 PM ET (5 hours 15 mins after Ohio)
        durationFromPrev: convertTimeToAll(315, 'minutes').milliseconds,
        icon: Truck
    },
    {
        id: "IllinoisToll",
        title: 'On route to Illinois tollway',
        location: 'Illinois Tollway (I‑90)',
        // Target: 10:30 PM ET (3 hours after Indiana)
        durationFromPrev: convertTimeToAll(180, 'minutes').milliseconds,
        icon: MapPin,
        exceptions: {
            reasons: [
                'High‑level local department review',
                'Verification related to federal tax documentation.'
            ],
            delay: '24 to 36 hours',
            release: {
                title: 'HOLD RELEASED',
                location: 'Illinois Tollway (I‑90)',
                dateOffset: convertTimeToAll(24, 'hours').milliseconds,
                reasons: [
                    'All verification checks completed',
                    'Shipment cleared for interstate continuation'
                ],
            },
        }
    },
    {
        id: "IowaTransit",
        title: 'Transit through state',
        location: 'Iowa',
        // Target: 1:45 AM ET Next Day (3 hours 15 mins after Illinois)
        durationFromPrev: convertTimeToAll(195, 'minutes').milliseconds,
        icon: Truck
    },
    {
        id: "NebraskaTransit",
        title: 'Transit through state',
        location: 'Nebraska',
        // Target: 7:00 AM ET Next Day (5 hours 15 mins after Iowa)
        durationFromPrev: convertTimeToAll(315, 'minutes').milliseconds,
        icon: Truck
    },
    {
        id: "WyomingTransit",
        title: 'Transit through state',
        location: ' Wyoming',
        // Target: 2:00 PM ET Next Day (7 hours after Nebraska)
        durationFromPrev: convertTimeToAll(420, 'minutes').milliseconds,
        icon: Truck
    },
    {
        id: "MontanaTransit",
        title: 'Transit through state',
        location: ' Montana',
        // Target: 7:30 PM ET Next Day (5 hours 30 mins after Wyoming)
        durationFromPrev: convertTimeToAll(330, 'minutes').milliseconds,
        icon: Truck
    },
    {
        id: "IdahoExit",
        title: 'Entered Idaho',
        location: 'Idaho',
        // Target: 11:00 PM ET Next Day (3 hours 30 mins after Montana)
        durationFromPrev: convertTimeToAll(210, 'minutes').milliseconds,
        icon: CheckCircle
    }
] as JourneyStage[];