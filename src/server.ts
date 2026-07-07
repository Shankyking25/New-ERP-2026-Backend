// import dotenv from "dotenv";

// dotenv.config();

// import app from "./app";

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log("--------------------------------");
//   console.log("ERP Backend Started");
//   console.log(`Server : http://localhost:${PORT}`);
//   console.log("--------------------------------");
// });



import dotenv from "dotenv";

dotenv.config();

import app from "./app";
import { connectDB } from "./config/database";
import { env } from "./config/env";

import cookieParser from "cookie-parser";

app.use(cookieParser());


const startServer = async () => {
  await connectDB();

  app.listen(env.PORT, () => {
    console.log("=====================================");
    console.log(`Server Running on ${env.PORT}`);
    console.log("=====================================");
  });
};

startServer();
