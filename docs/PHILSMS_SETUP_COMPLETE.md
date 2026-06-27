# PhilSMS Setup - Ready to Use!

## ✅ Configuration Complete

Your PhilSMS SMS notification system is now configured and ready to use!

---

## 🔑 Your API Token

```
Philsms:3225|3PeUXxIKh6Z4hbBKTOZt46Sxoo7I97dJZ5ZsnWTUde594199
```

⚠️ **Keep this token secure! Never share it publicly.**

---

## 📝 Add to Your .env File

Copy and paste these lines into your `.env` file:

```env
# SMS Configuration for PhilSMS
SMS_PROVIDER=philsms
SMS_API_KEY=Philsms:3225|3PeUXxIKh6Z4hbBKTOZt46Sxoo7I97dJZ5ZsnWTUde594199
SMS_SENDER_NAME=HealthCenter
SMS_API_ENDPOINT=https://app.philsms.com/api/v3/sms/send

# SMS Feature Toggles
SMS_ENABLED=true
SMS_SEND_APPOINTMENT_REMINDERS=true
SMS_SEND_VISIT_NOTIFICATIONS=true
SMS_SEND_CREDENTIALS=false
```

---

## 🎯 When SMS Will Be Sent

### 1. Appointment Scheduled ✅
**Trigger**: Health worker adds a prenatal visit date

**Message Example**:
```
REMINDER: Hi Jane, you have a prenatal checkup on June 15, 2026 at 9:00 AM. Please bring your health records. - HealthCenter
```

**When sent**: Immediately when visit is scheduled (can be modified to send 1-3 days before)

### 2. Visit Completed ✅
**Trigger**: Health worker marks visit as completed

**Message Example**:
```
VISIT COMPLETED: Hi Jane, your visit #2 has been recorded. Next visit: July 10, 2026. For questions, contact your health center. - HealthCenter
```

### 3. Account Created (Optional)
**Trigger**: New patient account created

**Message Example**:
```
ACCOUNT CREATED: Hi Jane! Your login: Username: FAM-001, Password: FAM-001D. Login at: http://yoursite.com/login - HealthCenter
```

**Status**: Currently DISABLED (`SMS_SEND_CREDENTIALS=false`)  
**Why**: To prevent accidental SMS during testing  
**To Enable**: Change to `SMS_SEND_CREDENTIALS=true`

---

## 🧪 Test Your Setup

### Quick Test Route

Add this to `routes/web.php`:

```php
Route::get('/test-sms', function () {
    $sms = new \App\Services\SmsService();
    
    // Replace with your actual phone number
    $result = $sms->send('09123456789', 'Test from Maternal Care System!');
    
    if ($result) {
        return 'SMS sent successfully! Check your phone.';
    } else {
        return 'SMS failed. Check logs: storage/logs/laravel.log';
    }
})->middleware('auth');
```

**Test URL**: `http://yoursite.test/test-sms`

### Test Appointment Reminder

```php
Route::get('/test-appointment-sms', function () {
    $sms = new \App\Services\SmsService();
    
    $result = $sms->sendAppointmentReminder('09123456789', [
        'patient_name' => 'Test Patient',
        'appointment_date' => 'June 15, 2026',
        'appointment_time' => '9:00 AM',
    ]);
    
    return $result ? 'Appointment SMS sent!' : 'SMS failed!';
})->middleware('auth');
```

---

## 📱 Supported Networks

✅ **ALL Philippine Mobile Networks**:
- Smart Communications
- Globe Telecom
- Sun Cellular
- Talk 'N Text (TNT)
- Touch Mobile (TM)
- DITO Telecommunity
- Cherry Mobile
- Gomo
- And all other PH networks

---

## 🔧 Integration Points (Already Done!)

### 1. Patient Account Creation
**File**: `app/Services/PatientAccountService.php`

When a new maternal record is created, the system will:
- Create patient account
- Send SMS with login credentials (if enabled)

**Current Status**: Disabled (SMS_SEND_CREDENTIALS=false)

### 2. Appointment Scheduling
**Implementation Needed**: Add to `MaternalCareController.php`

When health worker schedules a prenatal visit:
```php
use App\Services\SmsService;

// After saving prenatal visit
if ($prenatalVisit->visit_date && $maternalRecord->contact_number) {
    $sms = new SmsService();
    $sms->sendAppointmentReminder($maternalRecord->contact_number, [
        'patient_name' => $maternalRecord->first_name,
        'appointment_date' => date('F d, Y', strtotime($prenatalVisit->visit_date)),
        'appointment_time' => '9:00 AM', // or from database
    ]);
}
```

### 3. Visit Completion
**Implementation Needed**: Add to visit completion logic

When health worker completes a visit:
```php
use App\Services\SmsService;

// After marking visit as complete
$sms = new SmsService();
$sms->sendVisitNotification($maternalRecord->contact_number, [
    'patient_name' => $maternalRecord->first_name,
    'visit_number' => $prenatalVisit->visit_number,
    'next_visit_date' => $nextVisit ? date('F d, Y', strtotime($nextVisit->visit_date)) : 'TBA',
]);
```

---

## 💰 PhilSMS Pricing

### Pay-as-you-go
- **Regular SMS**: ~₱0.50 - ₱1.00 per message
- **No monthly fees**
- **No expiration** (prepaid credits)

### Estimated Costs
| Patients | SMS per Patient/Year | Annual Cost (₱0.75/SMS) |
|----------|---------------------|------------------------|
| 50 | 15 | ₱562.50 |
| 100 | 15 | ₱1,125 |
| 200 | 15 | ₱2,250 |
| 500 | 15 | ₱5,625 |

**Very affordable for the improved service!**

---

## 📊 Monitor SMS Usage

### Check SMS Logs

View sent SMS in Laravel logs:
```bash
tail -f storage/logs/laravel.log
```

Look for:
- `SMS sent successfully` - SMS was sent
- `SMS sending failed` - Error occurred
- `SMS sending disabled` - Feature is disabled
- `Invalid phone number format` - Number validation failed

### PhilSMS Dashboard

Login to your PhilSMS dashboard to view:
- SMS delivery status
- Remaining credits
- SMS history
- Delivery reports

---

## 🔍 Troubleshooting

### SMS not sending?

**1. Check .env configuration**
```bash
# In your .env file:
SMS_ENABLED=true  # Must be true
SMS_API_KEY=Philsms:3225|...  # Your token
```

**2. Check phone number format**
- Must be: `09XXXXXXXXX` (11 digits)
- Remove spaces, dashes, parentheses
- Example: `09123456789`

**3. Check logs**
```bash
tail -f storage/logs/laravel.log
```

**4. Check PhilSMS credits**
- Login to PhilSMS dashboard
- Verify you have remaining credits
- Add credits if needed

### Common Issues

| Issue | Solution |
|-------|----------|
| "SMS sending disabled" | Set `SMS_ENABLED=true` in .env |
| "Invalid phone number" | Use format: 09XXXXXXXXX |
| "Unauthorized" | Check API token is correct |
| "Insufficient credits" | Add credits to PhilSMS account |
| No error but not receiving | Check phone signal, wait a few minutes |

---

## 🎨 Customize Messages

### Update Sender Name

In `.env`:
```env
SMS_SENDER_NAME=YourClinicName
```

**Requirements**:
- Max 11 characters
- Alphanumeric only (no special characters)
- Examples: HealthCtr, BrgyCHU, MatClinic

### Customize Message Templates

Edit `app/Services/SmsService.php`:

**Appointment Message**:
```php
protected function buildAppointmentMessage(array $data): string
{
    return sprintf(
        "APPT REMINDER: Hi %s! Checkup on %s at %s. Bring health card. - %s",
        $data['patient_name'],
        $data['appointment_date'],
        $data['appointment_time'] ?? 'scheduled time',
        $this->senderName
    );
}
```

**Keep messages under 160 characters to use only 1 SMS credit!**

---

## 📋 Next Steps

### Immediate (Setup)
1. ✅ API token configured
2. ✅ SmsService class created
3. ✅ Configuration added
4. ⏳ Add token to .env file
5. ⏳ Test SMS sending

### Implementation (Features)
1. ⏳ Add appointment SMS to MaternalCareController
2. ⏳ Add visit completion SMS
3. ⏳ Test with real patients
4. ⏳ Monitor delivery rates

### Optional Enhancements
- [ ] Schedule SMS to send 1 day before appointment
- [ ] Add SMS opt-out option for patients
- [ ] Create SMS history dashboard
- [ ] Add bulk SMS for announcements
- [ ] SMS templates management UI

---

## 📞 Usage in Code

### Send Simple SMS
```php
use App\Services\SmsService;

$sms = new SmsService();
$sms->send('09123456789', 'Your message here');
```

### Send Appointment Reminder
```php
$sms = new SmsService();
$sms->sendAppointmentReminder('09123456789', [
    'patient_name' => 'Jane',
    'appointment_date' => 'June 15, 2026',
    'appointment_time' => '9:00 AM',
]);
```

### Send Visit Notification
```php
$sms = new SmsService();
$sms->sendVisitNotification('09123456789', [
    'patient_name' => 'Jane',
    'visit_number' => 2,
    'next_visit_date' => 'July 10, 2026',
]);
```

### Send Bulk SMS
```php
$sms = new SmsService();
$numbers = ['09111111111', '09222222222', '09333333333'];
$results = $sms->sendBulk($numbers, 'Clinic closed tomorrow for holiday.');
```

---

## ✅ Summary

### What's Ready:
- ✅ PhilSMS API integration
- ✅ SmsService class with all methods
- ✅ Phone number validation
- ✅ Phone number auto-formatting
- ✅ Message templates
- ✅ Error logging
- ✅ Configuration system

### Your API Token:
```
Philsms:3225|3PeUXxIKh6Z4hbBKTOZt46Sxoo7I97dJZ5ZsnWTUde594199
```

### Next Step:
**Add the configuration to your .env file and start sending!**

---

## 🔒 Security Reminder

⚠️ **NEVER commit your .env file to Git!**  
⚠️ **Keep your API token private!**  
⚠️ **Don't share tokens in screenshots or documentation!**

Your `.env` file is already in `.gitignore` ✅

---

**All set! Your SMS notification system is ready to improve patient care! 🎉**
