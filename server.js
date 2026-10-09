import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Resend } from "resend";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const resend = new Resend(process.env.RESEND_API_KEY);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "DIAS Portfolio API is running",
  });
});

app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: "Name, email, and message are required.",
      });
    }

    if (!process.env.RESEND_API_KEY) {
      return res.status(500).json({
        success: false,
        error: "RESEND_API_KEY is missing in .env",
      });
    }

    if (!process.env.CONTACT_RECEIVER_EMAIL) {
      return res.status(500).json({
        success: false,
        error: "CONTACT_RECEIVER_EMAIL is missing in .env",
      });
    }

    const { data, error } = await resend.emails.send({
      from: "DIAS Portfolio <onboarding@resend.dev>",
      to: [process.env.CONTACT_RECEIVER_EMAIL],
      reply_to: email,
      subject: `New Portfolio Contact — ${name}`,
      text: `
Name: ${name}
Email: ${email}

Message:
${message}
      `,
    });

    if (error) {
      console.error("Resend API error:", error);
      return res.status(400).json({
        success: false,
        error: "Failed to send email through provider.",
      });
    }

    console.log("Email sent successfully:", data);

    return res.status(200).json({
      success: true,
      message: "Signal transmitted successfully.",
    });
  } catch (error) {
    console.error("Email sending error:", error);

    return res.status(500).json({
      success: false,
      error: "Failed to send message.",
    });
  }
});

app.listen(port, () => {
  console.log(`DIAS Portfolio API running on http://localhost:${port}`);
});