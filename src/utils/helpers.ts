type TimeUnit = 'hours' | 'minutes' | 'seconds' | 'milliseconds';

interface TimeConversion {
  milliseconds: number;
  seconds: number;
  minutes: number;
  hours: number;
  days: number;
}

interface HelperFunctions {
  generateTrackingNumberWithTimestamp: () => string;
  convertTime: (value: number, from: TimeUnit, to: TimeUnit) => number;
  convertTimeToAll: (value: number, from: TimeUnit) => TimeConversion;
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

export default helper;