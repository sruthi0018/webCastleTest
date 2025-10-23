import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import axios from "axios";
import { createOAuthClient, GOOGLE_SCOPES } from "../config/google";
import { exchangeCode } from "../services/googleServices";
import User from "../models/User";
import { encryptToken } from "../services/tokenCrypto";


export const googleAuth = (req: Request, res: Response) => {
  const client = createOAuthClient();
  const url = client.generateAuthUrl({ access_type: "offline", prompt: "consent", scope: GOOGLE_SCOPES });
  res.redirect(url);
};

export const googleCallback = async (req: Request, res: Response) => {
  try {
    const code = req.query.code as string;
    if (!code) return res.status(400).send("Missing code");
    const tokens = await exchangeCode(code);
    const accessToken = tokens.access_token;

    const profileRes = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const profile = profileRes.data;
    let user = await User.findOne({ googleId: profile.sub });
    if (!user) {
      user = new User({ googleId: profile.sub, email: profile.email, name: profile.name });
    }
    if (tokens.refresh_token) {
      user.refreshTokenEnc = encryptToken(tokens.refresh_token);
    }
    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET as string, { expiresIn: "7d" });
    res.cookie("session", token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax" });

    const frontend = process.env.FRONTEND_URL || "http://localhost:3000";
    res.redirect(`${frontend}/dashboard?email=${encodeURIComponent(user.email)}`);
  } catch (err) {
    console.error("oauth callback error", err);
    res.status(500).send("OAuth callback failed");
  }
};
