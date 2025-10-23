import cron from "node-cron";
import User from "../models/User";
import { getEventsForUser } from "./googleServices";
import { makeCall } from "./twilioServices";

export function startCron() {
  cron.schedule("* * * * *", async () => {
    console.log("[cron] tick", new Date().toISOString());
    try {
      const users = await User.find({ phone: { $exists: true, $ne: null } });
      for (const user of users) {
        try {
          const events = await getEventsForUser(user.refreshTokenEnc || "", 5);
          for (const ev of events) {
            const id = ev.id;
            if (!id) continue;
            if (user.calledEvents.includes(id)) continue;
            const start = ev.start?.dateTime || ev.start?.date || "";
            const summary = ev.summary || "Event";
            const message = `Reminder: ${summary} at ${start}`;
            await makeCall(user.phone!, message);
            user.calledEvents.push(id);
            await user.save();
            console.log(`[cron] called ${user.email} for event ${id}`);
          }
        } catch (uErr) {
          console.error("[cron] user error:", user.email, uErr);
        }
      }
    } catch (err) {
      console.error("[cron] error:", err);
    }
  });
}
