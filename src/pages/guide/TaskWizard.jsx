import { useState } from "react";
import "./Guide.css";

function TaskWizard() {
  const [step, setStep] = useState(1);

  const [form, setForm] = useState({
    title: "",
    major: "",
    difficulty: "",
    description: "",
    timeEstimate: "",
    whatYouWillLearn: "",
    whatYouWillDo: "",
    whatYouWillNeed: "",
    instructions: "",
    referenceLinkTitle: "",
    referenceLinkURL: "",
    file: null
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
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

          <input className="input" 
            name="timeEstimate" 
            placeholder="Time (minutes)" 
            value={form.timeEstimate} 
            onChange={handleChange} 
          />
          
          <textarea className="input" 
            name="description" 
            placeholder="Short description" 
            value={form.description} 
            onChange={handleChange} 
          />

        </div>
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <div className="card section">
          <h3 className="title">Learning Content</h3>

          <textarea className="input" 
            name="whatYouWillLearn" 
            placeholder="What will they learn? (one per line)" 
            value={form.whatYouWillLearn} 
            onChange={handleChange} 
          />

          <textarea className="input" 
            name="whatYouWillDo" 
            placeholder="What will they do?" 
            value={form.whatYouWillDo} 
            onChange={handleChange} 
          />

          <textarea className="input" 
            name="whatYouWillNeed" 
            placeholder="What will they need?" 
            value={form.whatYouWillNeed} 
            onChange={handleChange} 
          />


        </div>
      )}

      {/* STEP 3 */}
      {step === 3 && (
        <div className="card section">
          <h3 className="title">Resource</h3>

          <input className="input" 
            name="referenceLinkTitle" 
            placeholder="Reference title" 
            value={form.referenceLinkTitle} 
            onChange={handleChange} 
          />

          <input className="input" 
            name="referenceLinkURL" 
            placeholder="Reference URL" 
            value={form.referenceLinkURL} 
            onChange={handleChange} 
          />

          <input type="file" 
            onChange={(e) => 
              setForm({ ...form, file: e.target.files[0] })} 
          />


        </div>
      )}

      {/* STEP 4 */}
      {step === 4 && (
        <div className="card section">
          <h3 className="title">Instructions & Preview</h3>

          <p><strong>Title:</strong> {form.title}</p>
          <p><strong>Description:</strong> {form.description}</p>
          <p><strong>Difficulty:</strong> {form.difficulty}</p>
          <p><strong>Time:</strong> {form.timeEstimate} mins</p>

          <button className="btn btn-primary" 
          onClick={() => {
            alert("Published Successfully ✅");
            setStep(1);
          }}>
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
          <button className="btn btn-primary" 
                  disabled={
                    (step === 1 && (!form.title || !form.major)) ||
                    (step === 2 && !form.whatYouWillLearn)
                 }
                 onClick={() => setStep(step + 1)}>Next</button>)}
      </div>

    </div>
  );
}

export default TaskWizard;