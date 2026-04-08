import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

function SignUpExplorer() {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    gender: '',
    grade: '',
    password: '',
    confirmPassword: ''
  })
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    // clear that field's error as user types
    setErrors({ ...errors, [e.target.name]: '' })
  }

  // validation
  const validate = () => {
    const newErrors = {}

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required'
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required'
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 8) {
      newErrors.password = 'Must be at least 8 characters'
    }
    if (!formData.gender) {
      newErrors.gender = 'Please select a gender'
    }
    if (!formData.grade) {
      newErrors.grade = 'Please select a grade'
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    return newErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Run validation to check for errora
    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    // Create new user object
    const newUser = {
      id: Date.now(), // temporary id
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      gender: formData.gender,
      grade: formData.grade,
      password: formData.password,
      role: 'explorer',
      recommendedMajors: []
    }

    // Log them in immediately after signup
    login(newUser)

    // Redirect to compass quiz
    navigate("/verify-email" )
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--meras-bg)' }}>
      <div className="container-fluid" style={{ minHeight: '100vh' }}>
        <div className="row" style={{ minHeight: '100vh' }}>

          {/* ── LEFT SIDE — Signup Form ── */}
          <div className="col-lg-6 d-flex align-items-center justify-content-center p-5">
            <div style={{ width: '100%', maxWidth: '520px' }}>

              {/* Logo */}
              <Link to="/" style={{ textDecoration: 'none' }}>
                <span className="fw-semibold fs-4" style={{ color: 'var(--meras-green)' }}>
                  Meras
                </span>
              </Link>

              {/* Heading */}
              <h2 className="fw-semibold mt-4 mb-4" style={{ color: 'var(--meras-text)' }}>
                Sign up
              </h2>

              {/* Role Toggle — clicking College Student goes to guide signup */}
              <div className="d-flex gap-2 mb-4">
                {/* Active — High School Student */}
                <button
                  type="button"
                  className="btn btn-sm px-4 py-2 fw-semibold"
                  style={{
                    backgroundColor: '#F5C518',
                    color: 'white',
                    border: 'none',
                    borderRadius: '20px',
                    fontSize: '14px'
                  }}
                >
                  Highschool Student
                </button>

                {/* Inactive — redirects to guide signup */}
                <Link
                  to="/signup/guide"
                  className="btn btn-sm px-4 py-2 fw-semibold"
                  style={{
                    backgroundColor: '#f3f4f6',
                    color: 'var(--meras-gray)',
                    border: 'none',
                    borderRadius: '20px',
                    fontSize: '14px',
                    textDecoration: 'none'
                  }}
                >
                  College Student
                </Link>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit}>

                {/* First Name + Last Name side by side */}
                <div className="row g-3 mb-3">
                  <div className="col-6">
                    <label
                      className="form-label fw-semibold"
                      style={{ color: 'var(--meras-text)', fontSize: '14px' }}
                    >
                      First Name*
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      className={`form-control py-2 ${errors.firstName ? 'is-invalid' : ''}`}
                      placeholder="Enter your first name"
                      value={formData.firstName}
                      onChange={handleChange}
                      style={{
                        borderRadius: '10px',
                        border: errors.firstName
                          ? '1.5px solid #dc3545'
                          : '1.5px solid var(--meras-border)',
                        fontSize: '15px'
                      }}
                    />
                    {errors.firstName && (
                      <div style={{ color: '#dc3545', fontSize: '12px', marginTop: '4px' }}>
                        {errors.firstName}
                      </div>
                    )}
                  </div>
                  <div className="col-6">
                    <label
                      className="form-label fw-semibold"
                      style={{ color: 'var(--meras-text)', fontSize: '14px' }}
                    >
                      Last Name*
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      className={`form-control py-2 ${errors.lastName ? 'is-invalid' : ''}`}
                      placeholder="Enter your last name"
                      value={formData.lastName}
                      onChange={handleChange}
                      style={{
                        borderRadius: '10px',
                        border: errors.lastName
                          ? '1.5px solid #dc3545'
                          : '1.5px solid var(--meras-border)',
                        fontSize: '15px'
                      }}
                    />
                    {errors.lastName && (
                      <div style={{ color: '#dc3545', fontSize: '12px', marginTop: '4px' }}>
                        {errors.lastName}
                      </div>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div className="mb-3">
                  <label
                    className="form-label fw-semibold"
                    style={{ color: 'var(--meras-text)', fontSize: '14px' }}
                  >
                    Email*
                  </label>
                  <input
                    type="email"
                    name="email"
                    className={`form-control py-2 ${errors.email ? 'is-invalid' : ''}`}
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    style={{
                      borderRadius: '10px',
                      border: errors.email
                        ? '1.5px solid #dc3545'
                        : '1.5px solid var(--meras-border)',
                      fontSize: '15px'
                    }}
                  />
                  {errors.email && (
                    <div style={{ color: '#dc3545', fontSize: '12px', marginTop: '4px' }}>
                      {errors.email}
                    </div>
                  )}
                </div>


                {/* Gender + Grade side by side */}
                <div className="row g-3 mb-3">
                  <div className="col-6">
                    <label
                      className="form-label fw-semibold"
                      style={{ color: 'var(--meras-text)', fontSize: '14px' }}
                    >
                      Gender*
                    </label>
                    <select
                      name="gender"
                      className={`form-control py-2 ${errors.gender ? 'is-invalid' : ''}`}
                      value={formData.gender}
                      onChange={handleChange}
                      style={{
                        borderRadius: '10px',
                        border: errors.gender
                          ? '1.5px solid #dc3545'
                          : '1.5px solid var(--meras-border)',
                        fontSize: '15px',
                        color: formData.gender ? 'var(--meras-text)' : '#aaa'
                      }}
                    >
                      <option value="" disabled>Select gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                    {errors.gender && (
                      <div style={{ color: '#dc3545', fontSize: '12px', marginTop: '4px' }}>
                        {errors.gender}
                      </div>
                    )}
                  </div>
                  <div className="col-6">
                    <label
                      className="form-label fw-semibold"
                      style={{ color: 'var(--meras-text)', fontSize: '14px' }}
                    >
                      Grade*
                    </label>
                    <select
                      name="grade"
                      className={`form-control py-2 ${errors.grade ? 'is-invalid' : ''}`}
                      value={formData.grade}
                      onChange={handleChange}
                      style={{
                        borderRadius: '10px',
                        border: errors.grade
                          ? '1.5px solid #dc3545'
                          : '1.5px solid var(--meras-border)',
                        fontSize: '15px',
                        color: formData.grade ? 'var(--meras-text)' : '#aaa'
                      }}
                    >
                      <option value="" disabled>Select grade</option>
                      {[ 10, 11, 12].map(g => (
                        <option key={g} value={g}>Grade {g}</option>
                      ))}
                    </select>
                    {errors.grade && (
                      <div style={{ color: '#dc3545', fontSize: '12px', marginTop: '4px' }}>
                        {errors.grade}
                      </div>
                    )}
                  </div>
                </div>

                {/* Password */}
                <div className="mb-1">
                  <label
                    className="form-label fw-semibold"
                    style={{ color: 'var(--meras-text)', fontSize: '14px' }}
                  >
                    Password*
                  </label>
                  <input
                    type="password"
                    name="password"
                    className={`form-control py-2 ${errors.password ? 'is-invalid' : ''}`}
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={handleChange}
                    style={{
                      borderRadius: '10px',
                      border: errors.password
                        ? '1.5px solid #dc3545'
                        : '1.5px solid var(--meras-border)',
                      fontSize: '15px'
                    }}
                  />
                  {/* show error OR the hint, not both */}
                  {errors.password ? (
                    <div style={{ color: '#dc3545', fontSize: '12px', marginTop: '4px' }}>
                      {errors.password}
                    </div>
                  ) : (
                    <div style={{ color: 'var(--meras-gray)', fontSize: '12px', marginTop: '4px' }}>
                      Must be at least 8 characters.
                    </div>
                  )}
                </div>

                {/* Confirm Password */}
                <div className="mb-4 mt-3">
                  <label
                    className="form-label fw-semibold"
                    style={{ color: 'var(--meras-text)', fontSize: '14px' }}
                  >
                    Confirm Password*
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    className={`form-control py-2 ${errors.confirmPassword ? 'is-invalid' : ''}`}
                    placeholder="Create a password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    style={{
                      borderRadius: '10px',
                      border: errors.confirmPassword
                        ? '1.5px solid #dc3545'
                        : '1.5px solid var(--meras-border)',
                      fontSize: '15px'
                    }}
                  />
                  {errors.confirmPassword && (
                    <div style={{ color: '#dc3545', fontSize: '12px', marginTop: '4px' }}>
                      {errors.confirmPassword}
                    </div>
                  )}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="btn w-100 text-white fw-semibold py-2"
                  style={{
                    backgroundColor: 'var(--meras-green)',
                    border: 'none',
                    borderRadius: '10px',
                    fontSize: '16px'
                  }}
                >
                  Create account
                </button>

                {/* Divider */}
                <div className="d-flex align-items-center gap-3 my-3">
                  <hr className="flex-grow-1 m-0" />
                  <span style={{ color: 'var(--meras-gray)', fontSize: '13px' }}>or</span>
                  <hr className="flex-grow-1 m-0" />
                </div>

                {/* Google */}
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
                  Sign up with Google
                </button>

              </form>

              {/* Login link */}
              <p className="text-center mt-4" style={{ fontSize: '14px', color: 'var(--meras-gray)' }}>
                Already have an account?{' '}
                <Link
                  to="/login"
                  style={{ color: 'var(--meras-green)', fontWeight: '600', textDecoration: 'none' }}
                >
                  Log in
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

            <div className="text-center p-5" style={{ position: 'relative', zIndex: 1 }}>
              {/* Image placeholder */}
              <div
                className="d-flex align-items-center justify-content-center mx-auto mb-4"
                style={{
                  width: '280px', height: '280px',
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

            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default SignUpExplorer