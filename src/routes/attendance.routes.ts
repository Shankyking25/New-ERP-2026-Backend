import { Router } from "express";

import * as controller from "../controllers/attendance.controller";

import {
  attendanceValidator,
} from "../validators/attendance.validator";

const router = Router();

router.get("/", controller.list);

router.get("/stats", controller.stats);

router.get("/:id", controller.single);

router.post(
  "/",
  attendanceValidator,
  controller.create
);

router.put(
  "/:id",
  attendanceValidator,
  controller.update
);

router.delete(
  "/:id",
  controller.remove
);

export default router;