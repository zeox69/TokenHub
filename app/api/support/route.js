import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const { email, message } = await request.json();

    if (!email || !message) {
      return Response.json(
        { error: "Email and message are required." },
        { status: 400 }
      );
    }

    const { error } = await resend.emails.send({
      from: "Yzarvo Support <onboarding@resend.dev>",
      to: ["charbelmerza3@gmail.com"],
      subject: "New Yzarvo Support Message",
      html: `
        <h2>New Yzarvo Support Message</h2>
        <p><b>User Email:</b> ${email}</p>
        <p><b>Message:</b></p>
        <p>${message}</p>
      `,
    });

    if (error) {
      return Response.json({ error: "Email failed to send." }, { status: 500 });
    }

    return Response.json({ success: true });
  } catch {
    return Response.json({ error: "Server error." }, { status: 500 });
  }
}
