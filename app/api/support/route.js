import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { email, message } = await req.json();

    if (!email || !message) {
      return NextResponse.json(
        { error: "Email and message are required." },
        { status: 400 }
      );
    }

    console.log("Support message received:", {
      email,
      message,
    });

    return NextResponse.json({
      success: true,
      message: "Message received successfully.",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to send support message." },
      { status: 500 }
    );
  }
}