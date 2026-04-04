import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { mockChallenges } from '../../../data/mockData'
import ChallengeCard from '../../../components/ChallengeCard'

const CARDS_PER_PAGE = 8
const majors = ['All', ...new Set(mockChallenges.map(c => c.major))]

function ChallengeCatalog() {
  const navigate = useNavigate()
  const [page, setPage] = useState(1)
  const [selectedMajor, setSelectedMajor] = useState('All')

  const filtered = selectedMajor === 'All'
    ? mockChallenges
    : mockChallenges.filter(c => c.major === selectedMajor)

  const totalPages = Math.ceil(filtered.length / CARDS_PER_PAGE)
  const visible = filtered.slice((page - 1) * CARDS_PER_PAGE, page * CARDS_PER_PAGE)

  return (
    <div>

      {/* ── NAVBAR ── */}
  
          {/* Mobile toggle */}
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>

            {/* ── HERO SECTION ── */}
      <section className="py-4">
        <div className="container py-4">
          <div className="row align-items-center">

            {/* Left side text */}
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
      
      <div className="d-flex align-items-center justify-content-between" style={{ padding: '0 65px 20px' }}>
        <h4 className="fw-semibold mb-0" style={{ color: 'var(--meras-text)' }}>Micro-Challenges</h4>
        <div className="d-flex align-items-center gap-2">

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

      <div className="container-fluid px-5 pb-5">
        <div className="row g-4">
          {visible.map((challenge) => {
            const realIndex = mockChallenges.indexOf(challenge)
            return (
            <div key={realIndex} className="col-lg-3 col-md-6">
              <ChallengeCard
                challengeName={challenge.title}
                description={challenge.description}
                major={challenge.major}
                onMoreDetails={() => navigate(`/explorer/challenges/${realIndex}`)}
              />
            </div>
          )})}
        </div>
      </div>

        </div>
     
  )
}
export default ChallengeCatalog