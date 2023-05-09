import moment from 'moment/moment';
import { dateFormat } from './constants';

export class TadaNgxCalendarHelper {

  dateFormat = 'YYYY-MM-DD';

  constructor() {
    console.log({
      moment
    });
  }

  getCurrentYear = () => {
    return new Date().getFullYear(); // returns the current year
  };
  
   getCurrentMonth = () => {
    return new Date().getMonth() + 1; // returns the current year
  };
  
  getActiveYear = () => {
    let currentYear = this.getCurrentYear();
    const activeYear = (1 <= this.getCurrentMonth() && this.getCurrentMonth() <= 8) ? currentYear - 1 : currentYear;
    const selectedYear = localStorage.getItem('activeSchoolYear');
    if (!!selectedYear) {
      return +selectedYear;
    }
    return activeYear;
  }

  getThisWeekDates(fromDate: string) {
    const weekDates = [];
    for (let i = 1; i <= 7; i++) {
      weekDates.push(moment(fromDate, this.dateFormat).day(i).format(this.dateFormat));
    }
    return weekDates;
  }

  truncateWords(sentence: string, amount: number, tail = "...") {
    if (amount >= sentence.length) {
      return sentence;
    }
    const truncated = sentence.slice(0, amount);
    return `${truncated}${tail}`;
  }

  getWeekDaysByDay(fromDate: string) {
    const thisWeekDates = this.getThisWeekDates(fromDate);
    return thisWeekDates;
  }

  currentWeekNumber() {
    return +moment().format('W');
  }

  subtract(date: any) {
    return moment(date, this.dateFormat).subtract(7, 'days').isoWeekday(1).format(dateFormat);
  }

  add(date: any) {
    return moment(date, this.dateFormat).add(7, 'days').isoWeekday(1).format(dateFormat);
  }

  getWeekNumberByDate(date: any) {
    return +moment(date, this.dateFormat).format('W');
  }

  formatDate(date: any, format: string) {
    return moment(date, this.dateFormat).format(format);
  }

  getFirstMondayOfMonth(month: number, year: number) {
    let date = moment().set('year', year).set('month', month).set('date', 1).isoWeekday(8)
    if(date.date() > 7) { 
        date = date.isoWeekday(-6)
    }
    return date.format(dateFormat);
  }

  dayStartOfWeek(weekNumber: number, year: number) {
    return moment(year,'YYYY').add(weekNumber, 'weeks').isoWeekday(1).format(dateFormat);
  }

  isoWeeksInYear(year: number) {
    return moment(year,'YYYY').isoWeeksInYear();
  }

  getTimeRange(date: any, format = 'YYYY-MM-DD') {
    const timezone = moment().format('Z');

    // start of day
    const startOfDay = `${moment(date, format).format(
      this.dateFormat
    )}T00:00:00${timezone}`;

    const endOfDay = `${moment(date, format).format(
      this.dateFormat
    )}T23:59:59${timezone}`;

    const range = {
      timeZone: timezone,
      curentTime: {
        guess: moment(date, format).format(),
        utc: moment(date, format).utc().format(),
      },
      timeStampUtc: {
        startOfDay: moment.utc(startOfDay).format('x'),
        endOfDay: moment.utc(endOfDay).format('x'),
        dateFormat: moment.utc(startOfDay).format(this.dateFormat),
      },
    };
    return range;
  }

  inDay(day1: number, day2: string) {
    const equal = day2 === moment(day1, 'x').format(this.dateFormat);
    return equal;
  }
}
