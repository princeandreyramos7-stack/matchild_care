# 📱 Complete SMS Notification Workflow

## Overview

Your system now sends **automatic SMS notifications** at key moments in the patient journey:

### 🆕 When New Patient is Registered
✅ **SMS #1:** Login credentials (Username & Password)  
✅ **SMS #2:** First appointment reminder (7 days from registration)

### ✅ When Checkup is Completed (Visit Recorded)
✅ **SMS #1:** Visit completion confirmation  
✅ **SMS #2:** Next appointment reminder (4 weeks from last visit)

---

## 📋 Complete Workflow

### Scenario 1: New Patient Registration

**Admin Action:**
1. Login to system
2. Go to "Maternal Care" → New Registration
3. Fill patient information including **phone number**
4. Submit form

**System Actions:**
1. ✅ Creates maternal record
2. ✅ Creates patient user account
3. ✅ **Sends SMS #1** - Login Credentials
4. ✅ **Sends SMS #2** - First Appointment Reminder

**Patient Receives:**

**SMS #1 (Credentials):**
```
ACCOUNT CREATED: Hi Maria! Your login: Username: FS-2026-0099, 
Password: FS-2026-0099S. Login at: http://localhost/login - Matcare
```

**SMS #2 (First Appointment):**
```
REMINDER: Hi Maria, you have a prenatal checkup on July 30, 2026 at 9:00 AM. 
Please bring your health records. - Matcare
```

---

### Scenario 2: Visit Completion (Checkup Done)

**Admin Action:**
1. Login to system
2. Go to Dashboard → Edit patient record
3. Scroll to "Prenatal Visits" section
4. Fill in visit date for completed visit
5. Save/Update

**System Actions:**
1. ✅ Updates maternal record with visit information
2. ✅ **Sends SMS #1** - Visit completion confirmation
3. ✅ **Sends SMS #2** - Next appointment reminder (4 weeks later)

**Patient Receives:**

**SMS #1 (Visit Complete):**
```
VISIT COMPLETED: Hi Maria, your visit #1 has been recorded. 
Next visit: August 20, 2026. For questions, contact your health center. - Matcare
```

**SMS #2 (Next Appointment):**
```
REMINDER: Hi Maria, you have a prenatal checkup on August 20, 2026 at 9:00 AM. 
Please bring your health records. - Matcare
```

---

## 🎯 Step-by-Step Testing

### Test 1: New Patient Registration with SMS

**Preparation:**
```bash
php artisan config:clear
php artisan serve
```

**Steps:**
1. Login as admin
2. Navigate to: Maternal Care → New Registration
3. Fill the form:
   ```
   Family Serial: FS-2026-TEST1
   First Name: Maria
   Last Name: Santos
   Phone Number: 09707112132  ← YOUR NUMBER
   Age: 25
   Address: Test Address
   LMP: [recent date]
   Expected Delivery: [future date]
   ```
4. Click "Submit"

**Expected Results:**
- ✅ Success message appears
- ✅ **Check your phone - 2 SMS messages arrive:**
  1. Login credentials
  2. First appointment reminder (7 days from today)
- ✅ Check logs:
  ```bash
  type storage\logs\laravel.log | findstr /i "sms"
  ```

**What to Verify:**
- [ ] SMS #1 has correct username (FS-2026-TEST1)
- [ ] SMS #1 has correct password (FS-2026-TEST1S)
- [ ] SMS #2 has appointment date (7 days from today)
- [ ] Both SMS arrived within 1 minute

---

### Test 2: Visit Completion with Next Appointment

**Steps:**
1. Login as admin
2. Go to Dashboard
3. Find the patient you just created
4. Click "Edit"
5. Scroll to "Prenatal Visits" section
6. Fill **Visit #1**:
   - Visit Date: Today's date
7. Click "Update"

**Expected Results:**
- ✅ Success message appears
- ✅ **Check your phone - 2 SMS messages arrive:**
  1. Visit completion notification
  2. Next appointment reminder (4 weeks from visit date)

**What to Verify:**
- [ ] SMS #1 says "visit #1 has been recorded"
- [ ] SMS #1 mentions next visit date (4 weeks from today)
- [ ] SMS #2 is appointment reminder for same date
- [ ] Both SMS arrived within 1 minute

---

### Test 3: Multiple Visits

**Steps:**
1. Complete Visit #1 (as above)
2. Wait for SMS
3. Edit patient again
4. Fill **Visit #2**:
   - Visit Date: 4 weeks from Visit #1
5. Update

**Expected Results:**
- ✅ **Check your phone - 2 new SMS messages:**
  1. Visit #2 completion notification
  2. Next appointment for Visit #3 (4 weeks from Visit #2)

---

## 📊 SMS Flow Diagram

```
NEW PATIENT REGISTRATION
        ↓
    [Create Account]
        ↓
    ┌───────────────────┐
    │  SMS #1: LOGIN    │ → "Username: FS-2026-0001, Password: FS-2026-0001S"
    │   CREDENTIALS     │
    └───────────────────┘
        ↓
    ┌───────────────────┐
    │  SMS #2: FIRST    │ → "Checkup on [+7 days] at 9:00 AM"
    │   APPOINTMENT     │
    └───────────────────┘


VISIT COMPLETED
        ↓
    [Record Visit Date]
        ↓
    ┌───────────────────┐
    │  SMS #1: VISIT    │ → "Visit #1 recorded. Next: [+4 weeks]"
    │   CONFIRMATION    │
    └───────────────────┘
        ↓
    ┌───────────────────┐
    │  SMS #2: NEXT     │ → "Checkup on [+4 weeks] at 9:00 AM"
    │   APPOINTMENT     │
    └───────────────────┘
```

---

## 🕐 Timing Details

| Event | SMS Delay | Next Appointment |
|-------|-----------|------------------|
| New Registration | Immediate | +7 days |
| Visit #1 Complete | Immediate | +4 weeks |
| Visit #2 Complete | Immediate | +4 weeks |
| Visit #3 Complete | Immediate | +4 weeks |
| Visit #4 Complete | Immediate | +4 weeks |

---

## 📝 SMS Message Templates

### 1. Login Credentials
```
ACCOUNT CREATED: Hi {patient_name}! Your login: Username: {username}, 
Password: {password}. Login at: {url} - Matcare
```

### 2. Appointment Reminder
```
REMINDER: Hi {patient_name}, you have a prenatal checkup on {date} at {time}. 
Please bring your health records. - Matcare
```

### 3. Visit Completion
```
VISIT COMPLETED: Hi {patient_name}, your visit #{number} has been recorded. 
Next visit: {date}. For questions, contact your health center. - Matcare
```

---

## ⚙️ Configuration

All SMS features are **ENABLED** by default:

```env
SMS_ENABLED=true
SMS_SEND_CREDENTIALS=true
SMS_SEND_APPOINTMENT_REMINDERS=true
SMS_SEND_VISIT_NOTIFICATIONS=true
```

### To Disable Specific SMS:

**Disable Credentials:**
```env
SMS_SEND_CREDENTIALS=false
```
Result: Only appointment reminder sent on registration

**Disable Appointment Reminders:**
```env
SMS_SEND_APPOINTMENT_REMINDERS=false
```
Result: No appointment reminders sent

**Disable Visit Notifications:**
```env
SMS_SEND_VISIT_NOTIFICATIONS=false
```
Result: No visit completion SMS sent

After changing `.env`:
```bash
php artisan config:clear
```

---

## 🔍 Monitoring & Verification

### Check Logs for SMS Activity

**View all SMS logs:**
```bash
type storage\logs\laravel.log | findstr /i "sms"
```

**View today's logs only:**
```bash
type storage\logs\laravel.log | findstr /i "2026-07-23"
```

**Expected log entries after registration:**
```
SMS credentials sent to new patient
family_serial: FS-2026-0099
phone: 09707112132

First appointment reminder SMS sent to new patient
maternal_record_id: 1
appointment_date: July 30, 2026
```

**Expected log entries after visit:**
```
Visit notification SMS sent
visit_number: 1
phone: 09707112132

Next appointment reminder SMS sent after visit
next_appointment: August 20, 2026
```

---

## 🎓 Understanding the System

### Why 7 Days for First Appointment?
- Gives patient time to receive credentials
- Standard prenatal care initiation period
- Can be customized in code

### Why 4 Weeks Between Visits?
- Standard prenatal checkup schedule
- Follows maternal care guidelines
- Automatically calculated from last visit

### Phone Number Required?
- ✅ If provided: All SMS sent automatically
- ❌ If missing: No SMS sent, logged as warning

---

## 🚨 Troubleshooting

### Issue: No SMS Received After Registration

**Check 1: Phone Number Entered?**
```sql
-- Run in database
SELECT id, first_name, last_name, phone_number 
FROM maternal_records 
WHERE id = [record_id];
```

**Check 2: Configuration Enabled?**
```bash
php artisan tinker
>>> config('services.sms.send_credentials')
>>> config('services.sms.send_appointment_reminders')
```

**Check 3: View Logs**
```bash
type storage\logs\laravel.log | findstr /i "SMS"
```

---

### Issue: Only 1 SMS Received (Not 2)

**Scenario A: Registration**
- Check if `SMS_SEND_CREDENTIALS=true`
- Check if `SMS_SEND_APPOINTMENT_REMINDERS=true`
- Both must be enabled

**Scenario B: Visit Update**
- Check if `SMS_SEND_VISIT_NOTIFICATIONS=true`
- Check if `SMS_SEND_APPOINTMENT_REMINDERS=true`
- Both must be enabled

---

### Issue: Wrong Appointment Date

**First Appointment:**
- Should be +7 days from registration
- Check system date is correct
- Check logs for calculated date

**Next Appointment:**
- Should be +4 weeks from last visit
- Verify visit date was entered correctly
- Check logs for calculated date

---

## 📱 Real-World Testing Checklist

### ✅ Complete Test Sequence:

**Day 1: Registration**
- [ ] Create new patient with phone number
- [ ] Receive credentials SMS
- [ ] Receive first appointment SMS (for Day 8)
- [ ] Patient can login with credentials
- [ ] Patient sees their dashboard

**Day 8 (or simulate): First Visit**
- [ ] Edit patient record
- [ ] Enter Visit #1 date (today)
- [ ] Receive visit completion SMS
- [ ] Receive next appointment SMS (for Day 36)
- [ ] Patient sees visit in their records

**Day 36 (or simulate): Second Visit**
- [ ] Edit patient record
- [ ] Enter Visit #2 date (today)
- [ ] Receive visit completion SMS
- [ ] Receive next appointment SMS (for Day 64)

**Continue for Visits #3, #4, etc.**

---

## 💡 Best Practices

### For Testing:
1. ✅ Always use your own phone number
2. ✅ Test one patient at a time
3. ✅ Check logs after each action
4. ✅ Verify SMS content matches expected format

### For Production:
1. ✅ Ensure phone numbers are validated
2. ✅ Monitor Semaphore credits balance
3. ✅ Set up low credit alerts
4. ✅ Keep logs for SMS delivery tracking
5. ✅ Train staff on SMS timing

---

## 📚 Related Documentation

- `CREDENTIALS_SMS_SUMMARY.md` - Quick reference for login SMS
- `HOW_TO_TEST_CREDENTIALS_SMS.md` - Detailed credential testing
- `SMS_TESTING_QUICKSTART.md` - General SMS testing guide
- `docs/SEMAPHORE_SETUP_GUIDE.md` - API setup details

---

## 🎉 Summary

Your system is now configured to send **automatic SMS notifications** at every important step:

✅ **New Patient?** → Credentials + First Appointment  
✅ **Visit Done?** → Completion + Next Appointment  
✅ **Every Visit?** → Always reminds about next checkup  

**Start testing now:**
```bash
php artisan serve
```

Then create a new patient and watch the SMS magic happen! 📱✨
