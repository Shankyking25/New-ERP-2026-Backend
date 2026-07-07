// import { Router } from "express";

// import * as controller from "../controllers/employee.controller";

// import {employeeValidator,} from "../validators/employee.validator";

// import upload from "../middlewares/upload";


// const router=Router();

// router.get("/",controller.list);


// router.get("/stats",controller.stats);


// router.get("/:id",controller.single);

// router.post("/", employeeValidator,controller.create);

// router.put(
// "/:id",
// employeeValidator,
// controller.update
// );

// router.delete(
// "/:id",
// controller.remove
// );


// router.post(
//   "/",
//   upload.single("avatar"),
//   controller.create
// );

// router.put(
//   "/:id",
//   upload.single("avatar"),
//   controller.update
// );

// router.get("/", controller.list);
// router.get("/:id", controller.single);
// router.delete("/:id", controller.remove);


// router.post(
//   "/",
//   upload.single("avatar"),
//   controller.create
// );

// router.put(
//   "/:id",
//   upload.single("avatar"),
//   controller.update
// );





// export default router;



import { Router } from "express";

import * as controller from "../controllers/employee.controller";
import { employeeValidator } from "../validators/employee.validator";
import upload from "../middlewares/upload";

const router = Router();

/* ===========================
   EMPLOYEE ROUTES
=========================== */

router.get("/", controller.list);

router.get("/stats", controller.stats);

router.get("/:id", controller.single);

router.post(
  "/",
  upload.single("avatar"),
  employeeValidator,
  controller.create
);

router.put(
  "/:id",
  upload.single("avatar"),
  employeeValidator,
  controller.update
);

router.delete("/:id", controller.remove);

export default router;