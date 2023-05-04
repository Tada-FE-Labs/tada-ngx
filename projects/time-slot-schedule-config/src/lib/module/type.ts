export interface IAvailability {
  id?: number | null;
  timeslotId: string;
  schoolYear: number;
  timeShift?: string;
  semester: string;
  available: boolean;
  gradeCode: string;
  reasonOfUnavailability: any;
}

export interface IAvailabilityPayload {
  id?: number | null;
  timeslotId: string;
  schoolYear: number;
  semester: string;
  available: boolean;
  timeslot: any;
  gradeCode: string;
  reasonOfUnavailability: any;
}

export interface ITimetableSlot {
  id: string;
  enabled: boolean,
  dayOfWeek: string;
  timeslot: any,
  timeShift: string;
  startTime: number;
  endTime: number;
  order: number;
  available: boolean;
  details?: IAvailability | null
}

export interface IWeekday {
  items: ITimetableSlot[]
}

export interface ITimetableSlot {
  id: string;
  enabled: boolean,
  dayOfWeek: string;
  timeslot: any,
  timeShift: string;
  startTime: number;
  endTime: number;
  order: number;
  available: boolean;
  details?: IAvailability | null
}