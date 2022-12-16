import { SessionAttributes } from "./../entities/session.entities";
import { BaseResponse } from "./../utils/base.response.utils";
import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { StatusCodes } from "http-status-codes";
import EmployeeService from "../service/employee.service";
import jwtUtils from "../utils/jwt.utils";
import config from "../../config/config";
import SessionService from "../service/session.service";

class AuthController {
  private employeeService;
  private sessionService;

  constructor() {
    this.employeeService = new EmployeeService();
    this.sessionService = new SessionService();
  }

  register = async (req: Request, res: Response) => {
    try {
      const response: BaseResponse = new BaseResponse();
      const id = uuidv4();
      const employee = await this.employeeService.createEmployee({
        ...req.body,
        id,
      });
      response.setData(employee);
      return res.status(StatusCodes.OK).json(response);
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        data: null,
      });
    }
  };

  login = async (req: Request, res: Response) => {
    try {
      const response: BaseResponse = new BaseResponse();
      const employee = await this.employeeService.validatePassword(req.body);

      if (!employee) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json(new BaseResponse(400, "Invalid email or password!!!", null));
      }

      const sessionData: SessionAttributes = {
        id: uuidv4(),
        employee_id: employee.id,
        user_agent: req.get("user-agent") || "",
        valid: true,
      };

      const newSession = await this.sessionService.createSession(sessionData);

      const accessToken: string = jwtUtils.sign(
        { email: employee.email, session_id: newSession.id },
        { expiresIn: config.access_token_ttl }
      );

      const refreshToken: string = jwtUtils.sign(
        { email: employee.email, session_id: newSession.id },
        { expiresIn: config.refresh_token_ttl }
      );

      response.setData({
        access_token: accessToken,
        refresh_token: refreshToken,
      });

      return res.status(StatusCodes.OK).json(response);
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        data: null,
      });
    }
  };

  logout = async (req: Request, res: Response) => {
    try {
      const response: BaseResponse = new BaseResponse();
      const { user } = res.locals;

      const { session_id: sessionId } = user;
      const session = await this.sessionService.updateSession(sessionId);
      response.setData(session);
      return res.status(StatusCodes.OK).json(response);
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        data: null,
      });
    }
  };
}

export default new AuthController();
