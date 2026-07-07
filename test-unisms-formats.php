<?php
/**
 * Test different UniSMS API formats
 * Based on common SMS API patterns
 */

require __DIR__.'/vendor/autoload.php';
use GuzzleHttp\Client;

$apiKey = 'sk_e37d81e4-022c-4685-b578-367568043ec8';
$phone = '09707112132';
$sender = 'UNISOFT';
$message = 'Test message';

$formats = [
    'Format 1: Standard UniSMS' => [
        'endpoint' => 'https://api.unisms.com/v1/sms/send',
        'method' => 'POST',
        'headers' => [
            'Authorization' => 'Bearer ' . $apiKey,
            'Content-Type' => 'application/json',
            'Accept' => 'application/json',
        ],
        'json' => [
            'to' => $phone,
            'from' => $sender,
            'message' => $message,
        ]
    ],
    'Format 2: Alternative field names' => [
        'endpoint' => 'https://api.unisms.com/v1/sms/send',
        'method' => 'POST',
        'headers' => [
            'Authorization' => 'Bearer ' . $apiKey,
            'Content-Type' => 'application/json',
        ],
        'json' => [
            'recipient' => $phone,
            'sender_id' => $sender,
            'text' => $message,
        ]
    ],
    'Format 3: With additional params' => [
        'endpoint' => 'https://api.unisms.com/v1/sms/send',
        'method' => 'POST',
        'headers' => [
            'Authorization' => 'Bearer ' . $apiKey,
            'Content-Type' => 'application/json',
        ],
        'json' => [
            'to' => $phone,
            'from' => $sender,
            'message' => $message,
            'type' => 'plain',
        ]
    ],
];

$client = new Client([
    'verify' => false,
    'timeout' => 10,
    'http_errors' => false, // Don't throw on 4xx/5xx
]);

foreach ($formats as $name => $config) {
    echo "\n" . str_repeat('=', 50) . "\n";
    echo $name . "\n";
    echo str_repeat('=', 50) . "\n";
    
    try {
        $response = $client->request(
            $config['method'],
            $config['endpoint'],
            [
                'headers' => $config['headers'],
                'json' => $config['json'],
            ]
        );
        
        $statusCode = $response->getStatusCode();
        $body = $response->getBody()->getContents();
        
        echo "✅ Request completed\n";
        echo "Status Code: {$statusCode}\n";
        echo "Response: {$body}\n";
        
        if ($statusCode >= 200 && $statusCode < 300) {
            echo "\n🎉 THIS FORMAT WORKS!\n";
            break;
        }
        
    } catch (\Exception $e) {
        echo "❌ Failed: " . $e->getMessage() . "\n";
    }
}

echo "\n" . str_repeat('=', 50) . "\n";
echo "Testing Complete\n";
echo str_repeat('=', 50) . "\n";
