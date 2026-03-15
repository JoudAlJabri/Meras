// Prevents unauthorized users from accessing certain pages
import { Navigate } from 'react-router-dom'  // Navigate is used to redirect users to another page like Navigate to /login
import { useAuth } from '../../context/AuthContext'

function ProtectedRoute({ children, allowedRoles }) {
  const { currentUser, isAuthenticated } = useAuth() // This reads the authentication data from the AuthContext.
// Now the component knows Who is logged in + What their role is

// Not logged in at all → go to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  // Logged in but wrong role → go to their own dashboard
  // This checks if the user's role is allowed to access the page.
  if (allowedRoles && !allowedRoles.includes(currentUser.role)) {
    if (currentUser.role === 'explorer') return <Navigate to="/explorer/dashboard" replace />
    if (currentUser.role === 'guide') return <Navigate to="/guide/dashboard" replace />
    if (currentUser.role === 'admin') return <Navigate to="/admin/dashboard" replace />
  }

  return children // Allow access -> page renders normally if everything is correct (i.e. user loggin in + right user )
}

export default ProtectedRoute



/* CONTEXT -> What is ProtectedRoute & why we need it 
Without protected routes, anyone can type `meras.com/admin/dashboard` in the browser and just land there even if they're not logged in. That's obviously terrible.

A Protected Route is basically a **security guard** that stands in front of certain pages:
```
User tries to visit /admin/dashboard
         ↓
  ProtectedRoute checks:
  "Are you logged in?"
         ↓
    NO → sends you to /login
         ↓
    YES → "Are you an admin?"
         ↓
    NO → sends you to your own dashboard
         ↓
    YES → lets you through to admin dashboard
*/