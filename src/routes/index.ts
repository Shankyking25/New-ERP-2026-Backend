// import { Router } from "express";

// const router = Router();

// router.get("/health", (_req, res) => {
//   res.json({
//     success: true,
//     message: "API Working",
//   });
// });

// export default router;

import { Router } from "express";

import authRoutes from "./auth.routes";
import userRoutes from "./user.routes";

import employeeRoutes from "./employee.routes";

import dashboardRoutes from "./dashboard.routes";



const router = Router();

router.use("/auth", authRoutes);

router.use("/user", userRoutes);


router.get("/health", (_req, res) => {
  res.json({
    success: true,
    message: "API Working",
  });
});



router.use("/employees",employeeRoutes);


// router.use("/dashboard", dashboardRoutes);

export default router;