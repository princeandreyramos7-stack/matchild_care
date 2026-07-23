# 📱 SMS Quick Reference Card

## When SMS is Sent Automatically

### 📝 New Patient Registration → 2 SMS
1. **Credentials:** Username & Password for login
2. **Appointment:** First checkup in 7 days

### ✅ Visit Completed → 2 SMS  
1. **Confirmation:** Visit recorded successfully
2. **Appointment:** Next checkup in 4 weeks

---

## Quick Test Commands

```bash
# Clear config
php artisan config:clear

# Start server
php artisan serve

# Test credentials SMS only
php artisan sms:test-credentials 09707112132

# Test any SMS
php artisan sms:test 09707112132
```

---

## SMS Messages

**Credentials:**
```
ACCOUNT CREATED: Hi Maria! Your login: Username: FS-2026-0099, 
Password: FS-2026-0099S. Login at: http://localhost/login - Matcare
```

**Appointment:**
```
REMINDER: Hi Maria, you have a prenatal checkup on July 30, 2026 
at 9:00 AM. Please bring your health records. - Matcare
```

**Visit Done:**
```
VISIT COMPLETED: Hi Maria, your visit #1 has been recorded. 
Next visit: August 20, 2026. For questions, contact your health center. - Matcare
```

---

## Check Logs

```bash
# View SMS logs
type storage\logs\laravel.log | findstr /i "sms"

# View today's logs
type storage\logs\laravel.log | findstr /i "2026-07-23"
```

---

## Configuration

```env
SMS_ENABLED=true                       ← Master switch
SMS_SEND_CREDENTIALS=true              ← Login SMS
SMS_SEND_APPOINTMENT_REMINDERS=true    ← Appointment SMS
SMS_SEND_VISIT_NOTIFICATIONS=true      ← Visit SMS
```

---

## Documentation

- `SMS_WORKFLOW_SUMMARY.md` - This summary
- `COMPLETE_SMS_WORKFLOW_GUIDE.md` - Full testing guide
- `CREDENTIALS_SMS_SUMMARY.md` - Login SMS details
- `SMS_TESTING_QUICKSTART.md` - General testing

---

## Support Checklist

✅ API Key configured  
✅ Sender name: Matcare  
✅ All SMS features enabled  
✅ Phone number field available  
✅ Config cache cleared  

**Ready to test!** 🚀
