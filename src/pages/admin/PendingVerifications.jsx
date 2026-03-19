import { useState } from 'react'
import AdminLayout from '../../layouts/AdminLayout'
import { mockPendingApplications } from '../../data/mockData'

export default function PendingVerifications() {
  const [applications, setApplications] = useState(mockPendingApplications)
  const [selectedApplication, setSelectedApplication] = useState(null)

  const handleApprove = (id) => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === id ? { ...app, status: 'Approved' } : app
      )
    )

    setSelectedApplication((prev) =>
      prev && prev.id === id ? { ...prev, status: 'Approved' } : prev
    )
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
  }

  const getBadgeStyle = (status) => {
    if (status === 'Approved') {
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

  return (
    <AdminLayout>
      <div>
        <h1 style={{ marginBottom: '8px', color: '#111827' }}>
          Pending Verifications
        </h1>
        <p style={{ marginBottom: '24px', color: '#6b7280' }}>
          Review guide applications and approve or reject them.
        </p>

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
                  Document Preview
                </p>
                <div
                  style={{
                    minHeight: '120px',
                    border: '2px dashed #cbd5e1',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#6b7280',
                    backgroundColor: 'white',
                    padding: '12px',
                    textAlign: 'center',
                  }}
                >
                  {selectedApplication.documentPreview}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                <button
                  onClick={() => handleApprove(selectedApplication.id)}
                  style={{
                    backgroundColor: '#16a34a',
                    color: 'white',
                    border: 'none',
                    padding: '10px 16px',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    fontWeight: '600',
                  }}
                >
                  Approve
                </button>

                <button
                  onClick={() => handleReject(selectedApplication.id)}
                  style={{
                    backgroundColor: '#dc2626',
                    color: 'white',
                    border: 'none',
                    padding: '10px 16px',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    fontWeight: '600',
                  }}
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}