import { createClient } from '@supabase/supabase-js';

// 💡 In copy variables string lines ko apne real Supabase API credentials se replace kijiye
const supabaseUrl = 'https://bsalfidssvfqpeohuvov.supabase.co'; 
const supabaseAnonKey = 'sb_publishable_Vlo_dO5I0m5nB8v4zQHZNA_TutmbbOE';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
