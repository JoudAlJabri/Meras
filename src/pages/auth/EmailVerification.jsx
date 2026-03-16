import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

function EmailVerification() {
  const { currentUser } = useAuth()

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--meras-bg)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <div style={{ width: '100%', maxWidth: '480px', padding: '2rem' }}>

        {/* Card */}
        <div
          className="text-center p-5"
          style={{
            backgroundColor: 'white',
            borderRadius: '20px',
            boxShadow: '0 4px 24px rgba(0,0,0,0.08)'
          }}
        >
          {/* Email icon */}
          <div
            className="d-flex align-items-center justify-content-center mx-auto mb-4"
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              backgroundColor: '#e8f5ef'
            }}
          >
            <span style={{ fontSize: '36px' }}>📧</span>
          </div>

          {/* Logo */}
          <Link to="/" style={{ textDecoration: 'none' }}>
            <span className="fw-bold fs-5" style={{ color: 'var(--meras-green)' }}>
              Meras
            </span>
          </Link>

          {/* Heading */}
          <h3 className="fw-bold mt-3 mb-2" style={{ color: 'var(--meras-text)' }}>
            Check your email
          </h3>

          {/* Subtext */}
          <p style={{ color: 'var(--meras-gray)', lineHeight: '1.6' }}>
            We sent a verification link to{' '}
            <span className="fw-semibold" style={{ color: 'var(--meras-text)' }}>
              {currentUser?.email || 'your email address'}
            </span>
            . Click the link in the email to verify your account.
          </p>

          {/* Divider */}
          <hr style={{ borderColor: 'var(--meras-border)', margin: '1.5rem 0' }} />

          {/* Steps */}
          <div className="text-start mb-4">
            {[
              { icon: '1️⃣', text: 'Open your university email inbox' },
              { icon: '2️⃣', text: 'Find the email from Meras' },
              { icon: '3️⃣', text: 'Click the verification link' },
              { icon: '4️⃣', text: 'You\'ll be redirected back automatically' }
            ].map((item, index) => (
              <div
                key={index}
                className="d-flex align-items-center gap-3 mb-3"
              >
                <span style={{ fontSize: '20px' }}>{item.icon}</span>
                <span style={{ color: 'var(--meras-text)', fontSize: '14px' }}>
                  {item.text}
                </span>
              </div>
            ))}
          </div>

          {/* Simulate verify button — for prototype only */}
          <Link
            to="/waiting-room"
            className="btn w-100 text-white fw-semibold py-2 mb-3"
            style={{
              backgroundColor: 'var(--meras-green)',
              border: 'none',
              borderRadius: '10px',
              fontSize: '15px'
            }}
          >
            I verified my email →
          </Link>

          {/* Resend */}
          <p style={{ fontSize: '13px', color: 'var(--meras-gray)' }}>
            Didn't receive the email?{' '}
            <span
              style={{
                color: 'var(--meras-green)',
                fontWeight: '600',
                cursor: 'pointer'
              }}
              onClick={() => alert('Verification email resent!')}
            >
              Resend email
            </span>
          </p>

          {/* Wrong email */}
          <p style={{ fontSize: '13px', color: 'var(--meras-gray)' }}>
            Wrong email?{' '}
            <Link
              to="/signup/guide"
              style={{
                color: 'var(--meras-green)',
                fontWeight: '600',
                textDecoration: 'none'
              }}
            >
              Go back
            </Link>
          </p>

        </div>
      </div>
    </div>
  )
}

export default EmailVerification