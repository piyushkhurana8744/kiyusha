import nodemailer from "nodemailer";

// Helper to configure the email transporter
function getTransporter() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT) || 587;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASSWORD;

  if (!host || !user || !pass) {
    // Return dummy transporter for local testing if credentials are missing
    console.warn("SMTP credentials are missing in env. Local dummy mail logger activated.");
    return {
      sendMail: async (mailOptions: any) => {
        console.log("------------------- DUMMY SMTP LOGGER -------------------");
        console.log("To:", mailOptions.to);
        console.log("Subject:", mailOptions.subject);
        console.log("HTML Content Excerpt:\n", mailOptions.html.slice(0, 500));
        console.log("---------------------------------------------------------");
        return { messageId: "dummy-id-" + Date.now() };
      }
    } as any;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465, // Use SSL for port 465
    auth: { user, pass }
  });
}

// Global brand HTML wrapper
const emailWrapper = (title: string, content: string) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${title}</title>
  <style>
    body {
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
      background-color: #faf7f2;
      color: #1a1a1a;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 40px auto;
      background-color: #ffffff;
      border: 1px solid #eae2d5;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0,0,0,0.02);
    }
    .header {
      background-color: #1a1a1a;
      color: #faf7f2;
      padding: 40px 20px;
      text-align: center;
    }
    .header h1 {
      font-size: 28px;
      letter-spacing: 0.18em;
      margin: 0;
      text-transform: uppercase;
      font-weight: 300;
    }
    .content {
      padding: 40px 30px;
      line-height: 1.6;
      font-size: 14px;
    }
    .content h2 {
      font-size: 20px;
      font-weight: 400;
      color: #1a1a1a;
      margin-top: 0;
      margin-bottom: 20px;
      border-bottom: 1px solid #f4efe6;
      padding-bottom: 10px;
    }
    .btn-container {
      text-align: center;
      margin: 30px 0;
    }
    .btn {
      background-color: #d4af37;
      color: #1a1a1a !important;
      text-decoration: none;
      padding: 14px 28px;
      font-size: 12px;
      text-transform: uppercase;
      font-weight: bold;
      letter-spacing: 0.15em;
      display: inline-block;
      border-radius: 4px;
    }
    .footer {
      background-color: #f4efe6;
      color: #1a1a1a;
      opacity: 0.6;
      padding: 20px;
      text-align: center;
      font-size: 11px;
      letter-spacing: 0.08em;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Kiyusha</h1>
    </div>
    <div class="content">
      ${content}
    </div>
    <div class="footer">
      &copy; 2026 Kiyusha. All Rights Reserved.<br>
      Everyday Demi-Fine Luxury Jewellery
    </div>
  </div>
</body>
</html>
`;

export async function sendVerificationEmail(email: string, token: string) {
  const transporter = getTransporter();
  const verifyUrl = `${process.env.BETTER_AUTH_URL || "http://localhost:3000"}/verify-email?token=${token}`;

  const html = emailWrapper(
    "Verify Your Account | Kiyusha",
    `
    <h2>Confirm Your Registration</h2>
    <p>Welcome to Kiyusha. From our local stall to your style, we are delighted to welcome you to our community.</p>
    <p>Please confirm your email address to activate your account and start browsing our anti-tarnish luxury collections.</p>
    <div class="btn-container">
      <a href="${verifyUrl}" class="btn">Verify Account</a>
    </div>
    <p>If the button above does not work, please copy and paste the following link into your browser:</p>
    <p style="word-break: break-all;"><a href="${verifyUrl}" style="color: #d4af37;">${verifyUrl}</a></p>
    <p>This verification link is valid for 24 hours.</p>
    `
  );

  await transporter.sendMail({
    from: '"Kiyusha" <no-reply@kiyusha.com>',
    to: email,
    subject: "Verify your email address - Kiyusha",
    html
  });
}

export async function sendPasswordResetEmail(email: string, token: string) {
  const transporter = getTransporter();
  const resetUrl = `${process.env.BETTER_AUTH_URL || "http://localhost:3000"}/reset-password?token=${token}`;

  const html = emailWrapper(
    "Reset Your Password | Kiyusha",
    `
    <h2>Password Reset Request</h2>
    <p>We received a request to reset the password for your account on Kiyusha.</p>
    <p>Click the button below to set a new password. If you did not make this request, you can safely ignore this email.</p>
    <div class="btn-container">
      <a href="${resetUrl}" class="btn">Reset Password</a>
    </div>
    <p>If the button above does not work, please copy and paste the following link into your browser:</p>
    <p style="word-break: break-all;"><a href="${resetUrl}" style="color: #d4af37;">${resetUrl}</a></p>
    <p>This password reset link is valid for 1 hour.</p>
    `
  );

  await transporter.sendMail({
    from: '"Kiyusha" <security@kiyusha.com>',
    to: email,
    subject: "Reset your password - Kiyusha",
    html
  });
}

export async function sendWelcomeEmail(email: string, name: string) {
  const transporter = getTransporter();

  const html = emailWrapper(
    "Welcome to Kiyusha",
    `
    <h2>Welcome, ${name}</h2>
    <p>Your Kiyusha account has been successfully verified.</p>
    <p>Explore our curated selections of everyday demi-fine jewellery and artisan handcrafted crochet accessories.</p>
    <div class="btn-container">
      <a href="${process.env.BETTER_AUTH_URL || "http://localhost:3000"}/collections" class="btn">Shop the Collections</a>
    </div>
    <p>If you have any questions or need assistance, feel free to get in touch with us at support@kiyusha.com.</p>
    `
  );

  await transporter.sendMail({
    from: '"Kiyusha" <welcome@kiyusha.com>',
    to: email,
    subject: "Welcome to Kiyusha!",
    html
  });
}

export async function sendPasswordChangedEmail(email: string) {
  const transporter = getTransporter();

  const html = emailWrapper(
    "Password Changed | Kiyusha",
    `
    <h2>Password Updated</h2>
    <p>This is a security notification confirming that the password for your Kiyusha account was successfully changed.</p>
    <p>If you performed this change, no further action is required.</p>
    <p style="color: #721c24; background-color: #f8d7da; padding: 12px; border-radius: 4px; border: 1px solid #f5c6cb;">
      <strong>Security Warning:</strong> If you did not request this password change, please contact our support team immediately at security@kiyusha.com to secure your account.
    </p>
    `
  );

  await transporter.sendMail({
    from: '"Kiyusha Security" <security@kiyusha.com>',
    to: email,
    subject: "Security Alert: Password Changed - Kiyusha",
    html
  });
}
