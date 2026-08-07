import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { findDemoUser } from '../data/demoUsers'

function LoginForm({ onLoginSuccess }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    const user = findDemoUser(username, password)
    if (user) {
      setError('')
      onLoginSuccess?.(user)
      navigate(user.dashboardPath, { replace: true })
      return
    }

    setError('Invalid credentials. Use username "vol", "parent", or "admin" with password "1234".')
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-purple-50 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white rounded-2xl border border-purple-100 shadow-xl p-8 flex flex-col gap-5"
      >
        <h2 className="text-2xl font-bold text-purple-900 text-center tracking-wide">Login</h2>

        {error ? (
          <div className="rounded-2xl bg-red-50 border border-red-100 px-4 py-3 text-sm text-red-700">{error}</div>
        ) : null}

        <div className="flex flex-col gap-1.5">
          <label htmlFor="username" className="text-xs font-semibold text-purple-900 tracking-wider uppercase">
            Username
          </label>
          <div className="relative flex items-center">
            <div className="absolute left-3 text-purple-400 pointer-events-none">
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor">
                <path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z" />
              </svg>
            </div>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-purple-200 bg-purple-50/30 text-purple-950 placeholder-purple-300 text-sm outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-100 transition-all shadow-sm"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="password" className="text-xs font-semibold text-purple-900 tracking-wider uppercase">
            Password
          </label>
          <div className="relative flex items-center">
            <div className="absolute left-3 text-purple-400 pointer-events-none">
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
              </svg>
            </div>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-purple-200 bg-purple-50/30 text-purple-950 placeholder-purple-300 text-sm outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-100 transition-all shadow-sm"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-purple-700 hover:bg-purple-800 text-white font-bold py-2.5 px-4 rounded-xl shadow-md hover:shadow-lg transition-all focus:outline-none focus:ring-4 focus:ring-purple-200 mt-2 text-sm"
        >
          Submit
        </button>

        <p className="text-xs text-purple-600 text-center font-medium">
          Demo accounts: vol / 1234, parent / 1234, admin / 1234
        </p>
      </form>
    </div>
  )
}

export default LoginForm
