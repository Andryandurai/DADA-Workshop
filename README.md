# TEAM DADA Workshops

A dedicated React, TypeScript, and Vite site for DADA's school and college workshops. Built separately from the original portfolio. Includes all 10 workshop descriptions and 10 activities from `WORKSHOP IDEAS.docx`, search and combined filters, workshop/activity dialogs, audience pathways, verified team profiles, an institutional enquiry form, FAQs, and dark/light themes.

## Run locally

Requires Node.js 22.12+ (validated with Node 24) and npm.

```powershell
cd 'C:\Users\Andry\Workshop DADA\workshops'
npm ci
npm run dev
```

Open the printed localhost URL. `npm run build` runs strict TypeScript checking and creates `dist/`. `npm run preview` serves the production build locally. `npm test` runs the Playwright interaction/accessibility suite; install the Chromium test browser with `npx playwright install chromium` if needed. No separate linter is configured.

## Project structure

```text
workshops/
  src/
    App.tsx            Page sections, filters, navigation and accessible dialogs
    Contact.tsx        Institutional enquiry and email draft handoff
    data.ts            Typed workshop/activity data and verified team profiles
    enquiry.ts         Validation, draft composition and optional delivery adapter
    main.tsx           React entry point
    styles.css         DADA design system, responsive layouts and themes
  public/assets/       Original DADA logo, mascots, portraits and self-hosted fonts
  tests/site.spec.ts   Browser, accessibility and optional delivery checks
  .github/workflows/deploy.yml
  .openai/hosting.json Private Sites identity and static output configuration
  .env.example        Build configuration reference
  .env.production     Confirmed Sites address; overridden by the Pages workflow
  ASSETS.md           Asset provenance and verified public identity/contact sources
  index.html          Semantic document, metadata, fonts and favicon
  vite.config.ts      Hosting base path, canonical/Open Graph/robots/sitemap generation
```

## Enquiry delivery

The default flow prepares an email to **teamdadaoffl@gmail.com**, verified in the official DADA consultancy source and live page. The user reviews the draft, opens an email app, and sends it. Copy and plain-text download fallbacks are available. Preparing, opening, copying or downloading never claims the message was delivered or a booking confirmed. Browser email handling requires the visitor's configured email client. Large drafts may exceed some email clients' mailto limits; copy/download remains available.

The form does not persist personal details in local storage or transmit them to a backend by default. Only the theme preference is stored. Required fields, topic selection, consent, email, participant count and dates are validated. A date is an enquiry preference, not an availability guarantee.

An optional owner-managed HTTPS service can be configured with `VITE_ENQUIRY_ENDPOINT`. This is a public endpoint URL, **never a secret**. It must accept JSON by POST and return a successful HTTP status **and** `{ "success": true }` only when it actually accepts the enquiry. Payload fields are `name`, `email`, `institution`, `institutionType`, `audience`, `date`, `participants`, `message`, `consent`, `topics` (titles), and `activities` (titles). Requests carry `Idempotency-Key`; the service should enforce it, validate fields again, handle consent/retention, and configure CORS for the final site origin. Request timeout is 15 seconds. Rejected, malformed, interrupted or failed responses leave the details available with an email fallback. A real backend and delivery service are not provisioned in this project; tests use mocks only.

## Publish on GitHub Pages

The included workflow derives the correct base path and absolute URL from GitHub's Pages configuration. It follows [Vite's official GitHub Pages deployment guidance](https://vite.dev/guide/static-deploy.html#github-pages) and supports project repositories, user repositories and configured custom domains.

1. Create a new GitHub repository for workshops. Place the **contents of this `workshops` directory at its repository root**, including hidden configuration and `.github/`; do not overwrite the main DADA repository.
2. Push to `main` or `master`. Do not copy `.git/`, `.env.local`, `node_modules/`, `dist/`, `.artifacts/`, or test results into another repository.
3. In the new repository, open **Settings → Pages → Build and deployment → Source → GitHub Actions**.
4. Open **Actions → Deploy workshops to GitHub Pages → Run workflow** (or push another commit). GitHub installs locked dependencies, typechecks/builds, uploads `dist/`, and deploys it.
5. Use the URL returned by the workflow. Canonical, Open Graph image URL, `robots.txt` and `sitemap.xml` are generated for that actual Pages address. No GitHub repository has been created or publicly deployed by this implementation.

For a manual project build, set both environment variables to the confirmed destination:

```powershell
$env:VITE_BASE_PATH = '/YOUR-REPOSITORY/'
$env:VITE_SITE_URL = 'https://YOUR-USERNAME.github.io/YOUR-REPOSITORY'
npm run build
Remove-Item Env:VITE_BASE_PATH
Remove-Item Env:VITE_SITE_URL
```

For domain-root hosting, use `/` as the base. Never leave the Sites canonical URL in a build intended for a different destination. Leave `VITE_SITE_URL` empty if the final address is unknown; canonical, absolute sharing image URL, and sitemap will be omitted instead of guessing. The default `.env.production` targets the registered private Sites address; GitHub Actions overrides both settings with the real Pages values. The Sites plugin's `.openai/hosting.json` is not required by GitHub Pages.

## Content and design decisions

- The brand colours, Barlow Condensed/DM Sans/Space Mono fonts, sharp borders, outlined headings, navigation and mascots follow the official portfolio. Light-theme accent inks use the original accessible dark variants.
- The current official team is Darshan C S, Andryan Durai Jebin, Dinesh G, and Akshaya P. Names, roles, portraits, introductions and social URLs follow current source, rather than older role examples in the brief. Kapilamithran is not included because the current official team data does not list that profile.
- Workshop descriptions and activity concepts are preserved. The DOCX's repeated final activity-category heading is normalised to Coding & Debugging, as specified by the master brief. Catalogue cards use short introductory summaries; detail dialogs retain full descriptions.
- School/college suitability is editable recommendation data in `src/data.ts`, not a restriction or prerequisite. The two college-focused starting points are prompt engineering and game/debugging; introductory internet and first coding are school starting points. Other topics cover both pathways. All can be discussed for a different group.
- Learning objectives and hands-on pairings are proposed explanations of the supplied offerings. There are no invented delivery claims, prices, certificates, fixed workshop lengths, dates, impact metrics, partners or testimonials. “15 Minutes” stays in the original activity titles; it does not describe a booked session.
- Original image files retain source bytes, transparency and proportions. Below-fold images load lazily; all fonts are local. See `ASSETS.md` for provenance and licensing notes. The source PNG artwork is large (about 11 MB for all original assets), so mobile data use remains a known limitation.

## Verification

Verified on 12 October 2026: `npm run build` passes strict TypeScript and the production bundle; `npm test` passes all **9 tests**. Automated WCAG AA scans report no violations for either theme or their workshop dialogs. Browser checks cover 320, 390, 768, 1024 and 1440 pixel widths with no horizontal overflow, missing anchors, image failures or console exceptions. The production build was additionally served and checked under `/workshops-test/`: all 10 cards, original fonts, images and generated canonical URL resolved correctly. That synthetic deployment fixture is ignored under `.artifacts/` and is not the published build.

The test suite covers catalogue search/category/audience combinations and reset, empty states, activity filters, native-dialog focus containment and restoration, selection transfer, mobile navigation, FAQ expansion, form errors, multiple selections, draft generation/download without submission, broken anchors/assets, console errors, viewport overflow from 320 to 1440 pixels, dark/light accessibility scans, and rejection handling for the optional endpoint.

Automated accessibility checks complement the keyboard and visual checks; they are not a claim of complete WCAG certification. No live enquiry has been sent. GitHub Actions still needs to run in the destination repository before a public Pages deployment can be verified.
