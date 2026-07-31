# ERP Domain Defaults

Version: 1.0.0
Intent: Provide pragmatic defaults tuned for internal administrative ERP systems.

中文說明: 本檔提供 ERP 情境預設，目標是用最少覆寫獲得可用且一致的管理後台。

## 1) Product Tone
中文說明: 定義產品語氣與風格方向，避免 ERP 網站視覺偏離商務場景。
- tone.primary: practical
- tone.secondary: trustworthy
- tone.avoid: playful, decorative-heavy

## 2) Default Theme Pack
中文說明: 定義 ERP 預設主題組合，讓專案可在低覆寫成本下快速啟動。
- design_system: material-3
- frontend.framework: vue
- ui.component_package: vuetify
- testing.required: true
- testing.scope.minimum: unit+integration
- density_mode: balanced
- navigation.mode.default: sidebar
- navigation.mobile.pattern: tab-drawer
- motion_level: low
- border_radius_scale: compact
- layout.max_width: 1440

## 3) Core Page Types
中文說明: 定義 ERP 常見必備頁型，確保主流程可完整覆蓋。
- Dashboard
- Master Data List
- Transaction List
- Approval Queue
- Detail View
- Create/Edit Form
- Settings
- Audit Log

## 4) Default Component Patterns
中文說明: 定義核心元件組合模式，提升跨頁一致性與操作效率。
- List pages: sticky toolbar + sticky header table.
- Forms: sectioned groups + sticky bottom action bar.
- Approval pages: split view (list left, detail right) on desktop.
- Status presentation: badge + icon + text (not color only).

## 5) Data-Heavy UX Defaults
中文說明: 定義資料密集介面的預設行為，讓查詢與批次操作更直覺。
- Search always visible on list pages.
- Filters collapsed by default but one-click expandable.
- Export actions grouped under secondary actions.
- Bulk actions shown only after row selection.

## 6) Default Accessibility Baseline
中文說明: 定義可及性最低標準，避免生成後需要大幅返工。
- Text contrast minimum WCAG AA.
- Focus ring always visible.
- Error messages must include field-level and summary-level guidance.

## 7) Customizable Fields
中文說明: 列出可依專案情境調整的 ERP 欄位，不在清單內則維持預設。
- design_system
- frontend.framework
- ui.component_package
- testing.required
- testing.scope.minimum
- density_mode
- navigation.mode.default
- layout.max_width
- language_mode
- table.mobile.view
- dashboard.kpi.count

## 8) Customization How-To
中文說明: 提供 ERP 客製化步驟，協助在效率與可用性間取得平衡。
1. Keep practical tone unchanged unless business explicitly requests brand shift.
2. Adjust density mode based on daily usage duration and user profile.
3. For frontline mobile-heavy teams, tune mobile table strategy first.
4. Document all override reasons in project README.

## 中文快速導讀
- 產品語氣: 實務、可信、避免過度裝飾。
- 預設組合: balanced 密度 + sidebar 導覽 + low 動效。
- 核心頁型: Dashboard、列表、審批、明細、表單、設定、稽核。
- 資料 UX: 搜尋常駐、篩選可展開、批次動作於勾選後才顯示。
- 覆寫建議: 先評估使用者工作型態，再決定密度與行動端表格策略。
