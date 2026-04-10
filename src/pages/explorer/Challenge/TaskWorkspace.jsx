import { useState, useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ReactSketchCanvas } from 'react-sketch-canvas'
import { mockChallenges } from '../../../data/mockData'


// available submission modes
const MODES = {
  FILE: 'file',
  TEXT: 'text',
  CANVAS: 'canvas'
}

function TaskWorkspace() {
  const navigate = useNavigate()
  const { index } = useParams()
  const challenge = mockChallenges[parseInt(index)] ?? null
  const canvasRef = useRef(null)

  // STATES

  // timer states
  const [timeLeft, setTimeLeft] = useState((challenge?.timeEstimate ?? 0) * 60)
  const [timerRunning, setTimerRunning] = useState(true)
  const [timerWarning, setTimerWarning] = useState(false)

  // submission mode state 
  const [mode, setMode] = useState(MODES.FILE)

  // file upload
  const [uploadedFile, setUploadedFile] = useState(null)
  const [dragOver, setDragOver] = useState(false)

  // text answer
  const [textAnswer, setTextAnswer] = useState('')
  const [saveStatus, setSaveStatus] = useState('') // '' | 'saving' | 'saved'
  const saveTimerRef = useRef(null)

  // ── checklist
  const [checkedSteps, setCheckedSteps] = useState(
    new Array(challenge?.whatYouWillDo?.length ?? 0).fill(false)
  )

  // ── Canvas toolbar
  const [penColor, setPenColor] = useState('#000000')
  const [penSize, setPenSize] = useState(4)
  const [isEraser, setIsEraser] = useState(false)

  // ── Focus mode (hides instructions)
  const [focusMode, setFocusMode] = useState(false)

  // ── Notes panel
  const [notesOpen, setNotesOpen] = useState(false)
  const [notes, setNotes] = useState(
    localStorage.getItem('workspace_notes') || ''
  )

  // ── Submit loading
  const [submitting, setSubmitting] = useState(false)

  // Detect mobile viewport so we can stack panels vertically instead of
  // side-by-side. On narrow screens the 380px left panel + right panel
  // would overflow and be unusable.
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // timer logic
   useEffect(() => {
    if (!timerRunning || timeLeft <= 0) return
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval)
          setTimerRunning(false)
          return 0
        }
        // Warn when under 5 minutes
        if (prev <= 300) setTimerWarning(true)
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [timerRunning])

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0')
    const s = (seconds % 60).toString().padStart(2, '0')
    return `${m}:${s}`
  }


  const handleTextChange = (e) => {
    setTextAnswer(e.target.value)
    setSaveStatus('saving')
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current)
    saveTimerRef.current = setTimeout(() => {
      localStorage.setItem('workspace_draft', e.target.value)
      setSaveStatus('saved')
    }, 2000)
  }

  // Load saved draft on mount
  useEffect(() => {
    const draft = localStorage.getItem('workspace_draft')
    if (draft) setTextAnswer(draft)
  }, [])


  // notes auto save
  const handleNotesChange = (e) => {
    setNotes(e.target.value)
    localStorage.setItem('workspace_notes', e.target.value)
  }

  // checklist logic 
  const toggleStep = (index) => {
    const updated = [...checkedSteps]
    updated[index] = !updated[index]
    setCheckedSteps(updated)
  }

  const completedCount = checkedSteps.filter(Boolean).length
  const progressPercent = Math.round(
    (completedCount / checkedSteps.length) * 100
  )

  // file uploading

   const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) setUploadedFile(file)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files[0]
    if (file) setUploadedFile(file)
  }


  // CANVAS tools
  
  const handleUndo = () => canvasRef.current?.undo()
  const handleClear = () => canvasRef.current?.clearCanvas()
  const handleDownloadCanvas = async () => {
    const data = await canvasRef.current?.exportImage('png')
    const link = document.createElement('a')
    link.href = data
    link.download = 'my-solution.png'
    link.click()
  }

  // submit
  const handleSubmit = () => {
    // Basic validation
    if (mode === MODES.FILE && !uploadedFile) {
      alert('Please upload a file first')
      return
    }
    if (mode === MODES.TEXT && !textAnswer.trim()) {
      alert('Please write your answer first')
      return
    }

    setSubmitting(true)
    // Simulate API call. <------------- here edit later
    setTimeout(() => {
      setSubmitting(false)
      navigate(`/explorer/submission-confirmation/${index}`)
    }, 1500)
  }

  // canvas colors ( change then if needed )
  const colors = [ 
    '#000000', '#ffffff', '#E8622A',
    '#3DB87A', '#3B82F6', '#8B5CF6',
    '#F59E0B', '#EF4444'
  ]



  if (!challenge) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: 'var(--meras-bg)', color: 'white' }}>
        <div className="text-center">
          <h3>Challenge not found</h3>
          <button className="btn btn-outline-light mt-3" onClick={() => navigate('/explorer/challenges')}>Back to Catalog</button>
        </div>
      </div>
    )
  }

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

      {/* Top */}
      <div
        style={{
          backgroundColor: 'var(--meras-text)',
          padding: '0 1.5rem',
          height: '52px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexShrink: 0,
          zIndex: 100
        }}
      >
        {/* Left — title */}
        <div className="d-flex align-items-center gap-3">
          <span
            className="fw-bold"
            style={{ color: 'var(--meras-green)', fontSize: '16px' }}
          >
            Meras
          </span>
          <span style={{ color: 'rgba(255,255,255,0.3)' }}>›</span>
          <span
            style={{
              color: 'rgba(255,255,255,0.8)',
              fontSize: '14px',
              maxWidth: '200px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}
          >
            {challenge.title}
          </span>
        </div>

        {/* Center — Timer */}
        <div
          className="d-flex align-items-center gap-2 px-3 py-1"
          style={{
            backgroundColor: timerWarning
              ? 'rgba(239,68,68,0.2)'
              : 'rgba(255,255,255,0.08)',
            borderRadius: '20px',
            border: timerWarning
              ? '1px solid rgba(239,68,68,0.5)'
              : '1px solid rgba(255,255,255,0.1)',
            animation: timerWarning && timerRunning
              ? 'pulse 1.5s infinite'
              : 'none'
          }}
        >
          <span style={{ fontSize: '14px' }}>⏱</span>
          <span
            className="fw-bold"
            style={{
              color: timerWarning ? '#EF4444' : 'white',
              fontSize: '15px',
              fontFamily: 'monospace',
              letterSpacing: '1px'
            }}
          >
            {formatTime(timeLeft)}
          </span>
          <button
            onClick={() => setTimerRunning(!timerRunning)}
            style={{
              background: 'none',
              border: 'none',
              color: 'rgba(255,255,255,0.6)',
              cursor: 'pointer',
              fontSize: '12px',
              padding: '0 4px'
            }}
          >
            {timerRunning ? '⏸' : '▶'}
          </button>
        </div>

        {/* Right — actions. flexWrap so buttons move to a second line on
            very narrow screens instead of overflowing off-screen. */}
        <div className="d-flex align-items-center gap-2" style={{ flexWrap: 'wrap', justifyContent: 'flex-end' }}>

          {/* Notes toggle */}
          <button
            onClick={() => setNotesOpen(!notesOpen)}
            style={{
              background: notesOpen
                ? 'rgba(61,184,122,0.2)'
                : 'rgba(255,255,255,0.08)',
              border: notesOpen
                ? '1px solid var(--meras-green)'
                : '1px solid rgba(255,255,255,0.1)',
              borderRadius: '8px',
              color: notesOpen ? 'var(--meras-green)' : 'rgba(255,255,255,0.7)',
              padding: '4px 12px',
              cursor: 'pointer',
              fontSize: '13px'
            }}
          >
            📝 Notes
          </button>

          {/* Focus mode */}
          <button
            onClick={() => setFocusMode(!focusMode)}
            style={{
              background: focusMode
                ? 'rgba(61,184,122,0.2)'
                : 'rgba(255,255,255,0.08)',
              border: focusMode
                ? '1px solid var(--meras-green)'
                : '1px solid rgba(255,255,255,0.1)',
              borderRadius: '8px',
              color: focusMode
                ? 'var(--meras-green)'
                : 'rgba(255,255,255,0.7)',
              padding: '4px 12px',
              cursor: 'pointer',
              fontSize: '13px'
            }}
          >
            {focusMode ? '👁 Exit Focus' : '🎯 Focus Mode'}
          </button>

          {/* Exit */}
          <button
            onClick={() => navigate(-1)}
            style={{
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '8px',
              color: 'rgba(255,255,255,0.7)',
              padding: '4px 12px',
              cursor: 'pointer',
              fontSize: '13px'
            }}
          >
            ✕ Exit
          </button>
        </div>
      </div>

     

      {/* MAIN WORKSPACE AREA
          On desktop: left instructions panel + right submission panel sit side-by-side.
          On mobile: they stack vertically — instructions on top (scrollable, capped
          height), submission area below. */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          overflow: isMobile ? 'auto' : 'hidden',
          position: 'relative'
        }}
      >

        {/* ── LEFT PANEL — Instructions ── */}
        {/* On desktop: fixed 380px wide column on the left.
            On mobile: full-width block on top, capped at 260px tall with
            its own scroll — so the submission area is still reachable. */}
        {!focusMode && (
          <div
            style={{
              width: isMobile ? '100%' : '380px',
              maxHeight: isMobile ? '260px' : 'none',
              flexShrink: 0,
              backgroundColor: '#f8f9fa',
              borderRight: isMobile ? 'none' : '1px solid var(--meras-border)',
              borderBottom: isMobile ? '1px solid var(--meras-border)' : 'none',
              overflowY: 'auto',
              padding: '1.5rem',
              animation: 'slideInLeft 0.3s ease'
            }}
          >

            {/* Challenge title */}
            <div className="mb-4">
              <span
                className="badge px-3 py-1 mb-2"
                style={{
                  backgroundColor: '#e8f5ef',
                  color: 'var(--meras-green)',
                  borderRadius: '20px',
                  fontSize: '12px'
                }}
              >
                {challenge.major}
              </span>
              <h5
                className="fw-bold"
                style={{ color: 'var(--meras-text)', marginBottom: '0.5rem' }}
              >
                {challenge.title}
              </h5>
              <p style={{ color: 'var(--meras-gray)', fontSize: '13px', margin: 0 }}>
                by {challenge.mentorName}
              </p>
            </div>

            {/* Progress bar */}
            <div className="mb-4">
              <div
                className="d-flex justify-content-between mb-1"
                style={{ fontSize: '13px' }}
              >
                <span style={{ color: 'var(--meras-text)', fontWeight: '600' }}>
                  My Progress
                </span>
                <span style={{ color: 'var(--meras-green)', fontWeight: '600' }}>
                  {progressPercent}%
                </span>
              </div>
              <div
                style={{
                  height: '6px',
                  backgroundColor: '#e5e7eb',
                  borderRadius: '10px',
                  overflow: 'hidden'
                }}
              >
                <div
                  style={{
                    height: '100%',
                    width: `${progressPercent}%`,
                    backgroundColor: 'var(--meras-green)',
                    borderRadius: '10px',
                    transition: 'width 0.4s ease'
                  }}
                />
              </div>
            </div>

            {/* Instructions */}
            <div className="mb-4">
              <h6
                className="fw-semibold mb-2"
                style={{ color: 'var(--meras-text)', fontSize: '13px' }}
              >
                📋 INSTRUCTIONS
              </h6>
              <div
                style={{
                  backgroundColor: 'white',
                  borderRadius: '10px',
                  padding: '1rem',
                  fontSize: '13px',
                  lineHeight: '1.7',
                  color: 'var(--meras-text)',
                  border: '1px solid var(--meras-border)',
                  whiteSpace: 'pre-line',
                  maxHeight: '200px',
                  overflowY: 'auto'
                }}
              >
                {challenge.instructions}
              </div>
            </div>

            {/* Step checklist */}
            <div className="mb-4">
              <h6
                className="fw-semibold mb-2"
                style={{ color: 'var(--meras-text)', fontSize: '13px' }}
              >
                ✅ STEPS TO COMPLETE
              </h6>
              <div className="d-flex flex-column gap-2">
                {challenge.whatYouWillDo.map((step, index) => (
                  <div
                    key={index}
                    onClick={() => toggleStep(index)}
                    className="d-flex align-items-start gap-2 p-2"
                    style={{
                      backgroundColor: checkedSteps[index]
                        ? '#e8f5ef'
                        : 'white',
                      borderRadius: '8px',
                      border: checkedSteps[index]
                        ? '1px solid #b7dfcc'
                        : '1px solid var(--meras-border)',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {/* Checkbox */}
                    <div
                      style={{
                        width: '18px',
                        height: '18px',
                        borderRadius: '4px',
                        border: checkedSteps[index]
                          ? 'none'
                          : '2px solid var(--meras-border)',
                        backgroundColor: checkedSteps[index]
                          ? 'var(--meras-green)'
                          : 'white',
                        flexShrink: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: '2px',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      {checkedSteps[index] && (
                        <span style={{ color: 'white', fontSize: '11px' }}>✓</span>
                      )}
                    </div>
                    <span
                      style={{
                        fontSize: '13px',
                        color: checkedSteps[index]
                          ? 'var(--meras-gray)'
                          : 'var(--meras-text)',
                        textDecoration: checkedSteps[index]
                          ? 'line-through'
                          : 'none',
                        transition: 'all 0.2s ease',
                        lineHeight: '1.5'
                      }}
                    >
                      {step}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* What you'll need */}
            <div className="mb-4">
              <h6
                className="fw-semibold mb-2"
                style={{ color: 'var(--meras-text)', fontSize: '13px' }}
              >
                🛠️ WHAT YOU'LL NEED
              </h6>
              <div className="d-flex flex-column gap-1">
                {challenge.whatYouWillNeed.map((item, index) => (
                  <div
                    key={index}
                    className="d-flex align-items-start gap-2"
                  >
                    <span
                      style={{
                        color: 'var(--meras-green)',
                        fontSize: '12px',
                        marginTop: '3px'
                      }}
                    >
                      →
                    </span>
                    <span
                      style={{
                        fontSize: '13px',
                        color: 'var(--meras-text)',
                        lineHeight: '1.5'
                      }}
                    >
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Reference links */}
            {challenge.referenceLinks?.length > 0 && (
              <div className="mb-4">
                <h6
                  className="fw-semibold mb-2"
                  style={{ color: 'var(--meras-text)', fontSize: '13px' }}
                >
                  🔗 RESOURCES
                </h6>
                {challenge.referenceLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="d-flex align-items-center gap-2 p-2 mb-1"
                    style={{
                      backgroundColor: 'white',
                      borderRadius: '8px',
                      border: '1px solid var(--meras-border)',
                      textDecoration: 'none',
                      color: 'var(--meras-green)',
                      fontSize: '13px'
                    }}
                  >
                    🔗 {link.title}
                  </a>
                ))}
              </div>
            )}

          </div>
        )}

        {/* ── RIGHT PANEL — Submission Area ── */}
        {/* On mobile this panel follows the instructions panel in the column flow.
            overflow: 'auto' (not 'hidden') lets it scroll on mobile. */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            overflow: isMobile ? 'auto' : 'hidden',
            animation: 'fadeIn 0.5s ease'
          }}
        >

          {/* Mode selector tabs */}
          <div
            style={{
              backgroundColor: 'white',
              borderBottom: '1px solid var(--meras-border)',
              padding: '0.75rem 1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              flexShrink: 0
            }}
          >
            <span
              style={{
                fontSize: '13px',
                color: 'var(--meras-gray)',
                marginRight: '0.5rem'
              }}
            >
              Submit as:
            </span>

            {[
              { key: MODES.FILE, icon: '📁', label: 'File Upload' },
              { key: MODES.TEXT, icon: '✍️', label: 'Text Answer' },
              { key: MODES.CANVAS, icon: '🎨', label: 'Canvas Drawing' }
            ].map((m) => (
              <button
                key={m.key}
                onClick={() => setMode(m.key)}
                style={{
                  padding: '6px 16px',
                  borderRadius: '20px',
                  border: mode === m.key
                    ? '1.5px solid var(--meras-green)'
                    : '1.5px solid var(--meras-border)',
                  backgroundColor: mode === m.key ? '#e8f5ef' : 'white',
                  color: mode === m.key
                    ? 'var(--meras-green)'
                    : 'var(--meras-gray)',
                  fontWeight: mode === m.key ? '600' : '400',
                  fontSize: '13px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                {m.icon} {m.label}
              </button>
            ))}
          </div>

          {/* ── FILE UPLOAD MODE ── */}
          {mode === MODES.FILE && (
            <div
              style={{
                flex: 1,
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                animation: 'fadeIn 0.3s ease'
              }}
            >
              {!uploadedFile ? (
                // Drop zone
                <div
                  onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={handleDrop}
                  onClick={() => document.getElementById('workspaceFile').click()}
                  style={{
                    width: '100%',
                    maxWidth: '480px',
                    border: dragOver
                      ? '2px dashed var(--meras-green)'
                      : '2px dashed var(--meras-border)',
                    borderRadius: '16px',
                    padding: '3rem 2rem',
                    textAlign: 'center',
                    cursor: 'pointer',
                    backgroundColor: dragOver ? '#e8f5ef' : 'white',
                    transition: 'all 0.2s ease',
                    transform: dragOver ? 'scale(1.02)' : 'scale(1)'
                  }}
                >
                  <div style={{ fontSize: '48px', marginBottom: '1rem' }}>
                    {dragOver ? '📂' : '📁'}
                  </div>
                  <p
                    className="fw-semibold mb-1"
                    style={{ color: 'var(--meras-text)', fontSize: '16px' }}
                  >
                    {dragOver
                      ? 'Drop your file here!'
                      : 'Drag & drop your solution here'}
                  </p>
                  <p style={{ color: 'var(--meras-gray)', fontSize: '13px', margin: 0 }}>
                    or click to browse — PDF, JPG, PNG, TXT (max 10MB)
                  </p>
                  <input
                    id="workspaceFile"
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png,.txt"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                  />
                </div>
              ) : (
                // File preview
                <div
                  style={{
                    width: '100%',
                    maxWidth: '480px',
                    backgroundColor: 'white',
                    borderRadius: '16px',
                    padding: '2rem',
                    border: '1px solid var(--meras-border)',
                    textAlign: 'center'
                  }}
                >
                  <div style={{ fontSize: '48px', marginBottom: '1rem' }}>
                    {uploadedFile.type.includes('image') ? '🖼️'
                      : uploadedFile.type.includes('pdf') ? '📄'
                      : '📝'}
                  </div>
                  <p
                    className="fw-bold mb-1"
                    style={{ color: 'var(--meras-text)', fontSize: '16px' }}
                  >
                    {uploadedFile.name}
                  </p>
                  <p style={{ color: 'var(--meras-gray)', fontSize: '13px' }}>
                    {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                  <div
                    className="d-inline-flex align-items-center gap-1 px-3 py-1 mb-3"
                    style={{
                      backgroundColor: '#e8f5ef',
                      borderRadius: '20px',
                      color: 'var(--meras-green)',
                      fontSize: '13px'
                    }}
                  >
                    ✓ Ready to submit
                  </div>
                  <br />
                  <button
                    onClick={() => setUploadedFile(null)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--meras-gray)',
                      fontSize: '13px',
                      cursor: 'pointer',
                      textDecoration: 'underline'
                    }}
                  >
                    Remove and upload different file
                  </button>
                </div>
              )}
            </div>
          )}

          {/* ── TEXT ANSWER MODE ── */}
          {mode === MODES.TEXT && (
            <div
              style={{
                flex: 1,
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                animation: 'fadeIn 0.3s ease'
              }}
            >
              <div
                className="d-flex justify-content-between align-items-center mb-2"
              >
                <span
                  style={{
                    fontSize: '13px',
                    color: 'var(--meras-gray)',
                    fontWeight: '500'
                  }}
                >
                  Write your answer below
                </span>
                <span style={{ fontSize: '12px', color: 'var(--meras-gray)' }}>
                  {saveStatus === 'saving' && '💾 Saving...'}
                  {saveStatus === 'saved' && '✓ Draft saved'}
                  {saveStatus === '' && `${textAnswer.length} characters`}
                </span>
              </div>
              <textarea
                value={textAnswer}
                onChange={handleTextChange}
                placeholder="Type your solution, explanation, or analysis here..."
                style={{
                  flex: 1,
                  width: '100%',
                  padding: '1.25rem',
                  borderRadius: '12px',
                  border: '1.5px solid var(--meras-border)',
                  fontSize: '15px',
                  lineHeight: '1.7',
                  color: 'var(--meras-text)',
                  resize: 'none',
                  outline: 'none',
                  fontFamily: 'Plus Jakarta Sans, sans-serif',
                  backgroundColor: 'white'
                }}
                onFocus={(e) => {
                  e.target.style.border = '1.5px solid var(--meras-green)'
                }}
                onBlur={(e) => {
                  e.target.style.border = '1.5px solid var(--meras-border)'
                }}
              />
            </div>
          )}

          {/* ── CANVAS MODE ── */}
          {mode === MODES.CANVAS && (
            <div
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                animation: 'fadeIn 0.3s ease'
              }}
            >
              {/* Canvas toolbar */}
              <div
                style={{
                  backgroundColor: 'white',
                  borderBottom: '1px solid var(--meras-border)',
                  padding: '0.5rem 1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  flexWrap: 'wrap',
                  flexShrink: 0
                }}
              >
                {/* Colors */}
                <div className="d-flex align-items-center gap-1">
                  {colors.map((color) => (
                    <div
                      key={color}
                      onClick={() => {
                        setPenColor(color)
                        setIsEraser(false)
                      }}
                      style={{
                        width: '22px',
                        height: '22px',
                        borderRadius: '50%',
                        backgroundColor: color,
                        cursor: 'pointer',
                        border: penColor === color && !isEraser
                          ? '3px solid var(--meras-green)'
                          : color === '#ffffff'
                          ? '2px solid #e5e7eb'
                          : '2px solid transparent',
                        transition: 'transform 0.1s ease',
                        transform: penColor === color && !isEraser
                          ? 'scale(1.2)'
                          : 'scale(1)'
                      }}
                    />
                  ))}
                </div>

                {/* Divider */}
                <div
                  style={{
                    width: '1px',
                    height: '24px',
                    backgroundColor: 'var(--meras-border)'
                  }}
                />

                {/* Pen size */}
                <div className="d-flex align-items-center gap-2">
                  <span
                    style={{ fontSize: '12px', color: 'var(--meras-gray)' }}
                  >
                    Size:
                  </span>
                  <input
                    type="range"
                    min="1"
                    max="20"
                    value={penSize}
                    onChange={(e) => setPenSize(Number(e.target.value))}
                    style={{ width: '80px', accentColor: 'var(--meras-green)' }}
                  />
                  <span
                    style={{ fontSize: '12px', color: 'var(--meras-text)', fontWeight: '600' }}
                  >
                    {penSize}px
                  </span>
                </div>

                {/* Divider */}
                <div
                  style={{
                    width: '1px',
                    height: '24px',
                    backgroundColor: 'var(--meras-border)'
                  }}
                />

                {/* Tools */}
                {[
                  {
                    label: '✏️ Pen',
                    active: !isEraser,
                    onClick: () => setIsEraser(false)
                  },
                  {
                    label: '🧹 Eraser',
                    active: isEraser,
                    onClick: () => setIsEraser(true)
                  }
                ].map((tool) => (
                  <button
                    key={tool.label}
                    onClick={tool.onClick}
                    style={{
                      padding: '4px 12px',
                      borderRadius: '8px',
                      border: tool.active
                        ? '1.5px solid var(--meras-green)'
                        : '1.5px solid var(--meras-border)',
                      backgroundColor: tool.active ? '#e8f5ef' : 'white',
                      color: tool.active
                        ? 'var(--meras-green)'
                        : 'var(--meras-gray)',
                      fontSize: '13px',
                      cursor: 'pointer',
                      fontWeight: tool.active ? '600' : '400'
                    }}
                  >
                    {tool.label}
                  </button>
                ))}

                {/* Actions */}
                <button
                  onClick={handleUndo}
                  style={{
                    padding: '4px 12px',
                    borderRadius: '8px',
                    border: '1.5px solid var(--meras-border)',
                    backgroundColor: 'white',
                    color: 'var(--meras-gray)',
                    fontSize: '13px',
                    cursor: 'pointer'
                  }}
                >
                  ↩ Undo
                </button>
                <button
                  onClick={handleClear}
                  style={{
                    padding: '4px 12px',
                    borderRadius: '8px',
                    border: '1.5px solid #fee2e2',
                    backgroundColor: '#fff5f5',
                    color: '#ef4444',
                    fontSize: '13px',
                    cursor: 'pointer'
                  }}
                >
                  🗑 Clear
                </button>
                <button
                  onClick={handleDownloadCanvas}
                  style={{
                    padding: '4px 12px',
                    borderRadius: '8px',
                    border: '1.5px solid var(--meras-border)',
                    backgroundColor: 'white',
                    color: 'var(--meras-gray)',
                    fontSize: '13px',
                    cursor: 'pointer'
                  }}
                >
                  ⬇ Download
                </button>
              </div>

              {/* Canvas area */}
              <div style={{ flex: 1, overflow: 'hidden' }}>
                <ReactSketchCanvas
                  ref={canvasRef}
                  strokeWidth={isEraser ? penSize * 3 : penSize}
                  strokeColor={isEraser ? '#ffffff' : penColor}
                  canvasColor="white"
                  style={{
                    width: '100%',
                    height: '100%',
                    border: 'none'
                  }}
                />
              </div>
            </div>
          )}

          {/* ── SUBMIT BAR ── */}
          <div
            style={{
              backgroundColor: 'white',
              borderTop: '1px solid var(--meras-border)',
              padding: '0.75rem 1.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexShrink: 0
            }}
          >
            <span style={{ fontSize: '13px', color: 'var(--meras-gray)' }}>
              {mode === MODES.FILE
                ? uploadedFile
                  ? `✓ ${uploadedFile.name} ready`
                  : 'No file selected yet'
                : mode === MODES.TEXT
                ? textAnswer.length > 0
                  ? `✓ ${textAnswer.length} characters written`
                  : 'Nothing written yet'
                : 'Draw your solution on the canvas above'}
            </span>
            <button
              onClick={handleSubmit}
              disabled={submitting}
              style={{
                backgroundColor: submitting
                  ? 'var(--meras-gray)'
                  : 'var(--meras-green)',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                padding: '8px 28px',
                fontWeight: '600',
                fontSize: '15px',
                cursor: submitting ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              {submitting ? (
                <>
                  <div
                    style={{
                      width: '16px',
                      height: '16px',
                      border: '2px solid rgba(255,255,255,0.3)',
                      borderTop: '2px solid white',
                      borderRadius: '50%',
                      animation: 'spin 0.8s linear infinite'
                    }}
                  />
                  Submitting...
                </>
              ) : (
                'Submit Solution →'
              )}
            </button>
          </div>

        </div>

        {/* ── NOTES PANEL (slides in from right) ── */}
        {notesOpen && (
          <div
            style={{
              width: '280px',
              flexShrink: 0,
              backgroundColor: '#fffbeb',
              borderLeft: '1px solid #fde68a',
              display: 'flex',
              flexDirection: 'column',
              animation: 'slideInRight 0.3s ease'
            }}
          >
            <div
              style={{
                padding: '1rem',
                borderBottom: '1px solid #fde68a',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <span
                className="fw-semibold"
                style={{ color: '#92400e', fontSize: '14px' }}
              >
                📝 My Notes
              </span>
              <button
                onClick={() => setNotesOpen(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#92400e',
                  cursor: 'pointer',
                  fontSize: '16px'
                }}
              >
                ✕
              </button>
            </div>
            <textarea
              value={notes}
              onChange={handleNotesChange}
              placeholder="Jot down your thoughts, rough calculations, or ideas here..."
              style={{
                flex: 1,
                border: 'none',
                backgroundColor: '#fffbeb',
                padding: '1rem',
                fontSize: '13px',
                lineHeight: '1.7',
                resize: 'none',
                outline: 'none',
                color: '#78350f',
                fontFamily: 'Plus Jakarta Sans, sans-serif'
              }}
            />
            <div
              style={{
                padding: '0.5rem 1rem',
                borderTop: '1px solid #fde68a'
              }}
            >
              <span
                style={{ fontSize: '11px', color: '#a16207' }}
              >
                ✓ Notes auto-saved locally
              </span>
            </div>
          </div>
        )}

      </div>

      {/* ── CSS ANIMATIONS ── */}
      <style>{`
        @keyframes slideInLeft {
          from { transform: translateX(-20px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideInRight {
          from { transform: translateX(20px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }
      `}</style>

    </div>
  )
}
export default TaskWorkspace