const twilio = require("twilio");

const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

async function makeCall(to, message) {
  const twiml = `<Response><Say voice="alice">${message}</Say></Response>`;
  await client.calls.create({
    to,
    from: process.env.TWILIO_PHONE,
    twiml,
  });
  console.log("📞 Call triggered to", to);
}

module.exports = { makeCall };
