# ⚡ Initrajs

> Scaffold fullstack apps with zero config. Built for speed, scalability, and modern dev workflows.

[![NPM Version](https://img.shields.io/npm/v/initrajs?color=blue)](https://www.npmjs.com/package/initrajs)
[![Downloads](https://img.shields.io/npm/dw/initrajs.svg)](https://www.npmjs.com/package/initrajs)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Made by Blessed Raj P](https://img.shields.io/badge/made%20by-blessedrajp-blueviolet)](https://github.com/blessedrajp)

---

## 📖 Introduction

**Initrajs** is a zero-config CLI that scaffolds fullstack, production-ready applications using cutting-edge architecture and best practices — in seconds. With full support for TypeScript, MUI theming, Redux Toolkit, and a robust MVC-based backend, it’s the fastest way to kickstart serious web apps.

---

## 📚 Table of Contents

- [🚀 Features](#-features)
- [📦 Installation & Usage](#-installation--usage)
- [🧰 Supported Templates](#-supported-templates)
- [📁 Next.js App Structure](#-nextjs-app-structure)
- [⚙️ Backend Architecture](#-backend-architecture)
- [🛣️ Roadmap](#-roadmap)
- [🐞 Troubleshooting](#-troubleshooting)
- [👨‍💻 Contributing](#-contributing)
- [📄 License](#-license)
- [🙌 Acknowledgments](#-acknowledgments)

---

## 🚀 Features

### 🧩 Frontend (React / Next.js)

- ⚙️ **Full TypeScript Support**
- 🎨 Integrated **MUI v5** with global theme customization
- 🧠 Configured **Redux Toolkit** for scalable state management
- 🔐 **AuthContext** + **AuthGuard** for protected routing
- 🧾 **Class-based API Services** for clean, DRY code
- 📂 **Modular App Directory Structure** using Next.js App Router
- 💾 **Session-based token handling**, synced with AuthContext
- ✅ Best practices for scalability, reusability, and DX

### 🔧 Backend (Node.js)

- 🏗️ Structured **MVC + Service Layer** architecture
- 🔐 JWT authentication with middleware protection
- ✅ DTOs and Validators (using `express-validator`)
- 🌐 Modular route handling
- 🔥 Global error middleware
- 📦 TypeScript-first with modern conventions

---

## 📦 Installation & Usage

### Run instantly with NPX

```bash
npx initrajs init
```

### Optional: Global install
```bash 
npm install -g initrajs
initrajs init
```

### 🧰 Supported Templates

| Template | Tech Stack       | TypeScript | Features                     |
| -------- | ---------------- | ---------- | ---------------------------- |
| React    | Vite + MUI       | ✅          | Theme, Redux, AuthContext    |
| Next.js  | App Router + MUI | ✅          | AuthGuard, Layouts, Sessions |
| Node.js  | Express (MVC)    | ✅          | DTOs, Middleware, Services   |

<!-- ### 📁 Next.js App Structure

Powered by the App Router (/app), the project uses layered layouts, contexts, and guards for scalable, secure architecture.

app/
├── layout.tsx              # Root layout (Redux, Theme, Providers)
├── auth/
│   ├── layout.tsx          # Layout for all /auth/* pages (e.g. login/register)
│   └── login/page.tsx
├── pages/
│   ├── layout.tsx          # Protected layout for authenticated routes
│   ├── dashboard/
│   │   └── page.tsx
│   ├── settings/
│   │   └── page.tsx
│   └── AuthGuard.tsx       # Protects /pages routes, checks token in session
      # Protects /pages routes, checks token in session -->


#### 🧰 Auth Flow

1. All tokens are stored securely in sessionStorage.

2. AuthContext syncs token state across the app.

3. AuthGuard wraps protected routes (/pages/*) and redirects to /auth/login if token is missing or invalid.

4. Root layout.tsx provides ThemeProvider, ReduxProvider, and AuthProvider globally.

### ⚙️ Backend Architecture

src/
├── controllers/
├── services/
├── models/
├── routes/
├── middleware/
│   └── auth.middleware.ts
├── validators/
├── dto/
├── utils/
└── server.ts

#### Key Features

1. MVC + Services pattern for clear separation of concerns

2. DTOs & Validation for request data

3. Authentication middleware for protecting routes

4. Global error handling with consistent responses

5. Configurable Express setup with scalable folder structure


### 🛣️ Roadmap

 ✅  React, Next.js, Node.js Templates

 ✅   TypeScript-first scaffolding

 ✅   MUI with theme config

 ✅  AuthContext + Redux integration

 ✅  Class-based API services

 ✅  MVC backend with DTO, validation, error handling

 ✅  Component & file generators

 ✅  Custom template overrides

 ✅  CLI plugins (e.g., Auth, Dashboard)

 ✅   Monorepo & microservice support

 ### 🐞 Troubleshooting
 #### Common Fixes

##### Upgrade CLI:
 ```bash
 npm install -g initrajs
 ```
 ##### Clear corrupted NPX cache:

 ```bash
 npx clear-npx-cache
 ```

  ### 👨‍💻 Contributing

  ```bash 
  git clone https://github.com/blessedrajp/initrajs.git
cd initrajs
npm install
npm run dev

```

### 📄 license
Licensed under the MIT License.

### 🙌 Acknowledgments
Built with ❤️ by Blessed Raj P
Crafted for developers who care about speed, structure, and scalability.
