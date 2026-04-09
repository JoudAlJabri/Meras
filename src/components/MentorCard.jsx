import { useMemo } from 'react'
import puzzleImg from '../assets/General-Graphics/2PersonPuzzle.png'
import softwareEngineering from '../assets/Tech-Graphics/Software-Engineering.png'

const majorImages = {
  'computer science':        softwareEngineering,
  'software engineering':    softwareEngineering,
  'computer engineering':    softwareEngineering,
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

// Text colour on top of the button / icon background
const onColor = {
  'var(--meras-green)':  '#ffffff',
  'var(--meras-yellow)': '#1A0A00',
  'var(--meras-black)':  '#ffffff',
  'var(--meras-gray)':   '#1A0A00',
}

const tagFill = {
  'var(--meras-green)':  '#E8F5EF',
  'var(--meras-yellow)': '#FBF5DC',
  'var(--meras-black)':   '#FBF5DC',
  'var(--meras-gray)':   '#e1dfdf',
}


function StarRow({ rating }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill={i <= Math.round(rating) ? '#F5A623' : '#E0E0E0'}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  )
}

function MentorCard({ name, major, university, rating, totalSessions, tags = [], onViewProfile }) {
  const cardColor = majorCardColors[major?.toLowerCase()] ?? 'var(--meras-green)'
  const textColor = onColor[cardColor] ?? '#ffffff'
  const tagFillColor = tagFill[cardColor] ?? '#ffffff'
  const tagBorderColor = cardColor === 'var(--meras-black)' ? 'var(--meras-yellow)' : cardColor

  const illustration = useMemo(() => {
    return majorImages[major?.toLowerCase()] ?? puzzleImg
  }, [major])

  return (
    <div
      style={{
        backgroundColor: 'white',
        borderRadius: '20px',
        border: '2px solid #1A0A0015',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}
    >
      {/* Header: icon + name/major */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        {/* Colored icon */}
        <div
          style={{
            backgroundColor: cardColor,
            borderRadius: '14px',
            width: '72px',
            height: '72px',
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          <img src={illustration} alt={name} style={{ width: '52px', height: '52px', objectFit: 'contain' }} />
        </div>

        {/* Name + university/major */}
        <div>
          <h5 style={{ margin: 0, fontWeight: '700', fontSize: '17px', color: 'var(--meras-text)' }}>
            {name}
          </h5>
          <p style={{ margin: 0, fontSize: '13px', color: '#888', marginTop: '3px' }}>
            {university} · {major}
          </p>
        </div>
      </div>

      {/* Stars + sessions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <StarRow rating={rating} />
        <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--meras-text)' }}>{rating}</span>
        <span style={{ fontSize: '13px', color: '#888' }}>Sessions: {totalSessions}</span>
      </div>

      {/* Tags */}
      {tags.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: '12px',
                fontWeight: '500',
                color: 'var(--meras-text)',
                backgroundColor: tagFillColor,
                borderRadius: '999px',
                padding: '1px 12px',
                border: `1.5px solid ${tagBorderColor}`,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* View Profile button */}
      <button
        onClick={onViewProfile}
        style={{
          width: '100%',
          backgroundColor: cardColor,
          color: textColor,
          border: 'none',
          borderRadius: '999px',
          padding: '7px',
          fontWeight: '700',
          fontSize: '15px',
          cursor: 'pointer',
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          marginTop: '4px',
        }}
      >
        View Profile
      </button>
    </div>
  )
}

export default MentorCard
