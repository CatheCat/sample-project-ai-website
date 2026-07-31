# Layout Spec

Version: 1.0.0
Intent: Define page structures and information-density rules for ERP workflows.

## 1) Global Defaults
- layout.mode: desktop-first
- layout.max_width: 1440
- layout.content_padding.desktop: 24
- layout.content_padding.tablet: 20
- layout.content_padding.mobile: 16
- layout.grid.columns.desktop: 12
- layout.grid.columns.tablet: 8
- layout.grid.columns.mobile: 4
- layout.section.gap: 16
- layout.card.min_height: 120

## 2) Standard Shell
- Top bar: 56px height, contains product title, global search, user menu.
- Sidebar: 240px expanded, 72px collapsed.
- Content area: scrollable independent panel.
- Footer: optional for internal ERP, default hidden.

## 3) Page Blueprint Rules
### 3.1 Dashboard
- Row 1: KPI cards (3-6 cards).
- Row 2: trend charts and alert panel.
- Row 3: quick actions and pending tasks.

### 3.2 List/Index
- Header: title + primary action + filter shortcut.
- Toolbar: search, filters, batch actions.
- Body: table or list with pagination.
- Side panel (optional): detail preview.

### 3.3 Detail
- Summary block on top.
- Tab sections for related data.
- Sticky action bar for edit/save/back.

### 3.4 Create/Edit Form
- One-column for simple entities.
- Two-column for complex entities on desktop.
- Group fields by business meaning, not by data type.
- Sticky footer with Save and Cancel actions.

## 4) Information Density
- compact: row height 36, form control height 36.
- balanced: row height 40, form control height 40.
- comfortable: row height 44, form control height 44.

Default: balanced.

## 5) Customizable Fields
- layout.max_width: 1280-1600
- sidebar.width.expanded: 220-280
- density_mode: compact | balanced | comfortable
- dashboard.kpi.count: 3-8
- table.preview_panel: on | off

## 6) Impact Notes
- Narrow max width improves readability but may reduce visible table columns.
- Compact mode increases density but requires stronger spacing discipline.
- Larger sidebar helps long menu names but reduces data canvas.

## 7) Anti-Patterns
- Do not place critical actions below fold without sticky action bar.
- Do not use more than 3 visual hierarchies in a single panel.
- Do not mix card-heavy and table-heavy patterns in one viewport without clear section separation.

## 8) Customization How-To
1. Select density mode first.
2. Set max width and sidebar width based on typical data volume.
3. Validate List and Form templates with realistic data length.
4. Ensure sticky actions remain visible at common viewport heights.
