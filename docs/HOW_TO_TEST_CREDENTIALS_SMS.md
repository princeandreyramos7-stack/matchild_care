# 📱 How to Test Login Credentials SMS

## ✅ What's Configured

When a **new patient account is created**, the system will automatically send an SMS to the patient's phone number with:
- 👤 Username (Family Serial Number)
- 🔑 Password (Family Serial + First letter of last name)
- 🔗 Login URL

---

## 🚀 3 Ways to Test

### **Method 1: Create a Real Patient (Best for Full Testing)** ⭐

This tests the complete workflow exactly as it will work in production.

**Steps:**
1. Clear config cache:
   ```bash
   php artisan config:clear
   ```

2. Start your server:
   ```bash
   php artisan serve
   ```

3. Login to your system as admin

4. Go to **Maternal Care Registration**

5. Fill in the form with these details:
   ```
   Family Serial: FS-2026-0099
   Last Name: Santos
   First Name: Maria
   Middle Initial: D
   Address: 123 Test St
   Phone Number: 09707112132  ← YOUR PHONE NUMBER
   Age: 25
   Age Group: 20-49
   LMP: [recent date]
   Gravida: 1
   Parity: 0
   EDD: [future date]
   ```

6. **Submit the form**

7. **Check your phone!** You should receive SMS:
   ```
   ACCOUNT CREATED: Hi Maria! Your login: Username: FS-2026-0099, 
   Password: FS-2026-0099S. Login at: http://localhost/login - Matcare
   ```

8. **Test the login:**
   - Go to login page
   - Username: `FS-2026-0099`
   - Password: `FS-2026-0099S` (Family Serial + "S" for Santos)

---

### **Method 2: Quick Command Test**

Test just the credentials SMS without creating a patient.

```bash
php artisan sms:test-credentials
```

**Follow the prompts:**
- Phone: `09707112132`
- Patient name: `Maria Santos`
- Username: `FS-2026-0001`
- Password: `FS-2026-0001S`
- Confirm: `yes`

**Check your phone!**

---

### **Method 3: Web Dashboard Test**

Use the SMS testing dashboard.

**Steps:**
1. Start server: `php artisan serve`
2. Login to your system
3. Visit: `http://localhost:8000/sms-test`
4. Go to **"Credentials"** tab
5. Fill in:
   - Phone Number: `09707112132`
   - Patient Name: `Maria`
   - Username: `FS-2026-0001`
   - Password: `FS-2026-0001S`
6. Click **"Send Credentials"**
7. Check your phone!

---

## 📋 Expected SMS Message

```
ACCOUNT CREATED: Hi [Patient Name]! Your login: Username: [Username], 
Password: [Password]. Login at: http://localhost/login - Matcare
```

**Example:**
```
ACCOUNT CREATED: Hi Maria! Your login: Username: FS-2026-0099, 
Password: FS-2026-0099S. Login at: http://localhost/login - Matcare
```

---

## 🔍 Verification Checklist

After creating a new patient:

### ✅ Step 1: Check SMS Received
- [ ] SMS arrived on phone
- [ ] Username is correct (Family Serial)
- [ ] Password is correct (Family Serial + First letter of surname)
- [ ] Login URL is included

### ✅ Step 2: Check System Logs
```bash
# View recent logs
type storage\logs\laravel.log | findstr /i "credentials"
```

**Expected log entry:**
```
SMS credentials sent to new patient
family_serial: FS-2026-0099
phone: 09707112132
username: FS-2026-0099
```

### ✅ Step 3: Test Login
- [ ] Go to login page
- [ ] Enter username from SMS
- [ ] Enter password from SMS
- [ ] Login successful
- [ ] Redirected to Patient Dashboard

---

## 🎯 Password Format

The system generates passwords automatically:

**Formula:** `Family Serial + First Letter of Last Name (uppercase)`

**Examples:**
- Family Serial: `FS-2026-0001`, Last Name: `Santos` → Password: `FS-2026-0001S`
- Family Serial: `FS-2026-0002`, Last Name: `Cruz` → Password: `FS-2026-0002C`
- Family Serial: `FS-2026-0003`, Last Name: `Reyes` → Password: `FS-2026-0003R`

---

## ⚙️ Configuration

### Current Settings (in `.env`):

```env
SMS_ENABLED=true
SMS_SEND_CREDENTIALS=true  ← This MUST be true!
SMS_PROVIDER=semaphore
SMS_API_KEY=d5cc0339446fa332d2b9facb1688686b
SMS_SENDER_NAME=Matcare
```

### To Enable/Disable Credentials SMS:

**Enable:**
```env
SMS_SEND_CREDENTIALS=true
```

**Disable:**
```env
SMS_SEND_CREDENTIALS=false
```

After changing `.env`:
```bash
php artisan config:clear
```

---

## 🔧 Troubleshooting

### SMS Not Sending?

**1. Check Configuration:**
```bash
php artisan config:clear
php artisan cache:clear
```

**2. Verify Settings:**
```bash
php artisan tinker
>>> config('services.sms.send_credentials')
// Should return: true
>>> config('services.sms.enabled')
// Should return: true
```

**3. Check Logs:**
```bash
type storage\logs\laravel.log | findstr /i "sms"
```

**4. Test API Connection:**
```bash
php test-sms-direct.php
```

### Common Issues:

**Issue: "No SMS received"**
- ✅ Check `SMS_SEND_CREDENTIALS=true` in `.env`
- ✅ Verify phone number is filled in the form
- ✅ Check logs for errors
- ✅ Verify Semaphore credits

**Issue: "Wrong password in SMS"**
- ✅ Check last name spelling
- ✅ Password = Family Serial + First letter of LAST NAME (not first name)

**Issue: "No phone number field"**
- ✅ Run migration: `php artisan migrate`
- ✅ Check field exists: `phone_number` in `maternal_records` table

---

## 📊 Full Workflow Test

### Complete End-to-End Test:

**Step 1: Prepare**
```bash
php artisan config:clear
php artisan serve
```

**Step 2: Register Patient**
1. Login as admin
2. Maternal Care → New Registration
3. Fill form with YOUR phone number
4. Submit

**Step 3: Verify SMS**
- [ ] Check phone - SMS received
- [ ] Username matches Family Serial
- [ ] Password is Family Serial + first letter of surname

**Step 4: Test Login**
1. Logout
2. Go to login page
3. Use credentials from SMS
4. Should login successfully

**Step 5: Check Patient View**
- [ ] Patient Dashboard loads
- [ ] Patient can see their records
- [ ] Navigation works

---

## 🎓 Understanding the System

### When is SMS Sent?

SMS credentials are sent when:
1. ✅ New maternal record is created (via `MaternalCareController@store`)
2. ✅ Patient account doesn't exist yet
3. ✅ Phone number is provided
4. ✅ `SMS_SEND_CREDENTIALS=true` in config

### What Gets Sent?

| Field | Value | Example |
|-------|-------|---------|
| Patient Name | First Name | Maria |
| Username | Family Serial | FS-2026-0099 |
| Password | Family Serial + Surname Initial | FS-2026-0099S |
| Login URL | APP_URL + /login | http://localhost/login |

### Where in Code?

**File:** `app/Services/PatientAccountService.php`
**Method:** `createPatientAccount()`
**Lines:** 36-60

---

## 📱 Example Test Scenario

### Scenario: Register "Maria Santos"

**Input:**
```
Family Serial: FS-2026-0100
First Name: Maria
Last Name: Santos
Phone: 09707112132
```

**Expected SMS:**
```
ACCOUNT CREATED: Hi Maria! Your login: Username: FS-2026-0100, 
Password: FS-2026-0100S. Login at: http://localhost/login - Matcare
```

**Login Test:**
- Username: `FS-2026-0100`
- Password: `FS-2026-0100S`
- Result: ✅ Login successful

---

## 🚨 Production Notes

### Before Deploying:

1. **Update APP_URL** in `.env`:
   ```env
   APP_URL=https://yourproductiondomain.com
   ```

2. **Test with Real Numbers:**
   - Create test patients with actual staff phone numbers
   - Verify SMS delivery
   - Test login from mobile devices

3. **Monitor Costs:**
   - Each SMS costs credits
   - Monitor Semaphore dashboard
   - Set up low credit alerts

4. **Privacy:**
   - Passwords are sent via SMS (plain text)
   - Ensure patients understand security
   - Consider adding "change password on first login" feature

---

## ✅ Success Criteria

Your credentials SMS is working correctly if:

- [x] SMS arrives within 30 seconds
- [x] Username is exactly the Family Serial
- [x] Password follows correct format
- [x] Patient can login with received credentials
- [x] Logs show "SMS credentials sent to new patient"
- [x] No errors in logs

---

**Ready to test?** Start with Method 1 (Create a Real Patient) for the most authentic test!

**Questions?** Check the main `SMS_TESTING_GUIDE.md` for more details.
