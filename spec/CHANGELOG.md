# CHANGELOG

All notable changes to this design spec system are documented in this file.

## [1.0.5] - 2026-07-31
### Changed
- Switched default framework from React to Vue.
- Updated default UI component package from MUI to Vuetify.

### Notes
- Default stack is now Vue + Vuetify + required tests (unit+integration).
- React + MUI profile is still supported via overrides.

## [1.0.4] - 2026-07-31
### Added
- New Technology-Stack spec file to define framework options (React/Vue), component packages, and testing policy.
- Main spec updated to require and load Technology-Stack.md in generation order.
- Generation checklist updated with engineering stack checks.
- ERP defaults updated with framework/component/testing defaults.

### Notes
- Default stack is React + MUI + required tests (unit+integration).
- Vue profile is available with Vuetify while keeping Material-compatible design language.

## [1.0.3] - 2026-07-31
### Added
- Set Google Material Design (Material 3) as the default design system in Main, Style, and ERP defaults.
- Added checklist validations to ensure generated UI follows Material component and elevation rules.

### Notes
- Design system remains overrideable via `design_system`, with `material-3` as default.

## [1.0.2] - 2026-07-31
### Added
- Section-level Chinese explanation lines under each numbered heading in core spec files.

### Notes
- English keys and rule statements remain unchanged to preserve AI parsing stability.

## [1.0.1] - 2026-07-31
### Added
- Chinese quick-guide sections across all spec files while preserving English schema keys.
- Bilingual intent notes to improve readability for mixed-language teams.

### Notes
- English field names and token keys remain unchanged for AI parsing stability.

## [1.0.0] - 2026-07-31
### Added
- Main spec entry with file loading order and override priority.
- Style spec with design tokens and customization constraints.
- Layout spec with ERP page blueprints and density rules.
- Menu/navigation spec with IA and permission-aware behavior.
- RWD spec with breakpoint and adaptation strategy.
- Do's/Don'ts guardrail document with severity mapping.
- ERP defaults for internal administrative systems.
- Generation checklist for quality gating.

### Notes
- Initial baseline release for AI-native ERP website generation.
- Markdown-first structure intended for both human and AI readability.
