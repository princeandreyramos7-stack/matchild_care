# SMS Notification Setup Guide - PhilSMS/Semaphore

## Overview
This guide shows how to integrate PhilSMS (Semaphore) SMS service for sending notifications to patients in the Philippines.

---

## About PhilSMS/Semaphore

### Coverage
✅ **Works with ALL Philippine Networks**:
- Smart Communications
- Globe Telecom
- Sun Cellular
- Talk 'N Text (TNT)
- Touch Mobile (TM)
- DITO Telecommunity
- And other Philippine mobile networks

### Features
- Fast delivery (usually within seconds)
- High reliability
- Affordable pricing
- API integration
- Message tracking
- Sender ID customization
- Bulk messaging support

---

## Step 1: Sign Up for PhilSMS Account

### Registration

1. **Visit**: https://semaphore.co/ or https://philsms.com/
2. **Click "Sign Up"** or "Register"
3. **Fill in details**:
   - Business Name
   - Email Address
   - Contact Number
   - Password

4. **Verify Email**: Check your email and verify your account

5. **Complete KYC**: Submit required documents
   - Valid ID
   - Business documents (if business account)
   - Address proof

### Pricing (as of 2026)
- Pay-as-you-go: ~₱0.50 - ₱1.00 per SMS
- Bulk packages available
- Free test credits upon signup

---

## Step 2: Get API Credentials

### Obtain API Key

1. **Login** to your Semaphore dashboard
2. **Navigate** to API Settings or Developer Settings
3. **Copy** your API Key
4. **Note** the API endpoint: `https://api.semaphore.co/api/v4/messages`

### Test Your API Key

Use the test endpoint to verify:
```bash
curl -X POST https://api.semaphore.co/api/v4/messages \
  -d apikey=YOUR_API_KEY \
  -d number=09123456789 \
  -d message="Test message from Maternal Care System"
```

---

## Step 3: Install Required Package

### Install Guzzle HTTP Client

```bash
composer require guzzlehttp/guzzle
```

This package will be used to make HTTP requests to the PhilSMS API.

---

## Step 4: Configure Environment Variables

### Update .env File

Add these lines to your `.env` file:

```env
# SMS Configuration
SMS_PROVIDER=semaphore
SMS_API_KEY=your_semaphore_api_key_here
SMS_SENDER_NAME=HealthCenter
SMS_API_ENDPOINT=https://api.semaphore.co/api/v4/messages

# SMS Feature Toggle
SMS_ENABLED=true
SMS_SEND_APPOINTMENT_REMINDERS=true
SMS_SEND_VISIT_NOTIFICATIONS=true
SMS_SEND_CREDENTIALS=true
```

### Security Note
⚠️ Never commit your `.env` file to version control!
✅ Add `.env` to `.gitignore` (already done in Laravel)

---

## Step 5: Create SMS Service

### Create SMS Service Class

**File**: `app/Services/SmsService.php`

```php
<?php

namespace App\Services;

use GuzzleHttp\Client;
use Illuminate\Support\Facades\Log;

class SmsService
{
    protected $apiKey;
    protected $endpoint;
    protected $senderName;
    protected $client;
    
    public function __construct()
    {
        $this->apiKey = config('services.sms.api_key');
        $this->endpoint = config('services.sms.endpoint');
        $this->senderName = config('services.sms.sender_name');
        $this->client = new Client();
    }
    
    /**
     * Send SMS to a single recipient
     */
    public function send(string $phoneNumber, string $message): bool
    {
        // Check if SMS is enabled
        if (!config('services.sms.enabled')) {
            Log::info('SMS sending disabled', [
                'phone' => $phoneNumber,
                'message' => $message
            ]);
            return false;
        }
        
        // Format phone number
        $phoneNumber = $this->formatPhoneNumber($phoneNumber);
        
        try {
            $response = $this->client->post($this->endpoint, [
                'form_params' => [
                    'apikey' => $this->apiKey,
                    'number' => $phoneNumber,
                    'message' => $message,
                    'sendername' => $this->senderName,
                ]
            ]);
            
            $result = json_decode($response->getBody(), true);
            
            Log::info('SMS sent successfully', [
                'phone' => $phoneNumber,
                'response' => $result
            ]);
            
            return true;
        } catch (\Exception $e) {
            Log::error('SMS sending failed', [
                'phone' => $phoneNumber,
                'error' => $e->getMessage()
            ]);
            
            return false;
        }
    }
    
    /**
     * Send SMS to multiple recipients
     */
    public function sendBulk(array $phoneNumbers, string $message): array
    {
        $results = [];
        
        foreach ($phoneNumbers as $phoneNumber) {
            $results[$phoneNumber] = $this->send($phoneNumber, $message);
        }
        
        return $results;
    }
    
    /**
     * Format phone number to Philippine format
     * Accepts: 09123456789, 9123456789, +639123456789
     * Returns: 09123456789
     */
    protected function formatPhoneNumber(string $phoneNumber): string
    {
        // Remove all non-numeric characters
        $phoneNumber = preg_replace('/[^0-9]/', '', $phoneNumber);
        
        // If starts with 63, replace with 0
        if (substr($phoneNumber, 0, 2) === '63') {
            $phoneNumber = '0' . substr($phoneNumber, 2);
        }
        
        // If doesn't start with 0, add it
        if (substr($phoneNumber, 0, 1) !== '0') {
            $phoneNumber = '0' . $phoneNumber;
        }
        
        return $phoneNumber;
    }
    
    /**
     * Validate Philippine phone number
     */
    public function isValidPhoneNumber(string $phoneNumber): bool
    {
        $formatted = $this->formatPhoneNumber($phoneNumber);
        
        // Philippine mobile numbers: 09XX-XXX-XXXX (11 digits)
        return preg_match('/^09[0-9]{9}$/', $formatted) === 1;
    }
    
    /**
     * Send appointment reminder
     */
    public function sendAppointmentReminder(string $phoneNumber, array $data): bool
    {
        if (!config('services.sms.send_appointment_reminders')) {
            return false;
        }
        
        $message = $this->buildAppointmentMessage($data);
        return $this->send($phoneNumber, $message);
    }
    
    /**
     * Send visit notification
     */
    public function sendVisitNotification(string $phoneNumber, array $data): bool
    {
        if (!config('services.sms.send_visit_notifications')) {
            return false;
        }
        
        $message = $this->buildVisitMessage($data);
        return $this->send($phoneNumber, $message);
    }
    
    /**
     * Send login credentials
     */
    public function sendCredentials(string $phoneNumber, array $data): bool
    {
        if (!config('services.sms.send_credentials')) {
            return false;
        }
        
        $message = $this->buildCredentialsMessage($data);
        return $this->send($phoneNumber, $message);
    }
    
    /**
     * Build appointment reminder message
     */
    protected function buildAppointmentMessage(array $data): string
    {
        return sprintf(
            "REMINDER: Hi %s, you have a prenatal checkup on %s at %s. Please bring your health records. - %s",
            $data['patient_name'],
            $data['appointment_date'],
            $data['appointment_time'] ?? 'your scheduled time',
            $this->senderName
        );
    }
    
    /**
     * Build visit notification message
     */
    protected function buildVisitMessage(array $data): string
    {
        return sprintf(
            "VISIT COMPLETED: Hi %s, your visit #%d has been recorded. Next visit: %s. For questions, contact your health center. - %s",
            $data['patient_name'],
            $data['visit_number'],
            $data['next_visit_date'] ?? 'TBA',
            $this->senderName
        );
    }
    
    /**
     * Build credentials message
     */
    protected function buildCredentialsMessage(array $data): string
    {
        return sprintf(
            "ACCOUNT CREATED: Hi %s! Your login: Username: %s, Password: %s. Login at: %s - %s",
            $data['patient_name'],
            $data['username'],
            $data['password'],
            $data['login_url'] ?? config('app.url'),
            $this->senderName
        );
    }
}
```

---

## Step 6: Configure Services

### Update config/services.php

Add SMS configuration:

```php
'sms' => [
    'provider' => env('SMS_PROVIDER', 'semaphore'),
    'api_key' => env('SMS_API_KEY'),
    'endpoint' => env('SMS_API_ENDPOINT', 'https://api.semaphore.co/api/v4/messages'),
    'sender_name' => env('SMS_SENDER_NAME', 'HealthCenter'),
    'enabled' => env('SMS_ENABLED', false),
    'send_appointment_reminders' => env('SMS_SEND_APPOINTMENT_REMINDERS', true),
    'send_visit_notifications' => env('SMS_SEND_VISIT_NOTIFICATIONS', true),
    'send_credentials' => env('SMS_SEND_CREDENTIALS', true),
],
```

---

## Step 7: Usage Examples

### Example 1: Send Simple SMS

```php
use App\Services\SmsService;

$sms = new SmsService();
$sms->send('09123456789', 'Hello from Maternal Care System!');
```

### Example 2: Send Appointment Reminder

```php
use App\Services\SmsService;

$sms = new SmsService();
$sms->sendAppointmentReminder('09123456789', [
    'patient_name' => 'Jane Doe',
    'appointment_date' => 'June 10, 2026',
    'appointment_time' => '9:00 AM'
]);
```

### Example 3: Send Login Credentials

```php
use App\Services\SmsService;

$sms = new SmsService();
$sms->sendCredentials('09123456789', [
    'patient_name' => 'Jane Doe',
    'username' => 'FAM-001',
    'password' => 'FAM-001D',
    'login_url' => 'https://yoursite.com/login'
]);
```

### Example 4: Send Bulk SMS

```php
use App\Services\SmsService;

$sms = new SmsService();
$phoneNumbers = ['09123456789', '09987654321', '09111222333'];
$results = $sms->sendBulk($phoneNumbers, 'Health center will be closed tomorrow.');
```

---

## Step 8: Integration Points

### 1. Send Credentials on Account Creation

**File**: `app/Services/PatientAccountService.php`

```php
use App\Services\SmsService;

public static function createPatientAccount(MaternalRecord $maternalRecord): User
{
    // ... existing account creation code ...
    
    // Send SMS with login credentials
    if ($maternalRecord->contact_number) {
        $sms = new SmsService();
        $password = self::getDefaultPassword($maternalRecord);
        
        $sms->sendCredentials($maternalRecord->contact_number, [
            'patient_name' => $maternalRecord->first_name,
            'username' => $maternalRecord->family_serial,
            'password' => $password,
        ]);
    }
    
    return $user;
}
```

### 2. Send Reminder When Visit is Scheduled

**File**: `app/Http/Controllers/MaternalCareController.php`

```php
use App\Services\SmsService;

public function update(Request $request, MaternalRecord $maternalRecord)
{
    // ... existing update code ...
    
    // If prenatal visit date is set, send SMS reminder
    if ($request->has('prenatal_visits')) {
        foreach ($request->prenatal_visits as $visit) {
            if (isset($visit['visit_date']) && $maternalRecord->contact_number) {
                $sms = new SmsService();
                $sms->sendAppointmentReminder($maternalRecord->contact_number, [
                    'patient_name' => $maternalRecord->first_name,
                    'appointment_date' => date('F d, Y', strtotime($visit['visit_date'])),
                ]);
            }
        }
    }
    
    // ... rest of code ...
}
```

### 3. Send Notification After Visit Completion

```php
use App\Services\SmsService;

// When health worker completes a visit
$sms = new SmsService();
$sms->sendVisitNotification($maternalRecord->contact_number, [
    'patient_name' => $maternalRecord->first_name,
    'visit_number' => $prenatalVisit->visit_number,
    'next_visit_date' => $nextVisit ? date('F d, Y', strtotime($nextVisit->visit_date)) : 'TBA',
]);
```

---

## Step 9: Testing

### Test SMS Functionality

Create a test route:

**File**: `routes/web.php`

```php
// Test SMS (remove in production)
Route::get('/test-sms', function () {
    $sms = new \App\Services\SmsService();
    
    $result = $sms->send('09123456789', 'Test message from Maternal Care System');
    
    return $result ? 'SMS sent successfully!' : 'SMS sending failed!';
})->middleware('auth');
```

Visit: `http://yoursite.test/test-sms`

---

## Step 10: Phone Number Collection

### Update Maternal Record Form

Ensure contact number field is:
- Required
- Validated as Philippine mobile number
- Properly formatted

**Validation Example**:

```php
'contact_number' => [
    'required',
    'regex:/^(09|\+639)[0-9]{9}$/',
    'min:11',
    'max:13'
],
```

---

## Message Templates

### Template 1: Account Created
```
ACCOUNT CREATED: Hi [Name]! Your login: Username: [Username], Password: [Password]. Login at: [URL] - HealthCenter
```

### Template 2: Appointment Reminder (3 days before)
```
REMINDER: Hi [Name], you have a prenatal checkup on [Date] at [Time]. Please bring your health records. - HealthCenter
```

### Template 3: Visit Completed
```
VISIT COMPLETED: Hi [Name], your visit #[Number] has been recorded. Next visit: [Date]. For questions, contact your health center. - HealthCenter
```

### Template 4: Missed Appointment
```
MISSED APPOINTMENT: Hi [Name], you missed your checkup on [Date]. Please contact us to reschedule. Your health is important! - HealthCenter
```

### Template 5: Test Results Ready
```
RESULTS READY: Hi [Name], your test results are ready. Please visit the health center to review them with your health worker. - HealthCenter
```

---

## Best Practices

### Message Length
- Keep messages under 160 characters (1 SMS credit)
- Longer messages use multiple credits
- Be concise and clear

### Timing
- Send reminders 1-3 days before appointments
- Avoid sending SMS late at night (after 9 PM)
- Respect patient preferences

### Content
- Use patient's first name for personalization
- Include essential information only
- Provide contact number for questions
- Use clear, simple language

### Privacy
- Don't include sensitive medical information
- Use secure channels for detailed information
- Get patient consent for SMS notifications

### Compliance
- Follow Data Privacy Act of 2012
- Allow patients to opt-out
- Store consent records

---

## Cost Estimation

### Typical Usage per Patient

| Notification Type | Frequency | SMS per Patient | Annual SMS |
|-------------------|-----------|-----------------|------------|
| Account Created | Once | 1 | 1 |
| Appointment Reminders | 4-6 visits | 4-6 | 4-6 |
| Visit Completed | 4-6 visits | 4-6 | 4-6 |
| Test Results | 2-3 times | 2-3 | 2-3 |
| **Total** | - | **11-16** | **11-16** |

### Annual Cost Estimate

- 100 patients × 15 SMS × ₱0.75 = **₱1,125/year**
- 500 patients × 15 SMS × ₱0.75 = **₱5,625/year**
- 1000 patients × 15 SMS × ₱0.75 = **₱11,250/year**

Very affordable for the benefits!

---

## Troubleshooting

### Issue: SMS not sending

**Check**:
1. Is SMS_ENABLED=true in .env?
2. Is API key correct?
3. Is phone number valid Philippine format?
4. Check SMS credits balance
5. Review logs: `storage/logs/laravel.log`

### Issue: Invalid phone number

**Solution**:
- Use format: 09XXXXXXXXX
- Remove spaces, dashes, parentheses
- Use formatPhoneNumber() method

### Issue: SMS delayed

**Possible Causes**:
- Network congestion
- High API traffic
- Recipient's phone off/no signal

**Solution**:
- Wait a few minutes
- Check Semaphore dashboard for status
- Retry if needed

---

## Summary

### Setup Steps:
1. ✅ Sign up for Semaphore/PhilSMS account
2. ✅ Get API key from dashboard
3. ✅ Install Guzzle HTTP client
4. ✅ Configure .env with API credentials
5. ✅ Create SmsService class
6. ✅ Update config/services.php
7. ✅ Integrate with patient account creation
8. ✅ Add appointment reminders
9. ✅ Test SMS sending

### Coverage:
✅ **ALL Philippine Mobile Networks**
- Smart, Globe, Sun, TNT, TM, DITO, etc.

### Cost:
- ~₱0.50 - ₱1.00 per SMS
- Very affordable for health centers

### Benefits:
- Instant patient notifications
- Better appointment attendance
- Improved communication
- Professional service
- Automated reminders

---

**Next Steps**: Install Guzzle and create the SmsService class!
