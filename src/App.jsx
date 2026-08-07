import { useState } from 'react'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import GlobalNavbar from './components/GlobalNavbar'
import Landing from './pages/Landing'
import LoginForm from './pages/Login'
import DashboardShell from './components/DashboardShell'

function RedirectToProfile({ currentUser }) {
  if (!currentUser) {
    return <Navigate to="/login" replace />
  }

  return <Navigate to={`/dashboard/${currentUser.role}/profile`} replace />
}

export default function App() {
  const [currentUser, setCurrentUser] = useState(null)
  const navigate = useNavigate()

  const handleLoginSuccess = (user) => {
    setCurrentUser(user)
  }

  const handleLogout = () => {
    setCurrentUser(null)
    navigate('/login', { replace: true })
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans block relative">
      <Routes>
        <Route
          path="/"
          element={
            <div className="scroll-smooth">
              <GlobalNavbar page="landing" />
              <div className="pt-20 block">
                <Landing onGetStarted={() => navigate('/login')} />
              </div>
            </div>
          }
        />
        <Route
          path="/login"
          element={
            <div className="min-h-screen flex flex-col items-center justify-center bg-purple-50 p-6 relative">
              <button
                onClick={() => navigate('/')}
                className="absolute top-6 right-6 bg-purple-700 hover:bg-purple-900 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-md cursor-pointer"
              >
                ← Back to Homepage
              </button>

              <div className="bg-white p-4 rounded-2xl shadow-2xl border border-gray-100">
                <LoginForm onLoginSuccess={handleLoginSuccess} />
              </div>
            </div>
          }
        />
        <Route path="/dashboard/:role" element={<RedirectToProfile currentUser={currentUser} />} />
        <Route
          path="/dashboard/:role/:section"
          element={<DashboardShell currentUser={currentUser} onLogout={handleLogout} />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}
