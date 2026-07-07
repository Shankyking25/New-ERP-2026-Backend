import { Request, Response } from "express";

import {
  createLeave,
  getLeaves,
  getLeave,
  updateLeave,
  deleteLeave,
  getLeaveStats,
} from "../services/leave.service";

/* ==========================
   CREATE
========================== */

export const createLeaveController = async (
  req: Request,
  res: Response
) => {
  try {
    const leave = await createLeave(req.body);

    return res.status(201).json({
      success: true,
      leave,
    });

  } catch (error: any) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

/* ==========================
   LIST
========================== */

export const getLeavesController = async (
  req: Request,
  res: Response
) => {

  try {

    const result =
      await getLeaves(req.query);

    return res.status(200).json({

      success: true,

      leaves: result.leaves,

      total: result.total,

      page: result.page,

      limit: result.limit,

    });

  } catch (error: any) {

    return res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};

/* ==========================
   SINGLE
========================== */

export const getLeaveController = async (
  req: Request,
  res: Response
) => {

  try {

    const leave =
      await getLeave(req.params.id);

    if (!leave) {

      return res.status(404).json({

        success: false,

        message: "Leave not found",

      });

    }

    return res.status(200).json({

      success: true,

      leave,

    });

  } catch (error: any) {

    return res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};

/* ==========================
   UPDATE
========================== */

export const updateLeaveController = async (
  req: Request,
  res: Response
) => {

  try {

    const leave =
      await updateLeave(
        req.params.id,
        req.body
      );

    if (!leave) {

      return res.status(404).json({

        success: false,

        message: "Leave not found",

      });

    }

    return res.status(200).json({

      success: true,

      leave,

    });

  } catch (error: any) {

    return res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};

/* ==========================
   DELETE
========================== */

export const deleteLeaveController = async (
  req: Request,
  res: Response
) => {

  try {

    const leave =
      await deleteLeave(req.params.id);

    if (!leave) {

      return res.status(404).json({

        success: false,

        message: "Leave not found",

      });

    }

    return res.status(200).json({

      success: true,

      message: "Leave deleted successfully",

    });

  } catch (error: any) {

    return res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};

/* ==========================
   DASHBOARD STATS
========================== */

export const getLeaveStatsController =
  async (
    req: Request,
    res: Response
  ) => {

    try {

      const stats =
        await getLeaveStats();

      return res.status(200).json({

        success: true,

        stats,

      });

    } catch (error: any) {

      return res.status(500).json({

        success: false,

        message: error.message,

      });

    }

  };