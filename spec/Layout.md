# Layout Spec

Version: 1.0.0
Intent: Define page structures and information-density rules for ERP workflows.

中文說明: 本檔控制頁面骨架與資訊密度，確保儀表板、列表、表單在不同專案仍維持一致節奏。

## 1) Global Defaults
中文說明: 定義版面系統的預設值，包含欄數、內距、間距與內容寬度上限。
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
中文說明: 定義整站外框骨架（頂欄、側欄、內容區），確保頁面切換時體驗一致。
- Top bar: 56px height, contains product title, global search, user menu.
- Sidebar: 240px expanded, 72px collapsed.
- Content area: scrollable independent panel.
- Footer: optional for internal ERP, default hidden.

## 3) Page Blueprint Rules
中文說明: 定義各頁型的建議區塊編排，讓 AI 生成時有穩定模板可遵循。
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
中文說明: 定義資訊密度模式，控制列高與表單高度以平衡可讀性與效率。
- compact: row height 36, form control height 36.
- balanced: row height 40, form control height 40.
- comfortable: row height 44, form control height 44.

Default: balanced.

## 5) Customizable Fields
中文說明: 列出可調整的版面參數，包含寬度、側欄尺寸與儀表板卡片數量。
- layout.max_width: 1280-1600
- sidebar.width.expanded: 220-280
- density_mode: compact | balanced | comfortable
- dashboard.kpi.count: 3-8
- table.preview_panel: on | off

## 6) Impact Notes
中文說明: 說明調整版面參數後對可視欄位、閱讀性與資料畫布的影響。
- Narrow max width improves readability but may reduce visible table columns.
- Compact mode increases density but requires stronger spacing discipline.
- Larger sidebar helps long menu names but reduces data canvas.

## 7) Anti-Patterns
中文說明: 列出會導致可用性下降的佈局做法，避免生成不實用的介面。
- Do not place critical actions below fold without sticky action bar.
- Do not use more than 3 visual hierarchies in a single panel.
- Do not mix card-heavy and table-heavy patterns in one viewport without clear section separation.

## 8) Customization How-To
中文說明: 建議覆寫流程，先定密度再定尺寸，最後用真實資料驗證頁型。
1. Select density mode first.
2. Set max width and sidebar width based on typical data volume.
3. Validate List and Form templates with realistic data length.
4. Ensure sticky actions remain visible at common viewport heights.

## 中文快速導讀
- 版型策略: desktop-first，適合 ERP 的高資料量與長時操作。
- 標準殼層: Top bar + Sidebar + Content，避免每頁重新發明框架。
- 頁型模板: Dashboard、List、Detail、Create/Edit 為必備基礎。
- 密度策略: 先決定密度模式，再決定寬度與側欄，避免互相牴觸。
- 反模式: 關鍵操作不可藏在折疊下方，長頁要有黏著動作列。
