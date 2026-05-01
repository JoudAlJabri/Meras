import { useState, useEffect } from 'react'
import { useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { apiGetChallengeById } from '../../../api/challenges'
import puzzleImg from '../../../assets/General-Graphics/2PersonPuzzle.png'
import swe  from '../../../assets/Tech-Graphics/Software-Engineering.png'
import cs   from '../../../assets/Tech-Graphics/Computer-Science.png'
import coe  from '../../../assets/Tech-Graphics/Computer-Engineering.png'
import me   from '../../../assets/Engineering-Graphics/Mechanical-Engineering.png'
import ee   from '../../../assets/Engineering-Graphics/Electrical-Engineering.png'
import che  from '../../../assets/Engineering-Graphics/Chemical-Engineering.png'
import phys from '../../../assets/Engineering-Graphics/Physics.png'
import ind  from '../../../assets/Engineering-Graphics/Industrial-Engineering.png'
import math from '../../../assets/Engineering-Graphics/Math.png'
import aero from '../../../assets/Engineering-Graphics/AeroSpace-Engineering.png'
import arch from '../../../assets/Engineering-Graphics/Architecture.png'
import bio  from '../../../assets/Engineering-Graphics/Bio-Engineering.png'
import fin  from '../../../assets/Business-Graphics/Finance.svg'
import acc  from '../../../assets/Business-Graphics/Accounting.png'
import mkt  from '../../../assets/Business-Graphics/Marketing.png'
import mis  from '../../../assets/Business-Graphics/MIS.png'
import bus  from '../../../assets/Business-Graphics/Business.png'

const majorImages = {
  'computer science':              [cs],
  'software engineering':          [swe],
  'computer engineering':          [coe],
  'mechanical engineering':        [me],
  'electrical engineering':        [ee],
  'civil engineering':             [puzzleImg],
  'chemical engineering':          [che],
  'aerospace engineering':         [aero],
  'bio engineering':               [bio],
  'architecture':                  [arch],
  'physics':                       [phys],
  'industrial engineering':        [ind],
  'math':                          [math],
  'finance':                       [fin],
  'business administration':       [bus],
  'accounting':                    [acc],
  'marketing':                     [mkt],
  'management information system': [mis],
}
const fallbackImages = [puzzleImg]


function ChallengeDetail() {
  const { id } = useParams()
  const { id } = useParams()
  const navigate = useNavigate()

  const [challenge, setChallenge] = useState(null)
  const [saved, setSaved] = useState(false)
  const [challenge, setChallenge] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    apiGetChallengeById(id)
      .then(data => setChallenge(data.challenge))
      .catch(err => console.error('Failed to load challenge:', err.message))
      .finally(() => setLoading(false))
  }, [id])

  const mentor = null

  if (loading) {
    return <div className="text-center py-5" style={{ color: 'var(--meras-gray)' }}>Loading...</div>
  }

  if (!challenge) {
    return (
      <div className="text-center py-5">
        <h3>Challenge not found</h3>
        <Link to="/explorer/challengeCatalog">Back to Catalog</Link>
      </div>
    )
  }

  // Color per major
  const majorCardColors = {
  'mechanical engineering': 'var(--meras-yellow)',
  'electrical engineering': 'var(--meras-gray)',
  'electrical engineering and physics': 'var(--meras-black)',
  'industrial and systems engineering': 'var(--meras-yellow)',
  'material science and engineering': 'var(--meras-gray)',
  'computer science': 'var(--meras-green)',
  'software engineering': 'var(--meras-green)',
  'computer engineering': 'var(--meras-green)',
  'civil engineering': 'var(--meras-green)',
  'integrated design': 'var(--meras-green)',
  'smart and sustainable cities': 'var(--meras-yellow)',
  'petroleum engineering': 'var(--meras-gray)',
  'geophysics': 'var(--meras-gray)',
  'geology': 'var(--meras-black)',
  'chemical engineering': 'var(--meras-black)',
  'aerospace engineering': 'var(--meras-black)',
  'physics': 'var(--meras-black)',
  'chemistry': 'var(--meras-green)',
  'math': 'var(--meras-black)',
  'bio engineering': 'var(--meras-gray)',
  'control and instrumentation engineering': 'var(--meras-green)',
  'architecture': 'var(--meras-gray)',
  'finance': 'var(--meras-yellow)',
  'business administration': 'var(--meras-yellow)',
  'accounting': 'var(--meras-yellow)',
  'human resources' : 'var(--meras-yellow)',
  'marketing' : 'var(--meras-yellow)',
  'management information system': 'var(--meras-yellow)',
}


  const heroColor = majorCardColors[challenge.major?.toLowerCase()] || 'var(--meras-green)'
  const heroColor = majorCardColors[challenge.major?.toLowerCase()] || 'var(--meras-green)'

  // Difficulty dots
  const difficultyLevel = {
    'Beginner': 1,
    'Intermediate': 2,
    'Advanced': 3
  }
  const dots = difficultyLevel[challenge.difficulty] || 1

  return (
      <div style={{ backgroundColor: 'var(--meras-bg)', minHeight: '100vh', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>

        {/* ── BREADCRUMB ── */}
        <div className="container pt-4">
          <nav style={{ fontSize: '14px', color: 'var(--meras-gray)' }}>
            <Link
              to="/explorer/challenges"
              style={{ color: 'var(--meras-gray)', textDecoration: 'none' }}
            >
              Catalog
            </Link>
            <span className="mx-2">›</span>
            <span style={{ color: 'var(--meras-gray)' }}>{challenge.major}</span>
            <span className="mx-2">›</span>
            <span style={{ color: 'var(--meras-text)', fontWeight: '500' }}>
              {challenge.title}
            </span>
          </nav>
        </div>

        {/* ── HERO SECTION ── */}
        <div
          className="mt-3 mx-3 mx-lg-4 p-4 p-lg-5"
          style={{
            backgroundColor: heroColor,
            borderRadius: '20px',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Decorative circle */}
          <div style={{
            position: 'absolute',
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            backgroundColor: 'rgba(0,0,0,0.08)',
            top: '-80px',
            right: '200px',
            pointerEvents: 'none'
          }} />

          <div className="row align-items-center">

            {/* ── HERO LEFT ── */}
            <div className="col-lg-8">

              {/* Tags row */}
              <div className="d-flex flex-wrap gap-2 mb-3">
                <span
                  className="badge px-3 py-2"
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.25)',
                    color: 'white',
                    borderRadius: '20px',
                    fontSize: '13px',
                    fontWeight: '500'
                  }}
                >
                  {challenge.major}
                </span>
                <span
                  className="badge px-3 py-2"
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.25)',
                    color: 'white',
                    borderRadius: '20px',
                    fontSize: '13px',
                    fontWeight: '500'
                  }}
                >
                  {challenge.difficulty}
                </span>
                <span
                  className="badge px-3 py-2"
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.25)',
                    color: 'white',
                    borderRadius: '20px',
                    fontSize: '13px',
                    fontWeight: '500'
                  }}
                >
                  ⏱ {challenge.timeEstimate} min
                </span>
              </div>

              {/* Title */}
              <h1
                className="fw-bold mb-2"
                style={{ color: 'white', fontSize: '2rem', lineHeight: '1.2' }}
              >
                {challenge.title}
              </h1>

              {/* Description */}
              <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '15px', marginBottom: '1.5rem' }}>
                {challenge.description}
              </p>

              {/* Created by */}
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', marginBottom: '1.5rem' }}>
                Created by {challenge.mentorName}
                </p>
               { /* <span
                  style={{ color: 'white', fontWeight: '600', cursor: 'pointer', textDecoration: 'underline' }}
                  onClick={() => navigate(`/explorer/mentors/${challenge.mentorId}`)}
                >
                  {challenge.mentorName}
                </span>  */}
              

              {/* Bottom info row */}
              <div
                className="d-flex align-items-center gap-4 pt-3 flex-wrap"
                style={{ borderTop: '1px solid rgba(255,255,255,0.2)' }}
              >
                {/* Meras logo placeholder */}
                <div
                  className="d-flex align-items-center justify-content-center fw-bold"
                  style={{
                    width: '50px',
                    height: '50px',
                    backgroundColor: 'white',
                    borderRadius: '10px',
                    color: heroColor,
                    fontSize: '11px'
                  }}
                >
                  Meras
                </div>

                {/* Personality tags */}
                <div className="d-flex gap-2 flex-wrap">
                  {(challenge.tags ?? []).map((tag) => (
                    <span
                      key={tag}
                      className="badge px-3 py-2"
                      style={{
                        backgroundColor: 'rgba(255,255,255,0.15)',
                        color: 'white',
                        borderRadius: '20px',
                        fontSize: '12px',
                        border: '1px solid rgba(255,255,255,0.3)'
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Divider */}
                <div style={{ width: '1px', height: '40px', backgroundColor: 'rgba(255,255,255,0.3)' }} />

                {/* Rating */}
                <div className="text-center">
                  <div className="fw-bold" style={{ color: 'white', fontSize: '18px' }}>
                    {mentor?.rating || '4.5'}
                  </div>
                  <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '11px' }}>
                    {'★'.repeat(Math.round(mentor?.rating || 4))}
                    {'☆'.repeat(5 - Math.round(mentor?.rating || 4))}
                  </div>
                </div>

                {/* Divider */}
                <div style={{ width: '1px', height: '40px', backgroundColor: 'rgba(255,255,255,0.3)' }} />

                {/* Submissions count */}
                <div className="text-center">
                  <div className="fw-bold" style={{ color: 'white', fontSize: '18px' }}>31</div>
                  <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '11px' }}>
                    Submitted this challenge
                  </div>
                </div>

                {/* Start button in hero */}
                <button
                  className="btn ms-auto fw-semibold px-4 py-2"
                  onClick={() => navigate(`/explorer/workspace/${id}`)}
                  onClick={() => navigate(`/explorer/workspace/${id}`)}
                  style={{
                    backgroundColor: 'white',
                    color: heroColor,
                    border: 'none',
                    borderRadius: '10px',
                    fontSize: '15px'
                  }}
                >
                  Start! →
                </button>
              </div>

            </div>

            {/* ── HERO RIGHT — Mentor Card ── */}
  

          </div>
        </div>

        {/* ── MAIN CONTENT ── */}
        <div className="container py-5">
          <div className="row">

            {/* ── LEFT — Main Content ── */}
            <div className="col-lg-8">

              {/* About this challenge */}
              <section className="mb-5">
                <h4 className="fw-bold mb-3" style={{ color: 'var(--meras-text)' }}>
                  About this challenge
                </h4>
                <div
                  className="p-4"
                  style={{
                    backgroundColor: 'white',
                    borderRadius: '12px',
                    border: '1px solid var(--meras-border)',
                    lineHeight: '1.8',
                    color: 'var(--meras-text)',
                    fontSize: '15px',
                    whiteSpace: 'pre-line'
                  }}
                >
                  {challenge.instructions}
                </div>
              </section>

              {/* What you'll do */}
              <section className="mb-5">
                <h4 className="fw-bold mb-3" style={{ color: 'var(--meras-text)' }}>
                  What you'll do
                </h4>
                <div className="d-flex flex-column gap-3">
                  {(challenge.whatYouWillDo ?? []).map((item, index) => (
                    <div key={id} className="d-flex align-items-start gap-3">
                      <div
                        className="d-flex align-items-center justify-content-center flex-shrink-0 fw-bold"
                        style={{
                          width: '28px',
                          height: '28px',
                          borderRadius: '50%',
                          backgroundColor: '#e8f5ef',
                          color: heroColor,
                          fontSize: '13px',
                          marginTop: '2px'
                        }}
                      >
                        {String(index + 1).padStart(2, '0')}
                      </div>
                      <p style={{ color: 'var(--meras-text)', fontSize: '15px', margin: 0, lineHeight: '1.6' }}>
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* What you'll need */}
              <section className="mb-5">
                <h4 className="fw-bold mb-3" style={{ color: 'var(--meras-text)' }}>
                  What you'll need
                </h4>
                <div className="d-flex flex-column gap-3">
                  {(challenge.whatYouWillNeed ?? []).map((item, id) => (
                    <div key={id} className="d-flex align-items-start gap-3">
                      <span style={{ color: heroColor, fontSize: '18px', marginTop: '2px' }}>→</span>
                      <p style={{ color: 'var(--meras-text)', fontSize: '15px', margin: 0, lineHeight: '1.6' }}>
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* What you'll learn */}
              <section className="mb-5">
                <h4 className="fw-bold mb-3" style={{ color: 'var(--meras-text)' }}>
                  What you'll learn
                </h4>
                <div className="d-flex flex-column gap-3">
                  {(challenge.whatYouWillLearn ?? []).map((item, id) => (
                    <div key={id} className="d-flex align-items-start gap-3">
                      <div
                        className="d-flex align-items-center justify-content-center flex-shrink-0"
                        style={{
                          width: '22px',
                          height: '22px',
                          borderRadius: '50%',
                          backgroundColor: heroColor,
                          marginTop: '2px'
                        }}
                      >
                        <span style={{ color: 'white', fontSize: '12px' }}>✓</span>
                      </div>
                      <p style={{ color: 'var(--meras-text)', fontSize: '15px', margin: 0, lineHeight: '1.6' }}>
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Reference Links */}
              {challenge.referenceLinks && challenge.referenceLinks.length > 0 && (
                <section className="mb-5">
                  <h4 className="fw-bold mb-3" style={{ color: 'var(--meras-text)' }}>
                    Helpful Resources
                  </h4>
                  <div className="d-flex flex-column gap-2">
                    {challenge.referenceLinks.map((link, id) => (
                      <a
                        key={id}
                        href={link.url}
                        target="_blank"
                        rel="noreferrer"
                        className="d-flex align-items-center gap-2 p-3"
                        style={{
                          backgroundColor: 'white',
                          borderRadius: '10px',
                          border: '1px solid var(--meras-border)',
                          textDecoration: 'none',
                          color: heroColor,
                          fontSize: '14px',
                          fontWeight: '500'
                        }}
                      >
                        <span>🔗</span>
                        {link.title}
                      </a>
                    ))}
                  </div>
                </section>
              )}

            </div>

            {/* ── RIGHT — Sticky Action Card ── */}
            <div className="col-lg-4">
              <div style={{ position: 'sticky', top: '100px', maxHeight: 'calc(100vh - 120px)', overflowY: 'auto' }}>
                <div
                  className="p-4"
                  style={{
                    backgroundColor: 'white',
                    borderRadius: '16px',
                    border: '1px solid var(--meras-border)',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.06)'
                  }}
                >

                  <div
        style={{
          backgroundColor: heroColor,
          borderRadius: '16px',
          margin: '15px 1.2px',
          padding: '16px ',
          position: 'relative',
          alignItems: 'center',
           height: '230px',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <img
          src={(majorImages[challenge.major?.toLowerCase()] ?? fallbackImages)[0]}
          alt={challenge.title}
          style={{ maxHeight: '160px', objectFit: 'contain' }}
        />
      </div>

                  {/* Challenge quick stats */}
                  <h6
                    className="fw-bold mb-3"
                    style={{ color: 'var(--meras-text)', fontSize: '15px' }}
                  >
                    Challenge Overview
                  </h6>

                  {/* Major */}
                  <div
                    className="d-flex align-items-center justify-content-between py-2"
                    style={{ borderBottom: '1px solid var(--meras-border)' }}
                  >
                    <span style={{ fontSize: '14px', color: 'var(--meras-gray)' }}>Major</span>
                    <span
                      className="badge px-3 py-1"
                      style={{
                        backgroundColor: '#e8f5ef',
                        color: heroColor,
                        borderRadius: '20px',
                        fontSize: '12px'
                      }}
                    >
                      {challenge.major}
                    </span>
                  </div>

                  {/* Difficulty */}
                  <div
                    className="d-flex align-items-center justify-content-between py-2"
                    style={{ borderBottom: '1px solid var(--meras-border)' }}
                  >
                    <span style={{ fontSize: '14px', color: 'var(--meras-gray)' }}>Difficulty</span>
                    <div className="d-flex align-items-center gap-2">
                      <div className="d-flex gap-1">
                        {[1, 2, 3].map((dot) => (
                          <div
                            key={dot}
                            style={{
                              width: '8px',
                              height: '8px',
                              borderRadius: '50%',
                              backgroundColor: dot <= dots ? heroColor : '#e5e7eb'
                            }}
                          />
                        ))}
                      </div>
                      <span style={{ fontSize: '13px', color: 'var(--meras-text)' }}>
                        {challenge.difficulty}
                      </span>
                    </div>
                  </div>

                  {/* Time */}
                  <div
                    className="d-flex align-items-center justify-content-between py-2"
                    style={{ borderBottom: '1px solid var(--meras-border)' }}
                  >
                    <span style={{ fontSize: '14px', color: 'var(--meras-gray)' }}>Time Estimate</span>
                    <span style={{ fontSize: '14px', color: 'var(--meras-text)', fontWeight: '500' }}>
                      ⏱ {challenge.timeEstimate} min
                    </span>
                  </div>

                  {/* Submissions */}
                  <div
                    className="d-flex align-items-center justify-content-between py-2 mb-4"
                    style={{ borderBottom: '1px solid var(--meras-border)' }}
                  >
                    <span style={{ fontSize: '14px', color: 'var(--meras-gray)' }}>Submissions</span>
                    <span style={{ fontSize: '14px', color: 'var(--meras-text)', fontWeight: '500' }}>
                      31 students
                    </span>
                  </div>

                  {/* Start button */}
                  <button
                    className="btn w-100 fw-semibold py-2 mb-2 text-white"
                    onClick={() => navigate(`/explorer/workspace/${id}`)}
                    onClick={() => navigate(`/explorer/workspace/${id}`)}
                    style={{
                      backgroundColor: heroColor,
                      border: 'none',
                      borderRadius: '10px',
                      fontSize: '16px'
                    }}
                  >
                    Start Challenge →
                  </button>

                  {/* Save button */}
                  <button
                    className="btn w-100 fw-semibold py-2"
                    onClick={() => setSaved(!saved)}
                    style={{
                      backgroundColor: saved ? '#e8f5ef' : 'white',
                      border: `1.5px solid ${saved ? heroColor : 'var(--meras-border)'}`,
                      borderRadius: '10px',
                      fontSize: '14px',
                      color: saved ? heroColor : 'var(--meras-gray)'
                    }}
                  >
                    {saved ? '✓ Saved' : '🔖 Save for Later'}
                  </button>

                </div>

                {/* Share row below card */}
                <div className="d-flex align-items-center justify-content-center gap-3 mt-3">
                  <button
                    className="btn btn-sm fw-semibold px-4"
                    style={{
                      border: '1.5px solid var(--meras-border)',
                      borderRadius: '20px',
                      color: 'var(--meras-gray)',
                      backgroundColor: 'white',
                      fontSize: '13px'
                    }}
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href)
                      alert('Link copied!')
                    }}
                  >
                    🔗 Share Challenge
                  </button>
                </div>

              </div>
            </div>

          </div>
        </div>

        {/* ── BOTTOM CTA BAR ── */}
        <div
          className="py-4"
          style={{
            backgroundColor: 'white',
            borderTop: '1px solid var(--meras-border)',
            position: 'sticky',
            bottom: 0,
            zIndex: 10
          }}
        >
          <div className="container d-flex align-items-center justify-content-between">
            <div>
              <span className="fw-bold" style={{ color: 'var(--meras-text)' }}>
                {challenge.title}
              </span>
              <span
                className="ms-3 badge px-3 py-1"
                style={{
                  backgroundColor: '#e8f5ef',
                  color: heroColor,
                  borderRadius: '20px',
                  fontSize: '12px'
                }}
              >
                {challenge.major}
              </span>
            </div>
            <div className="d-flex gap-3">
              <button
                className="btn fw-semibold px-4"
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href)
                  alert('Link copied!')
                }}
                style={{
                  border: '1.5px solid var(--meras-border)',
                  borderRadius: '10px',
                  color: 'var(--meras-gray)',
                  backgroundColor: 'white',
                  fontSize: '14px'
                }}
              >
                🔗 Share Challenge
              </button>
              <button
                className="btn fw-semibold px-5 text-white"
                onClick={() => navigate(`/explorer/workspace/${id}`)}
                onClick={() => navigate(`/explorer/workspace/${id}`)}
                style={{
                  backgroundColor: heroColor,
                  border: 'none',
                  borderRadius: '10px',
                  fontSize: '14px'
                }}
              >
                Start! →
              </button>
            </div>
          </div>
        </div>

      </div>
  )
}

export default ChallengeDetail