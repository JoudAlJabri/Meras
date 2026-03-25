import { useState } from "react";

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
    <div className="p-4">

      {/* Progress */}
      <h2>Step {step} of 4</h2>

      {/* STEP 1 */}
      {step === 1 && (
        <div>
          <h3>Basic Info</h3>

          <input
            name="title"
            placeholder="Challenge Title"
            value={form.title}
            onChange={handleChange}
          />

          <input
            name="major"
            placeholder="Major"
            value={form.major}
            onChange={handleChange}
          />

          <select
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
        <div>
          <h3>Instructions</h3>

          <textarea
            name="instructions"
            placeholder="Write instructions..."
            value={form.instructions}
            onChange={handleChange}
          />
        </div>
      )}

      {/* STEP 3 */}
      {step === 3 && (
        <div>
          <h3>Upload Resource</h3>

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
        <div>
          <h3>Preview</h3>

          <p><strong>Title:</strong> {form.title}</p>
          <p><strong>Major:</strong> {form.major}</p>
          <p><strong>Difficulty:</strong> {form.difficulty}</p>
          <p><strong>Instructions:</strong> {form.instructions}</p>
          <p><strong>File:</strong> {form.file?.name}</p>

          <button onClick={() => alert("Published Successfully ✅")}>
            Publish
          </button>
        </div>
      )}

      {/* Navigation */}
      <div style={{ marginTop: "20px" }}>
        {step > 1 && (
          <button onClick={() => setStep(step - 1)}>Back</button>
        )}

        {step < 4 && (
          <button onClick={() => setStep(step + 1)}>Next</button>
        )}
      </div>

    </div>
  );
}

export default TaskWizard;