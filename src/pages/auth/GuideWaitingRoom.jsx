import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import WatingIcon from '../../assets/General-Graphics/GuideRoomIcon.png';


function GuideWaitingRoom() {
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
            <img src={WatingIcon} alt='email' style={{ width: '80px', height: '80px', objectFit: 'contain' }} />
          </div>

          {/* Logo */}
          <Link to="/" style={{ textDecoration: 'none' }}>
            <span className="fw-bold fs-5" style={{ color: 'var(--meras-green)' }}>
              Meras
            </span>
          </Link>

          {/* Heading */}
          <h3 className="fw-bold mt-3 mb-2" style={{ color: 'var(--meras-text)' }}>
            Your application is under review!
          </h3>

          {/* Subtext */}
          <p style={{ color: 'var(--meras-gray)', lineHeight: '1.6' }}>
           We'll notify you within{' '}
            <span className="fw-semibold" style={{ color: 'var(--meras-yellow)' }}>
              {"24–48 "}
            </span>
             hours
          </p>

          {/* Divider */}
          <hr style={{ borderColor: 'var(--meras-border)', margin: '1.5rem 0' }} />

          {/* Steps */}
          <div className="text-start mb-4">
            {[
              'Email verified ✓',
              'Application submitted ✓',
              'Admin review (in progress) ⏳',
              'Account activated ⏳'
            ].map((text, index) => (
              <div
                key={index}
                className="d-flex align-items-center gap-3 mb-3"
              >
                <span
                  style={{
                    width: '26px',
                    height: '26px',
                    minWidth: '26px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--meras-yellow)',
                    color: 'white',
                    fontSize: '13px',
                    fontWeight: '700',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {index + 1}
                </span>
                <span style={{ color: 'var(--meras-text)', fontSize: '14px' }}>
                  {text}
                </span>
              </div>
            ))}
          </div>

         

          {/* Resend */}
          <p style={{ fontSize: '13px', color: 'var(--meras-gray)' }}>
            Have questions? Contact us at <br/>{' '}
            <span
              style={{
                color: 'var(--meras-yellow)',
                fontWeight: '600',
                cursor: 'pointer'
              }}
              
            >
              meras@support.com
            </span>
          </p>

           <Link
            to="/"
            className="btn w-100 text-black fw-semibold py-2 mb-3"
            style={{
              backgroundColor: 'var(--meras-yellow)',
              border: 'none',
              borderRadius: '10px',
              fontSize: '15px'
            }}
          >
            Log Out
          </Link>

          <Link
            to="/guide/dashboard"
            className="btn w-100 text-black fw-semibold py-2 mb-3"
            style={{
              backgroundColor: 'var(--meras-yellow)',
              border: 'none',
              borderRadius: '10px',
              fontSize: '15px'
            }}
          >
            Go
          </Link>

        </div>
      </div>
    </div>
  )
}
export default GuideWaitingRoom
