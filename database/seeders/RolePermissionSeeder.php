<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class RolePermissionSeeder extends Seeder
{
    public function run(): void
    {
        // Create default users
        $admin = User::create([
            'name' => 'Admin User',
            'email' => 'admin@maternal.com',
            'password' => bcrypt('password'),
            'role' => 'admin',
        ]);

        $healthWorker = User::create([
            'name' => 'Health Worker',
            'email' => 'worker@maternal.com',
            'password' => bcrypt('password'),
            'role' => 'health_worker',
        ]);
    }
}
