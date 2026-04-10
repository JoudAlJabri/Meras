import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  MdDashboard,
  MdExtension,
  MdPeople,
  MdRoute,
  MdExplore,
  MdMenu,
  MdClose,
  MdAccountCircle,
} from "react-icons/md";

const navItems = [
  { to: "/explorer/dashboard", label: "Dashboard", icon: MdDashboard },
  { to: "/explorer/challengeCatalog", label: "Challenges", icon: MdExtension },
  { to: "/explorer/mentors", label: "Mentors", icon: MdPeople },
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
  const { currentUser } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [avatarHovered, setAvatarHovered] = useState(false);


  return (
    <div style={styles.wrapper}>

      {/* sidebar width driven by state, instead of fixed ( switches between 220px open and 60px closed enough only for icons) */}
      <aside style={{ ...styles.sidebar, width: sidebarOpen ? "220px" : "60px" }}>
        <div style={styles.sidebarTop}>
          {sidebarOpen && <h2 style={styles.logo}>Meras</h2>}
          <button
            style={styles.toggleBtn}
            onClick={() => setSidebarOpen(o => !o)}
            title={sidebarOpen ? "Collapse menu" : "Expand menu"}
          >
            {sidebarOpen ? <MdClose size={22} /> : <MdMenu size={22} />}
          </button>
        </div>

        {/* User profile */}
        <Link
          to="/explorer/settings"
          style={{
            ...styles.userProfile,
            justifyContent: sidebarOpen ? "flex-start" : "center",
            backgroundColor: avatarHovered ? "rgba(0,0,0,0.2)" : "rgba(0,0,0,0.15)",
          }}
          onMouseEnter={() => setAvatarHovered(true)}
          onMouseLeave={() => setAvatarHovered(false)}
          title={!sidebarOpen ? currentUser?.name || "Account" : undefined}
        >
          <div style={styles.avatar}>
            {currentUser?.photoURL
              ? <img src={currentUser.photoURL} alt="avatar" style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover" }} />
              : <MdAccountCircle size={36} style={{ color: "rgba(255,255,255,0.85)" }} />
            }
          </div>
          {sidebarOpen && (
            <span style={styles.userName}>{currentUser?.name || "Account"}</span>
          )}
        </Link>

        <div style={styles.divider} />

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
 //  Without minWidth: 0
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
  userProfile: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "10px 8px",
    borderRadius: "10px",
    textDecoration: "none",
    color: "#FFFFFF",
    marginBottom: "8px",
    transition: "background-color 0.15s ease",
    overflow: "hidden",
  },
  avatar: {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  userName: {
    fontSize: "14px",
    fontWeight: "600",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  divider: {
    borderTop: "1px solid rgba(255,255,255,0.2)",
    marginBottom: "16px",
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
