# 🪟 Windows 12 Concept

[![Stars](https://img.shields.io/github/stars/windows12concept/windows12-concept?style=for-the-badge&color=0078D4)](https://github.com/windows12concept/windows12-concept/stargazers)
[![Forks](https://img.shields.io/github/forks/windows12concept/windows12-concept?style=for-the-badge&color=0078D4)](https://github.com/windows12concept/windows12-concept/network/members)
[![Issues](https://img.shields.io/github/issues/windows12concept/windows12-concept?style=for-the-badge&color=0078D4)](https://github.com/windows12concept/windows12-concept/issues)
[![License](https://img.shields.io/github/license/windows12concept/windows12-concept?style=for-the-badge&color=0078D4)](./LICENSE)
[![Vercel](https://img.shields.io/badge/deployed%20on-vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com)
[![Next.js](https://img.shields.io/badge/built%20with-next.js-000000?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/typescript-strict-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org)

**Windows 12 Concept** is a fully interactive, in-browser reimagining of what a modern Windows desktop could look like. It is not an operating system, an emulator, or a virtual machine — it is a meticulously crafted **web application** that recreates the look, feel, and interaction model of a desktop environment using nothing but HTML, CSS, and JavaScript running in your browser.

This project exists because desktop UI design is one of the most demanding disciplines in frontend engineering. Building a window manager, a taskbar that behaves correctly, snap layouts that feel physical, and a file explorer that responds instantly requires solving problems that most web apps never touch — z-index stacking, drag-and-drop physics, keyboard focus trapping, state persistence, and animation choreography, all at once.

Windows 12 Concept was built as a playground for exploring those problems in the open. It doubles as a portfolio-grade showcase of what's possible with React, Next.js, and modern browser APIs, and as a learning resource for developers who want to understand how desktop-class interfaces are architected on the web. Every window you drag, every menu you open, and every setting you toggle is powered by real, inspectable frontend code — no smoke, no mirrors, no backend required.

Whether you're here to explore the UI, read the source, fork it for your own experiments, or contribute a feature, welcome to the desktop.

---

## ⚠️ Disclaimer

**Windows 12 Concept is an unofficial, fan-made project created purely for educational and demonstrative purposes.**

- This project is **not affiliated with, endorsed by, sponsored by, or in any way officially connected to Microsoft Corporation**.
- "Windows" and any related names, logos, and visual identifiers are **trademarks of Microsoft Corporation**. All trademarks, service marks, and trade names referenced in this project belong to their respective owners.
- This project does not include, redistribute, or reverse-engineer any proprietary Microsoft source code, binaries, fonts, icons, or assets.
- Any visual resemblance to Windows is purely stylistic and interpretive, created independently using open-source tools and original or freely licensed assets.
- This software is provided for **learning, experimentation, and portfolio purposes only** and must not be used to imply official Microsoft involvement or endorsement.

If you are affiliated with Microsoft and have concerns about this project, please open an issue and it will be addressed promptly and in good faith.

---

## ✨ Features

### Interactive Desktop
A fully clickable, keyboard-navigable desktop surface complete with selectable icons, right-click context awareness, drag-to-select marquee selection, and a live wallpaper engine that supports static images, gradients, and animated backgrounds.

### Start Menu
A searchable, categorized application launcher with pinned apps, recently used items, a live search-as-you-type filter, and smooth spring-based open/close animations. Fully navigable via keyboard arrows and `Enter`.

### Taskbar
A persistent, auto-hiding-capable taskbar with running-app indicators, pinned shortcuts, a live system clock, a system tray with quick-access icons, and jump-list-style right-click menus for open windows.

### Window Manager
The core engine of the project. Handles window creation, focus stacking, minimize/maximize/restore states, resizing from any edge or corner, drag-repositioning with boundary constraints, and persistent z-index ordering across sessions.

### Snap Layouts
Hover over the maximize button (or press `Win + Z`) to reveal snap zone previews. Supports half-screen, quarter-screen, and thirds layouts with animated snap-preview overlays, closely mirroring the native Windows snapping experience.

### Virtual Desktops
Create, rename, switch between, and close multiple isolated desktop workspaces, each maintaining its own set of open windows and wallpaper state, with animated transitions between desktops.

### File Explorer
A simulated file system browser with a navigable folder tree, breadcrumb navigation, list/grid/detail view modes, sortable columns, and drag-and-drop file movement, all backed by a persistent virtual file system stored in IndexedDB.

### Recycle Bin
Deleted files move to a functional Recycle Bin app where they can be restored or permanently erased, complete with an empty/full icon state that updates dynamically.

### Context Menus
Right-click anywhere — desktop, taskbar, file explorer, window title bars — to reveal context-aware menus with nested submenus, icons, keyboard shortcut hints, and smooth cursor-anchored positioning.

### Widgets
A dedicated widgets panel featuring live weather, a calendar, quick notes, and system stats, all rendered as independently draggable, resizable widget cards.

### Notification Center
A slide-in panel that aggregates system and app notifications, supports dismiss-all and per-item dismissal, and persists notification history across sessions.

### Quick Settings
A compact flyout panel (accessible from the system tray) for toggling Wi-Fi, Bluetooth, airplane mode, brightness, volume, and theme — all simulated states with realistic toggle animations.

### Settings Application
A full multi-page settings app with sidebar navigation covering personalization, system, accounts, and about pages, mirroring the structure of a real OS settings experience.

### Calculator
A pixel-accurate standard calculator supporting basic arithmetic, keyboard input, memory functions, and a history panel, built as a fully self-contained app window.

### Notepad
A lightweight text editor with tabbed documents, autosave to LocalStorage, word count, find-and-replace, and font size adjustment.

### Paint
A canvas-based drawing application supporting brush, eraser, shapes, fill bucket, color picker, and PNG export, all rendered with the HTML5 Canvas API.

### Terminal
A simulated command-line interface supporting a custom set of navigational and utility commands (`help`, `ls`, `cd`, `clear`, `whoami`, `echo`, and more) with command history and tab-completion behavior.

### AI Assistant
An in-desktop conversational assistant panel that can answer questions about the OS concept, help you find apps, and walk you through features — a UI concept exploration of how an assistant might be woven into a desktop shell.

### Theme Engine
System-wide light and dark modes, accent color customization, and rounded-corner/transparency toggles, all applied instantly via CSS custom properties and persisted per user.

### Lock Screen
A dismissible lock screen with live clock, background art, and unlock animation that gates access to the desktop on load and after an idle timeout, mirroring a real OS boot sequence.

---

## 🛠️ Tech Stack

| Technology | Why It Was Chosen |
|---|---|
| **Next.js** | Provides file-based routing, optimized bundling, image optimization, and excellent static export support — ideal for shipping a fast, SEO-friendly single-page desktop experience. |
| **React** | The component model maps naturally onto desktop UI primitives (windows, menus, panels), enabling composable, reusable, and testable UI pieces. |
| **TypeScript** | Enforces type safety across complex state shapes (window state, file system nodes, settings), catching bugs at compile time in a codebase with many interdependent modules. |
| **Tailwind CSS** | Enables rapid, consistent styling with a constrained design system, avoiding CSS sprawl while making pixel-precise desktop UI achievable at speed. |
| **Framer Motion** | Powers the physics-based animations — window open/close, snap previews, menu transitions — that make the interface feel alive rather than static. |
| **Zustand** | A minimal, boilerplate-free state manager used for global concerns like open windows, focus order, theme, and virtual desktops, without the overhead of larger state libraries. |
| **shadcn/ui** | Supplies accessible, unstyled primitive components (dialogs, dropdowns, tooltips) that were customized to match the desktop aesthetic while retaining built-in accessibility behavior. |
| **IndexedDB** | Backs the virtual file system, storing folder structures and file contents client-side so the File Explorer and Recycle Bin persist realistically across sessions. |
| **LocalStorage** | Used for lightweight, synchronous persistence of user preferences — theme, pinned apps, taskbar layout — that need to be available immediately on load. |
| **Vercel** | Hosts the production deployment, offering zero-config CI/CD, edge caching, and instant preview deployments for every pull request. |

---

## 🏗️ Architecture

Windows 12 Concept is architected as a **single-page application shell** with a component tree that mirrors a real desktop environment's layered structure.

**Rendering model:** The app boots into a `DesktopShell` root component that renders, in stacking order, the wallpaper layer, desktop icon grid, the window layer (a dynamic list of mounted app windows), the taskbar, and any overlay layers (Start Menu, Notification Center, Quick Settings, Lock Screen). Each layer is isolated in its own stacking context to keep z-index management predictable.

**State management:** Global, cross-cutting state — open windows, window focus order, active virtual desktop, theme, and system settings — lives in a set of Zustand stores, each scoped to a single concern (`useWindowStore`, `useDesktopStore`, `useSettingsStore`, `useFileSystemStore`). This avoids a single monolithic store while keeping updates fast and colocated. Component-local state (form inputs, hover states, transient UI) stays in React's `useState`/`useReducer`, keeping the global stores lean.

**Routing:** Next.js's App Router handles top-level routing (landing/boot sequence versus the desktop route), but once inside the desktop, "navigation" between apps is handled entirely client-side by the window manager — opening an app spawns a window rather than triggering a page transition, preserving the illusion of a persistent OS session.

**Reusable components:** Every app window is built on a shared `WindowFrame` component that provides drag, resize, focus, minimize/maximize, and title bar behavior. Individual apps (Calculator, Notepad, Paint, etc.) are implemented as children rendered inside `WindowFrame`, meaning new apps can be added by building a content component and registering it in the app registry — the windowing behavior is free.

**Performance optimizations:** Heavy or rarely-used apps (Paint's canvas engine, the Terminal's command parser, the AI Assistant panel) are code-split with `next/dynamic` and only loaded when first opened. Window drag and resize operations use `transform`-based positioning rather than top/left mutations to stay on the GPU-accelerated compositing path, and Framer Motion animations are configured with `layout` and `will-change` hints to minimize layout thrashing.

**Data flow:** User interactions (opening an app, moving a file, changing a setting) dispatch actions into the relevant Zustand store. Stores update their in-memory state immediately for a responsive UI, and side effects (persisting to LocalStorage or IndexedDB) are handled asynchronously via store subscriptions, so persistence never blocks the interaction thread.

---

## 📁 Folder Structure

```
windows12-concept/
├── app/                        # Next.js App Router entry points
│   ├── layout.tsx              # Root layout, global providers, font loading
│   ├── page.tsx                # Boot sequence / entry route
│   └── desktop/
│       └── page.tsx            # Mounts the DesktopShell
│
├── components/
│   ├── desktop/                # Desktop surface, icon grid, wallpaper layer
│   ├── taskbar/                # Taskbar, system tray, start button
│   ├── start-menu/             # Start Menu UI and search logic
│   ├── window/                 # WindowFrame, resize handles, title bar
│   ├── snap-layouts/           # Snap zone overlays and preview logic
│   ├── context-menu/           # Reusable, positionable context menu
│   ├── widgets/                # Widget panel and individual widget cards
│   ├── notification-center/    # Notification list and toasts
│   ├── quick-settings/         # Quick settings flyout
│   ├── lock-screen/            # Lock screen and unlock animation
│   └── ui/                     # shadcn/ui-derived primitives (button, dialog, etc.)
│
├── apps/                       # Individual "OS apps" rendered inside windows
│   ├── file-explorer/
│   ├── recycle-bin/
│   ├── settings/
│   ├── calculator/
│   ├── notepad/
│   ├── paint/
│   ├── terminal/
│   └── ai-assistant/
│
├── stores/                     # Zustand global state stores
│   ├── useWindowStore.ts
│   ├── useDesktopStore.ts
│   ├── useSettingsStore.ts
│   └── useFileSystemStore.ts
│
├── lib/
│   ├── indexeddb.ts             # IndexedDB wrapper for the virtual file system
│   ├── storage.ts               # LocalStorage helpers with schema versioning
│   ├── app-registry.ts          # Maps app IDs to components, icons, metadata
│   └── utils.ts                 # Shared utility functions
│
├── hooks/                       # Custom React hooks (useDrag, useFocusTrap, etc.)
├── styles/                      # Tailwind config extensions, global CSS
├── public/                      # Static assets — icons, wallpapers, fonts
├── types/                       # Shared TypeScript type definitions
├── tests/                       # Unit and integration tests
├── tailwind.config.ts
├── next.config.js
├── tsconfig.json
├── package.json
└── README.md
```

---

## 📦 Installation

Ensure you have **Node.js 18.17 or later** and **npm 9 or later** installed.

```bash
# Clone the repository
git clone https://github.com/windows12concept/windows12-concept.git

# Move into the project directory
cd windows12-concept

# Install dependencies
npm install
```

---

## 🚀 Running Locally

Start the development server with hot reloading:

```bash
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000). The boot sequence will run automatically, and you'll land on the desktop within a few seconds.

---

## 🏭 Production Build

Build an optimized production bundle:

```bash
npm run build
```

Preview the production build locally before deploying:

```bash
npm run start
```

This serves the compiled output at [http://localhost:3000](http://localhost:3000) using Next.js's production server.

---

## ☁️ Deployment

Windows 12 Concept is designed for seamless deployment to **Vercel**:

1. Push your fork or clone to your own GitHub repository.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repository.
3. Vercel will auto-detect the Next.js framework — no configuration changes are required.
4. Click **Deploy**. Your live desktop will be available at a `*.vercel.app` URL within minutes.
5. Every subsequent push to your main branch triggers an automatic redeployment, and every pull request gets its own preview URL.

Alternatively, deploy via the CLI:

```bash
npm install -g vercel
vercel
```

---

## ⚡ Performance

- **Lazy loading:** Apps like Paint, Terminal, and the AI Assistant are dynamically imported with `next/dynamic`, so their code is only fetched when the user actually opens them.
- **Code splitting:** Next.js automatically splits routes and dynamic imports into separate chunks, keeping the initial JavaScript payload minimal.
- **Caching:** Static assets (icons, fonts, wallpapers) are served with long-lived cache headers via Vercel's edge network, and IndexedDB caches file system state locally to avoid redundant reads.
- **Image optimization:** All raster assets are served through `next/image`, which automatically generates responsive sizes, serves modern formats like WebP/AVIF, and lazy-loads off-screen images.
- **Animation efficiency:** Window dragging and resizing use CSS `transform` rather than layout-triggering properties, keeping interactions on the compositor thread for consistently smooth frame rates.
- **Memoization:** Expensive computations (file tree sorting, search filtering) are wrapped in `useMemo`/`useCallback` to avoid unnecessary recalculation on re-render.

---

## ♿ Accessibility

- All interactive elements — icons, buttons, menu items — are keyboard-focusable and operable via `Tab`, `Enter`, and arrow keys.
- Window focus is properly trapped and restored: opening a dialog moves focus into it, and closing it returns focus to the triggering element.
- Color contrast across both light and dark themes meets **WCAG 2.1 AA** contrast ratios.
- All icon-only buttons include descriptive `aria-label` attributes for screen reader users.
- Context menus and the Start Menu are fully navigable via arrow keys and dismissible via `Escape`.
- Motion-heavy animations respect the `prefers-reduced-motion` media query, falling back to instant transitions for users who have that preference enabled.
- Semantic HTML is used wherever possible (`<button>`, `<dialog>`, `<nav>`) rather than generic `<div>` click targets.

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|---|---|
| `Win` | Open / close the Start Menu |
| `Win + D` | Show desktop (minimize all windows) |
| `Win + E` | Open File Explorer |
| `Win + Z` | Show snap layout options for the focused window |
| `Win + Tab` | Open Virtual Desktops / Task View |
| `Alt + Tab` | Cycle between open windows |
| `Alt + F4` | Close the focused window |
| `Ctrl + Shift + Esc` | Open the Terminal |
| `Win + L` | Lock the screen |
| `Win + A` | Open Quick Settings |
| `Win + N` | Open Notification Center |
| `Esc` | Close open menu, dialog, or overlay |
| `F2` | Rename selected file/folder in File Explorer |
| `Delete` | Move selected file to Recycle Bin |
| `Ctrl + Z` / `Ctrl + Y` | Undo / Redo in Notepad and Paint |

---

## 🌐 Browser Support

| Browser | Supported Versions | Status |
|---|---|---|
| Google Chrome | Last 2 major versions | ✅ Fully supported |
| Microsoft Edge | Last 2 major versions | ✅ Fully supported |
| Mozilla Firefox | Last 2 major versions | ✅ Fully supported |
| Safari (macOS) | Last 2 major versions | ✅ Fully supported |
| Safari (iOS) | Last 2 major versions | ⚠️ Supported with reduced window-drag precision on touch |
| Opera | Latest | ✅ Fully supported |
| Internet Explorer | Any version | ❌ Not supported |

---

## 🔒 Security

Windows 12 Concept runs **entirely client-side** and does not operate a backend server or database for user data.

**Stored locally, on your device only:**
- Theme and personalization preferences (LocalStorage)
- Taskbar pins and Start Menu layout (LocalStorage)
- The virtual file system created in File Explorer, including file and folder contents (IndexedDB)
- Notification history (LocalStorage)
- Notepad document contents (LocalStorage, autosaved)

**Never collected, transmitted, or stored:**
- No account creation, login, or authentication data
- No analytics tied to personally identifiable information
- No file contents, documents, or user-generated data are ever sent to a remote server
- No cookies are used for tracking purposes

Because all persistence relies on browser storage APIs, clearing your browser's site data for this application will permanently erase your virtual file system and preferences — there is no cloud backup, by design.

---

## ❓ Frequently Asked Questions

<details>
<summary><strong>Is this an actual operating system?</strong></summary>
<br>
No. Windows 12 Concept is a web application that runs inside your browser. It simulates the visual and interactive experience of a desktop OS but does not interact with your computer's actual file system, processes, or hardware.
</details>

<details>
<summary><strong>Is this affiliated with or endorsed by Microsoft?</strong></summary>
<br>
No. This is an independent, fan-made project built for educational purposes. It is not affiliated with, sponsored by, or endorsed by Microsoft Corporation in any way.
</details>

<details>
<summary><strong>Will my files and settings be saved if I close the tab?</strong></summary>
<br>
Yes. Files created in File Explorer are stored in IndexedDB, and preferences are stored in LocalStorage, both of which persist across browser sessions on the same device and browser.
</details>

<details>
<summary><strong>Can I use this on my phone?</strong></summary>
<br>
The experience is optimized for desktop screen sizes and mouse/keyboard interaction. It is accessible on mobile browsers, but window dragging, resizing, and multi-window management are best experienced on a larger screen.
</details>

<details>
<summary><strong>Does this collect any of my personal data?</strong></summary>
<br>
No personally identifiable data is collected or transmitted. All application data is stored locally in your browser and never leaves your device.
</details>

<details>
<summary><strong>Can I add my own custom wallpapers?</strong></summary>
<br>
Yes. The Settings application includes a personalization section where you can upload and set custom wallpaper images, which are stored locally via IndexedDB.
</details>

<details>
<summary><strong>Why does the Terminal not support real system commands?</strong></summary>
<br>
The Terminal is a simulated command-line interface intended to demonstrate UI/UX patterns for command-based interaction. It does not have access to your actual operating system and cannot execute real shell commands.
</details>

<details>
<summary><strong>How is the AI Assistant powered?</strong></summary>
<br>
The AI Assistant is a UI concept exploring how conversational interfaces can be integrated into a desktop shell. Its response behavior is implemented within the app itself as part of the frontend experience.
</details>

<details>
<summary><strong>Can I install this as a PWA?</strong></summary>
<br>
The project's manifest and service worker configuration support installable, app-like behavior in browsers that support Progressive Web Apps, allowing it to be added to your home screen or app list.
</details>

<details>
<summary><strong>Why is my Recycle Bin not emptying files permanently?</strong></summary>
<br>
Restoring or permanently deleting a file in the Recycle Bin updates the entry in IndexedDB. If a file appears to persist, ensure the delete action completed — check the browser console for any storage errors.
</details>

<details>
<summary><strong>Can I contribute a new app to the desktop?</strong></summary>
<br>
Yes. New apps can be added by creating a component in the <code>apps/</code> directory and registering it in <code>lib/app-registry.ts</code>. See the Contributing section below for the full workflow.
</details>

<details>
<summary><strong>Does this work offline?</strong></summary>
<br>
Once loaded, most functionality works offline since data is stored locally and no backend is required for core features. A network connection is only needed for the initial page load and any widget features that fetch live data, such as weather.
</details>

<details>
<summary><strong>Why do some animations feel disabled on my system?</strong></summary>
<br>
If your operating system has "reduce motion" enabled, the app respects the <code>prefers-reduced-motion</code> media query and simplifies or removes non-essential animations accordingly.
</details>

<details>
<summary><strong>Is there a light mode?</strong></summary>
<br>
Yes. The Theme Engine supports both light and dark modes, along with accent color customization, accessible from the Settings app or Quick Settings panel.
</details>

<details>
<summary><strong>Can I reset the app to its default state?</strong></summary>
<br>
Yes. Clearing your browser's LocalStorage and IndexedDB data for the site will reset all preferences, files, and pinned apps to their defaults on next load.
</details>

<details>
<summary><strong>Why does dragging a window feel laggy on older devices?</strong></summary>
<br>
Window dragging relies on GPU-accelerated CSS transforms for smooth performance, but very old or low-powered devices with limited GPU acceleration may experience reduced frame rates during complex animations.
</details>

---

## 🤝 Contributing

Contributions are what make open-source projects thrive, and Windows 12 Concept welcomes them enthusiastically.

1. **Fork** the repository and create your branch from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   ```
2. **Set up the project locally** following the Installation and Running Locally sections above.
3. **Make your changes**, keeping commits focused and descriptive.
4. **Test your changes** thoroughly across at least Chrome and Firefox before submitting.
5. **Run the linter** to ensure your code matches project conventions:
   ```bash
   npm run lint
   ```
6. **Commit using clear, conventional messages**, for example:
   ```
   feat: add multi-select drag support to file explorer
   fix: correct snap layout preview offset on ultrawide screens
   ```
7. **Push your branch** and open a **Pull Request** against `main`, describing what you changed and why.
8. Be responsive to review feedback — most PRs are reviewed within a few days.

**Good first contributions** include adding new Start Menu icons, improving keyboard navigation, writing tests, fixing visual inconsistencies between themes, or building an entirely new app for the desktop. Issues labeled `good first issue` and `help wanted` are great starting points.

Please also read and follow the project's Code of Conduct: be respectful, constructive, and collaborative in all discussions and reviews.

---

## 🎨 Code Style

- **Formatting** is enforced via Prettier with a shared configuration — run `npm run format` before committing.
- **Linting** uses ESLint with the Next.js and TypeScript rule sets; run `npm run lint` to check for issues.
- **TypeScript** is used in strict mode throughout the codebase — avoid `any` and prefer explicit, well-named types placed in the `types/` directory when shared across modules.
- **Components** are named in `PascalCase`, hooks in `camelCase` prefixed with `use`, and files match their default export's name.
- **Styling** is done exclusively through Tailwind utility classes; avoid inline styles and one-off CSS files except for truly global rules in `styles/`.
- **State updates** to Zustand stores should go through defined store actions rather than mutating state directly from components.
- **Commits** follow the Conventional Commits format (`feat:`, `fix:`, `chore:`, `docs:`, `refactor:`) to keep history readable and enable automated changelog generation.

---

## 📄 License

This project is licensed under the **MIT License**.

The MIT License is a permissive open-source license that allows anyone to freely **use, copy, modify, merge, publish, distribute, sublicense, and sell copies** of this software, provided that the original copyright notice and license text are included in all copies or substantial portions of the software. The software is provided "as is," without warranty of any kind.

See the [LICENSE](./LICENSE) file for the full license text.

---

## 🙏 Credits

This project stands on the shoulders of extraordinary open-source communities:

- **[React](https://react.dev)** — for redefining how developers think about building interfaces.
- **[Next.js](https://nextjs.org)** — for making production-grade React applications approachable and fast.
- **[Tailwind CSS](https://tailwindcss.com)** — for a utility-first styling workflow that scales beautifully with complex UIs.
- **[TypeScript](https://www.typescriptlang.org)** — for bringing safety and confidence to a large, evolving codebase.
- **[Framer Motion](https://www.framer.com/motion)** — for making complex, physics-based animation accessible to React developers.
- **[Zustand](https://github.com/pmndrs/zustand)** — for proving that global state management doesn't need to be complicated.
- **[shadcn/ui](https://ui.shadcn.com)** — for a component foundation that's both beautiful and genuinely accessible.
- **[Vercel](https://vercel.com)** — for hosting infrastructure that makes shipping frontend projects effortless.

Thank you to every contributor, issue reporter, and curious visitor who has helped shape this project.

---

## 💬 Final Note

Windows 12 Concept was built to prove that the browser is a legitimate canvas for ambitious, desktop-class software — and to give developers a real, hands-on example of how far frontend engineering can go. If you're reading this, you're invited to dig into the code, break things, fix them better, and make this desktop your own. Fork it, experiment wildly, ship a feature nobody asked for, and have fun doing it. The web is a big place to build — go make something amazing. 🚀
