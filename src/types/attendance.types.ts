export interface CreateAttendanceInput {
  employee: string;

  date: Date;

  checkIn: string;

  checkOut: string;

  workingHours: number;

  overtimeHours: number;

  status:
    | "Present"
    | "Absent"
    | "Half Day"
    | "Leave"
    | "Work From Home";

  remarks?: string;
}