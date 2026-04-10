import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { mockMentors } from '../../data/mockData'
import MentorCard from '../../components/MentorCard'
import { useAuth } from '../../context/AuthContext'

const CARDS_PER_PAGE = 8
const majors = ['All', ...new Set(mockMentors.map(m => m.major))]

function MentorDirectory({ profilePath = '/guide/profile' }) {
  const navigate = useNavigate()
  const { currentUser } = useAuth()
  const isGuide = currentUser?.role === 'guide'
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [selectedMajor, setSelectedMajor] = useState('All')

  // isMobile so we can swap the filter bar from a single wide row to a
  // stacked column, and reduce the excessive px-5 / 65px padding on phones.
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const filtered = mockMentors.filter((mentor) => {
    const matchesSearch = mentor.name.toLowerCase().includes(search.toLowerCase())
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

      {/* Filter bar
          On desktop: one wide row with search on the left, major+pagination on the right.
          On mobile: stack them vertically and use container padding instead of the
          hardcoded 65px which overflows on narrow screens. */}
      <div
        className="d-flex gap-3"
        style={{
          padding: isMobile ? '0 16px 20px' : '0 65px 20px',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: isMobile ? 'stretch' : 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Search */}
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

        {/* Major filter + pagination */}
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

      {/* Cards grid
          px-5 (3rem) is too much on phones — use px-3 on mobile.
          col-12 added so cards go full-width below the md breakpoint. */}
      <div className={`container-fluid ${isMobile ? 'px-3' : 'px-5'} pb-5`}>
        {visible.length > 0 ? (
          <div className="row g-4">
            {visible.map((mentor) => (
              <div key={mentor.id} className="col-12 col-md-6 col-lg-4">
                <MentorCard
                  name={mentor.name}
                  major={mentor.major}
                  university={mentor.university}
                  rating={mentor.rating}
                  totalSessions={mentor.totalSessions}
                  tags={mentor.tags ?? []}
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
