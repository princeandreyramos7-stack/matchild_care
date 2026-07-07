# UniSMS Integration Setup Guide

## Overview
This guide will help you integrate UniSMS API for sending SMS notifications in your Maternal & Child Care Management System.

## ✅ What's Already Configured

Your system is now set up with:
- **API Key**: `sk_e37d81e4-022c-4685-b578-367568043ec8`
- **Provider**: UniSMS
- **Endpoint**: `https://api.unisms.com/v1/sms/send`
- **SMS Features**: Enabled

## 📋 Prerequisites

1. **UniSMS Account** - Active account at [unisms.com](https://unisms.com)
2. **API Key** - Already configured in your `.env` file
3. **Sufficient Credits** - Ensure your UniSMS account has credits
4. **Valid Sender Name** - Registered sender name (currently: HealthCenter)

## 🔧 Configuration

### Current Settings (.env)

```env
# SMS Provider Settings (UniSMS)
SMS_PROVIDER=unisms
SMS_API_KEY=sk_e37d81e4-022c-4685-b578-367568043ec8
SMS_SENDER_NAME=HealthCenter
SMS_API_ENDPOINT=https://api.unisms.com/v1/sms/send

# SMS Feature Toggles
SMS_ENABLED=true
SMS_SEND_APPOINTMENT_REMINDERS=true
SMS_SEND_VISIT_NOTIFICATIONS=true
SMS_SEND_CREDENTIALS=false
```

### Configuration Options

| Setting | Description | Default |
|---------|-------------|---------|
| `SMS_PROVIDER` | SMS provider name | `unisms` |
| `SMS_API_KEY` | Your UniSMS API secret key | Required |
| `SMS_SENDER_NAME` | Sender name shown in SMS | `HealthCenter` |
| `SMS_API_ENDPOINT` | UniSMS API endpoint | `https://api.unisms.com/v1/sms/send` |
| `SMS_ENABLED` | Master switch for all SMS features | `true` |
| `SMS_SEND_APPOINTMENT_REMINDERS` | Send appointment reminders | `true` |
| `SMS_SEND_VISIT_NOTIFICATIONS` | Send visit completion notifications | `true` |
| `SMS_SEND_CREDENTIALS` | Send login credentials | `false` |

## 📱 SMS Features

### 1. Appointment Reminders
Automatically sends reminders when prenatal visits are scheduled.

**Message Format:**
```
REMINDER: Hi [Patient Name], you have a prenatal checkup on [Date] at [Time]. Please bring your health records. - HealthCenter
```

**Triggered When:**
- Health worker creates/schedules a prenatal visit

### 2. Visit Notifications
Sends confirmation after a prenatal visit is completed.

**Message Format:**
```
VISIT COMPLETED: Hi [Patient Name], your visit #[Number] has been recorded. Next visit: [Date]. For questions, contact your health center. - HealthCenter
```

**Triggered When:**
- Prenatal visit is marked as completed

### 3. Login Credentials (Currently Disabled)
Can send login credentials to new patients.

**Message Format:**
```
ACCOUNT CREATED: Hi [Name]! Your login: Username: [email], Password: [password]. Login at: [URL] - HealthCenter
```

**To Enable:**
Set `SMS_SEND_CREDENTIALS=true` in `.env`

## 🔄 How It Works

### System Flow

```
1. User Action (Create/Update Visit)
   ↓
2. Controller calls SMS Service
   ↓
3. SMS Service formats phone number
   ↓
4. SMS Service validates number
   ↓
5. SMS Service sends to UniSMS API
   ↓
6. UniSMS delivers SMS
   ↓
7. Response logged in Laravel logs
```

### Code Implementation

#### Sending Appointment Reminder
```php
use App\Services\SmsService;

$smsService = new SmsService();
$smsService->sendAppointmentReminder($phoneNumber, [
    'patient_name' => 'Jane Doe',
    'appointment_date' => 'June 28, 2026',
    'appointment_time' => '10:00 AM'
]);
```

#### Sending Visit Notification
```php
$smsService->sendVisitNotification($phoneNumber, [
    'patient_name' => 'Jane Doe',
    'visit_number' => 2,
    'next_visit_date' => 'July 28, 2026'
]);
```

#### Sending Custom SMS
```php
$smsService->send('09123456789', 'Your custom message here');
```

## 📞 Phone Number Format

The system automatically handles Philippine phone number formatting:

| Input Format | Converted To | Valid? |
|--------------|--------------|--------|
| `09123456789` | `09123456789` | ✅ Yes |
| `9123456789` | `09123456789` | ✅ Yes |
| `+639123456789` | `09123456789` | ✅ Yes |
| `639123456789` | `09123456789` | ✅ Yes |
| `09123` | Invalid | ❌ No (too short) |
| `08123456789` | Invalid | ❌ No (must start with 09) |

**Validation Rules:**
- Must be exactly 11 digits
- Must start with `09`
- Only numeric characters allowed

## 🧪 Testing SMS

### Method 1: Test via Patient Creation

1. Create a new patient with a valid mobile number
2. Create a prenatal visit for that patient
3. Check logs at `storage/logs/laravel.log`

### Method 2: Test via Tinker

```bash
php artisan tinker
```

```php
$sms = new App\Services\SmsService();
$result = $sms->send('09123456789', 'Test message from Maternal Care System');
echo $result ? 'SMS Sent!' : 'SMS Failed';
```

### Method 3: Test via Artisan Command

Create a test command:

```bash
php artisan make:command TestSMS
```

```php
// app/Console/Commands/TestSMS.php
public function handle()
{
    $sms = new \App\Services\SmsService();
    $phone = $this->ask('Enter phone number (09XXXXXXXXX)');
    $message = $this->ask('Enter message');
    
    $result = $sms->send($phone, $message);
    
    if ($result) {
        $this->info('✅ SMS sent successfully!');
    } else {
        $this->error('❌ SMS sending failed. Check logs.');
    }
}
```

Run:
```bash
php artisan test:sms
```

## 📊 Monitoring & Logs

### Checking SMS Status

All SMS activities are logged in `storage/logs/laravel.log`:

**Successful Send:**
```
[2026-06-27 22:00:00] local.INFO: SMS sent successfully via UniSMS {"phone":"09123456789","response":{...}}
```

**Failed Send:**
```
[2026-06-27 22:00:00] local.ERROR: SMS sending failed {"phone":"09123456789","error":"...","trace":"..."}
```

**Disabled SMS:**
```
[2026-06-27 22:00:00] local.INFO: SMS sending disabled {"phone":"09123456789","message":"..."}
```

### Viewing Logs

```bash
# View last 50 lines
tail -n 50 storage/logs/laravel.log

# Follow logs in real-time
tail -f storage/logs/laravel.log

# Search for SMS logs
grep "SMS" storage/logs/laravel.log
```

## 🔍 Troubleshooting

### SMS Not Sending

**Problem:** SMS not being sent

**Solutions:**
1. ✅ Check if `SMS_ENABLED=true` in `.env`
2. ✅ Verify API key is correct
3. ✅ Check if you have sufficient credits in UniSMS account
4. ✅ Verify phone number is valid (09XXXXXXXXX format)
5. ✅ Check Laravel logs for error details
6. ✅ Ensure `guzzlehttp/guzzle` package is installed

### Invalid Phone Number

**Problem:** "Invalid phone number format" in logs

**Solution:**
- Phone must be 11 digits
- Must start with 09
- Example: 09123456789

### API Authentication Failed

**Problem:** 401 Unauthorized error

**Solutions:**
1. Verify API key in `.env` is correct
2. Check if API key starts with `sk_`
3. Ensure no extra spaces in API key
4. Verify API key is active in UniSMS dashboard

### Network/Connection Issues

**Problem:** Connection timeout or network errors

**Solutions:**
1. Check internet connectivity
2. Verify UniSMS API endpoint is accessible
3. Check firewall settings
4. Try manual API test with curl:

```bash
curl -X POST https://api.unisms.com/v1/sms/send \
  -H "Authorization: Bearer sk_e37d81e4-022c-4685-b578-367568043ec8" \
  -H "Content-Type: application/json" \
  -d '{"to":"09123456789","from":"HealthCenter","message":"Test"}'
```

## 🔐 Security Best Practices

1. **Never commit .env file** - Keep API keys secret
2. **Use environment variables** - Don't hardcode API keys
3. **Rotate API keys regularly** - Change keys periodically
4. **Monitor usage** - Check for unusual activity
5. **Limit access** - Only authorized staff should have API access
6. **Enable logging** - Keep audit trail of SMS sends

## 💰 Cost Management

### Tips to Manage SMS Costs

1. **Disable unnecessary features**:
   ```env
   SMS_SEND_CREDENTIALS=false
   ```

2. **Test with SMS disabled**:
   ```env
   SMS_ENABLED=false  # Messages logged but not sent
   ```

3. **Monitor credit balance** - Check UniSMS dashboard regularly

4. **Use conditional sending** - Only send critical messages

5. **Batch similar messages** - Combine notifications when possible

## 📚 API Reference

### UniSMS API Request Format

```http
POST https://api.unisms.com/v1/sms/send
Authorization: Bearer sk_e37d81e4-022c-4685-b578-367568043ec8
Content-Type: application/json

{
  "to": "09123456789",
  "from": "HealthCenter",
  "message": "Your message here"
}
```

### Success Response (200 OK)
```json
{
  "status": "success",
  "message_id": "msg_xxxxx",
  "to": "09123456789",
  "from": "HealthCenter"
}
```

### Error Response (4xx/5xx)
```json
{
  "status": "error",
  "code": "invalid_credentials",
  "message": "Invalid API key"
}
```

## 🆚 Switching Providers

If you need to switch back to PhilSMS or another provider:

### Switch to PhilSMS

```env
SMS_PROVIDER=philsms
SMS_API_KEY=your_philsms_key
SMS_API_ENDPOINT=https://app.philsms.com/api/v3/sms/send
```

The system supports both providers. Just change the settings in `.env`.

## 📝 Summary

✅ **Your system is ready to send SMS via UniSMS!**

**Quick Checklist:**
- [x] UniSMS API key configured
- [x] SMS service updated
- [x] SMS features enabled
- [x] Phone number validation working
- [x] Logging configured

**Next Steps:**
1. Verify you have credits in your UniSMS account
2. Test sending SMS with a real phone number
3. Monitor logs for successful delivery
4. Adjust settings based on your needs

## 🆘 Support

If you need help:
- Check Laravel logs: `storage/logs/laravel.log`
- Review UniSMS documentation: [docs.unisms.com](https://docs.unisms.com)
- Contact UniSMS support for API issues
- Check this documentation for troubleshooting steps

---

**Last Updated:** June 27, 2026
**API Key:** `sk_e37d81e4-022c-4685-b578-367568043ec8`
**Provider:** UniSMS
**Status:** ✅ Ready to Use
