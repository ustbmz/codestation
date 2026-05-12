# CodeStation — Portfolio & Resume Copy

Use the **English** blocks for LinkedIn / portfolio forms. The **中文** section summarizes the same facts with a React-first lens for domestic CVs or internal docs.

---

## English (copy-paste)

**Project title**

`CodeStation — Full-Stack Q&A & Learning (React + Umi + Node.js)`

**Your role (example)**

`Front-end / Full-stack Engineer`

**Short description (2–3 sentences)**

End-to-end web product for technical Q&A, discussions, and curated learning content (books, interview questions, and related flows). The user-facing app is built with **React 18** and modern data/routing patterns; an **Ant Design Pro** console is built on **Umi 4**; APIs are **Node.js + Express + MongoDB**.

**Skills / technologies (React-heavy, truthful to repo)**

- **React 18** — function components, **Hooks** (`useState`, `useEffect`, `useLocation`, `useNavigate`, etc.)
- **React Router v6** — declarative routes, `Navigate`, protected-route style gating before render
- **Redux Toolkit** — `configureStore`, **`createSlice`** reducers for user, taxonomy, and interview state; **`react-redux`** (`useDispatch`, store provider)
- **Create React App** (`react-scripts`) — dev/build pipeline for the public SPA (**csFront**)
- **Internationalization** — **i18next** + **react-i18next** + browser language detection; separate stack in admin: **Umi locale plugin** + **react-intl**-compatible APIs
- **UI** — **Ant Design** (v4 in csFront, v5 in csAdmin) and layout/header/footer composition
- **HTTP** — **Axios** with a shared request layer; dev **proxy** to backend (`setupProxy`)
- **Rich content** — **Toast UI React Editor** integration where editing is required
- **Admin / framework** — **Umi Max 4** (`@umijs/max`): file-based routes, **plugin-layout** (ProLayout), **plugin-locale**, **plugin-model** / **initialState**, **plugin-request**; **Ant Design Pro Components** (ProTable, ProForm, ProLayout patterns)
- **TypeScript** — admin app (**csAdmin**) uses TS + typings for React 18
- **Testing (scaffold)** — **React Testing Library** + Jest-oriented setup from CRA template

**Optional one-liner for “What I did on the React side”**

Designed and implemented two React frontends sharing one API: a **CRA + Redux Toolkit + React Router v6** community client, and a **Umi Max + Pro Components + TS** operations console, with auth-aware routing, global state, i18n, and Ant Design–driven UX.

---

## 中文 — React 技术重点（与仓库一致）

**整体**

CodeStation 是前后端分离的「技术问答 + 内容学习」类全栈项目。与 **React** 直接相关的有两条前端线：**用户站 csFront** 与 **管理后台 csAdmin**，通过 **csApi**（Express + MongoDB）统一提供接口。

**csFront（用户站）— 经典 React SPA**

- **React 18**：函数组件 + **Hooks**（如应用启动时用 `useEffect` 拉取登录态并 `dispatch` 初始化用户）。
- **React Router v6**：`Routes` / `Route` / `Navigate`、按路径渲染页面；结合自定义 **路由前置逻辑**（按配置与 `localStorage` token 做登录拦截）。
- **Redux Toolkit**：`configureStore` 聚合 `user` / `type` / `interview` 等 **slice**（`createSlice` + `useDispatch`），管理登录态与列表相关状态。
- **react-redux**：全局 `Provider` + 业务组件内 `useDispatch`。
- **Ant Design 4**：布局（`Layout`）、表单、结果页等组件化页面。
- **i18next + react-i18next**：多语言资源与浏览器/本地存储探测。
- **Axios**：接口封装；开发环境通过 **setupProxy** 将 `/api` 等转发到 Node 服务。
- **工程化**：Create React App（`react-scripts`），可按需使用模板自带的 **Testing Library** 做组件测试。

**csAdmin（后台）— 企业级 React 应用壳**

- **Umi Max 4（@umijs/max）**：约定式路由、运行时 **`app.ts/js`**（如 `getInitialState`、`layout`、`request` 拦截器、`rootContainer`）。
- **Ant Design 5 + Ant Design Pro Components**：后台表格、表单、布局（ProLayout / ProTable / ProForm 等使用模式）。
- **TypeScript**：后台页面与组件以 TS/TSX 为主，类型与 React 18 类型包对齐。
- **国际化**：Umi **locale** 插件 + `src/locales` 文案；与 Pro 组件文案通过 `ProConfigProvider` 等与当前语言对齐。
- **权限与数据流**：配合 Umi 的 **access**、**model**、**initialState** 等插件能力做登录态与布局动作区（具体以 `.umirc` 与 `app.js` 为准）。

**与 React 弱相关但常被写在项目里**

- **csApi**：Node.js + Express + Mongoose，为两个 React 前端提供 REST 能力（JWT、会话等以仓库实现为准）。

**写简历/作品集时可强调的一句话**

双端 React：一端 **CRA + Hooks + Redux Toolkit + Router v6** 做 C 端产品化页面；另一端 **Umi Max + Pro Components + TypeScript** 做可扩展的后台控制台，统一对接同一套 Node API。

---

## File map (quick reference)

| Path        | Stack (React-related) |
|------------|------------------------|
| `csFront/` | CRA, React 18, RTK, RR v6, antd4, i18next, axios |
| `csAdmin/` | Umi Max 4, React 18, antd5, Pro Components, TypeScript |
| `csApi/`   | Express (serves both frontends) |

If you refresh this document after major refactors, re-check each `package.json` and `src/` entry points.
