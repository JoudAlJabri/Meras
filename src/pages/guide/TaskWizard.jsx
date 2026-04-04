import { useState } from "react";
import "./Guide.css";
import GuideLayout from "./GuideLayout";

function TaskWizard() {
  const [step, setStep] = useState(1);

  const [form, setForm] = useState({
    title: "",
    major: "",
    difficulty: "",
    instructions: "",
    file: null
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <GuideLayout>
    <div className="page-container">

      {/* Progress */}
      <h2 className="title">Step {step} of 4</h2>

      {/* STEP 1 */}
      {step === 1 && (
        <div className="card section">
          <h3 className="title">Basic Info</h3>

          <input className="input"
            name="title"
            placeholder="Challenge Title"
            value={form.title}
            onChange={handleChange}
          />

          <input className="input"
            name="major"
            placeholder="Major"
            value={form.major}
            onChange={handleChange}
          />

          <select className="input"
            name="difficulty"
            value={form.difficulty}
            onChange={handleChange}
          >
            <option value="">Select Difficulty</option>
            <option>Beginner</option>
            <option>Intermediate</option>
          </select>
        </div>
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <div className="card section">
          <h3 className="title">Instructions</h3>

          <textarea className="input"
            name="instructions"
            placeholder="Write instructions..."
            value={form.instructions}
            onChange={handleChange}
          />
        </div>
      )}

      {/* STEP 3 */}
      {step === 3 && (
        <div className="card section">
          <h3 className="title">Upload Resource</h3>

          <input
            type="file"
            onChange={(e) =>
              setForm({ ...form, file: e.target.files[0] })
            }
          />
        </div>
      )}

      {/* STEP 4 */}
      {step === 4 && (
        <div className="card section">
          <h3 className="title">Preview</h3>

          <p><strong>Title:</strong> {form.title}</p>
          <p><strong>Major:</strong> {form.major}</p>
          <p><strong>Difficulty:</strong> {form.difficulty}</p>
          <p><strong>Instructions:</strong> {form.instructions}</p>
          <p><strong>File:</strong> {form.file?.name}</p>

          <button className="btn btn-primary" onClick={() => alert("Published Successfully ✅")}>
            Publish
          </button>
        </div>
      )}

      {/* Navigation */}
      <div className="flex gap-3 mt-6">
        {step > 1 && (
          <button className="btn btn-secondary" onClick={() => setStep(step - 1)}>Back</button>
        )}

        {step < 4 && (
          <button className="btn btn-primary" onClick={() => setStep(step + 1)}>Next</button>
        )}
      </div>

    </div>
    </GuideLayout>
  );
}

export default TaskWizard;