# 🌌 AR DesignSphere — Space. Reimagined.

[![Vite](https://img.shields.io/badge/Vite-8.3.0-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=flat&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Status](https://img.shields.io/badge/Build-Passing-brightgreen.svg)]()

> **AR DesignSphere** is an AI-powered Augmented Reality (AR) interior design and space visualization web application. It bridges the gap between homeowners and professional interior designers through immersive 3D room planning, interactive furniture customization, real-time spatial analytics, and live collaboration.

---

## 🌟 Key Features

### 1. 🛋️ Interactive 3D Room Editor & AR Visualizer
- **Real-Time AR & 3D Canvas:** Place, move, scale, and rotate furniture in real-time on custom floor plans.
- **Smart Catalog:** Curated selection of contemporary furniture across categories (Sofas, Tables, Chairs, Lighting, Decor, Storage).
- **Interactive Customizer:** Customize upholstery fabrics, timber finishes, dimensions, and real-time color swatches.
- **Budget Tracking:** Dynamic, automated budget estimation and cost breakdown in Indian Rupees (INR ₹).

### 2. 🎨 Dedicated Interior Designer Portal
- **Project Command Center:** Manage multiple client projects, milestone deliverables, budget allocations, and status tracking (Draft, In Review, Approved).
- **3D CAD & Render Studio:** Advanced lighting temperature controls, material raytracing simulations, camera presets, and rendering pipelines.
- **Material & Texture Library:** High-definition texture swatches (Italian Marble, Bouclé, Walnut, Brushed Brass) with spec sheets and durability ratings.
- **Designer Profile & Portfolio:** Public-ready portfolio showcase, verified client ratings, and lead inquiry manager.

### 3. 🤖 AI "Design Insights" Engine
- **Spatial Optimization:** Intelligent layout recommendations for room ergonomics, walking clearance, and focal balance.
- **Color Harmony & Lighting:** AI-generated color palettes harmonized with natural sunlight vectors and ambient light.
- **Furniture Matchmaker:** Suggests matching decor and accent pieces based on selected design styles (Minimalist, Japandi, Scandinavian, Modern Luxury).

### 4. 🔄 Real-Time Collaboration & Comparison
- **Split-Screen Compare:** Interactive slider to compare baseline "Before" room photos with the proposed "After" 3D/AR design.
- **Multiplayer Collaboration:** Live team presence, pin annotations on 3D coordinates, and client approval workflows.

### 5. 🌐 Multilingual & Inclusive Accessibility
- **Full Tri-lingual Localization:** Instant language switching across the entire UI:
  - 🇬🇧 **English**
  - 🇮🇳 **हिंदी (Hindi)**
  - 🇮🇳 **मराठी (Marathi)**
- **Accessibility Engine:**
  - High-contrast visual modes
  - Dynamic typography scaling (Normal, Large, Extra Large)
  - Color filter adaptations (Protanopia, Deuteranopia, Tritanopia)
  - Reduced motion settings for vestibular comfort

---

## 🛠️ Technology Stack

| Layer | Technology | Description |
| :--- | :--- | :--- |
| **Framework** | [React 19](https://react.dev/) | Component architecture with concurrent rendering |
| **Language** | [TypeScript](https://www.typescriptlang.org/) | Strict type safety and robust developer ergonomics |
| **Bundler / Dev Server** | [Vite 8](https://vitejs.dev/) | Ultra-fast Hot Module Replacement (HMR) & ESBuild bundling |
| **Routing** | [React Router v7](https://reactrouter.com/) | Client-side routing with role-based navigation guards |
| **Icons** | [Lucide React](https://lucide.dev/) | Modern, clean vector icon system |
| **Styling** | Modern CSS3 & CSS Variables | Glassmorphism, HSL color tokens, dark mode, responsive layouts |
| **Linter** | [Oxlint](https://oxc.rs/) | High-performance Rust-based JavaScript/TypeScript linter |

---

## 📁 Project Structure

```text
AR-DesignSphere/
├── public/
│   ├── favicon.svg               # Application icon
│   └── icons.svg                 # SVG sprite sheet
├── src/
│   ├── assets/                   # Static images, hero banners, and vector assets
│   ├── components/               # Reusable UI components
│   │   ├── ColorSwatches.tsx     # Color selection palette component
│   │   ├── FurnitureVisual.tsx   # Visual representation for furniture items
│   │   ├── LanguageSelector.tsx  # Language switcher dropdown
│   │   └── Layout.tsx            # Global navigation, sidebar, and role switcher
│   ├── context/
│   │   └── AppContext.tsx        # Global state (User Role, Language, Projects, Cart)
│   ├── data/
│   │   ├── catalog.ts            # Furniture catalog, pricing, dimensions, and materials
│   │   └── translations.ts       # Multilingual dictionary (EN, HI, MR)
│   ├── pages/
│   │   ├── Landing.tsx           # Hero page with feature highlights & call to action
│   │   ├── Login.tsx             # Role selection & sign-in page
│   │   ├── Dashboard.tsx         # Homeowner project overview & quick actions
│   │   ├── Editor.tsx            # 3D/AR room editor canvas & furniture inspector
│   │   ├── DesignerProjects.tsx  # Designer project management & approvals
│   │   ├── DesignerStudio.tsx    # Designer CAD & 3D render pipeline
│   │   ├── DesignerLibrary.tsx   # Material, texture & finish library
│   │   ├── DesignerProfile.tsx   # Designer bio, portfolio & performance metrics
│   │   ├── AIAssistant.tsx       # AI Design Insights & recommendation engine
│   │   ├── Compare.tsx           # Before & After split slider comparison
│   │   ├── Collaboration.tsx     # Real-time team presence & annotation hub
│   │   ├── Accessibility.tsx     # Visual contrast, text scaling & color filters
│   │   └── ARPreview.tsx         # Immersive AR camera projection viewer
│   ├── App.tsx                   # Main route configuration
│   ├── index.css                 # Core design system tokens & global styling
│   └── main.tsx                  # Application entry point
├── index.html                    # Root HTML document
├── package.json                  # Dependencies and scripts
├── tsconfig.json                 # TypeScript compiler configuration
└── vite.config.ts                # Vite build and plugin configuration
```

---

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js**: `v18.0.0` or higher
- **npm**: `v9.0.0` or higher (or `pnpm` / `yarn`)
- **Git**: Installed and configured

### 1. Clone the Repository
```bash
git clone https://github.com/Handdyy11/AR-DesignSphere.git
cd AR-DesignSphere
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173`.

### 4. Build for Production
```bash
npm run build
```
The optimized production bundle will be generated in the `dist/` directory.

### 5. Preview Production Build
```bash
npm run preview
```

---

## 👥 User Roles & Workflows

### 🏠 Homeowner Workflow
1. **Explore & Ideate:** Browse the furniture catalog, filter by room type, and visualize furniture styles.
2. **Design Room:** Launch the 3D Room Editor to position furniture, customize materials, and check dimensions.
3. **Compare & Review:** Compare the new layout against original room photos using the interactive slider.
4. **Collaborate:** Share drafts with family members or submit designs to certified interior designers.

### 📐 Interior Designer Workflow
1. **Project Management:** Track ongoing client briefs, milestone budgets, and design approval requests.
2. **Studio & Rendering:** Fine-tune ambient lighting, adjust raytracing presets, and render photorealistic scenes.
3. **Material Sourcing:** Select vetted finishes and fabrics from the integrated Material Library.
4. **Client Handoff:** Export comprehensive bills of quantities (BOQ) and high-res AR presentations.

---

## 🌍 Multilingual Setup

The app comes out of the box with comprehensive translations in [translations.ts](file:///c:/Users/harsh/Downloads/UIUX/UIUX/src/data/translations.ts):

```typescript
import { useApp } from './context/AppContext';

function MyComponent() {
  const { t, language, setLanguage } = useApp();
  
  return (
    <div>
      <h1>{t.appName}</h1>
      <p>{t.appTagline}</p>
    </div>
  );
}
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork** the repository
2. **Create** your feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m "feat: add AmazingFeature"`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">
  <sub>Built with ❤️ by the AR DesignSphere Team</sub>
</div>
