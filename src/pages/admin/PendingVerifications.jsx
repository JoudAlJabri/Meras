import { useState } from 'react'
import AdminLayout from '../../layouts/AdminLayout'
import { mockPendingApplications } from '../../data/mockData'

export default function PendingVerifications() {
  const [applications, setApplications] = useState(mockPendingApplications)
  const [selectedApplication, setSelectedApplication] = useState(null)
  const [actionMessage, setActionMessage] = useState('')
  const [messageType, setMessageType] = useState('success')

  // temporary frontend-only user
  const currentUser = {
    name: 'Dana Alsawad',
    role: 'admin', // change to 'guide' or 'explorer' to test restriction
  }

  const isAdmin = currentUser.role === 'admin'

  const showMessage = (message, type = 'success') => {
    setActionMessage(message)
    setMessageType(type)

    setTimeout(() => {
      setActionMessage('')
    }, 3000)
  }

  const handleApprove = (id) => {
    const applicationToApprove = applications.find((app) => app.id === id)

    if (!applicationToApprove?.universityId || !applicationToApprove?.transcript) {
      showMessage(
        'Cannot approve application until both University ID and Transcript are uploaded.',
        'error'
      )
      return
    }

    setApplications((prev) =>
      prev.map((app) =>
        app.id === id ? { ...app, status: 'Verified' } : app
      )
    )

    setSelectedApplication((prev) =>
      prev && prev.id === id ? { ...prev, status: 'Verified' } : prev
    )

    showMessage('Application verified and notification email sent to the applicant.', 'success')
  }

  const handleReject = (id) => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === id ? { ...app, status: 'Rejected' } : app
      )
    )

    setSelectedApplication((prev) =>
      prev && prev.id === id ? { ...prev, status: 'Rejected' } : prev
    )

    showMessage('Application rejected and notification email sent to the applicant.', 'success')
  }

  const getBadgeStyle = (status) => {
    if (status === 'Verified') {
      return {
        backgroundColor: '#dcfce7',
        color: '#166534',
      }
    }

    if (status === 'Rejected') {
      return {
        backgroundColor: '#fee2e2',
        color: '#991b1b',
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
        <h1 style={{ marginBottom: '8px', color: '#111827' }}>
          Pending Verifications
        </h1>
        <p style={{ marginBottom: '24px', color: '#6b7280' }}>
          Review guide applications and approve or reject them.
        </p>

        <div
          style={{
            backgroundColor: '#eff6ff',
            color: '#1d4ed8',
            padding: '12px 16px',
            borderRadius: '10px',
            marginBottom: '16px',
            fontWeight: '500',
            border: '1px solid #bfdbfe',
          }}
        >
          Sensitive verification documents are restricted to Administrator access only.
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
                  <th style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>Name</th>
                  <th style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>University</th>
                  <th style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>Major</th>
                  <th style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>Submitted Date</th>
                  <th style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>Status</th>
                  <th style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>Actions</th>
                </tr>
              </thead>

              <tbody>
                {applications.map((app) => (
                  <tr key={app.id}>
                    <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                      {app.name}
                    </td>
                    <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                      {app.university}
                    </td>
                    <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                      {app.major}
                    </td>
                    <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                      {app.submittedDate}
                    </td>
                    <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                      <span
                        style={{
                          ...getBadgeStyle(app.status),
                          padding: '6px 10px',
                          borderRadius: '999px',
                          fontSize: '13px',
                          fontWeight: '600',
                        }}
                      >
                        {app.status}
                      </span>
                    </td>
                    <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                      {isAdmin ? (
                        <button
                          onClick={() => setSelectedApplication(app)}
                          style={{
                            backgroundColor: '#2E5C4E',
                            color: 'white',
                            border: 'none',
                            padding: '8px 12px',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontSize: '14px',
                            fontWeight: '600',
                          }}
                        >
                          View Details
                        </button>
                      ) : (
                        <span
                          style={{
                            color: '#9ca3af',
                            fontSize: '13px',
                            fontWeight: '600',
                          }}
                        >
                          Admin Only
                        </span>
                      )}
                    </td>
                  </tr>
                ))}

                {applications.length === 0 && (
                  <tr>
                    <td
                      colSpan="6"
                      style={{
                        padding: '20px',
                        textAlign: 'center',
                        color: '#6b7280',
                      }}
                    >
                      No pending applications found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {selectedApplication && (
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
          >
            <div
              style={{
                backgroundColor: 'white',
                width: '100%',
                maxWidth: '600px',
                borderRadius: '16px',
                padding: '24px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                maxHeight: '90vh',
                overflowY: 'auto',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '20px',
                }}
              >
                <h2 style={{ margin: 0, color: '#111827' }}>Application Details</h2>
                <button
                  onClick={() => setSelectedApplication(null)}
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

              <div style={{ display: 'grid', gap: '12px', marginBottom: '20px' }}>
                <p><strong>Name:</strong> {selectedApplication.name}</p>
                <p><strong>Email:</strong> {selectedApplication.email}</p>
                <p><strong>University:</strong> {selectedApplication.university}</p>
                <p><strong>Major:</strong> {selectedApplication.major}</p>
                <p><strong>Submitted Date:</strong> {selectedApplication.submittedDate}</p>
                <p>
                  <strong>Status:</strong>{' '}
                  <span
                    style={{
                      ...getBadgeStyle(selectedApplication.status),
                      padding: '6px 10px',
                      borderRadius: '999px',
                      fontSize: '13px',
                      fontWeight: '600',
                    }}
                  >
                    {selectedApplication.status}
                  </span>
                </p>
              </div>

              <div
                style={{
                  border: '1px solid #e5e7eb',
                  borderRadius: '12px',
                  padding: '16px',
                  backgroundColor: '#f9fafb',
                  marginBottom: '20px',
                }}
              >
                <p style={{ marginTop: 0, fontWeight: '600', color: '#111827' }}>
                  Uploaded Documents
                </p>

                {isAdmin ? (
                  <>
                    <div
                      style={{
                        backgroundColor: 'white',
                        border: '1px solid #e5e7eb',
                        borderRadius: '10px',
                        padding: '12px',
                        marginBottom: '12px',
                      }}
                    >
                      <p style={{ margin: '0 0 6px 0', fontWeight: '600', color: '#111827' }}>
                        University ID
                      </p>
                      <p style={{ margin: 0, color: '#6b7280' }}>
                        {selectedApplication.universityId || 'Not uploaded'}
                      </p>
                    </div>

                    <div
                      style={{
                        backgroundColor: 'white',
                        border: '1px solid #e5e7eb',
                        borderRadius: '10px',
                        padding: '12px',
                      }}
                    >
                      <p style={{ margin: '0 0 6px 0', fontWeight: '600', color: '#111827' }}>
                        Transcript
                      </p>
                      <p style={{ margin: 0, color: '#6b7280' }}>
                        {selectedApplication.transcript || 'Not uploaded'}
                      </p>
                    </div>
                  </>
                ) : (
                  <div
                    style={{
                      backgroundColor: '#fff7ed',
                      border: '1px solid #fdba74',
                      borderRadius: '10px',
                      padding: '12px',
                      color: '#9a3412',
                      fontWeight: '500',
                    }}
                  >
                    Restricted: Only administrators can view sensitive verification documents.
                  </div>
                )}
              </div>

              {isAdmin && (
                <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
                  <button
                    onClick={() => handleApprove(selectedApplication.id)}
                    style={{
                      ...actionButtonStyle,
                      backgroundColor: '#16a34a',
                      color: 'white',
                    }}
                  >
                    Approve
                  </button>

                  <button
                    onClick={() => handleReject(selectedApplication.id)}
                    style={{
                      ...actionButtonStyle,
                      backgroundColor: '#dc2626',
                      color: 'white',
                    }}
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