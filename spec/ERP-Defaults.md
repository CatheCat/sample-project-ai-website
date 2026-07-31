# ERP Domain Defaults

Version: 1.0.0
Intent: Provide pragmatic defaults tuned for internal administrative ERP systems.

## 1) Product Tone
- tone.primary: practical
- tone.secondary: trustworthy
- tone.avoid: playful, decorative-heavy

## 2) Default Theme Pack
- density_mode: balanced
- navigation.mode.default: sidebar
- navigation.mobile.pattern: tab-drawer
- motion_level: low
- border_radius_scale: compact
- layout.max_width: 1440

## 3) Core Page Types
- Dashboard
- Master Data List
- Transaction List
- Approval Queue
- Detail View
- Create/Edit Form
- Settings
- Audit Log

## 4) Default Component Patterns
- List pages: sticky toolbar + sticky header table.
- Forms: sectioned groups + sticky bottom action bar.
- Approval pages: split view (list left, detail right) on desktop.
- Status presentation: badge + icon + text (not color only).

## 5) Data-Heavy UX Defaults
- Search always visible on list pages.
- Filters collapsed by default but one-click expandable.
- Export actions grouped under secondary actions.
- Bulk actions shown only after row selection.

## 6) Default Accessibility Baseline
- Text contrast minimum WCAG AA.
- Focus ring always visible.
- Error messages must include field-level and summary-level guidance.

## 7) Customizable Fields
- density_mode
- navigation.mode.default
- layout.max_width
- language_mode
- table.mobile.view
- dashboard.kpi.count

## 8) Customization How-To
1. Keep practical tone unchanged unless business explicitly requests brand shift.
2. Adjust density mode based on daily usage duration and user profile.
3. For frontline mobile-heavy teams, tune mobile table strategy first.
4. Document all override reasons in project README.
