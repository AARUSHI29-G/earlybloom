import { createClient } from '@supabase/supabase-js'

// ⚡ Vite settings syntax to fetch secret tokens safely
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error("⚠️ System alert: Credentials missing inside .env.local configuration file!")
}

export const supabase = createClient(supabaseUrl, supabaseKey)

