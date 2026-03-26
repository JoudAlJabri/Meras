import { useMemo, useState } from 'react'
import AdminLayout from '../../layouts/AdminLayout'
import { mockUsers } from '../../data/mockData'

export default function UserDirectory() {
  const [users, setUsers] = useState(mockUsers)
  const [searchTerm, setSearchTerm] = useState('')
  const [roleFilter, setRoleFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState('All')
  const [selectedUser, setSelectedUser] = useState(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showProfileModal, setShowProfileModal] = useState(false)


  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesRole =
        roleFilter === 'All' ||
        user.role.toLowerCase() === roleFilter.toLowerCase()

      const matchesStatus =
        statusFilter === 'All' ||
        user.status.toLowerCase() === statusFilter.toLowerCase()

      return matchesSearch && matchesRole && matchesStatus
    })
  }, [users, searchTerm, roleFilter, statusFilter])

  const handleSuspend = (id) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id ? { ...user, status: 'Suspended' } : user
      )
    )
  }

  const handleDeleteClick = (user) => {
    setSelectedUser(user)
    setShowDeleteModal(true)
  }

  const confirmDelete = () => {
    if (!selectedUser) return

    setUsers((prev) => prev.filter((user) => user.id !== selectedUser.id))
    setShowDeleteModal(false)
    setSelectedUser(null)
  }

  const closeDeleteModal = () => {
    setShowDeleteModal(false)
    setSelectedUser(null)
  }

  const getStatusStyle = (status) => {
    if (status === 'Active') {
      return {
        backgroundColor: '#dcfce7',
        color: '#166534',
      }
    }

    if (status === 'Suspended') {
      return {
        backgroundColor: '#fee2e2',
        color: '#991b1b',
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
  }

  return (
    <AdminLayout>
      <div>
        <h1 style={{ marginBottom: '8px', color: '#111827' }}>User Directory</h1>
        <p style={{ marginBottom: '24px', color: '#6b7280' }}>
          Search, filter, and manage platform users.
        </p>

        <div style={cardStyle}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '2fr 1fr 1fr',
              gap: '12px',
              marginBottom: '20px',
            }}
          >
            <input
              type="text"
              placeholder="Search by name or email"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                padding: '10px 12px',
                borderRadius: '10px',
                border: '1px solid #d1d5db',
                fontSize: '14px',
              }}
            />

            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              style={{
                padding: '10px 12px',
                borderRadius: '10px',
                border: '1px solid #d1d5db',
                fontSize: '14px',
              }}
            >
              <option value="All">All Roles</option>
              <option value="Explorer">Explorer</option>
              <option value="Guide">Guide</option>
              <option value="Admin">Admin</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={{
                padding: '10px 12px',
                borderRadius: '10px',
                border: '1px solid #d1d5db',
                fontSize: '14px',
              }}
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Suspended">Suspended</option>
            </select>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#f9fafb', textAlign: 'left' }}>
                  <th style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>Name</th>
                  <th style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>Email</th>
                  <th style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>Role</th>
                  <th style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>Join Date</th>
                  <th style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>Status</th>
                  <th style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                      {user.name}
                    </td>
                    <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                      {user.email}
                    </td>
                    <td
                      style={{
                        padding: '12px',
                        borderBottom: '1px solid #e5e7eb',
                        textTransform: 'capitalize',
                      }}
                    >
                      {user.role}
                    </td>
                    <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                      {user.joinDate}
                    </td>
                    <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                      <span
                        style={{
                          ...getStatusStyle(user.status),
                          padding: '6px 10px',
                          borderRadius: '999px',
                          fontSize: '13px',
                          fontWeight: '600',
                        }}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        <button
                          style={{
                            ...buttonStyle,
                            backgroundColor: '#2E5C4E',
                            color: 'white',
                          }}
                          onClick={() => {
                            setSelectedUser(user)
                            setShowProfileModal(true)
                          }}
                        >
                          View Profile
                        </button>

                        <button
                          style={{
                            ...buttonStyle,
                            backgroundColor: '#f59e0b',
                            color: 'white',
                          }}
                          onClick={() => handleSuspend(user.id)}
                        >
                          Suspend Account
                        </button>

                        <button
                          style={{
                            ...buttonStyle,
                            backgroundColor: '#dc2626',
                            color: 'white',
                          }}
                          onClick={() => {
                            setSelectedUser(user)
                            setShowDeleteModal(true)
                          }}
                        >
                          Delete Account
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {filteredUsers.length === 0 && (
                  <tr>
                    <td
                      colSpan="6"
                      style={{
                        padding: '20px',
                        textAlign: 'center',
                        color: '#6b7280',
                      }}
                    >
                      No users found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {showProfileModal && selectedUser && (
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
        maxWidth: '500px',
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
        <h2 style={{ margin: 0, color: '#111827' }}>User Profile</h2>
        <button
          onClick={() => {
            setShowProfileModal(false)
            setSelectedUser(null)
          }}
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

      <div style={{ display: 'grid', gap: '12px' }}>
        <p><strong>Name:</strong> {selectedUser.name}</p>
        <p><strong>Email:</strong> {selectedUser.email}</p>
        <p><strong>Role:</strong> {selectedUser.role}</p>
        <p><strong>Join Date:</strong> {selectedUser.joinDate || 'N/A'}</p>
        <p><strong>Status:</strong> {selectedUser.status || 'N/A'}</p>

        {selectedUser.university && (
          <p><strong>University:</strong> {selectedUser.university}</p>
        )}

        {selectedUser.major && (
          <p><strong>Major:</strong> {selectedUser.major}</p>
        )}

        {selectedUser.recommendedMajors && (
          <div>
            <strong>Recommended Majors:</strong>
            <ul style={{ marginTop: '8px' }}>
              {selectedUser.recommendedMajors.map((major, index) => (
                <li key={index}>{major}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
        <button
          onClick={() => {
            setShowProfileModal(false)
            setSelectedUser(null)
          }}
          style={{
            backgroundColor: '#2E5C4E',
            color: 'white',
            border: 'none',
            padding: '10px 16px',
            borderRadius: '10px',
            cursor: 'pointer',
            fontWeight: '600',
          }}
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}
{showDeleteModal && selectedUser && (
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
        maxWidth: '480px',
        borderRadius: '16px',
        padding: '24px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
      }}
    >
      <h2 style={{ marginTop: 0, color: '#111827' }}>Confirm Delete</h2>
      <p style={{ color: '#4b5563', marginBottom: '20px' }}>
        Are you sure you want to delete <strong>{selectedUser.name}</strong>?
        This action cannot be undone.
      </p>

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
        <button
          onClick={closeDeleteModal}
          style={{
            ...buttonStyle,
            backgroundColor: '#e5e7eb',
            color: '#111827',
          }}
        >
          Cancel
        </button>

        <button
          onClick={confirmDelete}
          style={{
            ...buttonStyle,
            backgroundColor: '#dc2626',
            color: 'white',
          }}
        >
          Delete
        </button>
      </div>
    </div>
  </div>
)}
</div>
</AdminLayout> )}
