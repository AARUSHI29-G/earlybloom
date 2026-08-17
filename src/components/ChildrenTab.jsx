import React from 'react'

export default function ChildrenTab({ childrenData = [] }) {
	if (!childrenData || childrenData.length === 0) {
		return (
			<section className="space-y-6">
				<div className="rounded-3xl bg-white p-8 shadow-sm border border-gray-200">
					<h1 className="text-3xl font-bold text-purple-900">Children</h1>
					<p className="mt-2 text-gray-600">No children are available for this role yet.</p>
				</div>
			</section>
		)
	}

	return (
		<section className="space-y-6">
			<div className="rounded-3xl bg-white p-8 shadow-sm border border-gray-200">
				<h1 className="text-3xl font-bold text-purple-900">Children</h1>
				<p className="mt-2 text-gray-600">View and manage children enrolled in the program.</p>
			</div>

			<div className="grid gap-6 lg:grid-cols-2">
				{childrenData.map((child) => (
					<div key={child.id} className="rounded-3xl bg-white p-6 shadow-sm border border-gray-200">
						<div className="flex items-start justify-between">
							<h2 className="text-xl font-semibold text-purple-900">{child.name}</h2>
							<div className="text-sm text-gray-500">{child.status}</div>
						</div>
						<p className="mt-2 text-gray-600">Age: {child.age}</p>
						<p className="mt-1 text-gray-600">Milestone: {child.milestone}</p>
						{child.notes ? <p className="mt-2 text-gray-600">{child.notes}</p> : null}
					</div>
				))}
			</div>
		</section>
	)
}

