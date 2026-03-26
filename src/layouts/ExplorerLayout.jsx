import { Link } from "react-router-dom";

function ExplorerLayout({ children }) {
  return (
    <div style={styles.wrapper}>
      <aside style={styles.sidebar}>
        <h2 style={styles.logo}>Meras</h2>

        <nav style={styles.nav}>
          <Link to="/explorer/dashboard" style={styles.link}>
            Dashboard
          </Link>
          <Link to="/explorer/challenges" style={styles.link}>
            Challenges
          </Link>
          <Link to="/explorer/mentors" style={styles.link}>
            Mentors
          </Link>
          <Link to="/explorer/my-path" style={styles.link}>
            My Path
          </Link>
          <Link to="/explorer/compass-quiz" style={styles.link}>
            Compass Quiz
          </Link>
        </nav>
      </aside>

      <div style={styles.rightSection}>
        <header style={styles.navbar}>
          <div style={styles.title}>Explorer</div>

          <div style={styles.avatarSection}>
            <div style={styles.avatar}>L</div>
            <span style={styles.dropdown}>▼</span>
          </div>
        </header>

        <main style={styles.content}>{children}</main>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    display: "flex",
    minHeight: "100vh",
    backgroundColor: "#F0F2F0",
    fontFamily: "Arial, sans-serif",
  },
  sidebar: {
    width: "240px",
    backgroundColor: "#2A8C5C",
    color: "#FFFFFF",
    padding: "24px 18px",
    display: "flex",
    flexDirection: "column",
  },
  logo: {
    margin: "0 0 32px 0",
    fontSize: "28px",
    fontWeight: "700",
  },
  nav: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  link: {
    textDecoration: "none",
    color: "#FFFFFF",
    fontSize: "16px",
    padding: "12px 14px",
    borderRadius: "10px",
    backgroundColor: "#3DB87A",
    fontWeight: "500",
  },
  rightSection: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  navbar: {
    height: "72px",
    backgroundColor: "#3DB87A",
    borderBottom: "1px solid #E5E7EB",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 24px",
  },
  title: {
    fontSize: "22px",
    fontWeight: "600",
    color: "#000000",
  },
  avatarSection: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer",
  },
  avatar: {
    width: "38px",
    height: "38px",
    borderRadius: "50%",
    backgroundColor: "#FFFFFF",
    color: "#2A8C5C",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "700",
    border: "1px solid #E5E7EB",
  },
  dropdown: {
    color: "#000000",
    fontSize: "12px",
  },
  content: {
    flex: 1,
    margin: "20px",
    backgroundColor: "#FFFFFF",
    border: "1px solid #E5E7EB",
    borderRadius: "16px",
    padding: "24px",
  },
};

export default ExplorerLayout;