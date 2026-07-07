// import { Request, Response } from "express";

// import * as service
// from "../services/employee.service";

// export const create =
// async(req:Request,res:Response)=>{

// const employee=
// await service.createEmployee(req.body);

// res.status(201).json({

// success:true,

// employee,

// });

// };

// // export const list=
// // async(_req:Request,res:Response)=>{

// // const employees=
// // await service.getEmployees();

// // res.json({

// // success:true,

// // employees,

// // });

// // };

// export const list = async (
//   req: Request,
//   res: Response
// ) => {
//   const result =
//     await service.getEmployees(req.query);

//   return res.json({
//     success: true,
//     ...result,
//   });
// };


// export const getEmployees = async (
//   query: any
// ) => {
//   const {
//     page = 1,
//     limit = 10,
//     search = "",
//     department,
//     status,
//     sort = "-createdAt",
//   } = query;

//   const filter: any = {};

//   if (search) {
//     filter.$or = [
//       {
//         name: {
//           $regex: search,
//           $options: "i",
//         },
//       },
//       {
//         email: {
//           $regex: search,
//           $options: "i",
//         },
//       },
//       {
//         employeeId: {
//           $regex: search,
//           $options: "i",
//         },
//       },
//     ];
//   }

//   if (department) {
//     filter.department = department;
//   }

//   if (status) {
//     filter.status = status;
//   }

//   const total = await Employee.countDocuments(filter);

//   const employees = await Employee.find(filter)
//     .sort(sort)
//     .skip((Number(page) - 1) * Number(limit))
//     .limit(Number(limit));

//   return {
//     employees,
//     total,
//     page: Number(page),
//     limit: Number(limit),
//   };
// };




// export const single=
// async(req:Request,res:Response)=>{

// const employee=

// await service.getEmployee(
// req.params.id
// );

// res.json({

// success:true,

// employee,

// });

// };

// export const update=
// async(req:Request,res:Response)=>{

// const employee=

// await service.updateEmployee(

// req.params.id,

// req.body,

// );

// res.json({

// success:true,

// employee,

// });

// };



// export const remove=
// async(req:Request,res:Response)=>{

// await service.deleteEmployee(

// req.params.id

// );

// res.json({

// success:true,

// });

// };




// export const stats = async (
//   _req: Request,
//   res: Response
// ) => {
//   const result =
//     await service.getEmployeeStats();

//   return res.json({
//     success: true,
//     stats: result,
//   });
// };




import { Request, Response } from "express";

import * as service from "../services/employee.service";

/* =========================
   CREATE EMPLOYEE
========================= */
export const create = async (
  req: Request,
  res: Response
) => {
  try {
    const file = req.file;

    const data = {
      ...req.body,
      avatar: file ? (file as any).path : "",
    };

    const employee = await service.createEmployee(data);

    return res.status(201).json({
      success: true,
      employee,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Create failed",
    });
  }
};

/* =========================
   LIST EMPLOYEES (SEARCH + PAGINATION)
========================= */
export const list = async (
  req: Request,
  res: Response
) => {
  try {
    const result = await service.getEmployees(req.query);

    return res.json({
      success: true,
      ...result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Fetch failed",
    });
  }
};

/* =========================
   GET SINGLE EMPLOYEE
========================= */
export const single = async (
  req: Request,
  res: Response
) => {
  try {
    const employee = await service.getEmployee(
      req.params.id
    );

    return res.json({
      success: true,
      employee,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: "Employee not found",
    });
  }
};

/* =========================
   UPDATE EMPLOYEE
========================= */
export const update = async (
  req: Request,
  res: Response
) => {
  try {
    const file = req.file;

    const data = {
      ...req.body,
      avatar: file ? (file as any).path : "",
    };

    const employee = await service.updateEmployee(
      req.params.id,
      data
    );

    return res.json({
      success: true,
      employee,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Update failed",
    });
  }
};

/* =========================
   DELETE EMPLOYEE
========================= */
export const remove = async (
  req: Request,
  res: Response
) => {
  try {
    await service.deleteEmployee(req.params.id);

    return res.json({
      success: true,
      message: "Deleted successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Delete failed",
    });
  }
};

/* =========================
   STATS
========================= */
export const stats = async (
  _req: Request,
  res: Response
) => {
  try {
    const result = await service.getEmployeeStats();

    return res.json({
      success: true,
      stats: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Stats failed",
    });
  }
};
