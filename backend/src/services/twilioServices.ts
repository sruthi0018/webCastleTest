import { TWILIO_CLIENT, TWILIO_CALLER } from "../config/twilio";

function escapeXml(s = "") {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&apos;" }[c]!));
}

export async function makeCall(to: string, message: string) {
  const twiml = `<Response><Say voice="alice">${escapeXml(message)}</Say></Response>`;
  return TWILIO_CLIENT.calls.create({ to, from: TWILIO_CALLER, twiml });
}
