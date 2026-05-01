const BASE = '/api/auth'

const parseJSON = async (res) => {
  try {
    return await res.json()
  } catch {
    throw new Error('Could not reach the server. Make sure the backend is running.')
  }
}

export const apiLogin = async (email, password) => {
  const res = await fetch(`${BASE}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })
  const data = await parseJSON(res)
  if (!res.ok) throw new Error(data.message || 'Login failed')
  return data // { token, user }
}

export const apiRegisterExplorer = async ({ name, email, password, gender, grade }) => {
  const res = await fetch(`${BASE}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password, gender, grade, role: 'explorer' }),
  })
  const data = await parseJSON(res)
  if (!res.ok) throw new Error(data.message || 'Registration failed')
  return data
}

export const apiRegisterGuide = async (formData) => {
  const res = await fetch(`${BASE}/register`, {
    method: 'POST',
    body: formData,
  })
  const data = await parseJSON(res)
  if (!res.ok) throw new Error(data.message || 'Registration failed')
  return data
}

export const apiVerifyEmail = async (token) => {
  const res = await fetch(`${BASE}/verify-email/${token}`)
  const data = await parseJSON(res)
  if (!res.ok) throw new Error(data.message || 'Verification failed')
  return data
}

export const apiResendVerification = async (email) => {
  const res = await fetch(`${BASE}/resend-verification`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  })
  const data = await parseJSON(res)
  if (!res.ok) throw new Error(data.message || 'Failed to resend')
  return data
}

export const apiGetMe = async (token) => {
  const res = await fetch(`${BASE}/me`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  const data = await parseJSON(res)
  if (!res.ok) throw new Error(data.message || 'Session expired')
  return data // { user }
}

export const apiUpdateExplorerSettings = async (token, formData) => {
  const res = await fetch('/api/users/me/settings', {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  })
  const data = await parseJSON(res)
  if (!res.ok) throw new Error(data.message || 'Update failed')
  return data // { user }
}

export const apiGetExplorerDashboard = async (token) => {
  const res = await fetch('/api/users/me/dashboard', {
    headers: { Authorization: `Bearer ${token}` },
  })
  const data = await parseJSON(res)
  if (!res.ok) throw new Error(data.message || 'Failed to load dashboard')
  return data // { firstName, stats, challengesInProgress, recentActivity }
}

export const apiUpdateGuideSettings = async (token, formData) => {
  const res = await fetch('/api/users/me/guide-settings', {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  })
  const data = await parseJSON(res)
  if (!res.ok) throw new Error(data.message || 'Update failed')
  return data // { user }
}
