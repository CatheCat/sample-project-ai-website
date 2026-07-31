# Menu And Navigation Spec

Version: 1.0.0
Intent: Define ERP information architecture and navigation behavior.

## 1) Global Defaults
- navigation.mode.default: sidebar
- navigation.max_depth: 3
- navigation.primary_count.recommended: 5-9
- navigation.label.max_chars: 18
- navigation.show_icons: true
- navigation.search.shortcut: Cmd+K

## 2) IA Rules
- Level 1: business domains (e.g., Sales, Procurement, Finance, HR, Admin).
- Level 2: modules within domain.
- Level 3: pages and actions.
- Avoid Level 4 unless there is legal/compliance necessity.

## 3) Behavior Rules
- Active state must persist across refresh.
- Breadcrumb required from level 2 onward.
- First item in each module should be overview page.
- Global search should find pages, entities, and recent items.

## 4) Permission-Aware Navigation
- Hidden if no permission.
- Disabled only when feature discoverability is required.
- Permission errors must route to explainable fallback page.

## 5) Mobile Navigation
- Convert sidebar to bottom tab + drawer hybrid.
- Keep 4 or fewer bottom tabs.
- Place overflow modules in "More" drawer.
- Preserve breadcrumb in page header when depth > 1.

## 6) Customizable Fields
- navigation.mode.default: sidebar | topbar | hybrid
- navigation.primary_count.recommended: 4-10
- navigation.search.shortcut: Cmd+K | Ctrl+K | off
- navigation.mobile.pattern: tab-drawer | drawer-only
- permission.visibility_mode: hidden | disabled

## 7) Impact Notes
- Hybrid navigation improves discoverability but adds complexity.
- Drawer-only mobile nav simplifies structure but slows frequent switching.

## 8) Anti-Patterns
- Do not use ambiguous menu labels such as "Manage" or "Tools" without context.
- Do not place Create actions only in deep pages.
- Do not exceed 3 levels for routine workflows.

## 9) Customization How-To
1. Draft IA by business domain first.
2. Map each page to permission keys.
3. Choose desktop and mobile navigation pattern.
4. Validate common 3-click tasks end-to-end.
