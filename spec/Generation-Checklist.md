# Generation Checklist

Version: 1.0.0
Intent: Validate AI output quality before implementation starts.

中文說明: 本檔是生成前後檢核清單，確保輸出可直接進入實作，不需反覆返工。

## 1) Pre-Generation Checks
中文說明: 生成前先檢查輸入條件是否完整且合法，避免錯誤一路帶進輸出。
- Main.md and all required files are present.
- Technology-Stack.md is loaded and resolved.
- Project Overrides block is complete and valid.
- No unknown override fields.
- Override conflicts resolved by priority rules.

## 2) Design Consistency Checks
中文說明: 檢查視覺規則是否前後一致，避免同專案出現多套風格。
- Final token table is produced.
- Default design system is Material 3 unless explicitly overridden.
- Core components follow Material variants and elevation logic.
- Typography scale is consistent across all page blueprints.
- Status colors are semantically consistent.
- Primary/secondary action pattern is consistent.

## 3) Layout Checks
中文說明: 檢查頁型模板與密度策略是否完整落實在主要頁面。
- Dashboard/List/Detail/Form blueprints are all generated.
- Density mode is applied consistently.
- Sticky actions are defined for long pages.
- Table fallback strategy is defined for small screens.

## 4) Navigation Checks
中文說明: 檢查 IA 與導覽行為是否可達、可理解、可回溯。
- IA depth <= 3 for normal workflows.
- Breadcrumb behavior is defined for depth > 1.
- Permission-aware visibility behavior is defined.
- Mobile navigation transformation is defined.

## 5) RWD Checks
中文說明: 檢查三種裝置的行為定義是否完整，避免只做桌機版本。
- Behavior defined for desktop, tablet, mobile.
- Touch target minimum satisfied.
- Form and table mobile adaptations documented.

## 6) Accessibility And UX Checks
中文說明: 檢查可及性與互動體驗底線，確保能看、能用、能操作。
- Contrast target met (WCAG AA minimum).
- Keyboard navigation and focus states specified.
- Loading/empty/error states included.

## 7) Do/Don't Compliance
中文說明: 檢查是否觸犯禁止規則，並要求中低嚴重度有追蹤說明。
- No high-severity violation.
- Medium/low issues documented with rationale.

## 8) Ready-To-Build Criteria
中文說明: 定義是否可進入開發的最終判準。
All sections pass:
- PASS: proceed to implementation.
- FAIL: revise overrides/spec and regenerate.

## 10) Engineering Stack Checks
中文說明: 檢查技術選型是否符合規格，避免產出與既定框架或測試策略不一致。
- Framework profile is explicitly selected (react or vue).
- Primary UI component package matches selected framework.
- Testing policy is declared (`testing.required` true/false) with rationale if false.
- Minimum test scope and coverage target are defined.
- Setup/test/build commands are included in output.

## 9) Customization How-To
中文說明: 說明如何擴充專案檢核項，且必須能回溯到對應規格來源。
1. Add project-specific checks under the same section structure.
2. Keep checks measurable and binary where possible.
3. Any new mandatory check must map back to a spec file section.

## 中文快速導讀
- 生成前: 先檢查檔案齊全、覆寫欄位合法、衝突已解決。
- 一致性: Token、字級、主次按鈕、語意色必須一致。
- 響應式: 三裝置行為、表單與表格策略、觸控尺寸都要有定義。
- 可用性: 對比、鍵盤導覽、loading/empty/error 狀態需完整。
- 放行條件: 全部 PASS 才可進入開發。
- 技術檢核: Framework、元件套件、測試策略與指令需完整定義。
