
import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom' // using react's React Router library
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/common/ProtectedRoute'
import LandingPage from './pages/auth/LandingPage'
import LoginPage from './pages/auth/LoginPage'
import SignUpExplorer from './pages/auth/SignUpExplorer'
import SignUpGuide from './pages/auth/SignUpGuide'
import EmailVerification from './pages/auth/EmailVerification'
import GuideWaitingRoom from './pages/auth/GuideWaitingRoom'
import ChallengeCatalog from './pages/explorer/Challenge/ChallengeCatalog'
import ChallengeDetail from './pages/explorer/Challenge/ChallengeDetail'
// Explorer Pages
import ExplorerDashboard from './pages/explorer/ExplorerDashboard'
// Guide Pages
import GuideDashboard from './pages/guide/GuideDashboard'
// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard'
import PendingVerifications from './pages/admin/PendingVerifications'
import UserDirectory from './pages/admin/UserDirectory'
import Announcements from './pages/admin/Announcements'
import ContentModeration from './pages/admin/ContentModeration'
import OfficeHoursCalendar from './pages/admin/OfficeHoursCalendar'
import EarningsDashboard from './pages/admin/EarningsDashboard'
import TaxonomyManagement from './pages/admin/TaxonomyManagement'


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
          <Route path="/explorer/challengeCatalog" element={
            <ProtectedRoute allowedRoles={['explorer']}>
              <ChallengeCatalog />
            </ProtectedRoute>
          } />
          <Route path="/explorer/challenges/:index" element={
            <ProtectedRoute allowedRoles={['explorer']}>
              <ChallengeDetail />
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
          <Route path="/admin" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          } />
          <Route path="/admin/pending-verifications" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <PendingVerifications />
            </ProtectedRoute>
          } />

          <Route path="/admin/users" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <UserDirectory />
            </ProtectedRoute>
          } />

          <Route path="/admin/content-moderation" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <ContentModeration />
            </ProtectedRoute>
          } />

          <Route path="/admin/announcements" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <Announcements />
            </ProtectedRoute>
          } />

          <Route path="/admin/taxonomy" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <TaxonomyManagement />
            </ProtectedRoute>
          } />

          <Route path="/admin/earnings" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <EarningsDashboard />
            </ProtectedRoute>
          } />

          <Route path="/admin/office-hours" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <OfficeHoursCalendar />
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
