# Generation Checklist

Version: 1.0.0
Intent: Validate AI output quality before implementation starts.

## 1) Pre-Generation Checks
- Main.md and all required files are present.
- Project Overrides block is complete and valid.
- No unknown override fields.
- Override conflicts resolved by priority rules.

## 2) Design Consistency Checks
- Final token table is produced.
- Typography scale is consistent across all page blueprints.
- Status colors are semantically consistent.
- Primary/secondary action pattern is consistent.

## 3) Layout Checks
- Dashboard/List/Detail/Form blueprints are all generated.
- Density mode is applied consistently.
- Sticky actions are defined for long pages.
- Table fallback strategy is defined for small screens.

## 4) Navigation Checks
- IA depth <= 3 for normal workflows.
- Breadcrumb behavior is defined for depth > 1.
- Permission-aware visibility behavior is defined.
- Mobile navigation transformation is defined.

## 5) RWD Checks
- Behavior defined for desktop, tablet, mobile.
- Touch target minimum satisfied.
- Form and table mobile adaptations documented.

## 6) Accessibility And UX Checks
- Contrast target met (WCAG AA minimum).
- Keyboard navigation and focus states specified.
- Loading/empty/error states included.

## 7) Do/Don't Compliance
- No high-severity violation.
- Medium/low issues documented with rationale.

## 8) Ready-To-Build Criteria
All sections pass:
- PASS: proceed to implementation.
- FAIL: revise overrides/spec and regenerate.

## 9) Customization How-To
1. Add project-specific checks under the same section structure.
2. Keep checks measurable and binary where possible.
3. Any new mandatory check must map back to a spec file section.
