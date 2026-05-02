import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  MdExtension,
  MdHourglassEmpty,
  MdEventNote,
  MdCalendarToday,
} from "react-icons/md";
import mentoring from "../../assets/Dashboard-pics/MentorDashboard.png";
import { useAuth } from "../../context/AuthContext";
import { apiGetGuideDashboard } from "../../api/auth";
import ChallengeCard from "../../components/ChallengeCard";
import { getChallengesByGuide } from "../../api/challenges";
import { apiGetSubmissionsByGuide } from "../../api/submissions";

function GuideDashboard() {
  const navigate = useNavigate();
  const { currentUser, getToken } = useAuth();
  const token = getToken()

  const [guideChallenges, setGuideChallenges] = useState([])
  const [pendingSubmissions, setPendingSubmissions] = useState([])
  const [loading, setLoading] = useState(true)
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ── fetch guide's challenges and pending submissions ──
  useEffect(() => {
    if (!currentUser?._id) return

    const fetchData = async () => {
      try {
        const [challengesData, submissionsData] = await Promise.all([
          getChallengesByGuide(currentUser._id),
          apiGetSubmissionsByGuide(token, currentUser._id),
        ])
        setGuideChallenges(challengesData || [])
        const pending = (submissionsData.submissions || []).filter(
          (s) => s.status === 'pending'
        )
        setPendingSubmissions(pending)
      } catch (err) {
        console.error('GuideDashboard fetch error:', err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [currentUser, token])

  // ── recent activity built from real data ──
  const recentActivities = [
    {
      label: "Challenges",
      detail: `You have ${guideChallenges.length} published challenge${guideChallenges.length !== 1 ? 's' : ''}`,
      color: "var(--meras-green)",
      icon: MdExtension,
    },
    {
      label: "Pending Reviews",
      detail: `${pendingSubmissions.length} submission${pendingSubmissions.length !== 1 ? 's' : ''} awaiting your review`,
      color: "var(--meras-yellow)",
      icon: MdCalendarToday,
    },
  ]

  const firstName = currentUser?.name?.split(' ')[0] || 'Guide'

  return (
    <div style={styles.page}>
      <div style={{ ...styles.mainLayout, flexDirection: isMobile ? "column" : "row" }}>

        {/* Left column */}
        <div style={styles.mainColumn}>

          {/* Banner */}
          <div style={styles.banner}>
            <div style={styles.bannerContent}>
              <h1 style={{ ...styles.bannerName, fontSize: isMobile ? "32px" : "48px" }}>
                Hi, {firstName}
              </h1>
              <p style={styles.bannerText}>
                Keep sharing your expertise and guiding the next generation.
              </p>
            </div>
            {!isMobile && <img src={mentoring} alt="illustration" style={styles.bannerImage} />}
          </div>

          {/* Stat Cards */}
          <div style={{ ...styles.statsGrid, gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(3, 1fr)" }}>
            <div style={styles.statCard}>
              <div style={{ ...styles.statIcon, backgroundColor: "var(--meras-green)" }}>
                <MdExtension style={styles.statIconInner} />
              </div>
              <p style={styles.statLabel}>Your Challenges</p>
              <h2 style={styles.statNumber}>
                {loading ? '—' : guideChallenges.length}
              </h2>
            </div>
            <div style={styles.statCard}>
              <div style={{ ...styles.statIcon, backgroundColor: "var(--meras-yellow)" }}>
                <MdHourglassEmpty style={styles.statIconInner} />
              </div>
              <p style={styles.statLabel}>Pending Reviews</p>
              <h2 style={styles.statNumber}>
                {loading ? '—' : pendingSubmissions.length}
              </h2>
            </div>
            <div style={styles.statCard}>
              <div style={{ ...styles.statIcon, backgroundColor: "var(--meras-gray)" }}>
                <MdEventNote style={styles.statIconInner} />
              </div>
              <p style={styles.statLabel}>Upcoming Sessions</p>
              <h2 style={styles.statNumber}>—</h2>
            </div>
          </div>

          {/* CTA card */}
          <div style={styles.continueCard}>
            <div>
              <h2 style={styles.continueTitle}>Check out your upcoming submissions & sessions</h2>
              <p style={styles.continueText}>Remember to give honest and insightful feedback!</p>
            </div>
            <button style={styles.exploreButton} onClick={() => navigate("/guide/grading")}>
              Check →
            </button>
          </div>

          {/* My Challenges */}
          <div>
            <h2 style={styles.sectionTitle}>My Challenges</h2>
            {loading ? (
              <p style={styles.emptyText}>Loading challenges...</p>
            ) : guideChallenges.length === 0 ? (
              <p style={styles.emptyText}>You haven't created any challenges yet.</p>
            ) : (
              <div style={styles.challengesGrid}>
                {guideChallenges.map((challenge) => (
                  <ChallengeCard
                    key={challenge._id}
                    challengeName={challenge.title}
                    description={challenge.description}
                    major={challenge.major}
                    buttonLabel="Edit"
                    onMoreDetails={() => navigate(`/guide/challenges/edit/${challenge._id}`)}
                  />
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Recent sidebar */}
        <div style={{ ...styles.recentPanel, width: isMobile ? "100%" : "260px" }}>
          <h2 style={styles.recentTitle}>Recent</h2>
          <div style={styles.recentList}>
            {recentActivity.length > 0 ? recentActivity.map((item, index) => {
              const meta = activityMeta[item.type] || { color: "var(--meras-gray)", Icon: MdExtension };
              const Icon = meta.Icon;
              return (
                <div key={index} style={styles.recentItem}>
                  <div style={{ ...styles.recentIcon, backgroundColor: meta.color }}>
                    <Icon style={styles.recentIconInner} />
                  </div>
                  <div>
                    <p style={styles.recentLabel}>{item.label}</p>
                    <p style={styles.recentDetail}>{item.detail}</p>
                  </div>
                </div>
              );
            }) : (
              <p style={{ fontSize: "13px", color: "#9CA3AF", margin: 0 }}>No recent activity yet.</p>
            )}
          </div>

          {/* Pending submissions preview */}
          {!loading && pendingSubmissions.length > 0 && (
            <div style={{ marginTop: '20px' }}>
              <h3 style={{ margin: '0 0 12px 0', fontSize: '15px', fontWeight: '700', color: '#111827' }}>
                Pending Submissions
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {pendingSubmissions.slice(0, 3).map((sub) => (
                  <div key={sub._id} style={{ padding: '10px 12px', borderRadius: '10px', backgroundColor: '#f9fafb', border: '1px solid #e5e7eb' }}>
                    <p style={{ margin: '0 0 2px 0', fontSize: '13px', fontWeight: '600', color: '#111827' }}>
                      {sub.explorerId?.name || 'Explorer'}
                    </p>
                    <p style={{ margin: '0 0 2px 0', fontSize: '12px', color: '#374151' }}>
                      {sub.challengeId?.title || 'Challenge'}
                    </p>
                    <p style={{ margin: 0, fontSize: '11px', color: '#6b7280' }}>
                      {sub.challengeId?.major} · {new Date(sub.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
                  </div>
                ))}
                {pendingSubmissions.length > 3 && (
                  <button
                    onClick={() => navigate('/guide/grading')}
                    style={{ background: 'none', border: 'none', color: 'var(--meras-green)', fontSize: '13px', fontWeight: '600', cursor: 'pointer', textAlign: 'left', padding: 0 }}
                  >
                    View all {pendingSubmissions.length} →
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

const styles = {
  page: { padding: "8px", fontFamily: "Plus Jakarta Sans, sans-serif" },
  mainLayout: { display: "flex", gap: "20px", alignItems: "flex-start" },
  mainColumn: { flex: 1, display: "flex", flexDirection: "column", gap: "20px" },
  banner: { backgroundColor: "#3DB87A", borderRadius: "24px", padding: "32px 36px", display: "flex", justifyContent: "space-between", alignItems: "flex-end", overflow: "hidden" },
  bannerContent: { display: "flex", flexDirection: "column", gap: "15px" },
  bannerName: { margin: 0, color: "#FFFFFF", fontSize: "48px", fontWeight: "550", lineHeight: 1.1 },
  bannerText: { margin: 0, color: "#FFFFFF", fontSize: "18px", fontWeight: "500", opacity: 0.9, maxWidth: "340px", lineHeight: "1.5" },
  bannerImage: { height: "210px", objectFit: "contain", marginBottom: "-43px" },
  statsGrid: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" },
  statCard: { backgroundColor: "#FFFFFF", border: "1px solid #E5E7EB", borderRadius: "16px", padding: "20px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)", display: "flex", flexDirection: "column", gap: "10px" },
  statIcon: { width: "52px", height: "52px", borderRadius: "14px", display: "flex", alignItems: "center", justifyContent: "center" },
  statIconInner: { fontSize: "26px", color: "#FFFFFF" },
  statLabel: { margin: 0, fontSize: "14px", color: "#6B7280", fontWeight: "500" },
  statNumber: { margin: 0, fontSize: "36px", fontWeight: "600", color: "#111827" },
  continueCard: { backgroundColor: "var(--meras-yellow)", borderRadius: "20px", padding: "24px 28px", display: "flex", justifyContent: "space-between", alignItems: "center" },
  continueTitle: { margin: "0 0 6px 0", fontSize: "20px", fontWeight: "700", color: "#1A1A1A" },
  continueText: { margin: 0, fontSize: "15px", color: "#333333" },
  exploreButton: { backgroundColor: "#FFFFFF", color: "#1A1A1A", border: "none", borderRadius: "999px", padding: "12px 28px", fontSize: "16px", fontWeight: "600", cursor: "pointer", whiteSpace: "nowrap" },
  sectionTitle: { margin: "0 0 16px 0", fontSize: "20px", fontWeight: "700", color: "#111827" },
  challengesGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "20px" },
  emptyText: { margin: 0, fontSize: "14px", color: "#9CA3AF" },
  recentPanel: { width: "260px", flexShrink: 0, backgroundColor: "#FFFFFF", border: "1px solid #E5E7EB", borderRadius: "16px", padding: "20px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" },
  recentTitle: { margin: "0 0 16px 0", fontSize: "20px", fontWeight: "700", color: "#111827" },
  recentList: { display: "flex", flexDirection: "column", gap: "16px" },
  recentItem: { display: "flex", alignItems: "flex-start", gap: "12px" },
  recentIcon: { width: "36px", height: "36px", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },
  recentIconInner: { fontSize: "18px", color: "#FFFFFF" },
  recentLabel: { margin: "0 0 2px 0", fontSize: "14px", fontWeight: "600", color: "#111827" },
  recentDetail: { margin: 0, fontSize: "12px", color: "#6B7280", lineHeight: "1.4" },
};

export default GuideDashboard;