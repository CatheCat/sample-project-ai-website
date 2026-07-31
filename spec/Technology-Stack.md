# Technology Stack Spec

Version: 1.0.0
Intent: Define implementation stack choices for AI-generated projects, including framework, UI component package, and testing requirements.

中文說明: 本檔定義專案生成時的技術選型，包含框架、元件套件、測試策略與可覆寫範圍。

## 1) Global Defaults
中文說明: 定義若未指定時的預設技術組合，確保生成結果一致。
- frontend.framework.default: vue
- frontend.framework.version.target: stable-latest
- language.default: typescript
- build_tool.default: vite
- package_manager.default: pnpm
- design_system.default: material-3
- testing.required: true

## 2) Framework Profiles
中文說明: 定義不同框架的生成配置檔，AI 必須擇一套用。

### 2.1 React Profile
- frontend.framework: react
- ui.component_package: @mui/material
- ui.icon_package: @mui/icons-material
- state.default: @tanstack/react-query + zustand
- router.default: react-router

### 2.2 Vue Profile
- frontend.framework: vue
- ui.component_package: vuetify
- ui.icon_package: @mdi/font
- state.default: pinia
- router.default: vue-router

Rules:
- If `design_system` is `material-3`, prefer React+MUI or Vue+Vuetify profiles.
- Mixing framework-specific libraries across profiles is not allowed.

## 3) Component Package Rules
中文說明: 定義元件庫的選型原則，避免 UI 視覺與互動語言混雜。
- React projects should use MUI as primary component package.
- Vue projects should use Vuetify as primary component package.
- Custom components are allowed only when required features are missing.
- Custom components must still follow Material tokens and interaction patterns.

## 4) Testing Policy
中文說明: 定義是否要測試，以及各層級測試最小配置。
- testing.required: true (default)
- testing.scope.minimum: unit + integration
- testing.e2e.recommended: true
- coverage.target.lines: 70

## 5) Testing Stack Options
中文說明: 定義不同框架的測試套件建議，供 AI 生成時對應採用。

### 5.1 React Testing Stack
- unit_runner: vitest
- component_testing: @testing-library/react
- assertion_helpers: @testing-library/jest-dom
- api_mocking: msw
- e2e: playwright

### 5.2 Vue Testing Stack
- unit_runner: vitest
- component_testing: @vue/test-utils
- assertion_helpers: @testing-library/jest-dom (optional)
- api_mocking: msw
- e2e: playwright

## 6) Project Override Fields
中文說明: 列出可覆寫欄位，讓你可在開案時切換框架或測試等級。
- frontend.framework: react | vue
- language.default: typescript | javascript
- build_tool.default: vite | nextjs
- package_manager.default: pnpm | npm | yarn
- ui.component_package: auto | @mui/material | vuetify
- testing.required: true | false
- testing.scope.minimum: unit | unit+integration | unit+integration+e2e
- coverage.target.lines: 60-90

## 7) Generation Output Requirements
中文說明: 要求 AI 一併輸出技術落地規格，避免只有視覺規則沒有工程方案。
AI must output:
1. selected framework profile and reasons
2. selected component package and fallback policy
3. test plan (what to test, with which packages)
4. baseline commands for setup, test, and build

## 8) Anti-Patterns
中文說明: 定義技術選型禁忌，避免生成後出現高維護成本。
- Do not combine React with Vue-specific packages, or Vue with React-specific packages.
- Do not disable testing by default for ERP projects.
- Do not use more than one primary UI component package in the same project.
- Do not generate untyped API contracts in TypeScript mode.

## 9) Customization How-To
中文說明: 提供開案設定流程，讓覆寫能快速且可驗證。
1. Choose framework first (react or vue).
2. Keep Material-compatible component package for chosen framework.
3. Decide testing scope based on release risk and team velocity.
4. Set coverage target and list non-goals explicitly.

## 10) Quick Start Examples
中文說明: 提供可直接複製的覆寫範例，降低開案成本。

### React ERP Example
```md
frontend.framework: react
ui.component_package: @mui/material
testing.required: true
testing.scope.minimum: unit+integration
coverage.target.lines: 75
```

### Vue ERP Example
```md
frontend.framework: vue
ui.component_package: vuetify
testing.required: true
testing.scope.minimum: unit+integration+e2e
coverage.target.lines: 70
```

## 中文快速導讀
- 預設框架: Vue（TypeScript + Vite + pnpm）。
- Vue 選項: 可切換成 Vue + Vuetify，同樣維持 Material 3 風格。
- 測試預設: 必做，至少 unit+integration，建議加 e2e。
- 套件原則: React 對 MUI、Vue 對 Vuetify，不混用雙主套件。
