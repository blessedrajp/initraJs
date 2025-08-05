# ⚡ InitraJS

> The ultimate fullstack scaffolding CLI. Zero config, maximum productivity. Built for speed, scalability, and modern dev workflows.

[![NPM Version](https://img.shields.io/npm/v/initrajs?color=blue)](https://www.npmjs.com/package/initrajs)
[![Downloads](https://img.shields.io/npm/dw/initrajs.svg)](https://www.npmjs.com/package/initrajs)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Made by Blessed Raj P](https://img.shields.io/badge/made%20by-blessedrajp-blueviolet)](https://github.com/blessedrajp)

**🌐 [Try it Live](https://initrajs.vercel.app) | 📖 [Documentation](https://initrajs.vercel.app/docs) | 🚀 [Get Started Now](#-installation--quick-start)**

---

## 🎯 What Makes InitraJS Special?

**InitraJS** isn't just another CLI tool — it's your development superpower. While other tools give you basic scaffolding, InitraJS delivers production-ready applications with enterprise-grade architecture, comprehensive testing, and modern best practices built in from day one.

### ⚡ **Lightning Fast Setup**
```bash
# From zero to running app in under 60 seconds
npm install -g initrajs
npx initrajs init my-app
cd my-app && npm start
```

### 🏗️ **Enterprise-Grade Architecture**
- **Clean Architecture**: MVC + Service Layer pattern with dependency injection
- **Type Safety**: Full TypeScript support with intelligent type generation
- **Security First**: JWT authentication, CORS, rate limiting, and security headers
- **Testing Ready**: Jest, React Testing Library, and E2E tests configured
- **Production Optimized**: Bundle splitting, lazy loading, and performance monitoring

---

## 📖 Introduction

**InitraJS** is a powerful zero-config CLI that scaffolds production-ready fullstack applications and generates components with lightning speed. Featuring cutting-edge architecture, comprehensive code generation, and battle-tested best practices — get from idea to deployment in minutes, not hours.

**🎯 Perfect for:**
- 🚀 Startups needing rapid prototyping
- 🏢 Enterprise teams requiring consistent architecture
- 👨‍💻 Solo developers wanting best practices built-in
- 🎓 Learning modern fullstack development patterns

---

## 📚 Table of Contents

- [🚀 Features](#-features)
- [🎯 What Makes InitraJS Special](#-what-makes-initrajs-special)
- [📦 Installation & Quick Start](#-installation--quick-start)
- [⚡ Quick Demo](#-quick-demo)
- [🎯 Code Generation](#-code-generation)
- [🧰 Supported Templates](#-supported-templates)
- [📁 Project Structure](#-project-structure)
- [⚙️ Backend Architecture](#-backend-architecture)
- [🛠️ Advanced Usage](#-advanced-usage)
- [🌟 Success Stories](#-success-stories)
- [🛣️ Roadmap](#-roadmap)
- [🐞 Troubleshooting](#-troubleshooting)
- [👨‍💻 Contributing](#-contributing)
- [📄 License](#-license)

---

## 🚀 Features

### 🎯 **Intelligent Code Generation**
- 🧩 **Smart Components**: Generate React components with TypeScript, CSS, tests, and Storybook stories
- 📄 **Page Generation**: Create React pages or Next.js app router pages with full folder structure
- 🔧 **Backend Scaffolding**: Generate complete APIs with controllers, services, models, DTOs, and routes
- 🎨 **Style Integration**: Automatic CSS/SCSS generation with BEM methodology
- 🧪 **Test Coverage**: Jest + React Testing Library setup out of the box

### 🧩 **Frontend Excellence (React / Next.js)**
- ⚙️ **Full TypeScript Support** with intelligent type generation
- 🎨 **Integrated MUI v5** with global theme customization
- 🧠 **Configured Redux Toolkit** for scalable state management
- 🔐 **AuthContext + AuthGuard** for protected routing
- 🧾 **Class-based API Services** for clean, DRY code
- 📂 **Modular App Directory Structure** using Next.js App Router
- 💾 **Session-based token handling**, synced with AuthContext
- 📱 **Responsive Design** with mobile-first approach

### 🔧 **Backend Powerhouse (Node.js)**
- 🏗️ **Structured MVC + Service Layer** architecture
- 🔐 **JWT authentication** with middleware protection
- ✅ **DTOs and Validators** using `express-validator`
- 🌐 **Modular route handling** with auto-registration
- 🔥 **Global error middleware** with consistent responses
- 📦 **TypeScript-first** with modern conventions
- 🚀 **Auto-generated CRUD operations**

---

## 📦 Installation & Quick Start

### 🌍 Global Installation (Recommended)
```bash 
npm install -g initrajs
```

### ⚡ Quick Demo
```bash
# Create a full-stack app in seconds
npx initrajs init my-awesome-app
cd my-awesome-app

# Generate a component with everything
initrajs c ProductCard --css --test --story --props "title,price,image"

# Create a protected dashboard page
initrajs page Dashboard --next --css --test

# Generate a complete API endpoint
initrajs api User --ts

# Start developing
npm run dev
```

### 🚀 From Idea to Production
```bash
# 1. Initialize project (30 seconds)
npx initrajs init ecommerce-app --template nextjs

# 2. Generate components (2 minutes)
initrajs c ProductGrid --css --test --props "products,loading"
initrajs c ShoppingCart --css --test --props "items,onUpdate"

# 3. Create pages (1 minute)
initrajs page Products --next --css --test
initrajs page Checkout --next --css --test

# 4. Build API (2 minutes)
initrajs api Product --ts
initrajs api Order --ts

# 5. Deploy (1 minute)
npm run build && npm run deploy
```

**🎉 Result: Production-ready e-commerce app in under 10 minutes!**

---

## 🎯 Code Generation

### 🧩 **Component Generation**

```bash
# Basic component (defaults to TypeScript)
initrajs c Header

# Component with all the bells and whistles
initrajs c ProductCard --css --test --story --props "title,price,image"

# Layout component with TypeScript
initrajs c AppLayout --layout --ts --css

# Server-side component for Next.js
initrajs c UserProfile --server --css --test
```

**Generated Structure:**
```
src/components/ProductCard/
├── ProductCard.tsx      # Main component with TypeScript
├── ProductCard.scss     # BEM-style CSS (if --css)
├── ProductCard.test.tsx # Jest tests (if --test)
├── ProductCard.stories.tsx # Storybook story (if --story)
└── index.ts            # Barrel export
```

### 📄 **Page Generation**

```bash
# React page for standard React apps
initrajs page Home --react --css --test

# Next.js page with app router structure
initrajs page Dashboard --next --ts --css --test

# Custom path for organization
initrajs page UserProfile --next --path "app/user" --css
```

**Next.js Page Structure:**
```
app/dashboard/
├── page.tsx           # Main page component
├── loading.tsx        # Loading UI
├── error.tsx          # Error boundary
├── dashboard.scss     # Page styles (if --css)
└── page.test.tsx      # Page tests (if --test)
```

### 🔧 **Backend Generation**

```bash
# Complete API with all files
initrajs api Product --ts

# Individual backend components
initrajs route User --ts
initrajs controller Order --ts
initrajs service PaymentService --ts
initrajs model ProductModel --ts
initrajs middleware AuthMiddleware --jwt --ts
```

---

## 🧰 Supported Templates

| Template | Tech Stack | TypeScript | Features |
|----------|------------|------------|----------|
| **React** | Vite + MUI + Redux | ✅ | Theme, State Management, AuthContext |
| **Next.js** | App Router + MUI + Redux | ✅ | AuthGuard, Layouts, Sessions, SEO |
| **Node.js** | Express MVC + TypeScript | ✅ | DTOs, Middleware, Services, JWT |

### 🎨 **Template Features**

#### **React Template**
- ⚡ **Vite** for blazing fast development
- 🎨 **Material-UI v5** with custom theming
- 🗃️ **Redux Toolkit** with configured store
- 🔐 **Authentication** context and guards
- 📱 **Responsive** design system

#### **Next.js Template**
- 🚀 **App Router** for modern routing
- 🛡️ **Middleware-based** authentication
- 📊 **SEO optimized** with metadata API
- 🎯 **Server Components** support
- 📦 **Bundle optimization**

#### **Node.js Template**
- 🏗️ **Clean Architecture** with layers
- 🔒 **Security** middlewares included
- 📝 **API Documentation** ready
- 🧪 **Testing** setup with Jest
- 🐳 **Docker** configuration

---

## 📁 Project Structure

### **Next.js App Structure**
```
app/
├── layout.tsx              # Root layout (Providers, Theme)
├── globals.css             # Global styles
├── auth/
│   ├── layout.tsx          # Auth pages layout
│   ├── login/page.tsx      # Login page
│   └── register/page.tsx   # Register page
├── (dashboard)/            # Route groups
│   ├── layout.tsx          # Protected layout with AuthGuard
│   ├── dashboard/page.tsx  # Dashboard page
│   ├── settings/page.tsx   # Settings page
│   └── profile/page.tsx    # Profile page
├── api/                    # API routes
├── components/             # Reusable components
└── lib/                    # Utilities and configurations
```

### **Backend Structure**
```
src/
├── controllers/            # Request handlers
├── services/              # Business logic
├── models/               # Data models
├── routes/               # Route definitions
├── middleware/           # Custom middleware
│   ├── auth.middleware.ts
│   ├── error.middleware.ts
│   └── validation.middleware.ts
├── dto/                  # Data Transfer Objects
├── validators/           # Input validation
├── utils/                # Helper functions
├── types/                # TypeScript types
└── server.ts             # Application entry point
```

---

## ⚙️ Backend Architecture

### **🏗️ MVC + Service Layer Pattern**

```typescript
// Controller Layer
export class UserController {
  async createUser(req: Request, res: Response) {
    const result = await this.userService.create(req.body);
    res.json(result);
  }
}

// Service Layer
export class UserService {
  async create(userData: CreateUserDTO): Promise<User> {
    // Business logic here
    return this.userModel.create(userData);
  }
}

// Model Layer
export class UserModel {
  async create(data: CreateUserDTO): Promise<User> {
    // Database operations
  }
}
```

### **🔐 Authentication Flow**

1. **Token Storage**: Secure sessionStorage implementation
2. **Context Sync**: AuthContext manages global auth state
3. **Route Protection**: AuthGuard automatically protects routes
4. **Middleware**: JWT validation on backend routes
5. **Auto-refresh**: Token refresh handling

---

## 🛠️ Advanced Usage

### **🎛️ CLI Options**

| Option | Description | Usage |
|--------|-------------|-------|
| `--ts` | Generate TypeScript files | `initrajs c Button --ts` |
| `--js` | Generate JavaScript files | `initrajs c Button --js` |
| `--css` | Include CSS/SCSS files | `initrajs c Button --css` |
| `--test` | Generate test files | `initrajs c Button --test` |
| `--story` | Generate Storybook stories | `initrajs c Button --story` |
| `--path` | Custom file path | `initrajs c Button --path "src/ui"` |
| `--props` | Component props | `initrajs c Button --props "text,onClick"` |
| `--server` | Server-side component | `initrajs c Button --server` |
| `--client` | Client-side component | `initrajs c Button --client` |
| `--layout` | Layout component | `initrajs c Header --layout` |
| `--next` | Next.js page structure | `initrajs page Home --next` |
| `--react` | Standard React page | `initrajs page Home --react` |

### **🎯 Smart Defaults**

- **TypeScript First**: Defaults to `.tsx` unless `--js` specified
- **Modern Patterns**: Uses latest React patterns and hooks
- **Best Practices**: Follows industry standards for file organization
- **Performance**: Optimized bundle splitting and lazy loading
- **Accessibility**: WCAG compliant components

### **🔧 Customization**

```bash
# Custom component with all options
initrajs c DataTable \
  --ts \
  --css \
  --test \
  --story \
  --props "data,columns,onSort,loading" \
  --path "src/components/tables"

# Next.js page with custom route
initrajs page UserDashboard \
  --next \
  --css \
  --test \
  --path "app/(dashboard)/users"
```

<!-- ---

## 🌟 Success Stories

> *"InitraJS cut our project setup time from 2 weeks to 2 hours. The generated code follows all our enterprise standards!"*  
> **— Sarah Chen, Lead Developer at TechCorp**

> *"As a solo developer, InitraJS gives me the structure of a full development team. It's like having senior developers built into my CLI."*  
> **— Mike Rodriguez, Freelance Developer**

> *"We've used InitraJS for 5 client projects. Each time, we deliver faster without sacrificing quality."*  
> **— DevStudio Agency**

--- -->

## 🛣️ Roadmap

### ✅ **Completed**
- ✅ React, Next.js, Node.js Templates
- ✅ TypeScript-first scaffolding
- ✅ MUI with theme configuration
- ✅ AuthContext + Redux integration
- ✅ Class-based API services
- ✅ MVC backend with DTO, validation, error handling
- ✅ Component & page generators
- ✅ CSS/SCSS generation with BEM
- ✅ Test file generation (Jest + RTL)
- ✅ Storybook story generation

### 🚧 **In Progress**
- 🚧 Database integration templates (Prisma, MongoDB)
- 🚧 Docker containerization
- 🚧 GitHub Actions CI/CD templates
- 🚧 Interactive CLI with project wizard

### 📋 **Planned**
- 📋 Custom template overrides
- 📋 CLI plugins ecosystem
- 📋 Monorepo & microservice support
- 📋 GraphQL API generation
- 📋 E2E testing setup (Playwright)
- 📋 PWA configuration
- 📋 Mobile app templates (React Native)
- 📋 VS Code extension

---

## 🐞 Troubleshooting

### **Common Issues & Fixes**

#### **🔄 Upgrade CLI**
```bash
npm install -g initrajs@latest
```

#### **🧹 Clear NPX Cache**
```bash
npx clear-npx-cache
npm cache clean --force
```

#### **📦 Node Version**
Ensure you're using Node.js 16+ for optimal compatibility.

#### **🔧 Permission Issues**
```bash
# On macOS/Linux
sudo npm install -g initrajs

# On Windows (Run as Administrator)
npm install -g initrajs
```

#### **🚀 Development Mode**
```bash
git clone https://github.com/blessedrajp/initrajs.git
cd initrajs
npm install
npm run dev
npm link  # Use local version
```

---

## 👨‍💻 Contributing

We welcome contributions! Here's how to get started:

```bash
# Fork and clone the repository
git clone https://github.com/blessedrajp/initrajs.git
cd initrajs

# Install dependencies
npm install

# Start development mode
npm run dev

# Run tests
npm test

# Build the project
npm run build
```

### **🎯 Contribution Guidelines**

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### **🐛 Bug Reports**

Please use our [issue template](https://github.com/blessedrajp/initrajs/issues/new) when reporting bugs.

---

## 📄 License

Licensed under the [MIT License](LICENSE).

---

## 🙌 Acknowledgments

**Built with ❤️ by [Blessed Raj P](https://github.com/blessedrajp)**

*Crafted for developers who value speed, structure, and scalability.*

### **🌟 Special Thanks**

- The React and Next.js communities
- Material-UI team for excellent components
- Redux Toolkit for state management excellence
- All contributors and early adopters

---

## 🔗 Links

- 🌐 **[Official Website](https://initrajs.vercel.app)**
- 📖 **[Documentation](https://initrajs.vercel.app/docs)**
- 🚀 **[Interactive Demo](https://initrajs.vercel.app/playground)**
- 📦 **[NPM Package](https://www.npmjs.com/package/initrajs)**
- 🐛 **[Report Issues](https://github.com/blessedrajp/initrajs/issues)**
- 💬 **[Discussions](https://github.com/blessedrajp/initrajs/discussions)**
- 🐦 **[Twitter Updates](https://twitter.com/blessedrajp)**

---

<div align="center">

**⚡ InitraJS - From Zero to Production in Minutes ⚡**

*Star ⭐ this repo if InitraJS helps speed up your development!*

[![GitHub stars](https://img.shields.io/github/stars/blessedrajp/initrajs?style=social)](https://github.com/blessedrajp/initrajs/stargazers)

</div>