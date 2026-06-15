
import { createClient } from "@supabase/supabase-js"

  const URL = 'https://rjfdnxdtbckigdpdgkzx.supabase.co'
  const CHAVE = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJqZmRueGR0YmNraWdkcGRna3p4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE0NzA3NTUsImV4cCI6MjA5NzA0Njc1NX0.x3UZQOMzFp0lFRh_Rofn-freIflVpBfGSKxzYe9bwN4'

const supabase = createClient(URL, CHAVE)

export default supabase;