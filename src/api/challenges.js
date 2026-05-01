const BASE = '/api/challenges'

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

// GET /api/challenges?major=...&difficulty=...  — public
export const apiGetChallenges = async ({ major, difficulty } = {}) => {
  const params = new URLSearchParams()
  if (major && major !== 'All') params.append('major', major)
  if (difficulty)               params.append('difficulty', difficulty)
  const query = params.toString() ? `?${params.toString()}` : ''

  const res = await fetch(`${BASE}${query}`)
  const data = await parseJSON(res)
  if (!res.ok) throw new Error(data.message || 'Failed to load challenges')
  return data // { challenges }
}

// GET /api/challenges/:id  — public
export const apiGetChallengeById = async (id) => {
  const res = await fetch(`${BASE}/${id}`)
  const data = await parseJSON(res)
  if (!res.ok) throw new Error(data.message || 'Challenge not found')
  return data // { challenge }
}

// GET /api/challenges/guide/:guideId  — guide only
export const apiGetChallengesByGuide = async (guideId) => {
  const res = await fetch(`${BASE}/guide/${guideId}`, { headers: getAuthHeaders() })
  const data = await parseJSON(res)
  if (!res.ok) throw new Error(data.message || 'Failed to fetch guide challenges')
  return data // { challenges }
}

// POST /api/challenges  — guide only
export const apiCreateChallenge = async (challengeData) => {
  const res = await fetch(BASE, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(challengeData),
  })
  const data = await parseJSON(res)
  if (!res.ok) throw new Error(data.message || 'Failed to create challenge')
  return data // { challenge }
}

// PUT /api/challenges/:id  — guide only
export const apiUpdateChallenge = async (id, updates) => {
  const res = await fetch(`${BASE}/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(updates),
  })
  const data = await parseJSON(res)
  if (!res.ok) throw new Error(data.message || 'Failed to update challenge')
  return data // { challenge }
}

// DELETE /api/challenges/:id  — guide or admin
export const apiDeleteChallenge = async (id) => {
  const res = await fetch(`${BASE}/${id}`, { method: 'DELETE', headers: getAuthHeaders() })
  const data = await parseJSON(res)
  if (!res.ok) throw new Error(data.message || 'Failed to delete challenge')
  return data
}

// POST /api/challenges/:id/complete  — explorer only
export const apiCompleteChallenge = async (id) => {
  const res = await fetch(`${BASE}/${id}/complete`, { method: 'POST', headers: getAuthHeaders() })
  const data = await parseJSON(res)
  if (!res.ok) throw new Error(data.message || 'Failed to mark complete')
  return data
}

// POST /api/challenges/:id/save  — explorer only
export const apiSaveChallenge = async (id) => {
  const res = await fetch(`${BASE}/${id}/save`, { method: 'POST', headers: getAuthHeaders() })
  const data = await parseJSON(res)
  if (!res.ok) throw new Error(data.message || 'Failed to save challenge')
  return data
}

// DELETE /api/challenges/:id/save  — explorer only
export const apiUnsaveChallenge = async (id) => {
  const res = await fetch(`${BASE}/${id}/save`, { method: 'DELETE', headers: getAuthHeaders() })
  const data = await parseJSON(res)
  if (!res.ok) throw new Error(data.message || 'Failed to unsave challenge')
  return data
}
