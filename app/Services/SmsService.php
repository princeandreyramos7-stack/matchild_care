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
        
        // Create Guzzle client - SSL verification disabled for Windows compatibility
        $this->client = new Client([
            'verify' => false,  // Disable SSL verification
            'timeout' => 30,
            'connect_timeout' => 10,
        ]);
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
        
        // Validate phone number
        if (!$this->isValidPhoneNumber($phoneNumber)) {
            Log::warning('Invalid phone number format', ['phone' => $phoneNumber]);
            return false;
        }
        
        try {
            $provider = config('services.sms.provider', 'unisms');
            
            if ($provider === 'unisms') {
                return $this->sendViaUniSMS($phoneNumber, $message);
            } elseif ($provider === 'semaphore') {
                return $this->sendViaSemaphore($phoneNumber, $message);
            } else {
                return $this->sendViaPhilSMS($phoneNumber, $message);
            }
        } catch (\Exception $e) {
            Log::error('SMS sending failed', [
                'phone' => $phoneNumber,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            
            return false;
        }
    }
    
    /**
     * Send SMS via UniSMS API
     */
    protected function sendViaUniSMS(string $phoneNumber, string $message): bool
    {
        $response = $this->client->post($this->endpoint, [
            'headers' => [
                'Authorization' => 'Bearer ' . $this->apiKey,
                'Accept' => 'application/json',
                'Content-Type' => 'application/json',
            ],
            'json' => [
                'to' => $phoneNumber,
                'from' => $this->senderName,
                'message' => $message,
            ]
        ]);
        
        $result = json_decode($response->getBody(), true);
        
        Log::info('SMS sent successfully via UniSMS', [
            'phone' => $phoneNumber,
            'response' => $result
        ]);
        
        return true;
    }
    
    /**
     * Send SMS via Semaphore API
     */
    protected function sendViaSemaphore(string $phoneNumber, string $message): bool
    {
        $response = $this->client->post($this->endpoint, [
            'headers' => [
                'Accept' => 'application/json',
                'Content-Type' => 'application/x-www-form-urlencoded',
            ],
            'form_params' => [
                'apikey' => $this->apiKey,
                'number' => $phoneNumber,
                'message' => $message,
                'sendername' => $this->senderName,
            ]
        ]);
        
        $result = json_decode($response->getBody(), true);
        
        Log::info('SMS sent successfully via Semaphore', [
            'phone' => $phoneNumber,
            'response' => $result
        ]);
        
        return true;
    }
    
    /**
     * Send SMS via PhilSMS API
     */
    protected function sendViaPhilSMS(string $phoneNumber, string $message): bool
    {
        $response = $this->client->post($this->endpoint, [
            'headers' => [
                'Authorization' => 'Bearer ' . $this->apiKey,
                'Accept' => 'application/json',
                'Content-Type' => 'application/json',
            ],
            'json' => [
                'recipient' => $phoneNumber,
                'sender_id' => $this->senderName,
                'type' => 'plain',
                'message' => $message,
            ]
        ]);
        
        $result = json_decode($response->getBody(), true);
        
        Log::info('SMS sent successfully via PhilSMS', [
            'phone' => $phoneNumber,
            'response' => $result
        ]);
        
        return true;
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
