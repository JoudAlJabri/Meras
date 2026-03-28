import { useState } from 'react'
import AdminLayout from '../../layouts/AdminLayout'

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const times = ['9:00 AM', '11:00 AM', '1:00 PM', '3:00 PM', '5:00 PM']

const initialSlots = times.flatMap((time) =>
  days.map((day, index) => ({
    id: `${day}-${time}`,
    day,
    time,
    available: false,
    isWeekend: index === 5 || index === 6
  }))
)

export default function OfficeHoursCalendar() {
  const [slots, setSlots] = useState(initialSlots)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('success')

  const toggleSlot = (id) => {
    setSlots((prev) =>
      prev.map((slot) =>
        slot.id === id ? { ...slot, available: !slot.available } : slot
      )
    )
  }

  const saveSchedule = () => {
    const selectedCount = slots.filter((slot) => slot.available).length

    if (selectedCount === 0) {
      setMessageType('warning')
      setMessage('Please select at least one available slot before saving.')
      return
    }

    setMessageType('success')
    setMessage(`Schedule saved successfully. ${selectedCount} slot(s) selected.`)

    setTimeout(() => {
      setMessage('')
    }, 3000)
  }

  const getSlot = (day, time) => {
    return slots.find((slot) => slot.day === day && slot.time === time)
  }

  const pageTitle = {
    fontSize: '40px',
    fontWeight: '700',
    marginBottom: '20px'
  }

  const card = {
    background: 'white',
    padding: '20px',
    borderRadius: '16px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.06)'
  }

  const infoBox = {
    marginBottom: '16px',
    padding: '12px 16px',
    borderRadius: '12px',
    fontWeight: '500',
    background: messageType === 'success' ? '#e8f7ee' : '#fff4e5',
    color: messageType === 'success' ? '#1f7a45' : '#9a6700',
    border: `1px solid ${
      messageType === 'success' ? '#b7e4c7' : '#f3d08b'
    }`
  }

  const legendDot = (color) => ({
    width: '14px',
    height: '14px',
    borderRadius: '50%',
    background: color,
    display: 'inline-block',
    marginRight: '8px'
  })

  return (
    <AdminLayout>
      <h1 style={pageTitle}>Office Hours Calendar</h1>

      {message && <div style={infoBox}>{message}</div>}

      <div style={card}>
        <div style={{ marginBottom: '16px', color: '#555' }}>
          Click any slot to mark it as available. Click again to remove it.
        </div>

        <div
          style={{
            display: 'flex',
            gap: '20px',
            flexWrap: 'wrap',
            marginBottom: '18px',
            fontSize: '14px',
            color: '#444'
          }}
        >
          <div>
            <span style={legendDot('#22c55e')}></span>
            Available
          </div>
          <div>
            <span style={legendDot('#e5e7eb')}></span>
            Not available
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table
            style={{
              width: '100%',
              minWidth: '760px',
              borderCollapse: 'separate',
              borderSpacing: '8px'
            }}
          >
            <thead>
              <tr>
                <th
                  style={{
                    textAlign: 'left',
                    padding: '12px',
                    color: '#222',
                    fontSize: '15px'
                  }}
                >
                  Time
                </th>
                {days.map((day) => (
                  <th
                    key={day}
                    style={{
                      textAlign: 'center',
                      padding: '12px',
                      color: '#222',
                      fontSize: '15px'
                    }}
                  >
                    {day}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {times.map((time) => (
                <tr key={time}>
                  <td
                    style={{
                      padding: '12px',
                      fontWeight: '600',
                      color: '#333',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {time}
                  </td>

                  {days.map((day) => {
                    const slot = getSlot(day, time)

                    return (
                      <td key={slot.id}>
                        <button
                          onClick={() => toggleSlot(slot.id)}
                          style={{
                            width: '100%',
                            minHeight: '58px',
                            border: slot.available
                              ? '2px solid #16a34a'
                              : '1px solid #d1d5db',
                            borderRadius: '12px',
                            background: slot.available ? '#22c55e' : '#f3f4f6',
                            color: slot.available ? 'white' : '#374151',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: '0.2s ease'
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

        <div
          style={{
            marginTop: '20px',
            display: 'flex',
            justifyContent: 'flex-end'
          }}
        >
          <button
            onClick={saveSchedule}
            style={{
              background: '#14532d',
              color: 'white',
              border: 'none',
              padding: '12px 20px',
              borderRadius: '12px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Save Schedule
          </button>
        </div>
      </div>
    </AdminLayout>
  )
}