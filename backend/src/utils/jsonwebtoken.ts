import jsonwebtoken from "jsonwebtoken";

export const generateToken = (payload: object) => {
  return jsonwebtoken.sign(payload, process.env.JSON_WEB_TOKEN_PASSWORD || "", {
    expiresIn: "7d",
  });
};
export const decodeToken = (token: string) => {
  return jsonwebtoken.verify(token, process.env.JSON_WEB_TOKEN_PASSWORD || "");
};
