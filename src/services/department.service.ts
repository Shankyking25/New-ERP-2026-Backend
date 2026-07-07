// import Employee from "../models/employee.model";

// export const getOverview = async () => {
//   const totalEmployees = await Employee.countDocuments();

//   const activeEmployees = await Employee.countDocuments({
//     status: "active",
//   });

//   const inactiveEmployees = await Employee.countDocuments({
//     status: "inactive",
//   });

//   const departments = await Employee.distinct("department");

//   return {
//     totalEmployees,
//     activeEmployees,
//     inactiveEmployees,
//     totalDepartments: departments.length,
//   };
// };

// export const getRecentEmployees = async () => {
//   return Employee.find()
//     .sort({ createdAt: -1 })
//     .limit(5);
// };

// export const getDepartmentChart = async () => {
//   return Employee.aggregate([
//     {
//       $group: {
//         _id: "$department",
//         total: {
//           $sum: 1,
//         },
//       },
//     },
//   ]);
// };


import Department from "../models/Department.model";
import { DepartmentDto } from "../types/department.types";

export const createDepartment = async (
  data: DepartmentDto
) => {

  const existing = await Department.findOne({
    $or: [
      { name: data.name },
      { code: data.code },
    ],
  });

  if (existing) {
    throw new Error(
      "Department already exists"
    );
  }

  return await Department.create(data);
};

export const getDepartments = async ({
  page = 1,
  limit = 10,
  search = "",
  status = "",
  sort = "-createdAt",
}: any) => {

  const query: any = {};

  if (search) {
    query.$or = [
      {
        name: {
          $regex: search,
          $options: "i",
        },
      },
      {
        code: {
          $regex: search,
          $options: "i",
        },
      },
    ];
  }

  if (status) {
    query.status = status;
  }

  const total =
    await Department.countDocuments(query);

  const departments =
    await Department.find(query)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(Number(limit));

  return {
    departments,
    total,
  };
};

export const getDepartmentById = async (
  id: string
) => {
  return await Department.findById(id);
};

export const updateDepartment = async (
  id: string,
  body: DepartmentDto
) => {

  return await Department.findByIdAndUpdate(
    id,
    body,
    {
      new: true,
      runValidators: true,
    }
  );
};

export const deleteDepartment = async (
  id: string
) => {

  return await Department.findByIdAndDelete(id);

};