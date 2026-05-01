import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const majorDescriptions = {
  "Computer Science":               "A good fit for students who enjoy coding, logic, and problem solving.",
  "Software Engineering":           "Great for students who love building apps and solving real-world problems.",
  "Computer Engineering":           "Perfect for students interested in hardware, software, and embedded systems.",
  "Mechanical Engineering":         "A strong match for students who like math, building things, and technical design.",
  "Electrical Engineering":         "Ideal for students who enjoy circuits, electronics, and power systems.",
  "Chemical Engineering":           "Best for students who enjoy chemistry, reactions, and industrial processes.",
  "Civil Engineering":              "Great for students who like designing buildings, roads, and infrastructure.",
  "Bio Engineering":                "Perfect for students interested in biology, medicine, and engineering combined.",
  "Architecture":                   "A great option for students who enjoy drawing, creativity, and design.",
  "Finance":                        "Suitable for students who like numbers, markets, and investment.",
  "Business Administration":        "For students who like communication, teamwork, and leadership.",
  "Accounting":                     "For detail-oriented students who enjoy numbers and financial records.",
  "Management Information Systems": "For students who enjoy technology and business combined.",
  "Petroleum Engineering":          "For students interested in energy, oil, and resource extraction.",
  "Physics":                        "For students who enjoy understanding how the universe works.",
};

const areaMajorMap = {
  R: ["Mechanical Engineering", "Civil Engineering", "Electrical Engineering"],
  I: ["Computer Science", "Physics", "Bio Engineering", "Chemical Engineering"],
  A: ["Architecture", "Software Engineering"],
  S: ["Bio Engineering", "Business Administration"],
  E: ["Business Administration", "Finance", "Management Information Systems"],
  C: ["Accounting", "Management Information Systems", "Computer Engineering"],
};

function calculateTopMajors(allAnswers) {
  const areaTotals = {};
  const areaCounts = {};

  Object.values(allAnswers).forEach(({ score, area }) => {
    if (!areaTotals[area]) { areaTotals[area] = 0; areaCounts[area] = 0; }
    areaTotals[area] += score;
    areaCounts[area]++;
  });

  const areaPercentages = {};
  Object.keys(areaTotals).forEach((area) => {
    areaPercentages[area] = Math.round((areaTotals[area] / (areaCounts[area] * 5)) * 100);
  });

  const majorScores = {};
  Object.entries(areaMajorMap).forEach(([area, majors]) => {
    majors.forEach((major) => {
      if (!majorScores[major]) majorScores[major] = 0;
      majorScores[major] += areaPercentages[area] || 0;
    });
  });

  return Object.entries(majorScores)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([major, score]) => ({
      major,
      percentage: Math.min(Math.round(score / 2), 99),
      description: majorDescriptions[major] || "A great field to explore.",
    }));
}

function QuizResults() {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, getToken } = useAuth();

  const allAnswers = location.state?.allAnswers || {};
  const topMajors = calculateTopMajors(allAnswers);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const saveToBackend = async () => {
      if (!currentUser?.id || Object.keys(allAnswers).length === 0) return;

      setSaving(true);
      try {
        const token = getToken(); // ← uses meras_token via AuthContext
        const res = await fetch(`/api/users/${currentUser.id}/quiz-results`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            recommendedMajors: topMajors.map((m) => m.major),
          }),
        });
        if (res.ok) setSaved(true);
        else {
          const err = await res.json();
          console.error("Save failed:", err);
        }
      } catch (err) {
        console.error("Failed to save quiz results:", err);
      } finally {
        setSaving(false);
      }
    };

    saveToBackend();
  }, [currentUser]);

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.title}>Your Top Majors</h1>
        <p style={styles.subtitle}>
          Based on your quiz answers, these are your best matches.
          {saving && " Saving your results..."}
          {saved && " ✓ Results saved to your profile!"}
        </p>

        <div style={styles.cardsContainer}>
          {topMajors.map((item, i) => (
            <div
              key={item.major}
              style={{
                ...styles.card,
                borderTop: i === 0 ? "4px solid #3DB87A" : "1px solid #E5E7EB",
              }}
            >
              {i === 0 && <span style={styles.topBadge}>🏆 Best Match</span>}
              <h2 style={styles.majorName}>{item.major}</h2>
              <p style={styles.percentage}>{item.percentage}% Match</p>
              <p style={styles.description}>{item.description}</p>
            </div>
          ))}
        </div>

        <div style={styles.buttonRow}>
          <button style={styles.primaryButton} onClick={() => navigate("/explorer/challengeCatalog")}>
            Explore Challenges
          </button>
          <button style={styles.secondaryButton} onClick={() => navigate("/explorer/compass-quiz")}>
            Retake Quiz
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page:      { minHeight: "100vh", backgroundColor: "#F0F2F0", padding: "24px", fontFamily: "'Plus Jakarta Sans', sans-serif" },
  container: { maxWidth: "1000px", margin: "0 auto", backgroundColor: "#FFFFFF", border: "1px solid #E5E7EB", borderRadius: "16px", padding: "32px" },
  title:     { fontSize: "36px", marginBottom: "8px", color: "#000000" },
  subtitle:  { fontSize: "16px", color: "#A1A1A1", marginBottom: "24px" },
  cardsContainer: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "20px", marginBottom: "30px" },
  card:      { border: "1px solid #E5E7EB", borderRadius: "14px", padding: "20px", backgroundColor: "#FFFFFF", boxShadow: "0 2px 8px rgba(0,0,0,0.05)", position: "relative" },
  topBadge:  { fontSize: "12px", fontWeight: "700", color: "#3DB87A", marginBottom: "8px", display: "block" },
  majorName: { fontSize: "22px", marginBottom: "10px", color: "#000000" },
  percentage:{ fontSize: "18px", fontWeight: "700", color: "#3DB87A", marginBottom: "10px" },
  description:{ fontSize: "15px", color: "#333333", lineHeight: "1.5" },
  buttonRow: { display: "flex", gap: "16px", flexWrap: "wrap" },
  primaryButton:   { padding: "12px 20px", backgroundColor: "#2A8C5C", color: "#FFFFFF", border: "none", borderRadius: "10px", cursor: "pointer", fontSize: "15px" },
  secondaryButton: { padding: "12px 20px", backgroundColor: "#FFFFFF", color: "#2A8C5C", border: "1px solid #2A8C5C", borderRadius: "10px", cursor: "pointer", fontSize: "15px" },
};

export default QuizResults;