# Do's And Don'ts Spec

Version: 1.0.0
Intent: Define non-negotiable quality guardrails.

中文說明: 本檔是底線規範，目的是避免生成結果出現可用性或一致性退化。

## 1) Do
中文說明: 列出必做原則，確保生成結果在一致性與可用性上達到最低品質。
- Use consistent spacing scale from Style tokens.
- Keep primary actions visually stable across all pages.
- Keep business-critical status visible above fold on desktop and mobile.
- Provide loading, empty, and error states for every data module.
- Use semantic color meaning consistently: success, warning, error, info.
- Ensure keyboard navigation and visible focus state.

## 2) Do Not
中文說明: 列出禁止行為，避免介面產生誤導、混亂或維護成本過高的設計。
- Do not overload dashboards with more than 7 KPI cards per row.
- Do not use more than 2 font families.
- Do not hide key actions inside ambiguous overflow menus.
- Do not use modal for long multi-step forms.
- Do not use color alone to represent status differences.
- Do not introduce page-specific token values outside override rules.

## 3) Severity Levels
中文說明: 定義問題嚴重度分級，協助你判斷修復優先順序。
- High: accessibility violation, navigation dead-end, destructive-action ambiguity.
- Medium: visual inconsistency, weak hierarchy, dense unreadable sections.
- Low: minor spacing drift, icon inconsistency.

## 4) QA Checklist Mapping
中文說明: 把嚴重度映射到處理策略，讓驗收決策有明確依據。
- High severity issues must be fixed before release.
- Medium severity issues require documented rationale if deferred.
- Low severity issues can be batched in design debt backlog.

## 5) Customization How-To
中文說明: 說明如何擴充規則且保持可驗證，避免規範變成主觀描述。
1. Keep this file strict; do not add cosmetic-only rules.
2. Add domain-specific risks as new bullets.
3. Tag each added rule with severity level.
4. Sync any major new rule to Generation-Checklist.md.

## 中文快速導讀
- Do: 維持 Token 一致、操作一致、狀態可見、狀態頁完整。
- Do Not: 避免過量 KPI、深層隱藏動作、僅靠顏色表達狀態。
- 嚴重度: High 必修、Medium 可延後但需說明、Low 可納入債務排程。
- 維護原則: 新規則需可驗證，並同步到 Checklist 才能落地。
