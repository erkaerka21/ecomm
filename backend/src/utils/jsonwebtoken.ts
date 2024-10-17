import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const generateToken = (payload: object) => {
  return jsonwebtoken.sign(payload, process.env.JSON_WEB_TOKEN_PASSWORD || "", {
    expiresIn: 30 * 24 * 60 * 60,
  });
};
export const decodeToken = (token: string) => {
  return jsonwebtoken.verify(token, process.env.JSON_WEB_TOKEN_PASSWORD || "");
};
