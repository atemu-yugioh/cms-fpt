import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { BaseResponse } from "./../utils/base.response.utils";
import { ActionService } from "../service/action.service";

class ActionController {
  private actionService;

  constructor() {
    this.actionService = new ActionService();
  }

  createAction = async (req: Request, res: Response) => {
    try {
      const response: BaseResponse = new BaseResponse();
      const id: string = uuidv4();
      const action = await this.actionService.createAction({ ...req.body, id });
      response.setData(action);
      return res.status(StatusCodes.OK).json(response);
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        data: null,
      });
    }
  };
}

export default new ActionController();
