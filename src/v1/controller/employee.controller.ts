import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import EmployeeService from "../service/employee.service";
import { BaseResponse } from "../utils/base.response.utils";

class EmployeeController {
  private employeeService;

  constructor() {
    this.employeeService = new EmployeeService();
  }

  testRelationForGetDetail = async (req: Request, res: Response) => {
    try {
      const response: BaseResponse = new BaseResponse();
      const employee = await this.employeeService.testRelationForGetDetail(
        req.params.id
      );
      response.setData(employee);
      return res.status(StatusCodes.OK).json(response);
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        data: null,
      });
    }
  };
}

export default new EmployeeController();
