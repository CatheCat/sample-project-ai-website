# AI Native Design Spec - Main

Version: 1.0.0
Scope: Internal ERP Website
Format: Markdown-first, AI-readable

中文說明: 本檔是總控入口，AI 必須先讀本檔，再依順序讀取其餘分檔。

## 1) Purpose
中文說明: 定義這份總規格的目標與使用前提，說明為什麼所有專案都要先讀本檔。
This specification defines a stable, reusable design contract for AI-generated ERP websites.
Every new project must read this file first, then read all linked spec files in the required order.

Goals:
- Keep visual and interaction consistency across projects.
- Allow controlled customization without breaking the system.
- Ensure desktop-first ERP usability while remaining fully responsive.
- Use Google Material Design (Material 3) as the default UI design system.

## 2) Required File Set
中文說明: 列出 AI 生成前必讀檔案，避免漏讀造成規格不一致。
The AI generator must load the following files:
1. ./Style.md
2. ./Layout.md
3. ./Menu-Navigation.md
4. ./RWD.md
5. ./Dos-Donts.md
6. ./ERP-Defaults.md
7. ./Technology-Stack.md
8. ./Generation-Checklist.md
9. ./CHANGELOG.md

## 3) Reading Order And Override Priority
中文說明: 定義讀檔順序與覆寫優先權，確保多份規則衝突時有一致解法。
Read order:
1. Main.md
2. ERP-Defaults.md
3. Technology-Stack.md
4. Style.md
5. Layout.md
6. Menu-Navigation.md
7. RWD.md
8. Dos-Donts.md
9. Generation-Checklist.md

Override priority (high to low):
1. Page override
2. Project override
3. ERP defaults
4. Global defaults in each file

Conflict rules:
- If two rules conflict, higher priority wins.
- If same priority conflicts, stricter accessibility/usability rule wins.
- If still tied, follow rule with more specific selector or scope.

## 4) Spec Contract
中文說明: 統一每份分檔的章節模板，讓人與 AI 都能快速定位資訊。
Each spec file should keep this structure:
- Intent: What this file controls.
- Defaults: Baseline values used by all projects.
- Customizable Fields: Allowed override fields and valid value ranges.
- Impact Notes: What changes when a field is overridden.
- Anti-Patterns: Misuse to avoid.

## 5) Project Override Format
中文說明: 說明新專案如何填寫覆寫區塊，哪些值可自訂、哪些必須回退預設。
When starting a new project, provide one override block in plain Markdown:

```md
## Project Overrides
project_name: ACME ERP
brand_tone: calm-professional | practical | data-driven
design_system: material-3
primary_color: #145A7A
secondary_color: #2B7A78
accent_color: #E8A317
density_mode: balanced
navigation_mode: sidebar
language_mode: zh-TW + en
layout_max_width: 1440
border_radius_scale: compact
motion_level: low
frontend.framework: vue
ui.component_package: vuetify
testing.required: true
testing.scope.minimum: unit+integration
coverage.target.lines: 70
```

Rules:
- Override only listed customizable fields.
- Unknown fields must be ignored.
- Missing fields fall back to defaults.
- `design_system` default is `material-3` if not provided.

## 6) AI Output Requirements
中文說明: 規定 AI 產出最少要交付哪些內容，避免只生成畫面而缺少可落地規格。
For each generated project, AI must output:
1. Design Summary (theme, density, nav behavior, responsiveness strategy)
2. Token Table (resolved final values after overrides)
3. Technical Stack Summary (framework, component package, testing stack)
4. Page Blueprints
5. Component Rules
6. Accessibility Notes
7. Risk List (if any unresolved conflicts)

## 7) Standard Page Blueprints
中文說明: 定義 ERP 最低必備頁型，確保核心流程不缺頁。
Minimum ERP page set:
1. Login
2. Dashboard
3. List/Index
4. Detail
5. Create/Edit Form
6. Settings
7. Permission Matrix (optional but recommended)

## 8) Acceptance Gate
中文說明: 設定放行門檻，通過前不得進入實作。
No generation is considered complete unless:
- All items in Generation-Checklist.md pass.
- Do not violate any high-severity rule in Dos-Donts.md.
- Mobile and tablet behavior is defined for all navigation paths.

## 9) Maintenance Rules
中文說明: 定義版本升級規則，讓規格演進可追蹤且可回溯。
- Increase patch version for wording clarifications.
- Increase minor version for backward-compatible new fields.
- Increase major version for breaking changes.
- Log every change in CHANGELOG.md.

## 10) Hand-off Prompt Template
中文說明: 提供可直接複用的生成提示詞模板，確保每次啟動流程一致。
Use this prompt before AI generates UI:

```md
Read Main.md and all referenced spec files in required order.
Resolve token values by override priority.
Generate ERP website design and implementation plan.
Output must include:
1) resolved design tokens,
2) desktop/tablet/mobile layout behavior,
3) navigation map,
4) do/don't compliance notes,
5) checklist self-review.
```

## 中文快速導讀
- 目的: 統一定義 AI 生成 ERP 網站時的讀檔流程、覆寫規則與交付格式。
- 設計系統: 預設使用 Google Material Design（Material 3）。
- 讀檔順序: 先 Main，再 ERP 預設，最後依 Style/Layout/Menu/RWD/Do-Don't/Checklist。
- 技術選型: 由 Technology-Stack.md 定義 framework、元件套件與測試策略。
- 覆寫優先序: 頁面覆寫 > 專案覆寫 > ERP 預設 > 各檔全域預設。
- 專案啟動方式: 填寫 Project Overrides，僅修改允許欄位，未填則回退預設。
- 驗收門檻: 必須通過 Checklist，且不得違反 Do/Don't 的高嚴重度規則。
