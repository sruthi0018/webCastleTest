import { createOAuthClient } from "../config/google";
import { google } from "googleapis";
import { decryptToken } from "./tokenCrypto";

export async function exchangeCode(code: string) {
  const oauth2Client = createOAuthClient();
  const { tokens } = await oauth2Client.getToken(code);
  return tokens; // contains access_token, refresh_token
}

export async function getOAuthClientForUser(refreshTokenEnc: string) {
  const oauth2Client = createOAuthClient();
  const refreshToken = decryptToken(refreshTokenEnc);
  oauth2Client.setCredentials({ refresh_token: refreshToken });
  return oauth2Client;
}

export async function getEventsForUser(refreshTokenEnc: string, minutesAhead = 5) {
  const oauth2Client = await getOAuthClientForUser(refreshTokenEnc);
  const calendar = google.calendar({ version: "v3", auth: oauth2Client });
  const now = new Date();
  const later = new Date(now.getTime() + minutesAhead * 60 * 1000);
  const res = await calendar.events.list({
    calendarId: "primary",
    timeMin: now.toISOString(),
    timeMax: later.toISOString(),
    singleEvents: true,
    orderBy: "startTime",
    maxResults: 20,
  });
  return res.data.items || [];
}
