import { useMemo, useState, useEffect, useCallback } from 'react'
import AdminLayout from '../../layouts/AdminLayout'
import { apiGetUsers, apiSuspendUser, apiDeleteUser } from '../../api/admin'
import { useAuth } from '../../context/AuthContext'

export default function UserDirectory() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [roleFilter, setRoleFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState('All')
  const [selectedUser, setSelectedUser] = useState(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showProfileModal, setShowProfileModal] = useState(false)
  const [actionMessage, setActionMessage] = useState('')
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)

const { getToken } = useAuth()
const token = getToken()

  // ── fetch users from backend ──
  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true)
      const data = await apiGetUsers(token, {
        search: searchTerm,
        role: roleFilter,
        status: statusFilter,
      })
      setUsers(data.users)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [token, searchTerm, roleFilter, statusFilter])

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (!actionMessage) return
    const timer = setTimeout(() => setActionMessage(''), 3000)
    return () => clearTimeout(timer)
  }, [actionMessage])

  // filtering is now done by the backend, but keep this
  // as a fallback for instant UI response while typing
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
        (user.status || '').toLowerCase() === statusFilter.toLowerCase()
      return matchesSearch && matchesRole && matchesStatus
    })
  }, [users, searchTerm, roleFilter, statusFilter])

  // ── suspend ──
  const handleSuspend = async (id) => {
    const userToSuspend = users.find((u) => u._id === id)
    if (!userToSuspend) return

    if (userToSuspend.status === 'Suspended') {
      setActionMessage(`${userToSuspend.name} is already suspended`)
      return
    }

    try {
      await apiSuspendUser(token, id)
      setUsers((prev) =>
        prev.map((u) => (u._id === id ? { ...u, status: 'Suspended' } : u))
      )
      setActionMessage(`${userToSuspend.name} has been suspended`)
    } catch (err) {
      setActionMessage(err.message)
    }
  }

  // ── delete ──
  const handleDeleteClick = (user) => {
    setSelectedUser(user)
    setShowDeleteModal(true)
  }

  const confirmDelete = async () => {
    if (!selectedUser) return
    try {
      await apiDeleteUser(token, selectedUser._id)
      setUsers((prev) => prev.filter((u) => u._id !== selectedUser._id))
      setActionMessage(`${selectedUser.name} has been deleted`)
    } catch (err) {
      setActionMessage(err.message)
    } finally {
      setShowDeleteModal(false)
      setSelectedUser(null)
    }
  }

  const closeDeleteModal = () => {
    setShowDeleteModal(false)
    setSelectedUser(null)
  }

  const closeProfileModal = () => {
    setShowProfileModal(false)
    setSelectedUser(null)
  }

  const getStatusStyle = (status) => {
    if (status === 'Active')    return { backgroundColor: '#dcfce7', color: '#166534' }
    if (status === 'Suspended') return { backgroundColor: '#fee2e2', color: '#991b1b' }
    return { backgroundColor: '#f3f4f6', color: '#374151' }
  }

  const cardStyle = {
    backgroundColor: 'white',
    borderRadius: isMobile ? '14px' : '16px',
    padding: isMobile ? '16px' : '20px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
    border: '1px solid #e5e7eb',
    minWidth: 0,
  }

  const buttonStyle = {
    border: 'none',
    borderRadius: '8px',
    padding: '8px 12px',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: '600',
  }

  const inputStyle = {
    width: '100%',
    padding: isMobile ? '12px 14px' : '10px 12px',
    borderRadius: '10px',
    border: '1px solid #d1d5db',
    fontSize: isMobile ? '16px' : '14px',
    boxSizing: 'border-box',
    minWidth: 0,
    backgroundColor: 'white',
  }

  return (
    <AdminLayout>
      <div style={{ minWidth: 0 }}>
        <h1 style={{ marginBottom: '8px', color: '#111827', fontSize: isMobile ? '30px' : '40px', lineHeight: 1.1 }}>
          User Directory
        </h1>
        <p style={{ marginBottom: isMobile ? '20px' : '24px', color: '#6b7280', fontSize: isMobile ? '16px' : '18px' }}>
          Search, filter, and manage platform users.
        </p>

        {actionMessage && (
          <div style={{ backgroundColor: '#ecfdf5', color: '#065f46', padding: '12px 16px', borderRadius: '10px', marginBottom: '16px', fontWeight: '600', border: '1px solid #10b981' }}>
            {actionMessage}
          </div>
        )}

        {error && (
          <div style={{ backgroundColor: '#fee2e2', color: '#991b1b', padding: '12px 16px', borderRadius: '10px', marginBottom: '16px', fontWeight: '600', border: '1px solid #ef4444' }}>
            {error}
          </div>
        )}

        <div style={cardStyle}>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '2fr 1fr 1fr', gap: '12px', marginBottom: '20px', minWidth: 0 }}>
            <input
              type="text"
              placeholder="Search by name or email"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={inputStyle}
            />
            <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)} style={inputStyle}>
              <option value="All">All Roles</option>
              <option value="Explorer">Explorer</option>
              <option value="Guide">Guide</option>
              <option value="Admin">Admin</option>
            </select>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} style={inputStyle}>
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Suspended">Suspended</option>
            </select>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#6b7280' }}>
              Loading users...
            </div>
          ) : (
            <div style={{ width: '100%', overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
              <table style={{ width: '100%', minWidth: '760px', borderCollapse: 'collapse' }}>
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
                    <tr key={user._id}>
                      <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>{user.name}</td>
                      <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>{user.email}</td>
                      <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', textTransform: 'capitalize' }}>{user.role}</td>
                      <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                        {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                      </td>
                      <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                        <span style={{ ...getStatusStyle(user.status || 'Active'), padding: '6px 10px', borderRadius: '999px', fontSize: '13px', fontWeight: '600', whiteSpace: 'nowrap' }}>
                          {user.status || 'Active'}
                        </span>
                      </td>
                      <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                          <button
                            style={{ ...buttonStyle, backgroundColor: '#2E5C4E', color: 'white' }}
                            onClick={() => { setSelectedUser(user); setShowProfileModal(true) }}
                          >
                            View Profile
                          </button>
                          <button
                            style={{ ...buttonStyle, backgroundColor: user.status === 'Suspended' ? '#9ca3af' : '#f59e0b', color: 'white', cursor: user.status === 'Suspended' ? 'not-allowed' : 'pointer' }}
                            onClick={() => handleSuspend(user._id)}
                            disabled={user.status === 'Suspended'}
                          >
                            Suspend Account
                          </button>
                          <button
                            style={{ ...buttonStyle, backgroundColor: '#dc2626', color: 'white' }}
                            onClick={() => handleDeleteClick(user)}
                          >
                            Delete Account
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredUsers.length === 0 && (
                    <tr>
                      <td colSpan="6" style={{ padding: '20px', textAlign: 'center', color: '#6b7280' }}>
                        No users found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Profile Modal */}
        {showProfileModal && selectedUser && (
          <div
            style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999, padding: isMobile ? '16px' : '20px' }}
            onClick={closeProfileModal}
          >
            <div
              style={{ backgroundColor: 'white', width: '100%', maxWidth: '500px', borderRadius: '16px', padding: isMobile ? '18px' : '24px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)', maxHeight: '90vh', overflowY: 'auto' }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', gap: '12px' }}>
                <h2 style={{ margin: 0, color: '#111827' }}>User Profile</h2>
                <button onClick={closeProfileModal} style={{ background: 'transparent', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#6b7280' }}>×</button>
              </div>
              <div style={{ display: 'grid', gap: '12px' }}>
                <p><strong>Name:</strong> {selectedUser.name}</p>
                <p><strong>Email:</strong> {selectedUser.email}</p>
                <p><strong>Role:</strong> {selectedUser.role}</p>
                <p><strong>Join Date:</strong> {selectedUser.createdAt ? new Date(selectedUser.createdAt).toLocaleDateString() : 'N/A'}</p>
                <p><strong>Status:</strong> {selectedUser.status || 'Active'}</p>
                {selectedUser.university && <p><strong>University:</strong> {selectedUser.university}</p>}
                {selectedUser.major && <p><strong>Major:</strong> {selectedUser.major}</p>}
                {selectedUser.recommendedMajors?.length > 0 && (
                  <div>
                    <strong>Recommended Majors:</strong>
                    <ul style={{ marginTop: '8px' }}>
                      {selectedUser.recommendedMajors.map((major, i) => <li key={i}>{major}</li>)}
                    </ul>
                  </div>
                )}
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                <button onClick={closeProfileModal} style={{ backgroundColor: '#2E5C4E', color: 'white', border: 'none', padding: '10px 16px', borderRadius: '10px', cursor: 'pointer', fontWeight: '600', width: isMobile ? '100%' : 'auto' }}>
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Modal */}
        {showDeleteModal && selectedUser && (
          <div
            style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999, padding: isMobile ? '16px' : '20px' }}
            onClick={closeDeleteModal}
          >
            <div
              style={{ backgroundColor: 'white', width: '100%', maxWidth: '480px', borderRadius: '16px', padding: isMobile ? '18px' : '24px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}
              onClick={(e) => e.stopPropagation()}
            >
              <h2 style={{ marginTop: 0, color: '#111827' }}>Confirm Delete</h2>
              <p style={{ color: '#4b5563', marginBottom: '20px' }}>
                Are you sure you want to delete <strong>{selectedUser.name}</strong>? This action cannot be undone.
              </p>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', flexDirection: isMobile ? 'column' : 'row' }}>
                <button onClick={closeDeleteModal} style={{ ...buttonStyle, backgroundColor: '#e5e7eb', color: '#111827', width: isMobile ? '100%' : 'auto' }}>
                  Cancel
                </button>
                <button onClick={confirmDelete} style={{ ...buttonStyle, backgroundColor: '#dc2626', color: 'white', width: isMobile ? '100%' : 'auto' }}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}