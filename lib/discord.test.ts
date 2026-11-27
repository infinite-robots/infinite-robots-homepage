import { describe, expect, it, vi } from "vitest";

import { isChatThread, isSnowflake } from "./discord";

const CHANNEL = "111111111111111111";

function mockChannel(parentId: string | null, ok = true) {
  vi.mocked(fetch).mockResolvedValueOnce({
    ok,
    json: async () => ({ parent_id: parentId }),
  } as Response);
}

describe("isSnowflake", () => {
  it("accepts Discord IDs and rejects anything else", () => {
    expect(isSnowflake("1234567890123456789")).toBe(true);
    expect(isSnowflake("123")).toBe(false);
    expect(isSnowflake("../channels/1234567890123456789")).toBe(false);
    expect(isSnowflake(1234567890123456789)).toBe(false);
  });
});

describe("isChatThread", () => {
  it("accepts threads under the chat channel and caches the result", async () => {
    mockChannel(CHANNEL);
    expect(await isChatThread("222222222222222222", "token", CHANNEL)).toBe(
      true,
    );
    const calls = vi.mocked(fetch).mock.calls.length;
    expect(await isChatThread("222222222222222222", "token", CHANNEL)).toBe(
      true,
    );
    expect(vi.mocked(fetch).mock.calls.length).toBe(calls);
  });

  it("rejects channels elsewhere in the server", async () => {
    mockChannel("999999999999999999");
    expect(await isChatThread("333333333333333333", "token", CHANNEL)).toBe(
      false,
    );
  });

  it("rejects channels the bot can't read", async () => {
    mockChannel(null, false);
    expect(await isChatThread("444444444444444444", "token", CHANNEL)).toBe(
      false,
    );
  });
});
