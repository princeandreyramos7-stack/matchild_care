# Semaphore Sender Name Application Guide

## Current Status

Based on your dashboard, your sender name "**Maternal**" is currently **PENDING** approval.

You cannot send SMS until this sender name is approved by Semaphore.

## What is a Sender Name?

A sender name is the identifier that appears as the sender when your SMS is received. For example:
```
From: Maternal
Message: REMINDER: Hi Jane, you have a prenatal checkup on July 10...
```

## Application Process

### Step 1: Access Sender Names Section
1. Log in to [Semaphore Dashboard](https://semaphore.co/dashboard)
2. Navigate to **Sender Names** section
3. You should see your application:
   - Name: **Maternal**
   - Status: **Pending**

### Step 2: Wait for Approval
- **Typical approval time**: 1-3 business days
- **Business hours**: Monday-Friday (excluding Philippine holidays)
- You'll receive an email when approved

### Step 3: Check Approval Status
Check your dashboard regularly:
- ✅ **Active** = Ready to send SMS
- ⏳ **Pending** = Still under review
- ❌ **Rejected** = Need to reapply with corrections

## Requirements for Approval

Semaphore typically requires:

1. **Valid Sender Name Format**
   - 3-11 alphanumeric characters
   - No special characters
   - No spaces
   - Example: "Maternal" ✅

2. **Business Information**
   - Business/Organization name
   - Contact information
   - Business registration (for commercial use)

3. **Use Case Description**
   - What messages you'll send
   - Who will receive them
   - Example: "Health center appointment reminders for pregnant patients"

## What to Do While Waiting

### Option 1: Wait for Approval (Recommended)
Simply wait for Semaphore to approve your "Maternal" sender name.

### Option 2: Use a Different Provider
If you need to send SMS immediately, consider:
- **UniSMS** - May have faster approval
- **PhilSMS** - Different approval process

To switch providers, update your `.env`:
```env
# Switch to UniSMS temporarily
SMS_PROVIDER=unisms
SMS_API_KEY=your_unisms_key
SMS_API_ENDPOINT=https://api.unisms.com/v1/sms/send
```

## After Approval

Once approved, update your `.env` file:

```env
SMS_PROVIDER=semaphore
SMS_API_KEY=your_api_key_here
SMS_SENDER_NAME=Maternal
SMS_API_ENDPOINT=https://api.semaphore.co/api/v4/messages
SMS_ENABLED=true
```

**Important**: Use exactly "Maternal" (the approved name, case-sensitive).

Then test:
```bash
php artisan config:clear
php artisan test:sms 09123456789 "Test message"
```

## Common Rejection Reasons

If your sender name is rejected:

1. **Generic/Common Names**
   - Avoid: "Info", "Admin", "Alert"
   - Better: Your organization name

2. **Trademark Issues**
   - Don't use trademarked names you don't own
   - Use your registered business name

3. **Missing Documentation**
   - Provide business registration if requested
   - Submit complete contact information

4. **Inappropriate Names**
   - Must be professional
   - Must represent your organization

## Reapplying if Rejected

1. Read the rejection reason carefully
2. Prepare required documents
3. Choose a different name if necessary
4. Submit new application
5. Suggestions for maternal care:
   - "HealthCare"
   - "PregnancyCare"
   - "WellnessCtr"
   - Your clinic's acronym

## Tips for Faster Approval

1. **Use your business name** - Easier to verify
2. **Provide clear documentation** - Business permits, DTI registration
3. **Explain use case** - Healthcare appointment reminders
4. **Apply during business hours** - Monday-Friday
5. **Avoid long weekends** - Philippines holidays delay approval

## Contact Semaphore Support

If approval takes longer than 3 business days:

**Email**: support@semaphore.co
**Subject**: "Sender Name Approval Status - [Your Account Name]"
**Include**:
- Your account email
- Sender name applied for ("Maternal")
- Date of application (2026-07-05)

## Testing Without Sender Name

Unfortunately, you **cannot test SMS** while sender name is pending. You must wait for approval.

However, you can:
- ✅ Test your code logic
- ✅ Check phone number formatting
- ✅ Verify configuration
- ❌ Cannot actually send SMS

## Alternative: Use Semaphore Priority

If urgent, Semaphore offers **Priority Sender Name** service:
- Faster approval (same day possible)
- Additional fee required
- Contact Semaphore sales

## Next Steps

1. ⏳ Wait for "Maternal" sender name approval
2. 📧 Check email for approval notification
3. 🔄 Refresh Semaphore dashboard daily
4. ✅ Test SMS once approved
5. 🚀 Enable SMS features in production

## Current Configuration

Your `.env` should look like this once approved:

```env
SMS_PROVIDER=semaphore
SMS_API_KEY=sk_e37d81e4-022c-4685-b578-367568043ec8  # Your actual key
SMS_SENDER_NAME=Maternal  # Use exact approved name
SMS_API_ENDPOINT=https://api.semaphore.co/api/v4/messages
SMS_ENABLED=true
SMS_SEND_APPOINTMENT_REMINDERS=true
SMS_SEND_VISIT_NOTIFICATIONS=true
SMS_SEND_CREDENTIALS=false
```

---

**Summary**: Your sender name "Maternal" is pending approval. Wait 1-3 business days, then test SMS. Cannot send messages until approved.
