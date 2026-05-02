const BASE = '/api/submissions'

const parseJSON = async (res) => {
  try {
    return await res.json()
  } catch {
    throw new Error('Could not reach the server. Make sure the backend is running.')
  }
}

const getAuthHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem('meras_token')}`,
  'Content-Type': 'application/json',
})

// GET /api/submissions/guide/:guideId — guide's grading queue
export const apiGetSubmissionsByGuide = async (guideId) => {
  const res = await fetch(`${BASE}/guide/${guideId}`, { headers: getAuthHeaders() })
  const data = await parseJSON(res)
  if (!res.ok) throw new Error(data.message || 'Failed to load submissions')
  return data // { submissions }
}

// PATCH /api/submissions/:id/grade — guide grades a submission
export const apiGradeSubmission = async (submissionId, { stars, feedback }) => {
  const res = await fetch(`${BASE}/${submissionId}/grade`, {
    method: 'PATCH',
    headers: getAuthHeaders(),
    body: JSON.stringify({ stars, feedback }),
  })
  const data = await parseJSON(res)
  if (!res.ok) throw new Error(data.message || 'Failed to grade submission')
  return data // { submission }
}

// GET /api/submissions/explorer/:explorerId — explorer's submissions
export const apiGetSubmissionsByExplorer = async (explorerId) => {
  const res = await fetch(`${BASE}/explorer/${explorerId}`, { headers: getAuthHeaders() })
  const data = await parseJSON(res)
  if (!res.ok) throw new Error(data.message || 'Failed to load submissions')
  return data // { submissions }
}

// GET /api/submissions/:id — single submission
export const apiGetSubmissionById = async (submissionId) => {
  const res = await fetch(`${BASE}/${submissionId}`, { headers: getAuthHeaders() })
  const data = await parseJSON(res)
  if (!res.ok) throw new Error(data.message || 'Failed to load submission')
  return data // { submission }
}

// POST /api/submissions — called from TaskWorkspace, handles all 3 modes
export const apiCreateSubmission = async ({ challengeId, mode, file, textAnswer, canvasBase64 }) => {
  if (mode === 'file') {
    const formData = new FormData()
    formData.append('challengeId', challengeId)
    formData.append('submissionType', 'file')
    formData.append('file', file)
    const res = await fetch(BASE, {
      method: 'POST',
      headers: { Authorization: `Bearer ${localStorage.getItem('meras_token')}` },
      body: formData,
    })
    const data = await parseJSON(res)
    if (!res.ok) throw new Error(data.message || 'Submission failed')
    return data
  }

  if (mode === 'text') {
    const res = await fetch(BASE, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ challengeId, submissionType: 'text', textAnswer }),
    })
    const data = await parseJSON(res)
    if (!res.ok) throw new Error(data.message || 'Submission failed')
    return data
  }

  if (mode === 'canvas') {
    const res = await fetch(BASE, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ challengeId, submissionType: 'canvas', canvasBase64 }),
    })
    const data = await parseJSON(res)
    if (!res.ok) throw new Error(data.message || 'Submission failed')
    return data
  }

  throw new Error('Unknown submission mode')
}
