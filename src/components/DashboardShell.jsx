import { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import GlobalNavbar from './GlobalNavbar'
import { dashboardDefinitions, overviewMetrics } from '../data/dashboardConfig'
import { db } from '../lib/db'
import ChildrenTab from './ChildrenTab'
import VolunteersTab from './VolunteersTab'
import DonationTracker from './DonationTracker'
import Modal from './Modal'

export default function DashboardShell({ currentUser, onLogout }) {
  const { role, section } = useParams()
  const navigate = useNavigate()
  const config = dashboardDefinitions[role]
  const [notifications, setNotifications] = useState(config?.notifications || [])
  const [meetings, setMeetings] = useState([])
  const [userProfile, setUserProfile] = useState(null)
  const [scheduleOpen, setScheduleOpen] = useState(false)
  const [scheduleForm, setScheduleForm] = useState({ date: '', note: '', title: '' })
  const defaultSection = role === 'admin' ? 'overview' : 'profile'
  const activeSection = section || defaultSection
  const [selectedChildId, setSelectedChildId] = useState(config?.children?.[0]?.id ?? null)

  useEffect(() => {
    if (!config) return
    const sectionExists = config.links.some((link) => link.key === activeSection)
    if (!sectionExists) {
      navigate(config.links[0].path, { replace: true })
    }

    // load persisted notifications and meetings
    let mounted = true
    db.getNotifications(role).then((list) => {
      if (mounted && list) setNotifications(list)
    })
    db.getMeetings().then((m) => {
      if (mounted && m) setMeetings(m)
    })
    // load current user's profile from Supabase
    if (currentUser?.username) {
      db.getProfile(currentUser.username).then((p) => {
        if (mounted) setUserProfile(p)
      })
    }
    return () => { mounted = false }
  }, [activeSection, config, navigate, role])

  useEffect(() => {
    const handler = (e) => {
      const d = e.detail || {}
      setScheduleForm((s) => ({ ...s, title: d.title || '', note: d.note || '', date: d.date || '' , volunteerId: d.volunteerId }))
      setScheduleOpen(true)
    }
    window.addEventListener('openSchedule', handler)
    return () => window.removeEventListener('openSchedule', handler)
  }, [])

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

      <EditableProfileCard
        key={role}
        profile={userProfile || config.profile}
        currentUser={currentUser}
      />
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
      case 'overview':
        return (
          <section className="space-y-6">
            <div className="rounded-3xl bg-white p-8 shadow-sm border border-gray-200">
              <h1 className="text-3xl font-bold text-purple-900">{config.title} Overview</h1>
              <p className="mt-2 text-gray-600">A quick snapshot of the role’s current activity and progress.</p>
            </div>
            <div className="grid gap-6 lg:grid-cols-4">
              {(overviewMetrics[role] || config.analytics || []).map((metric) => (
                <div key={metric.id} className="rounded-3xl bg-purple-50 p-6 shadow-sm border border-purple-100">
                  <p className="text-sm uppercase tracking-[0.24em] text-purple-700">{metric.label}</p>
                  <p className="mt-4 text-4xl font-bold text-purple-900">{metric.value}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 grid gap-4">
              <h2 className="text-lg font-semibold text-gray-900">Upcoming Meetings</h2>
              <div className="space-y-3">
                {meetings.slice(0,5).map((m) => (
                  <div key={m.id} className="rounded-lg bg-yellow-50 p-3 border border-yellow-100">
                    <div className="font-semibold">{m.title || 'Meeting'}</div>
                    <div className="text-sm text-gray-700">Date: {m.date} • Note: {m.note}</div>
                  </div>
                ))}
              </div>
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
        const selectedMilestones = childReport?.milestones || config.milestones

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
                onChange={(e) => setSelectedChildId(e.target.value)}
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
              {selectedMilestones.map((item) => (
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
        return <ChildrenTab childrenData={config.children} />
      case 'volunteers':
        return <VolunteersTab volunteers={config.volunteers} />
      case 'donation':
        return <DonationTracker donations={config.donations} />
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

        <div className="grid gap-6 lg:grid-cols-4">
          <div className="lg:col-span-3">{renderSection()}</div>

          {(role === 'admin' && activeSection === 'overview') ? (
            <aside className="lg:col-span-1">
              <div className="rounded-3xl bg-white p-6 shadow-sm border border-gray-200 mb-4">
                <h3 className="text-lg font-semibold text-purple-900">Notifications</h3>
                <p className="mt-1 text-sm text-gray-600">Recent activity and alerts</p>
                <div className="mt-4 space-y-3">
                  {notifications.slice(0, 6).map((n) => (
                    <div key={n.id} className="flex items-start justify-between gap-3">
                      <div>
                        <div className="text-sm font-semibold text-gray-900">{n.title}</div>
                        <div className="text-xs text-gray-600">{n.body}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button onClick={async () => { await db.markViewed(n.id); setNotifications((s) => s.map((x) => x.id === n.id ? { ...x, viewed: true } : x)) }} className="text-xs px-2 py-1 rounded-full bg-purple-100 text-purple-800">View</button>
                        <button onClick={async () => { await db.deleteNotification(n.id); setNotifications((s) => s.filter((x) => x.id !== n.id)) }} className="text-xs px-2 py-1 rounded-full bg-red-100 text-red-700">Delete</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl bg-white p-4 shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-purple-900">Quick Actions</h3>
                <div className="mt-4 flex flex-col gap-3">
                    <button onClick={() => setScheduleOpen(true)} className="rounded-2xl bg-purple-900 text-white px-4 py-2">Schedule a Meeting</button>
                    <button className="rounded-2xl bg-white border border-gray-200 px-4 py-2 text-purple-900">Create Campaign</button>
                  </div>
              </div>
            </aside>
          ) : null}
        </div>
        <Modal open={scheduleOpen} onClose={() => setScheduleOpen(false)} title={scheduleForm.title || 'Schedule Meeting'}>
          <div>
            <label className="block text-sm font-semibold text-gray-700">Title</label>
            <input value={scheduleForm.title} onChange={(e) => setScheduleForm((s) => ({ ...s, title: e.target.value }))} className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-2" />
            <label className="mt-4 block text-sm font-semibold text-gray-700">Date</label>
            <input type="date" value={scheduleForm.date} onChange={(e) => setScheduleForm((s) => ({ ...s, date: e.target.value }))} className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-2" />
            <label className="mt-4 block text-sm font-semibold text-gray-700">Note</label>
            <textarea value={scheduleForm.note} onChange={(e) => setScheduleForm((s) => ({ ...s, note: e.target.value }))} rows={3} className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-2" />
            <div className="mt-4 flex gap-2">
              <button onClick={async () => { const m = await db.addMeeting(scheduleForm); setMeetings((s) => [m, ...s]); setScheduleOpen(false); setScheduleForm({ date: '', note: '', title: '' }) }} className="rounded-2xl bg-purple-900 text-white px-4 py-2">Save</button>
              <button onClick={() => setScheduleOpen(false)} className="rounded-2xl bg-white border border-gray-200 px-4 py-2">Cancel</button>
            </div>
          </div>
        </Modal>
      </main>
    </div>
  )
}

function EditableProfileCard({ profile, currentUser }) {
  const [draft, setDraft] = useState(profile)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    setDraft(profile)
  }, [profile])

  const handleSave = async () => {
    // username comes from currentUser in App — DashboardShell doesn't pass it here,
    // but App stores currentUser in state and passes to DashboardShell. We can try
    // to read username from localStorage or expect profile.email/username to be present.
    const username = currentUser?.username || profile?.username || profile?.email || null
    if (!username) return alert('Cannot determine profile username to save.')

    setSaving(true)
    const attrs = {
      salutation: draft.salutation,
      name: draft.name,
      email: draft.email,
      address: draft.address,
      pincode: draft.pincode,
      country: draft.country,
      state: draft.state,
      city: draft.city,
      updated_at: new Date().toISOString(),
    }

    const res = await db.updateProfile(username, attrs)
    setSaving(false)
    if (res) {
      alert('Profile updated successfully.')
    } else {
      alert('Failed to update profile — check console for details.')
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="rounded-3xl bg-white p-8 shadow-sm border border-gray-200">
        <label className="block text-sm font-semibold text-gray-700">Salutation</label>
        <input
          value={draft?.salutation || ''}
          onChange={(event) => setDraft((current) => ({ ...current, salutation: event.target.value }))}
          className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm text-gray-900 bg-gray-50"
        />
        <label className="mt-6 block text-sm font-semibold text-gray-700">Name</label>
        <input
          value={draft?.name || ''}
          onChange={(event) => setDraft((current) => ({ ...current, name: event.target.value }))}
          className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm text-gray-900 bg-gray-50"
        />
        <label className="mt-6 block text-sm font-semibold text-gray-700">Email</label>
        <input
          value={draft?.email || ''}
          onChange={(event) => setDraft((current) => ({ ...current, email: event.target.value }))}
          className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm text-gray-900 bg-gray-50"
        />
      </div>

      <div className="rounded-3xl bg-white p-8 shadow-sm border border-gray-200">
        <label className="block text-sm font-semibold text-gray-700">Address</label>
        <textarea
          value={draft?.address || ''}
          onChange={(event) => setDraft((current) => ({ ...current, address: event.target.value }))}
          rows="4"
          className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm text-gray-900 bg-gray-50"
        />

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-semibold text-gray-700">Pincode</label>
            <input
              value={draft?.pincode || ''}
              onChange={(event) => setDraft((current) => ({ ...current, pincode: event.target.value }))}
              className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm text-gray-900 bg-gray-50"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700">Country</label>
            <input
              value={draft?.country || ''}
              onChange={(event) => setDraft((current) => ({ ...current, country: event.target.value }))}
              className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm text-gray-900 bg-gray-50"
            />
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-semibold text-gray-700">State</label>
            <input
              value={draft?.state || ''}
              onChange={(event) => setDraft((current) => ({ ...current, state: event.target.value }))}
              className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm text-gray-900 bg-gray-50"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700">City</label>
            <input
              value={draft?.city || ''}
              onChange={(event) => setDraft((current) => ({ ...current, city: event.target.value }))}
              className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm text-gray-900 bg-gray-50"
            />
          </div>
        </div>

        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="mt-8 w-full rounded-2xl bg-purple-700 px-6 py-3 text-sm font-bold text-white shadow-lg hover:bg-purple-800 disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  )
}
