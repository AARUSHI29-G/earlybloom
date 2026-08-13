import React from 'react'

export default function DonationTracker({ donations = {} }) {
  const { incomingFunds = 0, campaigns = [], sponsorships = [] } = donations

  return (
    <section className="space-y-6">
      <div className="rounded-3xl bg-white p-6 shadow-sm border border-gray-200 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-purple-900">Donation & Grant Tracker</h1>
          <p className="mt-1 text-gray-600">Incoming funds, active campaigns, and corporate sponsorships.</p>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-500">Incoming Funds</div>
          <div className="text-2xl font-bold text-purple-900">${incomingFunds.toLocaleString()}</div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl bg-white p-6 shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-purple-900">Active Campaigns</h2>
          <div className="mt-4 space-y-4">
            {campaigns.map((c) => (
              <div key={c.id} className="rounded-lg border border-gray-100 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-gray-900">{c.title}</div>
                    <div className="text-sm text-gray-600">Donors: {c.donors} • Corporate: {c.corporate || '—'}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">Raised</div>
                    <div className="font-bold text-purple-900">${c.raised}</div>
                  </div>
                </div>
                <div className="mt-3 h-3 w-full rounded-full bg-gray-100">
                  <div className="h-3 rounded-full bg-purple-700" style={{ width: `${Math.min(100, Math.round((c.raised / c.goal) * 100))}%` }} />
                </div>
                <div className="mt-2 text-xs text-gray-500">{Math.round((c.raised / c.goal) * 100)}% of ${c.goal} goal</div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-purple-900">Corporate Sponsorships</h2>
          <div className="mt-4 space-y-3">
            {sponsorships.map((s) => (
              <div key={s.id} className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-gray-900">{s.name}</div>
                  <div className="text-sm text-gray-600">Purpose: {s.purpose}</div>
                </div>
                <div className="font-bold text-purple-900">${s.amount}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
