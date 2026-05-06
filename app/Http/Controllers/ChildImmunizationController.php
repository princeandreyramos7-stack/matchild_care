<?php

namespace App\Http\Controllers;

use App\Models\Child;
use App\Models\MaternalRecord;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Barryvdh\DomPDF\Facade\Pdf;


class ChildImmunizationController extends Controller
{
    /**
     * Display a listing of the resource.
     * Optimized: Only select needed columns and use eager loading
     */
    public function index()
    {
        $records = Child::select([
                'id', 'maternal_record_id', 'family_serial', 'first_name', 'last_name', 
                'sex', 'date_of_birth', 'address'
            ])
            ->with([
                'maternalRecord:id,first_name,last_name,middle_initial,family_serial,address',
                'childImmunizationRecord:id,child_id,fully_immunized_child',
            ])
            ->latest()
            ->get()
            ->map(function ($child) {
                $immunization = $child->childImmunizationRecord;

                return [
                    'id' => $child->id,

                    // Child info
                    'child_name' => trim("{$child->last_name}, {$child->first_name}"),
                    'sex' => $child->sex,
                    'date_of_birth' => optional($child->date_of_birth)->format('Y-m-d'),

                    // Mother info
                    'mother_name' => $child->maternalRecord?->full_name,
                    'family_serial' => $child->family_serial ?: $child->maternalRecord?->family_serial,
                    'address' => $child->address ?: $child->maternalRecord?->address,

                    // Immunization status
                    'fully_immunized' => $immunization?->fully_immunized_child ?? 'N',

                    // Optional: simple progress indicator
                    'has_record' => $immunization ? true : false,
                ];
            });

        return Inertia::render('Child/Index', [
            'records' => $records,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $records = MaternalRecord::query()
            ->orderBy('last_name')
            ->get()
            ->map(fn ($record) => [
                'id' => $record->id,
                'date_of_registration' => optional($record->date_of_registration)->format('Y-m-d'),
                'family_serial' => $record->family_serial,
                'mother_name' => $record->full_name,
                'address' => $record->address,
                'label' => "{$record->family_serial} - {$record->full_name}",
            ]);

        $children = Child::with([
                'maternalRecord',
                'childImmunizationRecord',
            ])
            ->orderBy('last_name')
            ->get()
            ->map(function ($child) {
                $immunization = $child->childImmunizationRecord;

                return [
                    'id' => $child->id,
                    'maternal_record_id' => $child->maternal_record_id,
                    'last_name' => $child->last_name,
                    'first_name' => $child->first_name,
                    'middle_initial' => $child->middle_initial,
                    'sex' => $child->sex,
                    'date_of_birth' => optional($child->date_of_birth)->format('Y-m-d'),

                    'date_of_registration' => optional($child->maternalRecord?->date_of_registration)->format('Y-m-d'),
                    'family_serial' => $child->family_serial ?: $child->maternalRecord?->family_serial,
                    'mother_name' => $child->maternalRecord?->full_name,
                    'address' => $child->address ?: $child->maternalRecord?->address,

                    'label' => "{$child->last_name}, {$child->first_name} - {$child->maternalRecord?->full_name}",

                    'immunization' => [
                        'bcg' => optional($immunization?->bcg)->format('Y-m-d'),
                        'hepatitis_b' => optional($immunization?->hepatitis_b)->format('Y-m-d'),

                        'pentavalent_1' => optional($immunization?->pentavalent_1)->format('Y-m-d'),
                        'pentavalent_2' => optional($immunization?->pentavalent_2)->format('Y-m-d'),
                        'pentavalent_3' => optional($immunization?->pentavalent_3)->format('Y-m-d'),

                        'opv_1' => optional($immunization?->opv_1)->format('Y-m-d'),
                        'opv_2' => optional($immunization?->opv_2)->format('Y-m-d'),
                        'opv_3' => optional($immunization?->opv_3)->format('Y-m-d'),

                        'ipv_1' => optional($immunization?->ipv_1)->format('Y-m-d'),
                        'ipv_2' => optional($immunization?->ipv_2)->format('Y-m-d'),

                        'pcv_1' => optional($immunization?->pcv_1)->format('Y-m-d'),
                        'pcv_2' => optional($immunization?->pcv_2)->format('Y-m-d'),
                        'pcv_3' => optional($immunization?->pcv_3)->format('Y-m-d'),

                        'mmr_1' => optional($immunization?->mmr_1)->format('Y-m-d'),
                        'mmr_2' => optional($immunization?->mmr_2)->format('Y-m-d'),

                        'fully_immunized_child' => $immunization?->fully_immunized_child ?? '',
                    ],
                ];
            });

        return Inertia::render('Child/Create', [
            'records' => $records,
            'children' => $children,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'mode' => ['required', 'in:existing,new'],

            'child_id' => ['nullable', 'required_if:mode,existing', 'exists:children,id'],
            'maternal_record_id' => ['nullable', 'required_if:mode,new', 'exists:maternal_records,id'],

            'child_last_name' => ['nullable', 'required_if:mode,new', 'string', 'max:100'],
            'child_first_name' => ['nullable', 'required_if:mode,new', 'string', 'max:100'],
            'child_middle_initial' => ['nullable', 'string', 'max:2'],
            'child_sex' => ['nullable', 'required_if:mode,new', 'in:M,F'],
            'child_date_of_birth' => ['nullable', 'required_if:mode,new', 'date'],

            'immunization' => ['nullable', 'array'],
            'immunization.bcg' => ['nullable', 'date'],
            'immunization.hepatitis_b' => ['nullable', 'date'],
            'immunization.pentavalent_1' => ['nullable', 'date'],
            'immunization.pentavalent_2' => ['nullable', 'date'],
            'immunization.pentavalent_3' => ['nullable', 'date'],
            'immunization.opv_1' => ['nullable', 'date'],
            'immunization.opv_2' => ['nullable', 'date'],
            'immunization.opv_3' => ['nullable', 'date'],
            'immunization.ipv_1' => ['nullable', 'date'],
            'immunization.ipv_2' => ['nullable', 'date'],
            'immunization.pcv_1' => ['nullable', 'date'],
            'immunization.pcv_2' => ['nullable', 'date'],
            'immunization.pcv_3' => ['nullable', 'date'],
            'immunization.mmr_1' => ['nullable', 'date'],
            'immunization.mmr_2' => ['nullable', 'date'],
            'immunization.fully_immunized_child' => ['nullable', 'in:Y,N'],
        ]);

        try {
            DB::transaction(function () use ($validated) {
                if ($validated['mode'] === 'existing') {
                    $child = Child::findOrFail($validated['child_id']);
                } else {
                    $maternal = MaternalRecord::findOrFail($validated['maternal_record_id']);

                    $child = Child::create([
                        'maternal_record_id' => $maternal->id,
                        'family_serial' => $maternal->family_serial,
                        'last_name' => $validated['child_last_name'],
                        'first_name' => $validated['child_first_name'],
                        'middle_initial' => $validated['child_middle_initial'] ?? null,
                        'sex' => $validated['child_sex'],
                        'date_of_birth' => $validated['child_date_of_birth'],
                        'address' => $maternal->address,
                    ]);
                }

                $child->childImmunizationRecord()->updateOrCreate(
                    ['child_id' => $child->id],
                    $validated['immunization'] ?? []
                );
            });

            return back()->with([
                'success' => 'Child immunization record saved successfully.',
                'toast_key' => uniqid(),
            ]);
        } catch (\Throwable $e) {
            Log::error('Child Immunization Store Error: ' . $e->getMessage());

            return back()->with([
                'error' => 'Something went wrong while saving the child immunization record.',
                'toast_key' => uniqid(),
            ]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    /**
     * Generate bulk PDF for all child immunization records
     */
    public function generateBulkPdf()
    {
        try {
            $records = Child::with([
                'maternalRecord',
                'maternalRecord.immunizationRecord',
                'childImmunizationRecord'
            ])
            ->orderBy('date_of_birth', 'desc')
            ->get();

            $pdf = Pdf::loadView('pdf.child-immunization-bulk', compact('records'))
                ->setPaper('legal', 'landscape')
                ->setOptions([
                    'isHtml5ParserEnabled' => true,
                    'isRemoteEnabled' => true,
                    'defaultFont' => 'sans-serif'
                ]);

            $filename = 'Child_Immunization_Target_List_' . date('Y-m-d') . '.pdf';
            return $pdf->download($filename);

        } catch (\Exception $e) {
            Log::error('Failed to generate child immunization bulk PDF', [
                'error' => $e->getMessage(),
                'line' => $e->getLine(),
                'file' => $e->getFile(),
                'trace' => $e->getTraceAsString()
            ]);

            // Return JSON error for debugging
            return response()->json([
                'error' => 'Failed to generate PDF',
                'message' => $e->getMessage(),
                'line' => $e->getLine(),
                'file' => basename($e->getFile())
            ], 500);
        }
    }
}
