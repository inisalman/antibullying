const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing Supabase environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function testSchema() {
  try {
    console.log('🔍 Testing Supabase schema...')
    console.log('URL:', supabaseUrl)
    console.log('Key:', supabaseAnonKey.substring(0, 20) + '...')
    
    // Test each table individually
    const tables = ['siswa', 'sesi', 'kegiatan', 'jawaban']
    
    for (const table of tables) {
      console.log(`\n📊 Testing table: ${table}`)
      
      try {
        const { data, error } = await supabase
          .from(table)
          .select('*')
          .limit(1)
        
        if (error) {
          console.log(`❌ Error with ${table}:`, error.message)
        } else {
          console.log(`✅ ${table} table accessible`)
        }
      } catch (err) {
        console.log(`❌ Exception with ${table}:`, err.message)
      }
    }
    
    // Test inserting a simple record
    console.log('\n🧪 Testing insert into sesi table...')
    try {
      const { data, error } = await supabase
        .from('sesi')
        .insert([{
          nama_sesi: 'Test Session',
          deskripsi: 'Test description'
        }])
        .select()
        .single()
      
      if (error) {
        console.log('❌ Insert error:', error.message)
      } else {
        console.log('✅ Insert successful:', data)
        
        // Clean up test data
        await supabase
          .from('sesi')
          .delete()
          .eq('id', data.id)
        console.log('🧹 Test data cleaned up')
      }
    } catch (err) {
      console.log('❌ Insert exception:', err.message)
    }
    
  } catch (error) {
    console.error('❌ Schema test failed:', error.message)
  }
}

testSchema()


