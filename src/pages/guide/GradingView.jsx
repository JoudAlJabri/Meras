import { useState } from "react";

function GradingView() {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="p-4">

      <h2>Student Submission</h2>

      {/* Mock submission */}
      <p><strong>Student:</strong> Sara Mohammed</p>
      <p><strong>Submission:</strong> File uploaded (mock)</p>

      {/* ⭐ Rating */}
      <h3>Rating</h3>
      <div>
        {[1,2,3,4,5].map((star) => (
          <span
            key={star}
            onClick={() => setRating(star)}
            style={{
              cursor: "pointer",
              color: star <= rating ? "gold" : "gray",
              fontSize: "20px"
            }}
          >
            ⭐
          </span>
        ))}
      </div>

      {/* Feedback */}
      <h3>Feedback</h3>
      <textarea
        placeholder="Write feedback..."
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
      />

      {/* Submit */}
      <br />
      <button onClick={() => setSubmitted(true)}>
        Submit Grade
      </button>

      {/* Success */}
      {submitted && <p>Grade submitted successfully ✅</p>}

    </div>
  );
}

export default GradingView;