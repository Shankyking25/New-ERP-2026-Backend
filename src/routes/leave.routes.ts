import { Router } from "express";

import {
  createLeaveController,
  getLeavesController,
  getLeaveController,
  updateLeaveController,
  deleteLeaveController,
  getLeaveStatsController,
} from "../controllers/leave.controller";

const router = Router();

/* ==========================
   DASHBOARD STATS
========================== */

router.get(
  "/stats",
  getLeaveStatsController
);

/* ==========================
   GET ALL
========================== */

router.get(
  "/",
  getLeavesController
);

/* ==========================
   GET ONE
========================== */

router.get(
  "/:id",
  getLeaveController
);

/* ==========================
   CREATE
========================== */

router.post(
  "/",
  createLeaveController
);

/* ==========================
   UPDATE
========================== */

router.put(
  "/:id",
  updateLeaveController
);

/* ==========================
   DELETE
========================== */

router.delete(
  "/:id",
  deleteLeaveController
);

export default router;