import { useState, useEffect } from 'react'
import AdminLayout from '../../layouts/AdminLayout'
import { useAuth } from '../../context/AuthContext'
import { apiGetOfficeHours, apiSaveOfficeHours } from '../../api/admin'

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const times = ['9:00 AM', '11:00 AM', '1:00 PM', '3:00 PM', '5:00 PM']

const initialSlots = times.flatMap((time) =>
  days.map((day, index) => ({
    id: `${day}-${time}`,
    day,
    time,
    available: false,
    isWeekend: index === 5 || index === 6,
  }))
)

export default function OfficeHoursCalendar() {
  const { getToken } = useAuth()
  const token = getToken()

  const [slots, setSlots] = useState(initialSlots)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('success')

  // ── load saved schedule on mount ──
  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const data = await apiGetOfficeHours(token)

        if (data.slots && data.slots.length > 0) {
          // merge saved availability into the full grid
          setSlots(initialSlots.map((slot) => {
            const saved = data.slots.find((s) => s.id === slot.id)
            return saved ? { ...slot, available: saved.available } : slot
          }))
        }
      } catch (err) {
        showMessage(err.message, 'warning')
      } finally {
        setLoading(false)
      }
    }
    fetchSlots()
  }, [token])

  const showMessage = (msg, type = 'success') => {
    setMessage(msg)
    setMessageType(type)
    setTimeout(() => setMessage(''), 3000)
  }

  const toggleSlot = (id) => {
    setSlots((prev) =>
      prev.map((slot) =>
        slot.id === id ? { ...slot, available: !slot.available } : slot
      )
    )
  }

  // ── save to backend ──
  const saveSchedule = async () => {
    const selectedCount = slots.filter((s) => s.available).length

    if (selectedCount === 0) {
      showMessage('Please select at least one available slot before saving.', 'warning')
      return
    }

    try {
      setSaving(true)
      await apiSaveOfficeHours(token, slots)
      showMessage(`Schedule saved successfully. ${selectedCount} slot(s) selected.`, 'success')
    } catch (err) {
      showMessage(err.message, 'warning')
    } finally {
      setSaving(false)
    }
  }

  const getSlot = (day, time) =>
    slots.find((slot) => slot.day === day && slot.time === time)

  const pageTitle = { fontSize: '40px', fontWeight: '700', marginBottom: '20px' }

  const card = {
    background: 'white', padding: '20px',
    borderRadius: '16px', boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
  }

  const infoBox = {
    marginBottom: '16px', padding: '12px 16px', borderRadius: '12px', fontWeight: '500',
    background: messageType === 'success' ? '#e8f7ee' : '#fff4e5',
    color: messageType === 'success' ? '#1f7a45' : '#9a6700',
    border: `1px solid ${messageType === 'success' ? '#b7e4c7' : '#f3d08b'}`,
  }

  const legendDot = (color) => ({
    width: '14px', height: '14px', borderRadius: '50%',
    background: color, display: 'inline-block', marginRight: '8px',
  })

  if (loading) return (
    <AdminLayout>
      <div style={{ textAlign: 'center', padding: '60px', color: '#6b7280' }}>
        Loading schedule...
      </div>
    </AdminLayout>
  )

  return (
    <AdminLayout>
      <h1 style={pageTitle}>Office Hours Calendar</h1>

      {message && <div style={infoBox}>{message}</div>}

      <div style={card}>
        <div style={{ marginBottom: '16px', color: '#555' }}>
          Click any slot to mark it as available. Click again to remove it.
        </div>

        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginBottom: '18px', fontSize: '14px', color: '#444' }}>
          <div><span style={legendDot('#22c55e')}></span>Available</div>
          <div><span style={legendDot('#e5e7eb')}></span>Not available</div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', minWidth: '760px', borderCollapse: 'separate', borderSpacing: '8px' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', padding: '12px', color: '#222', fontSize: '15px' }}>
                  Time
                </th>
                {days.map((day) => (
                  <th key={day} style={{ textAlign: 'center', padding: '12px', color: '#222', fontSize: '15px' }}>
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {times.map((time) => (
                <tr key={time}>
                  <td style={{ padding: '12px', fontWeight: '600', color: '#333', whiteSpace: 'nowrap' }}>
                    {time}
                  </td>
                  {days.map((day) => {
                    const slot = getSlot(day, time)
                    return (
                      <td key={slot.id}>
                        <button
                          onClick={() => toggleSlot(slot.id)}
                          style={{
                            width: '100%', minHeight: '58px',
                            border: slot.available ? '2px solid #16a34a' : '1px solid #d1d5db',
                            borderRadius: '12px',
                            background: slot.available ? '#22c55e' : '#f3f4f6',
                            color: slot.available ? 'white' : '#374151',
                            fontWeight: '600', cursor: 'pointer', transition: '0.2s ease',
                          }}
                        >
                          {slot.available ? 'Available' : 'Unavailable'}
                        </button>
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
          <button
            onClick={saveSchedule}
            disabled={saving}
            style={{
              background: '#14532d', color: 'white', border: 'none',
              padding: '12px 20px', borderRadius: '12px',
              fontWeight: '600', cursor: saving ? 'default' : 'pointer',
              opacity: saving ? 0.7 : 1,
            }}
          >
            {saving ? 'Saving...' : 'Save Schedule'}
          </button>
        </div>
      </div>
    </AdminLayout>
  )
}