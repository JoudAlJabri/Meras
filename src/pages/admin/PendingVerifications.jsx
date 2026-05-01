import { useState, useEffect } from 'react'
import AdminLayout from '../../layouts/AdminLayout'
import { useAuth } from '../../context/AuthContext'
import { apiGetPendingGuides, apiApproveGuide, apiRejectGuide } from '../../api/admin'

export default function PendingVerifications() {
  const { getToken } = useAuth()
  const token = getToken()

  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedApplication, setSelectedApplication] = useState(null)
  const [actionMessage, setActionMessage] = useState('')
  const [messageType, setMessageType] = useState('success')

  // ── fetch pending guides ──
  useEffect(() => {
    const fetchGuides = async () => {
      try {
        const data = await apiGetPendingGuides(token)
        setApplications(data)
      } catch (err) {
        showMessage(err.message, 'error')
      } finally {
        setLoading(false)
      }
    }
    fetchGuides()
  }, [token])

  const showMessage = (message, type = 'success') => {
    setActionMessage(message)
    setMessageType(type)
    setTimeout(() => setActionMessage(''), 3000)
  }

  // ── approve ──
  const handleApprove = async (id) => {
    const app = applications.find((a) => a._id === id)

    if (!app?.transcript) {
      showMessage('Cannot approve — transcript not uploaded.', 'error')
      return
    }

    try {
      await apiApproveGuide(token, id)
      setApplications((prev) =>
        prev.map((a) => a._id === id ? { ...a, guideStatus: 'approved' } : a)
      )
      showMessage(`${app.name} was verified successfully.`)
      setSelectedApplication(null)
    } catch (err) {
      showMessage(err.message, 'error')
    }
  }

  // ── reject ──
  const handleReject = async (id) => {
    const app = applications.find((a) => a._id === id)

    try {
      await apiRejectGuide(token, id)
      setApplications((prev) =>
        prev.map((a) => a._id === id ? { ...a, guideStatus: 'rejected' } : a)
      )
      showMessage(`${app.name} was rejected successfully.`)
      setSelectedApplication(null)
    } catch (err) {
      showMessage(err.message, 'error')
    }
  }

  const getBadgeStyle = (status) => {
    if (status === 'approved') return { backgroundColor: '#dcfce7', color: '#166534' }
    if (status === 'rejected') return { backgroundColor: '#fee2e2', color: '#991b1b' }
    return { backgroundColor: '#fef3c7', color: '#92400e' }
  }

  const getBadgeLabel = (status) => {
    if (status === 'approved') return 'Verified'
    if (status === 'rejected') return 'Rejected'
    return 'Pending'
  }

  const cardStyle = {
    backgroundColor: 'white',
    borderRadius: '16px',
    padding: '20px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
    border: '1px solid #e5e7eb',
  }

  const actionButtonStyle = {
    border: 'none',
    padding: '10px 16px',
    borderRadius: '10px',
    cursor: 'pointer',
    fontWeight: '600',
  }

  return (
    <AdminLayout>
      <div>
        <h1 style={{ marginBottom: '8px', color: '#111827' }}>Pending Verifications</h1>
        <p style={{ marginBottom: '24px', color: '#6b7280' }}>
          Review guide applications and approve or reject them.
        </p>

        {actionMessage && (
          <div style={{
            backgroundColor: messageType === 'error' ? '#fee2e2' : '#ecfdf5',
            color: messageType === 'error' ? '#991b1b' : '#065f46',
            padding: '12px 16px',
            borderRadius: '10px',
            marginBottom: '16px',
            fontWeight: '600',
            border: messageType === 'error' ? '1px solid #ef4444' : '1px solid #10b981',
          }}>
            {actionMessage}
          </div>
        )}

        <div style={cardStyle}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#6b7280' }}>
              Loading applications...
            </div>
          ) : applications.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#6b7280' }}>
              No pending applications.
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f9fafb' }}>
                    <th style={{ padding: '12px' }}>Name</th>
                    <th style={{ padding: '12px' }}>University</th>
                    <th style={{ padding: '12px' }}>Major</th>
                    <th style={{ padding: '12px' }}>Submitted Date</th>
                    <th style={{ padding: '12px' }}>Status</th>
                    <th style={{ padding: '12px' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map((app) => (
                    <tr key={app._id}>
                      <td style={{ padding: '12px' }}>{app.name}</td>
                      <td style={{ padding: '12px' }}>{app.university}</td>
                      <td style={{ padding: '12px' }}>{app.major}</td>
                      <td style={{ padding: '12px' }}>
                        {new Date(app.createdAt).toLocaleDateString()}
                      </td>
                      <td style={{ padding: '12px' }}>
                        <span style={{
                          ...getBadgeStyle(app.guideStatus),
                          padding: '6px 10px',
                          borderRadius: '999px',
                          fontWeight: '600',
                          fontSize: '13px',
                        }}>
                          {getBadgeLabel(app.guideStatus)}
                        </span>
                      </td>
                      <td style={{ padding: '12px' }}>
                        <button
                          onClick={() => setSelectedApplication(app)}
                          style={{
                            backgroundColor: '#2E5C4E',
                            color: 'white',
                            border: 'none',
                            padding: '8px 12px',
                            borderRadius: '8px',
                            cursor: 'pointer',
                          }}
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Detail Modal */}
        {selectedApplication && (
          <div style={{
            position: 'fixed', inset: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 999, padding: '20px',
          }}>
            <div style={{
              backgroundColor: 'white', width: '100%', maxWidth: '600px',
              borderRadius: '16px', padding: '24px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
              maxHeight: '90vh', overflowY: 'auto',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2 style={{ margin: 0, color: '#111827' }}>Application Details</h2>
                <button
                  onClick={() => setSelectedApplication(null)}
                  style={{ background: 'transparent', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#6b7280' }}
                >×</button>
              </div>

              <div style={{ display: 'grid', gap: '12px', marginBottom: '20px' }}>
                <p><strong>Name:</strong> {selectedApplication.name}</p>
                <p><strong>Email:</strong> {selectedApplication.email}</p>
                <p><strong>University:</strong> {selectedApplication.university}</p>
                <p><strong>Major:</strong> {selectedApplication.major}</p>
                <p><strong>Submitted Date:</strong> {new Date(selectedApplication.createdAt).toLocaleDateString()}</p>
                <p>
                  <strong>Status:</strong>{' '}
                  <span style={{
                    ...getBadgeStyle(selectedApplication.guideStatus),
                    padding: '6px 10px', borderRadius: '999px',
                    fontSize: '13px', fontWeight: '600',
                  }}>
                    {getBadgeLabel(selectedApplication.guideStatus)}
                  </span>
                </p>
              </div>

              {/* Documents */}
              <div style={{
                border: '1px solid #e5e7eb', borderRadius: '12px',
                padding: '16px', backgroundColor: '#f9fafb', marginBottom: '20px',
              }}>
                <p style={{ marginTop: 0, fontWeight: '600', color: '#111827' }}>
                  Uploaded Documents
                </p>

                <div style={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '10px', padding: '12px', marginBottom: '12px' }}>
                  <p style={{ margin: '0 0 6px 0', fontWeight: '600' }}>Transcript</p>
                  {selectedApplication.transcript ? (
                    <a
                      href={`http://localhost:5001${selectedApplication.transcript}`}
                      target="_blank"
                      rel="noreferrer"
                      style={{ color: '#2E5C4E', fontWeight: '600' }}
                    >
                      View Transcript
                    </a>
                  ) : (
                    <p style={{ margin: 0, color: '#6b7280' }}>Not uploaded</p>
                  )}
                </div>
              </div>

              {/* Actions — only show if still pending */}
              {selectedApplication.guideStatus === 'pending' && (
                <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
                  <button
                    onClick={() => handleApprove(selectedApplication._id)}
                    style={{ ...actionButtonStyle, backgroundColor: '#16a34a', color: 'white' }}
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(selectedApplication._id)}
                    style={{ ...actionButtonStyle, backgroundColor: '#dc2626', color: 'white' }}
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}