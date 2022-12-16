import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { StatusCodes } from "http-status-codes";
import { RoleService } from "../service/role.service";
import { BaseResponse } from "../utils/base.response.utils";

class RoleController {
  private roleService;

  constructor() {
    this.roleService = new RoleService();
  }

  createRole = async (req: Request, res: Response) => {
    try {
      const response: BaseResponse = new BaseResponse();
      const id: string = uuidv4();
      const role = await this.roleService.createRole({ ...req.body, id });
      response.setData(role);
      return res.status(StatusCodes.OK).json(response);
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        data: null,
      });
    }
  };

  getAll = async (req: Request, res: Response) => {
    try {
      const response: BaseResponse = new BaseResponse();
      const roles = await this.roleService.getAll();
      response.setData(roles);
      return res.status(StatusCodes.OK).json(response);
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        data: null,
      });
    }
  };

  getDetail = async (req: Request, res: Response) => {
    try {
      const response: BaseResponse = new BaseResponse();
      const role = await this.roleService.findById(req.params.id);

      if (!role) {
        response.setStatus(StatusCodes.BAD_REQUEST);
        response.setMessage(StatusCodes.BAD_REQUEST, "Role not found!!!");
        return res.status(StatusCodes.BAD_REQUEST).json(response);
      }

      response.setData(role);
      return res.status(StatusCodes.OK).json(response);
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        data: null,
      });
    }
  };

  updateName = async (req: Request, res: Response) => {
    try {
      const response: BaseResponse = new BaseResponse();
      const role = await this.roleService.findById(req.params.id);

      if (!role) {
        response.setStatus(StatusCodes.BAD_REQUEST);
        response.setMessage(StatusCodes.BAD_REQUEST, "Role not found!!!");
        return res.status(StatusCodes.BAD_REQUEST).json(response);
      }

      const { name }: { name: string } = req.body;
      const roleUpdated = await this.roleService.updateName(
        { name: name.toUpperCase() },
        req.params.id
      );
      response.setData(roleUpdated);
      return res.status(StatusCodes.OK).json(response);
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        data: null,
      });
    }
  };
}

export default new RoleController();
