import { useState, useEffect } from "react";
import { MdStar, MdStarBorder, MdClose, MdVideoCall } from "react-icons/md";
import { useAuth } from "../../context/AuthContext";
import { apiGetSubmissionsByGuide, apiGradeSubmission } from "../../api/submissions";

const DAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function buildWeek(anchor) {
  const day = anchor.getDay();
  const monday = new Date(anchor);
  monday.setDate(anchor.getDate() - ((day + 6) % 7));
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return d;
  });
}

function isSameDay(a, b) {
  return a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();
}

function FilePreview({ sub }) {
  return (
    <div style={s.submissionBox}>
      {sub.fileUrl
        ? <a href={`http://localhost:5001${sub.fileUrl}`} target="_blank" rel="noreferrer" style={{ color: '#3DB87A', fontWeight: '600', fontSize: '14px' }}>
            📎 View Uploaded File
          </a>
        : <p style={s.submissionFile}>📎 No file available</p>
      }
    </div>
  );
}

const TEXT_PREVIEW_LIMIT = 150;
function TextPreview({ sub, expanded, onToggle }) {
  const full    = sub.textAnswer ?? "";
  const isLong  = full.length > TEXT_PREVIEW_LIMIT;
  const preview = isLong && !expanded ? full.slice(0, TEXT_PREVIEW_LIMIT) + "…" : full;
  return (
    <div style={s.submissionBox}>
      <p style={s.answerLabel}>Text Answer</p>
      <p style={{ ...s.answerText, whiteSpace: "pre-wrap" }}>{preview}</p>
      {isLong && (
        <div style={s.expandRow}>
          <button style={s.expandPill} onClick={onToggle}>
            {expanded ? "See less" : "Expand"}
          </button>
        </div>
      )}
    </div>
  );
}

function CanvasPreview({ sub, expanded, onToggle }) {
  return (
    <div style={s.submissionBox}>
      <p style={s.answerLabel}>Canvas Drawing</p>
      <div style={{ ...s.canvasWrap, maxHeight: expanded ? "none" : "140px" }}>
        <img src={`http://localhost:5001${sub.canvasUrl}`} alt="Canvas submission" style={s.canvasImg} />
      </div>
      <div style={s.expandRow}>
        <button style={s.expandPill} onClick={onToggle}>
          {expanded ? "See less" : "Expand"}
        </button>
      </div>
    </div>
  );
}

const majorColors = {
  'software engineering': '#3DB87A',
  'computer science': '#3DB87A',
  'data science': '#F59E0B',
  'mechanical engineering': '#6B7280',
  'electrical engineering': '#3B82F6',
  'business administration': '#F59E0B',
}

function getMajorColor(major) {
  return majorColors[major?.toLowerCase()] || '#3DB87A'
}

function GradingView() {
  const { currentUser, getToken } = useAuth()
  const token = getToken()

  const [submissions, setSubmissions] = useState([])
  const [loading, setLoading] = useState(true)

  const [selectedSubmission, setSelectedSubmission] = useState(null)
  const [ratings, setRatings]     = useState({})
  const [feedbacks, setFeedbacks] = useState({})
  const [hovered, setHovered]     = useState(0)
  const [grading, setGrading]     = useState(false)
  const [expandedAnswer, setExpandedAnswer] = useState(false)

  const TODAY = new Date()
  const [week]       = useState(() => buildWeek(TODAY))
  const [selectedDay, setSelectedDay] = useState(TODAY)

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600)
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 600)
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // ── fetch real submissions ──
  useEffect(() => {
    if (!currentUser?._id) return
    const fetchSubmissions = async () => {
      try {
        const data = await apiGetSubmissionsByGuide(token, currentUser._id)
        setSubmissions(data.submissions || [])
      } catch (err) {
        console.error('fetchSubmissions error:', err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchSubmissions()
  }, [currentUser, token])

  const pendingSubmissions = submissions.filter(s => s.status === 'pending')

  const currentRating   = selectedSubmission ? (ratings[selectedSubmission._id]   ?? 0) : 0
  const currentFeedback = selectedSubmission ? (feedbacks[selectedSubmission._id] ?? "") : ""
  const canSubmit = currentRating > 0 && currentFeedback.trim().length > 0

  function openPanel(sub) {
    setSelectedSubmission(sub)
    setExpandedAnswer(false)
  }

  function closePanel() {
    setSelectedSubmission(null)
    setExpandedAnswer(false)
  }

  // ── grade submission ──
  async function handleSubmitGrade() {
    if (!canSubmit) return
    setGrading(true)
    try {
      await apiGradeSubmission(token, selectedSubmission._id, {
        stars: currentRating,
        feedback: currentFeedback,
      })
      // update local state — move from pending to graded
      setSubmissions(prev =>
        prev.map(s =>
          s._id === selectedSubmission._id
            ? { ...s, status: 'graded', stars: currentRating, feedback: currentFeedback }
            : s
        )
      )
      closePanel()
    } catch (err) {
      alert(err.message)
    } finally {
      setGrading(false)
    }
  }

  function renderSubmissionPreview(sub) {
    switch (sub.submissionType) {
      case "text":   return <TextPreview   sub={sub} expanded={expandedAnswer} onToggle={() => setExpandedAnswer(e => !e)} />
      case "canvas": return <CanvasPreview sub={sub} expanded={expandedAnswer} onToggle={() => setExpandedAnswer(e => !e)} />
      case "file":
      default:       return <FilePreview   sub={sub} />
    }
  }

  return (
    <div style={s.page}>

      {/* Pending Submissions */}
      <section style={s.section}>
        <h2 style={s.sectionTitle}>Pending Submissions</h2>
        <p style={s.sectionSub}>{pendingSubmissions.length} awaiting your review</p>

        {loading ? (
          <p style={{ color: '#9CA3AF', fontSize: '14px' }}>Loading submissions...</p>
        ) : pendingSubmissions.length === 0 ? (
          <p style={{ color: '#9CA3AF', fontSize: '14px' }}>No pending submissions.</p>
        ) : (
          <div style={s.submissionList}>
            {pendingSubmissions.map(sub => (
              <div
                key={sub._id}
                style={{
                  ...s.submissionRow,
                  borderLeftColor: getMajorColor(sub.challengeId?.major),
                  flexDirection: isMobile ? "column" : "row",
                  alignItems: isMobile ? "flex-start" : "center",
                }}
              >
                <div style={s.subInfo}>
                  <p style={s.subStudent}>{sub.explorerId?.name || 'Explorer'}</p>
                  <p style={s.subChallenge}>{sub.challengeId?.title || 'Challenge'}</p>
                  <p style={s.subMeta}>
                    {sub.challengeId?.major} · Submitted {new Date(sub.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </p>
                </div>
                <div style={s.subRight}>
                  <button style={s.gradeBtn} onClick={() => openPanel(sub)}>Grade</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Upcoming Sessions — still placeholder until sessions API is connected */}
      <section style={s.section}>
        <h2 style={s.sectionTitle}>Upcoming Sessions</h2>
        <p style={s.sectionSub}>Select a day to see booked sessions</p>

        <div style={{ ...s.weekStrip, flexWrap: isMobile ? "wrap" : "nowrap" }}>
          {week.map((day, i) => {
            const isToday    = isSameDay(day, TODAY)
            const isSelected = isSameDay(day, selectedDay)
            return (
              <button key={i} style={{ ...s.dayBtn, ...(isSelected ? s.dayBtnActive : {}) }} onClick={() => setSelectedDay(day)}>
                <span style={{ ...s.dayLabel,  color: isSelected ? "#fff" : "#6B7280" }}>{DAY_LABELS[i]}</span>
                <span style={{ ...s.dayNumber, color: isSelected ? "#fff" : "#111827", fontWeight: isToday ? 700 : 500 }}>{day.getDate()}</span>
              </button>
            )
          })}
        </div>

        <div style={s.emptyState}>
          <p style={s.emptyText}>No sessions scheduled for this day.</p>
        </div>
      </section>

      {/* Grading Panel */}
      {selectedSubmission && (
        <div style={s.overlay} onClick={closePanel}>
          <div style={{ ...s.panel, padding: isMobile ? "20px 16px" : "32px" }} onClick={e => e.stopPropagation()}>

            <div style={s.panelHeader}>
              <div>
                <h3 style={s.panelTitle}>{selectedSubmission.challengeId?.title}</h3>
                <p style={s.panelSub}>
                  by {selectedSubmission.explorerId?.name} · {new Date(selectedSubmission.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </p>
              </div>
              <button style={s.closeBtn} onClick={closePanel}><MdClose size={20} /></button>
            </div>

            {renderSubmissionPreview(selectedSubmission)}

            {/* Rating */}
            <div style={s.ratingSection}>
              <p style={s.fieldLabel}>Rating</p>
              <div style={s.stars}>
                {[1, 2, 3, 4, 5].map(star => {
                  const filled = star <= (hovered || currentRating)
                  return (
                    <span
                      key={star}
                      style={s.star}
                      onMouseEnter={() => setHovered(star)}
                      onMouseLeave={() => setHovered(0)}
                      onClick={() => setRatings(prev => ({ ...prev, [selectedSubmission._id]: star }))}
                    >
                      {filled ? <MdStar size={32} color="#F59E0B" /> : <MdStarBorder size={32} color="#D1D5DB" />}
                    </span>
                  )
                })}
                {currentRating > 0 && <span style={s.ratingLabel}>{currentRating} / 5</span>}
              </div>
            </div>

            {/* Feedback */}
            <div style={s.feedbackSection}>
              <p style={s.fieldLabel}>Feedback</p>
              <textarea
                style={s.textarea}
                placeholder="Write your feedback for the student…"
                value={currentFeedback}
                onChange={e => setFeedbacks(prev => ({ ...prev, [selectedSubmission._id]: e.target.value }))}
                rows={4}
              />
            </div>

            <div style={s.panelActions}>
              <button style={s.cancelBtn} onClick={closePanel}>Cancel</button>
              <button
                style={{ ...s.submitBtn, opacity: canSubmit ? 1 : 0.45, cursor: canSubmit ? "pointer" : "not-allowed" }}
                disabled={!canSubmit || grading}
                onClick={handleSubmitGrade}
              >
                {grading ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

const s = {
  page: { padding: "8px", fontFamily: "Plus Jakarta Sans, sans-serif", display: "flex", flexDirection: "column", gap: "28px" },
  section: { backgroundColor: "#FFFFFF", borderRadius: "20px", padding: "28px 28px 24px", border: "1px solid #E5E7EB", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" },
  sectionTitle: { margin: "0 0 4px 0", fontSize: "20px", fontWeight: "700", color: "#111827" },
  sectionSub: { margin: "0 0 20px 0", fontSize: "14px", color: "#6B7280" },
  submissionList: { display: "flex", flexDirection: "column", gap: "12px" },
  submissionRow: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", borderRadius: "14px", borderLeft: "4px solid", backgroundColor: "#F9FAFB", gap: "16px" },
  subInfo: { display: "flex", flexDirection: "column", gap: "3px" },
  subStudent: { margin: 0, fontSize: "15px", fontWeight: "600", color: "#111827" },
  subChallenge: { margin: 0, fontSize: "14px", color: "#374151" },
  subMeta: { margin: 0, fontSize: "12px", color: "#9CA3AF" },
  subRight: { flexShrink: 0 },
  gradeBtn: { backgroundColor: "var(--meras-green)", color: "#FFFFFF", border: "none", borderRadius: "999px", padding: "9px 22px", fontSize: "14px", fontWeight: "600", cursor: "pointer" },
  gradedBadge: { display: "inline-block", backgroundColor: "#D1FAE5", color: "#065F46", borderRadius: "999px", padding: "6px 16px", fontSize: "13px", fontWeight: "600" },
  weekStrip: { display: "flex", gap: "8px", marginBottom: "20px" },
  dayBtn: { flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", padding: "10px 4px", borderRadius: "14px", border: "1px solid #E5E7EB", backgroundColor: "#F9FAFB", cursor: "pointer", minWidth: 0 },
  dayBtnActive: { backgroundColor: "#3DB87A", border: "1px solid #3DB87A" },
  dayLabel: { fontSize: "11px", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.05em" },
  dayNumber: { fontSize: "18px" },
  dot: { width: "5px", height: "5px", borderRadius: "50%" },
  emptyState: { textAlign: "center", padding: "32px 0" },
  emptyText: { margin: 0, fontSize: "14px", color: "#9CA3AF" },
  overlay: { position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.35)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 200, padding: "24px" },
  panel: { backgroundColor: "#FFFFFF", borderRadius: "24px", padding: "32px", width: "100%", maxWidth: "540px", maxHeight: "90vh", overflowY: "auto", boxShadow: "0 20px 50px rgba(0,0,0,0.13)", display: "flex", flexDirection: "column", gap: "20px" },
  panelHeader: { display: "flex", justifyContent: "space-between", alignItems: "flex-start" },
  panelTitle: { margin: "0 0 4px 0", fontSize: "20px", fontWeight: "700", color: "#111827" },
  panelSub: { margin: 0, fontSize: "13px", color: "#6B7280" },
  closeBtn: { background: "none", border: "none", cursor: "pointer", color: "#9CA3AF", padding: "4px", display: "flex", alignItems: "center" },
  submissionBox: { backgroundColor: "#F9FAFB", border: "1px solid #E5E7EB", borderRadius: "14px", padding: "16px 18px", display: "flex", flexDirection: "column", gap: "10px" },
  submissionFile: { margin: 0, fontSize: "14px", fontWeight: "600", color: "#111827" },
  submissionNote: { margin: 0, fontSize: "13px", color: "#6B7280", fontStyle: "italic", lineHeight: "1.5" },
  answerLabel: { margin: 0, fontSize: "13px", fontWeight: "700", color: "#111827" },
  answerText: { margin: 0, fontSize: "13px", color: "#374151", lineHeight: "1.65" },
  expandRow: { display: "flex", justifyContent: "flex-end" },
  expandPill: { backgroundColor: "#F5B800", color: "#111827", border: "none", borderRadius: "999px", padding: "4px 16px", fontSize: "13px", fontWeight: "600", cursor: "pointer" },
  canvasWrap: { overflow: "hidden", borderRadius: "8px", transition: "max-height 0.25s ease" },
  canvasImg: { width: "100%", height: "auto", display: "block", borderRadius: "8px" },
  ratingSection: { display: "flex", flexDirection: "column", gap: "8px" },
  fieldLabel: { margin: 0, fontSize: "13px", fontWeight: "600", color: "#374151", textTransform: "uppercase", letterSpacing: "0.06em" },
  stars: { display: "flex", alignItems: "center", gap: "4px" },
  star: { cursor: "pointer", display: "flex", alignItems: "center" },
  ratingLabel: { marginLeft: "8px", fontSize: "14px", fontWeight: "600", color: "#F59E0B" },
  feedbackSection: { display: "flex", flexDirection: "column", gap: "8px" },
  textarea: { width: "100%", padding: "12px 14px", borderRadius: "12px", border: "1px solid #D1D5DB", fontSize: "14px", color: "#111827", resize: "vertical", outline: "none", fontFamily: "Plus Jakarta Sans, sans-serif", lineHeight: "1.5", boxSizing: "border-box" },
  panelActions: { display: "flex", justifyContent: "flex-end", gap: "12px" },
  cancelBtn: { backgroundColor: "#F3F4F6", color: "#374151", border: "none", borderRadius: "999px", padding: "11px 24px", fontSize: "14px", fontWeight: "600", cursor: "pointer" },
  submitBtn: { backgroundColor: "#3DB87A", color: "#FFFFFF", border: "none", borderRadius: "999px", padding: "11px 28px", fontSize: "14px", fontWeight: "600", transition: "opacity 0.15s ease" },
}

export default GradingView