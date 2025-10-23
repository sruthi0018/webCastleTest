import Twilio from "twilio";

export const sid = process.env.TWILIO_SID || process.env.TWILIO_SID; // compatibility
export const TWILIO_CLIENT = Twilio(process.env.TWILIO_SID!, process.env.TWILIO_TOKEN!);
export const TWILIO_CALLER = process.env.TWILIO_PHONE!;
