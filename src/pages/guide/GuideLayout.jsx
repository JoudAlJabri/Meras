import { NavLink } from "react-router-dom";
import "./Guide.css";
import { Outlet } from "react-router-dom";

// Navigation items
const NAV_ITEMS = [
  { label: "Dashboard",        to: "/guide/dashboard" },
  { label: "Mentor Directory", to: "/guide/mentors"   },
  { label: "Task Wizard",      to: "/guide/tasks"     },
  { label: "Grading",          to: "/guide/grading"   },
];

function GuideLayout() {
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
        <Outlet />
      </main>

    </div>
  );
}

export default GuideLayout;