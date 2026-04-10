import { useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { mockChallenges } from '../../data/mockData'
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

const tagFill = {
  'var(--meras-green)':  '#E8F5EF',
  'var(--meras-yellow)': '#FBF5DC',
  'var(--meras-black)':  '#FBF5DC',
  'var(--meras-gray)':   '#e1dfdf',
}

function MentorProfile({ bookingPath = '/guide/booking' }) {
  const navigate = useNavigate()
  const { state: mentor } = useLocation()

  const majorKey   = mentor?.major?.toLowerCase()
  const cardColor  = majorCardColors[majorKey] ?? 'var(--meras-green)'
  const textColor  = onColor[cardColor] ?? '#ffffff'
  const illustration = useMemo(() => majorImages[majorKey] ?? puzzleImg, [majorKey])
  const tagFillColor  = tagFill[cardColor] ?? '#E8F5EF'
  const tagBorderColor = cardColor === 'var(--meras-black)' ? 'var(--meras-yellow)' : cardColor

  if (!mentor) {
    return <p className="page-container">No mentor data found.</p>
  }

  const mentorChallenges = mockChallenges.filter((c) => c.mentorId === mentor.id)

  return (
    <div className="mp-shell">

      {/* Banner */}
      <div className="mp-banner" style={{ backgroundColor: cardColor }}>
        <div className="mp-avatar" style={{ backgroundColor: cardColor }}>
          <img src={illustration} alt={mentor.major} className="mp-avatar-img" />
        </div>
      </div>

      <div className="mp-cards">

        {/* Header Card*/}
        <div className="mp-card">
          <div className="mp-name-row">
            <span className="mp-name">{mentor.name}</span>
            {mentor.isVerified && <span className="mp-verified">✓</span>}
          </div>
          <div className="mp-meta">{mentor.university} · {mentor.major}</div>
          <div className="mp-stats-row">
            <span className="mp-stat"><span className="mp-star">★</span> {mentor.rating}</span>
            <span className="mp-stat-divider" />
            <span className="mp-stat">{mentor.totalSessions} sessions</span>
            <span className="mp-stat-divider" />
          </div>
        </div>

        {/* About mentor*/}
        <div className="mp-card">
          <h3 className="mp-section-title">About</h3>
          <p className="mp-bio">{mentor.bio ?? 'No bio provided yet.'}</p>
        </div>

        {/* ── TAGS ── */}
        {(mentor.tags ?? []).length > 0 && (
          <div className="mp-card">
            <h3 className="mp-section-title">Skills &amp; Topics</h3>
            <div className="mp-skills-row">
              {mentor.tags.map((tag) => (
                <span
                  key={tag}
                  className="mp-skill-pill"
                  style={{
                    backgroundColor: tagFillColor,
                    border: `1.5px solid ${tagBorderColor}`,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* ── new chnanges by joud ── */}
        <div className="mp-card">
          <h3 className="mp-section-title">Published Challenges</h3>
          {mentorChallenges.length === 0 ? (
            <p className="mp-empty">No challenges published yet.</p>
          ) : (
            mentorChallenges.map((c, i) => {
              const chKey   = c.major?.toLowerCase()
              const chColor = majorCardColors[chKey] ?? 'var(--meras-green)'
              const chImg   = majorImages[chKey] ?? puzzleImg
              return (
                <div key={i} className="mp-challenge-item">
                  <div className="mp-ch-thumb" style={{ backgroundColor: chColor }}>
                    <img src={chImg} alt={c.major} className="mp-ch-thumb-img" />
                  </div>
                  <div className="mp-ch-info">
                    <div className="mp-ch-title">{c.title}</div>
                    <div className="mp-ch-meta">{c.major} · {c.difficulty}</div>
                  </div>
                  <span className="mp-ch-badge">{c.timeEstimate ?? 30} min</span>
                </div>
              )
            })
          )}
        </div>

        {/* ── REVIEWS ── */}
        <div className="mp-card">
          <h3 className="mp-section-title">Reviews</h3>
          <div className="mp-reviews-list">
            {(mentor.reviews ?? [
              { stars: 5, text: 'Very helpful mentor! Explained everything clearly.', author: 'Sara M.' },
              { stars: 4, text: 'Explained concepts clearly and patiently.', author: 'Khalid H.' },
            ]).map((r, i) => (
              <div key={i} className="mp-review-item">
                <div className="mp-review-stars">{'★'.repeat(r.stars)}{'☆'.repeat(5 - r.stars)}</div>
                <div className="mp-review-text">"{r.text}"</div>
                <div className="mp-review-author">— {r.author}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── CTA ── */}
        <button
          className="mp-avail-btn"
          style={{ backgroundColor: cardColor, color: textColor }}
          onClick={() => navigate(bookingPath, { state: mentor })}
        >
          View Availability →
        </button>

      </div>
    </div>
  )
}

export default MentorProfile
