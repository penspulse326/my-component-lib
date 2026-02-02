# my-component-lib

## 🛠️ 根目錄套件與架構說明

本專案採用 **Monorepo** 架構，根目錄的 `package.json` 主要負責全域的專案管理、開發規範制定與工作流控制，不包含具體的 UI 元件實作。

以下為主要使用的工具與套件分類說明：

### 1. Monorepo 建構與管理

負責統籌多個子專案 (Packages) 的任務與依賴。

| 套件名稱           | 用途說明                                                                                                                |
| :----------------- | :---------------------------------------------------------------------------------------------------------------------- |
| **turbo**          | 高效的 Monorepo 任務調度工具。負責加速與平行執行 `build`, `test`, `lint` 等指令 (對應 `scripts` 中的 `turbo run ...`)。 |
| **packageManager** | 鎖定使用 **pnpm** (目前版本 10.28.1)，確保團隊成員使用一致的套件管理器版本。                                            |

### 2. 程式碼規範與品質檢查 (Linting & Formatting)

確保所有子專案遵循統一的程式碼風格與最佳實踐。

#### ESLint (邏輯檢查)

涵蓋 JavaScript, TypeScript, Vue, React 等框架的語法與邏輯檢查。

- **核心與基礎**: `eslint`, `@eslint/js`, `globals` (ESLint 9.x)
- **TypeScript**: `typescript-eslint` (支援 TS 語法檢查)
- **Vue**: `eslint-plugin-vue`, `eslint-plugin-vuejs-accessibility` (Vue 3 規範與無障礙檢查)
- **React**: `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`, `eslint-plugin-jsx-a11y` (React Hooks, Refresh 與無障礙檢查)
- **Storybook**: `eslint-plugin-storybook` (針對 Storybook 設定檔的檢查)
- **排序工具**: `eslint-plugin-perfectionist` (自動排序 Import 與 Object key，保持整齊)
- **相容性**: `eslint-config-prettier` (關閉與 Prettier 衝突的 ESLint 規則)

#### Stylelint (樣式檢查)

專注於 CSS 與 SCSS 的品質管控。

- **核心**: `stylelint`, `sass` (SCSS 編譯支援)
- **規則集**:
  - `stylelint-config-standard-scss` (SCSS 標準規則)
  - `stylelint-config-recommended-vue` (Vue SFC `<style>` 區塊支援)
- **解析器**: `postcss-html` (讓 Stylelint 能解析 Vue/HTML 檔案)
- **排序工具**: `stylelint-config-recess-order` (自動依照 CSS 屬性邏輯排序，如 Positioning -> Box Model -> Typography)

#### Formatter (排版格式化)

- **prettier**: 負責程式碼的斷行、縮排、引號等視覺風格統一，不涉及邏輯檢查。

### 3. Git 工作流自動化

確保程式碼在提交與推送階段符合規範。

| 套件名稱            | 用途說明                                                                              |
| :------------------ | :------------------------------------------------------------------------------------ |
| **husky**           | Git Hooks 工具。設定 `prepare` 腳本，在 `git commit` 前自動觸發檢查。                 |
| **lint-staged**     | 搭配 husky 使用。只對「暫存區 (Staged)」的檔案執行 Lint 與 Format，提升 Commit 效率。 |
| **@commitlint/cli** | 檢查 Commit Message 格式 (遵循 Conventional Commits，如 `feat: add button`)。         |

### 4. 常用指令 (Scripts)

根目錄定義的指令通常會代理到各個子專案執行。

- `dev` / `build` / `test`: 透過 `turbo` 分派任務給各 Packages。
- `lint`: 執行 ESLint 檢查所有 JS/TS/Vue/React 檔案。
- `lint:style`: 執行 Stylelint 檢查 CSS/SCSS/Vue 檔案。
- `lint:fix`: 自動修復所有 Lint 錯誤。
- `format`: 執行 Prettier 格式化全專案。
