import { useState, useEffect } from 'react'
import AdminLayout from '../../layouts/AdminLayout'
import { useAuth } from '../../context/AuthContext'
import {
  apiGetAnnouncements,
  apiCreateAnnouncement,
  apiDeleteAnnouncement,
} from '../../api/admin'

export default function Announcements() {
  const { getToken } = useAuth()
  const token = getToken()

  const [announcements, setAnnouncements] = useState([])
  const [loading, setLoading] = useState(true)
  const [showFormModal, setShowFormModal] = useState(false)
  const [actionMessage, setActionMessage] = useState('')
  const [messageType, setMessageType] = useState('success')
  const [formErrors, setFormErrors] = useState({ title: '', message: '' })
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    targetAudience: 'All',
  })

  // ── fetch announcements ──
  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await apiGetAnnouncements(token)
        setAnnouncements(data.announcements)
      } catch (err) {
        showMessage(err.message, 'error')
      } finally {
        setLoading(false)
      }
    }
    fetch()
  }, [token])

  const showMessage = (message, type = 'success') => {
    setActionMessage(message)
    setMessageType(type)
    setTimeout(() => setActionMessage(''), 3000)
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setFormErrors({ ...formErrors, [e.target.name]: '' })
  }

  const closeFormModal = () => {
    setShowFormModal(false)
    setFormErrors({ title: '', message: '' })
    setFormData({ title: '', message: '', targetAudience: 'All' })
  }

  // ── create ──
  const handleSave = async () => {
    const errors = { title: '', message: '' }
    if (!formData.title.trim()) errors.title = 'Please enter an announcement title.'
    if (!formData.message.trim()) errors.message = 'Please enter a message before publishing.'
    if (errors.title || errors.message) { setFormErrors(errors); return }

    try {
      const data = await apiCreateAnnouncement(token, {
        title: formData.title.trim(),
        message: formData.message.trim(),
        targetAudience: formData.targetAudience,
      })
      setAnnouncements((prev) => [data.announcement, ...prev])
      showMessage('Announcement Published Successfully.')
      closeFormModal()
    } catch (err) {
      showMessage(err.message, 'error')
    }
  }

  // ── delete ──
  const handleDelete = async (id) => {
    try {
      await apiDeleteAnnouncement(token, id)
      setAnnouncements((prev) => prev.filter((a) => a._id !== id))
      showMessage('Announcement deleted.')
    } catch (err) {
      showMessage(err.message, 'error')
    }
  }

  const getStatusStyle = (status) => {
    if (status === 'Published') return { backgroundColor: '#dcfce7', color: '#166534' }
    return { backgroundColor: '#fef3c7', color: '#92400e' }
  }

  const cardStyle = {
    backgroundColor: 'white', borderRadius: '16px', padding: '20px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.06)', border: '1px solid #e5e7eb',
  }

  const buttonStyle = {
    border: 'none', borderRadius: '10px',
    padding: '10px 16px', cursor: 'pointer', fontWeight: '600',
  }

  return (
    <AdminLayout>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', gap: '12px', flexWrap: 'wrap' }}>
          <div>
            <h1 style={{ marginBottom: '8px', color: '#111827' }}>Announcements</h1>
            <p style={{ margin: 0, color: '#6b7280' }}>Create, publish, and manage platform announcements.</p>
          </div>
          <button onClick={() => setShowFormModal(true)} style={{ ...buttonStyle, backgroundColor: '#2E5C4E', color: 'white' }}>
            Create Announcement
          </button>
        </div>

        {actionMessage && (
          <div style={{
            backgroundColor: messageType === 'error' ? '#fee2e2' : '#ecfdf5',
            color: messageType === 'error' ? '#991b1b' : '#065f46',
            padding: '12px 16px', borderRadius: '10px', marginBottom: '16px',
            fontWeight: '600', border: messageType === 'error' ? '1px solid #ef4444' : '1px solid #10b981',
          }}>
            {actionMessage}
          </div>
        )}

        <div style={cardStyle}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#6b7280' }}>Loading announcements...</div>
          ) : announcements.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#6b7280' }}>No announcements yet.</div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f9fafb', textAlign: 'left' }}>
                    <th style={{ padding: '12px' }}>Title</th>
                    <th style={{ padding: '12px' }}>Message</th>
                    <th style={{ padding: '12px' }}>Target Audience</th>
                    <th style={{ padding: '12px' }}>Date</th>
                    <th style={{ padding: '12px' }}>Status</th>
                    <th style={{ padding: '12px' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {announcements.map((a) => (
                    <tr key={a._id}>
                      <td style={{ padding: '12px' }}>{a.title}</td>
                      <td style={{ padding: '12px' }}>{a.message}</td>
                      <td style={{ padding: '12px' }}>{a.targetAudience}</td>
                      <td style={{ padding: '12px' }}>
                        {new Date(a.createdAt).toLocaleDateString()}
                      </td>
                      <td style={{ padding: '12px' }}>
                        <span style={{ ...getStatusStyle(a.status), padding: '6px 10px', borderRadius: '999px', fontSize: '13px', fontWeight: '600' }}>
                          {a.status}
                        </span>
                      </td>
                      <td style={{ padding: '12px' }}>
                        <button
                          onClick={() => handleDelete(a._id)}
                          style={{ ...buttonStyle, backgroundColor: '#fee2e2', color: '#991b1b', padding: '6px 12px', fontSize: '13px' }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Create Modal */}
        {showFormModal && (
          <div
            style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999, padding: '20px' }}
            onClick={closeFormModal}
          >
            <div
              style={{ backgroundColor: 'white', width: '100%', maxWidth: '600px', borderRadius: '16px', padding: '24px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2 style={{ margin: 0, color: '#111827' }}>Create Announcement</h2>
                <button onClick={closeFormModal} style={{ background: 'transparent', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#6b7280' }}>×</button>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ fontWeight: '600', color: '#374151' }}>Title</label>
                <input
                  type="text" name="title" value={formData.title} onChange={handleChange}
                  placeholder="Enter announcement title"
                  style={{ width: '100%', marginTop: '6px', padding: '10px', borderRadius: '8px', border: formErrors.title ? '1px solid #ef4444' : '1px solid #d1d5db', outline: 'none' }}
                />
                {formErrors.title && <p style={{ color: '#ef4444', fontSize: '13px', marginTop: '4px' }}>{formErrors.title}</p>}
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ fontWeight: '600', color: '#374151' }}>Message</label>
                <textarea
                  name="message" value={formData.message} onChange={handleChange}
                  placeholder="Write your announcement..." rows={4}
                  style={{ width: '100%', marginTop: '6px', padding: '10px', borderRadius: '8px', border: formErrors.message ? '1px solid #ef4444' : '1px solid #d1d5db', outline: 'none', resize: 'none' }}
                />
                {formErrors.message && <p style={{ color: '#ef4444', fontSize: '13px', marginTop: '4px' }}>{formErrors.message}</p>}
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ fontWeight: '600', color: '#374151' }}>Target Audience</label>
                <select
                  name="targetAudience" value={formData.targetAudience} onChange={handleChange}
                  style={{ width: '100%', marginTop: '6px', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db' }}
                >
                  <option value="All">All</option>
                  <option value="Explorers">Explorers</option>
                  <option value="Guides">Guides</option>
                </select>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button onClick={closeFormModal} style={{ padding: '10px 16px', borderRadius: '10px', border: '1px solid #d1d5db', backgroundColor: 'white', cursor: 'pointer', fontWeight: '600' }}>
                  Cancel
                </button>
                <button onClick={handleSave} style={{ padding: '10px 16px', borderRadius: '10px', border: 'none', backgroundColor: '#2E5C4E', color: 'white', cursor: 'pointer', fontWeight: '600' }}>
                  Publish
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}