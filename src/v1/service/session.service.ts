import { EmployeeInstance } from "./../entities/employee.entities";
import { SessionAttributes } from "./../entities/session.entities";
import { SessionInstance } from "../entities/session.entities";
import jwtUtils from "../utils/jwt.utils";
import EmployeeService from "./employee.service";

export default class SessionService {
  createSession = async (sessionData: SessionAttributes) => {
    const session = await SessionInstance.findOne({
      where: {
        employee_id: sessionData.employee_id,
        user_agent: sessionData.user_agent,
      },
    });

    if (session) {
      // * update session
      const newSession = await SessionInstance.update(sessionData, {
        where: {
          employee_id: sessionData.employee_id,
          user_agent: sessionData.user_agent,
        },
      });
      return sessionData;
    } else {
      const newSession = await SessionInstance.create(sessionData);
      return newSession.toJSON();
    }
  };

  updateSession = async (sessionId: string) => {
    const session = await SessionInstance.update(
      { valid: false },
      { where: { id: sessionId } }
    );
    return session;
  };

  reIssueAccessToken = async (refreshToken: string) => {
    // * Decode refresh token
    const { decode } = jwtUtils.decode(refreshToken);

    if (!decode) return false;

    // * Get the session
    const session = await SessionInstance.findOne({
      where: { id: decode.session_id },
    });
    // * Make sure session is valid
    if (!session || !session?.toJSON().valid) return false;

    const employee = await new EmployeeService().findByEmail(decode.email);

    if (!employee) return false;

    const accessToken: string = jwtUtils.sign({
      email: decode.email,
      session_id: decode.session_id,
    });

    return accessToken;
  };
}
