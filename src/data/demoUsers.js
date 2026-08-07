export const demoUsers = [
  {
    username: 'vol',
    password: '1234',
    role: 'volunteer',
    name: 'Priya Sharma',
    dashboardPath: '/dashboard/volunteer/profile',
  },
  {
    username: 'parent',
    password: '1234',
    role: 'parent',
    name: 'Ananya Verma',
    dashboardPath: '/dashboard/parent/profile',
  },
  {
    username: 'admin',
    password: '1234',
    role: 'admin',
    name: 'Rajesh Kumar',
    dashboardPath: '/dashboard/admin/profile',
  },
]

export function findDemoUser(username, password) {
  return demoUsers.find(
    (user) => user.username.toLowerCase() === username.toLowerCase() && user.password === password,
  )
}
