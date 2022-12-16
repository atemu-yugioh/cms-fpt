import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import TodoService from "../service/todo.service";
import { BaseResponse } from "../utils/base.response.utils";

class TodoController {
  private todoService;

  constructor() {
    this.todoService = new TodoService();
  }

  create = async (req: Request, res: Response) => {
    try {
      const response: BaseResponse = new BaseResponse();
      const id = uuidv4();
      const todo = await this.todoService.create({ ...req.body, id });

      response.setData(todo);
      return res.status(StatusCodes.OK).json({
        status: StatusCodes.OK,
        data: response,
      });
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        data: null,
      });
    }
  };

  getList = async (req: Request, res: Response) => {
    try {
      const response: BaseResponse = new BaseResponse();
      const limit: number = +(req.query.limit as string);
      const offset: number = +(req.query.offset as string);

      const listTodo = await this.todoService.getList(limit, offset);

      response.setData(listTodo);
      return res.status(StatusCodes.OK).json({
        status: StatusCodes.OK,
        data: response,
      });
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        msg: ReasonPhrases.INTERNAL_SERVER_ERROR,
        data: null,
      });
    }
  };

  getDetail = async (req: Request, res: Response) => {
    try {
      const response: BaseResponse = new BaseResponse();
      const todo = await this.todoService.getDetail(req.params.id);
      response.setData(todo);
      return res
        .status(StatusCodes.OK)
        .json({ status: StatusCodes.OK, data: response });
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        msg: ReasonPhrases.INTERNAL_SERVER_ERROR,
        data: null,
      });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const response: BaseResponse = new BaseResponse();
      const todo = await this.todoService.update(req.params.id, req.body);
      response.setData(todo);
      return res.status(StatusCodes.OK).json({
        status: StatusCodes.OK,
        msg: ReasonPhrases.OK,
        data: response,
      });
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        msg: ReasonPhrases.INTERNAL_SERVER_ERROR,
        data: null,
      });
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const response: BaseResponse = new BaseResponse();
      const todo = await this.todoService.delete(req.params.id);
      response.setData(todo);
      return res.status(StatusCodes.OK).json({
        status: StatusCodes.OK,
        msg: ReasonPhrases.OK,
        data: response,
      });
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        msg: ReasonPhrases.INTERNAL_SERVER_ERROR,
        data: null,
      });
    }
  };
}

export default new TodoController();
