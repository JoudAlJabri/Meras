const BASE = '/api/admin'

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

// DASHBOARD 
export const apiGetDashboardStats = async (token) => {
  const res = await fetch(`${BASE}/dashboard`, {
    headers: authHeaders(token),
  })
  const data = await parseJSON(res)
  if (!res.ok) throw new Error(data.message || 'Failed to load dashboard')
  return data // { stats, recentSignUps, userGrowthData }
}

// USERS
export const apiGetUsers = async (token, { search = '', role = 'All', status = 'All' } = {}) => {
  const params = new URLSearchParams()
  if (search) params.append('search', search)
  if (role !== 'All') params.append('role', role)
  if (status !== 'All') params.append('status', status)

  const res = await fetch(`${BASE}/users?${params.toString()}`, {
    headers: authHeaders(token),
  })
  const data = await parseJSON(res)
  if (!res.ok) throw new Error(data.message || 'Failed to load users')
  return data // { users }
}

export const apiGetUserById = async (token, id) => {
  const res = await fetch(`${BASE}/users/${id}`, {
    headers: authHeaders(token),
  })
  const data = await parseJSON(res)
  if (!res.ok) throw new Error(data.message || 'Failed to load user')
  return data // { user }
}

export const apiSuspendUser = async (token, id) => {
  const res = await fetch(`${BASE}/users/${id}/suspend`, {
    method: 'PATCH',
    headers: authHeaders(token),
  })
  const data = await parseJSON(res)
  if (!res.ok) throw new Error(data.message || 'Failed to suspend user')
  return data // { message, user }
}

export const apiDeleteUser = async (token, id) => {
  const res = await fetch(`${BASE}/users/${id}`, {
    method: 'DELETE',
    headers: authHeaders(token),
  })
  const data = await parseJSON(res)
  if (!res.ok) throw new Error(data.message || 'Failed to delete user')
  return data // { message }
}

// GUIDE VERIFICATION 
export const apiGetPendingGuides = async (token) => {
  const res = await fetch(`${BASE}/pending-guides`, {
    headers: authHeaders(token),
  })
  const data = await parseJSON(res)
  if (!res.ok) throw new Error(data.message || 'Failed to load pending guides')
  return data // array of guides
}

export const apiApproveGuide = async (token, id) => {
  const res = await fetch(`${BASE}/guides/${id}/approve`, {
    method: 'PATCH',
    headers: authHeaders(token),
  })
  const data = await parseJSON(res)
  if (!res.ok) throw new Error(data.message || 'Failed to approve guide')
  return data // { message, guide }
}

export const apiRejectGuide = async (token, id) => {
  const res = await fetch(`${BASE}/guides/${id}/reject`, {
    method: 'PATCH',
    headers: authHeaders(token),
  })
  const data = await parseJSON(res)
  if (!res.ok) throw new Error(data.message || 'Failed to reject guide')
  return data // { message, guide }
}

// ANNOUNCEMENTS
export const apiGetAnnouncements = async (token) => {
  const res = await fetch(`${BASE}/announcements`, {
    headers: authHeaders(token),
  })
  const data = await parseJSON(res)
  if (!res.ok) throw new Error(data.message || 'Failed to load announcements')
  return data // { announcements }
}

export const apiCreateAnnouncement = async (token, { title, message, targetAudience }) => {
  const res = await fetch(`${BASE}/announcements`, {
    method: 'POST',
    headers: authHeaders(token),
    body: JSON.stringify({ title, message, targetAudience }),
  })
  const data = await parseJSON(res)
  if (!res.ok) throw new Error(data.message || 'Failed to create announcement')
  return data // { announcement }
}

export const apiDeleteAnnouncement = async (token, id) => {
  const res = await fetch(`${BASE}/announcements/${id}`, {
    method: 'DELETE',
    headers: authHeaders(token),
  })
  const data = await parseJSON(res)
  if (!res.ok) throw new Error(data.message || 'Failed to delete announcement')
  return data // { message }
}

// FLAGGED CONTENT
export const apiGetFlaggedContent = async (token) => {
  const res = await fetch(`${BASE}/flagged-content`, {
    headers: authHeaders(token),
  })
  const data = await parseJSON(res)
  if (!res.ok) throw new Error(data.message || 'Failed to load flagged content')
  return data // { flaggedItems }
}

export const apiDismissFlag = async (token, id) => {
  const res = await fetch(`${BASE}/flagged-content/${id}/dismiss`, {
    method: 'PATCH',
    headers: authHeaders(token),
  })
  const data = await parseJSON(res)
  if (!res.ok) throw new Error(data.message || 'Failed to dismiss flag')
  return data // { message, item }
}

export const apiRemoveContent = async (token, id, removalAuditReason) => {
  const res = await fetch(`${BASE}/flagged-content/${id}/remove`, {
    method: 'PATCH',
    headers: authHeaders(token),
    body: JSON.stringify({ removalAuditReason }),
  })
  const data = await parseJSON(res)
  if (!res.ok) throw new Error(data.message || 'Failed to remove content')
  return data // { message, item }
}

//  TAXONOMY 
export const apiGetTaxonomy = async (token) => {
  const res = await fetch(`${BASE}/taxonomy`, {
    headers: authHeaders(token),
  })
  const data = await parseJSON(res)
  if (!res.ok) throw new Error(data.message || 'Failed to load taxonomy')
  return data // { universities, majors }
}

export const apiAddUniversity = async (token, name) => {
  const res = await fetch(`${BASE}/taxonomy/universities`, {
    method: 'POST',
    headers: authHeaders(token),
    body: JSON.stringify({ name }),
  })
  const data = await parseJSON(res)
  if (!res.ok) throw new Error(data.message || 'Failed to add university')
  return data // { message, universities }
}

export const apiDeleteUniversity = async (token, name) => {
  const res = await fetch(`${BASE}/taxonomy/universities/${encodeURIComponent(name)}`, {
    method: 'DELETE',
    headers: authHeaders(token),
  })
  const data = await parseJSON(res)
  if (!res.ok) throw new Error(data.message || 'Failed to delete university')
  return data // { message, universities }
}

export const apiAddMajor = async (token, name) => {
  const res = await fetch(`${BASE}/taxonomy/majors`, {
    method: 'POST',
    headers: authHeaders(token),
    body: JSON.stringify({ name }),
  })
  const data = await parseJSON(res)
  if (!res.ok) throw new Error(data.message || 'Failed to add major')
  return data // { message, majors }
}

export const apiDeleteMajor = async (token, name) => {
  const res = await fetch(`${BASE}/taxonomy/majors/${encodeURIComponent(name)}`, {
    method: 'DELETE',
    headers: authHeaders(token),
  })
  const data = await parseJSON(res)
  if (!res.ok) throw new Error(data.message || 'Failed to delete major')
  return data // { message, majors }
}

//  EARNINGS 
export const apiGetEarnings = async (token) => {
  const res = await fetch(`${BASE}/earnings`, {
    headers: authHeaders(token),
  })
  const data = await parseJSON(res)
  if (!res.ok) throw new Error(data.message || 'Failed to load earnings')
  return data // { totalIncome, totalSessions, earnings }
}

// OFFICE HOURS 
export const apiGetOfficeHours = async (token) => {
  const res = await fetch(`${BASE}/office-hours`, {
    headers: authHeaders(token),
  })
  const data = await parseJSON(res)
  if (!res.ok) throw new Error(data.message || 'Failed to load office hours')
  return data // { slots }
}

export const apiSaveOfficeHours = async (token, slots) => {
  const res = await fetch(`${BASE}/office-hours`, {
    method: 'POST',
    headers: authHeaders(token),
    body: JSON.stringify({ slots }),
  })
  const data = await parseJSON(res)
  if (!res.ok) throw new Error(data.message || 'Failed to save office hours')
  return data // { message, slots }
}