import { useState } from 'react'
import { Link } from 'react-router-dom'

const navConfigurations = {
  landing: {
    logoSubtitle: null,
    links: [
      { key: 'home', label: 'Home', href: '#home' },
      { key: 'about', label: 'About', href: '#about' },
      { key: 'services', label: 'Services', href: '#services' },
      { key: 'contact', label: 'Contact', href: '#contact' },
    ],
    actionLabel: 'Login',
    actionStyle: 'bg-purple-900 hover:bg-purple-950',
    actionTo: '/login',
  },
  parent: {
    logoSubtitle: 'Parent',
    links: [
      { key: 'overview', label: 'Overview', to: '/dashboard/parent/overview' },
      { key: 'profile', label: 'Profile', to: '/dashboard/parent/profile' },
      { key: 'my-children', label: 'My Children', to: '/dashboard/parent/my-children' },
      { key: 'milestone', label: 'Milestone', to: '/dashboard/parent/milestone' },
      { key: 'visits', label: 'Visits', to: '/dashboard/parent/visits' },
      { key: 'resources', label: 'Resources', to: '/dashboard/parent/resources' },
      { key: 'notification', label: 'Notification', to: '/dashboard/parent/notification' },
    ],
    actionLabel: 'Profile',
    actionStyle: 'bg-purple-900 hover:bg-purple-950',
    actionTo: '/dashboard/parent/profile',
    hasSettings: true,
  },
  volunteer: {
    logoSubtitle: 'Volunteer',
    links: [
      { key: 'overview', label: 'Overview', to: '/dashboard/volunteer/overview' },
      { key: 'profile', label: 'Profile', to: '/dashboard/volunteer/profile' },
      { key: 'my-visits', label: 'My Visits', to: '/dashboard/volunteer/my-visits' },
      { key: 'reports', label: 'Reports', to: '/dashboard/volunteer/reports' },
      { key: 'achievements', label: 'Achievements', to: '/dashboard/volunteer/achievements' },
      { key: 'notification', label: 'Notification', to: '/dashboard/volunteer/notification' },
    ],
    actionLabel: 'Profile',
    actionStyle: 'bg-purple-900 hover:bg-purple-950',
    actionTo: '/dashboard/volunteer/profile',
    hasSettings: true,
  },
  admin: {
    logoSubtitle: 'Admin',
    links: [
      { key: 'overview', label: 'Overview', to: '/dashboard/admin/overview' },
      { key: 'profile', label: 'Profile', to: '/dashboard/admin/profile' },
      { key: 'children', label: 'Children', to: '/dashboard/admin/children' },
      { key: 'volunteers', label: 'Volunteers', to: '/dashboard/admin/volunteers' },
      { key: 'donation', label: 'Donation & Grants', to: '/dashboard/admin/donation' },
      { key: 'reports', label: 'Reports', to: '/dashboard/admin/reports' },
    ],
    actionLabel: 'Profile',
    actionStyle: 'bg-purple-900 hover:bg-purple-950',
    actionTo: '/dashboard/admin/profile',
    hasSettings: true,
  },
}

export default function GlobalNavbar({ page = 'landing', onNavigate, onLogout = () => {} }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const config = navConfigurations[page] || navConfigurations.landing

  return (
    <nav className="bg-purple-700 fixed w-full z-20 top-0 left-0 border-b border-transparent">
      <div className="flex flex-wrap items-center justify-between p-6">
        <Link to="/" className="flex flex-col items-start space-y-1">
          <span className="self-start text-xl text-white font-semibold whitespace-nowrap" style={{ fontFamily: '"Papyrus", fantasy' }}>
            🌼 EarlyBloom
          </span>
          {config.logoSubtitle ? (
            <span className="text-xs text-purple-200 uppercase tracking-wider">
              {config.logoSubtitle}
            </span>
          ) : null}
        </Link>

        <div className="flex md:order-2 items-center space-x-3 md:space-x-0">
          <Link
            to={config.actionTo}
            className={`flex items-center text-white ${config.actionStyle} font-bold border-none focus:ring-4 focus:ring-purple-500 shadow-md leading-5 rounded-xl text-sm px-3 py-2 focus:outline-none`}
          >
            {config.actionLabel}
            <svg className="ml-2 h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path
                fillRule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
          <button
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-white rounded-xl md:hidden hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
            aria-controls="navbar-sticky"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((current) => !current)}
          >
            <span className="sr-only">Open main menu</span>
            <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
              <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M5 7h14M5 12h14M5 17h14" />
            </svg>
          </button>
        </div>

        <div
          className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${isMenuOpen ? 'block' : 'hidden'}`}
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium rounded-xl bg-purple-700 md:space-x-8 md:flex-row md:mt-0 md:bg-transparent">
            {config.links.map((link) => (
              <li key={link.key}>
                {link.to ? (
                  <Link
                    to={link.to}
                    className="block py-2 px-3 text-white rounded hover:bg-purple-800 md:hover:bg-transparent md:p-0 hover:underline"
                  >
                    {link.label}
                  </Link>
                ) : link.href ? (
                  <a
                    href={link.href}
                    className="block py-2 px-3 text-white rounded hover:bg-purple-800 md:hover:bg-transparent md:p-0 hover:underline"
                  >
                    {link.label}
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={() => onNavigate?.(link.key)}
                    className="block text-left w-full py-2 px-3 text-white rounded hover:bg-purple-800 md:hover:bg-transparent md:p-0 hover:underline"
                  >
                    {link.label}
                  </button>
                )}
              </li>
            ))}

            {config.hasSettings ? (
              <li className="relative">
                <button
                  type="button"
                  className="flex items-center py-2 px-3 text-white rounded hover:bg-purple-800 md:hover:bg-transparent md:p-0"
                  aria-expanded={isSettingsOpen}
                  onClick={() => setIsSettingsOpen((current) => !current)}
                >
                  Settings
                  <svg className="ml-2 h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z" />
                  </svg>
                </button>
                {isSettingsOpen ? (
                  <div className="absolute right-0 mt-2 w-40 rounded-xl border border-purple-600 bg-white text-purple-900 shadow-lg md:top-full md:right-0 md:min-w-[10rem]">
                    <button
                      type="button"
                      className="w-full text-left px-4 py-2 text-sm hover:bg-purple-100"
                      onClick={onLogout}
                    >
                      Logout
                    </button>
                  </div>
                ) : null}
              </li>
            ) : null}
          </ul>
        </div>
      </div>
    </nav>
  )
}
