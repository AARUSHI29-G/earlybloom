import { useMemo, useState } from 'react'
import GlobalNavbar from '../components/GlobalNavbar'

const initialMessages = [
  { id: 1, title: 'Field visit rescheduled', body: 'Your Tuesday home visit has been moved to Thursday at 10:00 AM.', viewed: false },
  { id: 2, title: 'Report approved', body: 'Your latest visit report has been approved by the NGO admin.', viewed: true },
  { id: 3, title: 'New milestone assigned', body: 'A new milestone has been added for child Aaryan.', viewed: false },
  { id: 4, title: 'Meeting reminder', body: 'Volunteer coordination call tomorrow at 4:00 PM.', viewed: true },
]

const visitItems = {
  upcoming: [
    { id: 1, child: 'Aanya', location: 'Village Cluster 3', time: '10:00 AM', date: '2026-08-10' },
    { id: 2, child: 'Ravi', location: 'Sector 7 Home', time: '2:30 PM', date: '2026-08-12' },
    { id: 3, child: 'Mira', location: 'Community Center', time: '11:15 AM', date: '2026-08-14' },
  ],
  completed: [
    { id: 4, child: 'Aarav', location: 'Village Cluster 5', time: '9:00 AM', date: '2026-08-02' },
    { id: 5, child: 'Nisha', location: 'Field Camp', time: '1:00 PM', date: '2026-08-04' },
    { id: 6, child: 'Kiran', location: 'Health Center', time: '3:30 PM', date: '2026-08-06' },
  ],
}

const reportCards = [
  { id: 1, child: 'Aanya', feedback: 'The visit went smoothly. Caregiver engaged with milestone exercises.', date: '2026-08-10' },
  { id: 2, child: 'Ravi', feedback: 'Focused on nutrition counseling and daily routine check-in.', date: '2026-08-12' },
  { id: 3, child: 'Mira', feedback: 'Strong participation from family. Recommended follow-up in two weeks.', date: '2026-08-14' },
]

const achievements = [
  { id: 1, title: '10 Visits Completed', details: 'Successfully completed ten community visits this month.' },
  { id: 2, title: 'Trusted Volunteer', details: 'Received a "Trusted Volunteer" badge for consistent reporting.' },
  { id: 3, title: 'Community Champion', details: 'Recognized for outstanding support in early childhood development.' },
]

export default function VolunteerDashboard() {
  const [activePage, setActivePage] = useState('profile')
  const [visitMode, setVisitMode] = useState('upcoming')
  const [searchQuery, setSearchQuery] = useState('')
  const [filterTime, setFilterTime] = useState('')
  const [filterDate, setFilterDate] = useState('')
  const [selectedMessages, setSelectedMessages] = useState([])
  const [messages, setMessages] = useState(initialMessages)

  const [profile, setProfile] = useState({
    salutation: 'Ms.',
    name: 'Priya Sharma',
    email: 'priya.sharma@example.org',
    password: '********',
    address: '24 Rosewood Lane',
    pincode: '560034',
    country: 'India',
    state: 'Karnataka',
    city: 'Bengaluru',
  })

  const visibleVisits = useMemo(() => {
    return visitItems[visitMode].filter((visit) => {
      const query = searchQuery.trim().toLowerCase()
      const matchesName = query ? visit.child.toLowerCase().includes(query) : true
      const matchesTime = filterTime ? visit.time === filterTime : true
      const matchesDate = filterDate ? visit.date === filterDate : true
      return matchesName && matchesTime && matchesDate
    })
  }, [visitMode, searchQuery, filterTime, filterDate])

  const handleMessageSelect = (id) => {
    setSelectedMessages((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    )
  }

  const clearSelected = () => {
    setMessages((current) => current.filter((message) => !selectedMessages.includes(message.id)))
    setSelectedMessages([])
  }

  const handleLogout = () => {
    window.location.href = '/'
  }

  const handleNavigate = (pageKey) => {
    if (pageKey === 'my-visits') {
      setActivePage('visits')
      setVisitMode('upcoming')
    } else if (pageKey === 'profile') {
      setActivePage('profile')
    } else if (pageKey === 'reports') {
      setActivePage('reports')
    } else if (pageKey === 'achievements') {
      setActivePage('achievements')
    } else if (pageKey === 'notification') {
      setActivePage('notification')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <GlobalNavbar page="volunteer" onNavigate={handleNavigate} onLogout={handleLogout} />
      <main className="pt-28 px-4 pb-12 max-w-6xl mx-auto sm:px-6 lg:px-8">
        {activePage === 'profile' && (
          <section className="space-y-6">
            <div className="rounded-3xl bg-white p-8 shadow-sm border border-gray-200">
              <h1 className="text-3xl font-bold text-purple-900">Volunteer Profile</h1>
              <p className="mt-2 text-gray-600">Update your contact and profile details below.</p>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-3xl bg-white p-8 shadow-sm border border-gray-200">
                <label className="block text-sm font-semibold text-gray-700">Salutation</label>
                <select
                  value={profile.salutation}
                  onChange={(e) => setProfile({ ...profile, salutation: e.target.value })}
                  className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm text-gray-900 focus:border-purple-500 focus:ring-purple-100"
                >
                  <option>Ms.</option>
                  <option>Mr.</option>
                  <option>Mrs.</option>
                </select>

                <label className="mt-6 block text-sm font-semibold text-gray-700">Name</label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm text-gray-900 focus:border-purple-500 focus:ring-purple-100"
                />

                <label className="mt-6 block text-sm font-semibold text-gray-700">Email</label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm text-gray-900 focus:border-purple-500 focus:ring-purple-100"
                />

                <label className="mt-6 block text-sm font-semibold text-gray-700">Password</label>
                <input
                  type="password"
                  value={profile.password}
                  onChange={(e) => setProfile({ ...profile, password: e.target.value })}
                  className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm text-gray-900 focus:border-purple-500 focus:ring-purple-100"
                />
              </div>

              <div className="rounded-3xl bg-white p-8 shadow-sm border border-gray-200">
                <label className="block text-sm font-semibold text-gray-700">Address</label>
                <textarea
                  value={profile.address}
                  onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                  rows="4"
                  className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm text-gray-900 focus:border-purple-500 focus:ring-purple-100"
                />

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700">Pincode</label>
                    <input
                      value={profile.pincode}
                      onChange={(e) => setProfile({ ...profile, pincode: e.target.value })}
                      className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm text-gray-900 focus:border-purple-500 focus:ring-purple-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700">Country</label>
                    <select
                      value={profile.country}
                      onChange={(e) => setProfile({ ...profile, country: e.target.value })}
                      className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm text-gray-900 focus:border-purple-500 focus:ring-purple-100"
                    >
                      <option>India</option>
                      <option>Nepal</option>
                      <option>Bangladesh</option>
                    </select>
                  </div>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700">State</label>
                    <select
                      value={profile.state}
                      onChange={(e) => setProfile({ ...profile, state: e.target.value })}
                      className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm text-gray-900 focus:border-purple-500 focus:ring-purple-100"
                    >
                      <option>Karnataka</option>
                      <option>Maharashtra</option>
                      <option>Tamil Nadu</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700">City</label>
                    <select
                      value={profile.city}
                      onChange={(e) => setProfile({ ...profile, city: e.target.value })}
                      className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm text-gray-900 focus:border-purple-500 focus:ring-purple-100"
                    >
                      <option>Bengaluru</option>
                      <option>Mumbai</option>
                      <option>Chennai</option>
                    </select>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => alert('Profile updated successfully.')}
                  className="mt-8 w-full rounded-2xl bg-purple-700 px-6 py-3 text-sm font-bold text-white shadow-lg hover:bg-purple-800"
                >
                  Update Profile
                </button>
              </div>
            </div>
          </section>
        )}

        {activePage === 'visits' && (
          <section className="space-y-6">
            <div className="rounded-3xl bg-white p-8 shadow-sm border border-gray-200 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-purple-900">My Visits</h1>
                <p className="mt-2 text-gray-600">View upcoming and completed visits with filters.</p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                <button
                  type="button"
                  className={`rounded-2xl px-5 py-3 font-semibold ${visitMode === 'upcoming' ? 'bg-purple-900 text-white' : 'bg-purple-100 text-purple-900'}`}
                  onClick={() => setVisitMode('upcoming')}
                >
                  Upcoming Visits
                </button>
                <button
                  type="button"
                  className={`rounded-2xl px-5 py-3 font-semibold ${visitMode === 'completed' ? 'bg-purple-900 text-white' : 'bg-purple-100 text-purple-900'}`}
                  onClick={() => setVisitMode('completed')}
                >
                  Completed Visits
                </button>
              </div>
            </div>

            <div className="rounded-3xl bg-white p-8 shadow-sm border border-gray-200">
              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <label className="block text-sm font-semibold text-gray-700">Search my name</label>
                  <input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm focus:border-purple-500 focus:ring-purple-100"
                    placeholder="Search child name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700">By time</label>
                  <select
                    value={filterTime}
                    onChange={(e) => setFilterTime(e.target.value)}
                    className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm focus:border-purple-500 focus:ring-purple-100"
                  >
                    <option value="">Any time</option>
                    <option>9:00 AM</option>
                    <option>10:00 AM</option>
                    <option>1:00 PM</option>
                    <option>2:30 PM</option>
                    <option>3:30 PM</option>
                    <option>11:15 AM</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700">By date</label>
                  <input
                    type="date"
                    value={filterDate}
                    onChange={(e) => setFilterDate(e.target.value)}
                    className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm focus:border-purple-500 focus:ring-purple-100"
                  />
                </div>
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              {visibleVisits.map((visit) => (
                <div key={visit.id} className="rounded-3xl bg-white p-6 shadow-sm border border-gray-200">
                  <h2 className="text-xl font-bold text-purple-900">{visit.child}</h2>
                  <p className="mt-2 text-gray-600">Location: {visit.location}</p>
                  <p className="mt-1 text-gray-600">Time: {visit.time}</p>
                  <p className="mt-1 text-gray-600">Date: {visit.date}</p>
                </div>
              ))}
              {visibleVisits.length === 0 && (
                <div className="rounded-3xl bg-white p-6 shadow-sm border border-gray-200 col-span-full text-gray-600">
                  No visits match the selected filters.
                </div>
              )}
            </div>
          </section>
        )}

        {activePage === 'reports' && (
          <section className="space-y-6">
            <div className="rounded-3xl bg-white p-8 shadow-sm border border-gray-200">
              <h1 className="text-3xl font-bold text-purple-900">Reports</h1>
              <p className="mt-2 text-gray-600">Feedback cards for recent visits.</p>
            </div>
            <div className="grid gap-6 lg:grid-cols-3">
              {reportCards.map((card) => (
                <div key={card.id} className="rounded-3xl bg-white p-6 shadow-sm border border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-900">{card.child}</h2>
                  <p className="mt-2 text-gray-600">{card.feedback}</p>
                  <div className="mt-4 text-xs uppercase tracking-[0.2em] text-purple-700">Visited on {card.date}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {activePage === 'achievements' && (
          <section className="space-y-6">
            <div className="rounded-3xl bg-white p-8 shadow-sm border border-gray-200">
              <h1 className="text-3xl font-bold text-purple-900">Achievements</h1>
              <p className="mt-2 text-gray-600">Your volunteer achievements are shown below.</p>
            </div>
            <div className="grid gap-6 lg:grid-cols-3">
              {achievements.map((achievement) => (
                <div key={achievement.id} className="rounded-3xl bg-white p-6 shadow-sm border border-gray-200">
                  <h2 className="text-xl font-semibold text-purple-900">{achievement.title}</h2>
                  <p className="mt-3 text-gray-600">{achievement.details}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {activePage === 'notification' && (
          <section className="space-y-6">
            <div className="rounded-3xl bg-white p-8 shadow-sm border border-gray-200">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-purple-900">Notifications</h1>
                  <p className="mt-2 text-gray-600">Scroll through recent system messages.</p>
                </div>
                <button
                  type="button"
                  disabled={selectedMessages.length === 0}
                  onClick={clearSelected}
                  className="rounded-2xl bg-purple-700 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-purple-800 disabled:cursor-not-allowed disabled:bg-purple-200"
                >
                  Clear Selected
                </button>
              </div>
            </div>

            <div className="space-y-4 max-h-[520px] overflow-y-auto pb-4">
              {messages.map((message) => (
                <div key={message.id} className="rounded-3xl bg-white p-6 shadow-sm border border-gray-200 flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <input
                      type="checkbox"
                      checked={selectedMessages.includes(message.id)}
                      onChange={() => handleMessageSelect(message.id)}
                      className="mt-1 h-4 w-4 rounded border-gray-300 text-purple-700 focus:ring-purple-500"
                    />
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900">{message.title}</h2>
                      <p className="mt-1 text-gray-600">{message.body}</p>
                    </div>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${message.viewed ? 'bg-purple-100 text-purple-800' : 'bg-purple-900 text-white'}`}>
                    {message.viewed ? 'Viewed' : 'Unviewed'}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  )
}
