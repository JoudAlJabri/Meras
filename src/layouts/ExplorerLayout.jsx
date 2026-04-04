import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import {
  MdDashboard,
  MdExtension,
  MdPeople,
  MdRoute,
  MdExplore,
  MdMenu,
  MdClose,
} from "react-icons/md";

const navItems = [
  { to: "/explorer/dashboard", label: "Dashboard", icon: MdDashboard },
  { to: "/explorer/challengeCatalog", label: "Challenges", icon: MdExtension },
  { to: "/explorer/mentors", label: "Mentors", icon: MdPeople },
  { to: "/explorer/my-path", label: "My Path", icon: MdRoute },
  { to: "/explorer/compass-quiz", label: "Compass Quiz", icon: MdExplore },
];

function NavLink({ to, label, icon: Icon, isActive, collapsed }) {
  const [hovered, setHovered] = useState(false);

  const linkStyle = {
    ...styles.link,
    justifyContent: collapsed ? "center" : "flex-start",
    padding: collapsed ? "12px" : "12px 14px",
    backgroundColor:
      isActive ? "rgba(0,0,0,0.25)" : hovered ? "rgba(0,0,0,0.15)" : "transparent",
  };

  return (
    <Link
      to={to}
      style={linkStyle}
      title={collapsed ? label : undefined}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Icon style={styles.icon} />
      {!collapsed && <span>{label}</span>}
    </Link>
  );
}

function ExplorerLayout({ children }) {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true); // true or false toggle when side bar is expnaded and when not

  return (
    <div style={styles.wrapper}>

      {/* sidebar width driven by state, instead of fixed ( switches between 220px open and 60px closed enough only for icons) */}
      <aside style={{ ...styles.sidebar, width: sidebarOpen ? "220px" : "60px" }}>
        <div style={styles.sidebarTop}>
          {sidebarOpen && <h2 style={styles.logo}>Meras</h2>}
          {/* clicking flips the state. The icon also swaps between ☰ (menu) and ✕ (close) depending on current state.*/}
          <button 
            style={styles.toggleBtn}
            onClick={() => setSidebarOpen(o => !o)}
            title={sidebarOpen ? "Collapse menu" : "Expand menu"}
          >
            {sidebarOpen ? <MdClose size={22} /> : <MdMenu size={22} />}
          </button>
        </div>

        <nav style={styles.nav}>
          {navItems.map(({ to, label, icon }) => (
            <NavLink
              key={to}
              to={to}
              label={label}
              icon={icon}
              isActive={location.pathname === to}
              collapsed={!sidebarOpen}
            />
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <div style={styles.rightSection}>
        <main style={styles.content}>{children}</main>
      </div>

    </div>
  );
}
 //  Without minWidth: 0, the right section would refuse to shrink when the sidebar was open, compressing the cards. Setting it to 0 tells it "you're allowed to shrink as small as needed."
const styles = {
  wrapper: {
    display: "flex",
    minHeight: "100vh",
    backgroundColor: "#F0F2F0",
    fontFamily: "Arial, sans-serif",
  },
  sidebar: {
    backgroundColor: "var(--meras-green-dark)",
    color: "#FFFFFF",
    padding: "20px 10px",
    display: "flex",
    flexDirection: "column",
    transition: "width 0.25s ease",
    overflow: "hidden",
    flexShrink: 0,
  },
  sidebarTop: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "28px",
    minHeight: "36px",
  },
  logo: {
    margin: 0,
    fontSize: "24px",
    fontWeight: "700",
    whiteSpace: "nowrap",
  },
  toggleBtn: {
    background: "none",
    border: "none",
    color: "#FFFFFF",
    cursor: "pointer",
    padding: "4px",
    display: "flex",
    alignItems: "center",
    flexShrink: 0,
    marginLeft: "auto",
  },
  nav: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  link: {
    textDecoration: "none",
    color: "#FFFFFF",
    fontSize: "15px",
    borderRadius: "10px",
    fontWeight: "500",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    transition: "background-color 0.15s ease",
    whiteSpace: "nowrap",
  },
  icon: {
    fontSize: "20px",
    flexShrink: 0,
  },
  rightSection: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    minWidth: 0,
  },
  content: {
    flex: 1,
    margin: "16px",
    backgroundColor: "#FFFFFF",
    border: "1px solid #E5E7EB",
    borderRadius: "16px",
    padding: "20px",
  },
};

export default ExplorerLayout;
