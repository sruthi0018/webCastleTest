import { Request, Response } from "express";
import User from "../models/User";

export const getMe = async (req: Request, res: Response) => {
  const user = (req as any).user;
  if (!user) return res.status(401).json({ error: "Unauthorized" });
  res.json({ id: user._id, email: user.email, name: user.name, phone: user.phone });
};

export const savePhone = async (req: Request, res: Response) => {
  const { phone } = req.body;
  const user = (req as any).user;
  if (!user) return res.status(401).json({ error: "Unauthorized" });
  user.phone = phone;
  await user.save();
  res.json({ ok: true });
};
