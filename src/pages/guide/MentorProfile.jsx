import { mockMentors, mockChallenges } from "../../data/mockData";
import "./Guide.css";
import GuideLayout from "./GuideLayout";

function MentorProfile() {

  // 🔹 Select mentor (temporary static)
  const mentor = mockMentors[0];

  // 🔹 Filter mentor challenges
  const mentorChallenges = mockChallenges.filter(
    (c) => c.mentorId === mentor.id
  );

  return (
    <GuideLayout>
    <div className="page-container">

      {/* 🔹 PROFILE HEADER */}
      <div className="card section flex">
        <div className="avatar">👤</div>

        <h2 className="title">
          {mentor.name} {mentor.isVerified && "✔️"}
        </h2>

        <p className="subtext">
          {mentor.university} • {mentor.major}
        </p>

        <p className="subtext">
          ⭐ {mentor.rating} | {mentor.totalSessions} sessions
        </p>
      </div>

      {/* 🔹 BIO */}
      <div className="card section">
        <h3 className="title">About</h3>
        <p className="subtext">{mentor.bio}</p>
      </div>

      {/* 🔹 SKILLS */}
      <div className="card section">
        <h3 className="title">Skills</h3>

        <div className="flex gap-2 mt-2">
          <span className="tag">#React</span>
          <span className="tag">#Python</span>
          <span className="tag">#DataScience</span>
        </div>
      </div>

      {/* 🔹 CHALLENGES */}
      <div className="card section">
        <h3 className="title">Published Challenges</h3>

        {mentorChallenges.map((c) => (
          <div key={c.id} className="mt-2">
            <p>{c.title}</p>
            <p className="subtext">{c.difficulty}</p>
          </div>
        ))}

        {mentorChallenges.length === 0 && (
          <p className="subtext">No challenges yet.</p>
        )}
      </div>

      {/* 🔹 BUTTON */}
      <div className="card section">
        <button className="btn btn-primary">View Availability</button>
      </div>

      {/* 🔹 REVIEWS */}
      <div className="card section">
        <h3 className="title">Reviews</h3>

        <p className="subtext">⭐ 5 - "Very helpful mentor!"</p>
        <p className="subtext">⭐ 4 - "Explained concepts clearly."</p>
      </div>

    </div>
    </GuideLayout>
  );
}

export default MentorProfile;