const test = require("node:test");
const assert = require("node:assert/strict");
const core = require("../contact-form-core.js");

test("publishes the browser API even when a CommonJS module object exists", () => {
  assert.equal(globalThis.ContactFormCore, core);
});

test("accepts only the configured Formspark HTTPS endpoint shape", () => {
  assert.equal(core.isValidEndpoint("https://submit-form.com/Abc_123-xyz"), true);
  assert.equal(core.isValidEndpoint("http://submit-form.com/Abc123"), false);
  assert.equal(core.isValidEndpoint("https://formspark.io/Abc123"), false);
  assert.equal(core.isValidEndpoint("https://submit-form.com/Abc123?redirect=x"), false);
  assert.equal(core.isValidEndpoint(""), false);
});

test("accepts practical international phone formats and rejects malformed values", () => {
  assert.equal(core.isValidPhone("+34 612 345 678"), true);
  assert.equal(core.isValidPhone("(93) 555-12-12"), true);
  assert.equal(core.isValidPhone("12345"), false);
  assert.equal(core.isValidPhone("+34 CALL-ME"), false);
});

test("builds a minimal phone-only payload with consent evidence", () => {
  const payload = core.buildPayload({
    intent: "shop_owner",
    phone: "  +34 612 345 678  ",
    language: "es",
    submittedAt: "2026-07-14T20:00:00.000Z"
  });
  assert.deepEqual(payload, {
    intent: "shop_owner",
    consent: "granted",
    consent_version: "2026-07-14-v1",
    consent_language: "es",
    submitted_at: "2026-07-14T20:00:00.000Z",
    source: "report_contact_form",
    phone: "+34 612 345 678"
  });
  assert.equal("email" in payload, false);
});

test("keeps only supplied contact channels and preserves the spam honeypot", () => {
  const payload = core.buildPayload({
    intent: "introduction",
    email: "  shop@example.com ",
    phone: "",
    honeypot: "bot-value",
    language: "en",
    submittedAt: "2026-07-14T20:05:00.000Z"
  });
  assert.equal(payload.intent, "introduction");
  assert.equal(payload.email, "shop@example.com");
  assert.equal(payload.consent_language, "en");
  assert.equal(payload._gotcha, "bot-value");
  assert.equal("phone" in payload, false);
});

test("normalises unexpected intent and language values", () => {
  const payload = core.buildPayload({
    intent: "unexpected",
    language: "fr",
    email: "owner@example.com",
    submittedAt: "2026-07-14T20:10:00.000Z"
  });
  assert.equal(payload.intent, "shop_owner");
  assert.equal(payload.consent_language, "es");
});

test("preserves Catalan as the consent language", () => {
  const payload = core.buildPayload({ intent: "shop_owner", email: "botiga@example.com", language: "ca", source: "early_contact_form" });
  assert.equal(payload.consent_language, "ca");
  assert.equal(payload.source, "early_contact_form");
  assert.equal(payload.intent, "shop_owner");
});

test("normalises an unknown submission source", () => {
  const payload = core.buildPayload({ email: "owner@example.com", source: "unknown" });
  assert.equal(payload.source, "report_contact_form");
});
