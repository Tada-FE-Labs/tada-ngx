export declare class TadaNgxCalendarHelper {
    dateFormat: string;
    constructor();
    getCurrentYear: () => number;
    getCurrentMonth: () => number;
    getActiveYear: () => number;
    getThisWeekDates(fromDate: string): string[];
    truncateWords(sentence: string, amount: number, tail?: string): string;
    getWeekDaysByDay(fromDate: string): string[];
    currentWeekNumber(): number;
    subtract(date: any): string;
    add(date: any): string;
    getWeekNumberByDate(date: any): number;
    formatDate(date: any, format: string): string;
    getFirstMondayOfMonth(month: number, year: number): string;
    dayStartOfWeek(weekNumber: number, year: number): string;
    isoWeeksInYear(year: number): number;
    getTimeRange(date: any, format?: string): {
        timeZone: string;
        curentTime: {
            guess: string;
            utc: string;
        };
        timeStampUtc: {
            startOfDay: string;
            endOfDay: string;
            dateFormat: string;
        };
    };
    inDay(day1: number, day2: string): boolean;
}
