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
        
        // Password is the first letter of the last name (lowercase)
        $defaultPassword = strtolower(substr($maternalRecord->last_name, 0, 1));
        
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
        return strtolower(substr($maternalRecord->last_name, 0, 1));
    }
}
