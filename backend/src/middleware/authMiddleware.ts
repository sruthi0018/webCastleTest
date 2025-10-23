import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";

export async function requireAuth(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.cookies?.session || (req.headers.authorization && (req.headers.authorization as string).split(" ")[1]);
    if (!token) return res.status(401).json({ error: "Not authenticated" });

    const payload = jwt.verify(token, process.env.JWT_SECRET as string) as any;
    if (!payload?.userId) return res.status(401).json({ error: "Invalid token" });

    const user = await User.findById(payload.userId);
    if (!user) return res.status(401).json({ error: "User not found" });

    (req as any).user = user;
    next();
  } catch (err) {
    console.error("auth error", err);
    res.status(401).json({ error: "Unauthorized" });
  }
}
