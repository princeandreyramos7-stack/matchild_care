# Semaphore SMS Integration Guide

This guide explains how to integrate Semaphore with the Maternal Care System.

## Overview

Semaphore is a popular Philippine SMS gateway provider that allows you to send SMS notifications to patients for appointment reminders, visit notifications, and account credentials.

## Prerequisites

1. Active Semaphore account
2. API key from Semaphore dashboard
3. Registered sender name (optional, defaults to your account name)

## Configuration Steps

### 1. Get Your Semaphore Credentials

1. Sign up or log in to [Semaphore](https://semaphore.co/)
2. Navigate to your dashboard
3. Go to API Settings
4. Copy your API key

### 2. Apply for a Sender Name (REQUIRED)

**IMPORTANT**: You must have an **approved sender name** before you can send SMS.

1. In your Semaphore dashboard, go to **Sender Names**
2. Click **"Apply for Sender Name"**
3. Enter your desired sender name (e.g., "HealthCenter", "MaternalCare")
4. Provide required business information
5. Wait for approval (usually takes 1-3 business days)
6. Once approved, the status will change from "Pending" to "Active"

**Common Sender Name Requirements:**
- 3-11 alphanumeric characters
- No special characters or spaces
- Should represent your business/organization
- Requires business registration documents for verification

**Note**: You cannot send SMS while sender name is "Pending". You must wait for approval first.

### 3. Update Environment Variables

**After your sender name is approved**, open your `.env` file and update the SMS configuration:

```env
SMS_PROVIDER=semaphore
SMS_API_KEY=your_semaphore_api_key_here
SMS_SENDER_NAME=YourApprovedSenderName
SMS_API_ENDPOINT=https://api.semaphore.co/api/v4/messages

# SMS Feature Toggles
SMS_ENABLED=true
SMS_SEND_APPOINTMENT_REMINDERS=true
SMS_SEND_VISIT_NOTIFICATIONS=true
SMS_SEND_CREDENTIALS=false
```

**Important**: Use the exact sender name that was approved in your Semaphore dashboard.

### 4. Test Your Configuration

**Only after sender name is approved**, run the SMS test command:

```bash
php artisan test:sms 09123456789 "Test message from Semaphore"
```

## API Payload Format

Semaphore uses form-urlencoded payload structure:

```
apikey=your_api_key
number=09123456789
message=Your message here
sendername=YourSenderName
```

## Phone Number Format

The system automatically formats phone numbers to Philippine format:
- Input: `+639123456789` or `9123456789`
- Output: `09123456789`

## Features

### Appointment Reminders
Automatically sends SMS reminders for upcoming prenatal checkups.

### Visit Notifications
Sends confirmation after each prenatal visit is recorded.

### Credentials Delivery
Sends login credentials when a new patient account is created.

## Pricing

Semaphore offers competitive pricing for SMS:
- Pay-as-you-go credits
- Volume discounts available
- No monthly fees
- No expiration on credits

Check [Semaphore Pricing](https://semaphore.co/pricing) for current rates.

## Troubleshooting

### SMS not sending?

1. **Check API credentials**
   ```bash
   # Verify your .env settings
   php artisan config:clear
   php artisan cache:clear
   ```

2. **Check phone number format**
   - Must be valid Philippine mobile number (09XXXXXXXXX)
   - System auto-formats but check logs for validation errors

3. **Check SMS balance**
   - Log in to your Semaphore dashboard
   - Verify you have sufficient SMS credits

4. **Check logs**
   ```bash
   # View Laravel logs
   tail -f storage/logs/laravel.log
   ```

### Common Issues

**Issue**: "You need a Sender Name to send messages" or "No active sender names"
- **Solution**: This is the most common issue for new accounts
- You must apply for a sender name in Semaphore dashboard
- Wait for approval (1-3 business days)
- Cannot send SMS while status is "Pending"
- Check dashboard for approval status

**Issue**: "Invalid API key"
- Solution: Double-check your SMS_API_KEY in .env
- Verify the API key is active in your Semaphore dashboard

**Issue**: "Invalid phone number"
- Solution: Ensure number is Philippine mobile format (09XXXXXXXXX)

**Issue**: "Insufficient balance"
- Solution: Top up your Semaphore account credits

**Issue**: "Rate limit exceeded"
- Solution: Semaphore has rate limits, wait a moment and retry
- Consider implementing queue for bulk SMS

**Issue**: "Sender name not found"
- Solution: Make sure SMS_SENDER_NAME in .env matches exactly with approved name in dashboard
- Check for typos or extra spaces

## Security Notes

1. Never commit your `.env` file with real credentials
2. Keep your API key secure
3. Use environment variables for all sensitive data
4. Enable SMS only in production environments
5. Monitor your SMS usage to prevent abuse
6. Implement rate limiting for SMS sending

## Switching Between Providers

You can easily switch between SMS providers by changing the `SMS_PROVIDER` value:

```env
# For Semaphore (Recommended for Philippines)
SMS_PROVIDER=semaphore
SMS_API_ENDPOINT=https://api.semaphore.co/api/v4/messages

# For UniSMS
SMS_PROVIDER=unisms
SMS_API_ENDPOINT=https://api.unisms.com/v1/sms/send

# For PhilSMS
SMS_PROVIDER=philsms
```

Each provider requires its own API credentials and endpoint configuration.

## Best Practices

1. **Test in development first**
   - Use test phone numbers
   - Verify message format and content

2. **Monitor usage**
   - Check Semaphore dashboard regularly
   - Set up low-balance alerts

3. **Handle errors gracefully**
   - Check logs for failed messages
   - Implement retry logic for critical messages

4. **Optimize costs**
   - Don't send redundant messages
   - Keep messages concise (160 characters = 1 SMS)
   - Use templates for consistent messaging

## API Response Format

Semaphore returns JSON responses:

**Success:**
```json
[
  {
    "message_id": "1234567890",
    "user_id": "your_user_id",
    "user": "your_account_name",
    "account_id": "your_account_id",
    "recipient": "09123456789",
    "message": "Your message here",
    "sender_name": "YourSenderName",
    "network": "Globe",
    "status": "Pending",
    "type": "Single",
    "created_at": "2026-07-05 12:00:00"
  }
]
```

**Error:**
```json
{
  "error": "Error message description"
}
```

## Support

For Semaphore-specific issues:
- Email: support@semaphore.co
- Visit: https://semaphore.co/docs
- Check their API documentation: https://semaphore.co/docs

For system integration issues:
- Check `storage/logs/laravel.log`
- Review the SmsService implementation in `app/Services/SmsService.php`

## Additional Resources

- [Semaphore Documentation](https://semaphore.co/docs)
- [API Reference](https://semaphore.co/docs/api)
- [Dashboard](https://semaphore.co/dashboard)
- [Support](https://semaphore.co/support)
