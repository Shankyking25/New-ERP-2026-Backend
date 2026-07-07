// import mongoose from "mongoose";

// const DepartmentSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//       unique: true,
//     },

//     code: {
//       type: String,
//       required: true,
//       unique: true,
//     },

//     description: String,

//     manager: String,
//   },
//   {
//     timestamps: true,
//   }
// );

// export default mongoose.model(
//   "Department",
//   DepartmentSchema
// );



import mongoose, { Schema } from "mongoose";

const departmentSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    head: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "Department",
  departmentSchema
);