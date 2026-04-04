import { useMemo } from 'react'
import puzzleImg from '../assets/General-Graphics/2PersonPuzzle.png'
import handCodingImg from '../assets/Tech-Graphics/Hand coding-bro.png'

// Add more imports here as you get more images, then add them to the arrays below
const majorImages = {
  'computer science':           [handCodingImg],
  'software engineering':       [handCodingImg],
  'computer engineering':       [handCodingImg],
  'mechanical engineering':     [puzzleImg],
  'electrical engineering':     [puzzleImg],
  'civil engineering':          [puzzleImg],
  'chemical engineering':       [puzzleImg],
  'aerospace engineering':      [puzzleImg],
  'bio engineering':            [puzzleImg],
  'architecture':               [puzzleImg],
  'finance':                    [puzzleImg],
  'business administration':    [puzzleImg],
  'accounting':                 [puzzleImg],
  'marketing':                  [puzzleImg],
}
const fallbackImages = [puzzleImg]

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

const majorButtonColors = {
  'mechanical engineering': 'var(--meras-black)',
  'electrical engineering': 'var(--meras-green)',
  'electrical engineering and physics': 'var(--meras-black)',
  'industrial and systems engineering': 'var(--meras-black)',
  'material science and engineering': 'var(--meras-green)',
  'computer science': '#ffffffff',
  'software engineering': '#ffffffff',
  'computer engineering': '#ffffffff',
  'civil engineering': '#ffffffff',
  'integrated design': '#ffffffff',
  'smart and sustainable cities': 'var(--meras-black)',
  'petroleum engineering': 'var(--meras-green)',
  'geophysics': 'var(--meras-green)',
  'geology': 'var(--meras-black)',
  'chemical engineering': 'var(--meras-black)',
  'aerospace engineering': 'var(--meras-black)',
  'physics': 'var(--meras-black)',
  'chemistry': '#ffffffff',
  'math': 'var(--meras-black)',
  'bio engineering': 'var(--meras-green)',
  'control and instrumentation engineering': '#ffffffff',
  'architecture': 'var(--meras-green)',
  'finance': 'var(--meras-black)',
  'business administration': 'var(--meras-black)',
  'accounting': 'var(--meras-black)',
  'human resources' : 'var(--meras-black)',
  'marketing' : 'var(--meras-black)',
  'management information system': 'var(--meras-black)',
}

const badgeStrokeColors = {
  'var(--meras-green)': 'var(--meras-black)',
  'var(--meras-black)': 'var(--meras-yellow)',
  '#ffffffff': 'var(--meras-black)',
  'var(--meras-yellow)': '#ffffffff',
  'var(--meras-gray)': 'var(--meras-black)',
}

function ChallengeCard({ challengeName, description, major, onMoreDetails, buttonLabel = 'More Details' }) {
  const cardColor = majorCardColors[major?.toLowerCase()] ?? 'var(--meras-green)';
  const badgeColor = majorButtonColors[major?.toLowerCase()] ?? 'var(--meras-green)';
  const badgeStroke = badgeStrokeColors[cardColor] ?? 'var(--meras-black)';
  const illustration = useMemo(() => {
    const images = majorImages[major?.toLowerCase()] ?? fallbackImages
    return images[Math.floor(Math.random() * images.length)]
  }, [major])
  const badgeTextColor = 
  badgeColor == ('var(--meras-black)' || 'var(--meras-green)' || 'var(--meras-yellow') 
  ? '#ffffffff' : 'var(--meras-black)';


  return (
    <div
      style={{
        backgroundColor: 'white',
        borderRadius: '20px',
        border: '2px solid #1A0A0015',
        overflow: 'hidden',
        width: '100%',
        height: '500px', // new fix 
        display: 'flex',
        flexDirection: 'column', // new fix 
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}
    >
      {/* ──  colored area ── */}
      <div
        style={{
          backgroundColor: cardColor,
          borderRadius: '16px',
          margin: '12px',
          padding: '16px',
          position: 'relative',
          height: '260px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Major badge */}
        <span
          style={{
            position: 'absolute',
            top: '14px',
            left: '14px',
            backgroundColor: badgeColor,
            color: badgeTextColor,
            border: `0.9px solid ${badgeStroke}`,
            fontWeight: '600',
            fontSize: '13px',
            borderRadius: '999px',
            padding: '6px 14px',
          }}
        >
          {major}
        </span>

        {/* Illustration */}
        <img
          src={illustration}
          alt={challengeName}
          style={{ maxHeight: '160px', objectFit: 'contain' }}
        />
      </div>

      {/* ── Text + button area ── */}
      <div style={{ padding: '4px 18px 18px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <h5
          style={{
            fontWeight: '600',
            fontSize: '20px',
            color: 'var(--meras-text)',
            marginBottom: '8px',
            lineHeight: '1.3',
          }}
        >
          {challengeName}
        </h5>

        <p
          style={{
            color: 'var(--meras-gray)',
            fontSize: '14px',
            lineHeight: '1.6',
            marginBottom: '20px',
            flex: 1,
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {description}
        </p>

        <button
          onClick={onMoreDetails}
          style={{
            width: '100%',
            backgroundColor: cardColor,
            color: 'white',
            border: 'none',
            borderRadius: '999px',
            padding: '14px',
            fontWeight: '700',
            fontSize: '16px',
            cursor: 'pointer',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
          }}
        >
          {buttonLabel}
        </button>
      </div>
    </div>
  )
}

export default ChallengeCard
