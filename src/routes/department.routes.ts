import { Router } from "express";

import {
  create,
  getAll,
  getOne,
  update,
  remove,
} from "../controllers/department.controller";

import {
  createDepartmentValidation,
} from "../validators/department.validation";

const router = Router();

/*
GET ALL
*/
router.get("/", getAll);

/*
GET ONE
*/
router.get("/:id", getOne);

/*
CREATE
*/
router.post(
  "/",
  createDepartmentValidation,
  create
);

/*
UPDATE
*/
router.put("/:id", update);

/*
DELETE
*/
router.delete("/:id", remove);

export default router;