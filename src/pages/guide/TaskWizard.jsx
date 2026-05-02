import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Guide.css";
import { MAJORS } from "../../data/mockData";
import { apiCreateChallenge } from "../../api/challenges";

import taskWizardPic    from "../../assets/TaskWizardImgs/TASKWIZARDPIC.png";
import celebrationPic   from "../../assets/General-Graphics/TaskSubmittedCelebration.png";
import fileSubIcon      from "../../assets/TaskWizardImgs/FileSubmission.png";
import greenFileIcon    from "../../assets/TaskWizardImgs/GreenFile.png";
import yellowFileIcon   from "../../assets/TaskWizardImgs/YellowFile.png";
import grayFileIcon     from "../../assets/TaskWizardImgs/Gray File.png";
import greenLinkIcon    from "../../assets/TaskWizardImgs/GreenLink.png";
import yellowLinkIcon   from "../../assets/TaskWizardImgs/YellowLink.png";
import greyLinkIcon     from "../../assets/TaskWizardImgs/GreyLink.png";

const RIASEC_TAGS     = ["Realistic", "Investigative", "Artistic", "Social", "Enterprising", "Conventional"];
const DIFFICULTY_OPTS = ["Easy", "Medium", "Hard"];
const TIME_OPTS       = ["20 min", "30 min", "40 min", "60 min", "90 min", "120 min"];
const LINK_ICONS      = [greenLinkIcon, yellowLinkIcon, greyLinkIcon];
const MAX_DESC        = 500;

const getLinkIcon  = (i)    => LINK_ICONS[i % LINK_ICONS.length];
const getFileIcon  = (name) => {
  const ext = name.split(".").pop().toLowerCase();
  if (ext === "pdf")                          return greenFileIcon;
  if (["jpg", "jpeg", "png"].includes(ext))   return yellowFileIcon;
  return grayFileIcon;
};

const EMPTY_FORM = {
  title: "", major: "Software Engineering", difficulty: "Easy",
  timeEstimate: "40 min", description: "", tags: [],
  tagSelect: "", tagCustom: "",
  whatYouWillLearn: [], whatYouWillDo: [], whatYouWillNeed: [],
  instructions: "", referenceLinks: [], downloadableFiles: [],
};

function TaskWizard() {
  const navigate  = useNavigate();
  const fileRef   = useRef(null);

  const [step, setStep]           = useState(1);
  const [form, setForm]           = useState({ ...EMPTY_FORM });
  const [errors, setErrors]       = useState({});
  const [isDragging, setDrag]     = useState(false);
  const [isPublishing, setPublishing] = useState(false);

  // Per-section bullet inputs (not part of form state to keep resets simple)
  const [learnInput, setLearnInput] = useState("");
  const [doInput,    setDoInput]    = useState("");
  const [needInput,  setNeedInput]  = useState("");
  const [linkInput,  setLinkInput]  = useState("");

  //  helpers 
  const upd = (patch) => setForm((f) => ({ ...f, ...patch }));
  const clearErr = (key) => setErrors((e) => { const n = { ...e }; delete n[key]; return n; });

  // validation
  const validate1 = () => {
    const e = {};
    if (!form.title.trim())       e.title       = "Title is required";
    if (!form.description.trim()) e.description = "Description is required";
    setErrors(e);
    return !Object.keys(e).length;
  };

  const validate2 = () => {
    const e = {};
    if (!form.whatYouWillLearn.length) e.learn = "Add at least one learning point";
    if (!form.whatYouWillDo.length)    e.do    = "Add at least one activity";
    if (!form.whatYouWillNeed.length)  e.need  = "Add at least one requirement";
    setErrors(e);
    return !Object.keys(e).length;
  };

  const validate3 = () => {
    const e = {};
    if (!form.instructions.trim()) e.instructions = "Instructions are required";
    setErrors(e);
    return !Object.keys(e).length;
  };

  // navigation 
  const handleNext = () => {
    if (step === 1 && !validate1()) return;
    if (step === 2 && !validate2()) return;
    setErrors({});
    setStep((s) => s + 1);
  };

  // tags 
  const addTag = (raw) => {
    const t = raw.trim();
    if (!t || form.tags.includes(t)) return;
    upd({ tags: [...form.tags, t], tagSelect: "", tagCustom: "" });
  };
  const removeTag = (t) => upd({ tags: form.tags.filter((x) => x !== t) });

  // bullet points (step 2) 
  // Each section (Learn / Do / Need) has its own local input state.
  // Clicking "Add" pushes the trimmed value into the corresponding array inside
  // `form`, then clears the input. The right-side panel re-renders showing the
  // new array as <li> elements — giving the live bullet-point preview.
  const addBullet = (field, value, setter) => {
    const t = value.trim();
    if (!t || form[field].length >= 3) return;
    upd({ [field]: [...form[field], t] });
    setter("");
  };
  const removeBullet = (field, i) =>
    upd({ [field]: form[field].filter((_, idx) => idx !== i) });

  // reference links (step 3) 
  const addLink = () => {
    const t = linkInput.trim();
    if (!t || form.referenceLinks.length >= 5) return;
    upd({ referenceLinks: [...form.referenceLinks, t] });
    setLinkInput("");
  };
  const removeLink = (i) =>
    upd({ referenceLinks: form.referenceLinks.filter((_, idx) => idx !== i) });

  // file upload (step 3)
  const handleFiles = (fileList) => {
    const valid = Array.from(fileList).filter((f) => {
      const ext = f.name.split(".").pop().toLowerCase();
      return ["pdf", "jpg", "jpeg", "png"].includes(ext) && f.size <= 5 * 1024 * 1024;
    });
    upd({ downloadableFiles: [...form.downloadableFiles, ...valid] });
  };
  const removeFile = (i) =>
    upd({ downloadableFiles: form.downloadableFiles.filter((_, idx) => idx !== i) });

  const DIFFICULTY_MAP = { Easy: "Beginner", Medium: "Intermediate", Hard: "Advanced" };

  // publish
  const handlePublish = async () => {
    if (!validate3()) return;
    setPublishing(true);
    try {
      await apiCreateChallenge({
        title:             form.title,
        major:             form.major,
        difficulty:        DIFFICULTY_MAP[form.difficulty],
        timeEstimate:      parseInt(form.timeEstimate),
        description:       form.description,
        tags:              form.tags,
        whatYouWillLearn:  form.whatYouWillLearn,
        whatYouWillDo:     form.whatYouWillDo,
        whatYouWillNeed:   form.whatYouWillNeed,
        instructions:      form.instructions,
        referenceLinks:    form.referenceLinks.map((url) => ({ title: url, url })),
        downloadableFiles: form.downloadableFiles.map((f) => ({ fileName: f.name, fileUrl: "#" })),
      });
      setStep(4);
    } catch (err) {
      setErrors({ submit: err.message });
    } finally {
      setPublishing(false);
    }
  };

  const resetWizard = () => {
    setForm({ ...EMPTY_FORM });
    setLearnInput(""); setDoInput(""); setNeedInput(""); setLinkInput("");
    setErrors({});
    setStep(1);
  };

  // stepper 
  const Stepper = () => (
    <div className="tw-stepper">
      {[1, 2, 3, 4].map((n, i) => (
        <div key={n} className="tw-stepper__item">
          <div className={`tw-stepper__circle${step === n ? " active" : step > n ? " completed" : ""}`}>
            {n}
          </div>
          {i < 3 && <div className={`tw-stepper__line${step > n ? " completed" : ""}`} />}
        </div>
      ))}
    </div>
  );

  // reusable bullet section (step 2) 
  const BulletSection = ({ title, subtitle, placeholder, field, inputVal, setInput, errorKey }) => (
    <div className="tw-experience-section">
      <div className="tw-experience-left">
        <h3 className="heading-sm">{title}</h3>
        <p className="subtext tw-experience-sub">{subtitle}</p>
        <input
          className="input w-full"
          placeholder={placeholder}
          value={inputVal}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addBullet(field, inputVal, setInput); } }}
        />
        <div className="flex-between mt-3">
          <button
            className="btn btn-primary btn-sm"
            disabled={!inputVal.trim() || form[field].length >= 3}
            onClick={() => addBullet(field, inputVal, setInput)}
          >
            Add
          </button>
          <span className="subtext">max: 3 points</span>
        </div>
        {errors[errorKey] && <p className="form-error mt-2">{errors[errorKey]}</p>}
      </div>

      {/* Right side: live bullet-point preview box */}
      <div className="tw-experience-right card-flat">
        <ul className="tw-bullet-list">
          {form[field].map((item, i) => (
            <li key={i} className="tw-bullet-item">
              <span>{item}</span>
              <button className="tw-bullet-remove" onClick={() => removeBullet(field, i)}>×</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  
  return (
    <div className="page-container">

      {/* Page header */}
      <div className="tw-header">
        <div>
          <h1 className="fw-semibold mb-2" style={{ fontSize: '3rem', lineHeight: '1.2', color: 'var(--meras-text)' }}>
            Task Wizard
          </h1>
          <h2 className="fw-semibold" style={{ fontSize: '1.5rem', lineHeight: '1.2', color: 'var(--meras-text)' }}>
            Create Micro-Challenges for <span style={{ color: 'var(--meras-green)' }}>explorers</span>
          </h2>
        </div>
        <img src={taskWizardPic} alt="" className="tw-header__img" />
      </div>

      {step < 4 && <Stepper />}

      {/* STEP 1*/}
      {step === 1 && (
        <div className="card tw-card">
          <h2 className="tw-section-title">The Basics</h2>

          {/* Title */}
          <div className="form-group">
            <label className="form-label">Title</label>
            <input
              className={`input${errors.title ? " input-error" : ""}`}
              placeholder="Ex. Build a simple calculator"
              value={form.title}
              onChange={(e) => { upd({ title: e.target.value }); clearErr("title"); }}
            />
            {errors.title && <p className="form-error">{errors.title}</p>}
          </div>

          {/* Major / Difficulty / Time */}
          <div className="tw-row-3 mt-4">
            <div className="form-group">
              <label className="form-label">Major</label>
              <select className="input" value={form.major} onChange={(e) => upd({ major: e.target.value })}>
                {MAJORS.map((m) => <option key={m}>{m}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Difficulty</label>
              <select className="input" value={form.difficulty} onChange={(e) => upd({ difficulty: e.target.value })}>
                {DIFFICULTY_OPTS.map((d) => <option key={d}>{d}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Time estimate</label>
              <select className="input" value={form.timeEstimate} onChange={(e) => upd({ timeEstimate: e.target.value })}>
                {TIME_OPTS.map((t) => <option key={t}>{t}</option>)}
              </select>
            </div>
          </div>

          {/* Description */}
          <div className="form-group mt-4">
            <label className="form-label">Description</label>
            <div className="tw-textarea-wrap">
              <textarea
                className={`input tw-desc-area${errors.description ? " input-error" : ""}`}
                placeholder="Write a short description for your challenge..."
                value={form.description}
                maxLength={MAX_DESC}
                onChange={(e) => { upd({ description: e.target.value }); clearErr("description"); }}
              />
              <span className="tw-char-count">{form.description.length}/{MAX_DESC}</span>
            </div>
            {errors.description && <p className="form-error">{errors.description}</p>}
          </div>

          {/* Tags */}
          <div className="form-group mt-4">
            <label className="form-label">Tags</label>
            <div className="tw-tags-row">
              <select
                className="input tw-tags-select"
                value={form.tagSelect}
                onChange={(e) => upd({ tagSelect: e.target.value })}
              >
                <option value="">Select tags...</option>
                {RIASEC_TAGS.map((t) => <option key={t}>{t}</option>)}
              </select>
              <input
                className="input tw-tags-custom"
                placeholder="Or type your own tags..."
                value={form.tagCustom}
                onChange={(e) => upd({ tagCustom: e.target.value })}
                onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTag(form.tagCustom); } }}
              />
              <button
                className="btn btn-primary btn-sm"
                onClick={() => addTag(form.tagSelect || form.tagCustom)}
              >
                Add
              </button>
            </div>
            <div className="tw-tags-display card-flat">
              {form.tags.map((t) => (
                <span key={t} className="tag">
                  #{t}
                  <button className="tw-tag-x" onClick={() => removeTag(t)}>×</button>
                </span>
              ))}
            </div>
          </div>

          <div className="tw-footer mt-6">
            <button className="btn btn-amber btn-lg" onClick={handleNext}>Next</button>
          </div>
        </div>
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <div className="card tw-card">
          <h2 className="tw-section-title">What Students Will Experience</h2>

          <BulletSection
            title="What Students Will Learn"
            subtitle="Describe in bullet points what students will learn from your major in this challenge"
            placeholder="Ex. Build a simple calculator"
            field="whatYouWillLearn"
            inputVal={learnInput}
            setInput={setLearnInput}
            errorKey="learn"
          />
          <div className="divider" />
          <BulletSection
            title="What Students Will Do"
            subtitle="Describe in bullet points the main things students will do in this challenge"
            placeholder="Ex. fundamentals of Java"
            field="whatYouWillDo"
            inputVal={doInput}
            setInput={setDoInput}
            errorKey="do"
          />
          <div className="divider" />
          <BulletSection
            title="What Students Will Need"
            subtitle="Describe in bullet points what tools or resources students need for this challenge"
            placeholder="Ex. Laptop, Calculator"
            field="whatYouWillNeed"
            inputVal={needInput}
            setInput={setNeedInput}
            errorKey="need"
          />

          <div className="tw-footer mt-6">
            <button className="btn btn-secondary" onClick={() => setStep(1)}>Back</button>
            <button className="btn btn-amber btn-lg" onClick={handleNext}>Next</button>
          </div>
        </div>
      )}

      {/* STEP 3*/}
      {step === 3 && (
        <div className="card tw-card">
          <h2 className="tw-section-title">Workspace Content</h2>

          {/* Instructions */}
          <div className="form-group">
            <label className="form-label">Instructions</label>
            <textarea
              className={`input tw-instructions-area${errors.instructions ? " input-error" : ""}`}
              placeholder="Write the main instructions for your challenge..."
              value={form.instructions}
              onChange={(e) => { upd({ instructions: e.target.value }); clearErr("instructions"); }}
            />
            {errors.instructions && <p className="form-error">{errors.instructions}</p>}
          </div>

          {/* Reference links */}
          <div className="tw-workspace-row mt-6">
            <div className="tw-workspace-col">
              <h3 className="heading-sm">Reference Links</h3>
              <p className="subtext tw-experience-sub">Optional: Add links to websites, videos or any resources to help students further</p>
              <div className="flex gap-3 items-center">
                <input
                  className="input flex-1"
                  placeholder="https://..."
                  value={linkInput}
                  onChange={(e) => setLinkInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addLink(); } }}
                />
                <button
                  className="btn btn-primary btn-sm"
                  disabled={!linkInput.trim() || form.referenceLinks.length >= 5}
                  onClick={addLink}
                >
                  Add
                </button>
              </div>
              <p className="subtext tw-align-right mt-2">max: 5 links</p>
            </div>

            <div className="tw-workspace-col">
              <h3 className="heading-sm mb-3">Attached Links</h3>
              <div className="card-flat tw-list-box">
                {form.referenceLinks.map((link, i) => (
                  <div key={i} className="tw-list-row">
                    <img src={getLinkIcon(i)} alt="" className="tw-list-icon" />
                    <span className="tw-list-text">{link}</span>
                    <button className="tw-list-x" onClick={() => removeLink(i)}>×</button>
                  </div>
                ))}
                {Array.from({ length: Math.max(0, 3 - form.referenceLinks.length) }).map((_, i) => (
                  <div key={`el-${i}`} className="tw-list-row tw-list-row--empty">
                    <img src={greyLinkIcon} alt="" className="tw-list-icon tw-list-icon--dim" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Downloadable files */}
          <div className="tw-workspace-row mt-6">
            <div className="tw-workspace-col">
              <h3 className="heading-sm">Downloadable Files</h3>
              <p className="subtext tw-experience-sub">Attach the challenge file for students to download</p>
              <div
                className={`tw-dropzone${isDragging ? " tw-dropzone--over" : ""}`}
                onClick={() => fileRef.current?.click()}
                onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
                onDragLeave={() => setDrag(false)}
                onDrop={(e) => { e.preventDefault(); setDrag(false); handleFiles(e.dataTransfer.files); }}
              >
                <img src={fileSubIcon} alt="" className="tw-dropzone__icon" />
                <p className="tw-dropzone__label">Drag &amp; Drop your file here</p>
                <p className="subtext">or click to browse · PDF, JPG, PNG (max 5MB)</p>
                <input
                  ref={fileRef}
                  type="file"
                  className="tw-hidden"
                  accept=".pdf,.jpg,.jpeg,.png"
                  multiple
                  onChange={(e) => handleFiles(e.target.files)}
                />
              </div>
            </div>

            <div className="tw-workspace-col">
              <h3 className="heading-sm mb-3">Uploaded Files</h3>
              <div className="card-flat tw-list-box">
                {form.downloadableFiles.map((file, i) => (
                  <div key={i} className="tw-list-row">
                    <img src={getFileIcon(file.name)} alt="" className="tw-list-icon" />
                    <span className="tw-list-text">{file.name}</span>
                    <button className="tw-list-x" onClick={() => removeFile(i)}>×</button>
                  </div>
                ))}
                {Array.from({ length: Math.max(0, 3 - form.downloadableFiles.length) }).map((_, i) => (
                  <div key={`ef-${i}`} className="tw-list-row tw-list-row--empty">
                    <img src={grayFileIcon} alt="" className="tw-list-icon tw-list-icon--dim" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {errors.submit && <p className="form-error mt-4">{errors.submit}</p>}
          <div className="tw-footer mt-8">
            <button className="btn btn-secondary" onClick={() => setStep(2)}>Back</button>
            <button className="btn btn-amber btn-lg" onClick={handlePublish} disabled={isPublishing}>
              {isPublishing ? "Publishing..." : "Publish!"}
            </button>
          </div>
        </div>
      )}

      {/* STEP 4*/}
      {step === 4 && (
        <div className="tw-success">
          <img src={celebrationPic} alt="Challenge submitted!" className="tw-success__img" />
          <h2 className="tw-success__title">Your challenge has been submitted!</h2>
          <p className="tw-success__body">
            Thank you for sharing your expertise. You've just given high school students a real
            glimpse into your major, and helped someone take one step closer to their future.
          </p>
          <div className="tw-success__actions">
            <button className="btn btn-primary btn-lg" onClick={() => navigate("/guide/dashboard")}>
              Back to Dashboard
            </button>
            <button className="btn btn-amber btn-lg" onClick={resetWizard}>
              Create more challenges
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

export default TaskWizard;
