import { useEffect, useState } from 'react'
import AdminLayout from '../../layouts/AdminLayout'
import { useAuth } from '../../context/AuthContext'
import {
  apiGetTaxonomy,
  apiAddUniversity,
  apiDeleteUniversity,
  apiAddMajor,
  apiDeleteMajor,
} from '../../api/admin'

export default function TaxonomyManagement() {
  const { getToken } = useAuth()
  const token = getToken()

  const [universities, setUniversities] = useState([])
  const [majors, setMajors] = useState([])

  const [newUniversity, setNewUniversity] = useState('')
  const [newMajor, setNewMajor] = useState('')

  const [universityMessage, setUniversityMessage] = useState('')
  const [majorMessage, setMajorMessage] = useState('')
  const [majorMessageType, setMajorMessageType] = useState('')

  useEffect(() => {
    apiGetTaxonomy(token)
      .then((data) => {
        setUniversities(data.universities)
        setMajors(data.majors)
      })
      .catch((err) => console.error(err))
  }, [token])

  useEffect(() => {
    if (!universityMessage) return
    const timer = setTimeout(() => setUniversityMessage(''), 3000)
    return () => clearTimeout(timer)
  }, [universityMessage])

  useEffect(() => {
    if (!majorMessage) return
    const timer = setTimeout(() => setMajorMessage(''), 3000)
    return () => clearTimeout(timer)
  }, [majorMessage])

  const addUniversity = async () => {
    if (!newUniversity.trim()) return
    try {
      const data = await apiAddUniversity(token, newUniversity.trim())
      setUniversities(data.universities)
      setUniversityMessage(`${newUniversity.trim()} has been added`)
      setNewUniversity('')
    } catch (err) {
      setUniversityMessage(err.message)
    }
  }

  const deleteUniversity = async (name) => {
    try {
      const data = await apiDeleteUniversity(token, name)
      setUniversities(data.universities)
      setUniversityMessage(`${name} has been deleted`)
    } catch (err) {
      setUniversityMessage(err.message)
    }
  }

  const addMajor = async () => {
    const majorToAdd = newMajor.trim()
    if (!majorToAdd) {
      setMajorMessage('Please enter a major name')
      setMajorMessageType('error')
      return
    }
    try {
      const data = await apiAddMajor(token, majorToAdd)
      setMajors(data.majors)
      setMajorMessage('New major added to system catalog')
      setMajorMessageType('success')
      setNewMajor('')
    } catch (err) {
      setMajorMessage(err.message)
      setMajorMessageType('error')
    }
  }

  const deleteMajor = async (name) => {
    try {
      const data = await apiDeleteMajor(token, name)
      setMajors(data.majors)
      setMajorMessage(`${name} has been deleted`)
      setMajorMessageType('success')
    } catch (err) {
      setMajorMessage(err.message)
      setMajorMessageType('error')
    }
  }

  const cardStyle = {
    backgroundColor: 'white',
    borderRadius: '16px',
    padding: '24px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
    border: '1px solid #e5e7eb',
    marginBottom: '24px',
  }

  const inputStyle = {
    flex: 1,
    padding: '10px 12px',
    borderRadius: '10px',
    border: '1px solid #d1d5db',
    fontSize: '14px',
  }

  const addButtonStyle = {
    backgroundColor: '#2E5C4E',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    padding: '10px 16px',
    cursor: 'pointer',
    fontWeight: '600',
  }

  const deleteButtonStyle = {
    backgroundColor: '#dc2626',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    padding: '8px 12px',
    cursor: 'pointer',
    fontWeight: '600',
  }

  return (
    <AdminLayout>
      <div>
        <h1 style={{ marginBottom: '8px', color: '#111827' }}>Taxonomy Management</h1>
        <p style={{ marginBottom: '24px', color: '#6b7280' }}>
          Manage universities and majors shown across the platform.
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px',
            alignItems: 'start',
          }}
        >
          {/* Universities Section */}
          <div style={cardStyle}>
            <h2 style={{ marginTop: 0, marginBottom: '16px', color: '#111827' }}>
              Universities
            </h2>

            {universityMessage && (
              <div
                style={{
                  backgroundColor: '#ecfdf5',
                  color: '#065f46',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  marginBottom: '12px',
                  fontWeight: '600',
                  border: '1px solid #10b981',
                  fontSize: '14px',
                }}
              >
                {universityMessage}
              </div>
            )}

            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
              <input
                type="text"
                placeholder="Add new university"
                value={newUniversity}
                onChange={(e) => setNewUniversity(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addUniversity()}
                style={inputStyle}
              />
              <button onClick={addUniversity} style={addButtonStyle}>
                Add New
              </button>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f9fafb', textAlign: 'left' }}>
                    <th style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                      University
                    </th>
                    <th style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {universities.map((university) => (
                    <tr
                      key={university}
                      style={{ transition: 'background 0.2s' }}
                      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#f9fafb' }}
                      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent' }}
                    >
                      <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                        {university}
                      </td>
                      <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                        <button
                          onClick={() => deleteUniversity(university)}
                          style={deleteButtonStyle}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Majors Section */}
          <div style={cardStyle}>
            <h2 style={{ marginTop: 0, marginBottom: '16px', color: '#111827' }}>
              Majors
            </h2>

            {majorMessage && (
              <div
                style={{
                  backgroundColor: majorMessageType === 'error' ? '#fef2f2' : '#ecfdf5',
                  color: majorMessageType === 'error' ? '#991b1b' : '#065f46',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  marginBottom: '12px',
                  fontWeight: '600',
                  border: majorMessageType === 'error' ? '1px solid #ef4444' : '1px solid #10b981',
                  fontSize: '14px',
                }}
              >
                {majorMessage}
              </div>
            )}

            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
              <input
                type="text"
                placeholder="Add new major"
                value={newMajor}
                onChange={(e) => setNewMajor(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addMajor()}
                style={inputStyle}
              />
              <button onClick={addMajor} style={addButtonStyle}>
                Add New
              </button>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f9fafb', textAlign: 'left' }}>
                    <th style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                      Major
                    </th>
                    <th style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {majors.map((major) => (
                    <tr
                      key={major}
                      style={{ transition: 'background 0.2s' }}
                      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#f9fafb' }}
                      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent' }}
                    >
                      <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                        {major}
                      </td>
                      <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                        <button
                          onClick={() => deleteMajor(major)}
                          style={deleteButtonStyle}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
