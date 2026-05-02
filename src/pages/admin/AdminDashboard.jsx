import { useEffect, useState } from 'react'
import AdminLayout from '../../layouts/AdminLayout'
import { useAuth } from '../../context/AuthContext'
import { apiGetDashboardStats } from '../../api/admin'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer,
} from 'recharts'

export default function AdminDashboard() {
  const { getToken } = useAuth()
  const token = getToken()

  const [stats, setStats] = useState(null)
  const [recentSignUps, setRecentSignUps] = useState([])
  const [userGrowthData, setUserGrowthData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const data = await apiGetDashboardStats(token)
        setStats(data.stats)
        setRecentSignUps(data.recentSignUps)
        setUserGrowthData(data.userGrowthData)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchDashboard()
  }, [token])

  const cardStyle = {
    backgroundColor: 'white',
    borderRadius: '16px',
    padding: isMobile ? '16px' : '20px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
    border: '1px solid #e5e7eb',
    minWidth: 0,
    boxSizing: 'border-box',
  }

  const statCardBase = {
    borderRadius: '16px',
    padding: isMobile ? '16px' : '20px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
    border: '1px solid #e5e7eb',
    minWidth: 0,
    boxSizing: 'border-box',
  }

  if (loading) return (
    <AdminLayout>
      <div style={{ textAlign: 'center', padding: '60px', color: '#6b7280' }}>
        Loading dashboard...
      </div>
    </AdminLayout>
  )

  if (error) return (
    <AdminLayout>
      <div style={{ backgroundColor: '#fee2e2', color: '#991b1b', padding: '16px', borderRadius: '10px', margin: '20px 0' }}>
        {error}
      </div>
    </AdminLayout>
  )

  return (
    <AdminLayout>
      <div style={{ minWidth: 0 }}>
        <h1 style={{ marginBottom: '8px', color: '#111827', fontSize: isMobile ? '30px' : '40px', lineHeight: 1.1 }}>
          Admin Dashboard
        </h1>
        <p style={{ marginBottom: '24px', color: '#6b7280', fontSize: isMobile ? '16px' : '18px' }}>
          Overview of users, challenges, verifications, and sessions.
        </p>

        {/* Stats Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '16px', marginBottom: '24px', minWidth: 0,
        }}>
          <div style={{ ...statCardBase, backgroundColor: '#f9fafb', borderTop: '4px solid #6b7280' }}>
            <p style={{ margin: 0, color: '#6b7280', fontSize: '14px' }}>Total Users</p>
            <h2 style={{ margin: '10px 0 0', color: '#4b5563' }}>{stats?.totalUsers ?? '—'}</h2>
          </div>

          <div style={{ ...statCardBase, backgroundColor: '#eff6ff', borderTop: '4px solid #3b82f6' }}>
            <p style={{ margin: 0, color: '#6b7280', fontSize: '14px' }}>Active Challenges</p>
            <h2 style={{ margin: '10px 0 0', color: '#2563eb' }}>{stats?.activeChallenges ?? '—'}</h2>
          </div>

          <div style={{ ...statCardBase, backgroundColor: '#fff7ed', borderTop: '4px solid #f59e0b' }}>
            <p style={{ margin: 0, color: '#6b7280', fontSize: '14px' }}>Pending Verifications</p>
            <h2 style={{ margin: '10px 0 0', color: '#d97706' }}>{stats?.pendingVerifications ?? '—'}</h2>
          </div>

          <div style={{ ...statCardBase, backgroundColor: '#f0fdf4', borderTop: '4px solid #22c55e' }}>
            <p style={{ margin: 0, color: '#6b7280', fontSize: '14px' }}>Total Sessions</p>
            <h2 style={{ margin: '10px 0 0', color: '#16a34a' }}>{stats?.totalSessions ?? '—'}</h2>
          </div>
        </div>

        {/* Chart + Recent Sign-ups */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '2fr 1fr',
          gap: '16px', marginBottom: '24px', minWidth: 0,
        }}>
          <div style={cardStyle}>
            <h3 style={{ marginTop: 0, marginBottom: '16px', color: '#111827', fontSize: isMobile ? '20px' : '24px' }}>
              User Growth
            </h3>
            <div style={{ width: '100%', height: '260px', minWidth: 0 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={userGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis allowDecimals={false} />
                  <Tooltip
                    cursor={{ fill: 'rgba(0,0,0,0.06)' }}
                    contentStyle={{ border: '1px solid #e5e7eb', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
                  />
                  <Bar dataKey="users" fill="#22c55e" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent sign-ups — replaces the static recentActivity list */}
          <div style={cardStyle}>
            <h3 style={{ marginTop: 0, marginBottom: '16px', color: '#111827', fontSize: isMobile ? '20px' : '24px' }}>
              Recent Sign-ups
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {recentSignUps.slice(0, 5).map((user) => (
                <div key={user._id} style={{
                  padding: '10px 12px', borderRadius: '10px',
                  backgroundColor: '#f9fafb', border: '1px solid #e5e7eb',
                  fontSize: isMobile ? '15px' : '14px', lineHeight: 1.5,
                }}>
                  <div style={{ fontWeight: '600', color: '#111827' }}>{user.name}</div>
                  <div style={{ color: '#6b7280', fontSize: '12px', textTransform: 'capitalize' }}>
                    {user.role} · {new Date(user.createdAt).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Sign-ups Table */}
        <div style={cardStyle}>
          <h3 style={{ marginTop: 0, marginBottom: '16px', color: '#111827', fontSize: isMobile ? '20px' : '24px' }}>
            Recent Sign-ups
          </h3>
          <div style={{ overflowX: 'auto', width: '100%' }}>
            <table style={{ width: '100%', minWidth: '600px', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#f9fafb', textAlign: 'left' }}>
                  <th style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>Name</th>
                  <th style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>Email</th>
                  <th style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>Role</th>
                  <th style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentSignUps.map((user) => (
                  <tr key={user._id}>
                    <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>{user.name}</td>
                    <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>{user.email}</td>
                    <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', textTransform: 'capitalize' }}>{user.role}</td>
                    <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                      {user.role === 'guide'
                        ? user.guideStatus === 'approved' ? 'Verified' : 'Pending'
                        : user.status || 'Active'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}