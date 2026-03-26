import { useState } from "react";
import { useNavigate } from "react-router-dom";

const questions = [
  {
    question: "Do you enjoy math?",
    options: ["Yes", "Sometimes", "No"],
  },
  {
    question: "Do you like drawing?",
    options: ["Yes", "A little", "No"],
  },
  {
    question: "Do you prefer working with people or alone?",
    options: ["With people", "Alone", "Both"],
  },
  {
    question: "Do you enjoy writing?",
    options: ["Yes", "Sometimes", "No"],
  },
  {
    question: "Do you like building things?",
    options: ["Yes", "A little", "No"],
  },
  {
    question: "Are you interested in medicine?",
    options: ["Yes", "A little", "No"],
  },
  {
    question: "Do you enjoy coding?",
    options: ["Yes", "A little", "No"],
  },
];

function CompassQuiz() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(""));
  const navigate = useNavigate();

  const currentQuestion = questions[currentStep];
  const progressPercent = ((currentStep + 1) / questions.length) * 100;

  const handleAnswerClick = (option) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentStep] = option;
    setAnswers(updatedAnswers);
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1 && answers[currentStep]) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFinish = () => {
    navigate("/explorer/quiz-results", {
      state: { answers },
    });
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <p style={styles.stepText}>
          Step {currentStep + 1} of {questions.length}
        </p>

        <div style={styles.progressBarContainer}>
          <div
            style={{
              ...styles.progressBarFill,
              width: `${progressPercent}%`,
            }}
          />
        </div>

        <h2 style={styles.question}>{currentQuestion.question}</h2>

        <div style={styles.optionsContainer}>
          {currentQuestion.options.map((option) => (
            <button
              key={option}
              onClick={() => handleAnswerClick(option)}
              style={{
                ...styles.optionButton,
                backgroundColor:
                  answers[currentStep] === option ? "#3DB87A" : "#FFFFFF",
                color: answers[currentStep] === option ? "#FFFFFF" : "#000000",
                border:
                  answers[currentStep] === option
                    ? "1px solid #3DB87A"
                    : "1px solid #E5E7EB",
              }}
            >
              {option}
            </button>
          ))}
        </div>

        <div style={styles.buttonRow}>
          <button
            onClick={handleBack}
            disabled={currentStep === 0}
            style={{
              ...styles.navButton,
              opacity: currentStep === 0 ? 0.5 : 1,
              cursor: currentStep === 0 ? "not-allowed" : "pointer",
            }}
          >
            Back
          </button>

          {currentStep < questions.length - 1 ? (
            <button
              onClick={handleNext}
              disabled={!answers[currentStep]}
              style={{
                ...styles.navButton,
                opacity: !answers[currentStep] ? 0.5 : 1,
                cursor: !answers[currentStep] ? "not-allowed" : "pointer",
              }}
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleFinish}
              disabled={!answers[currentStep]}
              style={{
                ...styles.navButton,
                opacity: !answers[currentStep] ? 0.5 : 1,
                cursor: !answers[currentStep] ? "not-allowed" : "pointer",
              }}
            >
              See Results
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#F0F2F0",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "24px",
    fontFamily: "Arial, sans-serif",
  },
  card: {
    width: "100%",
    maxWidth: "700px",
    backgroundColor: "#FFFFFF",
    border: "1px solid #E5E7EB",
    borderRadius: "16px",
    padding: "32px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
  },
  stepText: {
    marginBottom: "12px",
    color: "#A1A1A1",
    fontSize: "14px",
  },
  progressBarContainer: {
    width: "100%",
    height: "10px",
    backgroundColor: "#E5E7EB",
    borderRadius: "999px",
    overflow: "hidden",
    marginBottom: "24px",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#3DB87A",
    borderRadius: "999px",
  },
  question: {
    fontSize: "28px",
    marginBottom: "24px",
    color: "#000000",
  },
  optionsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
    marginBottom: "28px",
  },
  optionButton: {
    padding: "14px 16px",
    borderRadius: "12px",
    fontSize: "16px",
    textAlign: "left",
    cursor: "pointer",
  },
  buttonRow: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "10px",
  },
  navButton: {
    padding: "12px 22px",
    borderRadius: "10px",
    border: "none",
    backgroundColor: "#2A8C5C",
    color: "#FFFFFF",
    fontSize: "15px",
  },
};

export default CompassQuiz;