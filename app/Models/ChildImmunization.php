<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ChildImmunization extends Model
{
        protected $fillable = [
        'child_id',
        'bcg',
        'hepatitis_b',
        'pentavalent_1',
        'pentavalent_2',
        'pentavalent_3',
        'opv_1',
        'opv_2',
        'opv_3',
        'ipv_1',
        'ipv_2',
        'pcv_1',
        'pcv_2',
        'pcv_3',
        'mmr_1',
        'mmr_2',
        'fully_immunized_child',
    ];

    protected $casts = [
        'bcg' => 'date',
        'hepatitis_b' => 'date',
        'pentavalent_1' => 'date',
        'pentavalent_2' => 'date',
        'pentavalent_3' => 'date',
        'opv_1' => 'date',
        'opv_2' => 'date',
        'opv_3' => 'date',
        'ipv_1' => 'date',
        'ipv_2' => 'date',
        'pcv_1' => 'date',
        'pcv_2' => 'date',
        'pcv_3' => 'date',
        'mmr_1' => 'date',
        'mmr_2' => 'date',
    ];

    /**
     * Get the maternal record that owns the immunization record.
     */
    public function child()
    {
        return $this->belongsTo(Child::class);
    }
}
