import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { mockChallenges } from '../../../data/mockData'
import TaskSubmittedCelebration from '../../../assets/General-Graphics/celebration.png'

function SubmissionConfirmation() {
  const navigate = useNavigate()
  const { index } = useParams()
  const challenge = mockChallenges[parseInt(index)] ?? mockChallenges[0]

  // Generate submission time once on mount
  const [submittedAt] = useState(() => {

    const now = new Date()
    return now.toLocaleString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short'
    })
  })

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'var(--meras-bg)',
        overflow: 'hidden'
      }}
    >

      {/* ── TOP NAVBAR ── */}
      <div
        style={{
          backgroundColor: 'var(--meras-green)',
          padding: '0 1.5rem',
          height: '52px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexShrink: 0,
          zIndex: 100
        }}
      >
        <span
          className="fw-semibold"
          style={{ color: 'white', fontSize: '16px' }}
        >
          Meras
        </span>
      </div>

      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          paddingBottom: '120px' // space for bottom buttons
        }}
      >

       
        <img
          src={TaskSubmittedCelebration}
          alt="Celebration"
          style={{ maxHeight: '220px', marginTop: '2rem' }}
        />

     
        <h4
          className="fw-bold mt-4 mb-4"
          style={{ color: 'var(--meras-text)', fontSize: '1.6rem' }}
        >
          Your solution has been submitted!
        </h4>

        {/* submission card */}
        <div
          style={{
            width: '100%',
            maxWidth: '380px',
            backgroundColor: 'white',
            borderRadius: '16px',
            border: '1px solid var(--meras-border)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
            padding: '1.5rem'
          }}
        >

  
          <h6
            className="fw-bold mb-3"
            style={{ color: 'var(--meras-text)', fontSize: '15px' }}
          >
            Submission Details
          </h6>

          <div
            className="d-flex align-items-center justify-content-between py-2"
            style={{ borderBottom: '1px solid var(--meras-border)' }}
          >
            <span
              style={{ fontSize: '14px', color: 'var(--meras-gray)' }}
            >
              Challenge name
            </span>
            <span
              style={{
                fontSize: '14px',
                color: 'var(--meras-text)',
                fontWeight: '500',
                maxWidth: '180px',
                textAlign: 'right'
              }}
            >
              {challenge?.title || 'Unknown Challenge'}
            </span>
          </div>

          <div
            className="d-flex align-items-center justify-content-between py-2"
            style={{ borderBottom: '1px solid var(--meras-border)' }}
          >
            <span
              style={{ fontSize: '14px', color: 'var(--meras-gray)' }}
            >
              Submitted at
            </span>
            <span
              style={{
                fontSize: '13px',
                color: 'var(--meras-text)',
                fontWeight: '500'
              }}
            >
              {submittedAt}
            </span>
          </div>

          <div
            className="d-flex align-items-center justify-content-between py-2"
            style={{ borderBottom: '1px solid var(--meras-border)' }}
          >
            <span
              style={{ fontSize: '14px', color: 'var(--meras-gray)' }}
            >
              Status
            </span>
            <span
              className="badge px-3 py-1"
              style={{
                backgroundColor: '#FFF9E6',
                color: 'var(--meras-yellow)',
                borderRadius: '20px',
                fontSize: '12px',
                border: '1px solid #FDE68A'
              }}
            >
              Pending
            </span>
          </div>

        </div>
      </div>

    
      <div
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          display: 'flex',
          gap: '0.75rem',
          zIndex: 50
        }}
      >
        {/* back to Dashboard */}
        <button
          onClick={() => navigate('/explorer/dashboard')}
          className="btn fw-semibold px-4 py-2 text-white"
          style={{
            backgroundColor: 'var(--meras-green)',
            border: 'none',
            borderRadius: '10px',
            fontSize: '14px'
          }}
        >
          Back to Dashboard →
        </button>

        {/* browse More Challenges */}
        <button
          onClick={() => navigate('/explorer/challengeCatalog')}
          className="btn fw-semibold px-4 py-2 text-white"
          style={{
            backgroundColor: 'var(--meras-yellow)',
            border: 'none',
            borderRadius: '10px',
            fontSize: '14px'
          }}
        >
          Browse More Challenges
        </button>
      </div>

    </div>
  )
}

export default SubmissionConfirmation
