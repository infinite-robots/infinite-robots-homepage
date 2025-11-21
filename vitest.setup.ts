import "@testing-library/jest-dom";
import { vi } from "vitest";

// NEVER make real API calls in tests - mock all fetch calls globally
// This prevents Discord API calls, AI API calls, or any other HTTP requests
global.fetch = vi.fn(() =>
  Promise.resolve({
    ok: true,
    status: 200,
    statusText: "OK",
    json: async () => ({}),
    text: async () => "",
    headers: new Headers(),
    body: null,
    bodyUsed: false,
    redirected: false,
    type: "basic" as ResponseType,
    url: "",
    clone: vi.fn(),
    arrayBuffer: vi.fn(),
    blob: vi.fn(),
    formData: vi.fn(),
  } as unknown as Response),
);
