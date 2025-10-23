import cron from "node-cron";
import dayjs from "dayjs";
import User from "../models/User";
import { getEventsForUser } from "./googleServices";
import { makeCall } from "./twilioServices";

export function startCron() {
  // Run every minute
  cron.schedule("* * * * *", async () => {
    console.log("[cron] tick", new Date().toISOString());

    try {
      const users = await User.find({ phone: { $exists: true, $ne: null } });

      for (const user of users) {
        try {
          // Fetch user's next 10 events (or adjust as needed)
          const events = await getEventsForUser(user.refreshTokenEnc || "", 10);

          for (const ev of events) {
            const id = ev.id;
            if (!id) continue; // skip if no event ID
            if (user.calledEvents.includes(id)) continue; // already called

            // Event start time
            const startTimeStr = ev.start?.dateTime || ev.start?.date || "";
            if (!startTimeStr) continue;

            const startTime = dayjs(startTimeStr);
            const now = dayjs();
            const diffMinutes = startTime.diff(now, "minute");

            console.log("diff",diffMinutes,startTimeStr)
            // Trigger call if event is within next 5 minutes
            if (diffMinutes <= 5 && diffMinutes >= 0) {
              const summary = ev.summary || "Event";
              const message = `Reminder: ${summary} at ${startTime.format("HH:mm")}`;

              console.log(`[cron] Calling ${user.email} for event ${id} starting in ${diffMinutes} minutes`);
              await makeCall(user.phone!, message);

              // Mark event as called
              user.calledEvents.push(id);
              await user.save();
            }
          }
        } catch (userErr) {
          console.error("[cron] user error:", user.email, userErr);
        }
      }
    } catch (err) {
      console.error("[cron] error:", err);
    }
  });
}
