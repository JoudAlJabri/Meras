import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { MdCameraAlt } from "react-icons/md";
import { apiUpdateExplorerSettings } from "../../api/auth";

const GRADES = ["Grade 10", "Grade 11", "Grade 12"];

function ExplorerSettings() {
  const { currentUser, login, getToken } = useAuth();

  const [firstName, setFirstName] = useState(currentUser?.name?.split(" ")[0] || "");
  const [lastName, setLastName]   = useState(currentUser?.name?.split(" ")[1] || "");
  const [grade, setGrade]         = useState(currentUser?.grade || "");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword]         = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [infoError, setInfoError]     = useState("");
  const [infoSuccess, setInfoSuccess] = useState("");
  const [pwError, setPwError]         = useState("");
  const [pwSuccess, setPwSuccess]     = useState("");

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 600);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleUpdateInfo = async () => {
    setInfoError("");
    setInfoSuccess("");
    try {
      const formData = new FormData();
      if (firstName) formData.append("firstName", firstName);
      if (lastName)  formData.append("lastName", lastName);
      if (grade)     formData.append("grade", grade);

      const data = await apiUpdateExplorerSettings(getToken(), formData);
      login(getToken(), data.user);
      setInfoSuccess("Profile updated successfully.");
    } catch (err) {
      setInfoError(err.message);
    }
  };

  const handleUpdatePassword = async () => {
    setPwError("");
    setPwSuccess("");
    if (!newPassword || newPassword !== confirmPassword) {
      setPwError("Passwords do not match.");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("currentPassword", currentPassword);
      formData.append("newPassword", newPassword);

      await apiUpdateExplorerSettings(getToken(), formData);
      setPwSuccess("Password updated successfully.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setPwError(err.message);
    }
  };

  return (
    <div style={styles.card}>

      {/* Account Information */}
      <h2 style={styles.sectionHeading}>Account Information</h2>
      <hr style={styles.divider} />

      {/* Avatar */}
      <div style={styles.avatarWrapper}>
        <div style={styles.avatar}>
          {currentUser?.profilePhoto
            ? <img src={currentUser.profilePhoto} alt="avatar" style={styles.avatarImg} />
            : <MdCameraAlt size={22} color="#aaa" />
          }
        </div>
      </div>

      {/* Name row */}
      <div style={{ ...styles.row, flexDirection: isMobile ? "column" : "row" }}>
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
      <div style={{ ...styles.row, flexDirection: isMobile ? "column" : "row" }}>
        <div style={styles.field}>
          <label style={styles.label}>Email</label>
          <input style={{ ...styles.input, ...styles.inputDisabled }} value={currentUser?.email || ""} readOnly />
        </div>
        <div style={styles.field}>
          <label style={styles.label}>Grade</label>
          <select style={styles.input} value={grade} onChange={e => setGrade(e.target.value)}>
            <option value="">Select</option>
            {GRADES.map(g => <option key={g} value={g}>{g}</option>)}
          </select>
        </div>
      </div>

      {infoError   && <p style={styles.errorMsg}>{infoError}</p>}
      {infoSuccess && <p style={styles.successMsg}>{infoSuccess}</p>}
      <button style={styles.btnGreen} onClick={handleUpdateInfo}>Update Info</button>

      {/* Change Password */}
      <h2 style={{ ...styles.sectionHeading, marginTop: "36px" }}>Change Password</h2>
      <hr style={styles.divider} />

      <div style={{ ...styles.row, flexDirection: isMobile ? "column" : "row" }}>
        <div style={styles.field}>
          <label style={styles.label}>Current Password</label>
          <input style={styles.input} type="password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} />
        </div>
        <div style={styles.field} />
      </div>

      <div style={{ ...styles.row, flexDirection: isMobile ? "column" : "row" }}>
        <div style={styles.field}>
          <label style={styles.label}>New Password</label>
          <input style={styles.input} type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
        </div>
        <div style={styles.field}>
          <label style={styles.label}>Confirm New Password</label>
          <input style={styles.input} type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
        </div>
      </div>

      {pwError   && <p style={styles.errorMsg}>{pwError}</p>}
      {pwSuccess && <p style={styles.successMsg}>{pwSuccess}</p>}
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
  inputDisabled: {
    backgroundColor: "#F3F4F6",
    color: "#9CA3AF",
    cursor: "not-allowed",
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
  errorMsg: {
    color: "#e53e3e",
    fontSize: "13px",
    marginBottom: "10px",
  },
  successMsg: {
    color: "#16a34a",
    fontSize: "13px",
    marginBottom: "10px",
  },
};

export default ExplorerSettings;
