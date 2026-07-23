# 📱 SMS Testing Quick Start

## Your Configuration
- **Provider:** Semaphore
- **Sender Name:** Matcare
- **API Key:** d5cc0339446fa332d2b9facb1688686b
- **Status:** ✅ Configured and Ready

---

## 🚀 3 Ways to Test (Easiest to Full)

### 1️⃣ SUPER QUICK TEST (30 seconds)

Run this command:
```bash
php test-sms-direct.php
```

**What it does:** Sends a test SMS directly using your API
**Edit line 10:** Change phone number to yours

---

### 2️⃣ ARTISAN COMMAND TEST (1 minute)

```bash
php artisan sms:test
```

**Follow the prompts:**
- Enter your phone number: `09707112132`
- Enter message: `Testing!`
- Confirm: `yes`
- ✅ Check your phone!

---

### 3️⃣ WEB DASHBOARD TEST (Full Featured) ⭐

**Steps:**
1. Start server: `php artisan serve`
2. Login to your system
3. Visit: `http://localhost:8000/sms-test`
4. Choose a test type:
   - **Basic SMS** - Simple message
   - **Appointment** - Appointment reminder
   - **Visit** - Visit notification
   - **Credentials** - Login details
   - **Patient List** - Send to real patients
5. Fill the form and click "Send"

**This is the BEST way** - full control, multiple templates, patient list!

---

## 🏥 Test in Real Workflow

### Test 1: New Patient Registration

**What happens:** When you create a new maternal record, the system automatically sends:
- ✉️ Login credentials SMS
- 📅 First appointment reminder

**Steps:**
1. Login as admin
2. Go to "Maternal Care" → New Registration
3. Fill patient info **with phone number**: `09707112132`
4. Submit
5. **Check your phone** - you should get 2 SMS!

**SMS you'll receive:**
```
ACCOUNT CREATED: Hi [Name]! Your login: Username: FS-2026-XXXX, Password: FS-2026-XXXXM. Login at: http://localhost - Matcare

REMINDER: Hi [Name], you have a prenatal checkup on [Date] at 9:00 AM. Please bring your health records. - Matcare
```

---

### Test 2: Visit Update

**What happens:** When you record a completed visit, the system sends a notification with next appointment date.

**Steps:**
1. Dashboard → Edit existing patient record
2. Scroll to "Prenatal Visits"
3. Fill "Visit #1" with today's date
4. Click "Update"
5. **Check your phone** - visit notification!

**SMS you'll receive:**
```
VISIT COMPLETED: Hi [Name], your visit #1 has been recorded. Next visit: [Date]. For questions, contact your health center. - Matcare
```

---

## ✅ Quick Verification

After sending SMS:

**1. Check logs:**
```bash
# Windows Command Prompt
type storage\logs\laravel.log | findstr /i "sms"
```

**2. Check Semaphore Dashboard:**
- Go to: https://semaphore.co/dashboard
- View message delivery status
- Check remaining credits

**3. Expected Response (in logs):**
```
SMS sent successfully via Semaphore
phone: 09707112132
response: {"message_id": "..."}
```

---

## 🔧 Troubleshooting

### Not working?

**Step 1: Clear cache**
```bash
php artisan config:clear
php artisan cache:clear
```

**Step 2: Check .env**
```env
SMS_ENABLED=true
SMS_PROVIDER=semaphore
SMS_API_KEY=d5cc0339446fa332d2b9facb1688686b
SMS_SENDER_NAME=Matcare
```

**Step 3: Test internet connection**
```bash
ping api.semaphore.co
```

**Step 4: Check phone number format**
- ✅ Correct: `09123456789` (11 digits)
- ❌ Wrong: `9123456789`, `+639123456789`

---

## 📊 What's Integrated?

Your system now has SMS in these places:

| Feature | Trigger | SMS Type |
|---------|---------|----------|
| New Patient Registration | Create maternal record | Credentials + Appointment |
| Visit Recording | Update prenatal visit | Visit Notification |
| Manual Testing | SMS Test Dashboard | All types |

---

## 🎯 Recommended Test Order

1. ✅ **Start with Quick Test**
   ```bash
   php test-sms-direct.php
   ```
   Verify API is working

2. ✅ **Try Dashboard**
   ```
   http://localhost:8000/sms-test
   ```
   Test all message types

3. ✅ **Test Real Workflow**
   - Register a new patient
   - Record a visit
   - Check SMS received

4. ✅ **Check Logs**
   ```bash
   type storage\logs\laravel.log
   ```

---

## 🚀 You're Ready!

Choose your test method and start sending SMS! The system is fully configured with:

✅ Semaphore API integration  
✅ Automatic notifications on patient registration  
✅ Automatic notifications on visit updates  
✅ Manual testing dashboard  
✅ Command-line tools  
✅ Comprehensive logging  

**Questions?** Check `docs/SMS_TESTING_GUIDE.md` for detailed instructions.

---

**Happy Testing! 📱✨**
