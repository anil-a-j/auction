import jwt from "jsonwebtoken";
import AsyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import { accessToken } from "../utils/generateToken.js";

export const protect = AsyncHandler(async (req, res, next) => {
  let refresh = req.cookies.rf;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    let token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET_FIRST);
    let user = await User.findById(decoded.id).select("-password");
    if (user) {
      req.user = user;
      return next();
    }
  }

  if (refresh) {
    const decoded = jwt.verify(refresh, process.env.JWT_SECRET_SECOND);
    if (decoded.id) {
      res.json({
        access: accessToken(decoded.id),
      });
    } else {
      res.status(401);
      throw new Error("Invalid Credentials");
    }
  }

  if (!refresh) {
    res.end();
  }
});
