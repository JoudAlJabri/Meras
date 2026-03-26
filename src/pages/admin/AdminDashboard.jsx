
import AdminLayout from '../../layouts/AdminLayout'
import { mockUsers, mockChallenges, mockMentors,mockPendingApplications } from '../../data/mockData'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
export default function AdminDashboard() {
  const totalUsers = mockUsers.length
  const activeChallenges = mockChallenges.length

  const pendingVerifications = mockPendingApplications.filter(
    (app) => app.role === 'guide' && app.status === 'Pending'
  ).length

  const totalSessions = mockMentors.reduce(
    (sum, mentor) => sum + (mentor.totalSessions || 0),
    0
  )

  const recentSignUps = [...mockUsers].reverse()

  const recentActivity = [
    'New explorer account created: Sara Mohammed',
    'Guide verified: Rana Abdullah',
    'Admin account accessed dashboard',
    '3 active challenges available',
    'Mentor sessions updated',
  ]

  const userGrowthData = [
    { name: 'Jan', users: 0 },
    { name: 'Feb', users: 1 },
    { name: 'Mar', users: 2 },
    { name: 'Apr', users: 3 },
  ]

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
        <h1 style={{ marginBottom: '8px', color: '#111827' }}>Admin Dashboard</h1>
        <p style={{ marginBottom: '24px', color: '#6b7280' }}>
          Overview of users, challenges, verifications, and sessions.
        </p>

        {/* Stats Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '16px',
            marginBottom: '24px',
          }}
        >
          <div style={cardStyle}>
            <p style={{ margin: 0, color: '#6b7280', fontSize: '14px' }}>Total Users</p>
            <h2 style={{ margin: '10px 0 0', color: '#111827' }}>{totalUsers}</h2>
          </div>

          <div style={cardStyle}>
            <p style={{ margin: 0, color: '#6b7280', fontSize: '14px' }}>Active Challenges</p>
            <h2 style={{ margin: '10px 0 0', color: '#111827' }}>{activeChallenges}</h2>
          </div>

          <div style={cardStyle}>
            <p style={{ margin: 0, color: '#6b7280', fontSize: '14px' }}>Pending Verifications</p>
            <h2 style={{ margin: '10px 0 0', color: '#111827' }}>{pendingVerifications}</h2>
          </div>

          <div style={cardStyle}>
            <p style={{ margin: 0, color: '#6b7280', fontSize: '14px' }}>Total Sessions</p>
            <h2 style={{ margin: '10px 0 0', color: '#111827' }}>{totalSessions}</h2>
          </div>
        </div>

        {/* Chart + Recent Activity */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr',
            gap: '16px',
            marginBottom: '24px',
          }}
        >
          <div style={cardStyle}>
            <h3 style={{ marginTop: 0, marginBottom: '16px', color: '#111827' }}>
              User Growth
            </h3>

            <div style={{ width: '100%', height: 280 }}>
              <ResponsiveContainer>
                <BarChart data={userGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey="users" fill="#22c55e" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div style={cardStyle}>
            <h3 style={{ marginTop: 0, marginBottom: '16px', color: '#111827' }}>
              Recent Activity
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {recentActivity.map((activity, index) => (
                <div
                  key={index}
                  style={{
                    padding: '12px',
                    borderRadius: '10px',
                    backgroundColor: '#f9fafb',
                    border: '1px solid #e5e7eb',
                    color: '#374151',
                    fontSize: '14px',
                  }}
                >
                  {activity}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Sign-ups Table */}
        <div style={cardStyle}>
          <h3 style={{ marginTop: 0, marginBottom: '16px', color: '#111827' }}>
            Recent Sign-ups
          </h3>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
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
                      {user.role === 'guide'
                        ? user.isVerified
                          ? 'Verified'
                          : 'Pending'
                        : 'Active'}
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