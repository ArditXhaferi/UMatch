<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Programme extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'faculty_id',
        'name',
        'slug',
        'tuition',
        'ects',
        'duration',
        'scholarship_available',
        'open_for_application',
        'deadline',
        'description',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'id' => 'integer',
            'faculty_id' => 'integer',
            'scholarship_available' => 'boolean',
            'open_for_application' => 'boolean',
            'deadline' => 'date',
        ];
    }

    public function faculty(): BelongsTo
    {
        return $this->belongsTo(Faculty::class);
    }

    public function courses(): HasMany
    {
        return $this->hasMany(Course::class);
    }

    public function scholarships(): HasMany
    {
        return $this->hasMany(Scholarship::class);
    }

    public function applications(): HasMany
    {
        return $this->hasMany(Application::class);
    }

    public function studentProfiles(): BelongsToMany
    {
        return $this->belongsToMany(StudentProfile::class)
            ->using(Bookmark::class)
            ->as('bookmark')
            ->withPivot('id', 'student_profile_id', 'programme_id')
            ->withTimestamps();
    }
}
