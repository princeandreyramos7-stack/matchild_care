# SMS Implementation Guide - For Appointments

## Overview
This guide shows exactly how to add SMS notifications when appointments are scheduled or completed.

---

## ⚙️ Configuration First!

### Add to your .env file:

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

## 📍 Implementation Locations

### Where to Add SMS Code

1. **When Visit is Scheduled** → `MaternalCareController.php` (store/update methods)
2. **When Visit is Completed** → Same controller, when marking visit complete
3. **When Account is Created** → Already done in `PatientAccountService.php`

---

## 🔧 Implementation Examples

### Option 1: Send SMS When Visit is Saved (Recommended)

Update `app/Http/Controllers/MaternalCareController.php`:

```php
use App\Services\SmsService;

public function store(StoreMaternalCareRequest $request)
{
    try {
        // ... existing maternal record creation code ...
        
        $maternalRecord = $this->maternalCareService->createMaternalRecord($validatedData);
        
        // Create patient account
        PatientAccountService::createPatientAccount($maternalRecord);
        
        // NEW: Send SMS for scheduled visits
        if ($maternalRecord->contact_number && isset($validatedData['prenatal_visits'])) {
            $this->sendAppointmentSMS($maternalRecord, $validatedData['prenatal_visits']);
        }
        
        return redirect()->route('maternal-care.list')
            ->with('success', 'Maternal care record created successfully.');
            
    } catch (\Exception $e) {
        // ... error handling ...
    }
}

public function update(StoreMaternalCareRequest $request, $id)
{
    try {
        // ... existing update code ...
        
        $maternalRecord = MaternalRecord::findOrFail($id);
        $maternalRecord->update($validatedData);
        
        // NEW: Send SMS for newly scheduled visits
        if ($maternalRecord->contact_number && isset($validatedData['prenatal_visits'])) {
            $this->sendAppointmentSMS($maternalRecord, $validatedData['prenatal_visits']);
        }
        
        return redirect()->route('maternal-care.list')
            ->with('success', 'Maternal care record updated successfully.');
            
    } catch (\Exception $e) {
        // ... error handling ...
    }
}

/**
 * Send SMS for scheduled appointments
 */
protected function sendAppointmentSMS($maternalRecord, $visits)
{
    $sms = new SmsService();
    
    foreach ($visits as $visit) {
        // Only send SMS if visit has a date and hasn't been notified yet
        if (isset($visit['visit_date']) && $visit['visit_date']) {
            // Check if this is a new/updated visit date
            $existingVisit = $maternalRecord->prenatalVisits()
                ->where('visit_number', $visit['visit_number'])
                ->first();
            
            // Send SMS if:
            // 1. It's a new visit, OR
            // 2. The visit date was just added/changed
            $shouldSendSMS = !$existingVisit || 
                             !$existingVisit->visit_date || 
                             $existingVisit->visit_date != $visit['visit_date'];
            
            if ($shouldSendSMS) {
                $sms->sendAppointmentReminder($maternalRecord->contact_number, [
                    'patient_name' => $maternalRecord->first_name,
                    'appointment_date' => date('F d, Y', strtotime($visit['visit_date'])),
                    'appointment_time' => '9:00 AM', // You can make this dynamic
                ]);
                
                Log::info('Appointment SMS sent', [
                    'family_serial' => $maternalRecord->family_serial,
                    'visit_number' => $visit['visit_number'],
                    'visit_date' => $visit['visit_date'],
                ]);
            }
        }
    }
}
```

### Option 2: Simpler Version (Send for All Scheduled Visits)

If you want to send SMS every time a visit date is set (simpler, but may send duplicate SMS):

```php
use App\Services\SmsService;

public function store(StoreMaternalCareRequest $request)
{
    try {
        $maternalRecord = $this->maternalCareService->createMaternalRecord($validatedData);
        PatientAccountService::createPatientAccount($maternalRecord);
        
        // Send SMS for any scheduled visits
        if ($maternalRecord->contact_number && isset($validatedData['prenatal_visits'])) {
            $sms = new SmsService();
            
            foreach ($validatedData['prenatal_visits'] as $visit) {
                if (isset($visit['visit_date']) && $visit['visit_date']) {
                    $sms->sendAppointmentReminder($maternalRecord->contact_number, [
                        'patient_name' => $maternalRecord->first_name,
                        'appointment_date' => date('F d, Y', strtotime($visit['visit_date'])),
                    ]);
                }
            }
        }
        
        return redirect()->route('maternal-care.list')
            ->with('success', 'Record created and SMS sent!');
            
    } catch (\Exception $e) {
        Log::error('Error in maternal care store', ['error' => $e->getMessage()]);
        return back()->withErrors(['error' => 'Failed to save record.']);
    }
}
```

### Option 3: Send SMS When Visit is Completed

Add this method to track visit completion:

```php
use App\Services\SmsService;

/**
 * Mark visit as completed and send notification
 */
public function completeVisit(Request $request, $maternalRecordId, $visitNumber)
{
    try {
        $maternalRecord = MaternalRecord::findOrFail($maternalRecordId);
        
        $visit = $maternalRecord->prenatalVisits()
            ->where('visit_number', $visitNumber)
            ->firstOrFail();
        
        // Mark as completed (you can add a 'completed_at' column)
        $visit->update([
            'completed_at' => now(),
        ]);
        
        // Find next visit
        $nextVisit = $maternalRecord->prenatalVisits()
            ->where('visit_number', '>', $visitNumber)
            ->whereNotNull('visit_date')
            ->orderBy('visit_number')
            ->first();
        
        // Send SMS notification
        if ($maternalRecord->contact_number) {
            $sms = new SmsService();
            $sms->sendVisitNotification($maternalRecord->contact_number, [
                'patient_name' => $maternalRecord->first_name,
                'visit_number' => $visitNumber,
                'next_visit_date' => $nextVisit ? 
                    date('F d, Y', strtotime($nextVisit->visit_date)) : 'TBA',
            ]);
        }
        
        return response()->json([
            'success' => true,
            'message' => 'Visit completed and SMS sent!'
        ]);
        
    } catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'message' => 'Failed to complete visit.'
        ], 500);
    }
}
```

---

## 📱 Testing Your Implementation

### Step 1: Add Configuration

Add to `.env`:
```env
SMS_ENABLED=true
SMS_API_KEY=Philsms:3225|3PeUXxIKh6Z4hbBKTOZt46Sxoo7I97dJZ5ZsnWTUde594199
```

### Step 2: Test with a Real Phone Number

1. Login as health worker or admin
2. Create or edit a maternal record
3. Add your phone number in contact field
4. Schedule a prenatal visit with a date
5. Save the record
6. Check your phone for SMS!

### Step 3: Check Logs

View Laravel logs to see SMS activity:
```bash
tail -f storage/logs/laravel.log
```

Look for:
```
SMS sent successfully
Appointment SMS sent
```

---

## 🔧 Advanced: Scheduled SMS (Send 1 Day Before)

If you want to send SMS 1 day before the appointment (instead of immediately):

### Create a Scheduled Task

**File**: `app/Console/Kernel.php`

```php
protected function schedule(Schedule $schedule)
{
    // Send appointment reminders daily at 9 AM
    $schedule->call(function () {
        $tomorrow = now()->addDay()->format('Y-m-d');
        
        // Get all visits scheduled for tomorrow
        $visits = \App\Models\PrenatalVisit::whereDate('visit_date', $tomorrow)
            ->with('maternalRecord')
            ->get();
        
        $sms = new \App\Services\SmsService();
        
        foreach ($visits as $visit) {
            if ($visit->maternalRecord->contact_number) {
                $sms->sendAppointmentReminder(
                    $visit->maternalRecord->contact_number,
                    [
                        'patient_name' => $visit->maternalRecord->first_name,
                        'appointment_date' => 'tomorrow',
                        'appointment_time' => '9:00 AM',
                    ]
                );
            }
        }
    })->dailyAt('09:00');
}
```

Then run the scheduler:
```bash
php artisan schedule:work
```

Or add to cron (for production):
```
* * * * * cd /path-to-your-project && php artisan schedule:run >> /dev/null 2>&1
```

---

## 📊 Tracking SMS Sent

### Add SMS Tracking (Optional)

Create a table to track sent SMS:

```php
// Migration
php artisan make:migration create_sms_logs_table

// In migration file:
Schema::create('sms_logs', function (Blueprint $table) {
    $table->id();
    $table->string('phone_number');
    $table->text('message');
    $table->string('type'); // 'appointment', 'credentials', 'visit'
    $table->foreignId('maternal_record_id')->nullable()->constrained();
    $table->boolean('sent')->default(false);
    $table->timestamp('sent_at')->nullable();
    $table->text('error_message')->nullable();
    $table->timestamps();
});
```

Then log each SMS:

```php
// In SmsService.php
protected function logSMS($phoneNumber, $message, $type, $maternalRecordId, $success)
{
    \App\Models\SmsLog::create([
        'phone_number' => $phoneNumber,
        'message' => $message,
        'type' => $type,
        'maternal_record_id' => $maternalRecordId,
        'sent' => $success,
        'sent_at' => $success ? now() : null,
    ]);
}
```

---

## 🎯 Quick Implementation Checklist

### For Immediate Appointment SMS:

1. ✅ Add SMS config to `.env` file
2. ⏳ Add `use App\Services\SmsService;` to MaternalCareController
3. ⏳ Add SMS sending code to `store()` and `update()` methods
4. ⏳ Test with a real phone number
5. ⏳ Check logs to verify SMS sent

### For Future Enhancement:

- [ ] Add scheduled SMS (1 day before)
- [ ] Add SMS history tracking
- [ ] Add SMS opt-out option
- [ ] Create SMS dashboard
- [ ] Add bulk SMS for announcements

---

## 💡 Pro Tips

### Keep Messages Short
- Target: Under 160 characters = 1 SMS credit
- Be concise and clear
- Include only essential information

### Test Thoroughly
- Test with different phone formats
- Test with/without dates
- Test with invalid numbers
- Check logs for errors

### Handle Errors Gracefully
- Don't fail the entire request if SMS fails
- Log errors for troubleshooting
- Consider retry logic for failed SMS

### Respect Patient Privacy
- Get consent before sending SMS
- Allow patients to opt-out
- Don't include sensitive medical info
- Use secure channels for detailed information

---

## ✅ Summary

### Configuration:
```env
SMS_ENABLED=true
SMS_API_KEY=Philsms:3225|3PeUXxIKh6Z4hbBKTOZt46Sxoo7I97dJZ5ZsnWTUde594199
```

### Implementation:
- Add to `MaternalCareController.php` `store()` and `update()` methods
- Send SMS when visit date is set
- Optionally send when visit is completed

### Test:
1. Add config to .env
2. Create/edit maternal record
3. Add phone number
4. Schedule visit
5. Check phone for SMS!

**Ready to implement! Choose Option 1 or 2 above and add to your controller.**
