import { useState } from "react";
import CompletedChallenges from "./CompletedChallenges";
import StatCard from "../../components/StatCard";
import MajorBadge from "../../components/MajorBadge";

const recommendedMajors = [
  { name: "Engineering", percentage: 65 },
  { name: "Computer Science", percentage: 40 },
  { name: "Design", percentage: 35 },
];

const completedChallengesData = [
  {
    name: "Build a Simple Calculator",
    major: "Computer Science",
    date: "March 20, 2026",
    rating: 4,
    feedback: "Good logic and structure. Keep practicing clean code.",
  },
  {
    name: "Design a Poster",
    major: "Design",
    date: "March 18, 2026",
    rating: 5,
    feedback: "Creative work and strong visual balance.",
  },
];

const recentActivities = [
  "Completed 'Build a Simple Calculator'",
  "Booked a mentorship session",
  "Finished the Compass Quiz",
];

function ExplorerDashboard() {
  const [hasTakenQuiz, setHasTakenQuiz] = useState(false);

  return (
    <div style={styles.page}>
      {!hasTakenQuiz && (
        <div style={styles.quizBanner}>
          <h2 style={styles.bannerTitle}>Take the Compass Quiz</h2>
          <p style={styles.bannerText}>
            Discover the best majors for you by taking the quiz.
          </p>
        </div>
      )}

      <div style={styles.banner}>
        <h1 style={styles.bannerTitle}>Welcome back Sara!</h1>
        <p style={styles.bannerText}>
          Keep exploring your path and continue building your future.
        </p>
      </div>

      {hasTakenQuiz && (
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>My Path</h2>
          <div style={styles.majorGrid}>
            {recommendedMajors.map((major, index) => (
              <div key={index} style={styles.majorCard}>
                <h3 style={styles.majorName}>{major.name}</h3>
                <p style={styles.percentText}>{major.percentage}% Match</p>
                <div style={styles.progressBar}>
                  <div
                    style={{
                      ...styles.progressFill,
                      width: `${major.percentage}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={styles.statsGrid}>
        <StatCard number={2} label="Challenges Completed" />
        <StatCard number={1} label="In Progress" />
        <StatCard number={3} label="Sessions Booked" />
      </div>

      <div style={styles.continueCard}>
        <h2 style={styles.sectionTitle}>Continue where you left off</h2>
        <p style={styles.continueText}>
          Last active challenge: Build a Simple Calculator
        </p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Recent Activity</h2>
        <ul style={styles.activityList}>
          {recentActivities.map((activity, index) => (
            <li key={index} style={styles.activityItem}>
              {activity}
            </li>
          ))}
        </ul>
      </div>

      <CompletedChallenges challenges={completedChallengesData} />
    </div>
  );
}

const styles = {
  page: {
    padding: "8px",
    fontFamily: "Arial, sans-serif",
  },
  banner: {
    backgroundColor: "#3DB87A",
    color: "#FFFFFF",
    borderRadius: "16px",
    padding: "24px",
    marginBottom: "24px",
  },
  bannerTitle: {
    margin: 0,
    fontSize: "32px",
  },
  bannerText: {
    marginTop: "8px",
    fontSize: "16px",
  },
  section: {
    marginBottom: "24px",
  },
  sectionTitle: {
    fontSize: "24px",
    marginBottom: "16px",
    color: "#000000",
  },
  majorGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "16px",
  },
  majorCard: {
    backgroundColor: "#FFFFFF",
    border: "1px solid #E5E7EB",
    borderRadius: "14px",
    padding: "18px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
  },
  majorName: {
    marginBottom: "8px",
    fontSize: "20px",
  },
  percentText: {
    color: "#2A8C5C",
    fontWeight: "700",
    marginBottom: "8px",
  },
  progressBar: {
    width: "100%",
    height: "10px",
    backgroundColor: "#E5E7EB",
    borderRadius: "999px",
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#3DB87A",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "16px",
    marginBottom: "24px",
  },
  statCard: {
    backgroundColor: "#FFFFFF",
    border: "1px solid #E5E7EB",
    borderRadius: "14px",
    padding: "20px",
    textAlign: "center",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
  },
  statNumber: {
    fontSize: "28px",
    color: "#2A8C5C",
    marginBottom: "8px",
  },
  statLabel: {
    color: "#333333",
    fontSize: "15px",
  },
  continueCard: {
    backgroundColor: "#FFFFFF",
    border: "1px solid #E5E7EB",
    borderRadius: "14px",
    padding: "20px",
    marginBottom: "24px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
  },
  continueText: {
    fontSize: "16px",
    color: "#333333",
  },
  activityList: {
    paddingLeft: "20px",
    margin: 0,
  },
  activityItem: {
    marginBottom: "10px",
    color: "#333333",
  },
  quizBanner: {
  backgroundColor: "#FFF7ED",
  border: "1px solid #FDBA74",
  borderRadius: "14px",
  padding: "20px",
  marginBottom: "20px",
},
};

export default ExplorerDashboard;