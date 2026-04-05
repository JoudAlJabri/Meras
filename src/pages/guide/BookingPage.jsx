import { useState } from "react";
import { mockMentors } from "../../data/mockData";
import "./Guide.css";
import { useLocation } from "react-router-dom";

function BookingPage() {
  const { state: mentor } = useLocation();

if (!mentor) {
  return <p className="page-container">No mentor selected.</p>;
}
  const guide = mentor; 

  const [selectedSlot, setSelectedSlot] = useState(null);
  const [topic, setTopic] = useState("");
  const [showModal, setShowModal] = useState(false);

  // mock weekly slots
  const slots = [
    "Sun 10:00 AM",
    "Sun 2:00 PM",
    "Mon 12:00 PM",
    "Tue 4:00 PM",
    "Wed 11:00 AM",
    "Thu 3:00 PM"
  ];

  return (

      <div className="page-container">

        {/* Guide Info Card */}
        <div className="card flex">
          <div className="avatar">👤</div>
          <div>
            <h2 className="title">{guide.name}</h2>
            <p className="subtext">{guide.major} • {guide.university}</p>
          </div>
        </div>

        {/* Time Slots */}
        <div className="card">
          <h3 className="title">Select a Time Slot</h3>

          <div className="slots-grid">
            {slots.map((slot, index) => (
              <button
                key={index}
                className={`slot-btn ${selectedSlot === slot ? "selected" : ""}`}
                onClick={() => setSelectedSlot(slot)}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>

        {/* Topic Input */}
        <div className="card">
          <h3 className="title">Session Topic</h3>
          <input
            type="text"
            placeholder="What do you need help with?"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="input"
          />
        </div>

        {/* Confirm Button */}
        <button
          className="btn btn-primary btn-full"
          disabled={!selectedSlot || !topic}
          onClick={() => setShowModal(true)}
        >
          Confirm Booking
        </button>

        {/* Modal */}
        {showModal && (
          <div className="modal-overlay">
            <div className="modal">

              <h2>Booking Confirmed ✅</h2>

              <p><strong>Guide:</strong> {guide.name}</p>
              <p><strong>Time:</strong> {selectedSlot}</p>
              <p><strong>Topic:</strong> {topic}</p>
              <p><strong>Meeting Link:</strong> coming soon</p>

              <button
                className="btn"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>

            </div>
          </div>
        )}

      </div>

  );
}

export default BookingPage;