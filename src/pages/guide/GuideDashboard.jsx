import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  MdExtension,
  MdHourglassEmpty,
  MdEventNote,
  MdCalendarToday,
  MdAutoAwesome,
} from "react-icons/md";
import mentoring from "../../assets/Dashboard-pics/MentorDashboard.png";
import CompletedChallenges from "../explorer/CompletedChallenges";
import { mockChallenges } from "../../data/mockData";
import { useAuth } from "../../context/AuthContext";
import ChallengeCard from "../../components/ChallengeCard";

// Challenges that belong to the logged-in guide
const guideChallenges = mockChallenges.filter(
  (c) => c.mentorName === "Rana Abdullah"
);




const recentActivities = [
  {
    label: "Challenges",
    detail: "Added a new challenge!'",
    color: "var(--meras-green)",
    icon: MdExtension,
  },
  {
    label: "Bookings",
    detail: "New recent bookings!",
    color: "var(--meras-yellow)",
    icon: MdCalendarToday,
  },
];

function GuideDashboard() {
  const navigate = useNavigate();
  const { currentUser, login } = useAuth();

  // Track viewport width so the layout reacts to resize / device rotation.
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  return (
    <div style={styles.page}>
      {/* Stack vertically on mobile, side-by-side on desktop */}
      <div style={{ ...styles.mainLayout, flexDirection: isMobile ? "column" : "row" }}>

        {/* Left column */}
        <div style={styles.mainColumn}>

          {/* Banner */}
          <div style={styles.banner}>
            <div style={styles.bannerContent}>

              {/* Reduced font on mobile to prevent overflow */}
              <h1 style={{ ...styles.bannerName, fontSize: isMobile ? "32px" : "48px" }}>Hi, Rana</h1>
              <p style={styles.bannerText}>
                Keep sharing your expertise and guiding the next generation.
              </p>
            </div>
            {/* Hide illustration on mobile — overlaps text at narrow widths */}
            {!isMobile && <img src={mentoring} alt="illustration" style={styles.bannerImage} />}
          </div>

          {/* Stat Cards — 2 columns on mobile (3 would be too narrow), 3 on desktop */}
          <div style={{ ...styles.statsGrid, gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(3, 1fr)" }}>
            <div style={styles.statCard}>
              <div style={{ ...styles.statIcon, backgroundColor: "var(--meras-green)" }}>
                <MdExtension style={styles.statIconInner} />
              </div>
              <p style={styles.statLabel}>Your Challenges</p>
              <h2 style={styles.statNumber}>2</h2>
            </div>
            <div style={styles.statCard}>
              <div style={{ ...styles.statIcon, backgroundColor: "var(--meras-yellow)" }}>
                <MdHourglassEmpty style={styles.statIconInner} />
              </div>
              <p style={styles.statLabel}>Pending Reviews</p>
              <h2 style={styles.statNumber}>1</h2>
            </div>
            <div style={styles.statCard}>
              <div style={{ ...styles.statIcon, backgroundColor: "var(--meras-gray)" }}>
                <MdEventNote style={styles.statIconInner} />
              </div>
              <p style={styles.statLabel}>Upcoming Sessions</p>
              <h2 style={styles.statNumber}>3</h2>
            </div>
          </div>

          {/* No challenges card */}
          <div style={styles.continueCard}>
            <div>
              <h2 style={styles.continueTitle}>Check our your upcoming submissions & sessions</h2>
              <p style={styles.continueText}>Remember to give honest and insightful feedback!</p>
            </div>
            <button style={styles.exploreButton} onClick={() => navigate("/guide/grading")}>
              Check →
            </button>
          </div>

          {/* My Challenges */}
          <div>
            <h2 style={styles.sectionTitle}>My Challenges</h2>
            {guideChallenges.length === 0 ? (
              <p style={styles.emptyText}>You haven't created any challenges yet.</p>
            ) : (
              <div style={styles.challengesGrid}>
                {guideChallenges.map((challenge, i) => (
                  <ChallengeCard
                    key={i}
                    challengeName={challenge.title}
                    description={challenge.description}
                    major={challenge.major}
                    buttonLabel="Edit"
                    onMoreDetails={() => {}}
                  />
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Recent sidebar — full width on mobile, fixed 260px on desktop */}
        <div style={{ ...styles.recentPanel, width: isMobile ? "100%" : "260px" }}>
          <h2 style={styles.recentTitle}>Recent</h2>
          <div style={styles.recentList}>
            {recentActivities.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} style={styles.recentItem}>
                  <div style={{ ...styles.recentIcon, backgroundColor: item.color }}>
                    <Icon style={styles.recentIconInner} />
                  </div>
                  <div>
                    <p style={styles.recentLabel}>{item.label}</p>
                    <p style={styles.recentDetail}>{item.detail}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}

const styles = {
  page: {
    padding: "8px",
    fontFamily: "Plus Jakarta Sans, sans-serif",
  },
  mainLayout: {
    display: "flex",
    gap: "20px",
    alignItems: "flex-start",
  },
  mainColumn: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },

  // Banner
  banner: {
    backgroundColor: "#3DB87A",
    borderRadius: "24px",
    padding: "32px 36px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    overflow: "hidden",
  },
  bannerContent: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  bannerSubheading: {
    margin: 0,
    fontSize: "21px",
    fontWeight: "600",
    opacity: 0.9,
  },
  bannerName: {
    margin: 0,
    color: "#FFFFFF",
    fontSize: "48px",
    fontWeight: "550",
    lineHeight: 1.1,
  },
  bannerText: {
    margin: 0,
    color: "#FFFFFF",
    fontSize: "18px",
    fontWeight: "500",
    opacity: 0.9,
    maxWidth: "340px",
    lineHeight: "1.5",
  },
  bannerImage: {
    height: "210px",
    objectFit: "contain",
    marginBottom: "-43px",
  },

  // Stat cards
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "16px",
  },
  statCard: {
    backgroundColor: "#FFFFFF",
    border: "1px solid #E5E7EB",
    borderRadius: "16px",
    padding: "20px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  statIcon: {
    width: "52px",
    height: "52px",
    borderRadius: "14px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  statIconInner: {
    fontSize: "26px",
    color: "#FFFFFF",
  },
  statLabel: {
    margin: 0,
    fontSize: "14px",
    color: "#6B7280",
    fontWeight: "500",
  },
  statNumber: {
    margin: 0,
    fontSize: "36px",
    fontWeight: "600",
    color: "#111827",
  },

  // Continue / no challenges card
  continueCard: {
    backgroundColor: "var(--meras-yellow)",
    borderRadius: "20px",
    padding: "24px 28px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  continueTitle: {
    margin: "0 0 6px 0",
    fontSize: "20px",
    fontWeight: "700",
    color: "#1A1A1A",
  },
  continueText: {
    margin: 0,
    fontSize: "15px",
    color: "#333333",
  },
  exploreButton: {
    backgroundColor: "#FFFFFF",
    color: "#1A1A1A",
    border: "none",
    borderRadius: "999px",
    padding: "12px 28px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    whiteSpace: "nowrap",
  },

  // My Challenges section
  sectionTitle: {
    margin: "0 0 16px 0",
    fontSize: "20px",
    fontWeight: "700",
    color: "#111827",
  },
  challengesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap: "20px",
  },
  emptyText: {
    margin: 0,
    fontSize: "14px",
    color: "#9CA3AF",
  },

  // Recent sidebar
  recentPanel: {
    width: "260px",
    flexShrink: 0,
    backgroundColor: "#FFFFFF",
    border: "1px solid #E5E7EB",
    borderRadius: "16px",
    padding: "20px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
  },
  recentTitle: {
    margin: "0 0 16px 0",
    fontSize: "20px",
    fontWeight: "700",
    color: "#111827",
  },
  recentList: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  recentItem: {
    display: "flex",
    alignItems: "flex-start",
    gap: "12px",
  },
  recentIcon: {
    width: "36px",
    height: "36px",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  recentIconInner: {
    fontSize: "18px",
    color: "#FFFFFF",
  },
  recentLabel: {
    margin: "0 0 2px 0",
    fontSize: "14px",
    fontWeight: "600",
    color: "#111827",
  },
  recentDetail: {
    margin: 0,
    fontSize: "12px",
    color: "#6B7280",
    lineHeight: "1.4",
  },
};

export default GuideDashboard;
