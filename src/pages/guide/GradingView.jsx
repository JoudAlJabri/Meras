import { useState } from "react";
import "./Guide.css";

function GradingView() {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="page-container">

      <h2 className="title">Student Submissions</h2>
      <div className="card section">

      {/* Mock submission */}
      <p className="subtext"><strong>Student:</strong> Sara Mohammed</p>
      <p className="subtext"><strong>Submission:</strong> File uploaded (mock)</p>

      {/* ⭐ Rating */}
      <h3 className="title">Rating</h3>
      <div>
        {[1,2,3,4,5].map((star) => (
          <span
            key={star}
            onClick={() => setRating(star)}
            style={{
              cursor: "pointer",
              color: star <= rating ? "gold" : "gray",
              fontSize: "24px"
            }}
          >
            ⭐
          </span>
        ))}
      </div>

      {/* Feedback */}
      <h3 className="title">Feedback</h3>
      <textarea className="input"
        placeholder="Write feedback..."
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
      />

      {/* Submit */}
      <button className="btn btn-primary" disabled={rating === 0 || feedback === ""}
  onClick={() => setSubmitted(true)}>
        Submit Grade
      </button>

      {/* Success */}
      {submitted && <p className="subtext">Grade submitted successfully ✅</p>}

    </div>

    </div>
  );
}

export default GradingView;