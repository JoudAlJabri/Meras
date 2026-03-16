import { Link } from 'react-router-dom'
import ChallengeCard from '../../components/ChallengeCard'

function LandingPage() {
  return (
    <div style={{ backgroundColor: 'var(--meras-bg)', minHeight: '100vh' }}>

      {/* ── NAVBAR ── */}
      <nav className="navbar navbar-expand-lg" style={{ backgroundColor: 'white', borderBottom: '1px solid var(--meras-border)' }}>
        <div className="container">
          {/* Logo */}
          <span className="navbar-brand fw-semibold fs-4" style={{ color: 'var(--meras-green)' }}>
            Meras
          </span>

          {/* Mobile toggle */}
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Nav links */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto align-items-center gap-2">
              <li className="nav-item">
                <Link to="/login" className="btn btn-outline-secondary btn-sm px-4">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/signup/explorer" className="btn btn-sm px-4 text-white" style={{ backgroundColor: 'var(--meras-green)' }}>
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* ── HERO SECTION ── */}
      <section className="py-5">
        <div className="container py-5">
          <div className="row align-items-center">

            {/* Left side text */}
            <div className="col-lg-6 mb-5 mb-lg-0">
              <span className="badge px-3 py-2 mb-3 fw-semibold" style={{ backgroundColor: '#e8f5ef', color: 'var(--meras-green)', fontSize: '14px' }}>
                🎓 For High School Students
              </span>
              <h1 className="fw-semibold mb-4" style={{ fontSize: '3rem', lineHeight: '1.2', color: 'var(--meras-text)' }}>
                Experience Your{' '}
                <span style={{ color: 'var(--meras-green)' }}>Major</span>{' '}
                Before You Choose It
              </h1>
              <p className="mb-4 fs-5" style={{ color: 'var(--meras-gray)', lineHeight: '1.7' }}>
                Try real university tasks, get feedback from actual collage students,
                and make a confident decision about your future — before committing four years of your life.
              </p>
              <div className="d-flex flex-row gap-3">
                <Link
                  to="/signup/explorer"
                  className="btn px-4 text-black fw-semibold"
                  style={{ backgroundColor: 'var(--meras-green)', border: 'none' }}
                >
                  Start Exploring Free
                </Link>
                <Link
                  to="/signup/guide"
                  className="btn px-4 fw-semibold btn-yellow"
                >
                  Become a Guide
                </Link>
              </div>

              {/* Stats row */}
              <div className="d-flex gap-4 mt-5 flex-wrap">
                <div>
                  <div className="fw-bold fs-4" style={{ color: 'var(--meras-text)' }}>500+</div>
                  <div style={{ color: 'var(--meras-gray)', fontSize: '14px' }}>Micro-Challenges</div>
                </div>
                <div style={{ borderLeft: '1px solid var(--meras-border)', paddingLeft: '1.5rem' }}>
                  <div className="fw-bold fs-4" style={{ color: 'var(--meras-text)' }}>200+</div>
                  <div style={{ color: 'var(--meras-gray)', fontSize: '14px' }}>Verified Guides</div>
                </div>
                <div style={{ borderLeft: '1px solid var(--meras-border)', paddingLeft: '1.5rem' }}>
                  <div className="fw-bold fs-4" style={{ color: 'var(--meras-text)' }}>20+</div>
                  <div style={{ color: 'var(--meras-gray)', fontSize: '14px' }}>Majors Available</div>
                </div>
              </div>
            </div>

            {/* Right side card preview */}
            <div className="col-lg-6 d-flex justify-content-center align-items-center">
              <div style={{ transform: 'rotate(-3deg)', scale: '1.1', filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.15))' }}>
                <ChallengeCard
                  challengeName="Build a Simple Calculator"
                  description="Write a program that handles basic arithmetic operations. No experience needed!"
                  major="Computer Science"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-5" style={{ backgroundColor: 'white' }}>
        <div className="container py-4">
          <div className="text-center mb-5">
            <h2 className="fw-bold" style={{ color: 'var(--meras-text)' }}>How Meras Works</h2>
            <p style={{ color: 'var(--meras-gray)' }}>Three simple steps to find your perfect major</p>
          </div>
          <div className="row g-4">

            {/* Step 1 */}
            <div className="col-md-4">
              <div className="text-center p-4">
                <div className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4 fw-bold fs-4 text-white"
                  style={{ width: '70px', height: '70px', backgroundColor: 'var(--meras-green)' }}>
                  1
                </div>
                <h5 className="fw-bold mb-3" style={{ color: 'var(--meras-text)' }}>Take the Compass Quiz</h5>
                <p style={{ color: 'var(--meras-gray)' }}>
                  Answer a few questions about your interests and strengths.
                  Get personalized major recommendations instantly.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="col-md-4">
              <div className="text-center p-4">
                <div className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4 fw-bold fs-4 text-white"
                  style={{ width: '70px', height: '70px', backgroundColor: 'var(--meras-green)' }}>
                  2
                </div>
                <h5 className="fw-bold mb-3" style={{ color: 'var(--meras-text)' }}>Try Real Tasks</h5>
                <p style={{ color: 'var(--meras-gray)' }}>
                  Complete short micro-challenges that mirror actual first-year
                  university work in your recommended majors.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="col-md-4">
              <div className="text-center p-4">
                <div className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4 fw-bold fs-4 text-white"
                  style={{ width: '70px', height: '70px', backgroundColor: 'var(--meras-green)' }}>
                  3
                </div>
                <h5 className="fw-bold mb-3" style={{ color: 'var(--meras-text)' }}>Get Mentor Feedback</h5>
                <p style={{ color: 'var(--meras-gray)' }}>
                  Book a 1-on-1 session with a verified university student
                  and get real honest feedback on your work.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── CTA SECTION ── */}
      <section className="py-5">
        <div className="container py-4">
          <div className="rounded-4 p-5 text-center text-white"
            style={{ backgroundColor: 'var(--meras-green)' }}>
            <h2 className="fw-bold mb-3">Ready to Find Your Major?</h2>
            <p className="mb-4 fs-5" style={{ opacity: 0.9 }}>
              Join thousands of students who chose their major with confidence
            </p>
            <Link
              to="/signup/explorer"
              className="btn btn-lg px-5 fw-semibold"
              style={{ backgroundColor: 'white', color: 'var(--meras-green)' }}
            >
              Get Started Free →
            </Link>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-4" style={{ backgroundColor: 'white', borderTop: '1px solid var(--meras-border)' }}>
        <div className="container text-center">
          <span className="fw-bold" style={{ color: 'var(--meras-green)' }}>Meras</span>
          <span className="ms-2" style={{ color: 'var(--meras-gray)', fontSize: '14px' }}>
            © 2025 · Experience the Major
          </span>
        </div>
      </footer>

    </div>
  )
}

export default LandingPage