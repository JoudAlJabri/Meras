import { useState, useEffect } from 'react'
import AdminLayout from '../../layouts/AdminLayout'
import { useAuth } from '../../context/AuthContext'
import {
  apiGetFlaggedContent,
  apiDismissFlag,
  apiRemoveContent,
} from '../../api/admin'

export default function ContentModeration() {
  const { getToken } = useAuth()
  const token = getToken()

  const [flaggedItems, setFlaggedItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [actionMessage, setActionMessage] = useState('')
  const [messageType, setMessageType] = useState('success')
  const [removalReasons, setRemovalReasons] = useState({})
  const [activeRemoveId, setActiveRemoveId] = useState(null)

  // ── fetch flagged content ──
  useEffect(() => {
    const fetchFlagged = async () => {
      try {
        const data = await apiGetFlaggedContent(token)
        setFlaggedItems(data.flaggedItems)
      } catch (err) {
        showMessage(err.message, 'error')
      } finally {
        setLoading(false)
      }
    }
    fetchFlagged()
  }, [token])

  const showMessage = (message, type = 'success') => {
    setActionMessage(message)
    setMessageType(type)
    setTimeout(() => setActionMessage(''), 3000)
  }

  // ── dismiss ──
  const handleDismissFlag = async (id) => {
    try {
      await apiDismissFlag(token, id)
      setFlaggedItems((prev) =>
        prev.map((item) =>
          item._id === id ? { ...item, status: 'Dismissed' } : item
        )
      )
      showMessage('Flag has been dismissed successfully.')
    } catch (err) {
      showMessage(err.message, 'error')
    }
  }

  // ── remove ──
  const handleRemoveContent = async (id) => {
    const reason = removalReasons[id]?.trim()

    if (!reason) {
      showMessage('Removal reason is required for audit purposes.', 'error')
      return
    }

    try {
      await apiRemoveContent(token, id, reason)
      setFlaggedItems((prev) =>
        prev.map((item) =>
          item._id === id
            ? { ...item, status: 'Deleted', removalAuditReason: reason }
            : item
        )
      )
      setActiveRemoveId(null)
      showMessage('Content removed and warning notification sent to the user.')
    } catch (err) {
      showMessage(err.message, 'error')
    }
  }

  const handleReasonChange = (id, value) => {
    setRemovalReasons((prev) => ({ ...prev, [id]: value }))
  }

  const getStatusStyle = (status) => {
    if (status === 'Deleted')   return { backgroundColor: '#fee2e2', color: '#991b1b' }
    if (status === 'Dismissed') return { backgroundColor: '#dbeafe', color: '#1d4ed8' }
    return { backgroundColor: '#f3f4f6', color: '#374151' }
  }

  const cardStyle = {
    backgroundColor: '#ffffff', border: '1px solid #e5e7eb',
    borderRadius: '18px', padding: '20px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.05)', marginBottom: '16px',
  }

  const metaLabelStyle = { fontSize: '12px', color: '#6b7280', marginBottom: '4px', fontWeight: '600' }
  const metaValueStyle  = { fontSize: '14px', color: '#111827', fontWeight: '500' }
  const buttonBase = { border: 'none', borderRadius: '10px', padding: '10px 14px', cursor: 'pointer', fontSize: '14px', fontWeight: '600' }

  return (
    <AdminLayout>
      <div>
        <h1 style={{ marginBottom: '8px', color: '#111827' }}>Reported Content</h1>
        <p style={{ marginBottom: '24px', color: '#6b7280' }}>
          Review user-flagged content and take moderation actions.
        </p>

        {actionMessage && (
          <div style={{
            backgroundColor: messageType === 'error' ? '#fee2e2' : '#ecfdf5',
            color: messageType === 'error' ? '#991b1b' : '#065f46',
            padding: '12px 16px', borderRadius: '12px', marginBottom: '18px',
            fontWeight: '600',
            border: messageType === 'error' ? '1px solid #ef4444' : '1px solid #10b981',
          }}>
            {actionMessage}
          </div>
        )}

        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#6b7280' }}>
            Loading reported content...
          </div>
        ) : flaggedItems.length === 0 ? (
          <div style={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '16px', padding: '24px', textAlign: 'center', color: '#6b7280' }}>
            No flagged content found.
          </div>
        ) : (
          flaggedItems.map((item) => (
            <div key={item._id} style={cardStyle}>

              {/* Header row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px', flexWrap: 'wrap', marginBottom: '14px' }}>
                <div style={{ fontSize: '17px', fontWeight: '700', color: '#111827', lineHeight: '1.4', flex: 1, minWidth: '220px' }}>
                  {item.content}
                </div>
                <span style={{ ...getStatusStyle(item.status), padding: '6px 12px', borderRadius: '999px', fontSize: '13px', fontWeight: '700', whiteSpace: 'nowrap' }}>
                  {item.status}
                </span>
              </div>

              {/* Meta */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '14px', marginBottom: '18px' }}>
                <div>
                  <div style={metaLabelStyle}>Reported By</div>
                  <div style={metaValueStyle}>
                    {item.reportedBy?.name || item.reportedBy?.email || 'Unknown'}
                  </div>
                </div>
                <div>
                  <div style={metaLabelStyle}>Reason</div>
                  <div style={metaValueStyle}>{item.reason}</div>
                </div>
                <div>
                  <div style={metaLabelStyle}>Date</div>
                  <div style={metaValueStyle}>
                    {new Date(item.createdAt).toLocaleDateString()}
                  </div>
                </div>
                <div>
                  <div style={metaLabelStyle}>Content Type</div>
                  <div style={metaValueStyle} style={{ textTransform: 'capitalize' }}>
                    {item.contentType}
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: activeRemoveId === item._id ? '14px' : 0 }}>
                <button
                  style={{ ...buttonBase, backgroundColor: '#2563eb', color: '#ffffff' }}
                  onClick={() => handleDismissFlag(item._id)}
                  disabled={item.status !== 'Pending'}
                >
                  Dismiss Flag
                </button>
                <button
                  style={{ ...buttonBase, backgroundColor: item.status !== 'Pending' ? '#9ca3af' : '#dc2626', color: '#ffffff', cursor: item.status !== 'Pending' ? 'not-allowed' : 'pointer' }}
                  onClick={() => setActiveRemoveId(activeRemoveId === item._id ? null : item._id)}
                  disabled={item.status !== 'Pending'}
                >
                  Remove Content
                </button>
              </div>

              {/* Removal reason form */}
              {activeRemoveId === item._id && (
                <div style={{ marginTop: '14px', padding: '14px', borderRadius: '14px', backgroundColor: '#f9fafb', border: '1px solid #e5e7eb' }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                    Removal reason
                  </label>
                  <textarea
                    placeholder="Enter the reason for removing this content"
                    value={removalReasons[item._id] || ''}
                    onChange={(e) => handleReasonChange(item._id, e.target.value)}
                    rows={3}
                    style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #d1d5db', fontSize: '14px', resize: 'vertical', boxSizing: 'border-box', marginBottom: '12px' }}
                  />
                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    <button
                      style={{ ...buttonBase, backgroundColor: '#dc2626', color: '#ffffff' }}
                      onClick={() => handleRemoveContent(item._id)}
                    >
                      Confirm Removal
                    </button>
                    <button
                      style={{ ...buttonBase, backgroundColor: '#e5e7eb', color: '#111827' }}
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