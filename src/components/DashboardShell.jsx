import { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import GlobalNavbar from './GlobalNavbar'
import { dashboardDefinitions } from '../data/dashboardConfig'

export default function DashboardShell({ currentUser, onLogout }) {
  const { role, section } = useParams()
  const navigate = useNavigate()
  const config = dashboardDefinitions[role]
  const activeSection = section || 'profile'
  const [selectedChildId, setSelectedChildId] = useState(config?.children?.[0]?.id ?? null)

  useEffect(() => {
    if (role === 'parent' && config?.children?.length) {
      setSelectedChildId(config.children[0].id)
    }
  }, [role, config?.children?.length])

  useEffect(() => {
    if (!config) return
    const sectionExists = config.links.some((link) => link.key === activeSection)
    if (!sectionExists) {
      navigate(config.links[0].path, { replace: true })
    }
  }, [activeSection, config, navigate])

  if (!config || !currentUser) {
    return <Navigate to="/login" replace />
  }

  if (currentUser.role !== role) {
    return <Navigate to={`/dashboard/${currentUser.role}/profile`} replace />
  }

  const renderProfileForm = () => (
    <section className="space-y-6">
      <div className="rounded-3xl bg-white p-8 shadow-sm border border-gray-200">
        <h1 className="text-3xl font-bold text-purple-900">{config.title}</h1>
        <p className="mt-2 text-gray-600">{config.subtitle}</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl bg-white p-8 shadow-sm border border-gray-200">
          <label className="block text-sm font-semibold text-gray-700">Salutation</label>
          <input
            readOnly
            value={config.profile.salutation}
            className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm text-gray-900 bg-gray-50"
          />
          <label className="mt-6 block text-sm font-semibold text-gray-700">Name</label>
          <input
            readOnly
            value={config.profile.name}
            className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm text-gray-900 bg-gray-50"
          />
          <label className="mt-6 block text-sm font-semibold text-gray-700">Email</label>
          <input
            readOnly
            value={config.profile.email}
            className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm text-gray-900 bg-gray-50"
          />
        </div>

        <div className="rounded-3xl bg-white p-8 shadow-sm border border-gray-200">
          <label className="block text-sm font-semibold text-gray-700">Address</label>
          <textarea
            readOnly
            value={config.profile.address}
            rows="4"
            className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm text-gray-900 bg-gray-50"
          />

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-semibold text-gray-700">Pincode</label>
              <input
                readOnly
                value={config.profile.pincode}
                className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm text-gray-900 bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700">Country</label>
              <input
                readOnly
                value={config.profile.country}
                className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm text-gray-900 bg-gray-50"
              />
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-semibold text-gray-700">State</label>
              <input
                readOnly
                value={config.profile.state}
                className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm text-gray-900 bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700">City</label>
              <input
                readOnly
                value={config.profile.city}
                className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm text-gray-900 bg-gray-50"
              />
            </div>
          </div>

          <button
            type="button"
            onClick={() => alert('Profile saved in demo mode.')}
            className="mt-8 w-full rounded-2xl bg-purple-700 px-6 py-3 text-sm font-bold text-white shadow-lg hover:bg-purple-800"
          >
            Save Changes
          </button>
        </div>
      </div>
    </section>
  )

  const renderSection = () => {
    switch (activeSection) {
      case 'profile':
        return renderProfileForm()
      case 'my-visits':
      case 'visits':
        return (
          <section className="space-y-6">
            <div className="rounded-3xl bg-white p-8 shadow-sm border border-gray-200 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-purple-900">{role === 'parent' ? 'Family Visits' : 'My Visits'}</h1>
                <p className="mt-2 text-gray-600">Review scheduled visits and completed sessions.</p>
              </div>
            </div>
            <div className="grid gap-6 lg:grid-cols-3">
              {Object.entries(config.visits).flatMap(([mode, visits]) =>
                visits.map((visit) => (
                  <div key={`${role}-${visit.id}-${mode}`} className="rounded-3xl bg-white p-6 shadow-sm border border-gray-200">
                    <h2 className="text-xl font-bold text-purple-900">{visit.child || visit.name}</h2>
                    <p className="mt-2 text-gray-600">{visit.purpose || visit.location}</p>
                    <p className="mt-1 text-gray-600">Date: {visit.date}</p>
                    {visit.time ? <p className="mt-1 text-gray-600">Time: {visit.time}</p> : null}
                    {visit.status ? <p className="mt-1 text-gray-600">Status: {visit.status}</p> : null}
                  </div>
                )),
              )}
            </div>
          </section>
        )
      case 'reports':
        return (
          <section className="space-y-6">
            <div className="rounded-3xl bg-white p-8 shadow-sm border border-gray-200">
              <h1 className="text-3xl font-bold text-purple-900">Reports</h1>
              <p className="mt-2 text-gray-600">Key updates and summaries for your role.</p>
            </div>
            <div className="grid gap-6 lg:grid-cols-3">
              {config.reports.map((report) => (
                <div key={report.id} className="rounded-3xl bg-white p-6 shadow-sm border border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-900">{report.child || report.title}</h2>
                  <p className="mt-2 text-gray-600">{report.feedback || report.summary}</p>
                  <div className="mt-4 text-xs uppercase tracking-[0.2em] text-purple-700">{report.date}</div>
                </div>
              ))}
            </div>
          </section>
        )
      case 'achievements':
        return (
          <section className="space-y-6">
            <div className="rounded-3xl bg-white p-8 shadow-sm border border-gray-200">
              <h1 className="text-3xl font-bold text-purple-900">Achievements</h1>
              <p className="mt-2 text-gray-600">Celebrate the progress made by your community.</p>
            </div>
            <div className="grid gap-6 lg:grid-cols-3">
              {config.achievements.map((achievement) => (
                <div key={achievement.id} className="rounded-3xl bg-white p-6 shadow-sm border border-gray-200">
                  <h2 className="text-xl font-semibold text-purple-900">{achievement.title}</h2>
                  <p className="mt-3 text-gray-600">{achievement.details}</p>
                </div>
              ))}
            </div>
          </section>
        )
      case 'notification':
        return (
          <section className="space-y-6">
            <div className="rounded-3xl bg-white p-8 shadow-sm border border-gray-200 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-purple-900">Notifications</h1>
                <p className="mt-2 text-gray-600">Updates that matter to your role.</p>
              </div>
            </div>
            <div className="space-y-4">
              {config.notifications.map((notification) => (
                <div key={notification.id} className="rounded-3xl bg-white p-6 shadow-sm border border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">{notification.title}</h2>
                  <p className="mt-2 text-gray-600">{notification.body}</p>
                  <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${notification.viewed ? 'bg-purple-100 text-purple-800' : 'bg-purple-900 text-white'}`}>
                    {notification.viewed ? 'Viewed' : 'New'}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )
      case 'my-children':
        return (
          <section className="space-y-6">
            <div className="rounded-3xl bg-white p-8 shadow-sm border border-gray-200">
              <h1 className="text-3xl font-bold text-purple-900">My Children</h1>
              <p className="mt-2 text-gray-600">View current details for your children under the program.</p>
            </div>
            <div className="grid gap-6 lg:grid-cols-2">
              {config.children.map((child) => (
                <div key={child.id} className="rounded-3xl bg-white p-6 shadow-sm border border-gray-200">
                  <h2 className="text-xl font-semibold text-purple-900">{child.name}</h2>
                  <p className="mt-2 text-gray-600">Age: {child.age}</p>
                  <p className="mt-1 text-gray-600">Milestone: {child.milestone}</p>
                  <p className="mt-1 text-gray-600">Status: {child.status}</p>
                </div>
              ))}
            </div>
          </section>
        )
      case 'milestone': {
        const selectedChild = config.children?.find((child) => child.id === selectedChildId) || config.children?.[0]
        const childReport = config.childReports?.find((report) => report.childId === selectedChild?.id)

        return (
          <section className="space-y-6">
            <div className="rounded-3xl bg-white p-8 shadow-sm border border-gray-200">
              <h1 className="text-3xl font-bold text-purple-900">Milestone Tracker</h1>
              <p className="mt-2 text-gray-600">Track your child’s progress toward development goals.</p>
            </div>

            <div className="rounded-3xl bg-white p-8 shadow-sm border border-gray-200">
              <label className="block text-sm font-semibold text-gray-700">Select Child</label>
              <select
                value={selectedChild?.id ?? ''}
                onChange={(e) => setSelectedChildId(Number(e.target.value))}
                className="mt-3 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 focus:border-purple-500 focus:ring-purple-100"
              >
                {config.children.map((child) => (
                  <option key={child.id} value={child.id}>
                    {child.name}
                  </option>
                ))}
              </select>

              <div className="mt-6 rounded-3xl bg-purple-50 p-6 text-sm text-purple-900">
                <h2 className="text-xl font-semibold text-purple-900">{selectedChild?.name}'s Report</h2>
                <p className="mt-3 text-gray-600">{childReport?.summary ?? 'Select a child to view their milestone report.'}</p>
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              {config.milestones.map((item) => (
                <div key={item.id} className="rounded-3xl bg-white p-6 shadow-sm border border-gray-200">
                  <h2 className="text-xl font-semibold text-purple-900">{item.title}</h2>
                  <div className="mt-3 rounded-2xl bg-purple-50 p-4 text-sm text-purple-900">
                    <div className="font-semibold">Progress: {item.progress}%</div>
                    <div className="mt-2 text-gray-600">{item.notes}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )
      }
      case 'resources':
        return (
          <section className="space-y-6">
            <div className="rounded-3xl bg-white p-8 shadow-sm border border-gray-200">
              <h1 className="text-3xl font-bold text-purple-900">Resources</h1>
              <p className="mt-2 text-gray-600">Helpful content for families and children.</p>
            </div>
            <div className="grid gap-6 lg:grid-cols-3">
              {config.resources.map((item) => (
                <div key={item.id} className="rounded-3xl bg-white p-6 shadow-sm border border-gray-200">
                  <h2 className="text-xl font-semibold text-purple-900">{item.title}</h2>
                  <p className="mt-3 text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </section>
        )
      case 'children':
        return (
          <section className="space-y-6">
            <div className="rounded-3xl bg-white p-8 shadow-sm border border-gray-200">
              <h1 className="text-3xl font-bold text-purple-900">Children Overview</h1>
              <p className="mt-2 text-gray-600">Manage active cases and follow-ups for enrolled children.</p>
            </div>
            <div className="grid gap-6 lg:grid-cols-3">
              {config.children.map((child) => (
                <div key={child.id} className="rounded-3xl bg-white p-6 shadow-sm border border-gray-200">
                  <h2 className="text-xl font-semibold text-purple-900">{child.name}</h2>
                  <p className="mt-2 text-gray-600">Age: {child.age}</p>
                  <p className="mt-1 text-gray-600">Center: {child.center}</p>
                  <p className="mt-1 text-gray-600">Status: {child.status}</p>
                </div>
              ))}
            </div>
          </section>
        )
      case 'volunteers':
        return (
          <section className="space-y-6">
            <div className="rounded-3xl bg-white p-8 shadow-sm border border-gray-200">
              <h1 className="text-3xl font-bold text-purple-900">Volunteer Team</h1>
              <p className="mt-2 text-gray-600">Review active volunteer coverage and availability.</p>
            </div>
            <div className="grid gap-6 lg:grid-cols-3">
              {config.volunteers.map((item) => (
                <div key={item.id} className="rounded-3xl bg-white p-6 shadow-sm border border-gray-200">
                  <h2 className="text-xl font-semibold text-purple-900">{item.name}</h2>
                  <p className="mt-2 text-gray-600">Area: {item.area}</p>
                  <p className="mt-1 text-gray-600">Status: {item.active ? 'Active' : 'Inactive'}</p>
                </div>
              ))}
            </div>
          </section>
        )
      case 'analytics':
        return (
          <section className="space-y-6">
            <div className="rounded-3xl bg-white p-8 shadow-sm border border-gray-200">
              <h1 className="text-3xl font-bold text-purple-900">Analytics</h1>
              <p className="mt-2 text-gray-600">Program health metrics and operational snapshots.</p>
            </div>
            <div className="grid gap-6 lg:grid-cols-4">
              {config.analytics.map((metric) => (
                <div key={metric.id} className="rounded-3xl bg-purple-50 p-6 shadow-sm border border-purple-100">
                  <p className="text-sm uppercase tracking-[0.24em] text-purple-700">{metric.label}</p>
                  <p className="mt-4 text-4xl font-bold text-purple-900">{metric.value}</p>
                </div>
              ))}
            </div>
          </section>
        )
      default:
        return (
          <section className="rounded-3xl bg-white p-8 shadow-sm border border-gray-200">
            <p className="text-gray-600">This section is not available yet.</p>
          </section>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <GlobalNavbar page={role} onLogout={onLogout} />
      <main className="pt-28 px-4 pb-12 max-w-6xl mx-auto sm:px-6 lg:px-8">
        <div className="mb-4 flex flex-wrap gap-2">
          {config.links.map((link) => (
            <Link
              key={link.key}
              to={link.path}
              className={`rounded-2xl px-4 py-2 text-sm font-semibold ${activeSection === link.key ? 'bg-purple-900 text-white' : 'bg-white text-purple-900 border border-gray-200'} transition`}>
              {link.label}
            </Link>
          ))}
        </div>
        {renderSection()}
      </main>
    </div>
  )
}
