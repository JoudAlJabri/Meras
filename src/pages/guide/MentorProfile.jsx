import { mockMentors, mockChallenges } from "../../data/mockData";
import "./guide.css";

function MentorProfile() {

  // 🔹 Select mentor (temporary static)
  const mentor = mockMentors[0];

  // 🔹 Filter mentor challenges
  const mentorChallenges = mockChallenges.filter(
    (c) => c.mentorId === mentor.id
  );

  return (
    <div className="guide-container">

      {/* 🔹 PROFILE HEADER */}
      <div className="card profile-header">
        <div className="avatar">👤</div>

        <h2 className="title">
          {mentor.name} {mentor.isVerified && "✔️"}
        </h2>

        <p className="subtext">
          {mentor.university} • {mentor.major}
        </p>

        <p>
          ⭐ {mentor.rating} | {mentor.totalSessions} sessions
        </p>
      </div>

      {/* 🔹 BIO */}
      <div className="card">
        <h3 className="title">About</h3>
        <p className="subtext">{mentor.bio}</p>
      </div>

      {/* 🔹 SKILLS */}
      <div className="card">
        <h3 className="title">Skills</h3>

        <div>
          <span className="tag">#React</span>
          <span className="tag">#Python</span>
          <span className="tag">#DataScience</span>
        </div>
      </div>

      {/* 🔹 CHALLENGES */}
      <div className="card">
        <h3 className="title">Published Challenges</h3>

        {mentorChallenges.map((c) => (
          <div key={c.id}>
            <p>{c.title}</p>
            <p className="subtext">{c.difficulty}</p>
          </div>
        ))}

        {mentorChallenges.length === 0 && (
          <p className="subtext">No challenges yet.</p>
        )}
      </div>

      {/* 🔹 BUTTON */}
      <div className="card">
        <button className="btn">View Availability</button>
      </div>

      {/* 🔹 REVIEWS */}
      <div className="card">
        <h3 className="title">Reviews</h3>

        <p>⭐ 5 - "Very helpful mentor!"</p>
        <p>⭐ 4 - "Explained concepts clearly."</p>
      </div>

    </div>
  );
}

export default MentorProfile;