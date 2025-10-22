const cron = require("node-cron");
const User = require("../model/user");
const { getUpcomingEvents } = require("./googleServices");
const { makeCall } = require("./twilioServices");

function startCron() {
  cron.schedule("* * * * *", async () => {
    console.log("🔁 Checking events...");
    const users = await User.find({ phone: { $exists: true, $ne: "" } });

    for (const user of users) {
      try {
        const events = await getUpcomingEvents(user.refreshToken);
        for (const event of events) {
          if (user.calledEvents.includes(event.id)) continue;

          const message = `Reminder: ${event.summary || "You have an event"} starting soon.`;
          await makeCall(user.phone, message);
          user.calledEvents.push(event.id);
          await user.save();
        }
      } catch (err) {
        console.log("Error:", err.message);
      }
    }
  });
}

module.exports = { startCron };
