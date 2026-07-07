// import { Request, Response } from "express";
// import { validationResult } from "express-validator";

// import { registerUser, loginUser } from "../services/auth.service";

// import jwt from "jsonwebtoken";
// import { generateAccessToken } from "../utils/token";


// export const register = async (
//   req: Request,
//   res: Response
// ) => {
//   const errors = validationResult(req);

//   if (!errors.isEmpty()) {
//     return res.status(400).json({
//       success: false,
//       errors: errors.array(),
//     });
//   }

//   try {
//     const user = await registerUser(req.body);

//     return res.status(201).json({
//       success: true,
//       message: "Registration Successful",
//       user,
//     });
//   } catch (error) {
//     return res.status(400).json({
//       success: false,
//       message:
//         error instanceof Error
//           ? error.message
//           : "Registration failed",
//     });
//   }
// };




// // export const login = async (req: Request, res: Response) => {
// //   try {
// //     const { email, password } = req.body;

// //     const user = await loginUser(email, password);

// //     return res.status(200).json({
// //       success: true,
// //       message: "Login successful",
// //       user,
// //     });
// //   } catch (error) {
// //     return res.status(400).json({
// //       success: false,
// //       message:
// //         error instanceof Error ? error.message : "Login failed",
// //     });
// //   }
// // };



// {/* working code just update new code */}
// // export const login = async (req: Request, res: Response) => {
// //   try {
// //     const { email, password } = req.body;

// //     const result = await loginUser(email, password);

// //     return res.status(200).json({
// //       success: true,
// //       message: "Login successful",
// //       user: result.user,
// //       token: result.token,
// //     });
// //   } catch (error) {
// //     return res.status(400).json({
// //       success: false,
// //       message:
// //         error instanceof Error ? error.message : "Login failed",
// //     });
// //   }
// // };


// export const login = async (req: Request, res: Response) => {
//   try {
//     const { email, password } = req.body;

//     const result = await loginUser(email, password);

//     res.cookie("refreshToken", result.refreshToken, {
//       httpOnly: true,
//       secure: false, // true in production (HTTPS)
//       sameSite: "lax",
//     });

//     return res.status(200).json({
//       success: true,
//       message: "Login successful",
//       user: result.user,
//       accessToken: result.accessToken,
//     });
//   } catch (error) {
//     return res.status(400).json({
//       success: false,
//       message: error instanceof Error ? error.message : "Login failed",
//     });
//   }
// };




// export const refreshToken = async (req: Request, res: Response) => {
//   try {
//     const token = req.cookies.refreshToken;

//     if (!token) {
//       return res.status(401).json({ message: "No refresh token" });
//     }

//     const decoded: any = jwt.verify(
//       token,
//       process.env.REFRESH_TOKEN_SECRET!
//     );

//     const accessToken = generateAccessToken(decoded.id);

//     return res.json({
//       success: true,
//       accessToken,
//     });
//   } catch (error) {
//     return res.status(401).json({
//       success: false,
//       message: "Invalid refresh token",
//     });
//   }
// };




















// import { Request, Response } from "express";
// import { validationResult } from "express-validator";
// import jwt from "jsonwebtoken";

// import User from "../models/User.model";
// import { registerUser, loginUser } from "../services/auth.service";
// import { generateAccessToken } from "../utils/token";

// /* ---------------- REGISTER ---------------- */
// export const register = async (
//   req: Request,
//   res: Response
// ) => {
//   const errors = validationResult(req);

//   if (!errors.isEmpty()) {
//     return res.status(400).json({
//       success: false,
//       errors: errors.array(),
//     });
//   }

//   try {
//     const user = await registerUser(req.body);

//     return res.status(201).json({
//       success: true,
//       message: "Registration Successful",
//       user,
//     });
//   } catch (error) {
//     return res.status(400).json({
//       success: false,
//       message:
//         error instanceof Error
//           ? error.message
//           : "Registration failed",
//     });
//   }
// };

// /* ---------------- LOGIN ---------------- */
// export const login = async (
//   req: Request,
//   res: Response
// ) => {
//   try {
//     const { email, password } = req.body;

//     const result = await loginUser(email, password);

//     res.cookie("refreshToken", result.refreshToken, {
//       httpOnly: true,
//       secure: false, // true in production (HTTPS)
//       sameSite: "lax",
//     });

//     return res.status(200).json({
//       success: true,
//       message: "Login successful",
//       user: result.user,
//       accessToken: result.accessToken,
//     });

//   } catch (error) {
//     return res.status(400).json({
//       success: false,
//       message:
//         error instanceof Error
//           ? error.message
//           : "Login failed",
//     });
//   }
// };

// /* ---------------- REFRESH TOKEN ---------------- */
// export const refreshToken = async (
//   req: Request,
//   res: Response
// ) => {
//   try {
//     const token = req.cookies.refreshToken;

//     if (!token) {
//       return res.status(401).json({
//         success: false,
//         message: "No refresh token",
//       });
//     }

//     const decoded: any = jwt.verify(
//       token,
//       process.env.REFRESH_TOKEN_SECRET!
//     );

//     const accessToken = generateAccessToken(
//       decoded.id
//     );

//     return res.json({
//       success: true,
//       accessToken,
//     });

//   } catch (error) {
//     return res.status(401).json({
//       success: false,
//       message: "Invalid refresh token",
//     });
//   }
// };

// /* ---------------- CURRENT USER (/auth/me) ---------------- */
// export const me = async (
//   req: Request,
//   res: Response
// ) => {
//   try {
//     const authHeader =
//       req.headers.authorization;

//     if (!authHeader) {
//       return res.status(401).json({
//         success: false,
//         message: "No token provided",
//       });
//     }

//     const token =
//       authHeader.split(" ")[1];

//     const decoded: any = jwt.verify(
//       token,
//       process.env.ACCESS_TOKEN_SECRET!
//     );

//     const user = await User.findById(
//       decoded.id
//     ).select("-password -refreshToken");

//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     return res.json({
//       success: true,
//       user,
//     });

//   } catch (error) {
//     return res.status(401).json({
//       success: false,
//       message: "Invalid token",
//     });
//   }
// };



import { Request, Response } from "express";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";

import User from "../models/User.model";
import { registerUser, loginUser } from "../services/auth.service";
import { generateAccessToken } from "../utils/token";

/* ---------------- REGISTER ---------------- */
export const register = async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }

  try {
    const user = await registerUser(req.body);

    return res.status(201).json({
      success: true,
      message: "Registration Successful",
      user,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error instanceof Error ? error.message : "Registration failed",
    });
  }
};

/* ---------------- LOGIN ---------------- */
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const result = await loginUser(email, password);

    res.cookie("refreshToken", result.refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: result.user,
      accessToken: result.accessToken,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error instanceof Error ? error.message : "Login failed",
    });
  }
};

/* ---------------- REFRESH TOKEN ---------------- */
export const refreshToken = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.refreshToken;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No refresh token",
      });
    }

    const decoded: any = jwt.verify(
      token,
      process.env.REFRESH_TOKEN_SECRET!
    );

    const accessToken = generateAccessToken(decoded.id);

    return res.json({
      success: true,
      accessToken,
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid refresh token",
    });
  }
};

/* ---------------- GET CURRENT USER (/auth/me) ---------------- */
// export const me = async (req: Request, res: Response) => {
//   try {
//     const authHeader = req.headers.authorization;

//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       return res.status(401).json({
//         success: false,
//         message: "No token provided",
//       });
//     }

//     const token = authHeader.split(" ")[1];

//     const decoded: any = jwt.verify(
//       token,
//       process.env.ACCESS_TOKEN_SECRET!
//     );

//     const user = await User.findById(decoded.id).select(
//       "-password -refreshToken"
//     );

//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     return res.json({
//       success: true,
//       user,
//     });
//   } catch (error) {
//     return res.status(401).json({
//       success: false,
//       message: "Invalid token",
//     });
//   }
// };

import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.model";

export const me = async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "No token provided",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET as string
    ) as { id: string };

    const user = await User.findById(decoded.id).select(
      "-password -refreshToken -__v"
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.json({
      success: true,
      user,
    });

  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};