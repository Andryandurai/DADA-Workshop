# TEAM DADA Workshops

A dedicated React, TypeScript, and Vite site for DADA's school and college workshops. Built separately from the original portfolio. Includes all 10 workshop descriptions and 10 activities from `WORKSHOP IDEAS.docx`, search and combined filters, workshop/activity dialogs, audience pathways, verified team profiles, an institutional enquiry form, FAQs, and dark/light themes.

Repository: [Andryandurai/DADA-Workshop](https://github.com/Andryandurai/DADA-Workshop). Live GitHub Pages site: [andryandurai.github.io/DADA-Workshop/](https://andryandurai.github.io/DADA-Workshop/). Updates deploy through the existing GitHub Actions workflow when pushed to `main`.

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
    Doodle.tsx         Lightweight decorative SVGs and category illustrations
    data.ts            Typed workshop/activity data and verified team profiles
    enquiry.ts         Validation, draft composition and optional delivery adapter
    main.tsx           React entry point
    styles.css         DADA design system, responsive layouts and themes
  public/assets/       Original DADA logo, mascots, portraits and self-hosted fonts
  tests/site.spec.ts   Browser, accessibility and optional delivery checks
  .github/workflows/deploy.yml
  .openai/hosting.json Earlier private Sites review-copy identity (unused by Pages)
  .env.example        Build configuration reference
  .env.production     DADA-Workshop GitHub Pages address and repository base path
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

1. This project is prepared for the root of `Andryandurai/DADA-Workshop`, on branch `main`. Future changes can be committed and pushed there. Keep `.env.local`, `node_modules/`, `dist/`, `.artifacts/`, and test results ignored.
2. In that repository, open **Settings → Pages → Build and deployment → Source → GitHub Actions**. GitHub must support Pages for the repository's visibility: a private repository needs a supporting plan; otherwise use a public repository.
3. Open **Actions → Deploy workshops to GitHub Pages → Run workflow** (or push another commit). GitHub installs locked dependencies, typechecks/builds, uploads `dist/`, and deploys it.
4. The expected address is `https://andryandurai.github.io/DADA-Workshop/`. Check the workflow result for deployment status. Canonical, Open Graph image URL, `robots.txt` and `sitemap.xml` are generated for the actual Pages address.

For a manual project build, set both environment variables to the confirmed destination:

```powershell
$env:VITE_BASE_PATH = '/DADA-Workshop/'
$env:VITE_SITE_URL = 'https://andryandurai.github.io/DADA-Workshop'
npm run build
Remove-Item Env:VITE_BASE_PATH
Remove-Item Env:VITE_SITE_URL
```

For domain-root hosting, use `/` as the base. Always match the canonical URL to the deployment destination. Leave `VITE_SITE_URL` empty if the final address is unknown; canonical, absolute sharing image URL, and sitemap will be omitted instead of guessing. The default `.env.production` targets `Andryandurai/DADA-Workshop` on GitHub Pages; GitHub Actions also derives both settings from the Pages configuration. The earlier review copy's `.openai/hosting.json` is not used by GitHub Pages. Local development continues at the root URL printed by `npm run dev`.

## Content and design decisions

- The workshop notebook uses warm ivory paper, charcoal text, official blue accents, pastel notes, decorative tape, marker underlines and original SVG doodles. Sections share a clear grid while using distinct notebook, challenge-board, polaroid and planning-desk compositions.
- Self-hosted Bricolage Grotesque gives headings an expressive studio feel. Original DM Sans body text and Space Mono annotations remain; original Barlow font files are retained. Light is the default theme; the optional dark notebook theme persists across visits. Both themes use contrast-tested text colours and visible keyboard focus.
- Gentle one-time section reveals, paper-card lifts and marker hover states respect reduced-motion preferences. Decorative SVGs are hidden from assistive technology; they never replace labels or functionality. Mobile forms use a single column and 16px input text.
- Names, roles, portraits, introductions and social URLs follow current official source, rather than older role examples in the brief. The workshop display order, as requested, is Darshan C S, Andryan Durai Jebin, Akshaya P, then Dinesh G. Kapilamithran is not included because the current official team data does not list that profile.
- Workshop descriptions and activity concepts are preserved. The DOCX's repeated final activity-category heading is normalised to Coding & Debugging, as specified by the master brief. Catalogue cards use short introductory summaries; detail dialogs retain full descriptions.
- School/college suitability is editable recommendation data in `src/data.ts`, not a restriction or prerequisite. The two college-focused starting points are prompt engineering and game/debugging; introductory internet and first coding are school starting points. Other topics cover both pathways. All can be discussed for a different group.
- Learning objectives and hands-on pairings are proposed explanations of the supplied offerings. There are no invented delivery claims, prices, certificates, fixed workshop lengths, dates, impact metrics, partners or testimonials. “15 Minutes” stays in the original activity titles; it does not describe a booked session.
- The five updated `dada-mature-*` mascot poses match the official site's October 2026 update. All placements and the social sharing image use the new files. Original image files retain source bytes, alpha and proportions. Below-fold images load lazily; all fonts are local. See `ASSETS.md` for provenance and licensing notes. The source PNG artwork is large (about 11 MB for all original assets), so mobile data use remains a known limitation.

## Verification

The redesign is validated using strict TypeScript, a production build, the **9-test** Playwright suite, visual inspection and automated WCAG AA scans for both themes and workshop dialogs. Responsive checks cover 320, 390, 600, 768, 1024, 1180 and 1440 pixel widths after fonts load. The production build is also checked under the actual `/DADA-Workshop/` path, including local fonts, original imagery, the catalogue and generated canonical URL. Review screenshots and test artefacts stay in ignored local directories.

The test suite covers catalogue search/category/audience combinations and reset, empty states, activity filters, native-dialog focus containment and restoration, selection transfer, mobile navigation, FAQ expansion, form errors, multiple selections, draft generation/download without submission, broken anchors/assets, console errors, viewport overflow from 320 to 1440 pixels, dark/light accessibility scans, and rejection handling for the optional endpoint.

Automated accessibility checks complement the keyboard and visual checks; they are not a claim of complete WCAG certification. No live enquiry is sent during testing. The original full-resolution PNGs remain the main download cost; the redesign adds no dependencies or replacement imagery.
