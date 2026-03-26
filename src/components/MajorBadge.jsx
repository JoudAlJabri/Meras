function MajorBadge({ name }) {
  return (
    <span style={styles.badge}>
      {name}
    </span>
  );
}

const styles = {
  badge: {
    backgroundColor: "#DCFCE7",
    color: "#166534",
    padding: "4px 10px",
    borderRadius: "999px",
    fontSize: "12px",
    fontWeight: "600",
  },
};

export default MajorBadge;