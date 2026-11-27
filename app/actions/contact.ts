"use server";

import {
  detectSpam,
  HONEYPOT_FIELD,
  STARTED_AT_FIELD,
} from "@/lib/contact-spam";

interface ContactFormData {
  name: string;
  email: string;
  projectDetails: string;
}

// Discord caps embed field values at 1024 chars and descriptions at 4096.
const MAX_NAME_LENGTH = 200;
const MAX_EMAIL_LENGTH = 254;
const MAX_DETAILS_LENGTH = 4000;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function field(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export async function submitContactForm(formData: FormData) {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

  if (!webhookUrl) {
    console.error("DISCORD_WEBHOOK_URL is not set");
    return { success: false, error: "Server configuration error" };
  }

  try {
    const data: ContactFormData = {
      name: field(formData, "name"),
      email: field(formData, "email"),
      projectDetails: field(formData, "projectDetails"),
    };

    if (!data.name || !data.email || !data.projectDetails) {
      return { success: false, error: "Please fill in all required fields" };
    }

    if (
      data.name.length > MAX_NAME_LENGTH ||
      data.email.length > MAX_EMAIL_LENGTH ||
      data.projectDetails.length > MAX_DETAILS_LENGTH ||
      !EMAIL_PATTERN.test(data.email)
    ) {
      return {
        success: false,
        error: "Please check your entries and try again",
      };
    }

    const spamReason = detectSpam({
      email: data.email,
      projectDetails: data.projectDetails,
      honeypot: formData.get(HONEYPOT_FIELD) as string | null,
      startedAt: formData.get(STARTED_AT_FIELD) as string | null,
    });

    if (spamReason) {
      // Report success so bots get no signal about what tripped the filter.
      console.warn(
        `Contact form submission dropped as spam (${spamReason}): ${data.email}`,
      );
      return { success: true };
    }

    // Format message for Discord
    const discordMessage = {
      // Never let submitted text ping @everyone/@here or roles.
      allowed_mentions: { parse: [] },
      embeds: [
        {
          title: "New Contact Form Submission",
          color: 0x5865f2, // Discord brand color
          description: data.projectDetails,
          fields: [
            {
              name: "Name",
              value: data.name,
              inline: true,
            },
            {
              name: "Email",
              value: data.email,
              inline: true,
            },
          ],
          timestamp: new Date().toISOString(),
        },
      ],
    };

    // Send to Discord webhook
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(discordMessage),
    });

    if (!response.ok) {
      // Discord explains the failure in the body; statusText alone can't
      // distinguish a deleted webhook from a malformed URL.
      const details = await response.text().catch(() => "");
      throw new Error(
        `Discord webhook failed: ${response.status} ${response.statusText} ${details}`,
      );
    }

    return { success: true };
  } catch (error) {
    console.error("Error submitting contact form:", error);
    return {
      success: false,
      error: "Failed to send message. Please try again later.",
    };
  }
}
