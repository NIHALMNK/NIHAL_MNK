import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { contactFormSchema } from "@/lib/validation/contact";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // 1. Server-side validation with Zod
    const validationResult = contactFormSchema.safeParse(body);

    if (!validationResult.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of validationResult.error.issues) {
        const path = issue.path[0];
        if (path && typeof path === "string") {
          fieldErrors[path] = issue.message;
        }
      }
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed. Please check the form fields.",
          errors: fieldErrors,
        },
        { status: 400 }
      );
    }

    const { name, email, message } = validationResult.data;

    // 2. Resend API Key check
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.warn(
        "[Contact API] RESEND_API_KEY is not configured in environment variables. Message received:",
        { name, email, messageLength: message.length }
      );
      // If no API key is configured in dev environment, still respond cleanly
      return NextResponse.json({
        success: true,
        message: "Message received (Development mode: RESEND_API_KEY not configured).",
      });
    }

    // 3. Send email via Resend
    const resend = new Resend(apiKey);
    const toEmail = process.env.CONTACT_TO_EMAIL || "mohammednihal.dev@gmail.com";
    const fromEmail =
      process.env.RESEND_FROM_EMAIL || "Portfolio Contact <onboarding@resend.dev>";

    const emailResponse = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: email,
      subject: `[Portfolio Contact] New message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });

    if (emailResponse.error) {
      console.error("[Contact API] Resend error:", emailResponse.error);
      return NextResponse.json(
        {
          success: false,
          message: "Failed to send message. Please try again later.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Your message has been sent successfully!",
    });
  } catch (error) {
    console.error("[Contact API] Unexpected error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An unexpected error occurred. Please try again later.",
      },
      { status: 500 }
    );
  }
}
