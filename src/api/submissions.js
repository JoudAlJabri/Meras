const BASE = '/api/submissions'

const parseJSON = async (res) => {
  try {
    return await res.json()
  } catch {
    throw new Error('Could not reach the server. Make sure the backend is running.')
  }
}

const authHeaders = (token) => ({
  Authorization: `Bearer ${token}`,
  'Content-Type': 'application/json',
})

// GET /api/submissions/guide/:guideId — guide's grading queue
export const apiGetSubmissionsByGuide = async (token, guideId) => {
  const res = await fetch(`${BASE}/guide/${guideId}`, {
    headers: authHeaders(token),
  })
  const data = await parseJSON(res)
  if (!res.ok) throw new Error(data.message || 'Failed to load submissions')
  return data // { submissions }
}

// PATCH /api/submissions/:id/grade — guide grades a submission
export const apiGradeSubmission = async (token, submissionId, { stars, feedback }) => {
  const res = await fetch(`${BASE}/${submissionId}/grade`, {
    method: 'PATCH',
    headers: authHeaders(token),
    body: JSON.stringify({ stars, feedback }),
  })
  const data = await parseJSON(res)
  if (!res.ok) throw new Error(data.message || 'Failed to grade submission')
  return data // { submission }
}

// GET /api/submissions/explorer/:explorerId — explorer's submissions
export const apiGetSubmissionsByExplorer = async (token, explorerId) => {
  const res = await fetch(`${BASE}/explorer/${explorerId}`, {
    headers: authHeaders(token),
  })
  const data = await parseJSON(res)
  if (!res.ok) throw new Error(data.message || 'Failed to load submissions')
  return data // { submissions }
}

// GET /api/submissions/:id — single submission
export const apiGetSubmissionById = async (token, submissionId) => {
  const res = await fetch(`${BASE}/${submissionId}`, {
    headers: authHeaders(token),
  })
  const data = await parseJSON(res)
  if (!res.ok) throw new Error(data.message || 'Failed to load submission')
  return data // { submission }
}

// POST /api/submissions — explorer submits text answer
export const apiCreateTextSubmission = async (token, { challengeId, textAnswer }) => {
  const res = await fetch(`${BASE}`, {
    method: 'POST',
    headers: authHeaders(token),
    body: JSON.stringify({ challengeId, submissionType: 'text', textAnswer }),
  })
  const data = await parseJSON(res)
  if (!res.ok) throw new Error(data.message || 'Failed to submit')
  return data // { submission }
}

// POST /api/submissions — explorer submits file (uses FormData)
export const apiCreateFileSubmission = async (token, { challengeId, file }) => {
  const formData = new FormData()
  formData.append('challengeId', challengeId)
  formData.append('submissionType', 'file')
  formData.append('file', file)

  const res = await fetch(`${BASE}`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` }, // no Content-Type — browser sets it with boundary
    body: formData,
  })
  const data = await parseJSON(res)
  if (!res.ok) throw new Error(data.message || 'Failed to submit')
  return data // { submission }
}

// POST /api/submissions — explorer submits canvas drawing
export const apiCreateCanvasSubmission = async (token, { challengeId, canvasBase64 }) => {
  const res = await fetch(`${BASE}`, {
    method: 'POST',
    headers: authHeaders(token),
    body: JSON.stringify({ challengeId, submissionType: 'canvas', canvasBase64 }),
  })
  const data = await parseJSON(res)
  if (!res.ok) throw new Error(data.message || 'Failed to submit')
  return data // { submission }
}