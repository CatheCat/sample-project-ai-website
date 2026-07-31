# RWD Spec

Version: 1.0.0
Intent: Define responsive behavior for ERP UI across desktop, tablet, and mobile.

中文說明: 本檔定義 ERP 在桌機、平板、手機的行為切換，確保流程不中斷與資訊不失真。

## 1) Breakpoints
中文說明: 定義裝置斷點區間，作為版面與元件切換的共同基準。
- mobile: 0-767
- tablet: 768-1023
- desktop: 1024+

Optional large desktop extension:
- wide-desktop: 1440+

## 2) Layout Behavior By Device
中文說明: 規定桌機、平板、手機各自的佈局行為，避免同頁在不同裝置失去可用性。
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
中文說明: 定義表格在小螢幕的降階順序，優先保留關鍵欄位再處理次要資訊。
Priority order:
1. Keep identifier columns always visible.
2. Collapse low-priority columns.
3. Enable horizontal scroll if needed.
4. Offer row detail expansion.
5. Switch to card list on smallest screens.

## 4) Form Responsiveness Strategy
中文說明: 定義表單在行動端的排版與操作策略，降低填寫負擔與錯誤率。
- Label above input on mobile.
- Group critical fields at top.
- Keep primary action sticky at bottom.
- Use native keyboard-friendly input types.

## 5) Touch And Interaction
中文說明: 定義觸控操作最小標準，確保按得到、點得準、看得懂。
- Minimum touch target: 44x44.
- Minimum spacing between actionable elements: 8.
- Avoid hover-only interactions for critical features.

## 6) Customizable Fields
中文說明: 列出可依裝置族群微調的參數，如斷點起點與手機表格型態。
- breakpoint.tablet.start: 700-840
- breakpoint.desktop.start: 960-1200
- mobile.navigation.pattern: tab-drawer | drawer-only
- table.mobile.view: card | compact-table

## 7) Anti-Patterns
中文說明: 列出常見響應式錯誤，避免關鍵資訊在手機端被隱藏或難以操作。
- Do not hide critical status information on mobile.
- Do not require horizontal scroll for all fields in create/edit flows.
- Do not rely on tooltip for essential instructions on touch devices.

## 8) Customization How-To
中文說明: 提供調整步驟，先確認主要裝置，再以真實流程驗證。
1. Confirm highest-frequency device profile.
2. Tune breakpoints only if real usage data supports changes.
3. Define table fallback mode per major list page.
4. Test 3 core flows: search, edit, approval.

## 中文快速導讀
- 斷點基準: mobile 0-767、tablet 768-1023、desktop 1024+。
- 表格策略: 先保留識別欄位，再折疊次要欄位，最後才考慮卡片化。
- 表單策略: 手機一律單欄、標籤置上、主按鈕黏底。
- 互動策略: 觸控目標最小 44x44，關鍵功能不可只靠 hover。
- 覆寫建議: 沒有真實使用數據時，不建議任意改斷點。
