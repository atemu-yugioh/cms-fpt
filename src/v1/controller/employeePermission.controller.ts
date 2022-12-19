import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { v4 as uuidv4 } from "uuid";
import EmployeeService from "../service/employee.service";
import { PermissionService } from "../service/permission.service";
import { EmployeePermissionService } from "../service/employeePermission.service";
import { BaseResponse } from "../utils/base.response.utils";

class EmployeePermissionController {
  private employeePermissionService;
  private employeeService;
  private permissionService;

  constructor() {
    this.employeePermissionService = new EmployeePermissionService();
    this.employeeService = new EmployeeService();
    this.permissionService = new PermissionService();
  }

  createEmployeePermission = async (req: Request, res: Response) => {
    try {
      const response: BaseResponse = new BaseResponse();

      // * check user and permission
      const employee = await this.employeeService.findById(
        req.body.employee_id
      );
      const permission = await this.permissionService.findById(
        req.body.permission_id
      );

      if (!employee || !permission) {
        response.setStatus(StatusCodes.BAD_REQUEST);
        response.setMessage(
          StatusCodes.BAD_REQUEST,
          "Employee or permission invalid!!!"
        );
        return res.status(StatusCodes.BAD_REQUEST).json(response);
      }

      // * check employee permission
      const employeePermission =
        await this.employeePermissionService.findByEmployeeIdAndPermissionId(
          req.body.employee_id,
          req.body.permission_id
        );

      // * exits => update valid: true
      if (employeePermission) {
        const employeePermissionUpdated =
          await this.employeePermissionService.updateById(
            { valid: true },
            employeePermission.id
          );
        response.setData(employeePermissionUpdated);
        return res.status(StatusCodes.GONE).json(response);
      }

      // * not exist => create new
      const id = uuidv4();
      const newEmployeePermission =
        await this.employeePermissionService.createEmployeePermission({
          ...req.body,
          id,
        });
      response.setData(newEmployeePermission);
      return res.status(StatusCodes.OK).json(response);
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        data: null,
      });
    }
  };

  removeEmployeePermission = async (req: Request, res: Response) => {
    try {
      const response: BaseResponse = new BaseResponse();
      const { employee_id, permission_id } = req.body as {
        employee_id: string;
        permission_id: string;
      };
      const conditionUpdate = {
        employee_id,
        permission_id,
      };
      const employeePermission =
        await this.employeePermissionService.removeEmployeePermission(
          { valid: false },
          conditionUpdate
        );
      response.setData(employeePermission);
      return res.status(StatusCodes.OK).json(response);
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        data: null,
      });
    }
  };
}

export default new EmployeePermissionController();
