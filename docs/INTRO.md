這是一份為你整理好的 **「跨框架元件庫開發指南：從 Monorepo 到單元測試」**。你可以將以下內容直接複製並儲存為 `README.md` 或 `GUIDE.md`。

---

# 🚀 跨框架元件庫開發指南

本文件彙整了專案啟動前的核心架構、技術選型與開發流程，旨在建立一個同時支援 **React** 與 **Vue**、具備高測試覆蓋率且易於維護的元件庫。

---

## 一、 專案架構 (Architecture)

採用 **Monorepo (單一程式碼倉庫)** 模式，透過 `pnpm workspaces` 與 `Turborepo` 進行管理。

### 1. 目錄結構

- **`packages/core`**: 純 TypeScript 邏輯層。存放與框架無關的運算、狀態機、工具函式。
- **`packages/theme`**: 樣式層。存放 SCSS、CSS Variables 與 Design Tokens。
- **`packages/ui-react`**: React 元件實作層（包含 Storybook 與單元測試）。
- **`packages/ui-vue`**: Vue 元件實作層（包含 Storybook 與單元測試）。
- **`根目錄`**: 負責全域調度（Turbo, ESLint, Prettier, TypeScript Config）。

---

## 二、 技術選型 (Tech Stack)

| 類別         | 工具                     | 理由                                                 |
| ------------ | ------------------------ | ---------------------------------------------------- |
| **包管理**   | `pnpm`                   | 效能最優，完美支援 Workspace 依賴共享。              |
| **任務調度** | `Turborepo`              | 加速構建與測試，具備智慧快取 (Caching) 機制。        |
| **構建工具** | `Vite` (Lib mode)        | 極速開發體驗，對 React/Vue 支援度最高。              |
| **測試框架** | `Vitest`                 | 與 Vite 100% 相容，執行速度遠超 Jest。               |
| **UI 測試**  | `@testing-library`       | 模擬使用者行為，而非測試實作細節。                   |
| **元件文件** | `Storybook`              | 業界標準，支援多框架並行展示。                       |
| **樣式方案** | `SCSS` + `CSS Variables` | 兼具開發效率（巢狀、混入）與執行時彈性（主題切換）。 |
| **樣式隔離** | `CSS Modules`            | 避免元件庫樣式污染使用者的全域環境。                 |

---

## 三、 開發規範與核心決策

### 1. 命名規範

- **Props 命名**: 一律使用 **`smallCamelCase` (小駝峰)**。
- _原因_: React 不支援 kebab-case，而 Vue 可以自動將 camelCase 轉換為 kebab-case，這是跨框架的最佳公約數。

- **事件命名**: 統一以 `on` 開頭（如 `onClick`, `onChange`）。

### 2. 樣式策略

- 不使用 CSS-in-JS，以確保 Vue/React 能共享同一份 `packages/theme`。
- 利用 **CSS Variables** 定義核心變數（顏色、間距），方便使用者覆蓋樣式。

### 3. 單元測試哲學

- **Core 層**: 100% 覆蓋率，確保邏輯（如分頁計算、狀態轉換）絕對正確。
- **UI 層**: 專注測試「渲染結果」、「Props 響應」與「使用者互動」。
- **視覺**: 交給 Storybook 手動檢查或視覺回歸測試。

---

## 四、 建議開發流程 (The Vertical Slice)

開發新元件（如 `Button`）時，建議遵循以下順序，不要一次開多個戰場：

1. **[Core]** 定義 TypeScript Interface 與核心邏輯，撰寫純 TS 測試。
2. **[Theme]** 在 `packages/theme` 撰寫元件的 SCSS 樣式。
3. **[UI-Framework]**

- 實作元件並引用 Core 與 Theme。
- 建立 `.stories.tsx` 在 Storybook 進行視覺調整。
- 撰寫 `.test.tsx` 進行單元測試（模擬點擊、檢查屬性）。

4. **[Turbo]** 執行 `pnpm turbo build` 確保打包邏輯正確。

---

## 五、 開發前必讀補充

> [!IMPORTANT]
> **1. 不要過度測試樣式**
> 單元測試應專注於「行為」。不要去測試 `color` 是不是 `#fff`，除非那是根據狀態動態計算出來的關鍵結果。
> **2. 保持 Headless 思考**
> 寫 React 版本時，問自己：「這段邏輯 Vue 是不是也能用？」如果是，請把它搬到 `core`。
> **3. 善用 Turbo Caching**
> 如果你的測試沒過，Turbo 會記得。當你修正後只跑受影響的測試，這能大幅節省你的練習時間。

---
