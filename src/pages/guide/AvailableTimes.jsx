import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Guide.css'
import clocking from "../../assets/General-Graphics/girlHoldingClock.png"

const TIME_SLOTS = [
  '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM',
  '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM',
  '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM',
]

// by weeekly reservation
const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

// returns the Sunday that starts the week containing `date`
function getWeekStart(date) {
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)
  d.setDate(d.getDate() - d.getDay())
  return d
}

function addDays(date, n) {
  const d = new Date(date)
  d.setDate(d.getDate() + n)
  return d
}

function fmt(date) {
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

function dateKey(date) {
  return date.toISOString().slice(0, 10) // YYYY-MM-DD
}

function AvailableTimes() {
  const navigate  = useNavigate()
  const today     = new Date(); today.setHours(0,0,0,0)
  const thisWeek  = getWeekStart(today)

  const [weekStart, setWeekStart]   = useState(thisWeek)
  const [selected, setSelected]     = useState({}) // { 'YYYY-MM-DD': Set<time> }
  const [saved, setSaved]           = useState(false)

  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i))
  const weekEnd  = addDays(weekStart, 6)

  const isPrevDisabled = weekStart <= thisWeek

  function prevWeek() {
    if (!isPrevDisabled) setWeekStart(w => addDays(w, -7))
  }
  function nextWeek() {
    setWeekStart(w => addDays(w, 7))
    setSaved(false)
  }

  function toggle(day, time) {
    const key = dateKey(day)
    setSelected(prev => {
      const set = new Set(prev[key] ?? [])
      set.has(time) ? set.delete(time) : set.add(time)
      return { ...prev, [key]: set }
    })
    setSaved(false)
  }

  function isSelected(day, time) {
    return selected[dateKey(day)]?.has(time) ?? false
  }

  function isPastDay(day) {
    return day < today
  }

  function totalSelected() {
    return Object.values(selected).reduce((acc, set) => acc + set.size, 0)
  }

  function handleSave() {
    // In a real app this would call an API
    setSaved(true)
  }

  return (
    <div className="at-wrap">

      {/* Header */}
      <div className="at-header">
        <div>
          <h2 className="at-title">Set Available Times</h2>
          <p className="at-subtitle">Choose the time slots you're available each week.</p>
        </div>
        <img src={clocking }alt="clocking" width={50}/>
      </div>

      {/* Week navigator */}
      <div className="at-week-nav">
        <button
          className="at-week-arrow"
          onClick={prevWeek}
          disabled={isPrevDisabled}
        >
          ‹
        </button>
        <span className="at-week-label">
          {fmt(weekStart)} — {fmt(weekEnd)}
        </span>
        <button className="at-week-arrow" onClick={nextWeek}>
          ›
        </button>
      </div>

      {/* Day columns */}
      <div className="at-grid">
        {weekDays.map((day) => {
          const past      = isPastDay(day)
          const isToday   = dateKey(day) === dateKey(today)
          const daySlots  = selected[dateKey(day)]

          return (
            <div key={dateKey(day)} className={`at-day-col ${past ? 'at-day-past' : ''}`}>
              {/* Day header */}
              <div className={`at-day-header ${isToday ? 'at-day-today' : ''}`}>
                <span className="at-day-name">{DAY_NAMES[day.getDay()]}</span>
                <span className="at-day-date">{fmt(day)}</span>
                {daySlots?.size > 0 && (
                  <span className="at-day-count">{daySlots.size}</span>
                )}
              </div>

              {/* Time slots */}
              <div className="at-slots">
                {TIME_SLOTS.map((time) => (
                  <button
                    key={time}
                    className="at-slot"
                    disabled={past}
                    style={
                      isSelected(day, time)
                        ? { backgroundColor: 'var(--meras-green)', color: 'white', borderColor: 'var(--meras-green)' }
                        : {}
                    }
                    onClick={() => toggle(day, time)}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {/* Footer */}
      <div className="at-footer">
        <span className="at-footer-count">
          {totalSelected()} slot{totalSelected() !== 1 ? 's' : ''} selected this week
        </span>
        <button
          className="at-save-btn"
          disabled={totalSelected() === 0}
          style={totalSelected() > 0 ? { backgroundColor: 'var(--meras-green)', color: 'white', opacity: 1 } : {}}
          onClick={handleSave}
        >
          {saved ? '✓ Saved!' : 'Save Availability'}
        </button>
      </div>

    </div>
  )
}

export default AvailableTimes
