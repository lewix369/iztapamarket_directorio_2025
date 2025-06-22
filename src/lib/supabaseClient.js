
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qjuytjpthaxabjedqoez.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFqdXl0anB0aGF4YWJqZWRxb2V6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk2MDM5NzcsImV4cCI6MjA2NTE3OTk3N30.xqntwY_4NnesCd4U9DZHuZ_eZ6ZRH4jExY7_6KuMy3g';

let supabaseInstance;

try {
  supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);
} catch (error) {
  console.error("Error creating Supabase client:", error);
  supabaseInstance = null; 
}

export const supabase = supabaseInstance;
