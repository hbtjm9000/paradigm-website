# Contact Form Handler - Deployment Guide

## Quick Setup

### 1. Create Google Sheet (for logging)
1. Go to sheet.google.com → Create new spreadsheet
2. Rename sheet to "Inquiries"
3. Add headers in Row 1: `Date | Name | Email | Company | Service | Message`

### 2. Create Apps Script
1. Go to script.google.com → New project
2. Paste contents of `Code.gs`
3. File → Project Properties → Script Properties
   - Add: `NOTIFY_EMAIL` = your notification email (default: hal@paradigm.com.jm)

### 3. Deploy as Web App
1. Deploy → New deployment
2. Select type: Web app
3. Execute as: Me
4. Who has access: Anyone
5. Deploy
6. Copy the **Web App URL**

### 4. Update website
Update the form POST URL in `ContactForm.vue`:

```javascript
// Line ~125: replace the mock with:
const response = await fetch('YOUR_WEB_APP_URL', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: form.name,
    email: form.email,
    company: form.company,
    service: form.service,
    message: form.message
  })
});

const result = await response.json();
if (result.success) {
  // show success
} else {
  error.value = result.message;
}
```

## For Newsletter
Create separate script `Newsletter.gs` with similar pattern → email list to your newsletter tool or Sheet.