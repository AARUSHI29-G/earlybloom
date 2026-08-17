import { supabase } from '../supabaseClient'

// Supabase-backed data access for simple app features used by the UI.
// Exposes promise-based methods the components call so the UI stays decoupled
// from the storage implementation.

export const db = {
  async getNotifications(role) {
    try {
      const { data, error } = await supabase.from('notifications').select('*').order('created_at', { ascending: false })
      if (error) throw error
      if (!data) return []
      // allow notifications scoped to a role or global (no role set)
      return data.filter((n) => !n.role || n.role === role)
    } catch (err) {
      console.error('getNotifications error', err)
      return []
    }
  },

  async markViewed(id) {
    try {
      const { data, error } = await supabase.from('notifications').update({ viewed: true }).eq('id', id).select().single()
      if (error) throw error
      return data
    } catch (err) {
      console.error('markViewed error', err)
      return null
    }
  },

  async deleteNotification(id) {
    try {
      const { error } = await supabase.from('notifications').delete().eq('id', id)
      if (error) throw error
      return true
    } catch (err) {
      console.error('deleteNotification error', err)
      return false
    }
  },

  async getMeetings() {
    try {
      const { data, error } = await supabase.from('meetings').select('*').order('created_at', { ascending: false })
      if (error) throw error
      return data || []
    } catch (err) {
      console.error('getMeetings error', err)
      return []
    }
  },

  async addMeeting(meeting) {
    try {
      const payload = { ...meeting, created_at: new Date().toISOString() }
      const { data, error } = await supabase.from('meetings').insert(payload).select().single()
      if (error) throw error
      return data
    } catch (err) {
      console.error('addMeeting error', err)
      return null
    }
  },

  // Profiles: fetch and update user profile stored in `profiles` table.
  async getProfile(username) {
    if (!username) return null
    try {
      const { data, error } = await supabase.from('profiles').select('*').eq('username', username).single()
      if (error) throw error
      return data || null
    } catch (err) {
      console.error('getProfile error', err)
      return null
    }
  },

  async updateProfile(username, attrs) {
    if (!username) return null
    try {
      const { data, error } = await supabase.from('profiles').update(attrs).eq('username', username).select().single()
      if (error) throw error
      return data || null
    } catch (err) {
      console.error('updateProfile error', err)
      return null
    }
  }
}
