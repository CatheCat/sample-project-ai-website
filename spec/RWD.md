# RWD Spec

Version: 1.0.0
Intent: Define responsive behavior for ERP UI across desktop, tablet, and mobile.

## 1) Breakpoints
- mobile: 0-767
- tablet: 768-1023
- desktop: 1024+

Optional large desktop extension:
- wide-desktop: 1440+

## 2) Layout Behavior By Device
### Desktop
- Sidebar persistent.
- Multi-column forms allowed.
- Table with full columns and optional frozen key columns.

### Tablet
- Sidebar collapses by default.
- Forms move to single-column unless field group is tightly related.
- Tables prioritize key columns; less-used columns move to horizontal scroll.

### Mobile
- Replace persistent sidebar with tab or drawer pattern.
- One-column forms only.
- Replace dense tables with card list when scanning is more important than cross-row comparison.

## 3) Table Responsiveness Strategy
Priority order:
1. Keep identifier columns always visible.
2. Collapse low-priority columns.
3. Enable horizontal scroll if needed.
4. Offer row detail expansion.
5. Switch to card list on smallest screens.

## 4) Form Responsiveness Strategy
- Label above input on mobile.
- Group critical fields at top.
- Keep primary action sticky at bottom.
- Use native keyboard-friendly input types.

## 5) Touch And Interaction
- Minimum touch target: 44x44.
- Minimum spacing between actionable elements: 8.
- Avoid hover-only interactions for critical features.

## 6) Customizable Fields
- breakpoint.tablet.start: 700-840
- breakpoint.desktop.start: 960-1200
- mobile.navigation.pattern: tab-drawer | drawer-only
- table.mobile.view: card | compact-table

## 7) Anti-Patterns
- Do not hide critical status information on mobile.
- Do not require horizontal scroll for all fields in create/edit flows.
- Do not rely on tooltip for essential instructions on touch devices.

## 8) Customization How-To
1. Confirm highest-frequency device profile.
2. Tune breakpoints only if real usage data supports changes.
3. Define table fallback mode per major list page.
4. Test 3 core flows: search, edit, approval.
