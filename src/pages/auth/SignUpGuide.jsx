import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { apiRegisterGuide } from '../../api/auth'

function SignUpGuide() {
    const UNIVERSITIES = [
  'King Fahd University of Petroleum and Minerals (KFUPM)',
  'King Abdulaziz University (KAU)',
  'King Saud University (KSU)',
  'King Abdullah University of Science and Technology (KAUST)',
  'Princess Nourah bint Abdulrahman University (PNU)',
  'Imam Abdulrahman Bin Faisal University (IAU)',
  'Taibah University',
  'Taif University',
  'Qassim University',
  'Umm Al-Qura University',
  'Other'
]

const MAJORS = [
  'Software Engineering',
  'Computer Science',
  'Information Technology',
  'Data Science',
  'Cybersecurity',
  'Electrical Engineering',
  'Mechanical Engineering',
  'Civil Engineering',
  'Architecture',
  'Business Administration',
  'Finance',
  'Accounting',
  'Marketing',
  'Medicine',
  'Pharmacy',
  'Nursing',
  'Law',
  'Education',
  'Psychology',
  'Graphic Design',
  'Other'
]
    const navigate = useNavigate()

    const [serverError, setServerError] = useState('')
    const [loading, setLoading] = useState(false)

    const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    university: '',
    major: '',
    document: null
  })

  const [errors, setErrors] = useState({})
  const [documentName, setDocumentName] = useState('')

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: '' })
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    // file validation
    if (file) {
        // check file type 
        const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg']
        if (!allowedTypes.includes(file.type)) {
        setErrors({ ...errors, document: 'Only PDF, JPG, or PNG files are allowed' })
        return
      }
      // check file size
        if (file.size > 5 * 1024 * 1024) {
        setErrors({ ...errors, document: 'File size must be less than 5MB' })
        return
      }

      setFormData({ ...formData, document: file })
      setDocumentName(file.name)
      setErrors({ ...errors, document: '' })
    }
  }

  // drag & drop handlers
  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const handleDrop = (e) => {
    e.preventDefault()
    const file = e.datatrasfer.files[0]
    if (file) {
      const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg']
      if (!allowedTypes.includes(file.type)) {
        setErrors({ ...errors, document: 'Only PDF, JPG, or PNG files are allowed' })
        return
      }
      if (file.size > 5 * 1024 * 1024) {
        setErrors({ ...errors, document: 'File size must be less than 5MB' })
        return
      }
      setFormData({ ...formData, document: file })
      setDocumentName(file.name)
      setErrors({ ...errors, document: '' })
    }
  }
  // univeristy email validation
  const isUniversityEmail = (email) => {
    return email.endsWith('.edu.sa') || email.endsWith('.edu')
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
    } else if (!isUniversityEmail(formData.email)) {
      newErrors.email = 'Please use your university email (.edu.sa or .edu)'
    }
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 8) {
      newErrors.password = 'Must be at least 8 characters'
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }
    if (!formData.university) {
      newErrors.university = 'Please select your university'
    }
    if (!formData.major) {
      newErrors.major = 'Please select your major'
    }
    if (!formData.document) {
      newErrors.document = 'Please upload your university ID or transcript'
    }

    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    setLoading(true)
    setServerError('')

    try {
      const data = new FormData()
      data.append('name', `${formData.firstName} ${formData.lastName}`)
      data.append('email', formData.email)
      data.append('password', formData.password)
      data.append('university', formData.university)
      data.append('major', formData.major)
      data.append('role', 'guide')
      if (formData.document) data.append('transcript', formData.document)

      await apiRegisterGuide(data)
      navigate('/verify-email', { state: { email: formData.email } })
    } catch (err) {
      setServerError(err.message)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } finally {
      setLoading(false)
    }
}

// content
return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--meras-bg)' }}>
      <div className="container-fluid" style={{ minHeight: '100vh' }}>
        <div className="row" style={{ minHeight: '100vh' }}>

          {/* ── LEFT SIDE — Signup Form ── */}
          {/* Reduced padding on mobile to give the form breathing room */}
          <div className="col-lg-6 d-flex align-items-center justify-content-center p-3 p-lg-5">
            <div style={{ width: '100%', maxWidth: '520px' }}>

              {/* Logo */}
              <Link to="/" style={{ textDecoration: 'none' }}>
                <span className="fw-bold fs-4" style={{ color: 'var(--meras-green)' }}>
                  Meras
                </span>
              </Link>

              {/* Heading */}
              <h2 className="fw-semibold mt-4 mb-4" style={{ color: 'var(--meras-text)' }}>
                Sign up
              </h2>

              {/* Role Toggle */}
              <div className="d-flex gap-2 mb-4">
                {/* Inactive — redirects to explorer signup */}
                <Link
                  to="/signup/explorer"
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
                  Highschool Student
                </Link>

                {/* Active — College Student */}
                <button
                  type="button"
                  className="btn btn-sm px-4 py-2 fw-semibold"
                  style={{
                    backgroundColor: 'var(--meras-green)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '20px',
                    fontSize: '14px'
                  }}
                >
                  College Student
                </button>
              </div>

              {/* Server error */}
              {serverError && (
                <div className="alert alert-danger py-2 px-3 mb-3" style={{ fontSize: '14px', borderRadius: '10px' }}>
                  {serverError}
                </div>
              )}

              {/* University email notice */}
              <div
                className="d-flex align-items-start gap-2 p-3 mb-4"
                style={{
                  backgroundColor: '#e8f5ef',
                  borderRadius: '10px',
                  border: '1px solid #b7dfcc'
                }}
              >
              
              <span style={{ fontSize: '16px' }}>💡</span> 
                <p style={{ margin: 0, fontSize: '13px', color: 'var(--meras-green)' }}>
                  You must use your <strong>university email</strong> (.edu.sa or .edu)
                  and upload a valid university ID or transcript for verification.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} noValidate>

                {/* First Name + Last Name */}
                {/* col-sm-6: side-by-side on sm+ (≥576px), full-width stacked below that */}
                <div className="row g-3 mb-3">
                  <div className="col-12 col-sm-6">
                    <label
                      className="form-label fw-semibold"
                      style={{ color: 'var(--meras-text)', fontSize: '14px' }}
                    >
                      First Name*
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      className="form-control py-2"
                      placeholder="Enter your name"
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
                  <div className="col-12 col-sm-6">
                    <label
                      className="form-label fw-semibold"
                      style={{ color: 'var(--meras-text)', fontSize: '14px' }}
                    >
                      Last Name*
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      className="form-control py-2"
                      placeholder="Enter your name"
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

                {/* University Email */}
                <div className="mb-3">
                  <label
                    className="form-label fw-semibold"
                    style={{ color: 'var(--meras-text)', fontSize: '14px' }}
                  >
                    University Email*
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="form-control py-2"
                    placeholder="yourname@university.edu.sa"
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
                  {errors.email ? (
                    <div style={{ color: '#dc3545', fontSize: '12px', marginTop: '4px' }}>
                      {errors.email}
                    </div>
                  ) : (
                    <div style={{ color: 'var(--meras-gray)', fontSize: '12px', marginTop: '4px' }}>
                      Must be a valid university email address
                    </div>
                  )}
                </div>

                {/* University + Major side by side on sm+, stacked on mobile */}
                <div className="row g-3 mb-3">
                  <div className="col-12 col-sm-6">
                    <label
                      className="form-label fw-semibold"
                      style={{ color: 'var(--meras-text)', fontSize: '14px' }}
                    >
                      University*
                    </label>
                    <select
                      name="university"
                      className="form-select py-2"
                      value={formData.university}
                      onChange={handleChange}
                      style={{
                        borderRadius: '10px',
                        border: errors.university
                          ? '1.5px solid #dc3545'
                          : '1.5px solid var(--meras-border)',
                        fontSize: '14px',
                        color: formData.university ? 'var(--meras-text)' : 'var(--meras-gray)'
                      }}
                    >
                      <option value="">Select university</option>
                      {UNIVERSITIES.map((uni) => (
                        <option key={uni} value={uni}>{uni}</option>
                      ))}
                    </select>
                    {errors.university && (
                      <div style={{ color: '#dc3545', fontSize: '12px', marginTop: '4px' }}>
                        {errors.university}
                      </div>
                    )}
                  </div>
                  <div className="col-12 col-sm-6">
                    <label
                      className="form-label fw-semibold"
                      style={{ color: 'var(--meras-text)', fontSize: '14px' }}
                    >
                      Major*
                    </label>
                    <select
                      name="major"
                      className="form-select py-2"
                      value={formData.major}
                      onChange={handleChange}
                      style={{
                        borderRadius: '10px',
                        border: errors.major
                          ? '1.5px solid #dc3545'
                          : '1.5px solid var(--meras-border)',
                        fontSize: '14px',
                        color: formData.major ? 'var(--meras-text)' : 'var(--meras-gray)'
                      }}
                    >
                      <option value="">Select major</option>
                      {MAJORS.map((major) => (
                        <option key={major} value={major}>{major}</option>
                      ))}
                    </select>
                    {errors.major && (
                      <div style={{ color: '#dc3545', fontSize: '12px', marginTop: '4px' }}>
                        {errors.major}
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
                    className="form-control py-2"
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
                    className="form-control py-2"
                    placeholder="Confirm your password"
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

                {/* Document Upload */}
                <div className="mb-4">
                  <label
                    className="form-label fw-semibold"
                    style={{ color: 'var(--meras-text)', fontSize: '14px' }}
                  >
                    University ID or Transcript*
                  </label>

                  {/* Drag and drop zone */}
                  <div
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    onClick={() => document.getElementById('fileInput').click()}
                    style={{
                      border: errors.document
                        ? '2px dashed #dc3545'
                        : documentName
                        ? '2px dashed var(--meras-green)'
                        : '2px dashed var(--meras-border)',
                      borderRadius: '10px',
                      padding: '24px',
                      textAlign: 'center',
                      cursor: 'pointer',
                      backgroundColor: documentName ? '#e8f5ef' : '#fafafa',
                      transition: 'all 0.2s'
                    }}
                  >
                    {documentName ? (
                      // File selected state
                      <div>
                        <div style={{ fontSize: '28px', marginBottom: '8px' }}>✅</div>
                        <p style={{ color: 'var(--meras-green)', fontWeight: '600', fontSize: '14px', margin: 0 }}>
                          {documentName}
                        </p>
                        <p style={{ color: 'var(--meras-gray)', fontSize: '12px', marginTop: '4px' }}>
                          Click to change file
                        </p>
                      </div>
                    ) : (
                      // Empty state
                      <div>
                        <div style={{ fontSize: '28px', marginBottom: '8px' }}>📄</div>
                        <p style={{ color: 'var(--meras-text)', fontWeight: '600', fontSize: '14px', margin: 0 }}>
                          Drag & drop your file here
                        </p>
                        <p style={{ color: 'var(--meras-gray)', fontSize: '12px', margin: '4px 0 0' }}>
                          or click to browse — PDF, JPG, PNG (max 5MB)
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Hidden file input */}
                  <input
                    id="fileInput"
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                  />

                  {errors.document && (
                    <div style={{ color: '#dc3545', fontSize: '12px', marginTop: '4px' }}>
                      {errors.document}
                    </div>
                  )}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="btn w-100 text-white fw-semibold py-2"
                  style={{
                    backgroundColor: 'var(--meras-green)',
                    border: 'none',
                    borderRadius: '10px',
                    fontSize: '16px'
                  }}
                >
                  {loading ? 'Creating account...' : 'Create account'}
                </button>

         
                {/* Google */}
                {/* <button
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
                </button> */ }

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
                 
                </div>
              </div>

        

              {/* Verification steps */}
              <div className="mt-4 text-start" style={{ maxWidth: '300px', margin: '1.5rem auto 0' }}>
                {[
                  { step: '1', text: 'Sign up with university email' },
                  { step: '2', text: 'Upload your university ID' },
                  { step: '3', text: 'Wait for admin approval (24-48h)' },
                  { step: '4', text: 'Start mentoring and earning!' }
                ].map((item) => (
                  <div key={item.step} className="d-flex align-items-center gap-3 mb-2">
                    <div
                      className="d-flex align-items-center justify-content-center flex-shrink-0 text-white fw-bold"
                      style={{
                        width: '26px', height: '26px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--meras-green)',
                        fontSize: '12px'
                      }}
                    >
                      {item.step}
                    </div>
                    <span style={{ color: 'var(--meras-text)', fontSize: '13px' }}>
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default SignUpGuide