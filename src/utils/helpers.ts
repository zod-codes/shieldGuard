type TimeUnit = 'hours' | 'minutes' | 'seconds' | 'milliseconds';

interface TimeConversion {
  milliseconds: number;
  seconds: number;
  minutes: number;
  hours: number;
  days: number;
}

interface TimeDelayObject {
  milliseconds: number;
  hours: number;
  arrivalLocal: Date;
}

interface HelperFunctions {
  generateTrackingNumberWithTimestamp: () => string;
  convertTime: (value: number, from: TimeUnit, to: TimeUnit) => number;
  convertTimeToAll: (value: number, from: TimeUnit) => TimeConversion;
  calculateDelayToUSTime: (targetHour: number, targetMinute: number, timeZone: string) => TimeDelayObject;
}

const helper: HelperFunctions = {} as HelperFunctions;

// With timestamp for uniqueness
helper.generateTrackingNumberWithTimestamp = (): string => {
  const prefix = 'FD';
  const timestamp = Date.now().toString(36).toUpperCase(); // Base36 timestamp
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  
  return `${prefix}-${timestamp}-${random}`;
  // Returns: "FD-M7K3P2-8HX9K2"
}

/**
 * Convert time from one unit to another
 */
helper.convertTime = (value: number, from: TimeUnit, to: TimeUnit): number => {
  // Convert to milliseconds first
  const toMilliseconds: Record<TimeUnit, number> = {
    milliseconds: 1,
    seconds: 1000,
    minutes: 60 * 1000,
    hours: 60 * 60 * 1000,
  };

  const milliseconds = value * toMilliseconds[from];
  return milliseconds / toMilliseconds[to];
}

/**
 * Convert time to all units
 */
helper.convertTimeToAll = (value: number, from: TimeUnit): TimeConversion => {
  const ms = helper.convertTime(value, from, 'milliseconds');
  
  return {
    milliseconds: ms,
    seconds: ms / 1000,
    minutes: ms / (60 * 1000),
    hours: ms / (60 * 60 * 1000),
    days: ms / (24 * 60 * 60 * 1000),
  };
}

helper.calculateDelayToUSTime = (targetHour: number, targetMinute: number = 0, timeZone: string = 'America/New_York') => {
    const now = new Date();

    // 1. Get the current time in the US TimeZone as a string
    // e.g., "2/4/2026, 6:00:00 PM"
    const usDateString = now.toLocaleString('en-US', { timeZone });

    // 2. Create a Date object that represents "NOW" but in the context of the US time
    // This allows us to manipulate the hours easily
    const targetDate = new Date(usDateString);

    // 3. Set the target hour (e.g., 5 AM)
    targetDate.setHours(targetHour, targetMinute, 0, 0);

    // 4. Compare: If the target hour (5 AM) has already passed in the US today,
    // we must mean 5 AM "Tomorrow".
    // We compare the timestamps created from the locale string
    const nowInUS_Timestamp = new Date(usDateString).getTime();
    
    if (targetDate.getTime() <= nowInUS_Timestamp) {
        // Add 24 hours (1 Day)
        targetDate.setDate(targetDate.getDate() + 1);
    }

    // 5. Calculate the difference in milliseconds
    // Target (Future) - Now (Current US Time)
    const differenceInMs = targetDate.getTime() - nowInUS_Timestamp;

    return {
        milliseconds: differenceInMs,
        // Helper to see it in hours for debugging
        hours: differenceInMs / (1000 * 60 * 60), 
        // Helper to see exactly when this is in Nigeria (Local Time)
        arrivalLocal: new Date(now.getTime() + differenceInMs)
    };
};


export default helper;