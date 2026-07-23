<?php

namespace App\Http\Controllers;

use App\Services\SmsService;
use App\Models\MaternalRecord;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class SmsTestController extends Controller
{
    protected $smsService;

    public function __construct(SmsService $smsService)
    {
        $this->smsService = $smsService;
    }

    /**
     * Show SMS testing dashboard
     */
    public function index()
    {
        $patients = MaternalRecord::whereNotNull('phone_number')
            ->select('id', 'family_serial', 'first_name', 'last_name', 'phone_number')
            ->orderBy('date_of_registration', 'desc')
            ->limit(10)
            ->get();

        $config = [
            'provider' => config('services.sms.provider'),
            'sender_name' => config('services.sms.sender_name'),
            'enabled' => config('services.sms.enabled'),
            'api_configured' => !empty(config('services.sms.api_key')),
        ];

        return Inertia::render('Admin/SmsTest', [
            'patients' => $patients,
            'config' => $config,
        ]);
    }

    /**
     * Send a basic test SMS
     */
    public function sendBasicTest(Request $request)
    {
        $request->validate([
            'phone_number' => 'required|regex:/^09[0-9]{9}$/',
            'message' => 'required|string|max:160',
        ]);

        try {
            $result = $this->smsService->send(
                $request->phone_number,
                $request->message
            );

            if ($result) {
                return response()->json([
                    'success' => true,
                    'message' => 'SMS sent successfully!',
                    'phone' => $request->phone_number,
                ]);
            } else {
                return response()->json([
                    'success' => false,
                    'message' => 'SMS sending failed. Check logs for details.',
                ], 400);
            }
        } catch (\Exception $e) {
            Log::error('SMS test failed', [
                'error' => $e->getMessage(),
                'phone' => $request->phone_number,
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Error: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Send appointment reminder test
     */
    public function sendAppointmentTest(Request $request)
    {
        $request->validate([
            'phone_number' => 'required|regex:/^09[0-9]{9}$/',
            'patient_name' => 'required|string',
            'appointment_date' => 'required|string',
            'appointment_time' => 'nullable|string',
        ]);

        try {
            $result = $this->smsService->sendAppointmentReminder(
                $request->phone_number,
                [
                    'patient_name' => $request->patient_name,
                    'appointment_date' => $request->appointment_date,
                    'appointment_time' => $request->appointment_time ?? '9:00 AM',
                ]
            );

            if ($result) {
                return response()->json([
                    'success' => true,
                    'message' => 'Appointment reminder sent successfully!',
                ]);
            } else {
                return response()->json([
                    'success' => false,
                    'message' => 'SMS sending failed. Check if appointment reminders are enabled.',
                ], 400);
            }
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Send visit notification test
     */
    public function sendVisitTest(Request $request)
    {
        $request->validate([
            'phone_number' => 'required|regex:/^09[0-9]{9}$/',
            'patient_name' => 'required|string',
            'visit_number' => 'required|integer',
            'next_visit_date' => 'nullable|string',
        ]);

        try {
            $result = $this->smsService->sendVisitNotification(
                $request->phone_number,
                [
                    'patient_name' => $request->patient_name,
                    'visit_number' => $request->visit_number,
                    'next_visit_date' => $request->next_visit_date ?? 'TBA',
                ]
            );

            if ($result) {
                return response()->json([
                    'success' => true,
                    'message' => 'Visit notification sent successfully!',
                ]);
            } else {
                return response()->json([
                    'success' => false,
                    'message' => 'SMS sending failed. Check if visit notifications are enabled.',
                ], 400);
            }
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Send credentials test
     */
    public function sendCredentialsTest(Request $request)
    {
        $request->validate([
            'phone_number' => 'required|regex:/^09[0-9]{9}$/',
            'patient_name' => 'required|string',
            'username' => 'required|string',
            'password' => 'required|string',
        ]);

        try {
            $result = $this->smsService->sendCredentials(
                $request->phone_number,
                [
                    'patient_name' => $request->patient_name,
                    'username' => $request->username,
                    'password' => $request->password,
                    'login_url' => config('app.url') . '/login',
                ]
            );

            if ($result) {
                return response()->json([
                    'success' => true,
                    'message' => 'Credentials SMS sent successfully!',
                ]);
            } else {
                return response()->json([
                    'success' => false,
                    'message' => 'SMS sending failed. Check if credential sending is enabled.',
                ], 400);
            }
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Send notification to a patient from their record
     */
    public function sendToPatient(Request $request)
    {
        $request->validate([
            'maternal_record_id' => 'required|exists:maternal_records,id',
            'notification_type' => 'required|in:appointment,visit,credentials,custom',
            'custom_message' => 'nullable|string|max:160',
        ]);

        try {
            $maternalRecord = MaternalRecord::findOrFail($request->maternal_record_id);

            if (!$maternalRecord->phone_number) {
                return response()->json([
                    'success' => false,
                    'message' => 'This patient has no phone number on record.',
                ], 400);
            }

            $result = false;

            switch ($request->notification_type) {
                case 'appointment':
                    $nextAppointment = now()->addDays(7)->format('F d, Y');
                    $result = $this->smsService->sendAppointmentReminder(
                        $maternalRecord->phone_number,
                        [
                            'patient_name' => $maternalRecord->first_name,
                            'appointment_date' => $nextAppointment,
                            'appointment_time' => '9:00 AM',
                        ]
                    );
                    break;

                case 'visit':
                    $latestVisit = $maternalRecord->prenatalVisits()
                        ->whereNotNull('visit_date')
                        ->orderBy('visit_number', 'desc')
                        ->first();
                    
                    $visitNumber = $latestVisit ? $latestVisit->visit_number : 1;
                    $nextVisitDate = $latestVisit 
                        ? \Carbon\Carbon::parse($latestVisit->visit_date)->addWeeks(4)->format('F d, Y')
                        : now()->addWeeks(4)->format('F d, Y');

                    $result = $this->smsService->sendVisitNotification(
                        $maternalRecord->phone_number,
                        [
                            'patient_name' => $maternalRecord->first_name,
                            'visit_number' => $visitNumber,
                            'next_visit_date' => $nextVisitDate,
                        ]
                    );
                    break;

                case 'credentials':
                    $user = $maternalRecord->user;
                    if (!$user) {
                        return response()->json([
                            'success' => false,
                            'message' => 'No user account found for this patient.',
                        ], 400);
                    }

                    $password = \App\Services\PatientAccountService::getDefaultPassword($maternalRecord);
                    $result = $this->smsService->sendCredentials(
                        $maternalRecord->phone_number,
                        [
                            'patient_name' => $maternalRecord->first_name,
                            'username' => $user->username,
                            'password' => $password,
                            'login_url' => config('app.url') . '/login',
                        ]
                    );
                    break;

                case 'custom':
                    if (!$request->custom_message) {
                        return response()->json([
                            'success' => false,
                            'message' => 'Custom message is required.',
                        ], 400);
                    }
                    $result = $this->smsService->send(
                        $maternalRecord->phone_number,
                        $request->custom_message
                    );
                    break;
            }

            if ($result) {
                Log::info('SMS test notification sent', [
                    'maternal_record_id' => $maternalRecord->id,
                    'type' => $request->notification_type,
                    'phone' => $maternalRecord->phone_number,
                ]);

                return response()->json([
                    'success' => true,
                    'message' => 'SMS sent successfully to ' . $maternalRecord->first_name . '!',
                ]);
            } else {
                return response()->json([
                    'success' => false,
                    'message' => 'SMS sending failed. Check configuration and logs.',
                ], 400);
            }

        } catch (\Exception $e) {
            Log::error('SMS test notification failed', [
                'error' => $e->getMessage(),
                'maternal_record_id' => $request->maternal_record_id,
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Error: ' . $e->getMessage(),
            ], 500);
        }
    }
}
