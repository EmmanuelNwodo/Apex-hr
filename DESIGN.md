# Apex HR Website Design System v1.0

**Status:** Implementation specification  
**Consolidated:** 2 September 2026  
**Brand source:** `Apex_HR_Brand_Style_Guide.pptx`  
**Product sources:** `CLAUDE.md`, `CONTENT-MODEL.md`, `MASTER-SITEMAP.md` and the approved project requirements  
**Primary experience:** Employer-first, candidate-visible

## 1. Purpose

This document translates the Apex HR visual identity into a responsive, accessible and buildable web design system. It governs:

- brand application;
- colour and typography;
- spacing and layout;
- responsive behaviour;
- component appearance and interaction states;
- page-template composition;
- imagery and iconography;
- motion and scroll storytelling;
- forms and conversion flows;
- accessibility and visual quality assurance.

The website should feel like a senior HR advisory and people-partnership firm with global polish. It must be premium without becoming ornamental, corporate without becoming cold, and interactive without becoming difficult to use.

## 2. Design objective

The visual system should communicate four qualities immediately:

1. **Senior credibility** — confident hierarchy, precise writing and disciplined composition.
2. **Human warmth** — warm neutrals, real people, thoughtful interaction and relationship-led language.
3. **Global fluency** — culturally aware imagery and a polished international standard.
4. **Understated quality** — generous space, limited decoration and deliberate motion.

The design should combine consulting-firm authority with a modern talent-platform experience. It must not resemble a generic recruitment template, a corporate dashboard or a fashionable animation demo.

## 3. Source authority and conflict handling

Use this order for design decisions:

1. Explicit written stakeholder approval.
2. The supplied Apex HR brand guide for logo, palette, typography and voice.
3. This `DESIGN.md` for web-specific application.
4. `CLAUDE.md` and `CONTENT-MODEL.md` for product hierarchy, accessibility and content structure.
5. Approved page requirements and interaction references.

When a proposed visual conflicts with accessibility, protect readability and usability while preserving the closest valid brand treatment.

### Brand-guide tagline discrepancy

The supplied primary lockup visibly uses `PEOPLE PARTNERS`, while another brand-guide instruction names the tagline `Global People Partners`.

- Do not reconstruct or alter the official logo asset.
- Render the supplied lockup exactly as approved.
- Do not append a different tagline beside the wordmark in code.
- Treat the public marketing tagline as requiring final brand-owner confirmation.
- Until confirmed, `People Partners` may appear only as part of the supplied logo artwork; do not invent a separate slogan treatment.

## 4. Brand personality

### The experience should be

- senior and credible;
- warm, not corporate;
- globally fluent and locally grounded;
- premium and understated;
- confident without exaggeration;
- editorial rather than template-driven;
- outcome-focused and evidence-led.

### The experience should not be

- jargon-heavy;
- cold or transactional;
- crowded or visually noisy;
- dominated by gold or decorative effects;
- built from generic stock-business clichés;
- filled with unsupported superlatives;
- dependent on animation to communicate essential information.

## 5. Logo system

### 5.1 Approved marks

Use only approved source assets:

- primary horizontal logo for light backgrounds;
- reversed horizontal logo for dark backgrounds;
- monogram for favicons, avatars, compact marks and constrained square contexts.

The earlier exploratory logo concept is not automatically a production asset. The latest supplied brand guide controls production usage unless the brand owner explicitly approves a replacement.

### 5.2 Clear space

Maintain clear space on every side equal to the height of the letter `A` in `APEX` within the wordmark. No text, container edge, icon, border or image detail should enter this area.

### 5.3 Minimum size

- Full digital lockup: minimum `120px` wide.
- Header recommendation: `132–160px` wide depending on viewport.
- Footer recommendation: `140–180px` wide.
- Monogram: minimum `24px`; prefer `32px` or larger outside the favicon.

### 5.4 Logo treatments

| Background | Approved treatment |
|---|---|
| Cream or white | Primary dark-and-gold lockup |
| Navy Charcoal | Reversed white-and-gold lockup |
| Peach Blush | Primary dark lockup after contrast and clear-space check |
| Photography | Place within a solid cream or navy field; do not rely on an uncontrolled image background |

### 5.5 Never

- recolour the mark outside approved combinations;
- stretch, skew, rotate or crop the lockup;
- animate individual letters;
- apply gradients, bevels, glows or drop shadows;
- place the gold wordmark directly on low-contrast cream or white;
- recreate the logo with browser text;
- separate or re-typeset the tagline;
- use the monogram where the full brand name is needed for recognition.

## 6. Colour system

### 6.1 Core brand colours

| Token | Hex | Role |
|---|---|---|
| Navy Charcoal | `#2B2733` | Primary dark surface, headings, body text and authority |
| Warm Gold | `#B8966B` | Accent, rules, key data, controlled highlights and dark-surface labels |
| Cream | `#FAF6F0` | Primary page background and large light surfaces |
| Peach Blush | `#F0DCCB` | Quotes, callouts, selected cards and warm emphasis |
| Slate Gray | `#6E6A6E` | Secondary text on suitable light surfaces |
| White | `#FFFFFF` | Cards, input surfaces and reversed text |

Gold should occupy roughly 10–15% or less of a composition. It is an accent, not a dominant background colour.

### 6.2 Web accessibility support colours

The following are functional web tokens, not replacements for the brand palette:

| Token | Hex | Use |
|---|---|---|
| Gold Ink | `#7A5A34` | Accessible small gold-family text on cream, peach or white |
| Success | `#1F6A4D` | Success text, icons and validated states |
| Warning | `#7A4B00` | Warnings and pending states |
| Error | `#9C2525` | Errors and destructive warnings |
| Information | `#245F85` | Neutral system information |

Functional colours are used only for meaning. They should not become campaign or decorative colours.

### 6.3 Contrast rules

Measured contrast ratios for common brand combinations:

| Foreground / background | Ratio | Treatment |
|---|---:|---|
| Navy / White | `14.58:1` | Approved for all text sizes |
| Navy / Cream | `13.54:1` | Approved for all text sizes |
| Navy / Peach | `10.97:1` | Approved for all text sizes |
| White / Navy | `14.58:1` | Approved for all text sizes |
| Warm Gold / Navy | `5.28:1` | Approved for normal text and icons |
| Slate Gray / White | `5.32:1` | Approved for normal text |
| Slate Gray / Cream | `4.94:1` | Approved for normal text |
| Warm Gold / White | `2.76:1` | Do not use for meaningful text |
| Warm Gold / Cream | `2.56:1` | Do not use for meaningful text |
| Slate Gray / Peach | `4.00:1` | Use Navy for normal body text instead |

Warm Gold may remain decorative on light backgrounds, but essential text must use Navy, Slate Gray where valid, or Gold Ink. Never use white text on a Warm Gold button.

### 6.4 Semantic surface tokens

```css
:root {
  --color-navy: #2b2733;
  --color-gold: #b8966b;
  --color-gold-ink: #7a5a34;
  --color-cream: #faf6f0;
  --color-peach: #f0dccb;
  --color-slate: #6e6a6e;
  --color-white: #ffffff;

  --color-success: #1f6a4d;
  --color-warning: #7a4b00;
  --color-error: #9c2525;
  --color-information: #245f85;

  --surface-page: var(--color-cream);
  --surface-card: var(--color-white);
  --surface-warm: var(--color-peach);
  --surface-dark: var(--color-navy);
  --text-primary: var(--color-navy);
  --text-secondary: var(--color-slate);
  --text-reversed: var(--color-white);
  --text-accent-light: var(--color-gold-ink);
  --text-accent-dark: var(--color-gold);
  --border-subtle: color-mix(in srgb, var(--color-navy) 16%, var(--color-cream));
  --border-strong: color-mix(in srgb, var(--color-navy) 32%, var(--color-cream));
}
```

Provide tested hex fallbacks if the project targets browsers without `color-mix()` support.

## 7. Typography

### 7.1 Brand families

| Role | Primary | Fallback stack |
|---|---|---|
| Display and headings | Cambria | `Cambria, Georgia, "Times New Roman", serif` |
| Body and interface | Calibri | `Calibri, Arial, Helvetica, "Segoe UI", sans-serif` |

Do not introduce a third visual typeface. Code, data or system monospace may use the platform monospace stack only when functionally required.

Cambria and Calibri availability varies by operating system. Do not download or redistribute font files without confirmed webfont licensing. If exact rendering across platforms is required, obtain licensed webfont assets; otherwise use the approved fallback stacks and test line wrapping on Windows, macOS, Android and iOS.

### 7.2 Type roles

- Cambria: display headings, section titles, selected pull quotes and high-value numeric callouts.
- Calibri stack: body copy, navigation, buttons, labels, forms, metadata, tables and captions.
- Gold labels: uppercase interface kickers with restrained letter spacing; use Gold Ink on light surfaces and Warm Gold on Navy.
- Body paragraphs: left aligned. Do not centre long copy.

### 7.3 Fluid web scale

| Token | Size | Line height | Use |
|---|---|---:|---|
| `display-xl` | `clamp(3.75rem, 8vw, 7rem)` | `0.94–1.0` | Rare campaign or homepage statement |
| `display` | `clamp(3rem, 6vw, 5.75rem)` | `0.98–1.04` | Homepage H1 |
| `h1` | `clamp(2.5rem, 5vw, 4.75rem)` | `1.0–1.08` | Interior-page H1 |
| `h2` | `clamp(2rem, 3.5vw, 3.5rem)` | `1.05–1.12` | Major section heading |
| `h3` | `clamp(1.5rem, 2.2vw, 2.25rem)` | `1.12–1.2` | Section/card heading |
| `h4` | `clamp(1.25rem, 1.5vw, 1.625rem)` | `1.2–1.3` | Component heading |
| `lead` | `clamp(1.125rem, 1.4vw, 1.375rem)` | `1.5–1.65` | Introductory copy |
| `body-lg` | `1.125rem` | `1.65` | Long-form featured copy |
| `body` | `1rem` | `1.6` | Default body and UI copy |
| `small` | `0.875rem` | `1.5` | Metadata and supporting labels |
| `caption` | `0.75rem` | `1.45` | Captions and legal support |

Do not reduce body text below `16px` for primary content. Text zoom to 200% must not clip or overlap.

### 7.4 Measure and wrapping

- Long-form body: `60–72ch` maximum.
- Lead copy: `45–60ch`.
- Display headings: aim for `10–18` words and two to four lines on mobile.
- Use balanced wrapping for short headings only.
- Avoid widowed single words where practical.
- Never use forced line breaks solely to match one desktop screenshot.

### 7.5 Weight and emphasis

- Heading weight: `700` where available.
- Body weight: `400`.
- Interface emphasis: `600–700` depending on font rendering.
- Italic is reserved for pull quotes, editorial emphasis or image captions.
- Avoid all-cap body copy. Uppercase is limited to short kickers and labels.

## 8. Spacing and sizing

Use a `4px` primitive with an `8px` dominant rhythm.

| Token | Value |
|---|---:|
| `space-1` | `4px` |
| `space-2` | `8px` |
| `space-3` | `12px` |
| `space-4` | `16px` |
| `space-5` | `24px` |
| `space-6` | `32px` |
| `space-7` | `48px` |
| `space-8` | `64px` |
| `space-9` | `96px` |
| `space-10` | `128px` |
| `space-11` | `160px` |

### Section spacing

- Mobile: `64–88px` vertical.
- Tablet: `80–112px`.
- Desktop: `112–160px`.
- Compact utility sections: minimum `48px`.
- Hero top/bottom spacing must account for the header and viewport height without hiding content below the fold.

Premium does not mean empty. Space should reveal hierarchy, not create long blank journeys.

## 9. Layout system

### 9.1 Containers

| Container | Maximum | Use |
|---|---:|---|
| Reading | `760px` | Articles, legal copy and long-form explanations |
| Standard | `1280px` | Most page sections |
| Wide | `1440px` | Large media, marquees and sector/service grids |
| Full bleed | `100%` | Background bands and carefully controlled media |

Horizontal gutters:

```css
padding-inline: clamp(1.25rem, 4vw, 5rem);
```

### 9.2 Grid

- Mobile: four columns.
- Tablet: eight columns.
- Desktop: twelve columns.
- Use `16–24px` gaps on mobile and `24–32px` on larger screens.
- Align major text, media, cards and section labels to the grid.
- Permit deliberate asymmetry, but never accidental misalignment.

### 9.3 Breakpoints

Use content-driven adaptation with these working thresholds:

| Name | Minimum width |
|---|---:|
| `sm` | `640px` |
| `md` | `768px` |
| `lg` | `1024px` |
| `xl` | `1280px` |
| `2xl` | `1536px` |

Do not design only at breakpoint edges. Test intermediate widths, browser zoom and large text.

### 9.4 Shape language

- Use square or subtly softened geometry.
- Default radius: `2px`.
- Card/input radius: `4px` maximum unless a functional control needs more.
- Avoid pill-shaped cards and excessive rounded containers.
- Prefer 1px borders and surface contrast over shadows.
- If elevation is required for a modal, keep the shadow diffuse and restrained; never apply it to the logo.

## 10. Composition rules

Every section follows this hierarchy where applicable:

1. Kicker or context label.
2. Title.
3. Supporting statement.
4. Detail or proof.
5. Action.

Additional rules:

- Gold is a signal, not wallpaper.
- Use Navy for covers, conversion bands, selected narrative chapters and the footer.
- Use Cream or White for information-heavy sections.
- Use Peach for quotations, human stories and soft emphasis.
- Avoid placing every section inside a card.
- Use borders, spacing and typography before adding decoration.
- Limit each section to one dominant idea.
- Alternate silhouettes rather than repeating identical three-card grids down the page.

## 11. Responsive behaviour

### Mobile first

- Preserve the same content hierarchy as desktop.
- Convert side-by-side editorial compositions into a deliberate single-column sequence.
- Place the key message and primary CTA before supporting media.
- Do not horizontally scroll body content.
- Preserve at least `44 × 44px` interactive targets.
- Keep sticky UI from consuming excessive vertical space.
- Do not hide essential proof or context solely to shorten the page.

### Tablet

- Use two-column layouts selectively.
- Keep touch interactions independent of hover.
- Avoid desktop mega-menu behaviour below `1024px`.
- Test landscape and portrait modes.

### Desktop

- Use asymmetrical 5/7 or 6/6 splits for major editorial sections.
- Keep text line lengths constrained even inside wide layouts.
- Use sticky or scroll-linked compositions only where the story benefits.
- Maintain clear routes to Find Talent and candidate navigation.

## 12. Header and navigation

### 12.1 Desktop header

- Height: approximately `88–96px`.
- Background: Cream or a controlled transparent-to-Cream state over a suitable hero.
- Logo: top-left, never below `120px` wide.
- Primary navigation: Services, Sectors, Employers, Candidates/Jobs, Insights and About as approved by information architecture.
- Primary CTA: Find Talent.
- Contact remains accessible but should not compete with Find Talent.
- Use a maximum of two navigation levels.

### 12.2 Sticky behaviour

- Header may become sticky after initial scroll.
- Transition should be subtle: reduced height, solid Cream background and restrained border.
- Do not apply heavy blur that reduces contrast.
- Preserve focus order and avoid content jumping.

### 12.3 Mega menu

Use a mega menu only where the number of services requires it.

- Group services by the ten approved service categories.
- Include one contextual proof or CTA area, not multiple promotional panels.
- Open by pointer and keyboard intent, not hover alone.
- Escape closes it and returns focus to the trigger.
- Arrow-key behaviour should follow the chosen accessible navigation pattern.

### 12.4 Mobile navigation

- Header height: approximately `68–76px`.
- Use a clearly labelled menu button.
- Open a full-height sheet or drawer with visible close control.
- Preserve Find Talent as a prominent action.
- Use accordions for service groups.
- Trap focus only while the menu is modal.
- Restore focus to the menu button on close.

## 13. Footer

Use a Navy Charcoal background with White primary text and Warm Gold accents.

Recommended structure:

- wordmark and short positioning statement;
- employer routes;
- candidate routes;
- services and sectors;
- insights and resources;
- verified contact details;
- social links;
- newsletter entry point;
- legal and privacy links.

Do not reproduce every route. Prioritise high-value paths and use headings that work with screen readers.

## 14. Buttons and links

### 14.1 Button sizing

- Minimum height: `48px`.
- Compact controls: never below `44px`.
- Horizontal padding: `20–28px`.
- Label: short, specific and sentence case.
- Icon, if used: trailing arrow for forward action; never decorative icon clutter.

### 14.2 Variants

| Variant | Light surface | Dark surface |
|---|---|---|
| Primary | Navy fill, White text | Cream or White fill, Navy text |
| Secondary | Transparent, Navy border/text | Transparent, Warm Gold border/text |
| Tertiary | Navy text with visible underline/arrow | White or Warm Gold text with underline/arrow |
| Destructive | Error border/text; filled only when confirmation is explicit | White surface with Error text where needed |

Do not use Warm Gold fill with White text because the contrast is insufficient.

### 14.3 States

- Hover: modest colour or underline change; no large jumps.
- Focus visible: `3px` high-contrast outline with at least `2px` offset.
- Active: small colour/value shift, not a dramatic scale effect.
- Disabled: visually muted but still legible; use `aria-disabled` or native disabled semantics.
- Loading: preserve button width, announce status and prevent duplicate submission.

Links inside body copy are underlined by default. Colour alone does not identify interactivity.

## 15. Form system

### 15.1 Field anatomy

Every field includes:

- persistent visible label;
- optional hint before the field when needed;
- input/control;
- error message connected with `aria-describedby`;
- required/optional status expressed in text;
- success state only when it adds value.

### 15.2 Visual treatment

- White input surface on Cream or Peach sections.
- Navy text and border.
- Minimum control height: `48px`.
- Focus: Navy outline on light surfaces; Warm Gold outline on Navy.
- Error: Error colour plus icon/text; never colour alone.
- Do not use placeholder text as the label.
- Avoid floating-label patterns.

### 15.3 Find Talent flow

The four-step Find Talent form should feel calm and progressive:

1. Hiring need.
2. Requirements.
3. Employer details.
4. Context and consent.

Design rules:

- show `Step X of 4` and a textual step title;
- preserve entered values between steps;
- validate the current step without erasing data;
- allow Back without submission;
- summarise uploaded file name and remove action;
- place privacy and consent copy beside the relevant choice;
- show a full-page fallback at `/find-talent/` even when a modal/drawer is used;
- on mobile, prefer the full-page flow or a full-height sheet over a cramped centred modal;
- closing a partially completed form should warn only when meaningful data would be lost.

### 15.4 Search and filters

- Use labelled controls, not icon-only filter triggers.
- On desktop, filters may appear in a sidebar or horizontal control band.
- On mobile, filters may open in a full-height sheet.
- Show active filter count and clear-all action.
- Announce result changes to assistive technology without stealing focus.
- Do not animate result movement excessively.

## 16. Cards and content modules

### Service cards

- Show employer problem or outcome before long service detail.
- Use a structured service reference.
- One clear action.
- Hover may reveal a restrained arrow or border shift.
- Card remains fully understandable without hover.

### Sector cards

- Prioritise sector name and a specific understanding statement.
- Avoid generic industry stock photos on every card.
- Professional Services and IT must remain visually and semantically distinct.

### Insight cards

- Image optional; do not force low-quality imagery.
- Show category, title, summary, date and author/reviewer when approved.
- Do not make the entire card inaccessible by nesting multiple links.

### Expert cards

- Use real approved portraits.
- Show name, role and concise expertise.
- Avoid hover-only biography content.

### Case-study cards

- Lead with a verified outcome only when evidence is approved.
- Otherwise lead with the challenge and intervention.
- Clearly identify anonymised case studies.

### Testimonial cards

- Use Peach or White surfaces with Navy text.
- Preserve quotation readability and attribution.
- Do not use a decorative quotation mark as the only indication of a quotation.

### Statistics

- Large number in Cambria.
- Context label in Calibri.
- Warm Gold may highlight the number on Navy.
- Every statistic requires a defined source and meaning.
- Do not animate counting if it obscures the final value or conflicts with reduced motion.

## 17. Homepage design specification

The homepage is an employer-first narrative, not a feature catalogue.

### 17.1 Employer hero

- Cream or Navy-led composition.
- Strong Cambria H1 focused on employer value.
- Primary CTA: Find Talent.
- Secondary CTA: Meet Apex HR.
- Candidate link remains visible but subordinate.
- Prefer an editorial 5/7 or 6/6 split.
- Media must convey real expertise or a deliberate people-and-strategy concept.
- Do not use autoplay video with essential audio.

### 17.2 Trust and credibility

- Use verified numbers, logos, accreditations or concise proof.
- Do not display unsubstantiated scale claims.
- Logo marquees require pause controls or non-moving reduced-motion presentation.

### 17.3 Employer need selector

- Three primary needs: hire, HR support and strategic people advice.
- Use large interactive text regions, not small dashboard tiles.
- Each path leads to a governed route or Find Talent context.

### 17.4 Employer problems

- Present problems as an editorial sequence.
- Use scroll progression only if the static reading order remains complete.
- Pair each problem with a relevant service relationship.

### 17.5 Services and recruitment spotlight

- Avoid showing all 48 services on the homepage.
- Feature the most commercially important service families.
- Give recruitment its own visual chapter and Find Talent action.

### 17.6 Why Apex and sectors

- Use evidence-led differentiators.
- Sector content should answer, “Do you understand organisations like mine?”
- Allow horizontal exploration only with visible controls and accessible alternatives.

### 17.7 How Apex works

Present Understand → Diagnose → Recommend → Implement → Measure as an ordered process.

- Desktop may use a controlled sticky narrative.
- Mobile uses a normal vertical sequence.
- Reduced-motion mode shows all steps without scroll-linked transformation.

### 17.8 Proof and expertise

- Case studies before generic claims.
- Experts must link to services and insights.
- Use authentic portraits or omit the portrait; never generate a fake practitioner.

### 17.9 Candidate gateway

- Visually distinct but subordinate to the employer proposition.
- Three clear actions: Search Jobs, Upload CV and Join Talent Pool.
- Do not imply a candidate portal in phase one.

### 17.10 Insights, FAQs and final CTA

- Feature employer-relevant insight content.
- FAQ accordion must work without animation.
- Close with a Navy conversion band and primary Find Talent action.

## 18. Interior page templates

### 18.1 Service page

Use this sequence:

1. Breadcrumb.
2. Search-and-conversion hero.
3. Employer challenge.
4. Business outcomes.
5. What the service includes.
6. When it is needed.
7. Who Apex supports.
8. Delivery approach.
9. Engagement options.
10. Why Apex.
11. Case study or proof.
12. Relevant expert.
13. Related services.
14. Relevant insights.
15. FAQs.
16. Service-specific CTA.

Vary section silhouettes. Do not wrap all sixteen sections in identical cards.

### 18.2 Sector page

- Sector-specific hero.
- Challenges and context.
- How Apex helps.
- Recommended services.
- Relevant talent roles.
- Proof and expertise.
- Insights and FAQs.
- Employer CTA.

### 18.3 Location page

- Use verified coverage language.
- Do not imply a physical office without an approved office record.
- Avoid decorative maps that suggest false local presence.
- Recommended services and relevant content must be based on structured relationships.

### 18.4 Service-location page

- Use the service design system with meaningful local context.
- Do not create an interchangeable city-token layout.
- Keep Provisional pages out of navigation and indexation.
- Use a visible national-service relationship when it prevents confusion.

### 18.5 Talent-role page

- Employer-first hiring need.
- Role-market context.
- Recruitment approach.
- Relevant services and sectors.
- Expert/proof modules.
- Find Talent CTA.

### 18.6 Insight article

- Reading container around `680–760px`.
- Clear title, summary, author/reviewer and dates.
- Optional table of contents for long articles.
- Body text prioritises reading comfort over decorative layouts.
- Related services and CTA appear after substantive content.
- Sources and update information are visually discoverable.

### 18.7 Case study

Structure the story as Challenge → Context → Approach → Solution → Impact → Results → Testimonial → CTA.

- Use verified results as visual anchors.
- Do not over-brand client evidence.
- Clearly label anonymisation.

### 18.8 Expert profile

- Portrait and identity.
- Professional summary.
- Expertise and related services.
- Authored or reviewed insights.
- Case-study relationships.
- Appropriate contact or employer CTA.

### 18.9 Jobs archive and job page

- Search and filter controls are utilitarian and calm.
- Job cards prioritise title, location, type and work arrangement.
- Closed status must be obvious.
- Application CTA remains visible without obscuring content.
- Salary appears only when supplied.

## 19. Imagery

### 19.1 Direction

Photography should feel:

- documentary rather than staged;
- warm and intelligent;
- culturally and professionally varied;
- grounded in real workplaces and conversations;
- natural in lighting and expression;
- editorial in crop and composition.

### 19.2 Avoid

- generic handshakes;
- forced team high-fives;
- isolated call-centre headset clichés;
- obvious stock-boardroom poses;
- floating puzzle pieces or target graphics;
- fake screens, fake offices or fake client scenarios;
- AI-generated images presented as real Apex people, offices or events.

### 19.3 Crop ratios

| Context | Preferred ratio |
|---|---|
| Hero editorial image | `4:5`, `3:4` or wide `16:10` depending composition |
| Service/sector feature | `4:3` or `3:2` |
| Expert portrait | `4:5` |
| Insight card | `16:10` or `3:2` |
| Case-study feature | `16:9` or `3:2` |

Store focal points and alt text in the CMS. Do not bake essential text into imagery.

### 19.4 Abstract visuals

Abstract people-and-system imagery may use:

- subtle line networks;
- layered editorial crops;
- restrained geometric fields;
- warm photographic details;
- controlled data or process motifs.

Do not use glowing technology clichés, neon gradients or generic AI brains.

## 20. Iconography

- Use one consistent outlined icon family, initially Lucide React.
- Stroke width: usually `1.5–2px`.
- Default size: `20–24px`; feature icons may reach `32px`.
- Icons inherit Navy on light surfaces and White/Gold on Navy.
- Every icon button requires an accessible name.
- Do not mix outlined, filled and illustrated icon styles.
- Do not use icons when a clear text label is better.
- Avoid generic clip-art and pseudo-3D illustrations.

## 21. Motion principles

Motion should guide attention, reveal relationships and support the premium narrative. It must not delay access to information.

### 21.1 Timing tokens

| Token | Duration | Use |
|---|---:|---|
| `motion-instant` | `100ms` | Pressed and simple colour feedback |
| `motion-fast` | `160ms` | Hover, focus and small controls |
| `motion-base` | `240ms` | Menus, accordions and simple state changes |
| `motion-slow` | `360ms` | Drawers, modal transitions and larger reveals |
| `motion-story` | `600ms` maximum | Editorial section entrances |

Recommended easing:

```css
--ease-standard: cubic-bezier(0.2, 0, 0, 1);
--ease-enter: cubic-bezier(0, 0, 0.2, 1);
--ease-exit: cubic-bezier(0.4, 0, 1, 1);
```

### 21.2 Allowed patterns

- opacity with `8–24px` translation;
- subtle clip or mask reveals for approved editorial imagery;
- restrained stagger of short related items;
- sticky process storytelling where the static order remains complete;
- low-amplitude scale change for media, not text;
- card stacking when every card remains keyboard and screen-reader accessible;
- logo marquee with pause and reduced-motion behaviour.

### 21.3 Avoid

- scroll hijacking;
- cursor replacement;
- long splash screens;
- page transitions that delay navigation;
- parallax that causes motion discomfort;
- constant floating elements;
- rotating text rings around controls;
- dramatic 3D or perspective effects;
- autoplay sound;
- hiding essential information until animation completes.

### 21.4 Reduced motion

Under `prefers-reduced-motion: reduce`:

- disable scroll-linked movement and parallax;
- show final content states immediately;
- stop auto-moving marquees and carousels;
- use instant or short opacity-only state changes;
- retain all content and controls.

### 21.5 Performance

- Prefer transform and opacity.
- Do not animate layout properties across large regions.
- Lazy-load non-critical motion code.
- Use GSAP only for an isolated sequence that Motion cannot implement cleanly.
- Measure real-device performance before accepting a scroll narrative.

## 22. Carousels, marquees and stacked cards

Use these patterns sparingly.

### Carousels

- Prefer a visible grid when content fits.
- Provide previous/next buttons and position information.
- Do not auto-advance essential content.
- If auto-rotation is approved, provide pause and stop after user interaction.

### Logo marquee

- Use only approved logos.
- Duplicate logos visually for looping only; screen readers receive one logical list.
- Pause on hover and focus.
- Stop movement for reduced motion.
- Ensure each logo has a useful accessible label.

### Stacked testimonials

- The source order remains meaningful.
- Keyboard users can reach each testimonial.
- Do not place text behind inaccessible overlapping layers.
- Mobile uses a vertical sequence or controlled carousel.

## 23. Feedback and system states

Every data-driven component must define:

- default;
- hover where relevant;
- focus visible;
- active/selected;
- disabled;
- loading;
- empty;
- error;
- success.

### Loading

- Use restrained skeletons matching final layout.
- Avoid shimmering large page regions indefinitely.
- Preserve layout to prevent content shift.

### Empty states

- Explain why no content is available.
- Offer a useful next action such as clearing filters or joining the talent pool.
- Do not imply failure where there is simply no result.

### Errors

- Use plain language.
- Preserve entered form data.
- Provide retry or recovery when possible.
- Do not expose stack traces, provider names or sensitive details.

### Success

- Confirm what happened.
- Explain the next expected step without promising an unverified response time.
- Provide a safe onward route.

## 24. Accessibility standard

Target WCAG 2.2 AA.

Required visual and interaction rules:

- semantic landmark and heading order;
- visible skip link;
- keyboard access to every interactive feature;
- focus must never be removed without an equal or stronger replacement;
- minimum target size of `44 × 44px`;
- colour contrast as defined above;
- colour is never the sole state indicator;
- form errors are connected to their fields;
- dialogs have names, descriptions, focus trapping and focus restoration;
- accordions expose expanded state;
- reduced-motion support;
- meaningful image alternatives;
- captions/transcripts for meaningful video;
- no text embedded in images when HTML can provide it;
- content remains usable at 200% zoom and narrow reflow widths;
- sticky elements do not obscure focused controls or anchor destinations.

## 25. Tone of voice in the interface

### Use

- confident senior-practitioner language;
- warm relationship-led phrasing;
- specific outcome-focused claims;
- global fluency with local grounding;
- short, direct CTA labels;
- evidence and context beside results.

### Avoid

- jargon-heavy corporate language;
- cold transactional instructions;
- vague buzzwords;
- one-size-fits-all promises;
- exaggerated urgency;
- manipulative consent language;
- generic “Learn More” where a specific action is available.

Preferred CTA examples:

- Find Talent
- Explore HR Services
- Talk to an Expert
- Search Jobs
- Join the Talent Pool
- Read the Case Study
- Meet Apex HR

## 26. Design tokens for implementation

```css
:root {
  --font-display: Cambria, Georgia, "Times New Roman", serif;
  --font-body: Calibri, Arial, Helvetica, "Segoe UI", sans-serif;

  --radius-none: 0;
  --radius-sm: 2px;
  --radius-md: 4px;

  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-5: 1.5rem;
  --space-6: 2rem;
  --space-7: 3rem;
  --space-8: 4rem;
  --space-9: 6rem;
  --space-10: 8rem;
  --space-11: 10rem;

  --container-reading: 47.5rem;
  --container-standard: 80rem;
  --container-wide: 90rem;
  --page-gutter: clamp(1.25rem, 4vw, 5rem);

  --control-min-height: 3rem;
  --target-min-size: 2.75rem;
  --focus-width: 3px;
  --focus-offset: 2px;

  --duration-instant: 100ms;
  --duration-fast: 160ms;
  --duration-base: 240ms;
  --duration-slow: 360ms;
  --duration-story: 600ms;
  --ease-standard: cubic-bezier(0.2, 0, 0, 1);
  --ease-enter: cubic-bezier(0, 0, 0.2, 1);
  --ease-exit: cubic-bezier(0.4, 0, 1, 1);
}
```

Map these tokens into the project's Tailwind theme rather than scattering raw values across components. Keep the source token names visible in the theme or token module.

## 27. Component ownership

Recommended component layers:

### Primitives

- Button
- Link
- IconButton
- Input
- Textarea
- Select
- Checkbox
- RadioGroup
- FieldError
- Dialog
- Drawer
- Accordion
- Tabs only when semantically justified

### Brand components

- Logo
- SectionKicker
- EditorialHeading
- Quote
- Statistic
- BrandRule
- DarkSection
- WarmCallout

### Content components

- ServiceCard
- SectorCard
- InsightCard
- ExpertCard
- CaseStudyCard
- TestimonialCard
- JobCard
- FAQList
- LogoMarquee
- ProcessSteps
- RelatedContent

### Conversion components

- FindTalentTrigger
- FindTalentFlow
- CandidateGateway
- NewsletterForm
- ConsultationCTA
- ApplicationForm
- TalentPoolForm

### Layout components

- SiteHeader
- MegaMenu
- MobileMenu
- PageContainer
- ReadingContainer
- Section
- SplitLayout
- SiteFooter
- Breadcrumbs

Do not create a unique card, button or heading component for every page. Extend variants only when a meaningful semantic or visual difference exists.

## 28. Quality assurance

### Required viewport checks

At minimum test:

- `320 × 568`
- `360 × 800`
- `390 × 844`
- `768 × 1024`
- `1024 × 768`
- `1280 × 800`
- `1440 × 900`
- `1920 × 1080`

Also test 200% browser zoom, increased text size, reduced motion, keyboard-only use and forced-colour/high-contrast modes where supported.

### Visual QA checklist

- Correct logo and clear space.
- No unapproved colours or gradients.
- Warm Gold is not used for inaccessible light-surface text.
- Cambria and Calibri fallbacks wrap acceptably.
- Heading hierarchy is consistent.
- Long copy respects readable measure.
- Sections align to the grid.
- Card and button variants are consistent.
- No accidental overflow at intermediate widths.
- Images remain sharp and correctly cropped.
- Focus states are visible.
- Motion has a reduced-motion equivalent.
- Empty, loading, error and success states are designed.
- Content does not shift significantly during loading.
- No unsupported claim is presented as visual proof.

### Automated checks

- lint and type-check;
- component tests for interactive states;
- axe accessibility checks;
- Playwright keyboard and form journeys;
- Lighthouse or equivalent performance checks;
- visual regression snapshots for core templates;
- colour-token and contrast tests where practical;
- image dimension and alt-text validation.

## 29. Build order

1. Add brand assets without altering them.
2. Implement colour, typography, spacing and motion tokens.
3. Build primitives and accessible interaction states.
4. Build header, navigation, containers and footer.
5. Build core editorial modules.
6. Implement the homepage static hierarchy.
7. Add controlled homepage motion.
8. Implement the service template.
9. Implement sector, location, expert, case-study and insight templates.
10. Implement Find Talent and candidate/job interfaces.
11. Validate responsive, accessibility, performance and visual consistency.

Motion comes after the static reading experience works across all breakpoints.

## 30. Decisions still requiring approval

- Final production logo file formats: SVG, reversed SVG, monogram SVG and favicon set.
- Whether the public marketing tagline is `Global People Partners`, while the supplied lockup says `People Partners`.
- Whether licensed self-hosted Cambria and Calibri webfonts will be supplied or the approved fallback stacks will be used.
- Approved photography library and image rights.
- Verified client/partner logos and display permission.
- Verified testimonials, case-study proof and homepage statistics.
- Final navigation labels and any mega-menu editorial content.
- Whether the hero uses photography, abstract editorial art or a controlled combination.
- Exact pages selected for the first scroll-driven narrative.

These decisions do not block implementation of tokens, primitives, accessibility, static templates or the responsive layout system.

## 31. Definition of done

The design-system foundation is complete when:

- approved logo variants are present and used correctly;
- brand tokens are implemented centrally;
- all colour combinations meet their intended contrast requirements;
- heading and body typography behaves across target platforms;
- primitives expose every required state;
- the header and menus work by keyboard and touch;
- homepage and service templates match this hierarchy at every breakpoint;
- Find Talent works as a modal/drawer and normal page;
- motion enhances rather than blocks the experience;
- reduced-motion mode is complete;
- core templates pass accessibility and visual regression checks;
- no generic stock cliché, fabricated evidence or unapproved claim appears;
- `CLAUDE.md`, `CONTENT-MODEL.md` and implemented tokens remain consistent with this document.
