const { createClient } = require('@supabase/supabase-js')

// Test connection to Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://epgcvasqbokathjvuyal.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVwZ2N2YXNxYm9rYXRoanZ1eWFsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg5OTA2MDUsImV4cCI6MjA3NDU2NjYwNX0.jvWc5_j8VMo7MzrXQSMmkjAgy9_1Rrj-vGrH7snQSH0'

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing Supabase environment variables')
  console.log('Please create .env.local file with:')
  console.log('NEXT_PUBLIC_SUPABASE_URL=https://epgcvasqbokathjvuyal.supabase.co')
  console.log('NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVwZ2N2YXNxYm9rYXRoanZ1eWFsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg5OTA2MDUsImV4cCI6MjA3NDU2NjYwNX0.jvWc5_j8VMo7MzrXQSMmkjAgy9_1Rrj-vGrH7snQSH0')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function testConnection() {
  try {
    console.log('🔍 Testing Supabase connection...')
    console.log('URL:', supabaseUrl)
    console.log('Key:', supabaseAnonKey.substring(0, 20) + '...')
    
    // Test connection by trying to fetch from a table
    const { data, error } = await supabase
      .from('siswa')
      .select('*')
      .limit(1)
    
    if (error) {
      if (error.code === 'PGRST205') {
        console.log('❌ Tables not found. Please run the SQL script in Supabase Dashboard:')
        console.log('1. Go to Supabase Dashboard → SQL Editor')
        console.log('2. Run the SQL from scripts/create-tables.sql')
        console.log('3. Then run: node scripts/seed-sessions.js')
      } else {
        console.error('❌ Connection error:', error)
      }
    } else {
      console.log('✅ Connection successful!')
      console.log('📊 Found', data.length, 'records in siswa table')
    }
  } catch (error) {
    console.error('❌ Connection failed:', error.message)
  }
}

testConnection()


