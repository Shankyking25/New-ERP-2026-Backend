import Payroll from "../models/payroll.model";

/* =========================
   CREATE
========================= */

export const createPayroll = async (body: any) => {

  const netSalary =
    (body.basicSalary || 0) +
    (body.bonus || 0) -
    (body.deduction || 0);

  return Payroll.create({
    ...body,
    netSalary,
  });
};

/* =========================
   GET ALL
========================= */

export const getPayrolls = async (query: any) => {

  const {
    page = 1,
    limit = 10,
    employee,
    status,
    sort = "-createdAt",
  } = query;

  const filter: any = {};

  if (employee) filter.employee = employee;
  if (status) filter.status = status;

  const total = await Payroll.countDocuments(filter);

  const payrolls = await Payroll.find(filter)
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
    .skip((Number(page) - 1) * Number(limit))
    .limit(Number(limit));

  return {
    payrolls,
    total,
    page: Number(page),
    limit: Number(limit),
  };
};

/* =========================
   GET ONE
========================= */

export const getPayroll = async (id: string) => {
  return Payroll.findById(id).populate({
    path: "employee",
    select:
      "employeeId name department designation avatar",
    populate: {
      path: "department",
      select: "name",
    },
  });
};

/* =========================
   UPDATE
========================= */

export const updatePayroll = async (
  id: string,
  body: any
) => {
  const netSalary =
    (body.basicSalary || 0) +
    (body.bonus || 0) -
    (body.deduction || 0);

  return Payroll.findByIdAndUpdate(
    id,
    { ...body, netSalary },
    { new: true }
  );
};

/* =========================
   DELETE
========================= */

export const deletePayroll = async (id: string) => {
  return Payroll.findByIdAndDelete(id);
};

/* =========================
   STATS
========================= */

export const getPayrollStats = async () => {
  const total = await Payroll.countDocuments();

  const paid = await Payroll.countDocuments({
    status: "Paid",
  });

  const pending = await Payroll.countDocuments({
    status: "Pending",
  });

  const salaryAgg = await Payroll.aggregate([
    {
      $group: {
        _id: null,
        totalSalary: { $sum: "$netSalary" },
      },
    },
  ]);

  return {
    total,
    paid,
    pending,
    totalSalary:
      salaryAgg[0]?.totalSalary || 0,
  };
};