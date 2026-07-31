# Menu And Navigation Spec

Version: 1.0.0
Intent: Define ERP information architecture and navigation behavior.

中文說明: 本檔定義資訊架構與導覽行為，重點是層級可預測、權限可解釋、跨裝置可延續。

## 1) Global Defaults
中文說明: 定義導覽系統的預設參數，如層級深度、主選單數量、搜尋捷徑等。
- navigation.mode.default: sidebar
- navigation.max_depth: 3
- navigation.primary_count.recommended: 5-9
- navigation.label.max_chars: 18
- navigation.show_icons: true
- navigation.search.shortcut: Cmd+K

## 2) IA Rules
中文說明: 定義資訊架構分層原則，確保選單命名與層級符合業務心智模型。
- Level 1: business domains (e.g., Sales, Procurement, Finance, HR, Admin).
- Level 2: modules within domain.
- Level 3: pages and actions.
- Avoid Level 4 unless there is legal/compliance necessity.

## 3) Behavior Rules
中文說明: 定義導覽互動行為，例如 active 狀態、麵包屑與全域搜尋應如何運作。
- Active state must persist across refresh.
- Breadcrumb required from level 2 onward.
- First item in each module should be overview page.
- Global search should find pages, entities, and recent items.

## 4) Permission-Aware Navigation
中文說明: 定義權限導向導覽策略，避免無權限使用者遇到不可理解的死路。
- Hidden if no permission.
- Disabled only when feature discoverability is required.
- Permission errors must route to explainable fallback page.

## 5) Mobile Navigation
中文說明: 定義行動端導覽轉換規則，確保深層頁仍可快速返回與切換模組。
- Convert sidebar to bottom tab + drawer hybrid.
- Keep 4 or fewer bottom tabs.
- Place overflow modules in "More" drawer.
- Preserve breadcrumb in page header when depth > 1.

## 6) Customizable Fields
中文說明: 列出導覽可覆寫參數，讓專案可依組織規模調整資訊架構。
- navigation.mode.default: sidebar | topbar | hybrid
- navigation.primary_count.recommended: 4-10
- navigation.search.shortcut: Cmd+K | Ctrl+K | off
- navigation.mobile.pattern: tab-drawer | drawer-only
- permission.visibility_mode: hidden | disabled

## 7) Impact Notes
中文說明: 說明不同導覽模式的取捨，幫助決策時評估學習成本與效率。
- Hybrid navigation improves discoverability but adds complexity.
- Drawer-only mobile nav simplifies structure but slows frequent switching.

## 8) Anti-Patterns
中文說明: 列出導覽設計常見錯誤，避免生成後出現流程阻塞。
- Do not use ambiguous menu labels such as "Manage" or "Tools" without context.
- Do not place Create actions only in deep pages.
- Do not exceed 3 levels for routine workflows.

## 9) Customization How-To
中文說明: 提供導覽規劃順序，先定業務域再定權限，最後驗證任務路徑。
1. Draft IA by business domain first.
2. Map each page to permission keys.
3. Choose desktop and mobile navigation pattern.
4. Validate common 3-click tasks end-to-end.

## 中文快速導讀
- IA 層級: 建議最多 3 層，避免 ERP 日常流程過深。
- 導覽一致性: Active、Breadcrumb、搜尋入口需跨頁維持一致。
- 權限導覽: 無權限可隱藏或停用，但錯誤需導向可理解頁面。
- 行動端: 側欄轉 tab+drawer，常用功能保留在底部 tab。
- 覆寫建議: 先畫部門域，再對應 permission key，再決定導航模式。
