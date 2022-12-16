import jwt from "jsonwebtoken";
import config from "../../config/config";

const privateKey: string = config.private_key;

export interface payloadJwt extends jwt.JwtPayload {
  email: string;
  session_id: string;
}

export interface payloadDecode extends payloadJwt {
  iat?: number;
  exp?: number;
}

class jwtUtils {
  sign = (payload: payloadJwt, option?: jwt.SignOptions | undefined) => {
    return jwt.sign(payload, privateKey, option);
  };

  decode = (token: string) => {
    try {
      const decode = <payloadDecode>jwt.verify(token, privateKey);
      return {
        valid: true,
        expired: false,
        decode: decode,
      };
    } catch (error) {
      return {
        valid: false,
        expired: true,
        decode: null,
      };
    }
  };
}

export default new jwtUtils();
