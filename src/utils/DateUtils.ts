/**
 * src/utils/DateUtils.ts
 */

export class DateUtils {
    private static readonly LOCALE = 'en-US';

    // Standard format: "Dec 28, 2025, 10:30 AM"
    private static readonly DATETIME_OPTIONS: Intl.DateTimeFormatOptions = {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
    };

    // Date only format: "Dec 28, 2025"
    private static readonly DATE_ONLY_OPTIONS: Intl.DateTimeFormatOptions = {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    };

    /**
     * Formats a date string, number, or object into "Dec 28, 2025, 10:30 AM"
     */
    public static formatDateTime(input: string | Date | number | null | undefined): string {
        return this.processDate(input, this.DATETIME_OPTIONS);
    }

    /**
     * Formats a date string, number, or object into "Dec 28, 2025"
     */
    public static formatDate(input: string | Date | number | null | undefined): string {
        return this.processDate(input, this.DATE_ONLY_OPTIONS);
    }

    /**
     * Checks if a date is in the future
     */
    public static isFuture(input: string | Date | number | null | undefined): boolean {
        if (!input) return false;
        const date = new Date(input);
        return !isNaN(date.getTime()) && date.getTime() > Date.now();
    }

    /**
   * Returns true if dateA is after dateB
   */
    public static isAfter(dateA: string | Date | number, dateB: string | Date | number): boolean {
        const a = new Date(dateA).getTime();
        const b = new Date(dateB).getTime();
        return a > b;
    }

    /**
     * Internal helper to handle null checks and invalid dates safely
     */
    private static processDate(
        input: string | Date | number | null | undefined,
        options: Intl.DateTimeFormatOptions
    ): string {
        if (!input) return '—';

        try {
            const date = new Date(input);

            if (isNaN(date.getTime())) {
                console.warn(`[DateUtils] Invalid date provided: ${input}`);
                console.log(input, ":\t", typeof input, "\n", date, ":\t", typeof date )
                return 'Invalid Date';
            }

            return new Intl.DateTimeFormat(this.LOCALE, options).format(date);
        } catch (error) {
            console.error('[DateUtils] Formatting error:', error);
            return 'Error';
        }
    }
}