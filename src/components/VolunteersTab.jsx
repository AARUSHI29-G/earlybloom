import React, { useState, useEffect } from 'react'
import Modal from './Modal'
import { db } from '../lib/db'

export default function VolunteersTab({ volunteers = [] }) {
  const [openModal, setOpenModal] = useState(null)
  const [list, setList] = useState(volunteers)
  const [children, setChildren] = useState([])
  const [showAdd, setShowAdd] = useState(false)
  const [newVolunteer, setNewVolunteer] = useState({ name: '', area: '', active: true, feedback: '' })

  useEffect(() => {
    let mounted = true
    db.getVolunteers().then((v) => { if (mounted && v) setList(v) })
    db.getChildren().then((c) => { if (mounted && c) setChildren(c) })
    return () => { mounted = false }
  }, [])

  return (
    <section className="space-y-6">
      <div className="rounded-3xl bg-white p-6 shadow-sm border border-gray-200 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-purple-900">Volunteers</h1>
          <p className="mt-1 text-gray-600">Overview of active volunteers and recent feedback.</p>
        </div>
        <div>
          <button onClick={() => setShowAdd(true)} className="rounded-2xl bg-purple-900 px-4 py-2 text-white text-sm">Add Volunteer</button>
        </div>
      </div>

      <div className="grid gap-6 grid-cols-1">
        {list.map((v) => {
          const assigned = children.filter((c) => c.volunteerId === v.id)
          return (
          <div key={v.id} className="cursor-default rounded-3xl bg-white p-6 shadow-sm border border-gray-200 w-full">
            <div onClick={() => setOpenModal(v)} className="cursor-pointer">
              <h2 className="text-xl font-semibold text-purple-900">{v.name}</h2>
              <div className="mt-1 text-gray-600">Area: {v.area}</div>
            </div>
            {assigned.length ? (
              <div className="mt-3 text-sm text-gray-600">
                <div className="font-semibold text-gray-800">Assigned Children</div>
                <ul className="mt-2 list-disc list-inside">
                  {assigned.map((c) => (
                    <li key={c.id}>{c.name} — parent: {c.parent || '—'}</li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        )})}
      </div>

      <Modal open={!!openModal} onClose={() => setOpenModal(null)} title={openModal?.name || ''}>
        {openModal ? (
          <div>
            <div className="text-sm text-gray-600">Area: {openModal.area}</div>
            <div className="text-sm text-gray-600">Last visit: {openModal.lastVisit}</div>
            <div className="mt-3 text-sm font-semibold text-gray-700">Recent feedback</div>
            <div className="mt-1 text-gray-600">{openModal.feedback}</div>

            <div className="mt-4">
              <label className="block text-sm font-semibold text-gray-700">Children Assigned</label>
              <select className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-2" value={''} onChange={async (e) => {
                const childId = Number(e.target.value)
                await db.assignVolunteerToChild(childId, openModal.id)
                // refresh children
                const c = await db.getChildren(); setChildren(c)
              }}>
                <option value="">Assign child...</option>
                {children.map((ch) => (
                  <option key={ch.id} value={ch.id}>{ch.name}</option>
                ))}
              </select>

              </div>

              <div className="mt-4 flex gap-2">
              <button className="rounded-lg px-4 py-2 bg-white border border-gray-200 text-sm">Schedule</button>
              <button onClick={() => window.dispatchEvent(new CustomEvent('openSchedule', { detail: { title: `Meeting with ${openModal.name}`, volunteerId: openModal.id } }))} className="rounded-lg px-4 py-2 bg-white border border-gray-200 text-sm">Schedule</button>
              <button onClick={async () => { const note = await db.sendVolunteerMessage(openModal.id, 'Hello from admin'); alert('Message sent'); }} className="rounded-lg px-4 py-2 bg-white border border-gray-200 text-sm">Message</button>
              <button className={`rounded-lg px-4 py-2 text-sm ${openModal.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>{openModal.active ? 'Active' : 'Inactive'}</button>
            </div>
          </div>
        ) : null}
      </Modal>

      <Modal open={showAdd} onClose={() => setShowAdd(false)} title="Add Volunteer">
        <div>
          <label className="block text-sm font-semibold text-gray-700">Name</label>
          <input value={newVolunteer.name} onChange={(e) => setNewVolunteer((s) => ({ ...s, name: e.target.value }))} className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-2" />
          <label className="mt-3 block text-sm font-semibold text-gray-700">Area</label>
          <input value={newVolunteer.area} onChange={(e) => setNewVolunteer((s) => ({ ...s, area: e.target.value }))} className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-2" />
          <label className="mt-3 block text-sm font-semibold text-gray-700">Initial Feedback</label>
          <textarea value={newVolunteer.feedback} onChange={(e) => setNewVolunteer((s) => ({ ...s, feedback: e.target.value }))} rows={3} className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-2" />
          <div className="mt-4 flex gap-2">
            <button onClick={async () => {
              const v = await db.addVolunteer(newVolunteer)
              setList((s) => [v, ...s])
              setShowAdd(false)
              setNewVolunteer({ name: '', area: '', active: true, feedback: '' })
            }} className="rounded-2xl bg-purple-900 text-white px-4 py-2">Add</button>
            <button onClick={() => setShowAdd(false)} className="rounded-2xl bg-white border border-gray-200 px-4 py-2">Cancel</button>
          </div>
        </div>
      </Modal>
    </section>
  )
}
