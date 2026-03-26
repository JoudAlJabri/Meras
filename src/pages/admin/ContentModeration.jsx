import { useState } from 'react'
import AdminLayout from '../../layouts/AdminLayout'
import { mockFlaggedContent } from '../../data/mockData'

export default function ContentModeration() {
  const [flaggedItems, setFlaggedItems] = useState(mockFlaggedContent)
  const [actionMessage, setActionMessage] = useState('')

  const updateStatus = (id, newStatus, message) => {
    setFlaggedItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: newStatus } : item
      )
    )
    setActionMessage(message)

    setTimeout(() => {
      setActionMessage('')
    }, 3000)
  }

  const getStatusStyle = (status) => {
    if (status === 'Deleted') {
      return {
        backgroundColor: '#fee2e2',
        color: '#991b1b',
      }
    }

    if (status === 'Warning Issued') {
      return {
        backgroundColor: '#fef3c7',
        color: '#92400e',
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
    backgroundColor: 'white',
    borderRadius: '16px',
    padding: '20px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
    border: '1px solid #e5e7eb',
  }

  const buttonStyle = {
    border: 'none',
    borderRadius: '8px',
    padding: '8px 12px',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: '600',
    color: 'white',
  }

  return (
    <AdminLayout>
      <div>
        <h1 style={{ marginBottom: '8px', color: '#111827' }}>Content Moderation</h1>
        <p style={{ marginBottom: '24px', color: '#6b7280' }}>
          Review flagged challenges and comments, then take moderation actions.
        </p>

        {actionMessage && (
          <div
            style={{
              backgroundColor: '#ecfdf5',
              color: '#065f46',
              padding: '12px 16px',
              borderRadius: '10px',
              marginBottom: '16px',
              fontWeight: '600',
              border: '1px solid #10b981',
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
                  <th style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>Content</th>
                  <th style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>Reported By</th>
                  <th style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>Reason</th>
                  <th style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>Date</th>
                  <th style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>Status</th>
                  <th style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>Actions</th>
                </tr>
              </thead>

              <tbody>
                {flaggedItems.map((item) => (
                  <tr key={item.id}>
                    <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                      {item.content}
                    </td>
                    <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                      {item.reportedBy}
                    </td>
                    <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                      {item.reason}
                    </td>
                    <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                      {item.date}
                    </td>
                    <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                      <span
                        style={{
                          ...getStatusStyle(item.status),
                          padding: '6px 10px',
                          borderRadius: '999px',
                          fontSize: '13px',
                          fontWeight: '600',
                        }}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        <button
                          style={{ ...buttonStyle, backgroundColor: '#dc2626' }}
                          onClick={() =>
                            updateStatus(
                              item.id,
                              'Deleted',
                              'Content has been deleted successfully.'
                            )
                          }
                        >
                          Delete Content
                        </button>

                        <button
                          style={{ ...buttonStyle, backgroundColor: '#f59e0b' }}
                          onClick={() =>
                            updateStatus(
                              item.id,
                              'Warning Issued',
                              'Warning has been issued successfully.'
                            )
                          }
                        >
                          Issue Warning
                        </button>

                        <button
                          style={{ ...buttonStyle, backgroundColor: '#2563eb' }}
                          onClick={() =>
                            updateStatus(
                              item.id,
                              'Dismissed',
                              'Flag has been dismissed successfully.'
                            )
                          }
                        >
                          Dismiss Flag
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {flaggedItems.length === 0 && (
                  <tr>
                    <td
                      colSpan="6"
                      style={{
                        padding: '20px',
                        textAlign: 'center',
                        color: '#6b7280',
                      }}
                    >
                      No flagged content found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}