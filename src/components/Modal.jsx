import React from 'react'

export default function Modal({ open, onClose, title, children }) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-40" onClick={onClose} />
      <div className="relative w-full max-w-2xl mx-4 rounded-2xl bg-white p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-purple-900">{title}</h3>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-900">Close</button>
        </div>
        <div className="mt-4">{children}</div>
      </div>
    </div>
  )
}
