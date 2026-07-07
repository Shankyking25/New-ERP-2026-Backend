import { Router } from "express";

import {
  createPayrollController,
  getPayrollsController,
  getPayrollController,
  updatePayrollController,
  deletePayrollController,
  getPayrollStatsController,
} from "../controllers/payroll.controller";

const router = Router();

/* CREATE */
router.post("/", createPayrollController);

/* GET ALL */
router.get("/", getPayrollsController);

/* STATS */
router.get("/stats", getPayrollStatsController);

/* GET ONE */
router.get("/:id", getPayrollController);

/* UPDATE */
router.put("/:id", updatePayrollController);

/* DELETE */
router.delete("/:id", deletePayrollController);

export default router;