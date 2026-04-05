import AdminLayout from '../../layouts/AdminLayout'
import { mockAnnouncements } from '../../data/mockData'
import { useState } from 'react'

export default function Announcements() {
  const [announcements, setAnnouncements] = useState(mockAnnouncements)
  const [showFormModal, setShowFormModal] = useState(false)
  const [actionMessage, setActionMessage] = useState('')
  const [messageType, setMessageType] = useState('success')
  const [formError, setFormError] = useState('')
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    targetAudience: 'All',
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setFormError('')
  }

  const closeFormModal = () => {
    setShowFormModal(false)
    setFormError('')
    setFormData({
      title: '',
      message: '',
      targetAudience: 'All',
    })
  }

  const showMessage = (message, type = 'success') => {
    setActionMessage(message)
    setMessageType(type)

    setTimeout(() => {
      setActionMessage('')
    }, 3000)
  }

  const handleSave = (status) => {
    if (!formData.title.trim()) {
      setFormError('Please enter an announcement title.')
      return
    }

    if (!formData.message.trim()) {
      setFormError('Please enter a message before publishing.')
      return
    }

    const newAnnouncement = {
      id: Date.now(),
      title: formData.title.trim(),
      message: formData.message.trim(),
      targetAudience: formData.targetAudience,
      status,
      date: new Date().toISOString().split('T')[0],
    }

    setAnnouncements((prev) => [newAnnouncement, ...prev])

    showMessage(
      status === 'Draft'
        ? 'Announcement saved as draft.'
        : 'Announcement Published Successfully.',
      'success'
    )

    closeFormModal()
  }

  const getStatusStyle = (status) => {
    if (status === 'Published') {
      return {
        backgroundColor: '#dcfce7',
        color: '#166534',
      }
    }

    return {
      backgroundColor: '#fef3c7',
      color: '#92400e',
    }
  }

  const cardStyle = {
    backgroundColor: 'white',
    borderRadius: '16px',
    padding: '20px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
    border: '1px solid #e5e7eb',
  }

  const buttonStyle = {
    border: 'none',
    borderRadius: '10px',
    padding: '10px 16px',
    cursor: 'pointer',
    fontWeight: '600',
  }

  return (
    <AdminLayout>
      <div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '16px',
            gap: '12px',
            flexWrap: 'wrap',
          }}
        >
          <div>
            <h1 style={{ marginBottom: '8px', color: '#111827' }}>Announcements</h1>
            <p style={{ margin: 0, color: '#6b7280' }}>
              Create, publish, and manage platform announcements.
            </p>
          </div>

          <button
            onClick={() => setShowFormModal(true)}
            style={{
              ...buttonStyle,
              backgroundColor: '#2E5C4E',
              color: 'white',
            }}
          >
            Create Announcement
          </button>
        </div>

        {actionMessage && (
          <div
            style={{
              backgroundColor: messageType === 'error' ? '#fee2e2' : '#ecfdf5',
              color: messageType === 'error' ? '#991b1b' : '#065f46',
              padding: '12px 16px',
              borderRadius: '10px',
              marginBottom: '16px',
              fontWeight: '600',
              border: messageType === 'error' ? '1px solid #ef4444' : '1px solid #10b981',
            }}
          >
            {actionMessage}
          </div>
        )}

        <div style={cardStyle}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#f9fafb', textAlign: 'left' }}>
                  <th style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>Title</th>
                  <th style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>Message</th>
                  <th style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                    Target Audience
                  </th>
                  <th style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>Date</th>
                  <th style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>Status</th>
                </tr>
              </thead>

              <tbody>
                {announcements.map((announcement) => (
                  <tr key={announcement.id}>
                    <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                      {announcement.title}
                    </td>
                    <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                      {announcement.message}
                    </td>
                    <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                      {announcement.targetAudience}
                    </td>
                    <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                      {announcement.date}
                    </td>
                    <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                      <span
                        style={{
                          ...getStatusStyle(announcement.status),
                          padding: '6px 10px',
                          borderRadius: '999px',
                          fontSize: '13px',
                          fontWeight: '600',
                        }}
                      >
                        {announcement.status}
                      </span>
                    </td>
                  </tr>
                ))}

                {announcements.length === 0 && (
                  <tr>
                    <td
                      colSpan="5"
                      style={{
                        padding: '20px',
                        textAlign: 'center',
                        color: '#6b7280',
                      }}
                    >
                      No announcements found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {showFormModal && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 999,
              padding: '20px',
            }}
            onClick={closeFormModal}
          >
            <div
              style={{
                backgroundColor: 'white',
                width: '100%',
                maxWidth: '600px',
                borderRadius: '16px',
                padding: '24px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '20px',
                }}
              >
                <h2 style={{ margin: 0, color: '#111827' }}>Create Announcement</h2>
                <button
                  onClick={closeFormModal}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    fontSize: '20px',
                    cursor: 'pointer',
                    color: '#6b7280',
                  }}
                >
                  ×
                </button>
              </div>

              <div style={{ display: 'grid', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Enter announcement title"
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '10px',
                      border: '1px solid #d1d5db',
                      fontSize: '14px',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Enter announcement message"
                    rows="5"
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '10px',
                      border: formError ? '1px solid #ef4444' : '1px solid #d1d5db',
                      fontSize: '14px',
                      resize: 'vertical',
                      boxSizing: 'border-box',
                    }}
                  />
                  {formError && (
                    <p
                      style={{
                        color: '#dc2626',
                        fontSize: '13px',
                        marginTop: '8px',
                        marginBottom: 0,
                        fontWeight: '500',
                      }}
                    >
                      {formError}
                    </p>
                  )}
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                    Target Audience
                  </label>
                  <select
                    name="targetAudience"
                    value={formData.targetAudience}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '10px',
                      border: '1px solid #d1d5db',
                      fontSize: '14px',
                      boxSizing: 'border-box',
                    }}
                  >
                    <option value="All">All</option>
                    <option value="Explorers">Explorers</option>
                    <option value="Guides">Guides</option>
                  </select>
                </div>
              </div>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  gap: '10px',
                  marginTop: '24px',
                  flexWrap: 'wrap',
                }}
              >
                <button
                  onClick={() => handleSave('Draft')}
                  style={{
                    ...buttonStyle,
                    backgroundColor: '#e5e7eb',
                    color: '#111827',
                  }}
                >
                  Save as Draft
                </button>

                <button
                  onClick={() => handleSave('Published')}
                  style={{
                    ...buttonStyle,
                    backgroundColor: '#2E5C4E',
                    color: 'white',
                  }}
                >
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