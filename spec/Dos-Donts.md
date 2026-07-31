# Do's And Don'ts Spec

Version: 1.0.0
Intent: Define non-negotiable quality guardrails.

## 1) Do
- Use consistent spacing scale from Style tokens.
- Keep primary actions visually stable across all pages.
- Keep business-critical status visible above fold on desktop and mobile.
- Provide loading, empty, and error states for every data module.
- Use semantic color meaning consistently: success, warning, error, info.
- Ensure keyboard navigation and visible focus state.

## 2) Do Not
- Do not overload dashboards with more than 7 KPI cards per row.
- Do not use more than 2 font families.
- Do not hide key actions inside ambiguous overflow menus.
- Do not use modal for long multi-step forms.
- Do not use color alone to represent status differences.
- Do not introduce page-specific token values outside override rules.

## 3) Severity Levels
- High: accessibility violation, navigation dead-end, destructive-action ambiguity.
- Medium: visual inconsistency, weak hierarchy, dense unreadable sections.
- Low: minor spacing drift, icon inconsistency.

## 4) QA Checklist Mapping
- High severity issues must be fixed before release.
- Medium severity issues require documented rationale if deferred.
- Low severity issues can be batched in design debt backlog.

## 5) Customization How-To
1. Keep this file strict; do not add cosmetic-only rules.
2. Add domain-specific risks as new bullets.
3. Tag each added rule with severity level.
4. Sync any major new rule to Generation-Checklist.md.
