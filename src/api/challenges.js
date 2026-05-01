const BASE = '/api/challenges'

const parseJSON = async (res) => {
  try {
    return await res.json()
  } catch {
    throw new Error('Could not reach the server. Make sure the backend is running.')
  }
}

// GET /api/challenges?major=...&difficulty=...
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

// GET /api/challenges/:id
export const apiGetChallengeById = async (id) => {
  const res = await fetch(`${BASE}/${id}`)
  const data = await parseJSON(res)
  if (!res.ok) throw new Error(data.message || 'Challenge not found')
  return data // { challenge }
}
