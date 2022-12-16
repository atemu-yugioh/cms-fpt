import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { v4 as uuidv4 } from "uuid";
import { ActionService } from "../service/action.service";
import { PermissionService } from "../service/permission.service";
import { SubjectService } from "../service/subject.service";
import { BaseResponse } from "../utils/base.response.utils";

class PermissionController {
  private permissionService;
  private actionService;
  private subjectService;

  constructor() {
    this.permissionService = new PermissionService();
    this.actionService = new ActionService();
    this.subjectService = new SubjectService();
  }

  createPermission = async (req: Request, res: Response) => {
    try {
      const response: BaseResponse = new BaseResponse();
      const id = uuidv4();

      // * check action and subject
      const action = await this.actionService.findById(req.body.action_id);
      const subject = await this.subjectService.findById(req.body.subject_id);

      if (!action || !subject) {
        response.setStatus(StatusCodes.BAD_REQUEST);
        response.setMessage(
          StatusCodes.BAD_REQUEST,
          "Action or Subject invalid!!!"
        );
        return res.status(StatusCodes.BAD_REQUEST).json(response);
      }

      // * check permission
      const permission = await this.permissionService.findByActIdAndSubId(
        action.id,
        subject.id
      );

      if (permission) {
        response.setStatus(StatusCodes.GONE);
        response.setMessage(StatusCodes.GONE, "Permission already exits!!!");
        return res.status(StatusCodes.GONE).json(response);
      }

      // * create new permission
      const newPermission = await this.permissionService.createPermission({
        ...req.body,
        id,
        name: `${action.name}-${subject.name}`,
      });
      response.setData(newPermission);
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
      const permissions = await this.permissionService.getAll();
      response.setData(permissions);
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
      const permission = await this.permissionService.findById(req.params.id);

      // * Error: Not found permission by id
      if (!permission) {
        response.setStatus(StatusCodes.BAD_REQUEST);
        response.setMessage(StatusCodes.BAD_REQUEST, "Permission not found!!!");
      }

      response.setData(permission);
      return res.status(StatusCodes.BAD_REQUEST).json(response);
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        data: null,
      });
    }
  };

  updateValid = async (req: Request, res: Response) => {
    try {
      const response: BaseResponse = new BaseResponse();
      const permission = await this.permissionService.findById(req.params.id);

      // * Error: Not found permission by id
      if (!permission) {
        response.setStatus(StatusCodes.BAD_REQUEST);
        response.setMessage(StatusCodes.BAD_REQUEST, "Permission not found!!!");
        return res.status(StatusCodes.BAD_REQUEST).json(response);
      }

      const { valid }: { valid: boolean } = req.body;
      const permissionUpdated = await this.permissionService.updateValid(
        { valid: valid },
        req.params.id
      );
      response.setData(permissionUpdated);
      return res.status(StatusCodes.OK).json(response);
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        data: null,
      });
    }
  };
}

export default new PermissionController();
