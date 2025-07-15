import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://weather-report-vert.vercel.app/'; 
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InphZnprZ3N1eGF6bWR5cGtqc21mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI2MDAzOTAsImV4cCI6MjA2ODE3NjM5MH0.l9qv2Hw0y2nLcqRQyTvBkOuaU7MX8QcN8k_DOmAPniU'; // replace with your anon key

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

