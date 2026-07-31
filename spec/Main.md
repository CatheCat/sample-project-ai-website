# AI Native Design Spec - Main

Version: 1.0.0
Scope: Internal ERP Website
Format: Markdown-first, AI-readable

## 1) Purpose
This specification defines a stable, reusable design contract for AI-generated ERP websites.
Every new project must read this file first, then read all linked spec files in the required order.

Goals:
- Keep visual and interaction consistency across projects.
- Allow controlled customization without breaking the system.
- Ensure desktop-first ERP usability while remaining fully responsive.

## 2) Required File Set
The AI generator must load the following files:
1. ./Style.md
2. ./Layout.md
3. ./Menu-Navigation.md
4. ./RWD.md
5. ./Dos-Donts.md
6. ./ERP-Defaults.md
7. ./Generation-Checklist.md
8. ./CHANGELOG.md

## 3) Reading Order And Override Priority
Read order:
1. Main.md
2. ERP-Defaults.md
3. Style.md
4. Layout.md
5. Menu-Navigation.md
6. RWD.md
7. Dos-Donts.md
8. Generation-Checklist.md

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
Each spec file should keep this structure:
- Intent: What this file controls.
- Defaults: Baseline values used by all projects.
- Customizable Fields: Allowed override fields and valid value ranges.
- Impact Notes: What changes when a field is overridden.
- Anti-Patterns: Misuse to avoid.

## 5) Project Override Format
When starting a new project, provide one override block in plain Markdown:

```md
## Project Overrides
project_name: ACME ERP
brand_tone: calm-professional | practical | data-driven
primary_color: #145A7A
secondary_color: #2B7A78
accent_color: #E8A317
density_mode: balanced
navigation_mode: sidebar
language_mode: zh-TW + en
layout_max_width: 1440
border_radius_scale: compact
motion_level: low
```

Rules:
- Override only listed customizable fields.
- Unknown fields must be ignored.
- Missing fields fall back to defaults.

## 6) AI Output Requirements
For each generated project, AI must output:
1. Design Summary (theme, density, nav behavior, responsiveness strategy)
2. Token Table (resolved final values after overrides)
3. Page Blueprints
4. Component Rules
5. Accessibility Notes
6. Risk List (if any unresolved conflicts)

## 7) Standard Page Blueprints
Minimum ERP page set:
1. Login
2. Dashboard
3. List/Index
4. Detail
5. Create/Edit Form
6. Settings
7. Permission Matrix (optional but recommended)

## 8) Acceptance Gate
No generation is considered complete unless:
- All items in Generation-Checklist.md pass.
- Do not violate any high-severity rule in Dos-Donts.md.
- Mobile and tablet behavior is defined for all navigation paths.

## 9) Maintenance Rules
- Increase patch version for wording clarifications.
- Increase minor version for backward-compatible new fields.
- Increase major version for breaking changes.
- Log every change in CHANGELOG.md.

## 10) Hand-off Prompt Template
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
