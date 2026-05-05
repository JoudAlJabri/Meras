import { useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { saveChallenge, unsaveChallenge, apiGetSavedChallenges } from '../../../api/challenges'
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
  const navigate = useNavigate()

  const [challenge, setChallenge] = useState(null)
  const [saved, setSaved] = useState(false)
  const [saveLoading, setSaveLoading] = useState(false)
  const [showReportModal, setShowReportModal] = useState(false)
  const [reportReason, setReportReason] = useState('')
  const [reportSubmitted, setReportSubmitted] = useState(false)
  const [reportLoading, setReportLoading] = useState(false)

  useEffect(() => {
    const fetchChallenge = async () => {
      try {
        const res = await fetch(`/api/challenges/${id}`)
        const data = await res.json()
        if (!res.ok) {
          setChallenge({ message: data.message || 'Failed to load challenge' })
          return
        }
        setChallenge(data.challenge)
      } catch (error) {
        console.error('Error fetching challenge:', error)
        setChallenge({ message: 'Failed to load challenge' })
      }
    }

    const checkIfSaved = async () => {
      try {
        const saved = await apiGetSavedChallenges()
        setSaved(saved.some(c => c._id === id))
      } catch {
        // not logged in or failed — leave as false
      }
    }

    fetchChallenge()
    checkIfSaved()
  }, [id])

  const handleSaveToggle = async () => {
    if (saveLoading) return
    setSaveLoading(true)
    try {
      if (saved) {
        await unsaveChallenge(id)
        setSaved(false)
      } else {
        await saveChallenge(id)
        setSaved(true)
      }
    } catch (err) {
      console.error('Save toggle failed:', err.message)
    } finally {
      setSaveLoading(false)
    }
  }

  const mentor = null

  if (challenge === null) {
    return <div className="text-center py-5"><h3>Loading...</h3></div>
  }

  if (challenge.message) {
    return (
      <div className="text-center py-5">
        <h3>Challenge not found</h3>
        <Link to="/explorer/challenges">Back to Catalog</Link>
      </div>
    )
  }

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
    'human resources': 'var(--meras-yellow)',
    'marketing': 'var(--meras-yellow)',
    'management information system': 'var(--meras-yellow)',
  }

  const heroColor = majorCardColors[challenge.major?.toLowerCase()] || 'var(--meras-green)'
  const difficultyLevel = { 'Beginner': 1, 'Intermediate': 2, 'Advanced': 3 }
  const dots = difficultyLevel[challenge.difficulty] || 1

  const handleReport = async () => {
    if (!reportReason.trim()) return
    setReportLoading(true)
    try {
      const token = localStorage.getItem('meras_token')
      await fetch('/api/admin/flagged-content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          content: challenge.title,
          reason: reportReason.trim(),
          contentType: 'challenge',
          contentId: id,
        }),
      })
      setReportSubmitted(true)
    } catch {
      alert('Failed to submit report. Please try again.')
    } finally {
      setReportLoading(false)
    }
  }

  const closeReportModal = () => {
    setShowReportModal(false)
    setReportReason('')
    setReportSubmitted(false)
  }

  return (
    <div style={{ backgroundColor: 'var(--meras-bg)', minHeight: '100vh', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>

      {/* ── BREADCRUMB ── */}
      <div className="container pt-4">
        <nav style={{ fontSize: '14px', color: 'var(--meras-gray)' }}>
          <Link to="/explorer/challenges" style={{ color: 'var(--meras-gray)', textDecoration: 'none' }}>
            Catalog
          </Link>
          <span className="mx-2">›</span>
          <span style={{ color: 'var(--meras-gray)' }}>{challenge.major}</span>
          <span className="mx-2">›</span>
          <span style={{ color: 'var(--meras-text)', fontWeight: '500' }}>{challenge.title}</span>
        </nav>
      </div>

      {/* ── HERO SECTION ── */}
      <div
        className="mt-3 mx-3 mx-lg-4 p-4 p-lg-5"
        style={{ backgroundColor: heroColor, borderRadius: '20px', position: 'relative', overflow: 'hidden' }}
      >
        <div style={{ position: 'absolute', width: '300px', height: '300px', borderRadius: '50%', backgroundColor: 'rgba(0,0,0,0.08)', top: '-80px', right: '200px', pointerEvents: 'none' }} />

        <div className="row align-items-center">
          <div className="col-lg-8">

            {/* Tags row */}
            <div className="d-flex flex-wrap gap-2 mb-3">
              {[challenge.major, challenge.difficulty, `⏱ ${challenge.timeEstimate} min`].map((tag) => (
                <span key={tag} className="badge px-3 py-2" style={{ backgroundColor: 'rgba(255,255,255,0.25)', color: 'white', borderRadius: '20px', fontSize: '13px', fontWeight: '500' }}>
                  {tag}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1 className="fw-bold mb-2" style={{ color: 'white', fontSize: '2rem', lineHeight: '1.2' }}>
              {challenge.title}
            </h1>

            {/* Description */}
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '15px', marginBottom: '1.5rem' }}>
              {challenge.description}
            </p>

            {/* Created by */}
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', marginBottom: '1.5rem' }}>
              Created by {challenge.mentorName || 'Meras Guide'}
            </p>

            {/* Bottom info row */}
            <div className="d-flex align-items-center gap-4 pt-3 flex-wrap" style={{ borderTop: '1px solid rgba(255,255,255,0.2)' }}>

              {/* 🚩 Report button */}
              <button
                onClick={() => setShowReportModal(true)}
                style={{
                  backgroundColor: 'rgba(255,255,255,0.15)',
                  color: 'white',
                  border: '1px solid rgba(255,255,255,0.3)',
                  borderRadius: '20px',
                  padding: '8px 18px',
                  fontSize: '13px',
                  fontWeight: '500',
                  cursor: 'pointer',
                }}
              >
                🚩 Report
              </button>

              {/* Personality tags */}
              <div className="d-flex gap-2 flex-wrap">
                {(challenge.tags ?? []).map((tag) => (
                  <span key={tag} className="badge px-3 py-2" style={{ backgroundColor: 'rgba(255,255,255,0.15)', color: 'white', borderRadius: '20px', fontSize: '12px', border: '1px solid rgba(255,255,255,0.3)' }}>
                    {tag}
                  </span>
                ))}
              </div>

              <div style={{ width: '1px', height: '40px', backgroundColor: 'rgba(255,255,255,0.3)' }} />

              {/* Rating */}
              <div className="text-center">
                <div className="fw-bold" style={{ color: 'white', fontSize: '18px' }}>{mentor?.rating || '4.5'}</div>
                <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '11px' }}>
                  {'★'.repeat(Math.round(mentor?.rating || 4))}{'☆'.repeat(5 - Math.round(mentor?.rating || 4))}
                </div>
              </div>

              <div style={{ width: '1px', height: '40px', backgroundColor: 'rgba(255,255,255,0.3)' }} />

              {/* Submissions */}
              <div className="text-center">
                <div className="fw-bold" style={{ color: 'white', fontSize: '18px' }}>31</div>
                <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '11px' }}>Submitted this challenge</div>
              </div>

              {/* Start button */}
              <button
                className="btn ms-auto fw-semibold px-4 py-2"
                onClick={() => navigate(`/explorer/workspace/${id}`)}
                style={{ backgroundColor: 'white', color: heroColor, border: 'none', borderRadius: '10px', fontSize: '15px' }}
              >
                Start! →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="container py-5">
        <div className="row">

          {/* ── LEFT ── */}
          <div className="col-lg-8">

            <section className="mb-5">
              <h4 className="fw-bold mb-3" style={{ color: 'var(--meras-text)' }}>About this challenge</h4>
              <div className="p-4" style={{ backgroundColor: 'white', borderRadius: '12px', border: '1px solid var(--meras-border)', lineHeight: '1.8', color: 'var(--meras-text)', fontSize: '15px', whiteSpace: 'pre-line' }}>
                {challenge.instructions}
              </div>
            </section>

            <section className="mb-5">
              <h4 className="fw-bold mb-3" style={{ color: 'var(--meras-text)' }}>What you'll do</h4>
              <div className="d-flex flex-column gap-3">
                {(challenge.whatYouWillDo ?? []).map((item, index) => (
                  <div key={index} className="d-flex align-items-start gap-3">
                    <div className="d-flex align-items-center justify-content-center flex-shrink-0 fw-bold" style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#e8f5ef', color: heroColor, fontSize: '13px', marginTop: '2px' }}>
                      {String(index + 1).padStart(2, '0')}
                    </div>
                    <p style={{ color: 'var(--meras-text)', fontSize: '15px', margin: 0, lineHeight: '1.6' }}>{item}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="mb-5">
              <h4 className="fw-bold mb-3" style={{ color: 'var(--meras-text)' }}>What you'll need</h4>
              <div className="d-flex flex-column gap-3">
                {(challenge.whatYouWillNeed ?? []).map((item, index) => (
                  <div key={index} className="d-flex align-items-start gap-3">
                    <span style={{ color: heroColor, fontSize: '18px', marginTop: '2px' }}>→</span>
                    <p style={{ color: 'var(--meras-text)', fontSize: '15px', margin: 0, lineHeight: '1.6' }}>{item}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="mb-5">
              <h4 className="fw-bold mb-3" style={{ color: 'var(--meras-text)' }}>What you'll learn</h4>
              <div className="d-flex flex-column gap-3">
                {(challenge.whatYouWillLearn ?? []).map((item, index) => (
                  <div key={index} className="d-flex align-items-start gap-3">
                    <div className="d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: '22px', height: '22px', borderRadius: '50%', backgroundColor: heroColor, marginTop: '2px' }}>
                      <span style={{ color: 'white', fontSize: '12px' }}>✓</span>
                    </div>
                    <p style={{ color: 'var(--meras-text)', fontSize: '15px', margin: 0, lineHeight: '1.6' }}>{item}</p>
                  </div>
                ))}
              </div>
            </section>

            {challenge.referenceLinks?.length > 0 && (
              <section className="mb-5">
                <h4 className="fw-bold mb-3" style={{ color: 'var(--meras-text)' }}>Helpful Resources</h4>
                <div className="d-flex flex-column gap-2">
                  {challenge.referenceLinks.map((link, index) => (
                    <a key={index} href={link.url} target="_blank" rel="noreferrer" className="d-flex align-items-center gap-2 p-3" style={{ backgroundColor: 'white', borderRadius: '10px', border: '1px solid var(--meras-border)', textDecoration: 'none', color: heroColor, fontSize: '14px', fontWeight: '500' }}>
                      <span>🔗</span>{link.title}
                    </a>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* ── RIGHT ── */}
          <div className="col-lg-4">
            <div style={{ position: 'sticky', top: '100px', maxHeight: 'calc(100vh - 120px)', overflowY: 'auto' }}>
              <div className="p-4" style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid var(--meras-border)', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>

                <div style={{ backgroundColor: heroColor, borderRadius: '16px', margin: '15px 1.2px', padding: '16px', position: 'relative', alignItems: 'center', height: '230px', display: 'flex', justifyContent: 'center' }}>
                  <img src={(majorImages[challenge.major?.toLowerCase()] ?? fallbackImages)[0]} alt={challenge.title} style={{ maxHeight: '160px', objectFit: 'contain' }} />
                </div>

                <h6 className="fw-bold mb-3" style={{ color: 'var(--meras-text)', fontSize: '15px' }}>Challenge Overview</h6>

                {[
                  { label: 'Major', value: <span className="badge px-3 py-1" style={{ backgroundColor: '#e8f5ef', color: heroColor, borderRadius: '20px', fontSize: '12px' }}>{challenge.major}</span> },
                  { label: 'Difficulty', value: <div className="d-flex align-items-center gap-2"><div className="d-flex gap-1">{[1,2,3].map((dot) => <div key={dot} style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: dot <= dots ? heroColor : '#e5e7eb' }} />)}</div><span style={{ fontSize: '13px', color: 'var(--meras-text)' }}>{challenge.difficulty}</span></div> },
                  { label: 'Time Estimate', value: <span style={{ fontSize: '14px', color: 'var(--meras-text)', fontWeight: '500' }}>⏱ {challenge.timeEstimate} min</span> },
                  { label: 'Submissions', value: <span style={{ fontSize: '14px', color: 'var(--meras-text)', fontWeight: '500' }}>31 students</span> },
                ].map(({ label, value }) => (
                  <div key={label} className="d-flex align-items-center justify-content-between py-2" style={{ borderBottom: '1px solid var(--meras-border)' }}>
                    <span style={{ fontSize: '14px', color: 'var(--meras-gray)' }}>{label}</span>
                    {value}
                  </div>
                ))}

                <div className="mt-4">
                  <button className="btn w-100 fw-semibold py-2 mb-2 text-white" onClick={() => navigate(`/explorer/workspace/${id}`)} style={{ backgroundColor: heroColor, border: 'none', borderRadius: '10px', fontSize: '16px' }}>
                    Start Challenge →
                  </button>
                  <button className="btn w-100 fw-semibold py-2" onClick={handleSaveToggle} disabled={saveLoading} style={{ backgroundColor: saved ? '#e8f5ef' : 'white', border: `1.5px solid ${saved ? heroColor : 'var(--meras-border)'}`, borderRadius: '10px', fontSize: '14px', color: saved ? heroColor : 'var(--meras-gray)' }}>
                    {saved ? '✓ Saved' : '🔖 Save for Later'}
                  </button>
                </div>
              </div>

              <div className="d-flex align-items-center justify-content-center gap-3 mt-3">
                <button className="btn btn-sm fw-semibold px-4" style={{ border: '1.5px solid var(--meras-border)', borderRadius: '20px', color: 'var(--meras-gray)', backgroundColor: 'white', fontSize: '13px' }} onClick={() => { navigator.clipboard.writeText(window.location.href); alert('Link copied!') }}>
                  🔗 Share Challenge
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── BOTTOM CTA BAR ── */}
      <div className="py-4" style={{ backgroundColor: 'white', borderTop: '1px solid var(--meras-border)', position: 'sticky', bottom: 0, zIndex: 10 }}>
        <div className="container d-flex align-items-center justify-content-between">
          <div>
            <span className="fw-bold" style={{ color: 'var(--meras-text)' }}>{challenge.title}</span>
            <span className="ms-3 badge px-3 py-1" style={{ backgroundColor: '#e8f5ef', color: heroColor, borderRadius: '20px', fontSize: '12px' }}>{challenge.major}</span>
          </div>
          <div className="d-flex gap-3">
            <button className="btn fw-semibold px-4" onClick={() => { navigator.clipboard.writeText(window.location.href); alert('Link copied!') }} style={{ border: '1.5px solid var(--meras-border)', borderRadius: '10px', color: 'var(--meras-gray)', backgroundColor: 'white', fontSize: '14px' }}>
              🔗 Share Challenge
            </button>
            <button className="btn fw-semibold px-5 text-white" onClick={() => navigate(`/explorer/workspace/${id}`)} style={{ backgroundColor: heroColor, border: 'none', borderRadius: '10px', fontSize: '14px' }}>
              Start! →
            </button>
          </div>
        </div>
      </div>

      {/* ── REPORT MODAL ── */}
      {showReportModal && (
        <div
          style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999, padding: '20px' }}
          onClick={() => { if (!reportLoading) closeReportModal() }}
        >
          <div
            style={{ backgroundColor: 'white', width: '100%', maxWidth: '480px', borderRadius: '16px', padding: '24px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}
            onClick={(e) => e.stopPropagation()}
          >
            {reportSubmitted ? (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <div style={{ fontSize: '48px', marginBottom: '16px', color: '#111827' }}>✓</div>
                <h3 style={{ color: '#111827', marginBottom: '8px' }}>Report Submitted</h3>
                <p style={{ color: '#6b7280', marginBottom: '24px' }}>Thank you. Our team will review this challenge.</p>
                <button onClick={closeReportModal} style={{ backgroundColor: heroColor, color: 'white', border: 'none', borderRadius: '10px', padding: '10px 24px', fontWeight: '600', cursor: 'pointer' }}>
                  Close
                </button>
              </div>
            ) : (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <h2 style={{ margin: 0, color: '#111827', fontSize: '20px' }}>Report this Challenge</h2>
                  <button onClick={closeReportModal} style={{ background: 'transparent', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#6b7280' }}>×</button>
                </div>

                <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '16px' }}>
                  Let us know what's wrong with this challenge. Your report helps keep the platform safe.
                </p>

                {/* Quick reason buttons */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
                  {['Inappropriate content', 'Incorrect information', 'Plagiarized content', 'Spam or misleading', 'Other'].map((reason) => (
                    <button
                      key={reason}
                      onClick={() => setReportReason(reason)}
                      style={{
                        padding: '6px 14px', borderRadius: '20px', fontSize: '13px', cursor: 'pointer', fontWeight: '500',
                        backgroundColor: reportReason === reason ? '#fee2e2' : '#f3f4f6',
                        color: reportReason === reason ? '#991b1b' : '#374151',
                        border: reportReason === reason ? '1px solid #ef4444' : '1px solid #e5e7eb',
                      }}
                    >
                      {reason}
                    </button>
                  ))}
                </div>

                {/* Textarea */}
                <textarea
                  value={reportReason}
                  onChange={(e) => setReportReason(e.target.value)}
                  placeholder="Describe the issue in more detail..."
                  rows={4}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1px solid #d1d5db', fontSize: '14px', resize: 'none', outline: 'none', boxSizing: 'border-box', marginBottom: '16px', fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                />

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                  <button onClick={closeReportModal} style={{ padding: '10px 16px', borderRadius: '10px', border: '1px solid #d1d5db', backgroundColor: 'white', cursor: 'pointer', fontWeight: '600', color: '#374151' }}>
                    Cancel
                  </button>
                  <button
                    disabled={!reportReason.trim() || reportLoading}
                    onClick={handleReport}
                    style={{
                      padding: '10px 20px', borderRadius: '10px', border: 'none',
                      backgroundColor: !reportReason.trim() ? '#d1d5db' : '#dc2626',
                      color: 'white', fontWeight: '600',
                      cursor: !reportReason.trim() ? 'not-allowed' : 'pointer',
                    }}
                  >
                    {reportLoading ? 'Submitting...' : 'Submit Report'}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

    </div>
  )
}

export default ChallengeDetail