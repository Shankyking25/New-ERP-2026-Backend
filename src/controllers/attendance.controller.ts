import { Request, Response } from "express";

import * as service from "../services/attendance.service";

/* =========================
   CREATE
========================= */

export const create = async (
  req: Request,
  res: Response
) => {
  try {
    const attendance =
      await service.createAttendance(req.body);

    return res.status(201).json({
      success: true,
      attendance,
    });

  } catch (error) {

    return res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Create failed",
    });

  }
};

/* =========================
   LIST
========================= */

export const list = async (
  req: Request,
  res: Response
) => {
  try {

    const result =
      await service.getAttendances(req.query);

    return res.json({
      success: true,
      ...result,
    });

  } catch {

    return res.status(500).json({
      success: false,
      message: "Fetch failed",
    });

  }
};

/* =========================
   SINGLE
========================= */

export const single = async (
  req: Request,
  res: Response
) => {
  try {

    const attendance =
      await service.getAttendance(req.params.id);

    return res.json({
      success: true,
      attendance,
    });

  } catch {

    return res.status(404).json({
      success: false,
      message: "Attendance not found",
    });

  }
};

/* =========================
   UPDATE
========================= */

export const update = async (
  req: Request,
  res: Response
) => {
  try {

    const attendance =
      await service.updateAttendance(
        req.params.id,
        req.body
      );

    return res.json({
      success: true,
      attendance,
    });

  } catch {

    return res.status(400).json({
      success: false,
      message: "Update failed",
    });

  }
};

/* =========================
   DELETE
========================= */

export const remove = async (
  req: Request,
  res: Response
) => {
  try {

    await service.deleteAttendance(req.params.id);

    return res.json({
      success: true,
      message: "Deleted successfully",
    });

  } catch {

    return res.status(400).json({
      success: false,
      message: "Delete failed",
    });

  }
};

/* =========================
   STATS
========================= */

export const stats = async (
  _req: Request,
  res: Response
) => {
  try {

    const stats =
      await service.getAttendanceStats();

    return res.json({
      success: true,
      stats,
    });

  } catch {

    return res.status(500).json({
      success: false,
      message: "Stats failed",
    });

  }
};