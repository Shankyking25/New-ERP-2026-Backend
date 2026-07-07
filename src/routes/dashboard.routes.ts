// import { Router } from "express";

// import * as controller from "../controllers/dashboard.controller";

// const router = Router();

// router.get(
//   "/overview",
//   controller.overview
// );

// router.get(
//   "/recent-employees",
//   controller.recentEmployees
// );

// router.get(
//   "/charts",
//   controller.charts
// );

// export default router;








import { Router } from "express";

import * as controller from "../controllers/dashboard.controller";

const router = Router();

router.get(
  "/overview",
  controller.overview
);

router.get(
  "/recent-employees",
  controller.recentEmployees
);

router.get(
  "/charts",
  controller.charts
);

export default router;