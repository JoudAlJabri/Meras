import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom' // using react's React Router library
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/common/ProtectedRoute'
import LandingPage from './pages/auth/LandingPage'
import LoginPage from './pages/auth/LoginPage'
import SignUpExplorer from './pages/auth/SignUpExplorer'
import SignUpGuide from './pages/auth/SignUpGuide'
import EmailVerification from './pages/auth/EmailVerification'
import EmailVerified from './pages/auth/EmailVerified'
import GuideWaitingRoom from './pages/auth/GuideWaitingRoom'
import ExplorerLayout from './layouts/ExplorerLayout'

// Explorer Pages
import ExplorerDashboard from './pages/explorer/ExplorerDashboard'
import TaskWorkspace from './pages/explorer/Challenge/TaskWorkspace'
import ChallengeCatalog from './pages/explorer/Challenge/ChallengeCatalog'
import ChallengeDetail from './pages/explorer/Challenge/ChallengeDetail'
import SavedChallenges from './pages/explorer/Challenge/SavedChallenges'
import CompassQuiz from './pages/explorer/CompassQuiz'
import QuizResults from './pages/explorer/QuizResults'

// Guide Pages
import GuideLayout from './layouts/GuideLayout';
import GuideDashboard from './pages/guide/GuideDashboard'
import MentorDirectory from './pages/guide/MentorDirectory'
import MentorProfile from './pages/guide/MentorProfile'
import BookingPage from './pages/guide/BookingPage'
import TaskWizard from './pages/guide/TaskWizard'
import GradingView from './pages/guide/GradingView'
import GuideSettings from './pages/guide/GuideSettings'
import AvailableTimes from './pages/guide/AvailableTimes'

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard'
import PendingVerifications from './pages/admin/PendingVerifications'
import UserDirectory from './pages/admin/UserDirectory'
import Announcements from './pages/admin/Announcements'
import ContentModeration from './pages/admin/ContentModeration'
import OfficeHoursCalendar from './pages/admin/OfficeHoursCalendar'
import EarningsDashboard from './pages/admin/EarningsDashboard'
import TaxonomyManagement from './pages/admin/TaxonomyManagement'
import SubmissionConfirmation from './pages/explorer/Challenge/SubmissionConfirmation'
import ExplorerSettings from './pages/explorer/ExplorerSettings'


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
          <Route path="/email-verified/:token" element={<EmailVerified />} />
          <Route path="/waiting-room" element={<GuideWaitingRoom />} />

          {/* ── EXPLORER ROUTES ── */}
          <Route path="/explorer/dashboard" element={
            <ProtectedRoute allowedRoles={['explorer']}>
              <ExplorerLayout><ExplorerDashboard /></ExplorerLayout>
            </ProtectedRoute>
          } />
          <Route path="/explorer/challengeCatalog" element={
            <ProtectedRoute allowedRoles={['explorer']}>
              <ExplorerLayout><ChallengeCatalog /></ExplorerLayout>
            </ProtectedRoute>
          } />
          <Route path="/explorer/savedChallenges" element={
            <ProtectedRoute allowedRoles={['explorer']}>
              <ExplorerLayout><SavedChallenges /></ExplorerLayout>
            </ProtectedRoute>
          } />
          <Route path="/explorer/challenges/:id" element={
            <ProtectedRoute allowedRoles={['explorer']}>
              <ExplorerLayout><ChallengeDetail /></ExplorerLayout>
            </ProtectedRoute>
          } />
          <Route path="/explorer/workspace/:id" element={
            <ProtectedRoute allowedRoles={['explorer']}>
              <ExplorerLayout><TaskWorkspace /></ExplorerLayout>
            </ProtectedRoute>
          } />
          <Route path="/explorer/submission-confirmation/:id" element={
            <ProtectedRoute allowedRoles={['explorer']}>
              <ExplorerLayout><SubmissionConfirmation /></ExplorerLayout>
            </ProtectedRoute>
          } />
          <Route path="/explorer/mentors" element={
            <ProtectedRoute allowedRoles={['explorer']}>
              <ExplorerLayout><MentorDirectory profilePath="/explorer/mentors/profile" /></ExplorerLayout>
            </ProtectedRoute>
          } />
          <Route path="/explorer/mentors/profile" element={
            <ProtectedRoute allowedRoles={['explorer']}>
              <ExplorerLayout><MentorProfile bookingPath="/explorer/mentors/booking" /></ExplorerLayout>
            </ProtectedRoute>
          } />
          <Route path="/explorer/mentors/booking" element={
            <ProtectedRoute allowedRoles={['explorer']}>
              <ExplorerLayout><BookingPage /></ExplorerLayout>
            </ProtectedRoute>
          } />
          <Route path="/explorer/compass-quiz" element={
            <ProtectedRoute allowedRoles={['explorer']}>
              <ExplorerLayout><CompassQuiz /></ExplorerLayout>
            </ProtectedRoute>
          } />
          <Route path="/explorer/quiz-results" element={
            <ProtectedRoute allowedRoles={['explorer']}>
              <ExplorerLayout><QuizResults /></ExplorerLayout>
            </ProtectedRoute>
          } />
          <Route path="/explorer/settings" element={
            <ProtectedRoute allowedRoles={['explorer']}>
              <ExplorerLayout><ExplorerSettings /></ExplorerLayout>
            </ProtectedRoute>
          } />

          
          
        

          {/* ── GUIDE ROUTES ── */}
          {/*<Route path="/guide/dashboard" element={
            <ProtectedRoute allowedRoles={['guide']}>
              <GuideDashboard />
            </ProtectedRoute>
          } />*/}
        
          {/* add more guide routes here */}
          <Route path="/guide/*" element={
            <ProtectedRoute allowedRoles={['guide']}>
              <GuideLayout />
            </ProtectedRoute>
          }>
            <Route path="dashboard" element={<GuideDashboard />} />
            <Route path="mentors" element={<MentorDirectory />} />
            <Route path="profile" element={<MentorProfile />} />
            <Route path="profile/:id" element={<MentorProfile />} />
            <Route path="booking" element={<BookingPage />} />
            <Route path="tasks" element={<TaskWizard />} />
            <Route path="grading" element={<GradingView />} />
            <Route path="settings" element={<GuideSettings />} />
            <Route path="availability" element={<AvailableTimes />} />
          </Route>
          
          

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

export default App;

