

function StatCard({ number, label }) {
  return (
    <div style={styles.card}>
      <h3 style={styles.number}>{number}</h3>
      <p style={styles.label}>{label}</p>
    </div>
  );
}

const styles = {
  card: {
    backgroundColor: "#FFFFFF",
    border: "1px solid #E5E7EB",
    borderRadius: "14px",
    padding: "20px",
    textAlign: "center",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
  },
  number: {
    fontSize: "28px",
    color: "#2A8C5C",
  },
  label: {
    fontSize: "14px",
    color: "#333",
  },
};

export default StatCard;