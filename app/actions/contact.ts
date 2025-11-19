"use server";

interface ContactFormData {
  name: string;
  email: string;
  company: string;
  projectDetails: string;
  referralSource?: string;
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
      company: formData.get("company") as string,
      projectDetails: formData.get("projectDetails") as string,
      referralSource: (formData.get("referralSource") as string) || undefined,
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
              name: "Company",
              value: data.company || "Not provided",
              inline: true,
            },
            {
              name: "Project Details",
              value: data.projectDetails,
              inline: false,
            },
            ...(data.referralSource
              ? [
                  {
                    name: "How they heard about us",
                    value: data.referralSource,
                    inline: false,
                  },
                ]
              : []),
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
      throw new Error(`Discord webhook failed: ${response.statusText}`);
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
