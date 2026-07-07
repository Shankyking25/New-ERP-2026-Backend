// import express from "express";
// import cors from "cors";
// import helmet from "helmet";
// import morgan from "morgan";
// import cookieParser from "cookie-parser";

// const app = express();

// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     credentials: true,
//   })
// );

// app.use(helmet());

// app.use(morgan("dev"));

// app.use(express.json());

// app.use(express.urlencoded({ extended: true }));

// app.use(cookieParser());

// app.get("/", (_req, res) => {
//   res.status(200).json({
//     success: true,
//     message: "ERP Backend Running Successfully",
//   });
// });

// export default app;



import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import router from "./routes";
import { notFound } from "./middlewares/notFound";
import { errorHandler } from "./middlewares/errorHandler";

import authRoutes from "./routes/auth.routes";

import departmentRoutes from "./routes/department.routes";

import attendanceRoutes from "./routes/attendance.routes";

import leaveRoutes from "./routes/leave.routes";

import payrollRoutes from "./routes/payroll.routes"

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(helmet());

app.use(morgan("dev"));


app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use("/api/attendance", attendanceRoutes);

// app.use("/auth", authRoutes);

// app.use("/api", router);

// app.use("/departments", departmentRoutes);

app.use("/api/auth", authRoutes);

app.use("/api/departments", departmentRoutes);

app.use("/api", router);
app.use("/api/leave", leaveRoutes);

app.use("/api/payroll", payrollRoutes);

app.use(notFound);

app.use(errorHandler);

export default app;