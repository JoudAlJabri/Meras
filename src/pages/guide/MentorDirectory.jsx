import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import MentorCard from '../../components/MentorCard'
import { useAuth } from '../../context/AuthContext'

const CARDS_PER_PAGE = 8

function MentorDirectory({ profilePath = '/guide/profile' }) {
  const navigate = useNavigate()
  const { currentUser } = useAuth()
  const isGuide = currentUser?.role === 'guide'

  const [mentors, setMentors] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [selectedMajor, setSelectedMajor] = useState('All')

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Fetch mentors from real backend
  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const res = await fetch('/api/users/mentors')
        const data = await res.json()
        setMentors(data.mentors || [])
      } catch (error) {
        console.error('Error fetching mentors:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchMentors()
  }, [])

  // Build majors list dynamically from real data
  const majors = ['All', ...new Set(mentors.map(m => m.major).filter(Boolean))]

  const filtered = mentors.filter((mentor) => {
    const matchesSearch = mentor.name?.toLowerCase().includes(search.toLowerCase())
    const matchesMajor = selectedMajor === 'All' || mentor.major === selectedMajor
    return matchesSearch && matchesMajor
  })

  const totalPages = Math.ceil(filtered.length / CARDS_PER_PAGE)
  const visible = filtered.slice((page - 1) * CARDS_PER_PAGE, page * CARDS_PER_PAGE)

  return (
    <div>

      {/* Hero */}
      <section className="py-4">
        <div className="container py-4">
          <h1 className="fw-semibold mb-2" style={{ fontSize: '3rem', lineHeight: '1.2', color: 'var(--meras-text)' }}>
            Talk to someone
          </h1>
          <h1 className="fw-semibold" style={{ fontSize: '3rem', lineHeight: '1.2', color: 'var(--meras-text)' }}>
            who was just in <span style={{ color: 'var(--meras-green)' }}>your</span> shoes.
          </h1>

          {isGuide && (
            <div className="d-flex gap-3 mt-5">
              <button
                onClick={() => navigate('/guide/availability')}
                style={{
                  backgroundColor: 'var(--meras-green)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '5px 25px',
                  fontSize: '16px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}
              >
                Set available times
              </button>
              <button
                onClick={() => navigate("/guide/grading")}
                style={{
                  backgroundColor: 'transparent',
                  color: 'var(--meras-green)',
                  border: '2px solid var(--meras-green)',
                  borderRadius: '12px',
                  padding: '5px 32px',
                  fontSize: '16px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}
              >
                See upcoming sessions →
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Filter bar */}
      <div
        className="d-flex gap-3"
        style={{
          padding: isMobile ? '0 16px 20px' : '0 65px 20px',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: isMobile ? 'stretch' : 'center',
          justifyContent: 'space-between',
        }}
      >
        <div className="d-flex align-items-center gap-2" style={{ flexWrap: 'wrap' }}>
          <label style={{ fontSize: '14px', color: 'var(--meras-text)', fontWeight: '500', whiteSpace: 'nowrap' }}>
            Search by Mentor Name
          </label>
          <input
            type="text"
            placeholder="Ex: Rana Abdullah"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1) }}
            style={{
              border: '1px solid var(--meras-border)',
              borderRadius: '8px',
              padding: '4px 10px',
              fontSize: '14px',
              outline: 'none',
              flex: 1,
              minWidth: '140px',
            }}
          />
        </div>

        <div className="d-flex align-items-center gap-2" style={{ flexWrap: 'wrap' }}>
          <label style={{ fontSize: '14px', color: 'var(--meras-text)', fontWeight: '500' }}>Major</label>
          <select
            value={selectedMajor}
            onChange={(e) => { setSelectedMajor(e.target.value); setPage(1) }}
            style={{ border: '1px solid var(--meras-border)', borderRadius: '8px', padding: '4px 10px', fontSize: '14px', cursor: 'pointer' }}
          >
            {majors.map(m => <option key={m} value={m}>{m}</option>)}
          </select>

          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            style={{ border: '1px solid var(--meras-border)', background: 'white', borderRadius: '8px', padding: '4px 10px', cursor: 'pointer' }}
          >{'<'}</button>
          <span style={{ fontSize: '14px', color: 'var(--meras-text)' }}>{page} / {totalPages || 1}</span>
          <button
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages || totalPages === 0}
            style={{ border: '1px solid var(--meras-border)', background: 'white', borderRadius: '8px', padding: '4px 10px', cursor: 'pointer' }}
          >{'>'}</button>
        </div>
      </div>

      {/* Cards grid */}
      <div className={`container-fluid ${isMobile ? 'px-3' : 'px-5'} pb-5`}>
        {loading ? (
          <p style={{ color: 'var(--meras-gray)', marginTop: '24px' }}>Loading mentors...</p>
        ) : visible.length > 0 ? (
          <div className="row g-4">
            {visible.map((mentor) => (
              <div key={mentor._id} className="col-12 col-md-6 col-lg-4">
                <MentorCard
                  name={mentor.name}
                  major={mentor.major}
                  university={mentor.university}
                  rating={mentor.rating}
                  totalSessions={mentor.totalSessions}
                  tags={mentor.skills ?? []}
                  onViewProfile={() => navigate(profilePath, { state: mentor })}
                />
              </div>
            ))}
          </div>
        ) : (
          <p style={{ color: 'var(--meras-gray)', marginTop: '24px' }}>No mentors found.</p>
        )}
      </div>

    </div>
  )
}

export default MentorDirectory