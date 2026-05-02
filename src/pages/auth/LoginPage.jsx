import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { apiLogin } from '../../api/auth'
import MerasLogo from "../../assets/Meras-Logos/Meras-logo2.svg";


function LoginPage() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [formData, setFormData] = useState({ email: '', password: '' })
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
        setError('')
    }

    const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const { token, user } = await apiLogin(formData.email, formData.password)
      login(token, user)

      if (user.role === 'explorer') navigate('/explorer/dashboard')
      else if (user.role === 'guide') {
        navigate(user.guideStatus === 'approved' ? '/guide/dashboard' : '/waiting-room')
      } else if (user.role === 'admin') navigate('/admin')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--meras-bg)' }}>
      <div className="container-fluid" style={{ minHeight: '100vh' }}>
        <div className="row" style={{ minHeight: '100vh' }}>

          {/* ── LEFT SIDE — Login Form ── */}
          {/* p-3 on mobile, p-5 on large screens — avoids the form being
              squeezed by 3rem padding on small phones */}
          <div className="col-lg-6 d-flex align-items-center justify-content-center p-3 p-lg-5">
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
              {/* Error message */}
              {error && (
                <div className="alert alert-danger py-2 px-3" style={{ fontSize: '14px', borderRadius: '10px' }}>
                  {error}
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} noValidate>

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
                    
                    minHeight: '100vh',
                    position: 'relative'
                  }}
                >
      
                  <div className="text-center p-4" style={{ position: 'relative', zIndex: 1 }}>
                    <img src={MerasLogo}></img>
                    {/* Image placeholder */}
                  
                  </div>
                </div>

        </div>
      </div>
    </div>
  )
}

export default LoginPage

