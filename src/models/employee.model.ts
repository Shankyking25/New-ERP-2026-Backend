import mongoose, { Schema } from "mongoose";

const employeeSchema = new Schema(
  {
    employeeId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    mobile: {
      type: String,
      required: true,
      unique: true,
    },

    // department: {
    //   type: String,
    //   required: true,
    // },

    department: {
 // type: Schema.Types.ObjectId,
   type: mongoose.Schema.Types.ObjectId, 
 ref: "Department",
  required: true,
},


    designation: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      default: "Employee",
    },

    salary: {
      type: Number,
      default: 0,
    },

    joiningDate: {
      type: Date,
    },

    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },

    avatar: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "Employee",
  employeeSchema
);