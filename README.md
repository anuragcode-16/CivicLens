```
╔══════════════════════════════════════════════════════════════════════════╗
║                                                                          ║
║    ░█████╗░██╗██╗   ██╗██╗ ██████╗██╗     ███████╗███╗  ██╗░██████╗    ║
║    ██╔══██╗██║██║   ██║██║██╔════╝██║     ██╔════╝████╗ ██║██╔════╝    ║
║    ██║  ╚═╝██║╚██╗ ██╔╝██║██║     ██║     █████╗  ██╔██╗██║╚█████╗     ║
║    ██║  ██╗██║ ╚████╔╝ ██║██║     ██║     ██╔══╝  ██║╚████║ ╚═══██╗    ║
║    ╚█████╔╝██║  ╚██╔╝  ██║╚██████╗███████╗███████╗██║ ╚███║██████╔╝    ║
║     ╚════╝ ╚═╝   ╚═╝   ╚═╝ ╚═════╝╚══════╝╚══════╝╚═╝  ╚══╝╚═════╝     ║
║                                                                          ║
║            ·  civic waste · tracked · resolved · transparent  ·         ║
║                                                                          ║
╠══════════════════════════════════════════════════════════════════════════╣
║                                                                          ║
║   ♻  REPORT          ◉  VALIDATE          ⚑  ASSIGN          ✓  RESOLVE ║
║   ─────────          ──────────           ────────           ──────────  ║
║   citizen             AI layer            authority           confirmed  ║
║                                                                          ║
║   ····················································                   ║
║   :                                                  :                   ║
║   :    🏙  city heatmap · live · real-time data 📍   :                   ║
║   :                                                  :                   ║
║   ····················································                   ║
║                                                                          ║
╠══════════════════════════════════════════════════════════════════════════╣
║                                                                          ║
║      _____   _____   _____        ╔════════════╗        _____   _____   ║
║     |     | |     | |     |       ║  CivicLens ║       |     | |     |  ║
║     |█████| |█████| |█████|       ║ ──────────  ║       |█████| |█████|  ║
║     |     | |     | |     |       ║  React  19  ║       |     | |     |  ║
║     |     | |     | |     |       ║  Vite  ⚡   ║       |     | |     |  ║
║     |     | |     | |     |       ╚════════════╝       |     | |     |  ║
║─────┴─────┴─┴─────┴─┴─────┴─────────────────────────────┴─────┴─┴─────┴─║
║▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓║
║                                                                          ║
║         " cleaner cities start with one report at a time "              ║
║                                                                          ║
╚══════════════════════════════════════════════════════════════════════════╝
```

<div align="center">

[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-latest-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38BDF8?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/License-Apache_2.0-green?style=flat-square)](LICENSE)
[![Deploy](https://img.shields.io/badge/Live-civiclen.vercel.app-000000?style=flat-square&logo=vercel)](https://civiclen.vercel.app)

**A role-based civic waste-management platform — report, track, resolve.**

[Live Demo](https://civiclen.vercel.app) · [Report a Bug](https://github.com/anuragcode-16/CivicLens/issues) · [Request Feature](https://github.com/anuragcode-16/CivicLens/issues)

</div>

---

## What is CivicLens?

CivicLens turns civic cleanliness into a structured, trackable workflow. Citizens capture and submit waste reports with location data, authorities review and assign cleanup work, and the platform surfaces live cleanliness status through heatmaps and dashboards — all in real time.

Built with AI-assisted image validation, role-based access, and live notifications, CivicLens bridges the gap between citizens and the municipal bodies responsible for keeping cities clean.

---

## Table of Contents

- [Features](#-features)
- [User Roles](#-user-roles)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [How It Works](#-how-it-works)
- [Future Improvements](#-future-improvements)
- [License](#-license)

---

## ✨ Features

| Feature | Description |
|---|---|
| ♻️ Waste Reporting | Photo capture + GPS location tagging per submission |
| 🤖 AI Validation | Gemini-powered image check rejects non-waste photos |
| 🗺️ Live Heatmap | Real-time cleanliness map showing problem clusters |
| 🔔 Notifications | Live alerts for new reports and status updates |
| 🏛️ Authority Dashboard | Review, assign, resolve, and escalate reports |
| 🚛 Bulk Pickup | Scheduled large-waste disposal request flow |
| ♻️ Segregation Guidance | Correct waste handling instructions per category |
| 📍 Facility Locator | Find nearby drop-off and disposal points |
| 📣 Campaigns | Civic engagement and cleanup event participation |
| 🔐 Role-Based Access | Separate experiences per user type |
| 📊 Analytics | Escalation logic and resolution trend dashboards |

---

## 👥 User Roles

<table>
<tr>
<td width="20%" align="center"><b>🧑‍💼 Citizen</b></td>
<td>Report waste, track submissions, find disposal facilities, request bulk pickup, view impact status</td>
</tr>
<tr>
<td align="center"><b>🏛️ Authority</b></td>
<td>Review incoming reports, assign cleanup teams, mark resolution, upload proof, escalate overdue cases</td>
</tr>
<tr>
<td align="center"><b>🏢 Organization</b></td>
<td>Collective reporting for apartments, offices, restaurants, and other bulk waste generators</td>
</tr>
<tr>
<td align="center"><b>⚙️ Admin</b></td>
<td>Platform-wide configuration, user management, analytics oversight, escalation policy control</td>
</tr>
<tr>
<td align="center"><b>🌿 NGO / Gov</b></td>
<td>Awareness campaigns, segregation content, city-level waste pattern monitoring</td>
</tr>
</table>

---

## 🛠 Tech Stack

**Frontend**

![React](https://img.shields.io/badge/-React_19-61DAFB?style=flat-square&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/-Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![React Router](https://img.shields.io/badge/-React_Router-CA4245?style=flat-square&logo=reactrouter&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/-Tailwind_CSS-38BDF8?style=flat-square&logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/-Framer_Motion-0055FF?style=flat-square&logo=framer&logoColor=white)

**Maps & Visualization**

![Leaflet](https://img.shields.io/badge/-Leaflet-199900?style=flat-square&logo=leaflet&logoColor=white)
![Three.js](https://img.shields.io/badge/-Three.js-000000?style=flat-square&logo=threedotjs&logoColor=white)
![Recharts](https://img.shields.io/badge/-Recharts-FF6384?style=flat-square)
![react-globe.gl](https://img.shields.io/badge/-react--globe.gl-1DA1F2?style=flat-square)

**State & Data**

![Zustand](https://img.shields.io/badge/-Zustand-433D3D?style=flat-square)
![Axios](https://img.shields.io/badge/-Axios-5A29E4?style=flat-square&logo=axios&logoColor=white)
![Socket.io](https://img.shields.io/badge/-Socket.io-010101?style=flat-square&logo=socketdotio&logoColor=white)

**AI**

![Gemini](https://img.shields.io/badge/-Gemini_API-4285F4?style=flat-square&logo=google&logoColor=white)

---

## 📁 Project Structure

```bash
CivicLens/
├── public/
├── src/
│   ├── assets/              # Static assets
│   ├── components/          # Reusable UI components
│   ├── context/             # React context providers
│   ├── data/                # Static/mock data
│   ├── lib/                 # Utility helpers
│   └── pages/
│       ├── admin/           # Admin dashboard & config
│       ├── auth/            # Login, signup, role select
│       ├── authority/       # Authority review & resolution
│       ├── citizen/         # Citizen reporting & tracking
│       └── public/          # Heatmap, facility locator
├── App.jsx
├── index.css
├── main.jsx
├── package.json
└── vite.config.js
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js `18+`
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/anuragcode-16/CivicLens.git

# Navigate into the project
cd CivicLens

# Install dependencies
npm install
```

### Run locally

```bash
npm run dev
```

Open the URL shown in your terminal — usually `http://localhost:5173`.

### Available Scripts

```bash
npm run dev        # Start development server
npm run build      # Production build
npm run preview    # Preview production build locally
npm run lint       # Run ESLint
```

---

## 🔐 Environment Variables

Create a `.env` file in the project root:

```env
VITE_API_URL=
VITE_SOCKET_URL=
VITE_GEMINI_API_KEY=
VITE_MAPS_API_KEY=
```

> ⚠️ **Security note:** `VITE_` prefixed variables are bundled into the client. For production deployments, sensitive keys like `VITE_GEMINI_API_KEY` should be proxied through a backend server — never exposed directly in the frontend bundle.

---

## ⚙️ How It Works

```
  Citizen                  Platform                   Authority
    │                         │                           │
    ├─── captures photo ──────▶│                           │
    │                         │── AI validates image ──▶  │
    │                         │   (Gemini API)            │
    ├─── submits report ──────▶│                           │
    │                         │──── routes to queue ─────▶│
    │                         │                           ├─ assigns task
    │                         │                           ├─ resolves issue
    │◀── status update ───────│◀─── marks resolved ───────│
    │                         │                           │
    │         [heatmap + dashboards update in real time]
```

1. Citizen opens the app and signs in
2. Citizen captures a waste photo and submits it with location details
3. The AI layer (Gemini) validates whether the image actually contains waste
4. Valid reports are stored and routed to the correct authority queue
5. Authorities review, assign cleanup tasks, and resolve the issue
6. Report status updates in real time across all dashboards and maps
7. Citizen receives feedback when the report is resolved

---

## 🔭 Future Improvements

- [ ] Mobile-first PWA with offline-first reporting
- [ ] Stronger escalation and SLA analytics engine
- [ ] Region-wise waste classification ML models
- [ ] Multilingual user experience (Hindi, Bengali, Tamil…)
- [ ] Automated before/after resolution photo comparison
- [ ] Public leaderboard and community impact scoring
- [ ] Integration with municipal APIs for direct ticket routing

---

## 📄 License

Distributed under the [Apache 2.0 License](LICENSE).

---

## 🙏 Acknowledgements

Built for civic accountability, cleaner neighborhoods, and faster public service response.

<div align="center">

---

Made with ♥ for cleaner cities · [CivicLens](https://civiclen.vercel.app)

</div>
