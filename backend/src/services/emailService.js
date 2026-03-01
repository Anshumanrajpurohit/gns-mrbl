import nodemailer from "nodemailer";

let transporter = null;
let transportInitAttempted = false;

const buildEnquiryHtml = (title, enquiry) => `
  <div style="font-family:Arial,sans-serif;background:#f4f6f8;padding:24px;">
    <div style="max-width:640px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e4e7eb;">
      <div style="padding:20px 24px;background:#111827;color:#ffffff;">
        <h2 style="margin:0;font-size:20px;">${title}</h2>
      </div>
      <div style="padding:24px;">
        <p style="margin:0 0 14px;color:#374151;"><strong>Name:</strong> ${enquiry.name}</p>
        <p style="margin:0 0 14px;color:#374151;"><strong>Phone:</strong> ${enquiry.phone}</p>
        <p style="margin:0 0 14px;color:#374151;"><strong>Email:</strong> ${enquiry.email || "-"}</p>
        <p style="margin:0 0 14px;color:#374151;"><strong>Service:</strong> ${enquiry.service}</p>
        <p style="margin:0;color:#374151;"><strong>Message:</strong><br/>${enquiry.message}</p>
      </div>
    </div>
  </div>
`;

const getTransporter = () => {
  if (transporter || transportInitAttempted) {
    return transporter;
  }

  transportInitAttempted = true;
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 0);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !port || !user || !pass) {
    console.warn("SMTP not configured. Enquiry emails are disabled.");
    return null;
  }

  transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  return transporter;
};

const sendEnquiryNotifications = async ({ enquiry, adminEmail }) => {
  const activeTransporter = getTransporter();
  if (!activeTransporter) {
    return;
  }

  const from = process.env.SMTP_USER;
  const recipients = [
    {
      to: adminEmail,
      subject: "New Enquiry Received",
      html: buildEnquiryHtml("New Enquiry Received", enquiry),
    },
    {
      to: enquiry.email,
      subject: "We Received Your Enquiry",
      html: buildEnquiryHtml("Thank You For Contacting Us", enquiry),
    },
  ].filter((item) => Boolean(item.to));

  await Promise.allSettled(
    recipients.map((item) =>
      activeTransporter.sendMail({
        from,
        to: item.to,
        subject: item.subject,
        html: item.html,
      })
    )
  );
};

export { sendEnquiryNotifications };
