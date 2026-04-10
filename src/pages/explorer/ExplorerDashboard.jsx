import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MdExtension,
  MdHourglassEmpty,
  MdEventNote,
  MdCalendarToday,
  MdAutoAwesome,
} from "react-icons/md";
import { MdStar, MdStarBorder, MdClose } from "react-icons/md";
import { useAuth } from "../../context/AuthContext";
import learningGirl from "../../assets/Dashboard-pics/Learning-girl-1.png";
import learningBoy from "../../assets/Dashboard-pics/Learning-boy-1.png";
import CompletedChallenges from "./CompletedChallenges";
import { mockCompletedChallenges } from '../../data/mockData'

const TEXT_PREVIEW_LIMIT = 150;





const recentActivities = [
  {
    label: "Challenges",
    detail: "Completed 'Build a Simple Calculator'",
    color: "var(--meras-green)",
    icon: MdExtension,
  },
  {
    label: "Bookings",
    detail: "Booked a mentorship session with Rana Abdullah",
    color: "var(--meras-yellow)",
    icon: MdCalendarToday,
  },
  {
    label: "Finished",
    detail: "Completed compass quiz",
    color: "var(--meras-orange)",
    icon: MdAutoAwesome,
  },
];

function ExplorerDashboard() {
  const navigate = useNavigate();
  const { currentUser, login } = useAuth();
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [expanded, setExpanded] = useState(false);

  function openFeedback(challenge) {
    setSelectedChallenge(challenge);
    setExpanded(false);
  }
  function closeFeedback() {
    setSelectedChallenge(null);
    setExpanded(false);
  }

  // Activating this soon when we intergate the database for better usage
  // const chosenImg = currentUser.gender === "female" ? learningGirl : learningBoy;

  return (
    <div style={styles.page}>
      <div style={styles.mainLayout}>

        {/* Left column */}
        <div style={styles.mainColumn}>

          {/* Banner */}
          <div style={styles.banner}>
            <div style={styles.bannerContent}>
             
              <h1 style={styles.bannerName}>Hi, Lamees</h1>
              <p style={styles.bannerText}>
                Keep exploring your path and continue building your future.
              </p>
            </div>
            <img src={learningGirl} alt="illustration" style={styles.bannerImage} />
          </div>

          {/* Stat Cards */}
          <div style={styles.statsGrid}>
            <div style={styles.statCard}>
              <div style={{ ...styles.statIcon, backgroundColor: "var(--meras-green)" }}>
                <MdExtension style={styles.statIconInner} />
              </div>
              <p style={styles.statLabel}>Challenges completed</p>
              <h2 style={styles.statNumber}>2</h2>
            </div>
            <div style={styles.statCard}>
              <div style={{ ...styles.statIcon, backgroundColor: "var(--meras-yellow)" }}>
                <MdHourglassEmpty style={styles.statIconInner} />
              </div>
              <p style={styles.statLabel}>Challenges in progress</p>
              <h2 style={styles.statNumber}>1</h2>
            </div>
            <div style={styles.statCard}>
              <div style={{ ...styles.statIcon, backgroundColor: "var(--meras-gray)" }}>
                <MdEventNote style={styles.statIconInner} />
              </div>
              <p style={styles.statLabel}>Sessions booked</p>
              <h2 style={styles.statNumber}>3</h2>
            </div>
          </div>

          {/* No challenges card */}
          <div style={styles.continueCard}>
            <div>
              <h2 style={styles.continueTitle}>No challenges resumed to continue!</h2>
              <p style={styles.continueText}>Explore and start challenges!</p>
            </div>
            <button style={styles.exploreButton} onClick={() => navigate("/explorer/challengeCatalog")}>
              Explore
            </button>
          </div>

          <CompletedChallenges
            challenges={mockCompletedChallenges}
            onViewFeedback={openFeedback}
          />

        </div>

        {/* Recent sidebar */}
        <div style={styles.recentPanel}>
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
      {/* ── Feedback modal ─────────────────────────────────── */}
      {selectedChallenge && (
        <div style={m.overlay} onClick={closeFeedback}>
          <div style={m.panel} onClick={e => e.stopPropagation()}>

            {/* Header */}
            <div style={m.header}>
              <div>
                <h3 style={m.title}>{selectedChallenge.title}</h3>
                <p style={m.sub}>
                  graded by {selectedChallenge.gradedBy} · {selectedChallenge.gradedAt}
                </p>
              </div>
              <button style={m.closeIcon} onClick={closeFeedback}>
                <MdClose size={20} />
              </button>
            </div>

            {/* Student's answer */}
            {selectedChallenge.submissionType === "text" && (() => {
              const full    = selectedChallenge.textAnswer ?? "";
              const isLong  = full.length > TEXT_PREVIEW_LIMIT;
              const preview = isLong && !expanded ? full.slice(0, TEXT_PREVIEW_LIMIT) + "…" : full;
              return (
                <div style={m.answerBox}>
                  <p style={m.answerLabel}>Your Answer</p>
                  <p style={{ ...m.answerText, whiteSpace: "pre-wrap" }}>{preview}</p>
                  {isLong && (
                    <div style={m.expandRow}>
                      <button style={m.expandPill} onClick={() => setExpanded(e => !e)}>
                        {expanded ? "See less" : "Expand"}
                      </button>
                    </div>
                  )}
                </div>
              );
            })()}

            {selectedChallenge.submissionType === "file" && (
              <div style={m.answerBox}>
                <p style={m.answerLabel}>Your Answer</p>
                <p style={m.fileText}>📎 {selectedChallenge.file}</p>
                {selectedChallenge.note && (
                  <p style={m.noteText}>"{selectedChallenge.note}"</p>
                )}
              </div>
            )}

            {selectedChallenge.submissionType === "canvas" && (() => {
              return (
                <div style={m.answerBox}>
                  <p style={m.answerLabel}>Your Answer</p>
                  <div style={{ ...m.canvasWrap, maxHeight: expanded ? "none" : "140px" }}>
                    <img src={selectedChallenge.canvasImage} alt="canvas submission" style={m.canvasImg} />
                  </div>
                  <div style={m.expandRow}>
                    <button style={m.expandPill} onClick={() => setExpanded(e => !e)}>
                      {expanded ? "See less" : "Expand"}
                    </button>
                  </div>
                </div>
              );
            })()}

            {/* Rating (read-only) */}
            <div style={m.section}>
              <p style={m.fieldLabel}>RATING</p>
              <div style={m.stars}>
                {[1, 2, 3, 4, 5].map(star => (
                  <span key={star} style={{ display: "flex" }}>
                    {star <= selectedChallenge.rating
                      ? <MdStar size={32} color="#F59E0B" />
                      : <MdStarBorder size={32} color="#D1D5DB" />}
                  </span>
                ))}
              </div>
            </div>

            {/* Feedback (read-only) */}
            <div style={m.section}>
              <p style={m.fieldLabel}>FEEDBACK</p>
              <div style={m.feedbackBox}>
                <p style={m.feedbackText}>{selectedChallenge.feedbackText}</p>
              </div>
            </div>

            <div style={m.actions}>
              <button style={m.closeBtn} onClick={closeFeedback}>Close</button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

// Modal styles
const m = {
  overlay: { position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.35)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 200, padding: "24px" },
  panel: { backgroundColor: "#FFFFFF", borderRadius: "24px", padding: "32px", width: "100%", maxWidth: "540px", maxHeight: "90vh", overflowY: "auto", boxShadow: "0 20px 50px rgba(0,0,0,0.13)", display: "flex", flexDirection: "column", gap: "20px" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "flex-start" },
  title: { margin: "0 0 4px 0", fontSize: "20px", fontWeight: "700", color: "#111827" },
  sub: { margin: 0, fontSize: "13px", color: "#6B7280" },
  closeIcon: { background: "none", border: "none", cursor: "pointer", color: "#9CA3AF", padding: "4px", display: "flex", alignItems: "center" },
  answerBox: { backgroundColor: "#F9FAFB", border: "1px solid #E5E7EB", borderRadius: "14px", padding: "16px 18px", display: "flex", flexDirection: "column", gap: "10px" },
  answerLabel: { margin: 0, fontSize: "13px", fontWeight: "700", color: "#111827" },
  answerText: { margin: 0, fontSize: "13px", color: "#374151", lineHeight: "1.65" },
  fileText: { margin: 0, fontSize: "14px", fontWeight: "600", color: "#111827" },
  noteText: { margin: 0, fontSize: "13px", color: "#6B7280", fontStyle: "italic", lineHeight: "1.5" },
  canvasWrap: { overflow: "hidden", borderRadius: "8px", transition: "max-height 0.25s ease" },
  canvasImg: { width: "100%", height: "auto", display: "block", borderRadius: "8px" },
  expandRow: { display: "flex", justifyContent: "flex-end" },
  expandPill: { backgroundColor: "#F5B800", color: "#111827", border: "none", borderRadius: "999px", padding: "4px 16px", fontSize: "13px", fontWeight: "600", cursor: "pointer" },
  section: { display: "flex", flexDirection: "column", gap: "8px" },
  fieldLabel: { margin: 0, fontSize: "13px", fontWeight: "600", color: "#374151", textTransform: "uppercase", letterSpacing: "0.06em" },
  stars: { display: "flex", alignItems: "center", gap: "4px" },
  feedbackBox: { backgroundColor: "#F9FAFB", border: "1px solid #E5E7EB", borderRadius: "12px", padding: "14px 16px" },
  feedbackText: { margin: 0, fontSize: "14px", color: "#374151", lineHeight: "1.6" },
  actions: { display: "flex", justifyContent: "flex-end" },
  closeBtn: { backgroundColor: "#F3F4F6", color: "#374151", border: "none", borderRadius: "999px", padding: "11px 28px", fontSize: "14px", fontWeight: "600", cursor: "pointer" },
};

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

  // Continue
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

export default ExplorerDashboard;
