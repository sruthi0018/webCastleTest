const { google } = require("googleapis");

const SCOPES = [
  "https://www.googleapis.com/auth/userinfo.profile",
  "https://www.googleapis.com/auth/userinfo.email",
  "https://www.googleapis.com/auth/calendar.readonly",
];

function getOAuthClient() {
  return new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  );
}

function getAuthUrl() {
  const client = getOAuthClient();
  return client.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: SCOPES,
  });
}

async function getTokens(code) {
  const client = getOAuthClient();
  const { tokens } = await client.getToken(code);
  return tokens;
}

async function getUpcomingEvents(refreshToken) {
  const client = getOAuthClient();
  client.setCredentials({ refresh_token: refreshToken });

  const calendar = google.calendar({ version: "v3", auth: client });
  const now = new Date();
  const later = new Date(now.getTime() + 5 * 60 * 1000);

  const res = await calendar.events.list({
    calendarId: "primary",
    timeMin: now.toISOString(),
    timeMax: later.toISOString(),
    singleEvents: true,
    orderBy: "startTime",
  });

  return res.data.items || [];
}

module.exports = { getAuthUrl, getTokens, getUpcomingEvents };
