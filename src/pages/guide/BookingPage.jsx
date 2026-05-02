import { useMemo, useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import puzzleImg from '../../assets/General-Graphics/2PersonPuzzle.png'
import swe  from '../../assets/Tech-Graphics/Software-Engineering.png'
import cs   from '../../assets/Tech-Graphics/Computer-Science.png'
import coe  from '../../assets/Tech-Graphics/Computer-Engineering.png'
import me   from '../../assets/Engineering-Graphics/Mechanical-Engineering.png'
import ee   from '../../assets/Engineering-Graphics/Electrical-Engineering.png'
import che  from '../../assets/Engineering-Graphics/Chemical-Engineering.png'
import phys from '../../assets/Engineering-Graphics/Physics.png'
import ind  from '../../assets/Engineering-Graphics/Industrial-Engineering.png'
import math from '../../assets/Engineering-Graphics/Math.png'
import aero from '../../assets/Engineering-Graphics/AeroSpace-Engineering.png'
import arch from '../../assets/Engineering-Graphics/Architecture.png'
import bio  from '../../assets/Engineering-Graphics/Bio-Engineering.png'
import fin  from '../../assets/Business-Graphics/Finance.svg'
import acc  from '../../assets/Business-Graphics/Accounting.png'
import mkt  from '../../assets/Business-Graphics/Marketing.png'
import mis  from '../../assets/Business-Graphics/MIS.png'
import bus  from '../../assets/Business-Graphics/Business.png'
import { apiGetAvailability, apiBookSession } from '../../api/guide'

import './Guide.css'

const majorImages = {
  'computer science':              cs,
  'software engineering':          swe,
  'computer engineering':          coe,
  'mechanical engineering':        me,
  'electrical engineering':        ee,
  'civil engineering':             puzzleImg,
  'chemical engineering':          che,
  'aerospace engineering':         aero,
  'bio engineering':               bio,
  'architecture':                  arch,
  'physics':                       phys,
  'industrial engineering':        ind,
  'math':                          math,
  'finance':                       fin,
  'business administration':       bus,
  'accounting':                    acc,
  'marketing':                     mkt,
  'management information system': mis,
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

// "2026-05-04" + "10:00 AM" → Date ISO string
function slotToISO(dateStr, timeStr) {
  const [y, m, d] = dateStr.split('-').map(Number)
  const [timePart, meridiem] = timeStr.split(' ')
  let [hours, minutes] = timePart.split(':').map(Number)
  if (meridiem === 'PM' && hours !== 12) hours += 12
  if (meridiem === 'AM' && hours === 12) hours = 0
  return new Date(y, m - 1, d, hours, minutes || 0).toISOString()
}

// "2026-05-04" → "Mon May 4"
function formatDate(dateStr) {
  const [y, m, d] = dateStr.split('-').map(Number)
  return new Date(y, m - 1, d).toLocaleDateString('en-US', {
    weekday: 'short', month: 'short', day: 'numeric',
  })
}

function BookingPage() {
  const navigate = useNavigate()
  const { state: mentor } = useLocation()

  const [availability, setAvailability] = useState([])
  const [loadingSlots, setLoadingSlots]   = useState(true)
  const [selectedSlot, setSelectedSlot]   = useState(null) // { date, time }
  const [topic, setTopic]                 = useState('')
  const [confirming, setConfirming]       = useState(false)
  const [booking, setBooking]             = useState(null)  // confirmed booking object
  const [error, setError]                 = useState(null)

  const majorKey    = mentor?.major?.toLowerCase()
  const cardColor   = majorCardColors[majorKey] ?? 'var(--meras-green)'
  const textColor   = onColor[cardColor] ?? '#ffffff'
  const illustration = useMemo(() => majorImages[majorKey] ?? puzzleImg, [majorKey])

  // Fetch guide's real availability
  useEffect(() => {
    if (!mentor?._id) return
    apiGetAvailability(mentor._id)
      .then(({ availability: raw }) => {
        // Filter out past dates
        const today = new Date(); today.setHours(0, 0, 0, 0)
        const future = (raw || []).filter(({ date }) => {
          const [y, m, d] = date.split('-').map(Number)
          return new Date(y, m - 1, d) >= today
        })
        setAvailability(future)
      })
      .catch(() => setAvailability([]))
      .finally(() => setLoadingSlots(false))
  }, [mentor?._id])

  if (!mentor) {
    return <p className="page-container">No mentor selected.</p>
  }

  // Flatten into a list of { date, time } objects for display
  const allSlots = availability.flatMap(({ date, slots }) =>
    slots.map(time => ({ date, time }))
  )

  const isReady = selectedSlot && topic.trim()

  async function handleConfirm() {
    if (!isReady || confirming) return
    setConfirming(true)
    setError(null)
    try {
      const isoSlot = slotToISO(selectedSlot.date, selectedSlot.time)
      const { booking: b } = await apiBookSession({
        mentorEmail: mentor.email,
        slot: isoSlot,
        topic: topic.trim(),
      })
      setBooking(b)
    } catch (err) {
      setError(err.message)
    } finally {
      setConfirming(false)
    }
  }

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
        {loadingSlots ? (
          <p style={{ fontSize: '14px', color: '#6B7280' }}>Loading availability…</p>
        ) : allSlots.length === 0 ? (
          <p style={{ fontSize: '14px', color: '#6B7280' }}>
            This guide hasn't set any upcoming availability yet.
          </p>
        ) : (
          <div className="bk-slots-grid">
            {allSlots.map(({ date, time }) => {
              const isActive = selectedSlot?.date === date && selectedSlot?.time === time
              return (
                <button
                  key={`${date}-${time}`}
                  className="bk-slot-pill"
                  style={isActive ? { backgroundColor: cardColor, color: textColor, borderColor: cardColor } : {}}
                  onClick={() => setSelectedSlot({ date, time })}
                >
                  {formatDate(date)} · {time}
                </button>
              )
            })}
          </div>
        )}
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

      {error && (
        <p style={{ color: '#EF4444', fontSize: '14px', margin: 0 }}>{error}</p>
      )}

      {/* ── CONFIRM BUTTON ── */}
      <button
        className="bk-confirm-btn"
        disabled={!isReady || confirming}
        style={isReady && !confirming
          ? { backgroundColor: cardColor, color: textColor, opacity: 1 }
          : {}}
        onClick={handleConfirm}
      >
        {confirming ? 'Booking…' : 'Confirm Booking →'}
      </button>

      {/* ── CONFIRMATION MODAL ── */}
      {booking && (
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
                <span className="bk-modal-val">
                  {formatDate(selectedSlot.date)} · {selectedSlot.time}
                </span>
              </div>
              <div className="bk-modal-row">
                <span className="bk-modal-key">Topic</span>
                <span className="bk-modal-val">{booking.topic}</span>
              </div>
              <div className="bk-modal-row">
                <span className="bk-modal-key">Meeting link</span>
                <a
                  href={booking.meetingLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bk-modal-val bk-modal-green"
                  style={{ fontWeight: 600 }}
                >
                  Join on Jitsi Meet →
                </a>
              </div>
            </div>
            <div className="bk-modal-actions">
              <button className="bk-modal-close" onClick={() => navigate(-2)}>
                Back to Directory
              </button>
              <button
                className="bk-modal-home"
                style={{ backgroundColor: cardColor, color: textColor }}
                onClick={() => navigate('/explorer/dashboard')}
              >
                Go to Dashboard
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default BookingPage
