import { NavLink } from "react-router-dom";
import "./Guide.css";

// Navigation items — add or remove routes here as your app grows
const NAV_ITEMS = [
  { label: "Dashboard",        to: "/guide/dashboard" },
  { label: "Mentor Directory", to: "/guide/mentors"   },
  { label: "Profile",          to: "/guide/profile"   },
  { label: "Booking",          to: "/guide/booking"   },
  { label: "Task Wizard",      to: "/guide/tasks"     },
  { label: "Grading",          to: "/guide/grading"   },
];

function GuideLayout({ children }) {
  return (
    <div className="layout">

      {/* ── Sidebar ── */}
      <aside className="sidebar">

        {/* App name / brand */}
        <div className="sidebar-brand">
          <span className="sidebar-brand-icon">✦</span>
          <span className="sidebar-brand-name">Meras Guide Portal</span>
        </div>

        {/* Navigation links */}
        <nav className="sidebar-nav">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `sidebar-item ${isActive ? "sidebar-active" : ""}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

      </aside>

      {/* ── Main content area ── */}
      <main className="main-content">
        {children}
      </main>

    </div>
  );
}

export default GuideLayout;