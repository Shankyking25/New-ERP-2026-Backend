import { Router } from "express";

import { register, login, refreshToken } from "../controllers/auth.controller";
import { registerValidator } from "../validators/auth.validator";
import { me } from "../controllers/auth.controller";


const router = Router();

router.post(
  "/register",
  registerValidator,
  register
);

router.get("/me", me);

router.post("/login", login); // 👈 ADD THIS


router.post("/refresh-token", refreshToken);


export default router;