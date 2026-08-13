export const dashboardDefinitions = {
  volunteer: {
    title: 'Volunteer Dashboard',
    subtitle: 'Track visits, upload reports, and stay connected to your community impact.',
    links: [
      { key: 'overview', label: 'Overview', path: '/dashboard/volunteer/overview' },
      { key: 'profile', label: 'Profile', path: '/dashboard/volunteer/profile' },
      { key: 'my-visits', label: 'My Visits', path: '/dashboard/volunteer/my-visits' },
      { key: 'reports', label: 'Reports', path: '/dashboard/volunteer/reports' },
      { key: 'achievements', label: 'Achievements', path: '/dashboard/volunteer/achievements' },
      { key: 'notification', label: 'Notification', path: '/dashboard/volunteer/notification' },
    ],
    profile: {
      salutation: 'Ms.',
      name: 'Priya Sharma',
      email: 'priya.sharma@example.org',
      address: '24 Rosewood Lane',
      pincode: '560034',
      country: 'India',
      state: 'Karnataka',
      city: 'Bengaluru',
    },
    visits: {
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
    },
    reports: [
      { id: 1, child: 'Aanya', feedback: 'The visit went smoothly. Caregiver engaged with milestone exercises.', date: '2026-08-10' },
      { id: 2, child: 'Ravi', feedback: 'Focused on nutrition counseling and daily routine check-in.', date: '2026-08-12' },
      { id: 3, child: 'Mira', feedback: 'Strong participation from family. Recommended follow-up in two weeks.', date: '2026-08-14' },
    ],
    analytics: [
      { id: 1, label: 'Upcoming Visits', value: '3' },
      { id: 2, label: 'Completed Visits', value: '12' },
      { id: 3, label: 'Reports Submitted', value: '8' },
      { id: 4, label: 'Unread Notifications', value: '2' },
    ],
    achievements: [
      { id: 1, title: '10 Visits Completed', details: 'Successfully completed ten community visits this month.' },
      { id: 2, title: 'Trusted Volunteer', details: 'Received a "Trusted Volunteer" badge for consistent reporting.' },
      { id: 3, title: 'Community Champion', details: 'Recognized for outstanding support in early childhood development.' },
    ],
    notifications: [
      { id: 1, title: 'Field visit rescheduled', body: 'Your Tuesday home visit has been moved to Thursday at 10:00 AM.', viewed: false },
      { id: 2, title: 'Report approved', body: 'Your latest visit report has been approved by the NGO admin.', viewed: true },
      { id: 3, title: 'New milestone assigned', body: 'A new milestone has been added for child Aaryan.', viewed: false },
      { id: 4, title: 'Meeting reminder', body: 'Volunteer coordination call tomorrow at 4:00 PM.', viewed: true },
    ],
  },
  parent: {
    title: 'Parent Dashboard',
    subtitle: 'Monitor your children’s progress, milestones, and upcoming family support sessions.',
    links: [
      { key: 'overview', label: 'Overview', path: '/dashboard/parent/overview' },
      { key: 'profile', label: 'Profile', path: '/dashboard/parent/profile' },
      { key: 'my-children', label: 'My Children', path: '/dashboard/parent/my-children' },
      { key: 'milestone', label: 'Milestone', path: '/dashboard/parent/milestone' },
      { key: 'visits', label: 'Visits', path: '/dashboard/parent/visits' },
      { key: 'resources', label: 'Resources', path: '/dashboard/parent/resources' },
      { key: 'notification', label: 'Notification', path: '/dashboard/parent/notification' },
    ],
    profile: {
      salutation: 'Mrs.',
      name: 'Ananya Verma',
      email: 'ananya.verma@example.org',
      address: '19 Jasmine Avenue',
      pincode: '560041',
      country: 'India',
      state: 'Karnataka',
      city: 'Mysuru',
    },
    children: [
      { id: 1, name: 'Aarav', age: '4 years', milestone: 'Speech development', status: 'On track' },
      { id: 2, name: 'Diya', age: '3 years', milestone: 'Fine motor skills', status: 'Needs review' },
      { id: 3, name: 'Kabir', age: '2 years', milestone: 'Nutrition focus', status: 'On track' },
      { id: 4, name: 'Meera', age: '5 years', milestone: 'Play and bonding', status: 'On track' },
    ],
    childReports: [
      {
        id: 1,
        childId: 1,
        summary: 'Aarav is progressing steadily in speech development. Continue daily storytelling and naming games to support expressive language.',
        milestones: [
          { id: 1, title: 'Language Check', progress: 86, notes: 'Uses full sentences during guided story time and names familiar objects confidently.' },
          { id: 2, title: 'Nutrition Support', progress: 72, notes: 'Meal routine is stable. Add more iron-rich foods and track appetite after school.' },
          { id: 3, title: 'Play & Bonding', progress: 58, notes: 'Enjoys shared reading and pretend play. Encourage turn-taking games twice a week.' },
        ],
      },
      {
        id: 2,
        childId: 2,
        summary: 'Diya needs more fine motor play sessions. Focus on drawing, beading, and sensory activities to improve hand coordination.',
        milestones: [
          { id: 1, title: 'Language Check', progress: 64, notes: 'Responds to simple prompts and repeats short phrases with support.' },
          { id: 2, title: 'Nutrition Support', progress: 69, notes: 'Balanced meals are improving. Keep offering small portions frequently through the day.' },
          { id: 3, title: 'Play & Bonding', progress: 83, notes: 'Loves puzzle play and songs with caregiver. Add daily drawing for hand strength.' },
        ],
      },
      {
        id: 3,
        childId: 3,
        summary: 'Kabir is improving in nutrition routines. Family should continue feeding schedule and hydration tracking.',
        milestones: [
          { id: 1, title: 'Language Check', progress: 52, notes: 'Recognizes common words and responds to name with support.' },
          { id: 2, title: 'Nutrition Support', progress: 91, notes: 'Strong meal adherence. Maintain protein intake and monitor weight monthly.' },
          { id: 3, title: 'Play & Bonding', progress: 61, notes: 'Responds well to songs and peekaboo games. Continue short play bursts daily.' },
        ],
      },
      {
        id: 4,
        childId: 4,
        summary: 'Meera shows strong social engagement. Keep pairing play activities with story-based conversations.',
        milestones: [
          { id: 1, title: 'Language Check', progress: 78, notes: 'Asks simple questions and enjoys naming colors and shapes during play.' },
          { id: 2, title: 'Nutrition Support', progress: 74, notes: 'Healthy eating is consistent. Introduce more fruits and note any skipped meals.' },
          { id: 3, title: 'Play & Bonding', progress: 88, notes: 'Very active in cooperative games. Continue family play routines each evening.' },
        ],
      },
    ],
    milestones: [
      { id: 1, title: 'Language Check', progress: 80, notes: 'Completed early language prompts and storytelling routine.' },
      { id: 2, title: 'Nutrition Support', progress: 65, notes: 'Healthy meal guidance shared with mother.' },
      { id: 3, title: 'Play & Bonding', progress: 40, notes: 'Next field visit will focus on interactive playtime.' },
    ],
    visits: {
      upcoming: [
        { id: 1, child: 'Aarav', purpose: 'Growth review', date: '2026-08-11', status: 'Confirmed' },
        { id: 2, child: 'Diya', purpose: 'Speech activity', date: '2026-08-13', status: 'Confirmed' },
      ],
      completed: [
        { id: 3, child: 'Aarav', purpose: 'Nutrition check', date: '2026-08-02', status: 'Completed' },
      ],
    },
    resources: [
      { id: 1, title: 'Home Learning Kit', description: 'Printable activity cards for early literacy and counting.' },
      { id: 2, title: 'Healthy Meal Guide', description: 'Nutrition tips for toddlers and school-aged children.' },
      { id: 3, title: 'Parent Coaching Schedule', description: 'Weekly guidance sessions with the NGO family coach.' },
    ],
    notifications: [
      { id: 1, title: 'Session confirmed', body: 'Your next home visit is scheduled for Monday at 11:00 AM.', viewed: true },
      { id: 2, title: 'New child update', body: 'Aarav’s growth chart has been refreshed by the field worker.', viewed: false },
    ],
    analytics: [
      { id: 1, label: 'Children', value: '2' },
      { id: 2, label: 'Upcoming Visits', value: '2' },
      { id: 3, label: 'Milestones Active', value: '3' },
      { id: 4, label: 'Unread Notifications', value: '1' },
    ],
  },
  admin: {
    title: 'Admin Dashboard',
    subtitle: 'Oversee volunteers, children, reports, and program analytics from one control center.',
    links: [
      { key: 'overview', label: 'Overview', path: '/dashboard/admin/overview' },
      { key: 'profile', label: 'Profile', path: '/dashboard/admin/profile' },
      { key: 'children', label: 'Children', path: '/dashboard/admin/children' },
      { key: 'volunteers', label: 'Volunteers', path: '/dashboard/admin/volunteers' },
      { key: 'donation', label: 'Donation & Grants', path: '/dashboard/admin/donation' },
      { key: 'reports', label: 'Reports', path: '/dashboard/admin/reports' },
      { key: 'analytics', label: 'Analytics', path: '/dashboard/admin/analytics' },
    ],
    profile: {
      salutation: 'Mr.',
      name: 'Rajesh Kumar',
      email: 'rajesh.kumar@example.org',
      address: '8 Lotus Boulevard',
      pincode: '560029',
      country: 'India',
      state: 'Karnataka',
      city: 'Bengaluru',
    },
    children: [
      { id: 1, name: 'Aarav', age: '4', center: 'Cluster 3', status: 'Active', parent: 'Ananya Verma', lastVisit: '2026-08-02', nextVisit: '2026-08-11', attendancePct: 92, volunteerFeedback: 'Responsive family and active participation.' },
      { id: 2, name: 'Diya', age: '3', center: 'Cluster 5', status: 'Active', parent: 'Rajesh Singh', lastVisit: '2026-08-04', nextVisit: '2026-08-13', attendancePct: 78, volunteerFeedback: 'Needs more fine motor practice at home.' },
      { id: 3, name: 'Mira', age: '5', center: 'Community Center', status: 'Needs review', parent: 'Sanya Kumar', lastVisit: '2026-07-28', nextVisit: '2026-08-20', attendancePct: 65, volunteerFeedback: 'Missed two sessions; follow-up required.' },
    ],
    volunteers: [
      { id: 1, name: 'Priya Sharma', area: 'Bengaluru Rural', active: true, lastVisit: '2026-08-10', feedback: 'Good engagement; caregiver practiced activities.' },
      { id: 2, name: 'Rohit Singh', area: 'Mysuru', active: true, lastVisit: '2026-08-08', feedback: 'Covered nutrition counseling and updated growth chart.' },
      { id: 3, name: 'Neha Patel', area: 'Tumakuru', active: false, lastVisit: '2026-07-20', feedback: 'On leave for July; returns next month.' },
    ],
    reports: [
      { id: 1, title: 'Monthly Impact', summary: '25 new families reached this month across three districts.', date: '2026-08-01' },
      { id: 2, title: 'Volunteer Coverage', summary: 'Volunteer visits increased by 18% versus last month.', date: '2026-08-08' },
      { id: 3, title: 'Child Outcomes', summary: 'Early milestones improved in 72% of assessed children.', date: '2026-08-12' },
    ],
    analytics: [
      { id: 1, label: 'Active Volunteers', value: '18' },
      { id: 2, label: 'Children Enrolled', value: '142' },
      { id: 3, label: 'Visits This Week', value: '32' },
      { id: 4, label: 'Reports Pending', value: '7' },
    ],
    notifications: [
      { id: 1, title: 'New donation received', body: 'A donation of $2,000 has been recorded for the Nutrition Campaign.', viewed: false },
      { id: 2, title: 'Volunteer meeting scheduled', body: 'All-staff coordination meeting on Friday at 3:00 PM.', viewed: false },
      { id: 3, title: 'Report pending approval', body: 'Child outcomes report for Cluster 5 awaiting review.', viewed: true },
    ],
    donations: {
      incomingFunds: 12500,
      campaigns: [
        { id: 1, title: 'Nutrition Drive', raised: 8200, goal: 15000, donors: 42, corporate: 'Sunrise Foods' },
        { id: 2, title: 'Learning Kits', raised: 4300, goal: 5000, donors: 18, corporate: null },
      ],
      sponsorships: [
        { id: 1, name: 'Sunrise Foods', amount: 5000, purpose: 'Nutrition Drive' },
      ],
    },
  },
}

export const overviewMetrics = {
  volunteer: [
    { id: 1, label: 'Upcoming Visits', value: '3' },
    { id: 2, label: 'Completed Visits', value: '12' },
    { id: 3, label: 'Reports Submitted', value: '8' },
    { id: 4, label: 'Unread Notifications', value: '2' },
  ],
  parent: [
    { id: 1, label: 'Children', value: '4' },
    { id: 2, label: 'Upcoming Visits', value: '2' },
    { id: 3, label: 'Milestones Active', value: '3' },
    { id: 4, label: 'Unread Notifications', value: '1' },
  ],
  admin: [
    { id: 1, label: 'Active Volunteers', value: '18' },
    { id: 2, label: 'Children Enrolled', value: '142' },
    { id: 3, label: 'Visits This Week', value: '32' },
    { id: 4, label: 'Reports Pending', value: '7' },
  ],
}
