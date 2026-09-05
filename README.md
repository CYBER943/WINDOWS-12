# 🪟 Windows 12 Concept

### A futuristic Windows-inspired desktop environment running entirely in the browser.

<div align="center">

[![HTML5](https://img.shields.io/badge/HTML5-E34C26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com)

**[🔗 Live Demo](https://windows-12-gilt.vercel.app/)** • **[📧 Developer: Sutantu Dutta](https://github.com/Cyber943)**

</div>

---

## 📝 Project Description

**Windows 12 Concept** is an independent, unofficial fan-made web prototype that reimagines a futuristic version of the Windows operating system. Built entirely with vanilla HTML, CSS, and JavaScript, this project explores modern desktop UI/UX patterns, animations, and interactive experiences within a browser environment.

This is a **creative proof-of-concept** that demonstrates the possibilities of browser-based desktop simulations, with a focus on:

- **Interactive Desktop Environment** — A fully functional browser-based OS simulation
- **Modern UI Design** — Fluent Design principles with glassmorphism and smooth animations
- **Vanilla Web Technologies** — No frameworks, no build tools, pure web standards
- **Educational & Experimental** — Explore desktop UX patterns and creative web development

> **This is not affiliated with, sponsored by, or endorsed by Microsoft Corporation.**

---

## ✨ Features

### 🖥️ Desktop Environment

- **Desktop Canvas** — Clean desktop interface with customizable background
- **Desktop Icons** — Draggable application shortcuts with labels
- **Context Menu** — Right-click menu for desktop actions
- **Wallpaper System** — Multiple built-in wallpapers with dynamic switching
- **Dynamic Theming** — Multiple color themes and accent colors
- **Taskbar** — Application launcher and quick access panel at the bottom
- **System Tray** — Clock, volume, network, and system indicators

### 🪟 Window Management

- **Draggable Windows** — Move windows freely across the desktop
- **Resizable Windows** — Adjust window dimensions from any edge
- **Minimize/Maximize/Close** — Standard window controls
- **Window Focus** — Click-to-focus with active window highlighting
- **Window Snapping** — Snap windows to screen edges and corners
- **Snap Layouts** — Pre-defined window arrangements
- **Taskbar Integration** — Switch between open windows via taskbar

### 🚀 Built-in Applications

- **File Explorer** — Browse simulated filesystem with folder navigation
- **Terminal** — Command-line interface with simulated commands
- **Calculator** — Functional calculator with basic operations
- **Notepad** — Text editor with file save/load capabilities
- **Settings** — Personalization and system configuration panel
- **Paint** — Drawing application with basic tools and canvas
- **Calendar** — Monthly calendar with date selection
- **Clock** — World clock with time display
- **Task Manager** — System process and performance monitoring interface
- **Recycle Bin** — File deletion and recovery center
- **Microsoft Edge (Simulated)** — Browser simulation
- **Store** — Application marketplace simulation
- **AI Assistant** — Interactive AI chat interface

### 🎨 Personalization

- **Theme Switching** — Light, dark, and custom color themes
- **Accent Colors** — Customizable primary color throughout the interface
- **Wallpaper Selection** — Choose from multiple wallpaper presets
- **Transparency Levels** — Adjust window and UI transparency
- **Taskbar Customization** — Pin/unpin applications and adjust taskbar behavior
- **Desktop Icon Arrangement** — Organize desktop shortcuts
- **Cursor Themes** — Different cursor styles available

### ⚙️ System Features

- **Quick Settings** — Fast access to common system settings
- **Notifications** — System notification alerts and display
- **Search Function** — Search for applications and files
- **Keyboard Shortcuts** — Extensive shortcut support (Win+X, Win+E, Alt+Tab, etc.)
- **Virtual Desktops** — Multiple desktop workspaces
- **Application Switching** — Alt+Tab desktop switcher
- **Local Persistence** — Settings and state saved to LocalStorage
- **Responsive Design** — Works on desktop and tablet viewports
- **Performance Optimized** — Smooth animations and interactions

### 🎭 Design & UX

The Windows 12 Concept employs several modern design principles:

- **Fluent Design System** — Microsoft's design language adapted for the web
- **Glassmorphism** — Frosted glass effect with backdrop blur
- **Acrylic Materials** — Translucent window surfaces with subtle noise
- **Layered Depth** — Shadows and elevation to convey hierarchy
- **Rounded Surfaces** — Smooth, modern rounded corners throughout
- **Micro-interactions** — Subtle animations on hover, click, and focus states
- **Smooth Transitions** — Fluid motion design for UI state changes
- **Color Harmony** — Cohesive accent color system throughout
- **Typography** — Clean, modern sans-serif font hierarchy
- **Responsive Layout** — Adapts gracefully to different screen sizes

---

## 🛠️ Technology Stack

| Technology  | Purpose                                    |
| ----------- | ------------------------------------------ |
| HTML5       | Semantic markup and application structure  |
| CSS3        | Styling, layouts, animations, and effects  |
| JavaScript  | Interactivity, window management, logic    |
| LocalStorage| Persistent client-side state and settings  |
| Canvas API  | Drawing and graphics (Paint application)   |
| Vercel      | Hosting and deployment platform            |

**No frameworks, no build tools, no dependencies.** Pure vanilla web technologies.

---

## 📁 Project Structure

```
windows-12-concept/
├── index.html              # Main entry point
├── desktop.html            # Alternative desktop entry
├── style.css               # Core styles and animations
├── script.js               # Desktop engine and logic
├── apps/
│   ├── calculator.js       # Calculator application
│   ├── notepad.js          # Text editor
│   ├── paint.js            # Drawing app
│   ├── terminal.js         # Command-line interface
│   ├── settings.js         # System settings
│   ├── explorer.js         # File manager
│   ├── calendar.js         # Calendar widget
│   ├── clock.js            # Clock display
│   ├── taskmanager.js      # Process viewer
│   ├── ai-assistant.js     # AI chat
│   └── ...
├── assets/
│   ├── wallpapers/         # Background images
│   ├── icons/              # Application and system icons
│   ├── fonts/              # Custom typefaces
│   └── sounds/             # UI sound effects
├── config/
│   ├── themes.json         # Theme definitions
│   ├── apps.json           # Application manifest
│   └── shortcuts.json      # Keyboard shortcut mappings
└── README.md               # This file
```

---

## 🚀 How to Run Locally

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No server dependencies or build tools required

### Option 1: Direct File Access
```bash
git clone https://github.com/Cyber943/windows-12-concept.git
cd windows-12-concept
# Open index.html in your browser
open index.html
```

### Option 2: Using VS Code Live Server
1. Install the [Live Server extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) for VS Code
2. Clone the repository and open the folder in VS Code
3. Right-click `index.html` and select "Open with Live Server"
4. Your default browser will open the desktop environment

### Option 3: Using Python (Local Server)
```bash
cd windows-12-concept

# Python 3
python3 -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Then open http://localhost:8000 in your browser
```

### Option 4: Using Node.js (Local Server)
```bash
npx http-server
```

---

## 🌍 Deployment

This project is deployed on **[Vercel](https://vercel.com)** for instant, edge-based hosting.

**Live Demo:** https://windows-12-gilt.vercel.app/

### Deploying Your Own Version

1. **Fork the Repository**
   ```bash
   git clone https://github.com/Cyber943/windows-12-concept.git
   cd windows-12-concept
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project" and import your repository
   - Vercel auto-detects HTML/CSS/JS projects
   - Deploy with one click

3. **Your custom URL will be live!**

The deployment requires no special configuration—Vercel automatically serves your HTML, CSS, and JavaScript files.

---

## 📖 Interaction Guide

### Desktop Interactions

| Action                    | Result                           |
| ------------------------- | -------------------------------- |
| **Click desktop**         | Deselect all / close menus       |
| **Right-click desktop**   | Open context menu                |
| **Double-click app icon** | Open application                 |
| **Single-click app icon** | Select application               |
| **Drag app icon**         | Move icon on desktop             |
| **Click Start button**    | Open Start Menu                  |
| **Click taskbar app**     | Switch to / minimize application |

### Window Controls

| Action                           | Result                     |
| -------------------------------- | -------------------------- |
| **Drag title bar**               | Move window                |
| **Double-click title bar**       | Maximize / restore window  |
| **Drag window edge/corner**      | Resize window              |
| **Click minimize button**        | Minimize to taskbar        |
| **Click maximize button**        | Maximize / restore window  |
| **Click close button (X)**       | Close application          |
| **Alt + Tab**                    | Switch between windows     |

### Keyboard Shortcuts

| Shortcut           | Action                    |
| ------------------ | ------------------------- |
| **Win**            | Open Start Menu           |
| **Win + E**        | Open File Explorer        |
| **Win + I**        | Open Settings             |
| **Win + V**        | Open Clipboard (if active)|
| **Win + X**        | Open Quick Link Menu      |
| **Alt + Tab**      | Switch between apps       |
| **Alt + F4**       | Close current window      |
| **Ctrl + C**       | Copy                      |
| **Ctrl + V**       | Paste                     |
| **Ctrl + X**       | Cut                       |

---

## 🎯 Built-in Applications

### File Explorer
A simulated filesystem browser featuring folder navigation, file operations, and a tree-based directory structure. Includes common folders like Desktop, Documents, Downloads, and Pictures.

- **Features:** Navigate folders, view file details, simulated file operations
- **Launch:** Double-click File Explorer icon or press Win+E
- **Functionality:** Folder browsing with realistic file hierarchy

### Terminal
A command-line interface simulator supporting common Windows/Unix-style commands. Displays a black command prompt for text-based interaction.

- **Features:** Command-line input, help system, system information display
- **Launch:** Double-click Terminal icon or search for "cmd"
- **Commands:** Basic commands include `help`, `clear`, `echo`, `cd`, and more

### Calculator
A fully functional calculator with standard arithmetic operations, history, and multiple modes (standard, scientific).

- **Features:** Basic arithmetic, percentage calculations, history
- **Launch:** Double-click Calculator icon
- **Operations:** Addition, subtraction, multiplication, division, square root, percentage

### Notepad
A lightweight text editor with file save/load capabilities using browser LocalStorage.

- **Features:** Text editing, file management, auto-save
- **Launch:** Double-click Notepad icon
- **Files:** Saves to browser storage (not actual filesystem)

### Settings
System configuration panel for themes, colors, displays, and personalization.

- **Features:** Theme switching, accent color selection, sound and display settings
- **Launch:** Double-click Settings icon or press Win+I
- **Categories:** Personalization, System, Display, Sound

### Paint
A drawing application with brush tools, colors, and canvas manipulation.

- **Features:** Freehand drawing, shapes, color picker, eraser
- **Launch:** Double-click Paint icon
- **Tools:** Pencil, brush, eraser, shapes, fill bucket

### Calendar
An interactive calendar widget showing current month, date navigation, and event display.

- **Features:** Monthly view, date selection, basic event marking
- **Launch:** Double-click Calendar icon
- **Navigation:** Move between months easily

### Clock
A digital and analog clock display with current system time.

- **Features:** Real-time display, multiple formats, timezone support (simulated)
- **Launch:** Double-click Clock icon
- **Display:** Shows current time and date

### Task Manager
A system monitoring interface showing running applications and simulated performance metrics.

- **Features:** Application list, simulated CPU/memory usage, process termination
- **Launch:** Right-click taskbar or search for "taskmgr"
- **Information:** Process list with resource usage indicators

### Recycle Bin
File recovery center for deleted items. Simulates Windows Recycle Bin functionality.

- **Features:** View deleted files, restore or permanently delete
- **Launch:** Double-click Recycle Bin icon on desktop
- **Actions:** Empty bin or recover files

### AI Assistant
An interactive chatbot interface providing information and assistance.

- **Features:** Natural language interaction, helpful responses
- **Launch:** Search for AI or click AI Assistant in start menu
- **Capability:** Answers questions and provides system guidance

---

## 💾 Data Persistence

The Windows 12 Concept uses **Browser LocalStorage** to persist data between sessions:

- **Theme Preferences** — Selected theme, colors, and accent choices
- **Wallpaper Selection** — Current background image choice
- **Desktop Layout** — Position of desktop icons
- **Window States** — Last open applications and window positions
- **Application Data** — Notes, calculator history, settings
- **Taskbar Configuration** — Pinned applications and order
- **User Preferences** — Sound settings, display preferences
- **Notifications** — System notification history

**Important:** Data is stored locally in your browser and is deleted if you clear browser cache/storage.

---

## ⚠️ Browser Limitations & Simulation Notes

This is a **browser simulation** of a desktop operating system. It intentionally simulates OS functionality within the constraints of a web browser:

### Actual Limitations
- 🔒 **No Real File System Access** — Cannot access your actual computer files due to browser security
- 🔐 **Sandbox Restrictions** — All data is isolated within the browser environment
- ⌨️ **Limited Shortcuts** — Some system shortcuts (Win+Lock, etc.) are OS-restricted
- 🖥️ **Simulated Hardware** — Cannot access real CPU, RAM, or device information
- 📱 **Single Process** — All "applications" run in a single browser process
- 🔌 **No Network Access** — Cannot access real network or printers
- 📱 **Touch Optimization** — Limited optimization for mobile/tablet devices
- ⚡ **No Real Performance Monitoring** — Metrics are simulated

### Design Decisions
- All file operations use browser LocalStorage
- System information is simulated for demonstration
- Terminal commands are limited and simulated
- Network operations are mocked or non-functional
- Hardware access is not available

**This is intentional and by design** — the project exists to explore and demonstrate desktop UX patterns in the browser, not to replace an actual operating system.

---

## 🗺️ Roadmap

Future enhancements and planned features:

- [ ] **Advanced Snap Layouts** — More window arrangement options
- [ ] **Improved File Explorer** — Better folder navigation and file management
- [ ] **Additional Applications** — More built-in apps and utilities
- [ ] **Widget System** — Desktop widgets with live updates
- [ ] **Better AI Integration** — Enhanced AI assistant capabilities
- [ ] **Multi-monitor Support** — Virtual multi-display functionality
- [ ] **Improved Accessibility** — Better keyboard navigation and screen reader support
- [ ] **Mobile Optimization** — Better touch interface and mobile responsiveness
- [ ] **Performance Optimization** — Faster loading and smoother animations
- [ ] **Sound Effects** — UI audio feedback
- [ ] **Custom Themes** — User-created theme support
- [ ] **Application Store** — Browse and "install" more applications
- [ ] **Collaborative Features** — Share desktop sessions
- [ ] **Dark Mode Improvements** — Enhanced dark theme visuals

---

## 🤝 Contributing

We welcome contributions from developers who want to improve the Windows 12 Concept!

### How to Contribute

1. **Fork the Repository**
   ```bash
   git clone https://github.com/Cyber943/windows-12-concept.git
   cd windows-12-concept
   ```

2. **Create a Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make Your Changes**
   - Keep the code clean and modular
   - Avoid adding unnecessary dependencies
   - Test your changes thoroughly in the browser

4. **Test Before Committing**
   - Open the project in multiple browsers
   - Test window management, applications, and interactions
   - Verify performance and animations are smooth

5. **Commit & Push**
   ```bash
   git add .
   git commit -m "Add feature: description of changes"
   git push origin feature/your-feature-name
   ```

6. **Submit a Pull Request**
   - Describe your changes clearly
   - Explain why the changes are beneficial
   - Link any related issues

### Development Guidelines

- **Keep It Vanilla** — No frameworks or heavy dependencies
- **Responsive Design** — Ensure changes work on different screen sizes
- **Performance First** — Avoid unnecessary DOM manipulation or repaints
- **Accessibility** — Add proper ARIA labels and keyboard support
- **Code Quality** — Keep JavaScript modular and well-commented
- **No Fake Features** — Don't promise functionality that isn't implemented
- **Browser Compatibility** — Test on Chrome, Firefox, Safari, and Edge
- **Commit Often** — Make small, logical commits with clear messages

---

## 💡 Development Principles

The Windows 12 Concept follows these core principles:

1. **Responsiveness First** — The interface must remain responsive and smooth
2. **Vanilla Only** — No frameworks; pure HTML, CSS, and JavaScript
3. **Modularity** — Each application and system component is self-contained
4. **Accessibility** — Keyboard navigation and screen reader support where possible
5. **Honesty** — Don't fake or mock features; only build what actually works
6. **Performance** — Optimize animations, rendering, and memory usage
7. **User Experience** — Focus on polish, animations, and interaction feedback
8. **Testing** — Validate interactive features before committing changes

---

## 📜 License

This project does **not** currently have an explicit open-source license. 

**Usage Rights:**
- You may view and run this project for personal use and learning
- You may fork and modify it for your own projects
- You may not claim ownership or redistribute as your own
- For commercial or redistributive use, please contact the developer

If you plan to use this code in your own project, please reach out to [Sutantu Dutta](https://github.com/Cyber943) for guidance.

---

## ⚖️ Disclaimer

> **Windows 12 Concept is an independent, unofficial, fan-made web prototype. It is not affiliated with, sponsored by, or endorsed by Microsoft Corporation. Windows and related trademarks (Windows, File Explorer, Notepad, Calculator, Paint, Settings, Recycle Bin, Start Menu, Taskbar, etc.) are registered trademarks of Microsoft Corporation. This project is created purely for educational and creative purposes as a demonstration of browser-based desktop UI simulation.**

---

## 👨‍💻 Developer

**Sutantu Dutta**

Student Developer • Creative Builder • AI Enthusiast

- 🌐 **Portfolio:** [sutantudutta-red.vercel.app](https://sutantudutta-red.vercel.app)
- 🐙 **GitHub:** [@Cyber943](https://github.com/Cyber943)
- 💻 **CodePen:** [@Cyber943](https://codepen.io/Cyber943)
- 🚀 **500+ Projects** — Games, simulations, interactive tools, and creative experiments

---

## 🎉 Acknowledgments

Special thanks to:
- The open-source web development community
- Microsoft's Fluent Design System for design inspiration
- All contributors and testers who help improve this project
- Everyone who explores and experiments with this concept

---

## 📞 Support & Feedback

- 📧 **Issues & Bugs:** Open an issue on GitHub
- 💬 **Suggestions:** Discussions and feature requests welcome
- 🐛 **Bug Reports:** Please include browser, OS, and steps to reproduce

---

## 🔗 Links

- **Live Demo:** https://windows-12-gilt.vercel.app/
- **Repository:** https://github.com/Cyber943/windows-12-concept
- **Developer:** https://github.com/Cyber943
- **Portfolio:** https://sutantudutta-red.vercel.app

---

<div align="center">

**Made with ❤️ by Sutantu Dutta**

_A creative exploration of browser-based desktop environments._

</div>
