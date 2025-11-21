"use client";

import { useState } from "react";
import { submitContactForm } from "@/app/actions/contact";

export function ContactForm() {
  const [status, setStatus] = useState<{
    type: "idle" | "loading" | "success" | "error";
    message?: string;
  }>({ type: "idle" });

  async function handleSubmit(formData: FormData) {
    setStatus({ type: "loading" });

    const result = await submitContactForm(formData);

    if (result.success) {
      setStatus({ type: "success", message: "Message sent successfully!" });
      // Reset form
      const form = document.getElementById("contact-form") as HTMLFormElement;
      form?.reset();
    } else {
      setStatus({
        type: "error",
        message: result.error || "Failed to send message",
      });
    }
  }

  return (
    <form
      id="contact-form"
      action={handleSubmit}
      className="mt-10 mx-auto max-w-3xl space-y-8"
    >
      <div className="flex flex-col gap-2">
        <label
          htmlFor="name"
          className="text-sm font-medium text-zinc-700 dark:text-zinc-200"
        >
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          required
          className="w-full rounded-xl bg-zinc-100 px-4 py-3 text-base text-zinc-900 transition duration-200 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-brand/40 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-500"
          placeholder="Your name"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="email"
          className="text-sm font-medium text-zinc-700 dark:text-zinc-200"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className="w-full rounded-xl bg-zinc-100 px-4 py-3 text-base text-zinc-900 transition duration-200 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-brand/40 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-500"
          placeholder="you@company.com"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="company"
          className="text-sm font-medium text-zinc-700 dark:text-zinc-200"
        >
          Company
        </label>
        <input
          id="company"
          name="company"
          type="text"
          autoComplete="organization"
          className="w-full rounded-xl bg-zinc-100 px-4 py-3 text-base text-zinc-900 transition duration-200 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-brand/40 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-500"
          placeholder="Company name"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="project-details"
          className="text-sm font-medium text-zinc-700 dark:text-zinc-200"
        >
          What are you looking to do?
        </label>
        <textarea
          id="project-details"
          name="projectDetails"
          rows={4}
          required
          className="w-full resize-none rounded-xl bg-zinc-100 px-4 py-3 text-base text-zinc-900 transition duration-200 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-brand/40 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-500"
          placeholder="Share a little about your goals or what you need help with."
        />
      </div>

      {status.type === "success" && (
        <div className="rounded-xl bg-green-50 px-4 py-3 text-sm text-green-800 dark:bg-green-900/20 dark:text-green-300">
          {status.message}
        </div>
      )}

      {status.type === "error" && (
        <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-800 dark:bg-red-900/20 dark:text-red-300">
          {status.message}
        </div>
      )}

      <div>
        <button
          type="submit"
          disabled={status.type === "loading"}
          className="inline-flex items-center justify-center rounded-full bg-brand px-10 py-3 text-base font-semibold text-white transition-colors hover:bg-brand-strong focus:outline-none focus:ring-2 focus:ring-brand/40 focus:ring-offset-2 focus:ring-offset-white disabled:opacity-50 disabled:cursor-not-allowed dark:focus:ring-offset-brand-dark"
        >
          {status.type === "loading" ? "Sending..." : "Send Message"}
        </button>
      </div>
    </form>
  );
}
