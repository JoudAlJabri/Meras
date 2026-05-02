const parseJSON = async (res) => {
  try {
    return await res.json()
  } catch {
    throw new Error('Could not reach the server. Make sure the backend is running.')
  }
}

const getAuthHeaders = () => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${localStorage.getItem('meras_token')}`,
})

// SESSIONS 
// ─── SESSIONS ────────────────────────────────────────────────────────────────

// POST /api/sessions — explorer books a session with a guide
export const apiBookSession = async ({ mentorEmail, slot, topic }) => {
  const res = await fetch('/api/sessions', {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ mentorEmail, slot, topic }),
  })
  const data = await parseJSON(res)
  if (!res.ok) throw new Error(data.message || 'Failed to book session')
  return data // { booking }
}

// GET /api/sessions/mine — explorer views their booked sessions (with guideName)
export const apiGetExplorerSessions = async () => {
  const res = await fetch('/api/sessions/mine', { headers: getAuthHeaders() })
  const data = await parseJSON(res)
  if (!res.ok) throw new Error(data.message || 'Failed to load sessions')
  return data // { sessions }
}

// PATCH /api/sessions/:id/cancel — explorer cancels their session
export const apiCancelSession = async (sessionId) => {
  const res = await fetch(`/api/sessions/${sessionId}/cancel`, {
    method: 'PATCH',
    headers: getAuthHeaders(),
  })
  const data = await parseJSON(res)
  if (!res.ok) throw new Error(data.message || 'Failed to cancel session')
  return data // { session }
}

// GET /api/sessions/mine — guide views their booked sessions
export const apiGetGuideSessions = async () => {
  const res = await fetch('/api/sessions/mine', { headers: getAuthHeaders() })
  const data = await parseJSON(res)
  if (!res.ok) throw new Error(data.message || 'Failed to load sessions')
  return data // { sessions }
}

// PATCH /api/sessions/:id/status — guide confirms/cancels/completes a session
export const apiUpdateSessionStatus = async (sessionId, status) => {
  const res = await fetch(`/api/sessions/${sessionId}/status`, {
    method: 'PATCH',
    headers: getAuthHeaders(),
    body: JSON.stringify({ status }),
  })
  const data = await parseJSON(res)
  if (!res.ok) throw new Error(data.message || 'Failed to update session status')
  return data // { session }
}

// AVAILABILITY 

// PUT /api/users/:id/availability — guide saves their availability
export const apiUpdateAvailability = async (guideId, availability) => {
  const res = await fetch(`/api/users/${guideId}/availability`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify({ availability }),
  })
  const data = await parseJSON(res)
  if (!res.ok) throw new Error(data.message || 'Failed to update availability')
  return data // { user }
}

// GET /api/users/:id/availability — public, fetch a guide's available slots
export const apiGetAvailability = async (guideId) => {
  const res = await fetch(`/api/users/${guideId}/availability`)
  const data = await parseJSON(res)
  if (!res.ok) throw new Error(data.message || 'Failed to load availability')
  return data // { availability }
}

// SUBMISSIONS 
// ─── SUBMISSIONS ──────────────────────────────────────────────────────────────

// GET /api/submissions/guide/:guideId — guide views their grading queue
export const apiGetGuideSubmissions = async (guideId) => {
  const res = await fetch(`/api/submissions/guide/${guideId}`, { headers: getAuthHeaders() })
  const data = await parseJSON(res)
  if (!res.ok) throw new Error(data.message || 'Failed to load submissions')
  return data // { submissions }
}

// PATCH /api/submissions/:id/grade — guide grades a submission
export const apiGradeSubmission = async (submissionId, { stars, feedback }) => {
  const res = await fetch(`/api/submissions/${submissionId}/grade`, {
    method: 'PATCH',
    headers: getAuthHeaders(),
    body: JSON.stringify({ stars, feedback }),
  })
  const data = await parseJSON(res)
  if (!res.ok) throw new Error(data.message || 'Failed to grade submission')
  return data // { submission }
}


// ─── REVIEWS ──────────────────────────────────────────────────────────────────

// POST /api/reviews — explorer submits a review for a mentor
export const apiCreateReview = async ({ mentorId, bookingId, stars, text }) => {
  const res = await fetch('/api/reviews', {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ mentorId, bookingId, stars, text }),
  })
  const data = await parseJSON(res)
  if (!res.ok) throw new Error(data.message || 'Failed to submit review')
  return data // { review }
}

// GET /api/reviews/mentor/:mentorId — public, fetch all reviews for a mentor
export const apiGetReviewsByMentor = async (mentorId) => {
  const res = await fetch(`/api/reviews/mentor/${mentorId}`)
  const data = await parseJSON(res)
  if (!res.ok) throw new Error(data.message || 'Failed to load reviews')
  return data // [ ...reviews ]
}


// ─── MENTOR DIRECTORY ─────────────────────────────────────────────────────────

// GET /api/users/mentors?major=&university= — public, all approved guides
export const apiGetMentors = async ({ major, university } = {}) => {
  const params = new URLSearchParams()
  if (major)      params.append('major', major)
  if (university) params.append('university', university)
  const query = params.toString() ? `?${params.toString()}` : ''

  const res = await fetch(`/api/users/mentors${query}`)
  const data = await parseJSON(res)
  if (!res.ok) throw new Error(data.message || 'Failed to load mentors')
  return data // { mentors }
}

// GET /api/users/mentors/:id — public, single mentor profile + their challenges
export const apiGetMentorById = async (mentorId) => {
  const res = await fetch(`/api/users/mentors/${mentorId}`)
  const data = await parseJSON(res)
  if (!res.ok) throw new Error(data.message || 'Mentor not found')
  return data // { mentor, challenges }
}
