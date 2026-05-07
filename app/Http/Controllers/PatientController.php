<?php

namespace App\Http\Controllers;

use App\Models\MaternalRecord;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PatientController extends Controller
{
    public function dashboard()
    {
        $user = auth()->user();
        
        if ($user->role !== 'patient') {
            abort(403, 'Unauthorized access.');
        }
        
        $maternalRecord = MaternalRecord::where('user_id', $user->id)
            ->with([
                'prenatalVisits',
                'immunizationRecord',
                'nutritionalAssessment',
            ])
            ->first();

        return Inertia::render('Patient/Dashboard', [
            'maternalRecord' => $maternalRecord,
        ]);
    }

    public function records()
    {
        $user = auth()->user();
        
        if ($user->role !== 'patient') {
            abort(403, 'Unauthorized access.');
        }
        
        $maternalRecord = MaternalRecord::where('user_id', $user->id)
            ->with([
                'prenatalVisits',
                'immunizationRecord',
                'nutritionalAssessment',
                'laboratoryScreening',
                'prenatalSupplementations',
                'micronutrientSupplementations',
                'highRiskSupplementations',
                'pregnancyOutcome',
                'deliveryInformation',
                'postnatalCare',
            ])
            ->first();

        return Inertia::render('Patient/Records', [
            'maternalRecord' => $maternalRecord,
        ]);
    }

    public function notifications()
    {
        $user = auth()->user();
        
        if ($user->role !== 'patient') {
            abort(403, 'Unauthorized access.');
        }
        
        $maternalRecord = MaternalRecord::where('user_id', $user->id)
            ->with([
                'prenatalVisits',
                'immunizationRecord',
            ])
            ->first();

        return Inertia::render('Patient/Notifications', [
            'maternalRecord' => $maternalRecord,
        ]);
    }
}
