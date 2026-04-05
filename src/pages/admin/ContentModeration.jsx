import { useState } from 'react'
import AdminLayout from '../../layouts/AdminLayout'
import { mockFlaggedContent } from '../../data/mockData'

export default function ContentModeration() {
  const [flaggedItems, setFlaggedItems] = useState(mockFlaggedContent)
  const [actionMessage, setActionMessage] = useState('')
  const [messageType, setMessageType] = useState('success')
  const [removalReasons, setRemovalReasons] = useState({})
  const [activeRemoveId, setActiveRemoveId] = useState(null)

  const showMessage = (message, type = 'success') => {
    setActionMessage(message)
    setMessageType(type)

    setTimeout(() => {
      setActionMessage('')
    }, 3000)
  }

  const handleDismissFlag = (id) => {
    setFlaggedItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: 'Dismissed' } : item
      )
    )
    showMessage('Flag has been dismissed successfully.')
  }

  const handleReasonChange = (id, value) => {
    setRemovalReasons((prev) => ({
      ...prev,
      [id]: value,
    }))
  }

  const handleRemoveContent = (id) => {
    const reason = removalReasons[id]?.trim()

    if (!reason) {
      showMessage('Removal reason is required for audit purposes.', 'error')
      return
    }

    setFlaggedItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status: 'Deleted',
              removalAuditReason: reason,
            }
          : item
      )
    )

    setActiveRemoveId(null)
    showMessage('Content removed and warning notification sent to the user.')
  }

  const getStatusStyle = (status) => {
    if (status === 'Deleted') {
      return {
        backgroundColor: '#fee2e2',
        color: '#991b1b',
      }
    }

    if (status === 'Dismissed') {
      return {
        backgroundColor: '#dbeafe',
        color: '#1d4ed8',
      }
    }

    return {
      backgroundColor: '#f3f4f6',
      color: '#374151',
    }
  }

  const cardStyle = {
    backgroundColor: '#ffffff',
    border: '1px solid #e5e7eb',
    borderRadius: '18px',
    padding: '20px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
    marginBottom: '16px',
  }

  const metaLabelStyle = {
    fontSize: '12px',
    color: '#6b7280',
    marginBottom: '4px',
    fontWeight: '600',
  }

  const metaValueStyle = {
    fontSize: '14px',
    color: '#111827',
    fontWeight: '500',
  }

  const buttonBase = {
    border: 'none',
    borderRadius: '10px',
    padding: '10px 14px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600',
  }

  return (
    <AdminLayout>
      <div>
        <h1 style={{ marginBottom: '8px', color: '#111827' }}>Reported Content</h1>
        <p style={{ marginBottom: '24px', color: '#6b7280' }}>
          Review user-flagged content and take moderation actions.
        </p>

        {actionMessage && (
          <div
            style={{
              backgroundColor: messageType === 'error' ? '#fee2e2' : '#ecfdf5',
              color: messageType === 'error' ? '#991b1b' : '#065f46',
              padding: '12px 16px',
              borderRadius: '12px',
              marginBottom: '18px',
              fontWeight: '600',
              border: messageType === 'error' ? '1px solid #ef4444' : '1px solid #10b981',
            }}
          >
            {actionMessage}
          </div>
        )}

        {flaggedItems.length === 0 ? (
          <div
            style={{
              backgroundColor: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '16px',
              padding: '24px',
              textAlign: 'center',
              color: '#6b7280',
            }}
          >
            No flagged content found.
          </div>
        ) : (
          flaggedItems.map((item) => (
            <div key={item.id} style={cardStyle}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  gap: '12px',
                  flexWrap: 'wrap',
                  marginBottom: '14px',
                }}
              >
                <div
                  style={{
                    fontSize: '17px',
                    fontWeight: '700',
                    color: '#111827',
                    lineHeight: '1.4',
                    flex: 1,
                    minWidth: '220px',
                  }}
                >
                  {item.content}
                </div>

                <span
                  style={{
                    ...getStatusStyle(item.status),
                    padding: '6px 12px',
                    borderRadius: '999px',
                    fontSize: '13px',
                    fontWeight: '700',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {item.status}
                </span>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
                  gap: '14px',
                  marginBottom: '18px',
                }}
              >
                <div>
                  <div style={metaLabelStyle}>Reported By</div>
                  <div style={metaValueStyle}>{item.reportedBy}</div>
                </div>

                <div>
                  <div style={metaLabelStyle}>Reason</div>
                  <div style={metaValueStyle}>{item.reason}</div>
                </div>

                <div>
                  <div style={metaLabelStyle}>Date</div>
                  <div style={metaValueStyle}>{item.date}</div>
                </div>
              </div>

              <div
                style={{
                  display: 'flex',
                  gap: '10px',
                  flexWrap: 'wrap',
                  marginBottom: activeRemoveId === item.id ? '14px' : 0,
                }}
              >
                <button
                  style={{
                    ...buttonBase,
                    backgroundColor: '#2563eb',
                    color: '#ffffff',
                  }}
                  onClick={() => handleDismissFlag(item.id)}
                >
                  Dismiss Flag
                </button>

                <button
                  style={{
                    ...buttonBase,
                    backgroundColor: '#dc2626',
                    color: '#ffffff',
                  }}
                  onClick={() =>
                    setActiveRemoveId(activeRemoveId === item.id ? null : item.id)
                  }
                >
                  Remove Content
                </button>
              </div>

              {activeRemoveId === item.id && (
                <div
                  style={{
                    marginTop: '14px',
                    padding: '14px',
                    borderRadius: '14px',
                    backgroundColor: '#f9fafb',
                    border: '1px solid #e5e7eb',
                  }}
                >
                  <label
                    style={{
                      display: 'block',
                      fontSize: '13px',
                      fontWeight: '600',
                      color: '#374151',
                      marginBottom: '8px',
                    }}
                  >
                    Removal reason
                  </label>

                  <textarea
                    placeholder="Enter the reason for removing this content"
                    value={removalReasons[item.id] || ''}
                    onChange={(e) => handleReasonChange(item.id, e.target.value)}
                    rows={3}
                    style={{
                      width: '100%',
                      padding: '12px',
                      borderRadius: '10px',
                      border: '1px solid #d1d5db',
                      fontSize: '14px',
                      resize: 'vertical',
                      boxSizing: 'border-box',
                      marginBottom: '12px',
                    }}
                  />

                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    <button
                      style={{
                        ...buttonBase,
                        backgroundColor: '#dc2626',
                        color: '#ffffff',
                      }}
                      onClick={() => handleRemoveContent(item.id)}
                    >
                      Confirm Removal
                    </button>

                    <button
                      style={{
                        ...buttonBase,
                        backgroundColor: '#e5e7eb',
                        color: '#111827',
                      }}
                      onClick={() => setActiveRemoveId(null)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </AdminLayout>
  )
}