import { supabase } from '../supabaseClient'

const LS_KEYS = {
  notifications: 'eb_notifications',
  volunteers: 'eb_volunteers',
  children: 'eb_children',
  meetings: 'eb_meetings',
}

const trySupabase = async (fn) => {
  try {
    if (!supabase) throw new Error('no supabase')
    return await fn()
  } catch (err) {
    return null
  }
}

const readLS = (key, fallback = []) => {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch (e) {
    return fallback
  }
}

const writeLS = (key, val) => localStorage.setItem(key, JSON.stringify(val))

export const db = {
  async getNotifications(role = 'admin') {
    const sup = await trySupabase(() => supabase.from('notifications').select('*'))
    if (sup && sup.data) return sup.data
    return readLS(LS_KEYS.notifications, [])
  },
  async addNotification(n) {
    await trySupabase(() => supabase.from('notifications').insert(n))
    const cur = readLS(LS_KEYS.notifications, [])
    cur.unshift(n)
    writeLS(LS_KEYS.notifications, cur)
    return n
  },
  async markViewed(id) {
    await trySupabase(() => supabase.from('notifications').update({ viewed: true }).eq('id', id))
    const cur = readLS(LS_KEYS.notifications, [])
    const idx = cur.findIndex((x) => x.id === id)
    if (idx >= 0) {
      cur[idx].viewed = true
      writeLS(LS_KEYS.notifications, cur)
    }
    return true
  },
  async deleteNotification(id) {
    await trySupabase(() => supabase.from('notifications').delete().eq('id', id))
    const cur = readLS(LS_KEYS.notifications, [])
    writeLS(LS_KEYS.notifications, cur.filter((x) => x.id !== id))
    return true
  },

  async getVolunteers() {
    const sup = await trySupabase(() => supabase.from('volunteers').select('*'))
    if (sup && sup.data) return sup.data
    return readLS(LS_KEYS.volunteers, [])
  },
  async addVolunteer(v) {
    v.id = Date.now()
    await trySupabase(() => supabase.from('volunteers').insert(v))
    const cur = readLS(LS_KEYS.volunteers, [])
    cur.unshift(v)
    writeLS(LS_KEYS.volunteers, cur)
    return v
  },

  async getChildren() {
    const sup = await trySupabase(() => supabase.from('children').select('*'))
    if (sup && sup.data) return sup.data
    return readLS(LS_KEYS.children, [])
  },
  async addChild(c) {
    c.id = Date.now()
    await trySupabase(() => supabase.from('children').insert(c))
    const cur = readLS(LS_KEYS.children, [])
    cur.unshift(c)
    writeLS(LS_KEYS.children, cur)
    return c
  },

  async sendVolunteerMessage(volunteerId, message) {
    const note = { id: Date.now(), volunteerId, message, created_at: new Date().toISOString() }
    await trySupabase(() => supabase.from('messages').insert(note))
    return note
  },

  async addMeeting(meeting) {
    meeting.id = Date.now()
    await trySupabase(() => supabase.from('meetings').insert(meeting))
    const cur = readLS(LS_KEYS.meetings, [])
    cur.unshift(meeting)
    writeLS(LS_KEYS.meetings, cur)
    return meeting
  },

  async getMeetings() {
    const sup = await trySupabase(() => supabase.from('meetings').select('*'))
    if (sup && sup.data) return sup.data
    return readLS(LS_KEYS.meetings, [])
  },

  // Assign volunteer to child by saving volunteerId on child
  async assignVolunteerToChild(childId, volunteerId) {
    await trySupabase(() => supabase.from('children').update({ volunteerId }).eq('id', childId))
    const children = readLS(LS_KEYS.children, [])
    const idx = children.findIndex((c) => c.id === childId)
    if (idx >= 0) {
      children[idx].volunteerId = volunteerId
      writeLS(LS_KEYS.children, children)
    }
    return true
  },
}
