import { NextFunction, Request, Response } from "express";
import { get } from "lodash";
import EmployeeService from "../service/employee.service";
import SessionService from "../service/session.service";
import jwtUtils from "../utils/jwt.utils";

const deserialize = async (req: Request, res: Response, next: NextFunction) => {
  const accessToken: string = get(req, "headers.authorization", "").replace(
    /^Bearer\s/,
    ""
  );

  const refreshToken: string | string[] = get(req, "headers.x-refresh", "");

  if (!accessToken) return next();

  const { decode, expired } = jwtUtils.decode(accessToken);

  if (decode) {
    const employee = await new EmployeeService().findByEmail(decode.email);

    if (!employee) return next();

    res.locals.user = { ...employee, session_id: decode.session_id };

    return next();
  }

  if (expired && refreshToken) {
    // ? Nếu token đã hết hạn và client có gửi refreshToken
    if (typeof refreshToken !== "string") return next();
    const newAccessToken: string | boolean =
      await new SessionService().reIssueAccessToken(refreshToken);

    if (newAccessToken) {
      // * Add the new access token to the response header for client
      res.setHeader("x-access-token", newAccessToken);

      const { decode } = jwtUtils.decode(newAccessToken);

      if (!decode) return next();

      const employee = await new EmployeeService().findByEmail(decode.email);

      if (!employee) return next();

      res.locals.user = { ...employee, session_id: decode.session_id };

      return next();
    }
  }

  return next();
};

export default deserialize;
