<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Child;
use App\Models\MaternalRecord;
use App\Models\ChildImmunization;
use Illuminate\Support\Str;

class ChildImmunizationSeeder extends Seeder
{
    public function run(): void
    {
        $maternalRecords = MaternalRecord::all();

        if ($maternalRecords->isEmpty()) {
            $this->command->warn('No maternal records found. Seed those first.');
            return;
        }

        foreach ($maternalRecords as $maternal) {
            // Create 1–3 children per mother
            $childCount = rand(1, 3);

            for ($i = 1; $i <= $childCount; $i++) {
                $child = Child::create([
                    'maternal_record_id' => $maternal->id,
                    'family_serial' => $maternal->family_serial,
                    'last_name' => $maternal->last_name,
                    'first_name' => fake()->firstName(),
                    'middle_initial' => strtoupper(Str::random(1)),
                    'sex' => fake()->randomElement(['M', 'F']),
                    'date_of_birth' => now()->subMonths(rand(1, 24)),
                    'address' => $maternal->address,
                ]);

                // Create immunization record
                ChildImmunization::create([
                    'child_id' => $child->id,

                    'bcg' => fake()->boolean(80) ? now()->subMonths(rand(1, 24)) : null,
                    'hepatitis_b' => fake()->boolean(80) ? now()->subMonths(rand(1, 24)) : null,

                    'pentavalent_1' => fake()->boolean(80) ? now()->subMonths(rand(1, 20)) : null,
                    'pentavalent_2' => fake()->boolean(70) ? now()->subMonths(rand(1, 18)) : null,
                    'pentavalent_3' => fake()->boolean(60) ? now()->subMonths(rand(1, 16)) : null,

                    'opv_1' => fake()->boolean(80) ? now()->subMonths(rand(1, 20)) : null,
                    'opv_2' => fake()->boolean(70) ? now()->subMonths(rand(1, 18)) : null,
                    'opv_3' => fake()->boolean(60) ? now()->subMonths(rand(1, 16)) : null,

                    'ipv_1' => fake()->boolean(70) ? now()->subMonths(rand(1, 15)) : null,
                    'ipv_2' => fake()->boolean(50) ? now()->subMonths(rand(1, 12)) : null,

                    'pcv_1' => fake()->boolean(80) ? now()->subMonths(rand(1, 20)) : null,
                    'pcv_2' => fake()->boolean(70) ? now()->subMonths(rand(1, 18)) : null,
                    'pcv_3' => fake()->boolean(60) ? now()->subMonths(rand(1, 16)) : null,

                    'mmr_1' => fake()->boolean(70) ? now()->subMonths(rand(1, 12)) : null,
                    'mmr_2' => fake()->boolean(40) ? now()->subMonths(rand(1, 6)) : null,

                    'fully_immunized_child' => fake()->randomElement(['Y', 'N']),
                ]);
            }
        }
    }
}
