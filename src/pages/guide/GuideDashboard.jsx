import { mockUsers, mockChallenges } from "../../data/mockData";

function GuideDashboard() {
  const guide = mockUsers.find(user => user.role === "guide");
  const totalChallenges = mockChallenges.filter(
  c => c.mentorId === guide.id
).length;

// mock data
const submissions = [
  {
    studentName: mockUsers[0].name,
    challengeTitle: mockChallenges[0].title,
    status: "Pending"
  },
  {
    studentName: mockUsers[0].name,
    challengeTitle: mockChallenges[1].title,
    status: "Reviewed"
  }
];

  return (
    <div className="p-4">

      {/* ✅ Welcome Card */}
      <div className="welcome-card">
        <h2>Welcome back, {guide?.name} 👋</h2>
        <p>Here’s what’s happening today.</p>
      </div>

      {/* Stats Row */}
      <div className="stats-row">
        <div className="stat-card">
          <h3>{totalChallenges}</h3>
          <p>Challenges</p>
        </div>

        {/*placeholder information*/}
        <div className="stat-card">
          <h3>3</h3>
          <p>Pending Reviews</p>
        </div>

        <div className="stat-card">
          <h3>12</h3>
          <p>Sessions</p>
        </div>
        <div className="stat-card">
          <h3>$200</h3>
          <p>Earnings</p>
        </div>
     </div>

     {/* Recent Submissions */}
     <h3>Recent Submissions</h3>
     <table border="1" cellPadding="8">
      <thead>
        <tr>
          <th>Student</th>
          <th>Challenge</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {submissions.map((submission, index) => (
          <tr key={index}>
            <td>{submission.studentName}</td>
            <td>{submission.challengeTitle}</td>
            <td>{submission.status}</td>
          </tr>
        ))}
      </tbody>
     </table>

     <div style={{ marginTop: "20px" }}>
      <button>Create Challenge</button>
      <button>View Submissions</button>
      <button>Set Availability</button>
    </div>
 
    </div>
  );
}

export default GuideDashboard;