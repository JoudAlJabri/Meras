import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { apiGetChallenges } from '../../../api/challenges'
import ChallengeCard from '../../../components/ChallengeCard'

const CARDS_PER_PAGE = 8

function ChallengeCatalog() {
  const navigate = useNavigate()
  const [challenges, setChallenges] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [selectedMajor, setSelectedMajor] = useState('All')

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    apiGetChallenges()
      .then(challenges => setChallenges(challenges ?? []))
      .catch(err => console.error('Failed to load challenges:', err.message))
      .finally(() => setLoading(false))
  }, [])

  const majors = ['All', ...new Set(challenges.map(c => c.major))]

  const filtered = selectedMajor === 'All'
    ? challenges
    : challenges.filter(c => c.major === selectedMajor)

  const totalPages = Math.max(1, Math.ceil(filtered.length / CARDS_PER_PAGE))
  const visible = filtered.slice((page - 1) * CARDS_PER_PAGE, page * CARDS_PER_PAGE)

  return (
    <div>

      {/* Mobile toggle */}
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span className="navbar-toggler-icon"></span>
      </button>

      {/* Hero */}
      <section className="py-4">
        <div className="container py-4">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-5 mb-lg-0">
              <h1 className="fw-semibold mb-4" style={{ fontSize: '3rem', lineHeight: '1.2', color: 'var(--meras-text)' }}>
                Discover your{' '}
                <span style={{ color: 'var(--meras-green)' }}>future</span>{' '}
                by doing.
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* Filter bar */}
      <div
        className="d-flex align-items-center justify-content-between"
        style={{ padding: isMobile ? '0 16px 20px' : '0 65px 20px', flexWrap: 'wrap', gap: '12px' }}
      >
        <h4 className="fw-semibold mb-0" style={{ color: 'var(--meras-text)' }}>Micro-Challenges</h4>
        <div className="d-flex align-items-center gap-2" style={{ flexWrap: 'wrap' }}>

          <label style={{ fontSize: '14px', color: 'var(--meras-text)', fontWeight: '500' }}>Major</label>
          <select
            value={selectedMajor}
            onChange={e => { setSelectedMajor(e.target.value); setPage(1) }}
            style={{ border: '1px solid var(--meras-border)', borderRadius: '8px', padding: '4px 10px', fontSize: '14px', cursor: 'pointer' }}
          >
            {majors.map(m => <option key={m} value={m}>{m}</option>)}
          </select>

          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            style={{ border: '1px solid var(--meras-border)', background: 'white', borderRadius: '8px', padding: '4px 10px', cursor: 'pointer' }}
          >{'<'}</button>
          <span style={{ fontSize: '14px', color: 'var(--meras-text)' }}>{page} / {totalPages}</span>
          <button
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            style={{ border: '1px solid var(--meras-border)', background: 'white', borderRadius: '8px', padding: '4px 10px', cursor: 'pointer' }}
          >{'>'}</button>
        </div>
      </div>

      {/* Cards */}
      <div className={`container-fluid ${isMobile ? 'px-3' : 'px-5'} pb-5`}>
        {loading ? (
          <p style={{ textAlign: 'center', color: 'var(--meras-gray)', padding: '40px 0' }}>Loading challenges...</p>
        ) : (
          <div className="row g-4">
            {visible.map(challenge => (
              <div key={challenge._id} className="col-12 col-md-6 col-lg-3">
                <ChallengeCard
                  challengeName={challenge.title}
                  description={challenge.description}
                  major={challenge.major}
                  onMoreDetails={() => navigate(`/explorer/challenges/${challenge._id}`)}
                />
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  )
}

export default ChallengeCatalog
