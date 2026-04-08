import { useState } from "react";
import { MdStar, MdStarBorder, MdClose, MdVideoCall } from "react-icons/md";


const mockSubmissions = [
  {
    id: 1,
    student: "Sara Mohammed",
    challenge: "Build a REST API",
    major: "Software Engineering",
    majorColor: "var(--color-primary)",
    submittedAt: "Apr 7, 2026",
    file: "rest_api_sara.zip",
    note: "I followed the spec closely and added Swagger docs as a bonus.",
  },
  {
    id: 2,
    student: "Nour Al-Rashid",
    challenge: "Data Visualisation Dashboard",
    major: "Data Science",
    majorColor: "#F59E0B",
    submittedAt: "Apr 8, 2026",
    file: "dashboard_nour.pdf",
    note: "Used Plotly for charts. Wasn't sure about the color scheme — open to feedback.",
  },
  {
    id: 3,
    student: "Layla Hassan",
    challenge: "UI/UX Case Study",
    major: "Design",
    majorColor: "#8B5CF6",
    submittedAt: "Apr 9, 2026",
    file: "casestudy_layla.figma",
    note: "",
  },
];

// Build a week anchored on today (Apr 9 2026 = Wednesday)
const TODAY = new Date(2026, 3, 9); // month is 0-indexed

function buildWeek(anchor) {
  const day = anchor.getDay(); // 0=Sun
  const monday = new Date(anchor);
  monday.setDate(anchor.getDate() - ((day + 6) % 7));
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return d;
  });
}

const DAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const mockSessions = [
  { id: 1, date: new Date(2026, 3, 9),  student: "Sara Mohammed",  topic: "REST API architecture review",          time: "10:00 – 10:45 AM" },
  { id: 2, date: new Date(2026, 3, 9),  student: "Nour Al-Rashid", topic: "Choosing the right chart type",         time: "2:00 – 2:45 PM"  },
  { id: 3, date: new Date(2026, 3, 11), student: "Layla Hassan",   topic: "Figma component structure feedback",    time: "11:00 – 11:45 AM" },
  { id: 4, date: new Date(2026, 3, 13), student: "Yasser Khalid",  topic: "Career path in cloud engineering",     time: "3:30 – 4:15 PM"  },
];

function isSameDay(a, b) {
  return a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();
}


function GradingView() {
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [ratings, setRatings]     = useState({});
  const [feedbacks, setFeedbacks] = useState({});
  const [hovered, setHovered]     = useState(0);
  const [submitted, setSubmitted] = useState({});

  const [week]           = useState(() => buildWeek(TODAY));
  const [selectedDay, setSelectedDay] = useState(TODAY);

  const sessionsForDay = mockSessions.filter(s => isSameDay(s.date, selectedDay));

  const currentRating   = selectedSubmission ? (ratings[selectedSubmission.id]   ?? 0) : 0;
  const currentFeedback = selectedSubmission ? (feedbacks[selectedSubmission.id] ?? "") : "";
  const canSubmit = currentRating > 0 && currentFeedback.trim().length > 0;

  function handleSubmitGrade() {
    if (!canSubmit) return;
    setSubmitted(prev => ({ ...prev, [selectedSubmission.id]: true }));
    setSelectedSubmission(null);
  }

  // Sessions happening today within 30 min or in the future
  function isJoinable(session) {
    const now = new Date();
    const [hStr] = session.time.split(":");
    const sessionHour = parseInt(hStr, 10) + (session.time.includes("PM") && parseInt(hStr) !== 12 ? 12 : 0);
    const diff = sessionHour - now.getHours();
    return isSameDay(session.date, now) && diff <= 0 && diff > -1;
  }

  return (
    <div style={s.page}>

     
      <section style={s.section}>
        <h2 style={s.sectionTitle}>Pending Submissions</h2>
        <p style={s.sectionSub}>{mockSubmissions.filter(sub => !submitted[sub.id]).length} awaiting your review</p>

        <div style={s.submissionList}>
          {mockSubmissions.map(sub => {
            const isDone = submitted[sub.id];
            return (
              <div
                key={sub.id}
                style={{ ...s.submissionRow, borderLeftColor: sub.majorColor, opacity: isDone ? 0.5 : 1 }}
              >
                <div style={s.subInfo}>
                  <p style={s.subStudent}>{sub.student}</p>
                  <p style={s.subChallenge}>{sub.challenge}</p>
                  <p style={s.subMeta}>{sub.major} · Submitted {sub.submittedAt}</p>
                </div>
                <div style={s.subRight}>
                  {isDone
                    ? <span style={s.gradedBadge}>Graded</span>
                    : (
                      <button
                        style={s.gradeBtn}
                        onClick={() => setSelectedSubmission(sub)}
                      >
                        Grade
                      </button>
                    )
                  }
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section style={s.section}>
        <h2 style={s.sectionTitle}>Upcoming Sessions</h2>
        <p style={s.sectionSub}>Select a day to see booked sessions</p>

        {/* Week strip */}
        <div style={s.weekStrip}>
          {week.map((day, i) => {
            const isToday    = isSameDay(day, TODAY);
            const isSelected = isSameDay(day, selectedDay);
            const hasSessions = mockSessions.some(se => isSameDay(se.date, day));
            return (
              <button
                key={i}
                style={{
                  ...s.dayBtn,
                  ...(isSelected ? s.dayBtnActive : {}),
                }}
                onClick={() => setSelectedDay(day)}
              >
                <span style={{ ...s.dayLabel, color: isSelected ? "#fff" : "var(--color-text-secondary)" }}>
                  {DAY_LABELS[i]}
                </span>
                <span style={{ ...s.dayNumber, color: isSelected ? "#fff" : "var(--color-text-primary)", fontWeight: isToday ? 700 : 500 }}>
                  {day.getDate()}
                </span>
                {hasSessions && (
                  <span style={{ ...s.dot, backgroundColor: isSelected ? "#fff" : "var(--color-primary)" }} />
                )}
              </button>
            );
          })}
        </div>

        {/* Session cards */}
        {sessionsForDay.length === 0
          ? (
            <div style={s.emptyState}>
              <p style={s.emptyText}>No sessions scheduled for this day.</p>
            </div>
          )
          : (
            <div style={s.sessionList}>
              {sessionsForDay.map(session => {
                const joinable = isJoinable(session);
                return (
                  <div key={session.id} style={s.sessionCard}>
                    <div style={s.sessionIconWrap}>
                      <MdVideoCall size={22} color="var(--color-primary)" />
                    </div>
                    <div style={s.sessionInfo}>
                      <p style={s.sessionStudent}>{session.student}</p>
                      <p style={s.sessionTopic}>{session.topic}</p>
                      <p style={s.sessionTime}>{session.time}</p>
                    </div>
                    <button
                      style={{ ...s.joinBtn, ...(joinable ? s.joinBtnActive : {}) }}
                      disabled={!joinable}
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

      {selectedSubmission && (
        <div style={s.overlay} onClick={() => setSelectedSubmission(null)}>
          <div style={s.panel} onClick={e => e.stopPropagation()}>

            {/* Header */}
            <div style={s.panelHeader}>
              <div>
                <h3 style={s.panelTitle}>{selectedSubmission.challenge}</h3>
                <p style={s.panelSub}>by {selectedSubmission.student} · {selectedSubmission.submittedAt}</p>
              </div>
              <button style={s.closeBtn} onClick={() => setSelectedSubmission(null)}>
                <MdClose size={20} />
              </button>
            </div>

            {/* Submission preview */}
            <div style={s.submissionBox}>
              <p style={s.submissionFile}>📎 {selectedSubmission.file}</p>
              {selectedSubmission.note && (
                <p style={s.submissionNote}>"{selectedSubmission.note}"</p>
              )}
            </div>

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
                      {filled
                        ? <MdStar size={32} color="#F59E0B" />
                        : <MdStarBorder size={32} color="#D1D5DB" />
                      }
                    </span>
                  );
                })}
                {currentRating > 0 && (
                  <span style={s.ratingLabel}>{currentRating} / 5</span>
                )}
              </div>
            </div>

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
              <button style={s.cancelBtn} onClick={() => setSelectedSubmission(null)}>Cancel</button>
              <button
                style={{ ...s.submitBtn, opacity: canSubmit ? 1 : 0.45, cursor: canSubmit ? "pointer" : "not-allowed" }}
                disabled={!canSubmit}
                onClick={handleSubmitGrade}
              >
                Submit Grade
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}


const s = {
  page: {
    padding: "8px",
    fontFamily: "Plus Jakarta Sans, sans-serif",
    display: "flex",
    flexDirection: "column",
    gap: "28px",
  },

  // Sections
  section: {
    backgroundColor: "#FFFFFF",
    borderRadius: "20px",
    padding: "28px 28px 24px",
    border: "1px solid #E5E7EB",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
  },
  sectionTitle: {
    margin: "0 0 4px 0",
    fontSize: "20px",
    fontWeight: "700",
    color: "#111827",
  },
  sectionSub: {
    margin: "0 0 20px 0",
    fontSize: "14px",
    color: "#6B7280",
  },

  // Submissions
  submissionList: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  submissionRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "16px 20px",
    borderRadius: "14px",
    borderLeft: "4px solid",
    backgroundColor: "#F9FAFB",
    gap: "16px",
    transition: "box-shadow 0.15s ease",
  },
  subInfo: {
    display: "flex",
    flexDirection: "column",
    gap: "3px",
  },
  subStudent: {
    margin: 0,
    fontSize: "15px",
    fontWeight: "600",
    color: "#111827",
  },
  subChallenge: {
    margin: 0,
    fontSize: "14px",
    color: "#374151",
  },
  subMeta: {
    margin: 0,
    fontSize: "12px",
    color: "#9CA3AF",
  },
  subRight: {
    flexShrink: 0,
  },
  gradeBtn: {
    backgroundColor: "#111827",
    color: "#FFFFFF",
    border: "none",
    borderRadius: "999px",
    padding: "9px 22px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
  },
  gradedBadge: {
    display: "inline-block",
    backgroundColor: "#D1FAE5",
    color: "#065F46",
    borderRadius: "999px",
    padding: "6px 16px",
    fontSize: "13px",
    fontWeight: "600",
  },

  // Week calendar
  weekStrip: {
    display: "flex",
    gap: "8px",
    marginBottom: "20px",
  },
  dayBtn: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "4px",
    padding: "10px 4px",
    borderRadius: "14px",
    border: "1px solid #E5E7EB",
    backgroundColor: "#F9FAFB",
    cursor: "pointer",
    transition: "all 0.15s ease",
    minWidth: 0,
  },
  dayBtnActive: {
    backgroundColor: "#3DB87A",
    border: "1px solid #3DB87A",
  },
  dayLabel: {
    fontSize: "11px",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  },
  dayNumber: {
    fontSize: "18px",
  },
  dot: {
    width: "5px",
    height: "5px",
    borderRadius: "50%",
  },

  // Sessions
  sessionList: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  sessionCard: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    padding: "16px 20px",
    borderRadius: "14px",
    border: "1px solid #E5E7EB",
    backgroundColor: "#F9FAFB",
  },
  sessionIconWrap: {
    width: "44px",
    height: "44px",
    borderRadius: "12px",
    backgroundColor: "#D4F2E4",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  sessionInfo: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "2px",
  },
  sessionStudent: {
    margin: 0,
    fontSize: "15px",
    fontWeight: "600",
    color: "#111827",
  },
  sessionTopic: {
    margin: 0,
    fontSize: "13px",
    color: "#374151",
  },
  sessionTime: {
    margin: 0,
    fontSize: "12px",
    color: "#9CA3AF",
  },
  joinBtn: {
    flexShrink: 0,
    backgroundColor: "#E5E7EB",
    color: "#9CA3AF",
    border: "none",
    borderRadius: "999px",
    padding: "9px 22px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "not-allowed",
  },
  joinBtnActive: {
    backgroundColor: "#3DB87A",
    color: "#FFFFFF",
    cursor: "pointer",
  },
  emptyState: {
    textAlign: "center",
    padding: "32px 0",
  },
  emptyText: {
    margin: 0,
    fontSize: "14px",
    color: "#9CA3AF",
  },

  // Overlay & Panel
  overlay: {
    position: "fixed",
    inset: 0,
    backgroundColor: "rgba(0,0,0,0.35)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 200,
    padding: "24px",
  },
  panel: {
    backgroundColor: "#FFFFFF",
    borderRadius: "24px",
    padding: "32px",
    width: "100%",
    maxWidth: "540px",
    boxShadow: "0 20px 50px rgba(0,0,0,0.13)",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  panelHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  panelTitle: {
    margin: "0 0 4px 0",
    fontSize: "20px",
    fontWeight: "700",
    color: "#111827",
  },
  panelSub: {
    margin: 0,
    fontSize: "13px",
    color: "#6B7280",
  },
  closeBtn: {
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "#9CA3AF",
    padding: "4px",
    display: "flex",
    alignItems: "center",
  },

  // Submission preview
  submissionBox: {
    backgroundColor: "#F9FAFB",
    border: "1px solid #E5E7EB",
    borderRadius: "14px",
    padding: "16px 18px",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  submissionFile: {
    margin: 0,
    fontSize: "14px",
    fontWeight: "600",
    color: "#111827",
  },
  submissionNote: {
    margin: 0,
    fontSize: "13px",
    color: "#6B7280",
    fontStyle: "italic",
    lineHeight: "1.5",
  },

  // Rating
  ratingSection: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  fieldLabel: {
    margin: 0,
    fontSize: "13px",
    fontWeight: "600",
    color: "#374151",
    textTransform: "uppercase",
    letterSpacing: "0.06em",
  },
  stars: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
  },
  star: {
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
  },
  ratingLabel: {
    marginLeft: "8px",
    fontSize: "14px",
    fontWeight: "600",
    color: "#F59E0B",
  },

  // Feedback
  feedbackSection: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  textarea: {
    width: "100%",
    padding: "12px 14px",
    borderRadius: "12px",
    border: "1px solid #D1D5DB",
    fontSize: "14px",
    color: "#111827",
    resize: "vertical",
    outline: "none",
    fontFamily: "Plus Jakarta Sans, sans-serif",
    lineHeight: "1.5",
  },

  // Actions
  panelActions: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "12px",
  },
  cancelBtn: {
    backgroundColor: "#F3F4F6",
    color: "#374151",
    border: "none",
    borderRadius: "999px",
    padding: "11px 24px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
  },
  submitBtn: {
    backgroundColor: "#3DB87A",
    color: "#FFFFFF",
    border: "none",
    borderRadius: "999px",
    padding: "11px 28px",
    fontSize: "14px",
    fontWeight: "600",
    transition: "opacity 0.15s ease",
  },
};

export default GradingView;
