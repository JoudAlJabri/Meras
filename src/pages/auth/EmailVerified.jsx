import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { apiVerifyEmail } from '../../api/auth'

function EmailVerified() {
  const { token } = useParams()
  const [status, setStatus] = useState('loading') // 'loading' | 'success' | 'error'
  const [message, setMessage] = useState('')

  useEffect(() => {
    apiVerifyEmail(token)
      .then((data) => {
        setMessage(data.message)
        setStatus('success')
      })
      .catch((err) => {
        setMessage(err.message)
        setStatus('error')
      })
  }, [token])

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
        <div
          className="text-center p-5"
          style={{
            backgroundColor: 'white',
            borderRadius: '20px',
            boxShadow: '0 4px 24px rgba(0,0,0,0.08)'
          }}
        >
          <Link to="/" style={{ textDecoration: 'none' }}>
            <span className="fw-bold fs-5" style={{ color: 'var(--meras-green)' }}>
              Meras
            </span>
          </Link>

          {status === 'loading' && (
            <>
              <div className="my-4" style={{ fontSize: '48px' }}>⏳</div>
              <h3 className="fw-bold" style={{ color: 'var(--meras-text)' }}>
                Verifying your email...
              </h3>
            </>
          )}

          {status === 'success' && (
            <>
              <div className="my-4" style={{ fontSize: '48px' }}>✅</div>
              <h3 className="fw-bold" style={{ color: 'var(--meras-text)' }}>
                Email verified!
              </h3>
              <p style={{ color: 'var(--meras-gray)', marginBottom: '1.5rem' }}>
                {message || 'Your account is now active. You can log in.'}
              </p>
              <Link
                to="/login"
                className="btn w-100 text-white fw-semibold py-2"
                style={{
                  backgroundColor: 'var(--meras-green)',
                  border: 'none',
                  borderRadius: '10px',
                  fontSize: '15px'
                }}
              >
                Log in to Meras →
              </Link>
            </>
          )}

          {status === 'error' && (
            <>
              <div className="my-4" style={{ fontSize: '48px' }}>❌</div>
              <h3 className="fw-bold" style={{ color: 'var(--meras-text)' }}>
                Verification failed
              </h3>
              <p style={{ color: 'var(--meras-gray)', marginBottom: '1.5rem' }}>
                {message || 'This link is invalid or has expired.'}
              </p>
              <Link
                to="/login"
                className="btn w-100 text-white fw-semibold py-2"
                style={{
                  backgroundColor: 'var(--meras-green)',
                  border: 'none',
                  borderRadius: '10px',
                  fontSize: '15px'
                }}
              >
                Back to login
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default EmailVerified
