import Leave from "../models/leave.model";
import { CreateLeaveInput } from "../types/leave.types";

/* ==========================
   CREATE
========================== */

export const createLeave = async (
  body: CreateLeaveInput
) => {

  const leave = await Leave.create(body);

  return leave;

};

/* ==========================
   LIST
========================== */

export const getLeaves = async (
  query: any
) => {

  const {

    page = 1,

    limit = 10,

    employee,

    status,

    leaveType,

    sort = "-createdAt",

  } = query;

  const filter: any = {};

  if (employee) {
    filter.employee = employee;
  }

  if (status) {
    filter.status = status;
  }

  if (leaveType) {
    filter.leaveType = leaveType;
  }

  const total =
    await Leave.countDocuments(filter);

  const leaves =
    await Leave.find(filter)

      .populate({
        path: "employee",
        select:
          "employeeId name department designation avatar",
        populate: {
          path: "department",
          select: "name",
        },
      })

      .sort(sort)

      .skip(
        (Number(page) - 1) *
          Number(limit)
      )

      .limit(Number(limit));

  return {

    leaves,

    total,

    page: Number(page),

    limit: Number(limit),

  };

};

/* ==========================
   SINGLE
========================== */

export const getLeave = async (
  id: string
) => {

  return Leave.findById(id).populate({

    path: "employee",

    select:
      "employeeId name department designation avatar",

    populate: {

      path: "department",

      select: "name",

    },

  });

};

/* ==========================
   UPDATE
========================== */

export const updateLeave = async (

  id: string,

  body: any

) => {

  return Leave.findByIdAndUpdate(

    id,

    body,

    {
      new: true,
    }

  ).populate({

    path: "employee",

    select:
      "employeeId name department designation avatar",

    populate: {

      path: "department",

      select: "name",

    },

  });

};

/* ==========================
   DELETE
========================== */

export const deleteLeave = async (
  id: string
) => {

  return Leave.findByIdAndDelete(id);

};

/* ==========================
   DASHBOARD STATS
========================== */

export const getLeaveStats =
  async () => {

    const total =
      await Leave.countDocuments();

    const pending =
      await Leave.countDocuments({
        status: "Pending",
      });

    const approved =
      await Leave.countDocuments({
        status: "Approved",
      });

    const rejected =
      await Leave.countDocuments({
        status: "Rejected",
      });

    return {

      total,

      pending,

      approved,

      rejected,

    };

  };