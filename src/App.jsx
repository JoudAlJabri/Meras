
import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/common/ProtectedRoute'
import LandingPage from './pages/auth/LandingPage'
import LoginPage from './pages/auth/LoginPage'
import SignUpExplorer from './pages/auth/SignUpExplorer'
import SignUpGuide from './pages/auth/SignUpGuide'
import EmailVerification from './pages/auth/EmailVerification'
import GuideWaitingRoom from './pages/auth/GuideWaitingRoom'
// Explorer Pages
import ExplorerDashboard from './pages/explorer/ExplorerDashboard'
// Guide Pages
import GuideDashboard from './pages/guide/GuideDashboard'
// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          {/* ── PUBLIC ROUTES ── */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup/explorer" element={<SignUpExplorer />} />
          <Route path="/signup/guide" element={<SignUpGuide />} />
          <Route path="/verify-email" element={<EmailVerification />} />
          <Route path="/waiting-room" element={<GuideWaitingRoom />} />

          {/* ── EXPLORER ROUTES ── */}
          <Route path="/explorer/dashboard" element={
            <ProtectedRoute allowedRoles={['explorer']}>
              <ExplorerDashboard />
            </ProtectedRoute>
          } />
          {/* add more explorer routes here */}

          {/* ── GUIDE ROUTES ── */}
          <Route path="/guide/dashboard" element={
            <ProtectedRoute allowedRoles={['guide']}>
              <GuideDashboard />
            </ProtectedRoute>
          } />
          {/* add more guide routes here */}

          {/* ── ADMIN ROUTES ── */}
          <Route path="/admin/dashboard" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          } />
          {/* add more admin routes here */}

          {/* ── FALLBACK ── */}
          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
