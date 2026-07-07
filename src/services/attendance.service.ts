import Attendance from "../models/attendance.model";
import { CreateAttendanceInput } from "../types/attendance.types";

/* =========================
   CREATE
========================= */

export const createAttendance = async (
  body: CreateAttendanceInput
) => {
  const attendance = await Attendance.create(body);

  return attendance;
};

/* =========================
   LIST
========================= */

export const getAttendances = async (
  query: any
) => {
  const {
    page = 1,
    limit = 10,
    search = "",
    employee,
    status,
    sort = "-date",
  } = query;

  const filter: any = {};

  if (employee) {
    filter.employee = employee;
  }

  if (status) {
    filter.status = status;
  }

  const total =
    await Attendance.countDocuments(filter);

//   const attendances =
//     await Attendance.find(filter)

//       .populate(
//         "employee",
//         "employeeId name department designation avatar"
//       )

//       .sort(sort)

//       .skip(
//         (Number(page) - 1) *
//           Number(limit)
//       )

//       .limit(Number(limit));

const attendances = await Attendance.find(filter)
  .populate({
    path: "employee",
    select: "employeeId name department designation avatar",
    populate: {
      path: "department",
      model: "Department",
      select: "name code status",
    },
  })
  .sort(sort)
  .skip((Number(page) - 1) * Number(limit))
  .limit(Number(limit));


  return {
    attendances,
    total,
    page: Number(page),
    limit: Number(limit),
  };
};

/* =========================
   SINGLE
========================= */

// export const getAttendance = async (
//   id: string
// ) => {
//   return Attendance.findById(id).populate(
//     "employee",
//     "employeeId name department designation avatar"
//   );
// };




// export const getAttendance = async (
//   id: string
// ) => {
//   return Attendance.findById(id).populate({
//     path: "employee",
//     select: "employeeId name department designation avatar",
//     populate: {
//       path: "department",
//       select: "name",
//     },
//   });
// };



export const getAttendance = async (
  id: string
) => {
  return Attendance.findById(id).populate({
    path: "employee",
    select: "employeeId name department designation avatar",
    populate: {
      path: "department",
      model: "Department",
      select: "name code status",
    },
  });
};




/* =========================
   UPDATE
========================= */

export const updateAttendance =
  async (
    id: string,
    body: any
  ) => {
    return Attendance.findByIdAndUpdate(
      id,
      body,
      {
        new: true,
      }
    ).populate({
  path: "employee",
  select: "employeeId name department designation avatar",
  populate: {
    path: "department",
    model: "Department",
    select: "name code status",
  },
});;
  };

/* =========================
   DELETE
========================= */

export const deleteAttendance =
  async (id: string) => {
    return Attendance.findByIdAndDelete(id);
  };

/* =========================
   DASHBOARD STATS
========================= */

export const getAttendanceStats =
  async () => {
    const total =
      await Attendance.countDocuments();

    const present =
      await Attendance.countDocuments({
        status: "Present",
      });

    const absent =
      await Attendance.countDocuments({
        status: "Absent",
      });

    const leave =
      await Attendance.countDocuments({
        status: "Leave",
      });

    const halfDay =
      await Attendance.countDocuments({
        status: "Half Day",
      });

    return {
      total,
      present,
      absent,
      leave,
      halfDay,
    };
  };



