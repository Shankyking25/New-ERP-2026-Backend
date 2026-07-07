// import jwt from "jsonwebtoken";

// export const generateAccessToken = (userId: string) => {
//   return jwt.sign(
//     { id: userId },
//     process.env.ACCESS_TOKEN_SECRET!,
//     { expiresIn: "15m" }
//   );
// };

// export const generateRefreshToken = (userId: string) => {
//   return jwt.sign(
//     { id: userId },
//     process.env.REFRESH_TOKEN_SECRET!,
//     { expiresIn: "7d" }
//   );
// };



import jwt from "jsonwebtoken";

export const generateAccessToken = (id: string) => {
  return jwt.sign(
    { id },
    process.env.ACCESS_TOKEN_SECRET!,
    { expiresIn: "15m" }
  );
};

export const generateRefreshToken = (id: string) => {
  return jwt.sign(
    { id },
    process.env.REFRESH_TOKEN_SECRET!,
    { expiresIn: "7d" }
  );
};