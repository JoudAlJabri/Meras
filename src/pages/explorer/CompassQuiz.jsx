/*import { useState } from "react";
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
    transition: "width 0.4s ease-in-out",
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

export default CompassQuiz;*/

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { questions } from "./QuestionsData"; // Import your 60-question array

function CompassQuiz() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({}); // Stores { questionNumber: score }
  const navigate = useNavigate();

  const currentQuestion = questions[currentStep];
  const totalQuestions = questions.length;
  const progressPercent = ((currentStep + 1) / totalQuestions) * 100;

  const handleAnswer = (score) => {
    // Save answer: 5 = Strongly Like, 4 = Like, 3 = Neutral, 2 = Dislike, 1 = Strongly Dislike
    const updatedAnswers = { ...answers, [currentQuestion.number]: { 
      score, 
      area: currentQuestion.area 
    }};
    setAnswers(updatedAnswers);

    if (currentStep < totalQuestions - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Finish and send the raw answers to the results page
      navigate("/explorer/quiz-results", { state: { allAnswers: updatedAnswers } });
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        {/* Header & Progress */}
        <div style={styles.header}>
          <div>
            <h2 style={styles.title}>Meras Career Compass</h2>
            <p style={styles.subtitle}>Discover your path at KFUPM</p>
          </div>
          <div style={styles.stepIndicator}>
            Step {currentStep + 1} of {totalQuestions}
          </div>
        </div>

        <div style={styles.progressContainer}>
          <div style={{ ...styles.progressBar, width: `${progressPercent}%` }} />
        </div>

        {/* Question Text */}
        <div style={styles.questionBox}>
          <h3 style={styles.questionText}>{currentQuestion.text}</h3>
          <p style={styles.instruction}>How much would you like to do this?</p>
        </div>

        {/* Options - Using O*NET's 5-point scale */}
        <div style={styles.optionsGrid}>
          <button onClick={() => handleAnswer(5)} style={{...styles.optBtn, backgroundColor: '#2D6A4F'}}>Strongly Like</button>
          <button onClick={() => handleAnswer(4)} style={{...styles.optBtn, backgroundColor: '#40916C'}}>Like</button>
          <button onClick={() => handleAnswer(3)} style={{...styles.optBtn, backgroundColor: '#D1D5DB', color: '#374151'}}>Neutral</button>
          <button onClick={() => handleAnswer(2)} style={{...styles.optBtn, backgroundColor: '#FF8A8A'}}>Dislike</button>
          <button onClick={() => handleAnswer(1)} style={{...styles.optBtn, backgroundColor: '#EF4444'}}>Strongly Dislike</button>
        </div>

        {/* Navigation */}
        <div style={styles.footer}>
          <button 
            onClick={handleBack} 
            disabled={currentStep === 0} 
            style={{ ...styles.backBtn, opacity: currentStep === 0 ? 0.3 : 1 }}
          >
            ← Previous
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#F3F4F6",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
  card: {
    width: "100%",
    maxWidth: "750px",
    backgroundColor: "#FFFFFF",
    borderRadius: "20px",
    padding: "40px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
    border: "1px solid #E5E7EB",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "20px",
  },
  title: { fontSize: "24px", color: "#004d40", margin: 0 },
  subtitle: { fontSize: "14px", color: "#6B7280", margin: "4px 0 0 0" },
  stepIndicator: { fontSize: "14px", fontWeight: "600", color: "#374151", backgroundColor: "#F3F4F6", padding: "6px 12px", borderRadius: "20px" },
  progressContainer: { width: "100%", height: "8px", backgroundColor: "#E5E7EB", borderRadius: "10px", marginBottom: "40px", overflow: "hidden" },
  progressBar: { height: "100%", backgroundColor: "#3DB87A", transition: "width 0.3s ease" },
  questionBox: { textAlign: "center", marginBottom: "40px" },
  questionText: { fontSize: "28px", color: "#111827", marginBottom: "10px", lineHeight: "1.3" },
  instruction: { fontSize: "16px", color: "#6B7280" },
  optionsGrid: { display: "flex", flexDirection: "column", gap: "12px" },
  optBtn: { 
    padding: "16px", 
    border: "none", 
    borderRadius: "12px", 
    color: "white", 
    fontSize: "16px", 
    fontWeight: "600", 
    cursor: "pointer",
    transition: "transform 0.1s ease"
  },
  footer: { marginTop: "30px", display: "flex", justifyContent: "flex-start" },
  backBtn: { background: "none", border: "none", color: "#9CA3AF", cursor: "pointer", fontWeight: "500" }
};

export default CompassQuiz;