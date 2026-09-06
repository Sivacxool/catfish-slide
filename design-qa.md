# Design and behavior QA

final result: passed

## Source and implementation evidence

- Source visual truth: the supplied `Pitching.pdf`, the attached research-chart screenshot, and the previous verified captures in `outputs/qa-final/`.
- Latest implementation captures: `outputs/qa-map-animation-full/`.
- Combined before/after comparisons opened for visual review: `outputs/comparison/compare-map-animation-map.jpg` and `compare-map-animation-research.jpg`.
- Comparison viewport: 1440 × 900 CSS pixels, device scale factor 1. Each side of the combined images is 1440 × 900 pixels; no density normalization was required.
- States: Thailand market map and research chart at 29°C. Stable screenshots used reduced motion; live animation was tested separately with the no-preference media setting.
- Full-view comparison was sufficient because the map silhouette, chart bars, labels, buttons, typography, and footer are clear at native resolution. The attached screenshot was also checked as a focused chart reference.

## Findings

No actionable P0, P1, or P2 issue remains.

- Typography: local Noto Sans Thai and Manrope remain consistent; Thai marks, chart labels, and 29/32 controls remain readable.
- Spacing and layout: the Thailand map is larger at desktop and mobile sizes while keeping the market figures and fixed footer clear. The chart remains aligned to a shared 0–50% baseline.
- Colors and visual tokens: existing navy, pearl, aqua, and champagne tokens are preserved.
- Image quality and fidelity: the map continues to use the PDF-derived raster asset with preserved aspect ratio and no placeholder or CSS drawing.
- Copy and content: 11,528 tons, 13.57%, 43.4%, 26.6%, and the cited source text are unchanged.
- Motion: switching the 29°C and 32°C buttons remounts the chart and value keyframes, so bars and the large rate animate on every change. The manual motion toggle and `prefers-reduced-motion` behavior remain intact.

## Comparison history

1. The map was enlarged using responsive height overrides: 430px desktop, 315px short desktop, and 315px mobile. The paired map comparison shows a more prominent silhouette without text collision.
2. The chart bug was traced to unchanged DOM nodes: changing `height` and opacity did not restart the entrance keyframe. Added temperature-specific keys to the chart and value so each 29/32 selection starts a fresh animation.
3. Added an interaction assertion that confirms `bar-grow` is running after a 32°C selection. Full responsive captures were recaptured after the fix.

## Verification

- Browser-rendered build tested at 1440×900, 1920×1080, 1366×768, 768×1024, 390×844, and 320×740.
- 6 viewports × 16 slides = 96 inspected layouts.
- 12 interaction groups passed, including research selection, chart ratio, animation restart, manual motion stop, and reduced-motion content visibility.
- No horizontal overflow, clipped text, broken image, page error, console error, or automated WCAG A/AA violation was found in tested states.
- `npm run lint`: passed.
- `npm run build`: passed.

## Residual test limits

Verification used desktop Chrome with responsive viewport emulation. Physical Safari/iOS devices, projectors, and assistive-technology sessions were not part of this pass.
