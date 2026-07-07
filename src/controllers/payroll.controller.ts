import { Request, Response } from "express";

import {
  createPayroll,
  getPayrolls,
  getPayroll,
  updatePayroll,
  deletePayroll,
  getPayrollStats,
} from "../services/payroll.service";

/* CREATE */
export const createPayrollController = async (
  req: Request,
  res: Response
) => {


  try {
    const payroll = await createPayroll(req.body);

    res.status(201).json({
      success: true,
      payroll,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/* GET ALL */
export const getPayrollsController = async (
  req: Request,
  res: Response
) => {
  try {
    const result = await getPayrolls(req.query);

    res.status(200).json({
      success: true,
      payrolls: result.payrolls,
      total: result.total,
      page: result.page,
      limit: result.limit,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/* GET ONE */
export const getPayrollController = async (
  req: Request,
  res: Response
) => {
  try {
    const payroll = await getPayroll(req.params.id);

    if (!payroll) {
      return res.status(404).json({
        success: false,
        message: "Payroll not found",
      });
    }

    res.status(200).json({
      success: true,
      payroll,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/* UPDATE */
export const updatePayrollController = async (
  req: Request,
  res: Response
) => {
  try {
    const payroll = await updatePayroll(
      req.params.id,
      req.body
    );

    res.status(200).json({
      success: true,
      payroll,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/* DELETE */
export const deletePayrollController = async (
  req: Request,
  res: Response
) => {
  try {
    await deletePayroll(req.params.id);

    res.status(200).json({
      success: true,
      message: "Deleted successfully",
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/* STATS */
export const getPayrollStatsController = async (
  req: Request,
  res: Response
) => {
  try {
    const stats = await getPayrollStats();

    res.status(200).json({
      success: true,
      stats,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};