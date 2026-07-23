# 📱 SMS Testing Guide - Maternal Care System

## Overview
This guide shows you how to test SMS notifications in your actual system workflow with real-world scenarios.

## Prerequisites
✅ SMS API configured in `.env`:
- `SMS_PROVIDER=semaphore`
- `SMS_API_KEY=d5cc0339446fa332d2b9facb1688686b`
- `SMS_SENDER_NAME=Matcare`
- `SMS_ENABLED=true`

## Testing Methods

### Method 1: SMS Testing Dashboard (Recommended) 🎯

The easiest way to test all SMS features with a visual interface.

**Access:** `http://localhost/sms-test` (after logging in)

**Features:**
1. **Basic SMS** - Send custom messages
2. **Appointment Reminders** - Test appointment notifications
3. **Visit Notifications** - Test visit completion alerts
4. **Login Credentials** - Test credential delivery
5. **Patient List** - Send to actual registered patients

**Steps:**
1. Start your dev server: `php artisan serve`
2. Login to your system
3. Navigate to: `http://localhost:8000/sms-test`
4. Choose a tab (Basic, Appointment, Visit, Credentials, or Patient List)
5. Fill in the form with your test phone number
6. Click "Send"
7. Check your phone for the SMS!

---

### Method 2: Test in Real Workflow (Production-like Testing) 🏥

Test SMS notifications as they would work in real system usage.

#### A. Test New Patient Registration + Credentials SMS

**What happens:** When you register a new maternal record with a phone number, the system automatically:
- Creates a patient account
- Sends login credentials via SMS
- Sends an appointment reminder

**Steps:**
1. Login as admin/staff
2. Go to "Maternal Care" registration
3. Fill in patient details **INCLUDING phone number**
4. Submit the form
5. Check the phone - you should receive:
   - ✅ Login credentials SMS
   - ✅ First appointment reminder

**Expected SMS Messages:**
```
ACCOUNT CREATED: Hi [Name]! Your login: Username: FS-2026-XXXX, Password: FS-2026-XXXXM. Login at: http://localhost - Matcare

REMINDER: Hi [Name], you have a prenatal checkup on [Date] at 9:00 AM. Please bring your health records. - Matcare
```

#### B. Test Prenatal Visit Update + Visit Notification

**What happens:** When you update a maternal record with a completed visit, the system sends a visit notification with next appointment date.

**Steps:**
1. Login as admin/staff
2. Go to Dashboard
3. Click "Edit" on an existing maternal record (one with a phone number)
4. Scroll to "Prenatal Visits" section
5. Fill in a visit date for Visit #1 (or any visit)
6. Click "Update"
7. Check the phone - you should receive a visit notification

**Expected SMS:**
```
VISIT COMPLETED: Hi [Name], your visit #1 has been recorded. Next visit: [Date]. For questions, contact your health center. - Matcare
```

---

### Method 3: Quick Command Line Test

Test individual SMS sending from command line.

**Basic Test:**
```bash
php artisan sms:test 09123456789 --message="Testing Matcare SMS"
```

Replace `09123456789` with your actual phone number.

**Interactive Test:**
```bash
php artisan sms:test
```
Follow the prompts to enter phone number and message.

---

### Method 4: Browser URL Test (Simple)

**Quick SMS Test:**
Visit: `http://localhost:8000/test-sms`
- Sends a test message to the number in the route
- Returns JSON response showing success/failure

**Appointment Test:**
Visit: `http://localhost:8000/test-appointment-sms`
- Sends an appointment reminder
- Update phone number in routes/web.php first

---

## Test Scenarios Checklist

### ✅ Scenario 1: New Patient Registration
- [ ] Create new maternal record with phone number
- [ ] Verify credentials SMS received
- [ ] Verify appointment reminder SMS received
- [ ] Check logs: `storage/logs/laravel.log`

### ✅ Scenario 2: Visit Completion
- [ ] Update existing record with visit date
- [ ] Verify visit notification SMS received
- [ ] Check next appointment date is correct

### ✅ Scenario 3: Manual SMS to Patient
- [ ] Use SMS Testing Dashboard
- [ ] Select patient from list
- [ ] Choose notification type
- [ ] Verify SMS received

### ✅ Scenario 4: Custom Message
- [ ] Use "Custom Message" option in dashboard
- [ ] Write your own message (max 160 chars)
- [ ] Verify SMS received with exact text

---

## Configuration Testing

### Test with Different Settings

**1. Test with SMS Disabled:**
```env
SMS_ENABLED=false
```
Result: No SMS sent, but logged

**2. Test with Appointment Reminders Off:**
```env
SMS_SEND_APPOINTMENT_REMINDERS=false
```
Result: Credentials sent, but no appointment reminder

**3. Test with Credentials Disabled:**
```env
SMS_SEND_CREDENTIALS=false
```
Result: Only appointment reminder sent, no credentials

After changing `.env`:
```bash
php artisan config:clear
```

---

## Troubleshooting

### SMS Not Sending?

**Check 1: Configuration**
```bash
php artisan config:clear
php artisan cache:clear
```

**Check 2: Logs**
```bash
# Windows
type storage\logs\laravel.log | findstr /i "sms"

# View last 50 lines
powershell -Command "Get-Content storage\logs\laravel.log -Tail 50"
```

**Check 3: API Credits**
- Login to Semaphore dashboard
- Check remaining credits
- Verify sender name is approved

**Check 4: Phone Number Format**
Valid: `09123456789` (11 digits, starts with 09)
Invalid: `9123456789`, `+639123456789` (these are auto-formatted)

### Common Errors

**Error: "Invalid phone number format"**
- Ensure format is `09XXXXXXXXX`
- Check phone_number field in database

**Error: "SMS sending failed"**
- Check API key in `.env`
- Verify internet connection
- Check Semaphore account status

**Error: "SSL certificate problem" (Windows)**
- Already handled - SSL verification disabled for Windows
- If persists, check firewall settings

---

## Real-World Testing Workflow

### Complete End-to-End Test:

1. **Register New Patient**
   ```
   Name: Test Patient
   Phone: 09707112132 (your number)
   Address: Test Address
   Age: 25
   LMP: [recent date]
   ```
   ✅ Expect: Credentials SMS + Appointment SMS

2. **Record First Visit**
   - Edit the patient record
   - Fill Visit #1 with today's date
   - Save
   ✅ Expect: Visit completion SMS

3. **Send Custom Reminder**
   - Go to SMS Test Dashboard
   - Select the patient
   - Choose "Custom" message
   - Write: "Don't forget your vitamins!"
   ✅ Expect: Custom SMS

4. **Verify Patient Login**
   - Patient receives credentials
   - Patient logs in with received username/password
   - Patient sees their dashboard
   ✅ Expect: Successful login

---

## Production Deployment Notes

### Before Going Live:

1. **Remove Test Routes** (in `routes/web.php`):
   - Comment out `/test-sms`
   - Comment out `/test-appointment-sms`
   - Keep `/sms-test/*` but add admin middleware

2. **Secure SMS Testing Dashboard:**
   ```php
   Route::middleware(['auth', 'role:admin'])->prefix('sms-test')->group(function () {
       // ... routes
   });
   ```

3. **Enable Production Mode:**
   ```env
   APP_DEBUG=false
   SMS_ENABLED=true
   ```

4. **Monitor Usage:**
   - Set up Semaphore webhooks for delivery reports
   - Monitor credit balance
   - Track failed SMS in logs

---

## SMS Message Templates

### Current Templates:

**Appointment Reminder:**
```
REMINDER: Hi {name}, you have a prenatal checkup on {date} at {time}. Please bring your health records. - Matcare
```

**Visit Completed:**
```
VISIT COMPLETED: Hi {name}, your visit #{number} has been recorded. Next visit: {date}. For questions, contact your health center. - Matcare
```

**Login Credentials:**
```
ACCOUNT CREATED: Hi {name}! Your login: Username: {username}, Password: {password}. Login at: {url} - Matcare
```

### Customizing Templates:

Edit `app/Services/SmsService.php`:
- `buildAppointmentMessage()` - Line ~251
- `buildVisitMessage()` - Line ~261
- `buildCredentialsMessage()` - Line ~271

---

## Monitoring & Analytics

### Check SMS Logs:

```bash
# View recent SMS activity
php artisan tinker
>>> \App\Models\MaternalRecord::whereNotNull('phone_number')->count()
>>> DB::table('maternal_records')->select('phone_number')->whereNotNull('phone_number')->get()
```

### View in Semaphore Dashboard:
1. Login to https://semaphore.co
2. Go to "Messages" tab
3. See delivery status, timestamps, costs

---

## Support

### Need Help?

- Check Laravel logs: `storage/logs/laravel.log`
- Check Semaphore status: https://status.semaphore.co
- API Documentation: https://semaphore.co/docs

### Contact Semaphore Support:
- Email: support@semaphore.co
- For urgent issues with your API key or credits

---

## Summary

✅ **Quick Test:** `php artisan sms:test`
✅ **Dashboard Test:** `http://localhost:8000/sms-test`
✅ **Real Workflow Test:** Register patient with phone number
✅ **Check Logs:** `storage/logs/laravel.log`

**You're all set! Happy testing! 📱✨**
