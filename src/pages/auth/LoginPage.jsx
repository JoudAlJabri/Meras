import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { mockUsers } from '../../data/mockData'
import BackButton from '../../components/BackButton'


function LoginPage() {
    const navigate = useNavigate();
    const {login} = useAuth();

    // form state
    const [formData , setFormData] = useState(
        {
            email: "",
            password: "",
            role: 'explorer' // default selected role
        }
    )

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    //update from feilds as user types
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
        setError('') // clear error when user starts typing
    }

    //handle role badge click
    const handleRoleSelect = (role) => {
        setFormData({...formData, role})
        setError('')
    }

    const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)

    // Find user in mock data
    const user = mockUsers.find(
      u => u.email === formData.email &&
           u.password === formData.password &&
           u.role === formData.role
    )

    if (!user) {
      setError('Invalid email, password, or role. Please try again.')
      setLoading(false)
      return
    }

    // log then in via AuthContext
    login(user)

    ///Redirect based on role
    if (user.role === 'explorer') navigate('/explorer/dashboard')
    if (user.role === 'guide') {
      if (!user.isVerified) {
        navigate('/waiting-room')
      } else {
        navigate('/guide/dashboard')
      }
    }
    if (user.role === 'admin') navigate('/admin')

    setLoading(false)
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--meras-bg)' }}>
      <div className="container-fluid" style={{ minHeight: '100vh' }}>
        <div className="row" style={{ minHeight: '100vh' }}>

          {/* ── LEFT SIDE — Login Form ── */}
          <div className="col-lg-6 d-flex align-items-center justify-content-center p-5">
            <div style={{ width: '100%', maxWidth: '420px' }}>

          
              {/* Logo */}
              <Link to="/" style={{ textDecoration: 'none' }}>
                <span className="fw-semibold fs-4" style={{ color: 'var(--meras-green)' }}>
                  Meras
                </span>
              </Link>

              {/* Heading */}
              <h2 className="fw-semibold mt-4 mb-1" style={{ color: 'var(--meras-text)' }}>
                Log in
              </h2>
              <p style={{ color: 'var(--meras-gray)' }}>
                Welcome back! Please enter your details.
              </p>
              {/* Role Selector */}
                <div className="mb-4">
                  <label
                    className="form-label fw-semibold"
                    style={{ color: 'var(--meras-text)', fontSize: '14px' }}
                  >
                   Log in as
                  </label>

                  <div className="d-flex gap-2">
                    {['explorer', 'guide', 'admin'].map((role) => (
                      <button
                        key={role}
                        type="button"
                        onClick={() => handleRoleSelect(role)}
                        className="btn"
                        style={{
                          borderRadius: '999px',
                          padding: '8px 16px',
                          border: formData.role === role
                            ? '1.5px solid var(--meras-green)'
                            : '1.5px solid var(--meras-border)',
                          backgroundColor: formData.role === role
                            ? 'var(--meras-green)'
                            : 'white',
                          color: formData.role === role ? 'white' : 'var(--meras-text)',
                          fontSize: '14px',
                          fontWeight: '500'
                        }}
                      >
                        {role.charAt(0).toUpperCase() + role.slice(1)}
                      </button>
                    ))}
                  </div>
              </div>

              {/* Error message */}
              {error && (
                <div className="alert alert-danger py-2 px-3" style={{ fontSize: '14px', borderRadius: '10px' }}>
                  {error}
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit}>

                {/* Email */}
                <div className="mb-3">
                  <label className="form-label fw-semibold" style={{ color: 'var(--meras-text)', fontSize: '14px' }}>
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="form-control py-2"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    style={{
                      borderRadius: '10px',
                      border: '1.5px solid var(--meras-border)',
                      fontSize: '15px'
                    }}
                  />
                </div>

                {/* Password */}
                <div className="mb-2">
                  <label className="form-label fw-semibold" style={{ color: 'var(--meras-text)', fontSize: '14px' }}>
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    className="form-control py-2"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    style={{
                      borderRadius: '10px',
                      border: '1.5px solid var(--meras-border)',
                      fontSize: '15px'
                    }}
                  />
                </div>

                {/* Forgot password */}
                <div className="text-end mb-4">
                  <span
                    style={{ color: 'var(--meras-green)', fontSize: '14px', cursor: 'pointer' }}
                  >
                    Forgot password?
                  </span>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="btn w-100 text-white fw-semibold py-2"
                  disabled={loading}
                  style={{
                    backgroundColor: 'var(--meras-green)',
                    border: 'none',
                    borderRadius: '10px',
                    fontSize: '16px'
                  }}
                >
                  {loading ? 'Signing in...' : 'Sign in'}
                </button>

                {/* Divider + Google button — only for non-guide roles */}
                {formData.role !== 'guide' && (
                  <>
                    <div className="d-flex align-items-center gap-3 my-3">
                      <hr className="flex-grow-1 m-0" />
                      <span style={{ color: 'var(--meras-gray)', fontSize: '13px' }}>or</span>
                      <hr className="flex-grow-1 m-0" />
                    </div>

                    <button
                      type="button"
                      className="btn w-100 fw-semibold py-2"
                      style={{
                        border: '1.5px solid var(--meras-border)',
                        borderRadius: '10px',
                        fontSize: '15px',
                        color: 'var(--meras-text)',
                        backgroundColor: 'white'
                      }}
                    >
                      <img
                        src="https://www.google.com/favicon.ico"
                        alt="Google"
                        width="18"
                        className="me-2"
                      />
                      Sign in with Google
                    </button>
                  </>
                )}

              </form>

              {/* Sign up link */}
              <p className="text-center mt-4" style={{ fontSize: '14px', color: 'var(--meras-gray)' }}>
                Don't have an account?{' '}
                <Link
                  to="/signup/explorer"
                  style={{ color: 'var(--meras-green)', fontWeight: '600', textDecoration: 'none' }}
                >
                  Sign up
                </Link>
              </p>

            </div>
          </div>

          {/* ── RIGHT SIDE — Image Placeholder ── */}
          <div
            className="col-lg-6 d-none d-lg-flex align-items-center justify-content-center"
            style={{
              backgroundColor: '#e8f5ef',
              minHeight: '100vh',
              position: 'relative'
            }}
          >
        
            {/* Placeholder content */}
            <div className="text-center p-5" style={{ position: 'relative', zIndex: 1 }}>

              {/* Image placeholder box */}
              <div
                className="d-flex align-items-center justify-content-center mx-auto mb-4"
                style={{
                  width: '280px',
                  height: '280px',
                  borderRadius: '20px',
                  backgroundColor: 'white',
                  border: '2px dashed var(--meras-green)',
                  opacity: 0.8
                }}
              >
                <div className="text-center">
                  <div style={{ fontSize: '48px' }}>🖼️</div>
                  <p style={{ color: 'var(--meras-green)', fontSize: '14px', marginTop: '8px' }}>
                    
                  </p>
                </div>
              </div>

              {/* Text below image */}
              

            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default LoginPage

