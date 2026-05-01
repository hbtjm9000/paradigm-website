/**
 * Paradigm IT Services - Contact Form Handler
 * Deploy as Web App with Execute as: Me, Anyone access
 * 
 * POST payload: { name, email, company, service, message }
 * Returns: { success: true/false, message: "..." }
 */

function doPost(e) {
  const props = PropertiesService.getScriptProperties();
  const NOTIFY_EMAIL = props.getProperty('NOTIFY_EMAIL') || 'hal@paradigm.com.jm';
  
  try {
    const content = e.postData.contents;
    const data = JSON.parse(content);
    
    // Validate required fields
    if (!data.name || !data.email || !data.message) {
      return respond({ success: false, message: 'Missing required fields' });
    }
    
    // Build email body
    const serviceLabels = {
      'ai-strategy': 'AI Strategy & Implementation',
      'solutions-architecture': 'Solutions Architecture',
      'cybersecurity': 'Cybersecurity Architecture',
      'elements': 'Elements (Managed Services)',
      'other': 'General Inquiry'
    };
    
    const serviceText = serviceLabels[data.service] || data.service || 'Not specified';
    
    const emailBody = [
      'New Contact Form Submission',
      '========================',
      '',
      'Name: ' + data.name,
      'Email: ' + data.email,
      'Company: ' + (data.company || 'Not provided'),
      'Service Interest: ' + serviceText,
      '',
      'Message:',
      '--------',
      data.message,
      '',
      '---',
      'Submitted: ' + new Date().toLocaleString()
    ].join('\n');
    
    // Send notification email
    GmailApp.sendEmail({
      to: NOTIFY_EMAIL,
      subject: '[Website] New Inquiry from ' + data.name,
      body: emailBody,
      name: 'Paradigm Website'
    });
    
    // Log to Sheet (optional - creates if not exists)
    try {
      logToSheet(data);
    } catch (sheetErr) {
      // Sheet logging is optional - don't fail if it errors
    }
    
    return respond({ success: true, message: 'Thank you for your inquiry. We\'ll be in touch within 24 hours.' });
    
  } catch (err) {
    return respond({ success: false, message: 'Something went wrong. Please try again.' });
  }
}

function logToSheet(data) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Inquiries');
  if (!sheet) return;
  
  const row = [
    new Date(),
    data.name,
    data.email,
    data.company || '',
    data.service || '',
    data.message
  ];
  
  sheet.appendRow(row);
}

function respond(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

// Test function - remove after testing
function test() {
  const mockRequest = {
    postData: {
      contents: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        company: 'Test Corp',
        service: 'ai-strategy',
        message: 'This is a test message.'
      })
    }
  };
  
  const result = doPost(mockRequest);
  Logger.log(result.getContent());
}