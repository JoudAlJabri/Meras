function CompletedChallenges({ challenges }) {
  if (!challenges || challenges.length === 0) {
    return (
      <div style={styles.emptyBox}>
        <h3 style={styles.sectionTitle}>Completed Challenges</h3>
        <p style={styles.emptyText}>No completed challenges yet.</p>
      </div>
    );
  }

  return (
    <div style={styles.wrapper}>
      <h3 style={styles.sectionTitle}>Completed Challenges</h3>

      <div style={styles.list}>
        {challenges.map((challenge, index) => (
          <div key={index} style={styles.card}>
            <h4 style={styles.challengeName}>{challenge.name}</h4>
            <p style={styles.text}><strong>Major:</strong> {challenge.major}</p>
            <p style={styles.text}><strong>Completion Date:</strong> {challenge.date}</p>
            <p style={styles.text}><strong>Rating:</strong> {"⭐".repeat(challenge.rating)}</p>
            <p style={styles.text}><strong>Feedback:</strong> {challenge.feedback}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    marginTop: "24px",
  },
  sectionTitle: {
    fontSize: "22px",
    marginBottom: "16px",
    color: "#000000",
  },
  list: {
    display: "grid",
    gap: "16px",
  },
  card: {
    backgroundColor: "#FFFFFF",
    border: "1px solid #E5E7EB",
    borderRadius: "14px",
    padding: "18px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
  },
  challengeName: {
    marginBottom: "10px",
    fontSize: "18px",
    color: "#2A8C5C",
  },
  text: {
    margin: "6px 0",
    color: "#333333",
    fontSize: "14px",
  },
  emptyBox: {
    marginTop: "24px",
    backgroundColor: "#FFFFFF",
    border: "1px solid #E5E7EB",
    borderRadius: "14px",
    padding: "20px",
  },
  emptyText: {
    color: "#A1A1A1",
    fontSize: "15px",
  },
};

export default CompletedChallenges;