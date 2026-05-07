<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\MaternalRecord;
use App\Models\PrenatalVisit;
use App\Models\NutritionalAssessment;
use App\Models\ImmunizationRecord;
use Illuminate\Database\Seeder;

class PatientSeeder extends Seeder
{
    public function run(): void
    {
        // Create patient user
        $patient = User::create([
            'name' => 'Maria Santos',
            'email' => 'patient@maternal.com',
            'password' => bcrypt('password'),
            'role' => 'patient',
        ]);

        // Create maternal record
        $maternalRecord = MaternalRecord::create([
            'user_id' => $patient->id,
            'date_of_registration' => now()->subMonths(3),
            'family_serial' => 'FAM-001',
            'last_name' => 'Santos',
            'first_name' => 'Maria',
            'middle_initial' => 'D',
            'address' => '123 Main Street, Barangay Centro, City',
            'age' => 28,
            'age_group' => '20-49',
            'last_menstrual_period' => now()->subMonths(5),
            'gravida' => 2,
            'parity' => 1,
            'expected_date_of_delivery' => now()->addMonths(4)->format('Y-m-d'),
        ]);

        // Create prenatal visits
        PrenatalVisit::create([
            'maternal_record_id' => $maternalRecord->id,
            'visit_number' => 1,
            'visit_date' => now()->subMonths(3),
        ]);

        PrenatalVisit::create([
            'maternal_record_id' => $maternalRecord->id,
            'visit_number' => 2,
            'visit_date' => now()->subMonths(2),
        ]);

        PrenatalVisit::create([
            'maternal_record_id' => $maternalRecord->id,
            'visit_number' => 3,
            'visit_date' => now()->subMonth(),
        ]);

        PrenatalVisit::create([
            'maternal_record_id' => $maternalRecord->id,
            'visit_number' => 4,
            'visit_date' => null, // Upcoming visit
        ]);

        // Create nutritional assessment
        NutritionalAssessment::create([
            'maternal_record_id' => $maternalRecord->id,
            'height' => 160,
            'weight' => 65,
            'bmi' => 25.4,
            'nutritional_status' => 'Normal',
        ]);

        // Create immunization record
        ImmunizationRecord::create([
            'maternal_record_id' => $maternalRecord->id,
        ]);

        $this->command->info('Patient account created successfully!');
        $this->command->info('Email: patient@maternal.com');
        $this->command->info('Password: password');
        $this->command->info('Name: Maria Santos');
    }
}
