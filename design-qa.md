# Design and behavior QA

final result: passed

## Scope and evidence

This is an intentional redesign of the supplied reference, guided by the user-approved Ocean Precision plan and imagery from Pitching.pdf. It is not a pixel-for-pixel clone. Final evidence was captured from the production Worker build at http://127.0.0.1:4180 in headless Chrome on Windows.

Source: https://y1o1u777-collab.github.io/catfish/

- Source visual truth: `outputs/comparison/reference-hero.png`, `reference-hardware.png`, `reference-counting.png`.
- Implementation: `outputs/comparison/new-hero.png`, `new-hardware.png`, `new-counting.png`.
- Combined comparisons opened for visual review: `outputs/comparison/compare-hero.jpg`, `compare-hardware.jpg`, `compare-counting.jpg`.
- Each source and implementation image is 1440 × 900 pixels, CSS viewport 1440 × 900, device scale factor 1. Combined images are 2880 × 940 including a 40-pixel evidence label. No density mismatch.
- States: opening slide; temperature-control overview with first sensor selected; AI overview before opening the calculator. Reference autoplay paused. New site captured with reduced motion for stable inspection.
- Additional detail: full-resolution 1366-pixel and mobile captures in `outputs/qa-production/`, plus `outputs/comparison/mobile-views.jpg`. All 16 desktop slides and all 16 mobile sections were captured and reviewed. Mobile full-section screenshots include fixed browser content at the captured scroll position; the separate viewport screenshots establish actual visible mobile layout.

## Required surfaces

- Typography: local Noto Sans Thai and Manrope loaded. Thai marks and line breaks visually checked. Headline hierarchy is consistent; source notes remain secondary and open into a readable source dialog. No heading or paragraph crosses its section horizontally in the tested viewports.
- Layout: varied editorial photo, product, data, workflow, and closing layouts replace repeated card grids. Stable margins, side navigation, fixed footer, and source links. Desktop slides fit the tested standard presentation frames. Mobile is a scrollable reading view by default.
- Color: deep navy, pearl, muted aqua and restrained champagne. Final automated axe checks reported no WCAG A/AA violations in the 16 desktop slide states and the presenter-notes dialog tested. This does not imply a complete accessibility certification.
- Images: supplied PDF photographs and product assets replace CSS-drawn machinery and fish. Model image explicitly labeled as a concept model. Team cutouts retain source faces and content; only transparent margins were removed. All 24 asset-manifest URLs returned HTTP 200.
- Copy: temperature research numbers corrected against the cited paper. PDF-only market numbers marked as such. Expected outcomes, conceptual architecture and simulated calculator values distinguished from measured prototype results. School and team follow the source document.

## Comparison history and fixes

1. Chart columns initially had a maximum-height constraint that distorted the ratio. Removed the constraint and gave both columns a shared baseline; production test measured the rendered height ratio against 43.4 / 26.6 within 0.01.
2. Unselected chart labels inherited a low group opacity. Kept text fully opaque and applied selection opacity only to the bar fill. Removed a low-contrast decorative index. Final axe run passed these states.
3. The light image showed a rectangular edge in the opening scene. Feathered the image mask; final hero and mobile viewport captures inspected.
4. Team photos initially included excessive transparent margins. Trimmed to the source alpha bounds and re-exported; final team viewport inspected.
5. Made mobile and reduced-motion preferences explicit external browser subscriptions, stopped autoplay on manual navigation, reset slide scrolling on hash navigation, and labeled the native dialog. Interaction tests passed on the production build.
6. Test-harness corrections: waited for hydration before interaction assertions and used an explicit browser context for axe. Earlier harness failures were not classified as application defects.

## Final verification

- Production browser run: 6 viewports × 16 slides = 96 inspected layouts.
- Viewports: 1440×900, 1920×1080, 1366×768, 768×1024, 390×844, 320×740.
- No horizontal document overflow, no out-of-section headings/paragraphs/buttons, and no broken completed images found.
- 11 interaction groups passed: keyboard and slide boundaries; contents and hardware selection; workflow steps; research selection and chart ratio; calculator and invalid input; source-page loading; presenter notes and modal controls; reading/presentation modes; motion controls; fullscreen; autoplay timing and pause.
- Zero captured page errors; zero captured console errors in the final run.
- Results: `outputs/qa-production/results.json`.
- `npm run lint`: passed.
- `npm run build`: passed.
- `npm audit`: zero known vulnerabilities after compatible dependency updates.
- Windows port 4174 was occupied by another process, so production verification used 4180. No process outside this task was stopped.

## Design assessment against the reference

In the reviewed hero, temperature-control and AI scenes, the new version improves source-image quality, layout variety, restrained color, and visibility of navigation. The hardware section now shows the source devices with selectable explanations; the AI section uses the supplied fish image and a working, labeled calculator. This is a design judgment supported by paired screenshots, not an objective guarantee of aesthetic preference.

## Remaining limits

No unresolved P0/P1/P2 issue was found within the tested scope. Browser checks used desktop Chrome and responsive viewport emulation; native Safari/iOS, physical projectors, and assistive-technology sessions were not tested. The website does not connect to real incubator hardware or run an AI model. The original project PDF does not establish a validated prototype result. Font sizes for footnotes may need adjustment for unusually large rooms; full source details are available in dialogs.

The complete absence of bugs on every device cannot be guaranteed. No additional repeated test runs are required unless a new change or defect is introduced.
