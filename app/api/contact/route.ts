import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const resendApiKey = process.env.RESEND_API_KEY!;
const resendFrom = process.env.RESEND_FROM_EMAIL!;
const resendTo = process.env.RESEND_TO_EMAIL!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);
const resend = new Resend(resendApiKey);

function buildEmailHtml(data: {
  name: string;
  email: string;
  phone: string;
  project_type: string;
  budget: string;
  message: string;
}) {
  const typeLabel =
    data.project_type === "website"
      ? "Website Design"
      : data.project_type === "app"
        ? "App Design"
        : "Graphics Design";

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: system-ui, sans-serif; background: #f5f5f5; padding: 24px;">
  <div style="max-width: 560px; margin: 0 auto; background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 12px rgba(0,0,0,0.08);">
    <div style="background: #0F9BD0; padding: 24px 28px;">
      <h2 style="color: #fff; margin: 0; font-size: 18px;">New Contact Submission</h2>
      <p style="color: rgba(255,255,255,0.75); margin: 4px 0 0; font-size: 13px;">${typeLabel} — from ${data.name}</p>
    </div>
    <div style="padding: 24px 28px;">
      <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
        <tr>
          <td style="padding: 10px 0; color: #666; width: 120px; font-weight: 600;">Name</td>
          <td style="padding: 10px 0; color: #111;">${data.name}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; color: #666; font-weight: 600;">Email</td>
          <td style="padding: 10px 0; color: #111;"><a href="mailto:${data.email}">${data.email}</a></td>
        </tr>
        <tr>
          <td style="padding: 10px 0; color: #666; font-weight: 600;">Phone</td>
          <td style="padding: 10px 0; color: #111;">${data.phone || "—"}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; color: #666; font-weight: 600;">Project Type</td>
          <td style="padding: 10px 0; color: #111;">${typeLabel}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; color: #666; font-weight: 600;">Budget</td>
          <td style="padding: 10px 0; color: #111;">${data.budget}</td>
        </tr>
      </table>
      <hr style="border: none; border-top: 1px solid #eee; margin: 16px 0;">
      <p style="color: #666; font-weight: 600; margin: 0 0 8px; font-size: 14px;">Message</p>
      <p style="color: #333; margin: 0; line-height: 1.6; font-size: 14px; white-space: pre-wrap;">${data.message}</p>
    </div>
    <div style="background: #fafafa; padding: 16px 28px; border-top: 1px solid #eee;">
      <p style="color: #999; font-size: 11px; margin: 0;">Sent via Matembo Tech Contact Form</p>
    </div>
  </div>
</body>
</html>`;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, project_type, budget, message } = body;

    // Validate required fields
    if (!name || !email || !project_type || !budget || !message) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: "Invalid email format" },
        { status: 400 },
      );
    }

    // 1. Save to Supabase
    const { error: dbError } = await supabase.from("messages").insert({
      name,
      email,
      phone: phone || null,
      project_type,
      budget,
      message,
      status: "new",
    });

    if (dbError) {
      console.error("Supabase insert error:", dbError);
      return NextResponse.json(
        { success: false, error: "Failed to save submission" },
        { status: 500 },
      );
    }

    // 2. Send email via Resend
    try {
      await resend.emails.send({
        from: `Matembo Tech <${resendFrom}>`,
        to: [resendTo],
        replyTo: email,
        subject: `New Contact: ${project_type} from ${name}`,
        html: buildEmailHtml({ name, email, phone, project_type, budget, message }),
      });
    } catch (emailError) {
      // Log but don't fail — data is already saved
      console.error("Resend email error:", emailError);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 },
    );
  }
}
