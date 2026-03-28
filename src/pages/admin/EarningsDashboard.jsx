import AdminLayout from '../../layouts/AdminLayout'
import { mockGuideEarnings } from '../../data/mockData'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts'

export default function EarningsDashboard() {
  const totalIncome = mockGuideEarnings.reduce((sum, e) => sum + e.amount, 0)
  const totalSessions = mockGuideEarnings.length

  const isMobile = window.innerWidth <= 768

  const card = {
    padding: isMobile ? '16px' : '20px',
    background: 'white',
    borderRadius: '16px',
    marginBottom: '20px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
  }

  const incomeCard = {
    flex: 1,
    padding: isMobile ? '16px' : '20px',
    background: '#e6f4ea', 
    borderRadius: '16px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
  }
  
  const sessionsCard = {
    flex: 1,
    padding: isMobile ? '16px' : '20px',
    background: '#e7f0ff', 
    borderRadius: '16px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
  }
  const labelStyle = {
    fontSize: '14px',
    color: '#666',
    marginBottom: '6px'
  }

  const valueStyle = {
    fontSize: isMobile ? '24px' : '28px',
    fontWeight: '700',
    color: '#1f1f1f'
  }

  return (
    <AdminLayout>
      <h1 style={{ fontSize: isMobile ? '34px' : '40px', marginBottom: '20px' }}>
        Earnings Dashboard
      </h1>
      <p
        style={{
          marginBottom: '24px',
          color: '#6b7280',
          fontSize: isMobile ? '16px' : '18px',
        }}
      >
        Overview of mentor earnings, session activity, and income trends.
      </p>

      {/* Stats */}
      <div
        style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          gap: '16px',
          marginBottom: '20px'
        }}
      >
        <div style={incomeCard}>
          <div style={labelStyle}>Total Income</div>
          <div style={valueStyle}>{totalIncome} SAR</div>
        </div>

        <div style={sessionsCard}>
          <div style={labelStyle}>Total Sessions</div>
          <div style={valueStyle}>{totalSessions}</div>
        </div>
      </div>

      {/* Earnings List */}
      <div style={card}>
        <h2 style={{ marginTop: 0, marginBottom: '16px', fontSize: '22px' }}>
          Session Earnings
        </h2>

        {isMobile ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {mockGuideEarnings.map((e) => (
              <div
                key={e.id}
                style={{
                  border: '1px solid #e8e8e8',
                  borderRadius: '14px',
                  padding: '14px',
                  background: '#fafafa'
                }}
              >
                <div style={{ fontWeight: '700', fontSize: '18px', marginBottom: '10px' }}>
                  {e.studentName}
                </div>

                <div style={{ marginBottom: '6px' }}>
                  <strong>Date:</strong> {e.sessionDate}
                </div>
                <div style={{ marginBottom: '6px' }}>
                  <strong>Duration:</strong> {e.duration}
                </div>
                <div>
                  <strong>Amount:</strong> {e.amount} SAR
                </div>
              </div>
            ))}
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', paddingBottom: '12px' }}>Student</th>
                <th style={{ textAlign: 'left', paddingBottom: '12px' }}>Date</th>
                <th style={{ textAlign: 'left', paddingBottom: '12px' }}>Duration</th>
                <th style={{ textAlign: 'left', paddingBottom: '12px' }}>Amount</th>
              </tr>
            </thead>
            <tbody>
              {mockGuideEarnings.map((e) => (
                <tr key={e.id} style={{ borderTop: '1px solid #eee' }}>
                  <td style={{ padding: '12px 0' }}>{e.studentName}</td>
                  <td>{e.sessionDate}</td>
                  <td>{e.duration}</td>
                  <td>{e.amount} SAR</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Chart */}
      <div style={card}>
        <h2 style={{ marginTop: 0, marginBottom: '16px', fontSize: '22px' }}>
          Earnings Trend
        </h2>

        <ResponsiveContainer width="100%" height={isMobile ? 220 : 300}>
          <LineChart data={mockGuideEarnings}>
            <XAxis dataKey="sessionDate" tick={{ fontSize: 12 }} />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="amount" stroke="#2f6f5f" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </AdminLayout>
  )
}