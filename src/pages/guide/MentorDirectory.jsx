import { useState } from "react";
import { mockMentors } from "../../data/mockData";
import "./Guide.css";

function MentorDirectory() {
  // State for search input
  const [search, setSearch] = useState("");

  // State for university filter
  const [selectedUniversity, setSelectedUniversity] = useState("");

  // Filter logic
  const filteredMentors = mockMentors.filter((mentor) => {
    const matchesSearch =
      mentor.name.toLowerCase().includes(search.toLowerCase()) ||
      mentor.major.toLowerCase().includes(search.toLowerCase());

    const matchesUniversity =
      selectedUniversity === "" || mentor.university === selectedUniversity;

    return matchesSearch && matchesUniversity;
  });

  return (
    <div className="page-container">

      {/* Page Title */}
      <h2 className="title">Mentor Directory</h2>

      {/* Search + Filter Section */}
      <div className="card section flex gap-3">
        
        {/* Search Input */}
        <input
        className="input"
          type="text"
          placeholder="Search by name or major..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* University Dropdown */}
        <select
        className="input"
          value={selectedUniversity}
          onChange={(e) => setSelectedUniversity(e.target.value)}
        >
          <option value="">All Universities</option>
          <option value="KFUPM">KFUPM</option>
          <option value="KAU">KAU</option>
        </select>
      </div>

      {/* Mentor Cards */}
      <div className="grid grid-3 section">
      {filteredMentors.map((mentor) => (

        <div key={mentor.id} className="card section">

          {/* Basic Info */}
          <h3 className="title">{mentor.name}</h3>
          <p className="subtext">{mentor.university}</p>
          <p className="subtext">{mentor.major}</p>

          {/* Stats */}
          <p className="subtext">⭐ {mentor.rating}</p>
          <p className="subtext">Sessions: {mentor.totalSessions}</p>
          <p className="subtext">Rate: ${mentor.hourlyRate}/hr</p>

          {/* Action */}
          <button className="btn btn-secondary">View Profile</button>

        </div>
      ))}
      </div>

      {/* Empty State */}
      {filteredMentors.length === 0 && (
        <p className="subtext mt-6">No mentors found.</p>
      )}

    </div>
  );
}

export default MentorDirectory;