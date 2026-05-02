const getAuthToken = () => localStorage.getItem('meras_token')

export const apiCreateSubmission = async ({ challengeId, mode, file, textAnswer, canvasBase64 }) => {
  if (mode === 'file') {
    const formData = new FormData()
    formData.append('challengeId', challengeId)
    formData.append('submissionType', 'file')
    formData.append('file', file)
    const res = await fetch('/api/submissions', {
      method: 'POST',
      headers: { Authorization: `Bearer ${getAuthToken()}` },
      body: formData,
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.message || 'Submission failed')
    return data
  }

  if (mode === 'text') {
    const res = await fetch('/api/submissions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getAuthToken()}`,
      },
      body: JSON.stringify({ challengeId, submissionType: 'text', textAnswer }),
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.message || 'Submission failed')
    return data
  }

  if (mode === 'canvas') {
    const res = await fetch('/api/submissions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getAuthToken()}`,
      },
      body: JSON.stringify({ challengeId, submissionType: 'canvas', canvasBase64 }),
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.message || 'Submission failed')
    return data
  }

  throw new Error('Unknown submission mode')
}
