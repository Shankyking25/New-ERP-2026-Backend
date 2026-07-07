// import bcrypt from "bcrypt";
// import User from "../models/User.model";
// import { RegisterUserDto } from "../types/auth.types";

// export const registerUser = async (
//   userData: RegisterUserDto
// ) => {
//   const existingEmail = await User.findOne({
//     email: userData.email,
//   });

//   if (existingEmail) {
//     throw new Error("Email already exists");
//   }

//   const existingMobile = await User.findOne({
//     mobile: userData.mobile,
//   });

//   if (existingMobile) {
//     throw new Error("Mobile already exists");
//   }

//   const hashedPassword = await bcrypt.hash(
//     userData.password,
//     10
//   );

//   const user = await User.create({
//     ...userData,
//     password: hashedPassword,
//   });

//   return user;
// };





import bcrypt from "bcrypt";
import User from "../models/User.model";
import { RegisterUserDto } from "../types/auth.types";

import jwt from "jsonwebtoken";
import { generateToken } from "../utils/jwt";



export const registerUser = async (
  userData: RegisterUserDto
) => {
  const existingEmail = await User.findOne({
    email: userData.email,
  });

  if (existingEmail) {
    throw new Error("Email already exists");
  }

  const existingMobile = await User.findOne({
    mobile: userData.mobile,
  });

  if (existingMobile) {
    throw new Error("Mobile already exists");
  }

  const hashedPassword = await bcrypt.hash(
    userData.password,
    10
  );

  const user = await User.create({
    ...userData,
    password: hashedPassword,
  });

  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.refreshToken;
  delete userObject.__v;

  return userObject;
};



// KEEP your existing registerUser ABOVE (do not remove)

// 👇 ADD THIS NEW FUNCTION

// export const loginUser = async (email: string, password: string) => {
//   const user = await User.findOne({ email });

//   if (!user) {
//     throw new Error("Invalid email or password");
//   }

//   const isMatch = await bcrypt.compare(password, user.password);

//   if (!isMatch) {
//     throw new Error("Invalid email or password");
//   }

//   // remove sensitive data
//   const userObject = user.toObject();
//   delete userObject.password;
//   delete userObject.refreshToken;
//   delete userObject.__v;

//   return userObject;
// };



{/* it is step2 update working code no error */}

// export const loginUser = async (email: string, password: string) => {
//   const user = await User.findOne({ email });

//   if (!user) {
//     throw new Error("Invalid email or password");
//   }

//   const isMatch = await bcrypt.compare(password, user.password);

//   if (!isMatch) {
//     throw new Error("Invalid email or password");
//   }

//   const token = generateToken(user._id.toString());

//   const userObject = user.toObject();
//   delete userObject.password;
//   delete userObject.refreshToken;
//   delete userObject.__v;

//   return {
//     user: userObject,
//     token, // 🔥 IMPORTANT
//   };
// };


{/* New update in this code */}
import { generateAccessToken, generateRefreshToken } from "../utils/token";

export const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  const accessToken = generateAccessToken(user._id.toString());
  const refreshToken = generateRefreshToken(user._id.toString());

  // store refresh token in DB
  user.refreshToken = refreshToken;
  await user.save();

  const userObject = user.toObject();
  delete userObject.password;
  delete userObject.__v;

  return {
    user: userObject,
    accessToken,
    refreshToken,
  };
};