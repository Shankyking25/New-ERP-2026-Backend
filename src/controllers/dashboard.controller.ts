import { Request, Response } from "express";

import * as service from "../services/dashboard.service";

export const overview = async (
  _req: Request,
  res: Response
) => {
  const data = await service.getOverview();

  res.json({
    success: true,
    data,
  });
};

export const recentEmployees = async (
  _req: Request,
  res: Response
) => {
  const employees =
    await service.getRecentEmployees();

  res.json({
    success: true,
    employees,
  });
};

export const charts = async (
  _req: Request,
  res: Response
) => {
  const chart =
    await service.getDepartmentChart();

  res.json({
    success: true,
    chart,
  });
};