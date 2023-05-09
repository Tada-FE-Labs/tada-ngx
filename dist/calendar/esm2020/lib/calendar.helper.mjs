import moment from 'moment';
import { dateFormat } from './constants';
export class TadaNgxCalendarHelper {
    constructor() {
        this.dateFormat = 'YYYY-MM-DD';
        this.getCurrentYear = () => {
            return new Date().getFullYear(); // returns the current year
        };
        this.getCurrentMonth = () => {
            return new Date().getMonth() + 1; // returns the current year
        };
        this.getActiveYear = () => {
            let currentYear = this.getCurrentYear();
            const activeYear = (1 <= this.getCurrentMonth() && this.getCurrentMonth() <= 8) ? currentYear - 1 : currentYear;
            const selectedYear = localStorage.getItem('activeSchoolYear');
            if (!!selectedYear) {
                return +selectedYear;
            }
            return activeYear;
        };
    }
    getThisWeekDates(fromDate) {
        const weekDates = [];
        for (let i = 1; i <= 7; i++) {
            weekDates.push(moment(fromDate, this.dateFormat).day(i).format(this.dateFormat));
        }
        return weekDates;
    }
    truncateWords(sentence, amount, tail = "...") {
        if (amount >= sentence.length) {
            return sentence;
        }
        const truncated = sentence.slice(0, amount);
        return `${truncated}${tail}`;
    }
    getWeekDaysByDay(fromDate) {
        const thisWeekDates = this.getThisWeekDates(fromDate);
        return thisWeekDates;
    }
    currentWeekNumber() {
        return +moment().format('W');
    }
    subtract(date) {
        return moment(date, this.dateFormat).subtract(7, 'days').isoWeekday(1).format(dateFormat);
    }
    add(date) {
        return moment(date, this.dateFormat).add(7, 'days').isoWeekday(1).format(dateFormat);
    }
    getWeekNumberByDate(date) {
        return +moment(date, this.dateFormat).format('W');
    }
    formatDate(date, format) {
        return moment(date, this.dateFormat).format(format);
    }
    getFirstMondayOfMonth(month, year) {
        let date = moment().set('year', year).set('month', month).set('date', 1).isoWeekday(8);
        if (date.date() > 7) {
            date = date.isoWeekday(-6);
        }
        return date.format(dateFormat);
    }
    dayStartOfWeek(weekNumber, year) {
        return moment(year, 'YYYY').add(weekNumber, 'weeks').isoWeekday(1).format(dateFormat);
    }
    isoWeeksInYear(year) {
        return moment(year, 'YYYY').isoWeeksInYear();
    }
    getTimeRange(date, format = 'YYYY-MM-DD') {
        const timezone = moment().format('Z');
        // start of day
        const startOfDay = `${moment(date, format).format(this.dateFormat)}T00:00:00${timezone}`;
        const endOfDay = `${moment(date, format).format(this.dateFormat)}T23:59:59${timezone}`;
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
    inDay(day1, day2) {
        const equal = day2 === moment(day1, 'x').format(this.dateFormat);
        return equal;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXIuaGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvY2FsZW5kYXIvc3JjL2xpYi9jYWxlbmRhci5oZWxwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxNQUFNLE1BQU0sUUFBUSxDQUFDO0FBQzVCLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFFekMsTUFBTSxPQUFPLHFCQUFxQjtJQUloQztRQUZBLGVBQVUsR0FBRyxZQUFZLENBQUM7UUFJMUIsbUJBQWMsR0FBRyxHQUFHLEVBQUU7WUFDcEIsT0FBTyxJQUFJLElBQUksRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsMkJBQTJCO1FBQzlELENBQUMsQ0FBQztRQUVELG9CQUFlLEdBQUcsR0FBRyxFQUFFO1lBQ3RCLE9BQU8sSUFBSSxJQUFJLEVBQUUsQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQywyQkFBMkI7UUFDL0QsQ0FBQyxDQUFDO1FBRUYsa0JBQWEsR0FBRyxHQUFHLEVBQUU7WUFDbkIsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ3hDLE1BQU0sVUFBVSxHQUFHLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxlQUFlLEVBQUUsSUFBSSxJQUFJLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQztZQUNoSCxNQUFNLFlBQVksR0FBRyxZQUFZLENBQUMsT0FBTyxDQUFDLGtCQUFrQixDQUFDLENBQUM7WUFDOUQsSUFBSSxDQUFDLENBQUMsWUFBWSxFQUFFO2dCQUNsQixPQUFPLENBQUMsWUFBWSxDQUFDO2FBQ3RCO1lBQ0QsT0FBTyxVQUFVLENBQUM7UUFDcEIsQ0FBQyxDQUFBO0lBbEJjLENBQUM7SUFvQmhCLGdCQUFnQixDQUFDLFFB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O1NBQ0YsQ0FBQztRQUNGLE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQUVELEtBQUssQ0FBQyxJQUFZLEVBQUUsSUFBWTtRQUM5QixNQUFNLEtBQUssR0FBRyxJQUFJLEtBQUssTUFBTSxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ2pFLE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQnO1xuaW1wb3J0IHsgZGF0ZUZvcm1hdCB9IGZyb20gJy4vY29uc3RhbnRzJztcblxuZXhwb3J0IGNsYXNzIFRhZGFOZ3hDYWxlbmRhckhlbHBlciB7XG5cbiAgZGF0ZUZvcm1hdCA9ICdZWVlZLU1NLUREJztcblxuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgZ2V0Q3VycmVudFllYXIgPSAoKSA9PiB7XG4gICAgcmV0dXJuIG5ldyBEYXRlKCkuZ2V0RnVsbFllYXIoKTsgLy8gcmV0dXJucyB0aGUgY3VycmVudCB5ZWFyXG4gIH07XG4gIFxuICAgZ2V0Q3VycmVudE1vbnRoID0gKCkgPT4ge1xuICAgIHJldHVybiBuZXcgRGF0ZSgpLmdldE1vbnRoKCkgKyAxOyAvLyByZXR1cm5zIHRoZSBjdXJyZW50IHllYXJcbiAgfTtcbiAgXG4gIGdldEFjdGl2ZVllYXIgPSAoKSA9PiB7XG4gICAgbGV0IGN1cnJlbnRZZWFyID0gdGhpcy5nZXRDdXJyZW50WWVhcigpO1xuICAgIGNvbnN0IGFjdGl2ZVllYXIgPSAoMSA8PSB0aGlzLmdldEN1cnJlbnRNb250aCgpICYmIHRoaXMuZ2V0Q3VycmVudE1vbnRoKCkgPD0gOCkgPyBjdXJyZW50WWVhciAtIDEgOiBjdXJyZW50WWVhcjtcbiAgICBjb25zdCBzZWxlY3RlZFllYXIgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnYWN0aXZlU2Nob29sWWVhcicpO1xuICAgIGlmICghIXNlbGVjdGVkWWVhcikge1xuICAgICAgcmV0dXJuICtzZWxlY3RlZFllYXI7XG4gICAgfVxuICAgIHJldHVybiBhY3RpdmVZZWFyO1xuICB9XG5cbiAgZ2V0VGhpc1dlZWtEYXRlcyhmcm9tRGF0ZTogc3RyaW5nKSB7XG4gICAgY29uc3Qgd2Vla0RhdGVzID0gW107XG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gNzsgaSsrKSB7XG4gICAgICB3ZWVrRGF0ZXMucHVzaChtb21lbnQoZnJvbURhdGUsIHRoaXMuZGF0ZUZvcm1hdCkuZGF5KGkpLmZvcm1hdCh0aGlzLmRhdGVGb3JtYXQpKTtcbiAgICB9XG4gICAgcmV0dXJuIHdlZWtEYXRlcztcbiAgfVxuXG4gIHRydW5jYXRlV29yZHMoc2VudGVuY2U6IHN0cmluZywgYW1vdW50OiBudW1iZXIsIHRhaWwgPSBcIi4uLlwiKSB7XG4gICAgaWYgKGFtb3VudCA+PSBzZW50ZW5jZS5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBzZW50ZW5jZTtcbiAgICB9XG4gICAgY29uc3QgdHJ1bmNhdGVkID0gc2VudGVuY2Uuc2xpY2UoMCwgYW1vdW50KTtcbiAgICByZXR1cm4gYCR7dHJ1bmNhdGVkfSR7dGFpbH1gO1xuICB9XG5cbiAgZ2V0V2Vla0RheXNCeURheShmcm9tRGF0ZTogc3RyaW5nKSB7XG4gICAgY29uc3QgdGhpc1dlZWtEYXRlcyA9IHRoaXMuZ2V0VGhpc1dlZWtEYXRlcyhmcm9tRGF0ZSk7XG4gICAgcmV0dXJuIHRoaXNXZWVrRGF0ZXM7XG4gIH1cblxuICBjdXJyZW50V2Vla051bWJlcigpIHtcbiAgICByZXR1cm4gK21vbWVudCgpLmZvcm1hdCgnVycpO1xuICB9XG5cbiAgc3VidHJhY3QoZGF0ZTogYW55KSB7XG4gICAgcmV0dXJuIG1vbWVudChkYXRlLCB0aGlzLmRhdGVGb3JtYXQpLnN1YnRyYWN0KDcsICdkYXlzJykuaXNvV2Vla2RheSgxKS5mb3JtYXQoZGF0ZUZvcm1hdCk7XG4gIH1cblxuICBhZGQoZGF0ZTogYW55KSB7XG4gICAgcmV0dXJuIG1vbWVudChkYXRlLCB0aGlzLmRhdGVGb3JtYXQpLmFkZCg3LCAnZGF5cycpLmlzb1dlZWtkYXkoMSkuZm9ybWF0KGRhdGVGb3JtYXQpO1xuICB9XG5cbiAgZ2V0V2Vla051bWJlckJ5RGF0ZShkYXRlOiBhbnkpIHtcbiAgICByZXR1cm4gK21vbWVudChkYXRlLCB0aGlzLmRhdGVGb3JtYXQpLmZvcm1hdCgnVycpO1xuICB9XG5cbiAgZm9ybWF0RGF0ZShkYXRlOiBhbnksIGZvcm1hdDogc3RyaW5nKSB7XG4gICAgcmV0dXJuIG1vbWVudChkYXRlLCB0aGlzLmRhdGVGb3JtYXQpLmZvcm1hdChmb3JtYXQpO1xuICB9XG5cbiAgZ2V0Rmlyc3RNb25kYXlPZk1vbnRoKG1vbnRoOiBudW1iZXIsIHllYXI6IG51bWJlcikge1xuICAgIGxldCBkYXRlID0gbW9tZW50KCkuc2V0KCd5ZWFyJywgeWVhcikuc2V0KCdtb250aCcsIG1vbnRoKS5zZXQoJ2RhdGUnLCAxKS5pc29XZWVrZGF5KDgpXG4gICAgaWYoZGF0ZS5kYXRlKCkgPiA3KSB7IFxuICAgICAgICBkYXRlID0gZGF0ZS5pc29XZWVrZGF5KC02KVxuICAgIH1cbiAgICByZXR1cm4gZGF0ZS5mb3JtYXQoZGF0ZUZvcm1hdCk7XG4gIH1cblxuICBkYXlTdGFydE9mV2Vlayh3ZWVrTnVtYmVyOiBudW1iZXIsIHllYXI6IG51bWJlcikge1xuICAgIHJldHVybiBtb21lbnQoeWVhciwnWVlZWScpLmFkZCh3ZWVrTnVtYmVyLCAnd2Vla3MnKS5pc29XZWVrZGF5KDEpLmZvcm1hdChkYXRlRm9ybWF0KTtcbiAgfVxuXG4gIGlzb1dlZWtzSW5ZZWFyKHllYXI6IG51bWJlcikge1xuICAgIHJldHVybiBtb21lbnQoeWVhciwnWVlZWScpLmlzb1dlZWtzSW5ZZWFyKCk7XG4gIH1cblxuICBnZXRUaW1lUmFuZ2UoZGF0ZTogYW55LCBmb3JtYXQgPSAnWVlZWS1NTS1ERCcpIHtcbiAgICBjb25zdCB0aW1lem9uZSA9IG1vbWVudCgpLmZvcm1hdCgnWicpO1xuXG4gICAgLy8gc3RhcnQgb2YgZGF5XG4gICAgY29uc3Qgc3RhcnRPZkRheSA9IGAke21vbWVudChkYXRlLCBmb3JtYXQpLmZvcm1hdChcbiAgICAgIHRoaXMuZGF0ZUZvcm1hdFxuICAgICl9VDAwOjAwOjAwJHt0aW1lem9uZX1gO1xuXG4gICAgY29uc3QgZW5kT2ZEYXkgPSBgJHttb21lbnQoZGF0ZSwgZm9ybWF0KS5mb3JtYXQoXG4gICAgICB0aGlzLmRhdGVGb3JtYXRcbiAgICApfVQyMzo1OTo1OSR7dGltZXpvbmV9YDtcblxuICAgIGNvbnN0IHJhbmdlID0ge1xuICAgICAgdGltZVpvbmU6IHRpbWV6b25lLFxuICAgICAgY3VyZW50VGltZToge1xuICAgICAgICBndWVzczogbW9tZW50KGRhdGUsIGZvcm1hdCkuZm9ybWF0KCksXG4gICAgICAgIHV0YzogbW9tZW50KGRhdGUsIGZvcm1hdCkudXRjKCkuZm9ybWF0KCksXG4gICAgICB9LFxuICAgICAgdGltZVN0YW1wVXRjOiB7XG4gICAgICAgIHN0YXJ0T2ZEYXk6IG1vbWVudC51dGMoc3RhcnRPZkRheSkuZm9ybWF0KCd4JyksXG4gICAgICAgIGVuZE9mRGF5OiBtb21lbnQudXRjKGVuZE9mRGF5KS5mb3JtYXQoJ3gnKSxcbiAgICAgICAgZGF0ZUZvcm1hdDogbW9tZW50LnV0YyhzdGFydE9mRGF5KS5mb3JtYXQodGhpcy5kYXRlRm9ybWF0KSxcbiAgICAgIH0sXG4gICAgfTtcbiAgICByZXR1cm4gcmFuZ2U7XG4gIH1cblxuICBpbkRheShkYXkxOiBudW1iZXIsIGRheTI6IHN0cmluZykge1xuICAgIGNvbnN0IGVxdWFsID0gZGF5MiA9PT0gbW9tZW50KGRheTEsICd4JykuZm9ybWF0KHRoaXMuZGF0ZUZvcm1hdCk7XG4gICAgcmV0dXJuIGVxdWFsO1xuICB9XG59XG4iXX0=