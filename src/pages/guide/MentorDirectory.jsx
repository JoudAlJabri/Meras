import { useState } from "react";
import { mockMentors } from "../../data/mockData";

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
    <div className="p-4">

      {/* Page Title */}
      <h2>Mentor Directory</h2>

      {/* Search + Filter Section */}
      <div style={{ marginBottom: "20px" }}>
        
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search by name or major..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* University Dropdown */}
        <select
          value={selectedUniversity}
          onChange={(e) => setSelectedUniversity(e.target.value)}
          style={{ marginLeft: "10px" }}
        >
          <option value="">All Universities</option>
          <option value="KFUPM">KFUPM</option>
          <option value="KAU">KAU</option>
        </select>
      </div>

      {/* Mentor Cards */}
      {filteredMentors.map((mentor) => (

        <div key={mentor.id} className="mentor-card">

          {/* Basic Info */}
          <h3>{mentor.name}</h3>
          <p>{mentor.university}</p>
          <p>{mentor.major}</p>

          {/* Stats */}
          <p>⭐ {mentor.rating}</p>
          <p>Sessions: {mentor.totalSessions}</p>
          <p>Rate: ${mentor.hourlyRate}/hr</p>

          {/* Action */}
          <button>View Profile</button>

        </div>
      ))}

      {/* Empty State */}
      {filteredMentors.length === 0 && (
        <p>No mentors found.</p>
      )}

    </div>
  );
}

export default MentorDirectory;