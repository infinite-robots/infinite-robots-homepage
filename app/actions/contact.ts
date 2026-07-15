"use server";

interface ContactFormData {
  name: string;
  email: string;
  projectDetails: string;
}

export async function submitContactForm(formData: FormData) {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

  if (!webhookUrl) {
    console.error("DISCORD_WEBHOOK_URL is not set");
    return { success: false, error: "Server configuration error" };
  }

  try {
    const data: ContactFormData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      projectDetails: formData.get("projectDetails") as string,
    };

    // Basic validation
    if (!data.name || !data.email || !data.projectDetails) {
      return { success: false, error: "Please fill in all required fields" };
    }

    // Format message for Discord
    const discordMessage = {
      embeds: [
        {
          title: "New Contact Form Submission",
          color: 0x5865f2, // Discord brand color
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
            {
              name: "Project Details",
              value: data.projectDetails,
              inline: false,
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
