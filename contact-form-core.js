(function (root, factory) {
  const api = factory();
  root.ContactFormCore = api;
  if (typeof module === "object" && module.exports) module.exports = api;
}(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  const CONSENT_VERSION = "2026-07-14-v1";
  const INTENTS = ["shop_owner", "introduction", "report_feedback"];
  const ENDPOINT_PATTERN = /^https:\/\/submit-form\.com\/[A-Za-z0-9_-]+$/;

  function isValidEndpoint(endpoint) {
    return ENDPOINT_PATTERN.test(String(endpoint || "").trim());
  }

  function isValidPhone(phone) {
    const value = String(phone || "").trim();
    return /^[+]?[-().\s\d]{7,30}$/.test(value) && (value.match(/\d/g) || []).length >= 6;
  }

  function buildPayload(options) {
    const input = options || {};
    const email = String(input.email || "").trim();
    const phone = String(input.phone || "").trim();
    const honeypot = String(input.honeypot || "");
    const intent = INTENTS.includes(input.intent) ? input.intent : "shop_owner";
    const language = input.language === "en" ? "en" : "es";
    const submittedAt = input.submittedAt || new Date().toISOString();
    const payload = {
      intent: intent,
      consent: "granted",
      consent_version: CONSENT_VERSION,
      consent_language: language,
      submitted_at: submittedAt,
      source: "report_contact_form"
    };
    if (email) payload.email = email;
    if (phone) payload.phone = phone;
    if (honeypot) payload._gotcha = honeypot;
    return payload;
  }

  return {
    CONSENT_VERSION: CONSENT_VERSION,
    buildPayload: buildPayload,
    isValidEndpoint: isValidEndpoint,
    isValidPhone: isValidPhone
  };
}));
