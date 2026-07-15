# A pie de mostrador

Public, shareable output of the HCD retailer-listening research in Barcelona: what small
independent shops are really dealing with, told back to them in their own words.

This repo is the dev-marketing MVP for the research series:

- **`index.html`** — the interactive report (Edition 1, n=8, May–July 2026). Spanish first,
  with Catalan and English versions. Four recurring themes, verbatim anonymised quotes, an honest-limits note, and a
  "¿Te suena?" tally that turns recognition into conversation requests. The contact form appears
  once after the one-minute summary and again at the end, so visitors can respond early or after
  reading the full report.
- **`flyer.html`** — a one-page, A4-printable flyer with the four themes and a QR code that
  points at the live report. For WhatsApp, email and paper.
- **`privacy.html`** — the Spanish, Catalan and English second-layer privacy notice for the contact form.

## Live

Published with GitHub Pages from the root of `main`:
**https://chpmoreno.github.io/apiedemostrador/**

To update: edit, commit, push. Pages redeploys automatically.

## Contact form setup

The site is static, so form submissions go through
[Formspark](https://formspark.io/). The production endpoint is configured in `index.html` as
`https://submit-form.com/hMkS3NNqL`.

If the form is replaced or migrated:

1. Copy the new endpoint shown by Formspark. It should look like
   `https://submit-form.com/your-form-id`.
2. In `index.html`, replace the complete URL in the `contact-form-endpoint` meta tag's
   `content` attribute. The JavaScript accepts only HTTPS endpoints on `submit-form.com`.
3. Send one clearly labelled test submission, check that the notification and dashboard entry
   arrive, then delete the test record.

Run the deterministic form-core tests with:

```sh
node --test tests/contact-form-core.test.cjs
```

The endpoint/form ID is public by design; it is not a password. Never add account credentials,
API keys or inbox secrets to this repository.

Each submission contains only the contact channel(s) supplied by the visitor plus `intent`,
`consent`, `consent_version`, `consent_language`, `submitted_at` and `source`. A `_gotcha`
honeypot is included for spam protection. There is no free-text field, analytics or marketing
opt-in. The `source` value distinguishes `early_contact_form` from `report_contact_form`, so
their relative conversion can be compared in Formspark without adding behavioural tracking.

### Operational privacy checklist

The interface supports GDPR compliance, but code alone cannot guarantee compliance. Before
enabling the production form:

- review and accept Formspark's processor terms/DPA and current subprocessors;
- secure the Formspark account and notification inbox, limiting access to José;
- delete contact requests no later than six months after the last contact, as promised in the
  notice, and document that recurring process;
- keep a simple record of processing and a procedure for access, correction, deletion and
  consent-withdrawal requests sent to `chpmoreno@gmail.com`;
- provide separate privacy information before collecting interview notes, recordings or any
  data beyond this initial contact request;
- update both the visible notice and `CONSENT_VERSION` in `contact-form-core.js` whenever the
  purpose, provider or privacy wording changes.

## Identity

Warm light paper, market-awning green, receipt-slip quotes. The eight accent colours are a
quiet homage: each belongs to one of the eight interviewed shops (their storefront, logo or
world), validated for contrast and colour-vision accessibility on the light surface. No shop
names appear anywhere; quotes are attributed by category only.

## Provenance

Written by José (chpmoreno@gmail.com) with AI assistance, from his own interviews and
synthesis. All quotes are verbatim from the interviews. Edition 1 covers 8 conversations;
the research continues toward 12.
