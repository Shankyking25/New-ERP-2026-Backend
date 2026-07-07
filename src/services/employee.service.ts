import Employee from "../models/employee.model";
import { CreateEmployeeInput } from "../types/employee.types";
import mongoose from "mongoose";

// export const createEmployee = async (
// body:any
// ) => {

// const employee =
// await Employee.create(body);

// return employee;

// };


// export const createEmployee = async (
//   body: CreateEmployeeInput
// ) => {

//   if (!body.department) {
//     throw new Error("Department is required");
//   }

//   const employee = await Employee.create(body);

//   return employee;
// };



export const createEmployee = async (
  body: CreateEmployeeInput
) => {

  // 🔥 STEP 1: VALIDATE REQUIRED FIELD
  if (!body.department) {
    throw new Error("Department is required");
  }

  // 🔥 STEP 2: ENSURE IT IS STRING (NOT OBJECT)
  const departmentId =
    typeof body.department === "object"
      ? (body.department as any)._id
      : body.department;

  // 🔥 STEP 3: VALIDATE OBJECT ID
  if (!mongoose.Types.ObjectId.isValid(departmentId)) {
    throw new Error("Invalid Department ID");
  }

  // 🔥 STEP 4: CREATE CLEAN OBJECT
  const employeeData = {
    ...body,
    department: departmentId, // always clean string ID
  };

  const employee = await Employee.create(employeeData);

  return employee;
};





// export const getEmployees =
// async () => {

// return Employee.find().sort({
// createdAt:-1
// });

// };

export const getEmployees = async (
  query: any
) => {
  const {
    page = 1,
    limit = 10,
    search = "",
    department,
    status,
    sort = "-createdAt",
  } = query;

  const filter: any = {};

  if (search) {
    filter.$or = [
      {
        name: {
          $regex: search,
          $options: "i",
        },
      },
      {
        email: {
          $regex: search,
          $options: "i",
        },
      },
      {
        employeeId: {
          $regex: search,
          $options: "i",
        },
      },
    ];
  }

  if (department) {
    filter.department = department;
  }

  if (status) {
    filter.status = status;
  }

  const total = await Employee.countDocuments(filter);

  // const employees = await Employee.find(filter)
  //   .sort(sort)
  //   .skip((Number(page) - 1) * Number(limit))
  //   .limit(Number(limit));

const employees = await Employee.find(filter)
  .populate("department", "name status") // 🔥 ADD THIS LINE
  .sort(sort)
  .skip((Number(page) - 1) * Number(limit))
  .limit(Number(limit));


  return {
    employees,
    total,
    page: Number(page),
    limit: Number(limit),
  };
};


export const getEmployee =
async(id:string)=>{

// return Employee.findById(id);

return Employee.findById(id).populate("department", "name status");

};

export const updateEmployee=
async(id:string,body:any)=>{

return Employee.findByIdAndUpdate(

id,

body,

{
new:true,
}

);

};

export const deleteEmployee=
async(id:string)=>{

return Employee.findByIdAndDelete(id);

};




export const getEmployeeStats =
  async () => {

    const total =
      await Employee.countDocuments();

    const active =
      await Employee.countDocuments({
        status: "Active",
      });

    const inactive =
      await Employee.countDocuments({
        status: "Inactive",
      });

    return {
      total,
      active,
      inactive,
    };
  };