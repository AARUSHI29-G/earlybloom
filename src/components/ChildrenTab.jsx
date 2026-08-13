import React, { useMemo, useState } from 'react'

export default function ChildrenTab({ childrenData = [] }) {
  const [query, setQuery] = useState('')
  const [activeAction, setActiveAction] = useState({})

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return childrenData
    return childrenData.filter((c) => `${c.name} ${c.parent} ${c.center}`.toLowerCase().includes(q))
  }, [query, childrenData])

  const openAction = (childId, action) => {
    setActiveAction({ childId, action, text: '' })
  }

  const submitAction = (child) => {
    // In real app, send to API. For demo, show alert and close.
    alert(`${activeAction.action} for ${child.name}: ${activeAction.text}`)
    setActiveAction({})
  }

  return (
    <section className="space-y-6">
      <div className="rounded-3xl bg-white p-6 shadow-sm border border-gray-200 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-purple-900">Children</h1>
          <p className="mt-1 text-gray-600">Search, review last/next visits, attendance and volunteer feedback.</p>
        </div>
        <div className="w-64">
          <input
            placeholder="Search child or parent"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-2xl border border-gray-200 px-4 py-2 text-sm bg-gray-50"
          />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {filtered.map((child) => (
          <div key={child.id} className="rounded-3xl bg-white p-6 shadow-sm border border-gray-200">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-semibold text-purple-900">{child.name} <span className="text-sm text-gray-500">({child.age})</span></h2>
                <div className="mt-1 text-gray-600">Parent: {child.parent}</div>
                <div className="mt-1 text-gray-600">Center: {child.center}</div>
              </div>
              <div className="text-right text-sm">
                <div className="text-gray-600">Last: {child.lastVisit}</div>
                <div className="text-gray-600">Next: {child.nextVisit}</div>
              </div>
            </div>

            <div className="mt-4">
              <div className="text-sm text-gray-700 font-semibold">Attendance</div>
              <div className="mt-2 h-3 w-full rounded-full bg-gray-100">
                <div className="h-3 rounded-full bg-purple-700" style={{ width: `${child.attendancePct}%` }} />
              </div>
              <div className="mt-2 text-xs text-gray-500">{child.attendancePct}% attendance</div>
            </div>

            <div className="mt-4 rounded-2xl bg-purple-50 p-3 text-sm text-purple-900">
              <div className="font-semibold">Volunteer feedback</div>
              <div className="mt-1 text-gray-600">{child.volunteerFeedback}</div>
            </div>

            <div className="mt-4 flex gap-2">
              <button onClick={() => openAction(child.id, 'Log Visit')} className="rounded-lg px-4 py-2 bg-purple-900 text-white text-sm">Log Visit</button>
              <button onClick={() => openAction(child.id, 'Add Note')} className="rounded-lg px-4 py-2 bg-white border border-gray-200 text-sm">Add Note</button>
              <button onClick={() => openAction(child.id, 'Message Parent')} className="rounded-lg px-4 py-2 bg-white border border-gray-200 text-sm">Message Parent</button>
            </div>

            {activeAction.childId === child.id ? (
              <div className="mt-4">
                <textarea
                  rows={3}
                  value={activeAction.text}
                  onChange={(e) => setActiveAction((s) => ({ ...s, text: e.target.value }))}
                  placeholder={`Enter ${activeAction.action} for ${child.name}`}
                  className="w-full rounded-2xl border border-gray-200 px-4 py-2 text-sm bg-gray-50"
                />
                <div className="mt-2 flex gap-2">
                  <button onClick={() => submitAction(child)} className="rounded-2xl bg-purple-900 text-white px-4 py-2">Send</button>
                  <button onClick={() => setActiveAction({})} className="rounded-2xl bg-white border border-gray-200 px-4 py-2">Cancel</button>
                </div>
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  )
}
