import React from 'react'

export default function VolunteersTab({ volunteers = [] }) {
  if (!volunteers || volunteers.length === 0) {
    return (
      <section className="space-y-6">
        <div className="rounded-3xl bg-white p-8 shadow-sm border border-gray-200">
          <h1 className="text-3xl font-bold text-purple-900">Volunteers</h1>
          <p className="mt-2 text-gray-600">No volunteers have been added yet.</p>
        </div>
      </section>
    )
  }

  return (
    <section className="space-y-6">
      <div className="rounded-3xl bg-white p-8 shadow-sm border border-gray-200">
        <h1 className="text-3xl font-bold text-purple-900">Volunteers</h1>
        <p className="mt-2 text-gray-600">Manage volunteers and view contact details.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {volunteers.map((v) => (
          <div key={v.id || v.email} className="rounded-3xl bg-white p-6 shadow-sm border border-gray-200">
            <div className="flex items-start justify-between">
              <h2 className="text-xl font-semibold text-purple-900">{v.name || v.fullName || v.email}</h2>
              <div className="text-sm text-gray-500">{v.status || 'active'}</div>
            </div>
            {v.role ? <div className="mt-1 text-sm text-gray-600">Role: {v.role}</div> : null}
            {v.phone ? <div className="mt-2 text-gray-600">Phone: {v.phone}</div> : null}
            {v.email ? <div className="mt-1 text-gray-600">Email: {v.email}</div> : null}
            {v.hours ? <div className="mt-2 text-sm text-gray-700">Hours contributed: {v.hours}</div> : null}
          </div>
        ))}
      </div>
    </section>
  )
}
