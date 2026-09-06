# Design and behavior QA

final result: passed

## Source and implementation evidence

- Source visual truth: the previous verified site captures in `outputs/qa-production/`, the supplied `Pitching.pdf` asset set, and the existing Ocean Precision design system.
- Implementation captures: `outputs/qa-final/`.
- Combined before/after comparisons opened for visual review: `outputs/comparison/compare-cinematic-machine.jpg`, `compare-cinematic-hardware.jpg`, and `compare-cinematic-team.jpg`.
- Comparison viewport: 1440 × 900 CSS pixels, device scale factor 1. Each side of the combined images is 1440 × 900 pixels; no density normalization was required.
- States: innovation overview, first hardware device selected, and team slide. Stable screenshots used reduced motion; live motion was tested separately with the no-preference media setting.
- Focused regions were not required because the product, sensor, team portraits, typography, and footer controls remain clearly readable in the full-resolution captures. Individual 1440-pixel screenshots were also opened before judging the combined views.

## Findings

No actionable P0, P1, or P2 issue remains.

- Typography: the established local Noto Sans Thai and Manrope hierarchy is preserved. Thai marks, wrapping, heading weight, and small labels remained readable at every tested viewport.
- Spacing and layout: the machine, hardware, jar, journey, impact, and team imagery now occupies more of its intended visual region. The 1440 × 900 comparisons show stronger scale without colliding with copy, navigation, or the fixed footer.
- Colors and visual tokens: the existing navy, pearl, aqua, and champagne palette is unchanged. The new atmosphere uses the supplied light and ribbon raster assets at restrained opacity.
- Image quality and fidelity: every enlarged asset comes from the PDF-derived WebP set. Object fitting preserves aspect ratios; no placeholder, CSS drawing, or stretched screenshot was introduced.
- Copy and content: all text and source qualifications are preserved.
- Motion: slide content now reveals in staggered sequence; the fish, machine, sensor, jar, journey image, team portraits, chart, and data lines animate with distinct timing. The motion toggle stops animations, and `prefers-reduced-motion` keeps every content item visible.

## Comparison history

1. First cinematic pass enlarged the focal assets and added animated PDF-derived light and water-ribbon layers.
2. The first reduced-motion capture exposed hidden headings and lists because their entrance opacity remained at zero after animation was disabled. Added explicit visible fallback states for both the manual motion-off class and `prefers-reduced-motion`.
3. Rebuilt and recaptured all target viewports. The revised captures show complete content in slides 7, 8, 9, 12, 14, and 15. The combined before/after images show the intended increase in product and portrait scale with no new collision.

## Verification

- Browser-rendered production build tested at 1440×900, 1920×1080, 1366×768, 768×1024, 390×844, and 320×740.
- 6 viewports × 16 slides = 96 inspected layouts.
- No horizontal overflow, clipped heading/paragraph/button, hidden reduced-motion content, or broken image found.
- 12 interaction groups passed: keyboard and slide boundaries; contents and hardware selection; workflow steps; research toggle and chart ratio; calculator validation; source-page loading; presenter notes and modal controls; reading/presentation modes; reduced-motion control; fullscreen; autoplay; live cinematic animation and manual stop.
- Zero captured page errors, console errors, or automated WCAG A/AA violations in the tested states.
- `npm run lint`: passed.
- `npm run build`: passed.

## Residual test limits

Browser verification used desktop Chrome with responsive viewport emulation. Physical iOS/Safari devices, projectors, and assistive-technology sessions were not part of this pass.
