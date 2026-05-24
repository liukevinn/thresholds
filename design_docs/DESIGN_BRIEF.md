# DESIGN_BRIEF.md
# Frontend Design System & Implementation Guide
# ⚠️ Claude Code: Read this file in full before making ANY styling changes.
# Every component, page, and layout decision should reference this document.

---

## 1. Brand & Mood

### Product Name
"Verge"

### One-Line Description
"A relationship dynamics assessment tool that helps couples understand their friction points."

### Design Mood (pick 2–3)
- Warm & approachable
- Playful & energetic
- Organic & soft

### Emotional Tone
- Users should feel welcomed and comfortable reflection on one's own behavior can seem daunting at a glance. Maintain a warm tone while also be organic.

### Products/Sites I Want This to Feel Like
- Turbo - good playful and engaging font
- Stripe - engaging, contains statistics taht align with company goals and missions
- SpaceX - interactive page features that engage the user

---

## 2. Color Palette

### Background
- Light mode only


### Primary Colors

| Role | Hex | Usage |
|------|-----|-------|
| Background (primary) | `#F9F9FB` | Main page background |
| Background (secondary) | `#FFFFFF` | Cards, panels, elevated surfaces |
| Background (tertiary) | `#F0EDFF` | Hover states, subtle highlights |
| Text (primary) | `#111027` | Headings, body text |
| Text (secondary) | `#5B5675` | Subtitles, labels, muted text |
| Text (tertiary) | `#9994B0` | Placeholders, disabled text |
| Accent (primary) | `#6941F2` | CTAs, active states, links |
| Accent (secondary) | `#EBE5FF` | Secondary buttons, tags, badges |
| Border | `#E4E0EE` | Card borders, dividers, input outlines |

### Semantic Colors
| Role | Hex | Usage |
|------|-----|-------|
| Success / Alignment | `#22C55E` | Positive states, alignment zones |
| Warning / Awareness | `#EAB308` | Caution states, awareness zones |
| Danger / Tension | `#EF4444` | Error states, tension zones |
| Info | `#818CF8` | Informational callouts |

### Gradient Usage
- [ ] No gradients — flat colors only
- [x] Subtle gradients on backgrounds
- [ ] Gradients on buttons/CTAs
- [ ] Gradient accents on cards/highlights
- [x] Hero section gradient


---

## 3. Typography

### Font Families

| Role | Font | Fallback | Feel |
|------|------|----------|------|
| Headings | Inter | sans-serif | Modern, geometric, confident |
| Body | Inter | sans-serif | Clean, highly readable at all sizes |
| Mono/Code | JetBrains Mono | monospace | For threshold scores, deltas, percentages |

### Type Scale
- [ ] Compact — smaller text, high information density
- [ ] Standard — balanced readability
- [ ] Large — generous sizing, lots of breathing room
- [x] Mixed — large headings with compact body text

<!-- Large, bold headings create visual hierarchy and anchor each section. Compact body text keeps the data-heavy pages (profile, comparison dashboard) scannable without overwhelming. -->

### Text Style Preferences
- [x] Headings should be **bold**
- [ ] Headings should be _light/thin weight_
- [x] Use ALL CAPS for category/group labels only (e.g. "EMOTIONAL PROCESSING", "CONFLICT ENGAGEMENT")
- [ ] Use Title Case for headings
- [ ] Use sentence case for headings
- [x] All lowercase for primary headings (e.g. "your threshold profile", "comparison results")
- [x] Letters should be tightly spaced (tracking) — on headings only
- [ ] Letters should be loosely spaced (tracking)

<!-- 
Additional typography guidance for Claude Code:

- All primary headings are lowercase and bold with tight letter-spacing (-0.02em). This gives the product a distinct, modern identity without feeling casual.
- Category/group labels (the five threshold groups like "emotional processing") should be ALL CAPS, font-size 12px, weight 500, color Text (secondary), letter-spacing 0.05em. This creates a clear visual tier below the main headings.
- Threshold names in the profile and comparison views should be sentence case, weight 500, font-size 14px.
- Numerical scores and deltas should use JetBrains Mono so they align cleanly and feel data-native.
- Body text line-height should be 1.6 for readability.
- Do not use italic anywhere except for inline emphasis in guidance/insight text.
-->


---

## 4. Spacing & Layout

### Overall Density
- [ ] Dense — compact spacing, lots of info per screen
- [x] Balanced — moderate whitespace
- [ ] Airy — generous whitespace, content breathes

<!-- 
Balanced as the default, but with page-level overrides:
- Landing page and quiz flow should lean airy — generous padding, one scenario per viewport, content never feels rushed.
- Profile and comparison dashboard should lean slightly denser — these are data pages and users want to scan without excessive scrolling.
- Claude Code: use py-16 to py-24 for major page sections, py-8 to py-12 for within-section spacing, gap-4 to gap-6 for card grids.
-->

### Page Width
- [ ] Full width (edge to edge)
- [ ] Contained (max-width container, centered)
- [x] Mixed (full-width hero, contained content)

Max-width: `1080px`

<!-- 
1080px keeps body text and comparison bars at comfortable reading width without feeling narrow. The landing page hero section spans full width with the gradient background, then content within it is still contained at 1080px. Quiz scenarios should be narrower — max-width 720px centered — to keep the narrative text at an ideal reading line length. 
-->

### Card/Panel Style
- [ ] No visible cards — content flows on the page
- [x] Cards with borders (no shadow)
- [ ] Cards with subtle shadow
- [ ] Cards with prominent shadow
- [ ] Cards with colored/gradient backgrounds
- [ ] Glassmorphism (frosted glass effect)

<!-- 
Use the border color #E4E0EE for card outlines. Cards have a #FFFFFF background against the #F9F9FB page background — the slight contrast plus the border creates clean elevation without shadow. 

Exception: pattern cards on the comparison dashboard should have a left border accent (4px) using the semantic tension color to visually flag them as actionable insights. Alignment highlight cards get the same treatment with the success/alignment color.
-->

### Border Radius
- [ ] None (sharp corners: 0px)
- [ ] Subtle (small rounding: 4–6px)
- [x] Moderate (medium rounding: 8–12px)
- [ ] Rounded (large rounding: 16–24px)
- [ ] Pill-shaped (fully rounded buttons/tags)

<!-- 
12px for cards and panels. 8px for inputs and smaller elements. Buttons get 8px by default, except tags and badges which get full pill rounding. Threshold progress bars get full rounding (9999px) so they look like capsules. 
-->

---

## 5. Component Styling

### Buttons
- [x] Filled/solid primary buttons
- [x] Outlined/ghost secondary buttons
- [ ] Gradient buttons
- [x] With icons — where contextually useful (share icon on invite button, arrow on "next" in quiz)
- [ ] Rounded/pill shape
- [ ] Square/sharp shape
- [x] Subtle hover animation (scale, glow, color shift)

<!-- 
Primary buttons: #6941F2 background, white text, 8px radius. On hover: darken to #5B35D9 with a subtle scale transform (scale 1.02, transition 150ms ease).
Secondary/ghost buttons: transparent background, #6941F2 text, 1px #E4E0EE border. On hover: background shifts to #F0EDFF.
Destructive buttons (e.g. delete account): #EF4444 background, white text. Use sparingly.
All buttons: font-weight 500, font-size 14px, padding 10px 20px.
Disabled state: opacity 0.5, cursor not-allowed.
-->

### Inputs & Forms
- [ ] Underline-only inputs (no border box)
- [x] Bordered input boxes
- [ ] Filled/shaded background inputs
- [ ] Floating labels
- [x] Labels above input
- [ ] Inline labels

<!-- 
Inputs: #FFFFFF background, 1px #E4E0EE border, 8px radius. On focus: border transitions to #6941F2 with a subtle ring (0 0 0 3px #EBE5FF). 
Labels: font-size 13px, font-weight 500, color #5B5675, margin-bottom 6px.
Placeholder text: color #9994B0.
Error state: border #EF4444, ring color rgba(239,68,68,0.15), error message below in #EF4444 font-size 12px.
-->

### Navigation
- [x] Top navbar (fixed)
- [ ] Top navbar (scrolls away)
- [ ] Sidebar navigation
- [ ] Minimal — just a logo and auth controls
- [x] Bottom nav (mobile)

<!-- 
Desktop: fixed top navbar with #FFFFFF background, 1px bottom border #E4E0EE. Left-aligned logo ("threshold" in lowercase bold Inter, #111027). Right-aligned nav items: profile link, invite CTA button, settings icon. Height 64px. Navbar blurs slightly on scroll (backdrop-filter: blur(8px), background rgba(255,255,255,0.9)).

Mobile: same top navbar but simplified to logo + hamburger. Add a bottom nav bar with 3–4 key actions (quiz, profile, compare, settings) using Lucide icons + lowercase labels. Bottom nav is #FFFFFF with top border #E4E0EE, height 56px.
-->

### Progress Indicators (for the quiz)
- [x] Horizontal progress bar at top
- [ ] Step dots / circles
- [x] Fraction display (e.g. "12 / 30")
- [ ] Percentage
- [ ] No visible progress — just scenario content

<!-- 
Combine a thin horizontal progress bar at the very top of the quiz page (full viewport width, 3px height, #EBE5FF track, #6941F2 fill, smooth width transition) with a fraction display centered below the navbar ("12 / 30" in JetBrains Mono, font-size 13px, color #9994B0). The bar gives instant visual progress; the fraction gives precision. Do not show percentage — fractions feel more human for a 30-question quiz. 
-->

## 6. Page-Specific Direction

### Landing Page (`/`)
Hero section spans full viewport width with subtle gradient from #F0EDFF to #F9F9FB. Centered content: lowercase bold headline ("understand what's really behind your arguments"), subheadline in secondary text color explaining the core idea in one sentence, and a single prominent "take the quiz" CTA button in #6941F2. Keep the hero clean — no illustrations, no stock photos, no feature grids. Let the words do the work.

Below the hero, three sections stacked vertically, each max-width 720px centered: (1) "how it works" — three steps displayed horizontally on desktop, stacked on mobile, using numbered circles in #EBE5FF with #6941F2 text: take the quiz → invite your partner → discover your dynamics. (2) A brief explanation of the threshold concept — short paragraph with a single visual showing two example threshold bars side by side with a gap highlighted, demonstrating the core insight without giving away the full experience. (3) A bottom CTA section repeating the "take the quiz" button.

No testimonials, no pricing, no feature comparison grids. The landing page should feel like a confident, quiet invitation — not a sales pitch. Footer is minimal: logo, a link to privacy policy, and copyright.

### Quiz Flow (`/quiz/[number]`)
One scenario per screen, centered at max-width 720px, full viewport height minus navbar. The experience should feel like reading a short story, not taking a test.

The scenario narrative appears at the top in body text (16px, line-height 1.7, color #111027). Below it, the question ("what would you tell alice to do?") is displayed in lowercase bold Inter, #6941F2, slightly larger (18px), with 32px of space above and below to let it breathe.

The four options are stacked as full-width cards with #FFFFFF background, 1px #E4E0EE border, 12px radius, 16px padding. Each card shows "option a" as a small label (12px, JetBrains Mono, #9994B0) with the response text below (14px, #111027). On hover, the card border shifts to #6941F2 and background to #F0EDFF. When selected, the card gets a 2px #6941F2 border and #F0EDFF background that persists.

The "next" button sits at the bottom, right-aligned, disabled and faded until an option is selected. The "back" button is a ghost/text button to the left of it. The progress bar and fraction counter are visible at the top as specified in section 5.

Transitions between scenarios should be a subtle horizontal slide (150ms ease) — current scenario slides out left, next slides in from right. Going back reverses the direction.

### Individual Profile (`/profile`)
Centered at max-width 880px. Opens with a simple header: "your threshold profile" in lowercase bold, with the completion date below in secondary text.

The 15 thresholds are displayed as horizontal bars grouped under the five category headers (ALL CAPS, 12px, #5B5675, letter-spacing 0.05em). Each threshold row shows: threshold name (left, 14px, weight 500), a horizontal bar (height 10px, fully rounded, #EBE5FF track with #6941F2 fill), and the numerical score (right, JetBrains Mono, 14px, #111027). Below each bar, a one-line behavioral descriptor in secondary text (13px, #5B5675) based on the score range.

Group spacing: 32px between groups, 16px between thresholds within a group. Each group is inside a card with border.

At the bottom of the page, a prominent "invite your partner" CTA card — slightly larger than other cards, centered text, with the headline "see how your thresholds compare" and the invite button. This should feel like a natural next step, not a popup or interruption.

### Comparison Dashboard (`/compare/[pairingId]`)
This is the most important page. Centered at max-width 960px. Neutral and informative — the layout presents data without editorializing.

**Section 1 — side-by-side profile:** Each threshold shows both users' bars on the same horizontal axis. User A's bar is #6941F2, User B's bar is #818CF8 (the info color — distinct but clearly from the same family). A thin vertical line marks where each score sits. The gap between the two scores is subtly shaded in the zone color: green (#22C55E at 10% opacity) for alignment, amber (#EAB308 at 10% opacity) for awareness, red (#EF4444 at 10% opacity) for tension. The delta value is displayed at the right end in JetBrains Mono. Group headers separate the five categories. A small legend at the top shows which color belongs to which person using their display names.

**Section 2 — highlights:** Two side-by-side cards (stacked on mobile). Left card: "where you align" with a 4px left border in #22C55E, listing the top 3 alignment thresholds with brief positive descriptors. Right card: "where you may clash" with a 4px left border in #EF4444, listing the top 3 tension thresholds with brief descriptors of how the gap manifests. Both cards use the same visual weight — neither should dominate.

**Section 3 — detected patterns:** Each pattern is a card with a 4px left border in #EF4444. The pattern name is displayed as a lowercase bold heading (e.g. "the pursue-withdraw cycle"). Below it, the description paragraph explains the dynamic in plain language. Then a "what to try" section with the actionable guidance in a slightly inset block with #F0EDFF background. The triggering deltas are shown as small pills (JetBrains Mono, #EBE5FF background) so users can connect the pattern back to their specific scores.

**Section 4 — full threshold breakdown:** A collapsible/expandable section at the bottom for users who want to explore every threshold in detail. Defaults to collapsed with a "view all thresholds" toggle. When expanded, shows the same bar format as section 1 but with each threshold's full behavioral descriptors for both users.

### Invite Flow (`/invite`)
Simple centered layout, max-width 520px, vertically centered in viewport.

A single card containing: "invite your partner" as the lowercase bold heading. One line of subtext: "share this link — they'll take the quiz and you'll both see how your thresholds compare." The generated invite link displayed in a bordered input-style box (JetBrains Mono, #5B5675, not editable) with a "copy" button inline to the right. Below that, native share buttons (if supported by the browser) as ghost buttons. At the bottom, a small note: "link expires in 30 days" in tertiary text.

The whole experience should take 5 seconds — see it, copy it, share it, done.

---

## 7. Animation & Interaction

### General Animation Philosophy
- [ ] No animations — static and instant
- [ ] Minimal — subtle transitions only (opacity, color)
- [x] Moderate — page transitions, hover effects, scroll reveals
- [ ] Rich — animated charts, micro-interactions, spring physics

### Specific Animations Desired
- [x] Page/route transitions (fade, slide)
- [x] Quiz scenario transitions (slide, fade, flip)
- [x] Hover effects on cards/buttons
- [x] Progress bar animation (smooth fill)
- [x] Threshold bars animate on load (fill from 0 to score)
- [x] Comparison bars animate on load
- [x] Scroll-triggered reveals for landing page sections
- [x] Loading skeletons (pulsing placeholder shapes)
- [x] Toast/notification slide-in

<!--
Animation guidelines for Claude Code:

- All transitions use ease timing, 150–200ms for interactive elements (hover, focus), 250–300ms for layout transitions (page, quiz scenarios).
- Threshold bars on the profile page should animate from 0 to their score value with a staggered delay — each bar starts 50ms after the previous one, creating a cascade down the page. Duration 600ms with ease-out.
- Comparison bars animate the same way, but both users' bars for each threshold animate simultaneously.
- Quiz scenario transitions: current scenario fades out + slides left (150ms), then new scenario fades in + slides from right (200ms). Reverse direction when going back.
- Landing page sections: fade-in + translate-up (20px) on scroll using IntersectionObserver, 400ms ease, triggered once when the section enters viewport.
- Loading skeletons: pulsing #F0EDFF rectangles matching the shape of the content they replace (bars, cards, text blocks). Pulse animation: opacity oscillates between 0.5 and 1.0 over 1.5s ease-in-out infinite.
- Toast notifications: slide in from top-right, 250ms ease, auto-dismiss after 4 seconds with fade-out.
- Do NOT animate: navbar, footer, form inputs, text content within cards. Only structural and data-visualization elements get motion.
- Respect prefers-reduced-motion: wrap all animations in a media query check and disable them for users who prefer reduced motion.
-->

---

## 8. Responsive & Mobile

### Mobile Priority
- [ ] Desktop-first (mobile is secondary)
- [x] Mobile-first (desktop adapts)
- [ ] Equal priority

### Mobile-Specific Notes
<!--
The quiz will likely be taken on phones more than desktops — people share the invite link via text message and the partner opens it on their phone. Mobile experience must be first-class, not an afterthought.

Specific breakpoints and behavior:

Quiz flow (mobile):
- Scenario narrative and options take full width with 16px horizontal padding.
- Options are full-width stacked cards with generous tap targets (minimum 48px height).
- "Next" button is full-width at the bottom, sticky-positioned above the bottom nav so it's always reachable.
- "Back" is a text link above the next button, not a separate button.

Profile page (mobile):
- Threshold bars remain horizontal but take full width.
- Category groups stack naturally.
- Score number sits above the bar instead of to the right.

Comparison dashboard (mobile):
- Comparison bars show both users' scores stacked vertically rather than on the same axis — User A's bar on top, User B's bar below, with the delta value between them.
- Highlight cards (alignment + tension) stack vertically instead of side by side.
- Pattern cards remain full-width stacked, no layout change needed.
- The legend showing which color is which person becomes a sticky element at the top of the comparison section.

Invite page (mobile):
- Card takes full width with 16px padding.
- Copy button becomes full-width below the link display instead of inline.
- Native share sheet is prioritized over the copy button.

General:
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px). Use Tailwind defaults.
- Minimum tap target: 44px height for all interactive elements.
- No hover-dependent interactions on mobile — anything revealed on hover must be visible by default or accessible via tap.
- Bottom nav appears below md breakpoint, top navbar simplifies to logo + hamburger.
-->

---

## 9. Component Library

### Are you using a component library?
- [x] shadcn/ui (preferred — install and use this)
- [ ] Radix UI primitives
- [ ] Headless UI
- [ ] Material UI
- [ ] Chakra UI
- [ ] None — custom components only
- [ ] Other: ___________

### If not using one, should Claude Code install shadcn/ui?
- [x] Yes — install and rebuild components on top of it
- [ ] No — style existing custom components

<!--
Install shadcn/ui and use the following components at minimum:
- Button (primary, secondary/outline, ghost, destructive variants)
- Card (for threshold groups, pattern cards, highlight cards, invite card)
- Input (for auth forms, invite link display)
- Progress (for quiz progress bar and threshold bars)
- Toast (for notifications — partner completed quiz, link copied, etc.)
- Dialog (for retake quiz confirmation, delete account confirmation)
- Collapsible (for the full threshold breakdown on comparison dashboard)
- Tooltip (for threshold name hover explanations on comparison dashboard)

Customize the shadcn theme to use the color palette from section 2. Override the default shadcn border-radius, font, and color variables in the tailwind config and globals.css to match this design brief exactly. Do not use shadcn defaults for colors — they must match the Electric Iris palette.
-->

---

## 10. Assets & Media

### Icons
- [x] Lucide React (recommended with shadcn)
- [ ] Heroicons
- [ ] Phosphor Icons
- [ ] Font Awesome
- [ ] Custom SVGs only
- [ ] No icons
- [ ] Other: ___________

<!--
Use Lucide icons sparingly and purposefully:
- ArrowRight on the quiz "next" button
- ArrowLeft on the quiz "back" action
- Copy on the invite link copy button
- Share2 on the invite share button
- Check for success states and quiz option selection
- ChevronDown for the collapsible threshold breakdown
- User for profile/avatar placeholder
- Users for comparison/pairing references
- LogOut for sign out
- Settings for settings page
- X for dismissing toasts and modals

Do not add decorative icons to headings, threshold names, or cards. Icons should be functional, not ornamental.
-->

### Illustrations
- [ ] No illustrations
- [ ] Simple line illustrations
- [x] Abstract shapes/blobs as decoration
- [ ] Illustrated characters
- [ ] Other: ___________

<!--
Subtle abstract shapes only on the landing page — soft, low-opacity (#6941F2 at 5–8% opacity) organic blob shapes in the hero section background to add visual interest behind the gradient. These should feel ambient, not distracting. Do not use on any other page.

Do not illustrate Alice and Ben or any characters. The quiz scenarios are text-only by design — adding character illustrations would undermine the third-person distancing effect.
-->

### Images
- [x] No photography
- [ ] Stock photography (specific style: _________)
- [ ] Abstract/textural backgrounds
- [ ] Other: ___________

<!--
No photos anywhere in the product. The visual identity is built entirely on typography, color, spacing, and data visualization. This keeps the product feeling clean and universal — no demographics implied, no lifestyle associations.
-->

---

## 11. Implementation Instructions for Claude Code

### Priority Order
1. Tailwind config + globals.css + shadcn/ui setup (design tokens, theme, fonts)
2. Comparison dashboard (`/compare/[pairingId]`) — most complex, highest value page
3. Individual profile (`/profile`) — shares components with comparison
4. Quiz flow (`/quiz/[number]`) — the primary user-facing experience
5. Landing page (`/`) — first impression, but simpler layout
6. Invite flow (`/invite`) — simplest page, last priority
7. Auth pages (`/auth/login`, `/auth/signup`) — functional, clean, minimal styling needed
8. Settings page (`/settings`) — last, lowest complexity

### Global Setup (Do This First)
1. Read this entire document before making any changes.
2. Set up the Tailwind config with the color palette, typography, and spacing defined above.
3. Install the component library specified in Section 9 if not already present.
4. Install the icon library specified in Section 10.
5. Create or update the global CSS with font imports and base styles.
6. Only then begin page-by-page styling in the priority order above.

### Rules
- Every component should pull colors from the Tailwind config — no hardcoded hex values in component files.
- Maintain consistent spacing using Tailwind's spacing scale. Do not mix arbitrary values.
- All interactive elements must have visible hover AND focus states.
- All pages must be responsive. Test at 375px (mobile), 768px (tablet), and 1280px+ (desktop).
- When styling a new page, reference previously styled pages for consistency.
- Do not remove or alter any existing functionality while styling. This is a visual pass only.
- If a design decision isn't specified in this document, match the closest reference product listed in Section 1.

---

### Mandatory Responsive Quality Standard

**Every page and component must look fully polished at all breakpoints before moving to the next page in the priority order.** This is not a "desktop first, fix mobile later" process. Each page is considered incomplete until it has been verified at three widths:

- **Mobile (375px):** All content readable, all tap targets ≥ 44px, no horizontal scrolling, no overlapping elements, no text truncation that hides meaning.
- **Tablet (768px):** Layouts transition cleanly between mobile and desktop. No awkward gaps, no elements that are too wide for the viewport but too narrow to display properly.
- **Desktop (1280px+):** Content stays within max-width containers, doesn't stretch uncomfortably on wide screens, and maintains visual balance.

**If a layout looks broken, misaligned, clipped, or cramped at any of these three widths, it must be fixed before any other work continues.** Do not leave responsive fixes as a polish pass — they are part of the core implementation of each page.

Additionally:
- Test every interactive element (buttons, cards, inputs, tooltips, modals, toasts) at mobile width. If it requires hover to function, add a tap equivalent.
- Comparison bars, threshold bars, and data visualizations must remain readable and correctly proportioned on mobile — never shrunk to the point of being illegible.
- Navigation must be fully functional on mobile with the bottom nav bar and simplified top navbar. No desktop-only navigation paths.
- Modals and dialogs must be full-screen or near-full-screen on mobile, never a small floating box that's hard to interact with.
