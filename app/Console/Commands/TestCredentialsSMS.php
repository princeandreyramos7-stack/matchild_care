<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Services\SmsService;

class TestCredentialsSMS extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'sms:test-credentials {phone?}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Test sending login credentials via SMS';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('===========================================');
        $this->info('   Test Login Credentials SMS');
        $this->info('===========================================');
        $this->newLine();

        // Check if SMS credentials sending is enabled
        if (!config('services.sms.send_credentials')) {
            $this->error('❌ SMS credentials sending is currently disabled');
            $this->info('To enable, set SMS_SEND_CREDENTIALS=true in your .env file');
            return Command::FAILURE;
        }

        // Get phone number
        $phone = $this->argument('phone');
        if (!$phone) {
            $phone = $this->ask('Enter phone number to test (e.g., 09123456789)');
        }

        // Validate phone number
        if (!preg_match('/^(09|\+639)[0-9]{9}$/', $phone)) {
            $this->error('❌ Invalid phone number format');
            $this->info('Valid formats: 09123456789 or +639123456789');
            return Command::FAILURE;
        }

        // Sample data
        $patientName = $this->ask('Patient name', 'Maria Santos');
        $username = $this->ask('Username', 'FS-2026-0001');
        $password = $this->ask('Password', 'FS-2026-0001S');

        // Confirm
        $this->newLine();
        $this->warn('⚠️  You are about to send login credentials:');
        $this->line('   To: ' . $phone);
        $this->line('   Patient: ' . $patientName);
        $this->line('   Username: ' . $username);
        $this->line('   Password: ' . $password);
        $this->newLine();

        if (!$this->confirm('Do you want to proceed?', true)) {
            $this->info('Test cancelled.');
            return Command::SUCCESS;
        }

        // Send SMS
        $this->info('📤 Sending credentials SMS...');
        $this->newLine();

        try {
            $smsService = new SmsService();
            $result = $smsService->sendCredentials($phone, [
                'patient_name' => $patientName,
                'username' => $username,
                'password' => $password,
                'login_url' => config('app.url') . '/login',
            ]);

            if ($result) {
                $this->info('✅ Credentials SMS sent successfully!');
                $this->newLine();
                $this->info('📱 Check your phone at: ' . $phone);
                $this->newLine();
                $this->info('Expected message:');
                $this->line('   "ACCOUNT CREATED: Hi ' . $patientName . '! Your login:');
                $this->line('   Username: ' . $username . ', Password: ' . $password . '.');
                $this->line('   Login at: ' . config('app.url') . '/login - ' . config('services.sms.sender_name') . '"');
            } else {
                $this->error('❌ SMS sending failed');
                $this->info('This could be because SMS_SEND_CREDENTIALS is disabled');
                $this->info('Check storage/logs/laravel.log for details');
            }

        } catch (\Exception $e) {
            $this->error('❌ Error: ' . $e->getMessage());
            $this->newLine();
            $this->info('💡 Troubleshooting:');
            $this->line('   1. Check .env: SMS_SEND_CREDENTIALS=true');
            $this->line('   2. Check .env: SMS_ENABLED=true');
            $this->line('   3. Verify API key and sender name');
            $this->line('   4. Check logs: storage/logs/laravel.log');
            return Command::FAILURE;
        }

        $this->newLine();
        $this->info('===========================================');
        return Command::SUCCESS;
    }
}
