import { Request, response, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { v4 as uuidv4 } from "uuid";
import EmployeeService from "../service/employee.service";
import { EmployeeRoleService } from "../service/employeeRole.service";
import { RoleService } from "../service/role.service";
import { BaseResponse } from "../utils/base.response.utils";

class EmployeeRoleController {
  private employeeRoleService;
  private roleService;
  private employeeService;

  constructor() {
    this.employeeRoleService = new EmployeeRoleService();
    this.roleService = new RoleService();
    this.employeeService = new EmployeeService();
  }

  createEmployeeRole = async (req: Request, res: Response) => {
    try {
      const response: BaseResponse = new BaseResponse();

      // * Check employee and role
      const employee = await this.employeeService.findById(
        req.body.employee_id
      );
      const role = await this.roleService.findById(req.body.role_id);

      if (!employee || !role) {
        response.setStatus(StatusCodes.BAD_REQUEST);
        response.setMessage(
          StatusCodes.BAD_REQUEST,
          "Employee or role invalid!!!"
        );
        return res.status(StatusCodes.BAD_REQUEST).json(response);
      }

      // * Check employee-role
      const employeeRole =
        await this.employeeRoleService.findByEmployeeIdAndRoleId(
          req.body.employee_id,
          req.body.role_id
        );

      // * exist => update valid: true
      if (employeeRole) {
        const employeeRoleUpdated = await this.employeeRoleService.updateById(
          { valid: true },
          employeeRole.id
        );
        response.setData(employeeRoleUpdated);
        return res.status(StatusCodes.OK).json(response);
      }

      // * not exist => create new employee-role
      const id: string = uuidv4();
      const newEmployeeRole = await this.employeeRoleService.createEmployeeRole(
        { ...req.body, id }
      );
      response.setData(newEmployeeRole);
      return res.status(StatusCodes.OK).json(response);
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        data: null,
      });
    }
  };
}

export default new EmployeeRoleController();
