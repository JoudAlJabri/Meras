import { useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import puzzleImg     from '../../assets/General-Graphics/2PersonPuzzle.png'
import handCodingImg from '../../assets/Tech-Graphics/Hand coding-bro.png'
import './Guide.css'

const SLOTS = [
  'Sun 10:00 AM',
  'Sun 2:00 PM',
  'Mon 12:00 PM',
  'Tue 4:00 PM',
  'Wed 11:00 AM',
  'Thu 3:00 PM',
]

//  Same maps as MentorCard / MentorProfile 
const majorImages = {
  'computer science':        handCodingImg,
  'software engineering':    handCodingImg,
  'computer engineering':    handCodingImg,
  'mechanical engineering':  puzzleImg,
  'electrical engineering':  puzzleImg,
  'civil engineering':       puzzleImg,
  'chemical engineering':    puzzleImg,
  'aerospace engineering':   puzzleImg,
  'bio engineering':         puzzleImg,
  'architecture':            puzzleImg,
  'finance':                 puzzleImg,
  'business administration': puzzleImg,
  'accounting':              puzzleImg,
  'marketing':               puzzleImg,
}

const majorCardColors = {
  'mechanical engineering':  'var(--meras-yellow)',
  'electrical engineering':  'var(--meras-gray)',
  'computer science':        'var(--meras-green)',
  'software engineering':    'var(--meras-green)',
  'computer engineering':    'var(--meras-green)',
  'civil engineering':       'var(--meras-green)',
  'chemical engineering':    'var(--meras-black)',
  'aerospace engineering':   'var(--meras-black)',
  'bio engineering':         'var(--meras-gray)',
  'architecture':            'var(--meras-gray)',
  'finance':                 'var(--meras-yellow)',
  'business administration': 'var(--meras-yellow)',
  'accounting':              'var(--meras-yellow)',
  'marketing':               'var(--meras-yellow)',
}

const onColor = {
  'var(--meras-green)':  '#ffffff',
  'var(--meras-yellow)': '#1A0A00',
  'var(--meras-black)':  '#ffffff',
  'var(--meras-gray)':   '#1A0A00',
}

function BookingPage() {
  const navigate = useNavigate()
  const { state: mentor } = useLocation()

  const [selectedSlot, setSelectedSlot] = useState(null)
  const [topic, setTopic]               = useState('')
  const [showModal, setShowModal]       = useState(false)

  const majorKey   = mentor?.major?.toLowerCase()
  const cardColor  = majorCardColors[majorKey] ?? 'var(--meras-green)'
  const textColor  = onColor[cardColor] ?? '#ffffff'
  const illustration = useMemo(() => majorImages[majorKey] ?? puzzleImg, [majorKey])

  if (!mentor) {
    return <p className="page-container">No mentor selected.</p>
  }

  const isReady = selectedSlot && topic.trim()

  return (
    <div className="bk-wrap">

      {/* ── MENTOR INFO CARD ── */}
      <div className="bk-mentor-card">
        <div className="bk-thumb" style={{ backgroundColor: cardColor }}>
          <img src={illustration} alt={mentor.major} className="bk-thumb-img" />
        </div>
        <div className="bk-mentor-info">
          <div className="bk-mentor-name">
            {mentor.name}
            {mentor.isVerified && <span className="bk-verified">✓</span>}
          </div>
          <div className="bk-mentor-meta">{mentor.major} · {mentor.university}</div>
          <div className="bk-mentor-rating">
            <span className="bk-star">★</span> {mentor.rating} · {mentor.totalSessions} sessions
          </div>
        </div>
      </div>

    

      {/* ── TIME SLOTS ── */}
      <div className="bk-card">
        <h3 className="bk-card-title">Select a Time Slot</h3>
        <div className="bk-slots-grid">
          {SLOTS.map((slot) => (
            <button
              key={slot}
              className="bk-slot-pill"
              style={
                selectedSlot === slot
                  ? { backgroundColor: cardColor, color: textColor, borderColor: cardColor }
                  : {}
              }
              onClick={() => setSelectedSlot(slot)}
            >
              {slot}
            </button>
          ))}
        </div>
      </div>

      {/* ── SESSION TOPIC ── */}
      <div className="bk-card">
        <h3 className="bk-card-title">Session Topic</h3>
        <input
          className="bk-input"
          type="text"
          placeholder="What do you need help with?"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />
      </div>

      {/* ── CONFIRM BUTTON ── */}
      <button
        className="bk-confirm-btn"
        disabled={!isReady}
        style={
          isReady
            ? { backgroundColor: cardColor, color: textColor, opacity: 1 }
            : {}
        }
        onClick={() => setShowModal(true)}
      >
        Confirm Booking →
      </button>

      {/* CONFIRMATION MODAL */}
      {showModal && (
        <div className="bk-modal-overlay">
          <div className="bk-modal">
            <div className="bk-modal-icon" style={{ backgroundColor: cardColor, color: textColor }}>
              ✓
            </div>
            <h2 className="bk-modal-title">Booking Confirmed!</h2>
            <div className="bk-modal-rows">
              <div className="bk-modal-row">
                <span className="bk-modal-key">Guide</span>
                <span className="bk-modal-val">{mentor.name}</span>
              </div>
              <div className="bk-modal-row">
                <span className="bk-modal-key">Time</span>
                <span className="bk-modal-val">{selectedSlot}</span>
              </div>
              <div className="bk-modal-row">
                <span className="bk-modal-key">Topic</span>
                <span className="bk-modal-val">{topic}</span>
              </div>
              <div className="bk-modal-row">
                <span className="bk-modal-key">Meeting link</span>
                <span className="bk-modal-val bk-modal-green">Coming soon</span>
              </div>
            </div>
            <div className="bk-modal-actions">
              <button className="bk-modal-close" onClick={() => setShowModal(false)}>
                Close
              </button>
              <button
                className="bk-modal-home"
                style={{ backgroundColor: cardColor, color: textColor }}
                onClick={() => navigate('/guide/mentors')}
              >
                Back to Directory
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default BookingPage
