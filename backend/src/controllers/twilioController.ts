import { Request, Response } from "express";
import { makeCall } from "../services/twilioServices";

export const testCall = async (req: Request, res: Response) => {
  try {
    console.log("test call req.query", req.query);
    const to = req.query.to as string;
    const message = req.query.message as string || "Test call from reminder app.";
    await makeCall(to, message);
    res.send("Test call triggered");
  } catch (err) {
    console.error("test call err", err);
    res.status(500).send("Failed to trigger call");
  }
};
