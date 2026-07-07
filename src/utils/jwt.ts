import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secret_key";

export const generateToken = (userId: string) => {
  return jwt.sign(
    { id: userId },
    JWT_SECRET,
    { expiresIn: "1d" } // Access token valid for 1 day
  );
};