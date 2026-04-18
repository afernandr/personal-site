import type { APIRoute } from "astro";
import { env as cloudflareEnv } from "cloudflare:workers";

export const prerender = false;

export const OPTIONS: APIRoute = async () => {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
};

export const POST: APIRoute = async ({ request }) => {
  const contentType = request.headers.get("Content-Type") || "";
  console.log("Content-Type header:", contentType);

  const isFormData =
    contentType.includes("application/x-www-form-urlencoded") ||
    contentType.includes("multipart/form-data");

  if (!isFormData) {
    console.log("FAIL: Invalid content type, got:", contentType);
    return new Response(
      JSON.stringify({ error: "Invalid content type", received: contentType }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      },
    );
  }

  try {
    const formData = await request.formData();
    console.log("FormData parsed successfully");

    const name = formData.get("name")?.toString().trim();
    const email = formData.get("email")?.toString().trim();
    const message = formData.get("message")?.toString().trim();

    console.log("Fields:", { name, email, messageLength: message?.length });

    if (!name || !email || !message) {
      console.log("FAIL: Missing fields");
      return new Response(
        JSON.stringify({ error: "All fields are required" }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        },
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log("FAIL: Invalid email");
      return new Response(JSON.stringify({ error: "Invalid email address" }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
    }

    const emailBody = `New contact form submission

From: ${name} <${email}>

Message:
${message}
`;

    console.log("Attempting to send email...");
    const senderAddress = "website@andresfernandez.work";
    const destinationAddress = cloudflareEnv.DESTINATION_EMAIL;
    const sendEmail = cloudflareEnv.SEND_EMAIL;

    console.log("SEND_EMAIL binding exists:", !!sendEmail);
    console.log("Sending email:", {
      from: senderAddress,
      to: destinationAddress,
      replyTo: email,
      subject: `Contact from ${name}`,
    });

    try {
      await sendEmail.send({
        to: destinationAddress,
        from: senderAddress,
        replyTo: email,
        subject: `Contact from ${name}`,
        text: emailBody,
      });
      console.log("Email sent successfully!");
    } catch (sendError) {
      console.error("SEND_EMAIL.send() failed:", sendError);
      throw sendError;
    }

    console.log("Email sent successfully!");
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (error) {
    console.error("Email send error:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to send message",
        details: String(error),
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      },
    );
  }
};
