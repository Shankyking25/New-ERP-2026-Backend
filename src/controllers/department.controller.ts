import { Request, Response } from "express";

import {
  createDepartment,
  deleteDepartment,
  getDepartmentById,
  getDepartments,
  updateDepartment,
} from "../services/department.service";

export const create = async (
  req: Request,
  res: Response
) => {
  try {

    const department =
      await createDepartment(req.body);

    res.status(201).json({
      success: true,
      department,
    });

  } catch (error: any) {

    res.status(400).json({
      success: false,
      message: error.message,
    });

  }
};

export const getAll = async (
  req: Request,
  res: Response
) => {

  const data =
    await getDepartments(req.query);

  res.json({
    success: true,
    ...data,
  });

};

export const getOne = async (
  req: Request,
  res: Response
) => {

  const department =
    await getDepartmentById(req.params.id);

  res.json({
    success: true,
    department,
  });

};

export const update = async (
  req: Request,
  res: Response
) => {

  const department =
    await updateDepartment(
      req.params.id,
      req.body
    );

  res.json({
    success: true,
    department,
  });

};

export const remove = async (
  req: Request,
  res: Response
) => {

  await deleteDepartment(
    req.params.id
  );

  res.json({
    success: true,
    message:
      "Department deleted successfully",
  });

};