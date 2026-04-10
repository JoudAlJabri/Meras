function CompletedChallenges({ challenges, onViewFeedback }) {
  if (!challenges || challenges.length === 0) {
    return (
      <div style={styles.emptyBox}>
        <h3 style={styles.sectionTitle}>Completed Challenges</h3>
        <p style={styles.emptyText}>No completed challenges yet.</p>
      </div>
    );
  }

  return (
    <div>
      <h3 style={styles.sectionTitle}>Completed Challenges</h3>
      <div style={styles.grid}>
        {challenges.map((challenge, index) => (
          <div key={index} style={styles.card}>
            <div style={styles.cardTop}>
              <span style={styles.majorBadge}>{challenge.major}</span>
            </div>
            <h4 style={styles.cardTitle}>{challenge.title}</h4>
            <p style={styles.cardDesc}>{challenge.feedback ?? challenge.description}</p>
            <button style={styles.feedbackBtn} onClick={() => onViewFeedback?.(challenge)}>View Feedback</button>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  sectionTitle: {
    fontSize: "20px",
    fontWeight: "700",
    color: "#111827",
    marginBottom: "16px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
    gap: "16px",
  },
  card: {
    backgroundColor: "#FFFFFF",
    border: "1px solid #E5E7EB",
    borderRadius: "16px",
    padding: "18px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
  },
  cardTop: {
    display: "flex",
    alignItems: "center",
  },
  majorBadge: {
    backgroundColor: "#F0FDF4",
    color: "var(--meras-green-dark)",
    border: "1px solid #BBF7D0",
    borderRadius: "999px",
    fontSize: "12px",
    fontWeight: "600",
    padding: "4px 12px",
  },
  cardTitle: {
    margin: 0,
    fontSize: "16px",
    fontWeight: "700",
    color: "#111827",
    lineHeight: "1.3",
  },
  cardDesc: {
    margin: 0,
    fontSize: "13px",
    color: "#6B7280",
    lineHeight: "1.5",
    flex: 1,
    overflow: "hidden",
    display: "-webkit-box",
    WebkitLineClamp: 3,
    WebkitBoxOrient: "vertical",
  },
  feedbackBtn: {
    backgroundColor: "var(--meras-green-dark)",
    color: "#FFFFFF",
    border: "none",
    borderRadius: "999px",
    padding: "10px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    marginTop: "4px",
  },
  emptyBox: {
    padding: "20px",
    borderRadius: "14px",
    border: "1px solid #E5E7EB",
    backgroundColor: "#FAFAFA",
  },
  emptyText: {
    color: "#6B7280",
    fontSize: "14px",
    margin: 0,
  },
};

export default CompletedChallenges;
