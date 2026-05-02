const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendSessionReminder = async ({ toEmail, explorerName, guideName, slot, topic, meetingLink }) => {
  const dateStr = new Date(slot).toLocaleDateString("en-US", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
  });
  const timeStr = new Date(slot).toLocaleTimeString("en-US", {
    hour: "2-digit", minute: "2-digit", hour12: true,
  });

  await transporter.sendMail({
    from: `"Meras" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: `⏰ Your session with ${guideName} starts in 15 minutes`,
    html: `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 560px; margin: 0 auto; background: #f9fafb; padding: 32px 24px;">
        <div style="background: #3DB87A; border-radius: 16px; padding: 28px 32px; margin-bottom: 24px;">
          <h1 style="color: #ffffff; margin: 0 0 6px 0; font-size: 24px; font-weight: 700;">
            Your session is almost here!
          </h1>
          <p style="color: rgba(255,255,255,0.85); margin: 0; font-size: 15px;">
            Hi ${explorerName}, your session starts in <strong>15 minutes</strong>.
          </p>
        </div>

        <div style="background: #ffffff; border-radius: 16px; padding: 28px 32px; margin-bottom: 20px; border: 1px solid #E5E7EB;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; color: #6B7280; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; width: 110px;">Guide</td>
              <td style="padding: 10px 0; color: #111827; font-size: 15px; font-weight: 600;">${guideName}</td>
            </tr>
            <tr style="border-top: 1px solid #F3F4F6;">
              <td style="padding: 10px 0; color: #6B7280; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">Date</td>
              <td style="padding: 10px 0; color: #111827; font-size: 15px;">${dateStr}</td>
            </tr>
            <tr style="border-top: 1px solid #F3F4F6;">
              <td style="padding: 10px 0; color: #6B7280; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">Time</td>
              <td style="padding: 10px 0; color: #111827; font-size: 15px;">${timeStr}</td>
            </tr>
            <tr style="border-top: 1px solid #F3F4F6;">
              <td style="padding: 10px 0; color: #6B7280; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">Topic</td>
              <td style="padding: 10px 0; color: #111827; font-size: 15px;">${topic}</td>
            </tr>
          </table>
        </div>

        <div style="text-align: center; margin-bottom: 24px;">
          <a href="${meetingLink}" target="_blank"
            style="display: inline-block; background: #3DB87A; color: #ffffff; text-decoration: none; border-radius: 999px; padding: 14px 36px; font-size: 16px; font-weight: 700; letter-spacing: 0.01em;">
            Join Session Now →
          </a>
          <p style="margin: 12px 0 0; font-size: 12px; color: #9CA3AF;">
            Or copy this link: <a href="${meetingLink}" style="color: #3DB87A;">${meetingLink}</a>
          </p>
        </div>

        <p style="text-align: center; font-size: 12px; color: #9CA3AF; margin: 0;">
          This is an automated reminder from Meras. The meeting uses Jitsi Meet — no account required.
        </p>
      </div>
    `,
  });
};

module.exports = { sendSessionReminder };
