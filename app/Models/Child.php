<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class Child extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'maternal_record_id',
        'family_serial',
        'last_name',
        'first_name',
        'middle_initial',
        'sex',
        'date_of_birth',
        'address',
    ];

    protected $casts = [
        'date_of_birth' => 'date',
    ];

    public function maternalRecord()
    {
        return $this->belongsTo(MaternalRecord::class);
    }

    public function getFullNameAttribute()
    {
        return trim("{$this->first_name} {$this->middle_initial} {$this->last_name}");
    }
    public function childImmunizationRecord()
    {
        return $this->hasOne(ChildImmunization::class);
    }
}
