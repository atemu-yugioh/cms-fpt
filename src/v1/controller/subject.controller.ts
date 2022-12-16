import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { StatusCodes } from "http-status-codes";
import { SubjectService } from "../service/subject.service";
import { BaseResponse } from "../utils/base.response.utils";

class SubjectController {
  private subjectService;

  constructor() {
    this.subjectService = new SubjectService();
  }

  createSubject = async (req: Request, res: Response) => {
    try {
      const response: BaseResponse = new BaseResponse();
      const id: string = uuidv4();
      const subject = await this.subjectService.createSubject({
        ...req.body,
        id,
      });
      response.setData(subject);
      return res.status(StatusCodes.OK).json(subject);
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        data: null,
      });
    }
  };
}

export default new SubjectController();
