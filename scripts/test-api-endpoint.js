const { addAnswerToSheet } = require('../lib/googleSheets');

async function testAPIEndpoint() {
  console.log('🧪 Testing API endpoint directly...\n');
  
  try {
    // Test data
    const testData = {
      nama: 'API Test User',
      sesi: '1',
      kegiatan: 'API Test Activity',
      jawaban: 'This is a test from API endpoint'
    };
    
    console.log('📝 Test data:', testData);
    console.log('🔧 Environment check:');
    console.log('- GOOGLE_SHEET_ID:', process.env.GOOGLE_SHEET_ID || 'NOT SET');
    console.log('- GOOGLE_CLIENT_EMAIL:', process.env.GOOGLE_CLIENT_EMAIL || 'NOT SET');
    console.log('- GOOGLE_PRIVATE_KEY:', process.env.GOOGLE_PRIVATE_KEY ? 'SET' : 'NOT SET');
    console.log('');
    
    // Test Google Sheets integration
    const result = await addAnswerToSheet(
      testData.nama,
      testData.sesi,
      testData.kegiatan,
      testData.jawaban
    );
    
    console.log('📊 Result:', result);
    
    if (result.success) {
      console.log('✅ API endpoint test SUCCESSFUL');
      console.log('📋 Check your Google Sheets for the test data');
    } else {
      console.log('❌ API endpoint test FAILED');
      console.log('🔍 Error:', result.error);
    }
    
    return result;
    
  } catch (error) {
    console.error('❌ Test failed with error:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

// Run the test if this file is executed directly
if (require.main === module) {
  testAPIEndpoint().catch(console.error);
}

module.exports = { testAPIEndpoint };
