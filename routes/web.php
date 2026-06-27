<?php

use App\Http\Controllers\ChildImmunizationController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\MaternalCareController;
use App\Http\Controllers\PatientController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    // Check user role and redirect accordingly
    if (auth()->user()->role === 'patient') {
        return redirect()->route('patient.dashboard');
    }

    // Optimize queries with select() to fetch only needed columns
    $stats = [
        'total_records' => \App\Models\MaternalRecord::count(),
        'active_pregnancies' => \App\Models\MaternalRecord::whereNull('deleted_at')
            ->whereDoesntHave('pregnancyOutcome')
            ->count(),
        'completed_4pnc' => \App\Models\PostnatalCare::where('completed_4pnc', true)->count(),
        'pending_visits' => \App\Models\MaternalRecord::whereNull('deleted_at')
            ->whereHas('prenatalVisits', function($query) {
                $query->whereNull('visit_date');
            })
            ->count(),
        // Optimize: Only select needed columns for recent registrations
        'recent_registrations' => \App\Models\MaternalRecord::select([
                'id', 'first_name', 'last_name', 'date_of_registration', 'age', 'age_group'
            ])
            ->orderBy('date_of_registration', 'desc')
            ->take(5)
            ->get(),
        'this_month' => \App\Models\MaternalRecord::whereMonth('date_of_registration', now()->month)
            ->whereYear('date_of_registration', now()->year)
            ->count(),
    ];

    // Optimize: Only select needed columns for records table and paginate
    $records = \App\Models\MaternalRecord::select([
            'id', 'family_serial', 'first_name', 'last_name', 'middle_initial',
            'age', 'age_group', 'date_of_registration', 'expected_date_of_delivery'
        ])
        ->orderBy('id', 'desc')  // Order by ID descending (latest first)
        ->paginate(15);

    return Inertia::render('Dashboard', [
        'stats' => $stats,
        'records' => $records
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Patient Routes
    Route::prefix('patient')->name('patient.')->group(function () {
        Route::get('/dashboard', [PatientController::class, 'dashboard'])->name('dashboard');
        Route::get('/my-records', [PatientController::class, 'myRecords'])->name('my-records');
        Route::get('/notifications', [PatientController::class, 'notifications'])->name('notifications');
    });

    // Parent Services Routes
    Route::prefix('parent')->name('parent.')->group(function () {
        Route::get('/maternal-care', [MaternalCareController::class, 'index'])->name('maternal-care');
        Route::post('/maternal-care', [MaternalCareController::class, 'store'])->name('maternal-care.store');
        Route::get('/maternal-care/{id}/edit', [MaternalCareController::class, 'edit'])->name('maternal-care.edit');
        Route::put('/maternal-care/{id}', [MaternalCareController::class, 'update'])->name('maternal-care.update');
        // Bulk PDF route
        Route::get('/maternal-care/bulk-pdf', [MaternalCareController::class, 'generateBulkPdf'])->name('maternal-care.bulk-pdf');
    });
    Route::prefix('child')->name('child.')->group(function () {
        // Child Immunization Routes
        Route::get('/immunization/bulk-pdf', [ChildImmunizationController::class, 'generateBulkPdf'])->name('immunization.bulk-pdf');
        Route::resource('/immunization', ChildImmunizationController::class);
    });

});

// SMS Test Route (Remove in production)
Route::get('/test-sms', function () {
    try {
        $sms = new \App\Services\SmsService();
        
        // Replace with your actual phone number for testing
        $testNumber = '09707112132'; // CHANGE THIS TO YOUR NUMBER
        $result = $sms->send($testNumber, 'Test message from Maternal Care System! This is working! 📱');
        
        if ($result) {
            return response()->json([
                'success' => true,
                'message' => 'SMS sent successfully! Check your phone at ' . $testNumber,
                'logs' => 'Check storage/logs/laravel.log for details'
            ]);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'SMS sending failed. Check storage/logs/laravel.log for errors',
                'enabled' => config('services.sms.enabled'),
                'api_configured' => !empty(config('services.sms.api_key'))
            ]);
        }
    } catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'message' => 'Error: ' . $e->getMessage(),
            'trace' => $e->getTraceAsString()
        ], 500);
    }
})->middleware('auth')->name('test.sms');

// SMS Test - Appointment Reminder
Route::get('/test-appointment-sms', function () {
    try {
        $sms = new \App\Services\SmsService();
        
        $testNumber = '09123456789'; // CHANGE THIS TO YOUR NUMBER
        $result = $sms->sendAppointmentReminder($testNumber, [
            'patient_name' => 'Test Patient',
            'appointment_date' => 'June 15, 2026',
            'appointment_time' => '9:00 AM',
        ]);
        
        return response()->json([
            'success' => $result,
            'message' => $result ? 'Appointment SMS sent!' : 'SMS failed',
        ]);
    } catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'error' => $e->getMessage()
        ], 500);
    }
})->middleware('auth')->name('test.appointment-sms');

require __DIR__.'/auth.php';

// Patient Routes
Route::middleware('auth')->prefix('patient')->name('patient.')->group(function () {
    Route::get('/dashboard', [PatientController::class, 'dashboard'])->name('dashboard');
    Route::get('/records', [PatientController::class, 'records'])->name('records');
    Route::get('/notifications', [PatientController::class, 'notifications'])->name('notifications');
});
