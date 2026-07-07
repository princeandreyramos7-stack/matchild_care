<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Services\SmsService;

class TestSMS extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'sms:test {phone?} {--message=}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Test SMS sending functionality';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('===========================================');
        $this->info('        SMS Testing Tool - UniSMS         ');
        $this->info('===========================================');
        $this->newLine();

        // Check if SMS is enabled
        if (!config('services.sms.enabled')) {
            $this->error('❌ SMS is currently disabled in .env file');
            $this->info('To enable SMS, set SMS_ENABLED=true in your .env file');
            return Command::FAILURE;
        }

        // Display current configuration
        $this->info('📋 Current SMS Configuration:');
        $this->line('   Provider: ' . config('services.sms.provider'));
        $this->line('   Endpoint: ' . config('services.sms.endpoint'));
        $this->line('   Sender: ' . config('services.sms.sender_name'));
        $this->line('   API Key: ' . substr(config('services.sms.api_key'), 0, 10) . '...');
        $this->newLine();

        // Get phone number
        $phone = $this->argument('phone');
        if (!$phone) {
            $phone = $this->ask('Enter phone number to test (e.g., 09123456789)');
        }

        // Validate phone number format
        if (!preg_match('/^(09|\+639)[0-9]{9}$/', $phone)) {
            $this->error('❌ Invalid phone number format');
            $this->info('Valid formats: 09123456789 or +639123456789');
            return Command::FAILURE;
        }

        // Get message
        $message = $this->option('message');
        if (!$message) {
            $message = $this->ask('Enter test message', 'Test message from Maternal Care System');
        }

        // Confirm before sending
        $this->newLine();
        $this->warn('⚠️  You are about to send an SMS:');
        $this->line('   To: ' . $phone);
        $this->line('   Message: ' . $message);
        $this->newLine();

        if (!$this->confirm('Do you want to proceed?', true)) {
            $this->info('Test cancelled.');
            return Command::SUCCESS;
        }

        // Send SMS
        $this->info('📤 Sending SMS...');
        $this->newLine();

        try {
            $smsService = new SmsService();
            $result = $smsService->send($phone, $message);

            if ($result) {
                $this->info('✅ SMS sent successfully!');
                $this->newLine();
                $this->info('📝 Next Steps:');
                $this->line('   1. Check your phone for the message');
                $this->line('   2. Check logs: storage/logs/laravel.log');
                $this->line('   3. Verify UniSMS dashboard for delivery status');
            } else {
                $this->error('❌ SMS sending failed');
                $this->info('Check storage/logs/laravel.log for error details');
            }

        } catch (\Exception $e) {
            $this->error('❌ Error: ' . $e->getMessage());
            $this->newLine();
            $this->info('💡 Troubleshooting:');
            $this->line('   1. Check your API key in .env');
            $this->line('   2. Verify UniSMS account has credits');
            $this->line('   3. Check internet connectivity');
            $this->line('   4. Review logs: storage/logs/laravel.log');
            return Command::FAILURE;
        }

        $this->newLine();
        $this->info('===========================================');
        return Command::SUCCESS;
    }
}
