import React from 'react'

export default function VolunteersTab({ volunteers = [] }) {
  return (
    <section className="space-y-6">
      <div className="rounded-3xl bg-white p-6 shadow-sm border border-gray-200 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-purple-900">Volunteers</h1>
          <p className="mt-1 text-gray-600">Overview of active volunteers and recent feedback.</p>
        </div>
        <div>
          <button className="rounded-2xl bg-purple-900 px-4 py-2 text-white text-sm">Add Volunteer</button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {volunteers.map((v) => (
          <div key={v.id} className="rounded-3xl bg-white p-6 shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold text-purple-900">{v.name}</h2>
            <p className="mt-1 text-gray-600">Area: {v.area}</p>
            <p className="mt-1 text-gray-600">Last visit: {v.lastVisit}</p>
            <p className="mt-2 text-gray-700 font-semibold">Recent feedback</p>
            <div className="mt-1 text-gray-600">{v.feedback}</div>

            <div className="mt-4 flex gap-2">
              <button className="rounded-lg px-4 py-2 bg-white border border-gray-200 text-sm">Schedule</button>
              <button className="rounded-lg px-4 py-2 bg-white border border-gray-200 text-sm">Message</button>
              <button className={`rounded-lg px-4 py-2 text-sm ${v.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>{v.active ? 'Active' : 'Inactive'}</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
