import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { MdCameraAlt } from "react-icons/md";
import { MAJORS } from '../../data/mockData'
import { SKILLS } from '../../data/mockData'


function GuideSettings() {
  const { currentUser, login } = useAuth();

  const [firstName, setFirstName] = useState(currentUser?.name?.split(" ")[0] || "");
  const [lastName, setLastName]   = useState(currentUser?.name?.split(" ")[1] || "");
  const [email, setEmail]         = useState(currentUser?.email || "");
  const [major, setMajor]         = useState(currentUser?.major || "");
  const [about, setAbout]         = useState(currentUser?.about || "");
  const [skills, setSkills]       = useState(currentUser?.skills || []);
  const [skillInput, setSkillInput] = useState("");

  const [newPassword, setNewPassword]         = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const addSkill = (skill) => {
    const trimmed = skill.trim();
    if (trimmed && !skills.includes(trimmed)) {
      setSkills([...skills, trimmed]);
    }
    setSkillInput("");
  };

  const removeSkill = (skill) => {
    setSkills(skills.filter(s => s !== skill));
  };

  const handleUpdateInfo = () => {
    login({ ...currentUser, name: `${firstName} ${lastName}`.trim(), email, major, about, skills });
  };

  const handleUpdatePassword = () => {
    if (!newPassword || newPassword !== confirmPassword) return;
    // password update logic 
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div style={styles.card}>

      {/* Account Information */}
      <h2 style={styles.sectionHeading}>Account Information</h2>
      <hr style={styles.divider} />

      {/* Avatar */}
      <div style={styles.avatarWrapper}>
        <div style={styles.avatar}>
          {currentUser?.photoURL
            ? <img src={currentUser.photoURL} alt="avatar" style={styles.avatarImg} />
            : <MdCameraAlt size={22} color="#aaa" />
          }
        </div>
      </div>

      {/* Name row */}
      <div style={styles.row}>
        <div style={styles.field}>
          <label style={styles.label}>First Name <span style={styles.req}>*</span></label>
          <input style={styles.input} value={firstName} onChange={e => setFirstName(e.target.value)} />
        </div>
        <div style={styles.field}>
          <label style={styles.label}>Last Name <span style={styles.req}>*</span></label>
          <input style={styles.input} value={lastName} onChange={e => setLastName(e.target.value)} />
        </div>
      </div>

      {/* Email / Grade row */}
      <div style={styles.row}>
        <div style={styles.field}>
          <label style={styles.label}>Email</label>
          <input style={styles.input} value={email} onChange={e => setEmail(e.target.value)} />
        </div>
        <div style={styles.field}>
          <label style={styles.label}>Major</label>
          <select style={styles.input} value={major} onChange={e => setMajor(e.target.value)}>
            <option value="">Select</option>
            {MAJORS.map(g => <option key={g} value={g}>{g}</option>)}
          </select>
        </div>
      </div>

      {/* About */}
      <div style={{ ...styles.field, marginBottom: "20px" }}>
        <label style={styles.label}>About you</label>
        <textarea
          style={{ ...styles.input, minHeight: "120px", resize: "vertical" }}
          placeholder="Ex: Senior SWE student. Love helping high schoolers discover coding!"
          maxLength={500}
          value={about}
          onChange={e => setAbout(e.target.value)}
        />
        <span style={{ fontSize: "12px", color: "#aaa", textAlign: "right" }}>{about.length}/500</span>
      </div>

      {/* Skills */}
      <div style={{ ...styles.field, marginBottom: "20px" }}>
        <label style={styles.label}>Skills</label>
        <div style={{ display: "flex", gap: "8px" }}>
          <select
            style={{ ...styles.input, flex: 1 }}
            value=""
            onChange={e => { if (e.target.value) addSkill(e.target.value); }}
          >
            <option value="">Select a skill...</option>
            {SKILLS.filter(s => !skills.includes(s)).map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <input
            style={{ ...styles.input, flex: 1 }}
            placeholder="Or type your own skill..."
            value={skillInput}
            onChange={e => setSkillInput(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); addSkill(skillInput); } }}
          />
          <button
            type="button"
            style={{ ...styles.btnGreen, whiteSpace: "nowrap" }}
            onClick={() => addSkill(skillInput)}
          >
            Add
          </button>
        </div>

        {/* Selected skill tags */}
        {skills.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "12px", padding: "12px", border: "1px solid #E5E7EB", borderRadius: "6px", minHeight: "48px" }}>
            {skills.map(skill => (
              <span
                key={skill}
                style={{
                  display: "inline-flex", alignItems: "center", gap: "6px",
                  backgroundColor: "#e8f5ef", color: "var(--meras-green)",
                  border: "1px solid var(--meras-green)", borderRadius: "999px",
                  padding: "4px 12px", fontSize: "13px", fontWeight: "500"
                }}
              >
                #{skill}
                <button
                  type="button"
                  onClick={() => removeSkill(skill)}
                  style={{ background: "none", border: "none", cursor: "pointer", color: "var(--meras-green)", padding: 0, lineHeight: 1, fontSize: "14px" }}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      <button style={styles.btnGreen} onClick={handleUpdateInfo}>Update Info</button>

      {/* Change Password */}
      <h2 style={{ ...styles.sectionHeading, marginTop: "36px" }}>Change Password</h2>
      <hr style={styles.divider} />

      <div style={styles.row}>
        <div style={styles.field}>
          <label style={styles.label}>New Password</label>
          <input style={styles.input} type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
        </div>
        <div style={styles.field}>
          <label style={styles.label}>Confirm New Password</label>
          <input style={styles.input} type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
        </div>
      </div>

      <button style={styles.btnGreen} onClick={handleUpdatePassword}>Update Password</button>

      {/* Delete Account */}
      <hr style={{ ...styles.divider, marginTop: "36px" }} />
      <button style={styles.btnDelete}>Delete Account</button>

    </div>
  );
}

const styles = {
  card: {
    backgroundColor: "#fff",
    borderRadius: "16px",
    padding: "32px",
    maxWidth: "860px",
  },
  sectionHeading: {
    fontSize: "20px",
    fontWeight: "700",
    color: "#111",
    margin: "0 0 12px",
  },
  divider: {
    border: "none",
    borderTop: "1px solid #E5E7EB",
    margin: "0 0 24px",
  },
  avatarWrapper: {
    marginBottom: "24px",
  },
  avatar: {
    width: "64px",
    height: "64px",
    borderRadius: "50%",
    backgroundColor: "#e0e0e0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    cursor: "pointer",
  },
  avatarImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  row: {
    display: "flex",
    gap: "24px",
    marginBottom: "20px",
  },
  field: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    gap: "6px",
  },
  label: {
    fontSize: "13px",
    color: "#555",
  },
  req: {
    color: "#e53e3e",
  },
  input: {
    padding: "10px 12px",
    border: "1px solid #D1D5DB",
    borderRadius: "6px",
    fontSize: "14px",
    color: "#111",
    outline: "none",
    backgroundColor: "#fff",
  },
  btnGreen: {
    backgroundColor: "var(--meras-green)",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    padding: "10px 20px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
  },
  btnDelete: {
    backgroundColor: "#fff",
    color: "#e53e3e",
    border: "1px solid #e53e3e",
    borderRadius: "6px",
    padding: "10px 20px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    marginTop: "16px",
  },
};

export default GuideSettings;
