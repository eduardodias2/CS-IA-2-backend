import jsonwebtoken from "jsonwebtoken";
import { JWT_SECRET } from "../envs.js";

export default async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const jwtUser = jsonwebtoken.verify(token, JWT_SECRET);
    req.user = jwtUser.user
    return next();
  } catch (error) {
    return res.status(401).json({ error: "Not Authorized" });
  }
};
