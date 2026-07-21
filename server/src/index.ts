import express, { type Request, type Response, type NextFunction } from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const PORT = Number(process.env.PORT) || 3000;
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || "").split(",").map((o) => o.trim()).filter(Boolean);
const CONTACT_TO_EMAIL = process.env.CONTACT_TO_EMAIL;

const app = express();

app.use(
  cors({
    origin: ALLOWED_ORIGINS.length ? ALLOWED_ORIGINS : false,
  })
);
app.use(express.json({ limit: "10kb" }));

// Very small in-memory rate limiter: max 5 submissions per IP per 10 minutes.
const submissionLog = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (submissionLog.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  timestamps.push(now);
  submissionLog.set(ip, timestamps);
  return timestamps.length > MAX_PER_WINDOW;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

function isContactPayload(body: unknown): body is ContactPayload {
  if (!body || typeof body !== "object") return false;
  const b = body as Record<string, unknown>;
  return (
    typeof b.name === "string" &&
    b.name.trim().length > 0 &&
    b.name.length <= 200 &&
    typeof b.email === "string" &&
    EMAIL_PATTERN.test(b.email) &&
    typeof b.message === "string" &&
    b.message.trim().length > 0 &&
    b.message.length <= 5000
  );
}

let transporter: nodemailer.Transporter | null = null;
if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

app.get("/api/health", (_req: Request, res: Response) => {
  res.json({ status: "ok" });
});

app.post("/api/contact", async (req: Request, res: Response) => {
  const ip = req.ip || "unknown";
  if (isRateLimited(ip)) {
    return res.status(429).json({ error: "Too many submissions. Please try again later." });
  }

  if (!isContactPayload(req.body)) {
    return res.status(400).json({ error: "Please provide a valid name, email, and message." });
  }

  const { name, email, message } = req.body as ContactPayload;

  if (!transporter || !CONTACT_TO_EMAIL) {
    console.warn("Contact form submitted but SMTP is not configured:", { name, email });
    return res.status(503).json({ error: "Contact form is not configured yet. Please email directly." });
  }

  try {
    await transporter.sendMail({
      from: `"Website Contact Form" <${process.env.SMTP_USER}>`,
      to: CONTACT_TO_EMAIL,
      replyTo: email,
      subject: `New message from ${name} via ethan-dang.github.io`,
      text: message,
      html: `<p><strong>From:</strong> ${escapeHtml(name)} (${escapeHtml(email)})</p><p>${escapeHtml(message).replace(/\n/g, "<br/>")}</p>`,
    });
    res.json({ status: "sent" });
  } catch (err) {
    console.error("Failed to send contact email:", err);
    res.status(502).json({ error: "Failed to send message. Please try again later." });
  }
});

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

app.use((_req: Request, res: Response) => {
  res.status(404).json({ error: "Not found" });
});

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`Contact API listening on port ${PORT}`);
});
