// import { Router } from "express";
// import { verifyToken } from "../middlewares/auth.middleware";

// const router = Router();

// // 🔒 Protected route
// router.get("/profile", verifyToken, (req, res) => {
//   res.json({
//     success: true,
//     message: "Protected data accessed",
//     user: (req as any).user,
//   });
// });

// export default router;


import { Router } from "express";
import { verifyToken } from "../middlewares/auth.middleware";

const router = Router();

// 🔒 Protected route
router.get("/profile", verifyToken, (req, res) => {
  return res.json({
    success: true,
    message: "Protected data accessed",
    user: req.user,
  });
});

export default router;