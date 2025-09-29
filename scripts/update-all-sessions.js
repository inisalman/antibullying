const fs = require('fs');
const path = require('path');

// Configuration for each session
const sessionConfigs = [
  {
    file: 'app/sesi/berani-bicara/page.tsx',
    sessionName: 'Sesi 3: Berani Bicara',
    activities: [
      { handler: 'handleDiscussionSubmit', activityName: 'Strategi Komunikasi' },
      { handler: 'handleAssertiveSubmit', activityName: 'Role Play' },
      { handler: 'handleQnASubmit', activityName: 'Membangun Kepercayaan Diri' }
    ]
  },
  {
    file: 'app/sesi/kawan-sejati/page.tsx',
    sessionName: 'Sesi 4: Kawan Sejati',
    activities: [
      { handler: 'handleDiscussionSubmit', activityName: 'Ciri-ciri Teman Sejati' },
      { handler: 'handleReflectionSubmit', activityName: 'Membangun Persahabatan' },
      { handler: 'handleCaseStudySubmit', activityName: 'Mendukung Teman' }
    ]
  },
  {
    file: 'app/sesi/coping-cerdas/page.tsx',
    sessionName: 'Sesi 5: Coping Cerdas',
    activities: [
      { handler: 'handleDiscussionSubmit', activityName: 'Teknik Relaksasi' },
      { handler: 'handleReflectionSubmit', activityName: 'Mengelola Emosi' },
      { handler: 'handleCaseStudySubmit', activityName: 'Positive Self-Talk' }
    ]
  },
  {
    file: 'app/sesi/kendalikan-bullying/page.tsx',
    sessionName: 'Sesi 6: Kendalikan Bullying',
    activities: [
      { handler: 'handleDiscussionSubmit', activityName: 'Strategi Pencegahan' },
      { handler: 'handleReflectionSubmit', activityName: 'Intervensi Bystander' },
      { handler: 'handleCaseStudySubmit', activityName: 'Membangun Budaya Positif' }
    ]
  },
  {
    file: 'app/sesi/refleksi-cerita-inspiratif/page.tsx',
    sessionName: 'Sesi 7: Refleksi Cerita Inspiratif',
    activities: [
      { handler: 'handleDiscussionSubmit', activityName: 'Cerita Inspiratif' },
      { handler: 'handleReflectionSubmit', activityName: 'Refleksi Diri' },
      { handler: 'handleCaseStudySubmit', activityName: 'Sharing Pengalaman' }
    ]
  },
  {
    file: 'app/sesi/posttest-penutup/page.tsx',
    sessionName: 'Sesi 8: Post-Test & Penutup',
    activities: [
      { handler: 'handleDiscussionSubmit', activityName: 'Post-Test' },
      { handler: 'handleReflectionSubmit', activityName: 'Refleksi Program' },
      { handler: 'handleCaseStudySubmit', activityName: 'Komitmen Masa Depan' }
    ]
  }
];

// Template for the new async handler function
function generateAsyncHandler(handlerName, sessionName, activityName) {
  return `
  const ${handlerName} = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!${getFormFieldName(handlerName)}.trim()) {
      alert('Jawaban tidak boleh kosong!');
      return;
    }
    
    try {
      // Import utility function
      const { submitSessionAnswer } = await import('@/lib/sessionUtils');
      
      const result = await submitSessionAnswer({
        sessionName: '${sessionName}',
        activityName: '${activityName}',
        answer: ${getFormFieldName(handlerName)}
      });
      
      if (result.success) {
        ${getSuccessActions(handlerName)}
        alert('Jawaban berhasil disimpan!');
      } else {
        alert('Gagal menyimpan jawaban: ' + result.error);
      }
    } catch (error) {
      console.error('Error submitting answer:', error);
      alert('Terjadi kesalahan saat menyimpan jawaban');
    }
  };`;
}

function getFormFieldName(handlerName) {
  const fieldMap = {
    'handleDiscussionSubmit': 'discussionForm.jawaban',
    'handleReflectionSubmit': 'reflectionForm.jawaban',
    'handleAssertiveSubmit': 'assertiveForm',
    'handleQnASubmit': 'qnaForm.jawaban',
    'handleVideoAnalysisSubmit': 'videoAnalysisForm.jawaban',
    'handleCaseStudySubmit': 'caseStudyAnswer'
  };
  return fieldMap[handlerName] || 'formData.answer';
}

function getSuccessActions(handlerName) {
  const actionMap = {
    'handleDiscussionSubmit': 'setDiscussionSubmitted(true);\n        setDiscussionForm({ jawaban: \'\' });',
    'handleReflectionSubmit': 'setReflectionSubmitted(true);\n        setReflectionForm({ jawaban: \'\' });',
    'handleAssertiveSubmit': 'setAssertiveSubmitted(true);',
    'handleQnASubmit': 'setQnaSubmitted(true);\n        setQnaForm({ jawaban: \'\' });',
    'handleVideoAnalysisSubmit': 'setVideoAnalysisSubmitted(true);\n        setVideoAnalysisForm({ jawaban: \'\' });',
    'handleCaseStudySubmit': 'setCaseStudySubmitted(true);'
  };
  return actionMap[handlerName] || '// Add success actions here';
}

async function updateSessionFile(sessionConfig) {
  const filePath = path.join(__dirname, '..', sessionConfig.file);
  
  if (!fs.existsSync(filePath)) {
    console.log(`❌ File not found: ${sessionConfig.file}`);
    return false;
  }
  
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Update each handler
    for (const activity of sessionConfig.activities) {
      const oldHandlerPattern = new RegExp(
        `const ${activity.handler} = \\(e: React\\.FormEvent\\) => \\{[\\s\\S]*?\\};`,
        'g'
      );
      
      const newHandler = generateAsyncHandler(
        activity.handler,
        sessionConfig.sessionName,
        activity.activityName
      );
      
      if (oldHandlerPattern.test(content)) {
        content = content.replace(oldHandlerPattern, newHandler);
        console.log(`✅ Updated ${activity.handler} for ${activity.activityName}`);
      } else {
        console.log(`⚠️  Handler ${activity.handler} not found in ${sessionConfig.file}`);
      }
    }
    
    // Write updated content
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Successfully updated ${sessionConfig.file}`);
    return true;
    
  } catch (error) {
    console.error(`❌ Error updating ${sessionConfig.file}:`, error.message);
    return false;
  }
}

async function updateAllSessions() {
  console.log('🚀 Updating all session files to support Google Sheets integration...\n');
  
  let successCount = 0;
  let totalCount = sessionConfigs.length;
  
  for (const config of sessionConfigs) {
    console.log(`📝 Processing ${config.file}...`);
    const success = await updateSessionFile(config);
    if (success) successCount++;
    console.log('');
  }
  
  console.log(`📊 Update Summary:`);
  console.log(`✅ Successfully updated: ${successCount}/${totalCount} files`);
  console.log(`❌ Failed: ${totalCount - successCount}/${totalCount} files`);
  
  if (successCount === totalCount) {
    console.log('\n🎉 All session files updated successfully!');
    console.log('📋 Next steps:');
    console.log('1. Test each session to ensure answers are saved to Google Sheets');
    console.log('2. Check Google Sheets for new data');
    console.log('3. Verify all activities are properly mapped');
  } else {
    console.log('\n⚠️  Some files failed to update. Please check the errors above.');
  }
}

// Run the update if this file is executed directly
if (require.main === module) {
  updateAllSessions();
}

module.exports = { updateAllSessions, updateSessionFile };

