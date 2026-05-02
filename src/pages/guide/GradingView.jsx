import { useState, useEffect } from "react";
import { MdStar, MdStarBorder, MdClose, MdVideoCall } from "react-icons/md";
import { useAuth } from "../../context/AuthContext";
import { apiGetGuideSubmissions, apiGradeSubmission, apiGetGuideSessions } from "../../api/guide";

const TODAY = new Date();
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
const DAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
function isSameDay(a, b) {
  return a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();
}


function FilePreview({ sub }) {
  return (
    <div style={s.submissionBox}>
      <p style={s.submissionFile}>📎 {sub.file}</p>
      {sub.note && <p style={s.submissionNote}>"{sub.note}"</p>}
    </div>
  );
}

// 2. TEXT submission – collapsible text area.
// Collapsed: shows ~150 chars + "Expand" pill.
// Expanded:  shows full text (with newlines preserved) + "See less" pill.
const TEXT_PREVIEW_LIMIT = 150;
function TextPreview({ sub, expanded, onToggle }) {
  const full     = sub.textAnswer ?? "";
  const isLong   = full.length > TEXT_PREVIEW_LIMIT;
  const preview  = isLong && !expanded ? full.slice(0, TEXT_PREVIEW_LIMIT) + "…" : full;

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

// 3. CANVAS submission – shows the drawing as an <img>.
// Collapsed: fixed-height container, image cropped, "Expand" pill.
// Expanded:  full image shown, "See less" pill.
//
// How this works end-to-end (explained for the dev):
// • The student draws on an HTML5 <canvas> element in the Explorer workspace.
// • When they submit, the app calls `canvas.toDataURL("image/png")`, which
//   serialises every pixel into a base64-encoded PNG string (a long data: URL).
// • That string is stored in the database as `submission.canvasImage`.
// • Here, we just render it with <img src={sub.canvasImage}> — the browser
//   decodes it identically to any other PNG. No file upload, no CDN needed.
// • The mock below uses an inline SVG data-URI so we get a realistic preview
//   without needing a real file.
function CanvasPreview({ sub, expanded, onToggle }) {
  return (
    <div style={s.submissionBox}>
      <p style={s.answerLabel}>Canvas Drawing</p>
      <div style={{ ...s.canvasWrap, maxHeight: expanded ? "none" : "140px" }}>
        <img
          src={sub.canvasImage}
          alt="Student canvas submission"
          style={s.canvasImg}
        />
      </div>
      <div style={s.expandRow}>
        <button style={s.expandPill} onClick={onToggle}>
          {expanded ? "See less" : "Expand"}
        </button>
      </div>
    </div>
  );
}

function GradingView() {
  const { currentUser } = useAuth();
  const [submissions, setSubmissions] = useState([]);
  const [sessions, setSessions]       = useState([]);

  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [ratings, setRatings]       = useState({});
  const [feedbacks, setFeedbacks]   = useState({});
  const [hovered, setHovered]       = useState(0);
  const [submitted, setSubmitted]   = useState({});
  const [expandedAnswer, setExpandedAnswer] = useState(false);

  const [week]         = useState(() => buildWeek(TODAY));
  const [selectedDay, setSelectedDay] = useState(TODAY);

  useEffect(() => {
    if (!currentUser?._id) return;

    apiGetGuideSubmissions(currentUser._id)
      .then(({ submissions: raw }) => {
        setSubmissions(raw.map(s => ({
          id: s._id,
          student: s.explorerId?.name || s.explorerId?.email || 'Unknown',
          challenge: s.challengeId?.title || 'Unknown challenge',
          majorColor: '#3DB87A',
          submittedAt: new Date(s.createdAt).toLocaleDateString(),
          submissionType: s.submissionType,
          file: s.fileUrl,
          textAnswer: s.textAnswer,
          canvasImage: s.canvasUrl ? `http://localhost:5001${s.canvasUrl}` : '',
          status: s.status,
        })));
      })
      .catch(console.error);

    apiGetGuideSessions()
      .then(({ sessions: raw }) => {
        setSessions(raw.map(s => ({
          id: s._id,
          date: new Date(s.slot),
          student: s.explorerEmail,
          topic: s.topic,
          time: new Date(s.slot).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
          meetingLink: s.meetingLink || '',
        })));
      })
      .catch(console.error);
  }, [currentUser]);

  // The week strip (7 day buttons in a flex row) overflows on narrow phones.
  // Submission rows also need their right-side button to move below on mobile.
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 600);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const sessionsForDay = sessions.filter(s => isSameDay(s.date, selectedDay));

  const currentRating   = selectedSubmission ? (ratings[selectedSubmission.id]   ?? 0) : 0;
  const currentFeedback = selectedSubmission ? (feedbacks[selectedSubmission.id] ?? "") : "";
  const canSubmit = currentRating > 0 && currentFeedback.trim().length > 0;

  function openPanel(sub) {
    setSelectedSubmission(sub);
    setExpandedAnswer(false); // always start collapsed
  }

  function closePanel() {
    setSelectedSubmission(null);
    setExpandedAnswer(false);
  }

  async function handleSubmitGrade() {
    if (!canSubmit) return;
    try {
      await apiGradeSubmission(selectedSubmission.id, {
        stars: currentRating,
        feedback: currentFeedback,
      });
      setSubmitted(prev => ({ ...prev, [selectedSubmission.id]: true }));
      closePanel();
    } catch (err) {
      console.error('Grade submission failed:', err.message);
    }
  }

  function isJoinable(session) {
    return !!session.meetingLink;
  }

  // Pick the right preview component based on submissionType
  function renderSubmissionPreview(sub) {
    switch (sub.submissionType) {
      case "text":
        return <TextPreview sub={sub} expanded={expandedAnswer} onToggle={() => setExpandedAnswer(e => !e)} />;
      case "canvas":
        return <CanvasPreview sub={sub} expanded={expandedAnswer} onToggle={() => setExpandedAnswer(e => !e)} />;
      case "file":
      default:
        return <FilePreview sub={sub} />;
    }
  }

  return (
    <div style={s.page}>

      {/* Pending Submissions */}
      <section style={s.section}>
        <h2 style={s.sectionTitle}>Pending Submissions</h2>
        <p style={s.sectionSub}>{submissions.filter(sub => !submitted[sub.id] && sub.status !== "graded").length} awaiting your review</p>

        <div style={s.submissionList}>
          {submissions.map(sub => {
            const isDone = submitted[sub.id] || sub.status === "graded";
            return (
              /* On mobile: stack info + grade button vertically so the button
                 doesn't get squished beside the text */
              <div key={sub.id} style={{ ...s.submissionRow, borderLeftColor: sub.majorColor, opacity: isDone ? 0.5 : 1, flexDirection: isMobile ? "column" : "row", alignItems: isMobile ? "flex-start" : "center" }}>
                <div style={s.subInfo}>
                  <p style={s.subStudent}>{sub.student}</p>
                  <p style={s.subChallenge}>{sub.challenge}</p>
                  <p style={s.subMeta}>{sub.major} · Submitted {sub.submittedAt}</p>
                </div>
                <div style={s.subRight}>
                  {isDone
                    ? <span style={s.gradedBadge}>Graded</span>
                    : <button style={s.gradeBtn} onClick={() => openPanel(sub)}>Grade</button>
                  }
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/*  Upcoming Sessions */}
      <section style={s.section}>
        <h2 style={s.sectionTitle}>Upcoming Sessions</h2>
        <p style={s.sectionSub}>Select a day to see booked sessions</p>

        {/* Week strip — 7 buttons in a row. On very narrow phones they'd overflow,
            so we allow wrapping into a 2-row grid. */}
        <div style={{ ...s.weekStrip, flexWrap: isMobile ? "wrap" : "nowrap" }}>
          {week.map((day, i) => {
            const isToday     = isSameDay(day, TODAY);
            const isSelected  = isSameDay(day, selectedDay);
            const hasSessions = sessions.some(se => isSameDay(se.date, day));
            return (
              <button key={i} style={{ ...s.dayBtn, ...(isSelected ? s.dayBtnActive : {}) }} onClick={() => setSelectedDay(day)}>
                <span style={{ ...s.dayLabel,  color: isSelected ? "#fff" : "var(--color-text-secondary)" }}>{DAY_LABELS[i]}</span>
                <span style={{ ...s.dayNumber, color: isSelected ? "#fff" : "var(--color-text-primary)", fontWeight: isToday ? 700 : 500 }}>{day.getDate()}</span>
                {hasSessions && <span style={{ ...s.dot, backgroundColor: isSelected ? "#fff" : "var(--color-primary)" }} />}
              </button>
            );
          })}
        </div>

        {sessionsForDay.length === 0
          ? <div style={s.emptyState}><p style={s.emptyText}>No sessions scheduled for this day.</p></div>
          : (
            <div style={s.sessionList}>
              {sessionsForDay.map(session => {
                const joinable = isJoinable(session);
                return (
                  <div key={session.id} style={s.sessionCard}>
                    <div style={s.sessionIconWrap}><MdVideoCall size={22} color="var(--color-primary)" /></div>
                    <div style={s.sessionInfo}>
                      <p style={s.sessionStudent}>{session.student}</p>
                      <p style={s.sessionTopic}>{session.topic}</p>
                      <p style={s.sessionTime}>{session.time}</p>
                    </div>
                    <button
                      style={{ ...s.joinBtn, ...(joinable ? s.joinBtnActive : {}) }}
                      disabled={!joinable}
                      onClick={() => joinable && window.open(session.meetingLink, '_blank', 'noopener,noreferrer')}
                    >
                      Join
                    </button>
                  </div>
                );
              })}
            </div>
          )
        }
      </section>

      {/*  Grading panel (modal)*/}
      {selectedSubmission && (
        <div style={s.overlay} onClick={closePanel}>
          {/* Reduce panel padding on mobile so content isn't cramped */}
          <div style={{ ...s.panel, padding: isMobile ? "20px 16px" : "32px" }} onClick={e => e.stopPropagation()}>

            <div style={s.panelHeader}>
              <div>
                <h3 style={s.panelTitle}>{selectedSubmission.challenge}</h3>
                <p style={s.panelSub}>by {selectedSubmission.student} · {selectedSubmission.submittedAt}</p>
              </div>
              <button style={s.closeBtn} onClick={closePanel}><MdClose size={20} /></button>
            </div>

            {/* Submission preview — switches on type */}
            {renderSubmissionPreview(selectedSubmission)}

            {/* Rating */}
            <div style={s.ratingSection}>
              <p style={s.fieldLabel}>Rating</p>
              <div style={s.stars}>
                {[1, 2, 3, 4, 5].map(star => {
                  const filled = star <= (hovered || currentRating);
                  return (
                    <span
                      key={star}
                      style={s.star}
                      onMouseEnter={() => setHovered(star)}
                      onMouseLeave={() => setHovered(0)}
                      onClick={() => setRatings(prev => ({ ...prev, [selectedSubmission.id]: star }))}
                    >
                      {filled ? <MdStar size={32} color="#F59E0B" /> : <MdStarBorder size={32} color="#D1D5DB" />}
                    </span>
                  );
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
                onChange={e => setFeedbacks(prev => ({ ...prev, [selectedSubmission.id]: e.target.value }))}
                rows={4}
              />
            </div>

            <div style={s.panelActions}>
              <button style={s.cancelBtn} onClick={closePanel}>Cancel</button>
              <button
                style={{ ...s.submitBtn, opacity: canSubmit ? 1 : 0.45, cursor: canSubmit ? "pointer" : "not-allowed" }}
                disabled={!canSubmit}
                onClick={handleSubmitGrade}
              >
                Submit
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

// styles
const s = {
  page: { padding: "8px", fontFamily: "Plus Jakarta Sans, sans-serif", display: "flex", flexDirection: "column", gap: "28px" },

  section: { backgroundColor: "#FFFFFF", borderRadius: "20px", padding: "28px 28px 24px", border: "1px solid #E5E7EB", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" },
  sectionTitle: { margin: "0 0 4px 0", fontSize: "20px", fontWeight: "700", color: "#111827" },
  sectionSub: { margin: "0 0 20px 0", fontSize: "14px", color: "#6B7280" },

  submissionList: { display: "flex", flexDirection: "column", gap: "12px" },
  submissionRow: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", borderRadius: "14px", borderLeft: "4px solid", backgroundColor: "#F9FAFB", gap: "16px", transition: "box-shadow 0.15s ease" },
  subInfo: { display: "flex", flexDirection: "column", gap: "3px" },
  subStudent: { margin: 0, fontSize: "15px", fontWeight: "600", color: "#111827" },
  subChallenge: { margin: 0, fontSize: "14px", color: "#374151" },
  subMeta: { margin: 0, fontSize: "12px", color: "#9CA3AF" },
  subRight: { flexShrink: 0 },
  gradeBtn: { backgroundColor: "var(--meras-green)", color: "#FFFFFF", border: "none", borderRadius: "999px", padding: "9px 22px", fontSize: "14px", fontWeight: "600", cursor: "pointer" },
  gradedBadge: { display: "inline-block", backgroundColor: "#D1FAE5", color: "#065F46", borderRadius: "999px", padding: "6px 16px", fontSize: "13px", fontWeight: "600" },

  weekStrip: { display: "flex", gap: "8px", marginBottom: "20px" },
  dayBtn: { flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", padding: "10px 4px", borderRadius: "14px", border: "1px solid #E5E7EB", backgroundColor: "#F9FAFB", cursor: "pointer", transition: "all 0.15s ease", minWidth: 0 },
  dayBtnActive: { backgroundColor: "#3DB87A", border: "1px solid #3DB87A" },
  dayLabel: { fontSize: "11px", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.05em" },
  dayNumber: { fontSize: "18px" },
  dot: { width: "5px", height: "5px", borderRadius: "50%" },

  sessionList: { display: "flex", flexDirection: "column", gap: "12px" },
  sessionCard: { display: "flex", alignItems: "center", gap: "16px", padding: "16px 20px", borderRadius: "14px", border: "1px solid #E5E7EB", backgroundColor: "#F9FAFB" },
  sessionIconWrap: { width: "44px", height: "44px", borderRadius: "12px", backgroundColor: "#D4F2E4", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },
  sessionInfo: { flex: 1, display: "flex", flexDirection: "column", gap: "2px" },
  sessionStudent: { margin: 0, fontSize: "15px", fontWeight: "600", color: "#111827" },
  sessionTopic: { margin: 0, fontSize: "13px", color: "#374151" },
  sessionTime: { margin: 0, fontSize: "12px", color: "#9CA3AF" },
  joinBtn: { flexShrink: 0, backgroundColor: "#E5E7EB", color: "#9CA3AF", border: "none", borderRadius: "999px", padding: "9px 22px", fontSize: "14px", fontWeight: "600", cursor: "not-allowed" },
  joinBtnActive: { backgroundColor: "#3DB87A", color: "#FFFFFF", cursor: "pointer" },
  emptyState: { textAlign: "center", padding: "32px 0" },
  emptyText: { margin: 0, fontSize: "14px", color: "#9CA3AF" },

  overlay: { position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.35)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 200, padding: "24px" },
  panel: { backgroundColor: "#FFFFFF", borderRadius: "24px", padding: "32px", width: "100%", maxWidth: "540px", maxHeight: "90vh", overflowY: "auto", boxShadow: "0 20px 50px rgba(0,0,0,0.13)", display: "flex", flexDirection: "column", gap: "20px" },
  panelHeader: { display: "flex", justifyContent: "space-between", alignItems: "flex-start" },
  panelTitle: { margin: "0 0 4px 0", fontSize: "20px", fontWeight: "700", color: "#111827" },
  panelSub: { margin: 0, fontSize: "13px", color: "#6B7280" },
  closeBtn: { background: "none", border: "none", cursor: "pointer", color: "#9CA3AF", padding: "4px", display: "flex", alignItems: "center" },

  // Shared submission box wrapper
  submissionBox: { backgroundColor: "#F9FAFB", border: "1px solid #E5E7EB", borderRadius: "14px", padding: "16px 18px", display: "flex", flexDirection: "column", gap: "10px" },
  // File type
  submissionFile: { margin: 0, fontSize: "14px", fontWeight: "600", color: "#111827" },
  submissionNote: { margin: 0, fontSize: "13px", color: "#6B7280", fontStyle: "italic", lineHeight: "1.5" },
  // Text type
  answerLabel: { margin: 0, fontSize: "13px", fontWeight: "700", color: "#111827" },
  answerText: { margin: 0, fontSize: "13px", color: "#374151", lineHeight: "1.65" },
  // Expand / See less pill button (amber, matches design)
  expandRow: { display: "flex", justifyContent: "flex-end" },
  expandPill: { backgroundColor: "#F5B800", color: "#111827", border: "none", borderRadius: "999px", padding: "4px 16px", fontSize: "13px", fontWeight: "600", cursor: "pointer" },
  // Canvas type
  canvasWrap: { overflow: "hidden", borderRadius: "8px", transition: "max-height 0.25s ease" },
  canvasImg: { width: "100%", height: "auto", display: "block", borderRadius: "8px" },

  // Rating
  ratingSection: { display: "flex", flexDirection: "column", gap: "8px" },
  fieldLabel: { margin: 0, fontSize: "13px", fontWeight: "600", color: "#374151", textTransform: "uppercase", letterSpacing: "0.06em" },
  stars: { display: "flex", alignItems: "center", gap: "4px" },
  star: { cursor: "pointer", display: "flex", alignItems: "center" },
  ratingLabel: { marginLeft: "8px", fontSize: "14px", fontWeight: "600", color: "#F59E0B" },

  // Feedback
  feedbackSection: { display: "flex", flexDirection: "column", gap: "8px" },
  textarea: { width: "100%", padding: "12px 14px", borderRadius: "12px", border: "1px solid #D1D5DB", fontSize: "14px", color: "#111827", resize: "vertical", outline: "none", fontFamily: "Plus Jakarta Sans, sans-serif", lineHeight: "1.5", boxSizing: "border-box" },

  // Actions
  panelActions: { display: "flex", justifyContent: "flex-end", gap: "12px" },
  cancelBtn: { backgroundColor: "#F3F4F6", color: "#374151", border: "none", borderRadius: "999px", padding: "11px 24px", fontSize: "14px", fontWeight: "600", cursor: "pointer" },
  submitBtn: { backgroundColor: "#3DB87A", color: "#FFFFFF", border: "none", borderRadius: "999px", padding: "11px 28px", fontSize: "14px", fontWeight: "600", transition: "opacity 0.15s ease" },
};

export default GradingView;
