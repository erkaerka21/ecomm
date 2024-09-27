import jsonWebToken from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { decodeToken } from "../utils/jsonwebtoken";
// export interface IRequest extends Request {
//   user: object | string;
// }

declare global {
  namespace Express {
    interface Request {
      user: any;
    }
  }
}

export const auth = (req: Request, res: Response, next: NextFunction) => {
  if (!req.headers.authorization) {
    return res.status(401).json({
      message: "зөвхөн нэвтэрсэн хэрэглэгч дараах үйлдлийг хийж болно",
    });
  }
  const token = req.headers.authorization.split(" ")[1];
  const user = decodeToken(token);
  req.user = user;
  next();
};
