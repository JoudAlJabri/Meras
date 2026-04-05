import { mockUsers, mockChallenges } from "../../data/mockData";
import "./Guide.css";
import { useNavigate } from "react-router-dom";
// import GuideLayout from "./GuideLayout";

function GuideDashboard() {
  const navigate = useNavigate();
  
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
    //<GuideLayout>
    <div className="page-container">

      {/* Welcome Card */}
      <div className="card section">
        <h2 className="title">Welcome back, {guide?.name} 👋</h2>
        <p className="subtext">Here’s what’s happening today.</p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-4 section">
        <div className="card-stat">
          <h3 className="stat-number">{totalChallenges}</h3>
          <p className="subtext">Challenges</p>
        </div>

        {/*placeholder information*/}
        <div className="card-stat">
          <h3 className="stat-number">3</h3>
          <p className="subtext">Pending Reviews</p>
        </div>

        <div className="card-stat">
          <h3 className="stat-number">12</h3>
          <p className="subtext">Sessions</p>
        </div>
        <div className="card-stat">
          <h3 className="stat-number">$200</h3>
          <p className="subtext">Earnings</p>
        </div>
     </div>

     {/* Recent Submissions */}
     <h3 className="title mt-6">Recent Submissions</h3>
     <div className="card">
     <div className="table-wrapper">
      <table className="table">
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
            <td className="cell-muted">{submission.status}</td>
          </tr>
        ))}
      </tbody>
     </table>
     </div>
     </div>
     

     <div className="flex gap-3 mt-6">
      <button className="btn btn-primary" onClick={() => navigate("/guide/tasks")}>Create Challenge</button>
      <button className="btn btn-secondary" onClick={() => navigate("/guide/grading")}>View Submissions</button>
      <button className="btn btn-secondary" onClick={() => navigate("/guide/booking")}>Set Availability</button>
    </div>
 
    </div>
    //</GuideLayout>
  );
}

export default GuideDashboard;