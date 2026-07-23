<?php

namespace App\Services;

use App\Models\User;
use App\Models\MaternalRecord;
use Illuminate\Support\Facades\Hash;

class PatientAccountService
{
    /**
     * Create a patient user account from maternal record
     */
    public static function createPatientAccount(MaternalRecord $maternalRecord): User
    {
        // Username is the Family Serial Number
        $username = $maternalRecord->family_serial;
        
        // Password is Family Serial Number + first letter of last name (uppercase)
        // Example: FAM-001B (for Brown family)
        $firstLetterSurname = strtoupper(substr($maternalRecord->last_name, 0, 1));
        $defaultPassword = $maternalRecord->family_serial . $firstLetterSurname;
        
        // Email is family_serial@maternal.local (for system purposes)
        $email = strtolower($maternalRecord->family_serial) . '@maternal.local';
        
        // Full name
        $fullName = trim($maternalRecord->first_name . ' ' . $maternalRecord->middle_initial . '. ' . $maternalRecord->last_name);
        
        // Check if user already exists
        $user = User::where('username', $username)->first();
        
        if ($user) {
            // Update existing user
            $user->update([
                'name' => $fullName,
                'email' => $email,
            ]);
        } else {
            // Create new user
            $user = User::create([
                'name' => $fullName,
                'email' => $email,
                'username' => $username,
                'password' => Hash::make($defaultPassword),
                'role' => 'patient',
            ]);
            
            // Send SMS with login credentials if phone number available
            if ($maternalRecord->phone_number) {
                try {
                    $smsService = new \App\Services\SmsService();
                    $smsService->sendCredentials($maternalRecord->phone_number, [
                        'patient_name' => $maternalRecord->first_name,
                        'username' => $username,
                        'password' => $defaultPassword,
                        'login_url' => config('app.url') . '/login',
                    ]);
                    
                    \Log::info('SMS credentials sent to new patient', [
                        'family_serial' => $maternalRecord->family_serial,
                        'phone' => $maternalRecord->phone_number,
                        'username' => $username,
                    ]);
                } catch (\Exception $e) {
                    \Log::warning('Failed to send SMS credentials', [
                        'family_serial' => $maternalRecord->family_serial,
                        'phone' => $maternalRecord->phone_number,
                        'error' => $e->getMessage()
                    ]);
                }
            } else {
                \Log::warning('No phone number provided for new patient', [
                    'family_serial' => $maternalRecord->family_serial,
                ]);
            }
        }
        
        // Update maternal record with user_id
        $maternalRecord->update(['user_id' => $user->id]);
        
        return $user;
    }
    
    /**
     * Get default password for a maternal record
     */
    public static function getDefaultPassword(MaternalRecord $maternalRecord): string
    {
        $firstLetterSurname = strtoupper(substr($maternalRecord->last_name, 0, 1));
        return $maternalRecord->family_serial . $firstLetterSurname;
    }
}
