import puzzleImg from '../assets/General-Graphics/2PersonPuzzle.png'

function ChallengeCard({ challengeName, description, major, onMoreDetails }) {

  const illustration = <img
            src={puzzleImg}
            alt={challengeName}
            style={{ maxHeight: '160px', objectFit: 'contain' }} ></img>;
          
  return (
    <div
      style={{
        backgroundColor: 'white',
        borderRadius: '20px',
        border: '2px solid #1A0A0015',
        overflow: 'hidden',
        width: '320px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}
    >
      {/* ── Green image area ── */}
      <div
        style={{
          backgroundColor: 'var(--meras-green)',
          borderRadius: '16px',
          margin: '12px',
          padding: '16px',
          position: 'relative',
          minHeight: '220px',
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
            backgroundColor: 'white',
            color: 'var(--meras-text)',
            fontWeight: '600',
            fontSize: '13px',
            borderRadius: '999px',
            padding: '6px 14px',
          }}
        >
          {major}
        </span>

        {/* Illustration */}
        {illustration ? (
          <img
            src={puzzleImg}
            alt={challengeName}
            style={{ maxHeight: '160px', objectFit: 'contain' }}
          />
        ) : (
          /* Placeholder illustration if none provided */
         <img
            src={puzzleImg}
            alt={challengeName}
            style={{ maxHeight: '160px', objectFit: 'contain' }}
          />
        )
        }
      </div>

      {/* ── Text + button area ── */}
      <div style={{ padding: '4px 18px 18px' }}>
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
          }}
        >
          {description}
        </p>

        <button
          onClick={onMoreDetails}
          style={{
            width: '100%',
            backgroundColor: 'var(--meras-green)',
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
          More Details
        </button>
      </div>
    </div>
  )
}

export default ChallengeCard
