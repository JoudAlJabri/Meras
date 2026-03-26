import { useLocation, useNavigate } from "react-router-dom";

const majorDescriptions = {
  "Computer Science": "A good fit for students who enjoy coding, logic, and problem solving.",
  "Engineering": "A strong match for students who like math, building things, and technical design.",
  "Medicine": "Best for students interested in healthcare, science, and helping people.",
  "Design": "A great option for students who enjoy drawing, creativity, and visual thinking.",
  "Business": "Suitable for students who like communication, teamwork, and practical decision-making.",
  "Literature": "A good choice for students who enjoy writing, reading, and expressing ideas.",
};

function calculateResults(answers) {
  const scores = {
    "Computer Science": 0,
    Engineering: 0,
    Medicine: 0,
    Design: 0,
    Business: 0,
    Literature: 0,
  };

  if (!answers || answers.length === 0) {
    return [
      {
        major: "Computer Science",
        percentage: 50,
        description: majorDescriptions["Computer Science"],
      },
      {
        major: "Engineering",
        percentage: 45,
        description: majorDescriptions["Engineering"],
      },
      {
        major: "Design",
        percentage: 40,
        description: majorDescriptions["Design"],
      },
    ];
  }

  const yesValue = (answer) => answer === "Yes";
  const littleValue = (answer) =>
    answer === "A little" || answer === "Sometimes" || answer === "Both";

  if (yesValue(answers[0])) scores.Engineering += 30;
  else if (littleValue(answers[0])) scores.Engineering += 15;

  if (yesValue(answers[1])) scores.Design += 35;
  else if (littleValue(answers[1])) scores.Design += 20;

  if (answers[2] === "With people") {
    scores.Business += 25;
    scores.Medicine += 20;
  } else if (answers[2] === "Alone") {
    scores["Computer Science"] += 20;
    scores.Literature += 10;
  } else if (answers[2] === "Both") {
    scores.Business += 15;
    scores["Computer Science"] += 10;
  }

  if (yesValue(answers[3])) scores.Literature += 35;
  else if (littleValue(answers[3])) scores.Literature += 20;

  if (yesValue(answers[4])) scores.Engineering += 35;
  else if (littleValue(answers[4])) scores.Engineering += 20;

  if (yesValue(answers[5])) scores.Medicine += 40;
  else if (littleValue(answers[5])) scores.Medicine += 20;

  if (yesValue(answers[6])) scores["Computer Science"] += 40;
  else if (littleValue(answers[6])) scores["Computer Science"] += 20;

  const sortedMajors = Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([major, score]) => ({
      major,
      percentage: Math.min(score, 100),
      description: majorDescriptions[major],
    }));

  return sortedMajors;
}

function QuizResults() {
  const location = useLocation();
  const navigate = useNavigate();

  const answers = location.state?.answers || [];
  const topMajors = calculateResults(answers);

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.title}>Your Top Majors</h1>
        <p style={styles.subtitle}>Based on your quiz answers, these are your best matches.</p>

        <div style={styles.cardsContainer}>
          {topMajors.map((item) => (
            <div key={item.major} style={styles.card}>
              <h2 style={styles.majorName}>{item.major}</h2>
              <p style={styles.percentage}>{item.percentage}% Match</p>
              <p style={styles.description}>{item.description}</p>
            </div>
          ))}
        </div>

        <div style={styles.buttonRow}>
          <button
            style={styles.primaryButton}
            onClick={() => navigate("/explorer/challengeCatalog")}
          >
            Explore Challenges
          </button>

          <button
            style={styles.secondaryButton}
            onClick={() => navigate("/explorer/compass-quiz")}
          >
            Retake Quiz
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#F0F2F0",
    padding: "24px",
    fontFamily: "Arial, sans-serif",
  },
  container: {
    maxWidth: "1000px",
    margin: "0 auto",
    backgroundColor: "#FFFFFF",
    border: "1px solid #E5E7EB",
    borderRadius: "16px",
    padding: "32px",
  },
  title: {
    fontSize: "36px",
    marginBottom: "8px",
    color: "#000000",
  },
  subtitle: {
    fontSize: "16px",
    color: "#A1A1A1",
    marginBottom: "24px",
  },
  cardsContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "20px",
    marginBottom: "30px",
  },
  card: {
    border: "1px solid #E5E7EB",
    borderRadius: "14px",
    padding: "20px",
    backgroundColor: "#FFFFFF",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
  },
  majorName: {
    fontSize: "22px",
    marginBottom: "10px",
    color: "#000000",
  },
  percentage: {
    fontSize: "18px",
    fontWeight: "700",
    color: "#3DB87A",
    marginBottom: "10px",
  },
  description: {
    fontSize: "15px",
    color: "#333333",
    lineHeight: "1.5",
  },
  buttonRow: {
    display: "flex",
    gap: "16px",
    flexWrap: "wrap",
  },
  primaryButton: {
    padding: "12px 20px",
    backgroundColor: "#2A8C5C",
    color: "#FFFFFF",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "15px",
  },
  secondaryButton: {
    padding: "12px 20px",
    backgroundColor: "#FFFFFF",
    color: "#2A8C5C",
    border: "1px solid #2A8C5C",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "15px",
  },
};

export default QuizResults;