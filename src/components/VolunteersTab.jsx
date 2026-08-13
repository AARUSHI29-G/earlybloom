import React, { useState, useEffect } from 'react'
import Modal from './Modal'
import { db } from '../lib/db'

export default function VolunteersTab({ volunteers = [] }) {
  const [openModal, setOpenModal] = useState(null)
  const [list, setList] = useState(volunteers)
  const [children, setChildren] = useState([])

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
          <button className="rounded-2xl bg-purple-900 px-4 py-2 text-white text-sm">Add Volunteer</button>
        </div>
      </div>

      <div className="grid gap-6 grid-cols-1">
        {list.map((v) => (
          <div key={v.id} onClick={() => setOpenModal(v)} className="cursor-pointer rounded-3xl bg-white p-6 shadow-sm border border-gray-200 w-full">
            <h2 className="text-xl font-semibold text-purple-900">{v.name}</h2>
            <div className="mt-1 text-gray-600">Area: {v.area}</div>
          </div>
        ))}
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
              <button onClick={async () => { const note = await db.sendVolunteerMessage(openModal.id, 'Hello from admin'); alert('Message sent'); }} className="rounded-lg px-4 py-2 bg-white border border-gray-200 text-sm">Message</button>
              <button className={`rounded-lg px-4 py-2 text-sm ${openModal.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>{openModal.active ? 'Active' : 'Inactive'}</button>
            </div>
          </div>
        ) : null}
      </Modal>
    </section>
  )
}
