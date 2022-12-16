import { StatusCodes, ReasonPhrases } from "http-status-codes";
import { NextFunction, Request, Response } from "express";

const requireUser = async (req: Request, res: Response, next: NextFunction) => {
  const { user } = res.locals;

  if (!user) {
    return res.status(StatusCodes.FORBIDDEN).json({
      status: StatusCodes.FORBIDDEN,
      message: ReasonPhrases.FORBIDDEN,
      data: null,
    });
  }

  return next();
};

export default requireUser;
