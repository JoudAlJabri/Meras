const cron = require("node-cron");
const Session = require("../models/Session");
const User = require("../models/User");
const { sendSessionReminder } = require("../services/emailService");

// Runs every minute. Finds sessions starting in 14–16 minutes that haven't
// been emailed yet, sends a reminder to the explorer, and marks emailSent.
function startSessionReminderJob() {
  cron.schedule("* * * * *", async () => {
    try {
      const now = new Date();
      const windowStart = new Date(now.getTime() + 14 * 60 * 1000);
      const windowEnd   = new Date(now.getTime() + 16 * 60 * 1000);

      const upcoming = await Session.find({
        slot:      { $gte: windowStart, $lte: windowEnd },
        emailSent: false,
        status:    { $nin: ["cancelled"] },
      });

      for (const session of upcoming) {
        try {
          // Look up names from email addresses
          const explorer = await User.findOne({ email: session.explorerEmail }).select("name");
          const guide    = await User.findOne({ email: session.mentorEmail  }).select("name");

          await sendSessionReminder({
            toEmail:     session.explorerEmail,
            explorerName: explorer?.name || session.explorerEmail,
            guideName:   guide?.name    || session.mentorEmail,
            slot:        session.slot,
            topic:       session.topic,
            meetingLink: session.meetingLink,
          });

          session.emailSent = true;
          await session.save();

          console.log(`Reminder sent to ${session.explorerEmail} for session ${session._id}`);
        } catch (emailErr) {
          console.error(`Failed to send reminder for session ${session._id}:`, emailErr.message);
        }
      }
    } catch (err) {
      console.error("sessionReminder job error:", err.message);
    }
  });

  console.log("Session reminder job started (runs every minute)");
}

module.exports = { startSessionReminderJob };
