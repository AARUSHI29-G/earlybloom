# 🌸 EarlyBloom — Early Childhood NGO Portal

EarlyBloom is a modern, responsive web application designed to bridge the gap between families, verified NGO administrators, and dedicated field volunteers. The platform provides a centralized framework to track early childhood developmental milestones and streamline localized social support deployment.

## 🚀 Key Core Features
- **Milestone Tracking:** Empowering parents to digitally monitor physical, behavioral, and cognitive growth milestones.
- **Volunteer Support Matrix:** Enabling field coordinators to live-schedule home visits and submit field telemetry reports directly from the site.
- **Role-Based Admin Dashboard:** Secure management interfaces tailored separately for NGO Admins, Field Volunteers, and Parents.
- **Responsive Architecture:** Built mobile-first to ensure smooth accessibility across devices in low-connectivity environments.

## 🛠️ Tech Stack & Architecture
- **Frontend Core:** React.js (Component-driven architecture)
- **Styling Framework:** Tailwind CSS (Utility-first framework for custom responsive design layout)
- **Component System:** shadcn/ui (Accessible, headless primitives)
- **Database & Auth (Roadmap):** Supabase (PostgreSQL serverless data layer & instant identity validation)

## 📁 Repository Structure
```text
src/
├── components/        # Isolated global components (Navbar, Sidebar)
│   ├── admin/         # Secure interface layers for NGO leads
│   └── student/       # Specialized role-driven interface layouts
├── pages/             # Layout screen declarations (Home, About, Dashboard)
└── assets/            # Project vectors, brand logos, and static graphics
```

## 💻 Local Installation & Deployment

Follow these steps to spin up the local development environment:

1. **Clone the repository:**
   ```bash
   git clone https://github.com
   cd EarlyBloom
   ```

2. **Install project dependencies:**
   ```bash
   npm install
   ```

3. **Launch the local Vite development server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` inside your browser to view the application live.


