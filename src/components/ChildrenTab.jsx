import React, { useMemo, useState, useEffect } from 'react'
import Modal from './Modal'
import { db } from '../lib/db'

export default function ChildrenTab({ childrenData = [] }) {
  const [query, setQuery] = useState('')
  const [activeAction, setActiveAction] = useState({})
  const [openModal, setOpenModal] = useState(null)
  const [children, setChildren] = useState(childrenData)
  const [volunteers, setVolunteers] = useState([])
  const [showAdd, setShowAdd] = useState(false)
  const [newChild, setNewChild] = useState({ name: '', age: '', parent: '', center: '', attendancePct: 0, volunteerId: null })

  useEffect(() => {
    let mounted = true
    db.getChildren().then((list) => { if (mounted && list) setChildren(list) })
    db.getVolunteers().then((v) => { if (mounted && v) setVolunteers(v) })
    return () => { mounted = false }
  }, [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return children
    return children.filter((c) => `${c.name} ${c.parent} ${c.center}`.toLowerCase().includes(q))
  }, [query, children])

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
        <div className="flex items-center gap-3">
          <button onClick={() => setShowAdd(true)} className="rounded-2xl bg-purple-900 px-4 py-2 text-white text-sm">Add Child</button>
          <div className="w-64">
          <input
            placeholder="Search child or parent"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-2xl border border-gray-200 px-4 py-2 text-sm bg-gray-50"
          />
          </div>
        </div>
      </div>

      <div className="grid gap-6 grid-cols-1">
        {filtered.map((child) => (
          <div key={child.id} onClick={() => setOpenModal(child)} className="cursor-pointer rounded-3xl bg-white p-6 shadow-sm border border-gray-200 w-full">
            <div>
              <h2 className="text-xl font-semibold text-purple-900">{child.name}</h2>
              <div className="mt-1 text-gray-600">Parent: {child.parent}</div>
            </div>
          </div>
        ))}
      </div>

      <Modal open={!!openModal} onClose={() => setOpenModal(null)} title={openModal?.name || ''}>
        {openModal ? (
          <div>
            <div className="text-sm text-gray-600">Age: {openModal.age}</div>
            <div className="text-sm text-gray-600">Center: {openModal.center}</div>
            <div className="text-sm text-gray-600">Volunteer: {volunteers.find((v) => v.id === openModal.volunteerId)?.name || '—'}</div>
            <div className="mt-3">
              <div className="text-sm text-gray-700 font-semibold">Attendance</div>
              <div className="mt-2 h-3 w-full rounded-full bg-gray-100">
                <div className="h-3 rounded-full bg-purple-700" style={{ width: `${openModal.attendancePct}%` }} />
              </div>
              <div className="mt-2 text-xs text-gray-500">{openModal.attendancePct}% attendance</div>
            </div>
            <div className="mt-4 rounded-2xl bg-purple-50 p-3 text-sm text-purple-900">
              <div className="font-semibold">Volunteer feedback</div>
              <div className="mt-1 text-gray-600">{openModal.volunteerFeedback}</div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-semibold text-gray-700">Add note / message</label>
              <textarea
                rows={3}
                value={activeAction.text}
                onChange={(e) => setActiveAction((s) => ({ ...s, text: e.target.value }))}
                placeholder={`Enter note for ${openModal.name}`}
                className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-2 text-sm bg-gray-50"
              />
              <div className="mt-2 flex gap-2">
                <button onClick={() => submitAction(openModal)} className="rounded-2xl bg-purple-900 text-white px-4 py-2">Send</button>
                <button onClick={() => setActiveAction({})} className="rounded-2xl bg-white border border-gray-200 px-4 py-2">Clear</button>
              </div>
            </div>
          </div>
        ) : null}
      </Modal>

      <Modal open={showAdd} onClose={() => setShowAdd(false)} title="Add Child">
        <div>
          <label className="block text-sm font-semibold text-gray-700">Name</label>
          <input value={newChild.name} onChange={(e) => setNewChild((s) => ({ ...s, name: e.target.value }))} className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-2" />
          <label className="mt-3 block text-sm font-semibold text-gray-700">Age</label>
          <input value={newChild.age} onChange={(e) => setNewChild((s) => ({ ...s, age: e.target.value }))} className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-2" />
          <label className="mt-3 block text-sm font-semibold text-gray-700">Parent</label>
          <input value={newChild.parent} onChange={(e) => setNewChild((s) => ({ ...s, parent: e.target.value }))} className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-2" />
          <label className="mt-3 block text-sm font-semibold text-gray-700">Center</label>
          <input value={newChild.center} onChange={(e) => setNewChild((s) => ({ ...s, center: e.target.value }))} className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-2" />
          <label className="mt-3 block text-sm font-semibold text-gray-700">Assign Volunteer</label>
          <select value={newChild.volunteerId || ''} onChange={(e) => setNewChild((s) => ({ ...s, volunteerId: e.target.value ? Number(e.target.value) : null }))} className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-2">
            <option value="">— none —</option>
            {volunteers.map((v) => (<option key={v.id} value={v.id}>{v.name}</option>))}
          </select>
          <div className="mt-4 flex gap-2">
            <button onClick={async () => { const c = await db.addChild(newChild); if (newChild.volunteerId) await db.assignVolunteerToChild(c.id, newChild.volunteerId); setChildren((s) => [c, ...s]); setShowAdd(false); setNewChild({ name: '', age: '', parent: '', center: '', attendancePct: 0 }) }} className="rounded-2xl bg-purple-900 text-white px-4 py-2">Add</button>
            <button onClick={() => setShowAdd(false)} className="rounded-2xl bg-white border border-gray-200 px-4 py-2">Cancel</button>
          </div>
        </div>
      </Modal>
    </section>
  )
}
