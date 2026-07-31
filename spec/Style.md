# Style Spec

Version: 1.0.0
Intent: Define visual language, design tokens, and component-level style decisions.

中文說明: 本檔定義視覺 Token 與元件風格，欄位鍵名請維持英文以利 AI 穩定解析。

## 0) Design System Baseline
中文說明: 定義預設設計系統，所有元件與互動樣式需優先遵循此基準。
- design_system.default: material-3
- design_system.source: Google Material Design
- component_style.priority: material-first

## 1) Global Defaults
中文說明: 定義全站共用的視覺基準值，包含色彩、字體、間距、陰影與動效。

### 1.1 Color Tokens
- color.primary: #145A7A
- color.primary.hover: #0F4C67
- color.secondary: #2B7A78
- color.accent: #E8A317
- color.bg.canvas: #F5F7FA
- color.bg.surface: #FFFFFF
- color.bg.subtle: #EEF2F6
- color.text.primary: #1F2937
- color.text.secondary: #4B5563
- color.text.muted: #6B7280
- color.border.default: #D1D9E6
- color.success: #0F9D58
- color.warning: #D97706
- color.error: #C0392B
- color.info: #1D4ED8

### 1.2 Typography Tokens
- font.family.primary: "IBM Plex Sans", "Noto Sans TC", sans-serif
- font.family.mono: "IBM Plex Mono", "Noto Sans Mono", monospace
- font.size.xs: 12
- font.size.sm: 14
- font.size.md: 16
- font.size.lg: 18
- font.size.xl: 22
- font.size.h1: 32
- font.size.h2: 26
- font.size.h3: 22
- font.weight.regular: 400
- font.weight.medium: 500
- font.weight.semibold: 600
- line.height.tight: 1.3
- line.height.normal: 1.5
- line.height.relaxed: 1.7

### 1.3 Spacing And Shape Tokens
- space.1: 4
- space.2: 8
- space.3: 12
- space.4: 16
- space.5: 20
- space.6: 24
- space.8: 32
- space.10: 40
- radius.xs: 4
- radius.sm: 6
- radius.md: 10
- radius.lg: 14
- radius.pill: 999
- border.width.default: 1
- border.width.strong: 2

### 1.4 Shadow Tokens
- shadow.sm: 0 1px 2px rgba(15, 23, 42, 0.06)
- shadow.md: 0 6px 18px rgba(15, 23, 42, 0.10)
- shadow.lg: 0 10px 30px rgba(15, 23, 42, 0.14)

### 1.5 Motion Tokens
- motion.duration.fast: 120ms
- motion.duration.normal: 200ms
- motion.duration.slow: 320ms
- motion.easing.standard: cubic-bezier(0.2, 0, 0, 1)
- motion.level.default: low

## 2) Component Styling Rules
中文說明: 定義常見元件的視覺行為，避免同一類元件在不同頁面長得不一樣。
- Buttons: use Material button variants (filled/outlined/text), danger only for destructive.
- Inputs: clear border contrast, 40px min height desktop, 44px min touch target on mobile.
- Cards: use Material surface and elevation levels for hierarchy.
- Tables: zebra optional, header sticky allowed, row hover must keep text contrast.
- Tags/Badges: semantic colors only, avoid random decorative colors.

## 3) Customizable Fields
中文說明: 列出允許覆寫的欄位與可用範圍，避免自由改值破壞整體一致性。
Allowed override fields:
- design_system: material-3 | material-2
- color.primary, color.secondary, color.accent
- font.family.primary
- density_mode: compact | balanced | comfortable
- border_radius_scale: compact | balanced | rounded
- motion_level: none | low | medium

Validation:
- Text contrast target: WCAG AA minimum.
- Accent color cannot be used for body text.
- Motion level medium cannot be used with high-density compact mode.

## 4) Impact Notes
中文說明: 說明每個常見覆寫會影響哪些區塊，方便預估改動範圍。
- Changing primary color affects buttons, links, active navigation, focus rings.
- Changing density mode affects paddings, table row height, form spacing.
- Changing font family affects baseline rhythm and may require heading line-height review.

## 5) Anti-Patterns
中文說明: 定義視覺反模式，提醒生成結果不可踩到的設計地雷。
- Do not mix more than 1 accent color in the same page.
- Do not use gradient text for data values.
- Do not use pure black (#000000) as default body text.
- Do not use very light gray for critical data labels.
- Do not mix Material and non-Material component styles in the same page.

## 6) Customization How-To
中文說明: 提供執行順序，教你如何安全覆寫並完成生成前檢查。
1. Copy the project override block from Main.md.
2. Replace only allowed fields.
3. Recompute final tokens before generating components.
4. Run contrast check for text and actionable controls.

## 中文快速導讀
- 色彩: 先用 color.primary、color.secondary、color.accent 三主軸，避免額外自創主題色。
- 設計系統: 預設為 Material 3，優先沿用其元件語彙與層級規則。
- 字體: ERP 預設採可讀性優先，中文與英文字體已同時考量。
- 密度: compact 偏資料密集，balanced 為預設，comfortable 偏易讀。
- 動效: 預設 low；若資料密度高，不建議調到 medium。
- 覆寫建議: 只改允許欄位，改完先做對比檢查再生成 UI。
