<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class StudentProfile extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id',
        'date_of_birth',
        'school',
        'hexad_type',
        'archetype_code',
        'xp',
        'credits',
        'consent_at',
        'parent_contact_email',
        'analysis',
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
            'user_id' => 'integer',
            'date_of_birth' => 'date',
            'consent_at' => 'timestamp',
            'analysis' => 'array',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function programmes(): BelongsToMany
    {
        return $this->belongsToMany(Programme::class)
            ->using(Bookmark::class)
            ->as('bookmark')
            ->withPivot('id', 'student_profile_id', 'programme_id')
            ->withTimestamps();
    }

    public function squads(): BelongsToMany
    {
        return $this->belongsToMany(Squad::class)
            ->using(SquadMember::class)
            ->as('squad_member')
            ->withPivot('id', 'squad_id', 'student_profile_id', 'is_leader', 'joined_at')
            ->withTimestamps();
    }

    public function applications(): HasMany
    {
        return $this->hasMany(Application::class);
    }

    public function bookmarks(): HasMany
    {
        return $this->hasMany(Bookmark::class);
    }

    public function studentSkillProgresses(): HasMany
    {
        return $this->hasMany(StudentSkillProgress::class);
    }

    public function questProgresses(): HasMany
    {
        return $this->hasMany(QuestProgress::class);
    }

    public function xPLogs(): HasMany
    {
        return $this->hasMany(XPLog::class);
    }

    public function documents(): HasMany
    {
        return $this->hasMany(Document::class);
    }

    public function eventBookings(): HasMany
    {
        return $this->hasMany(EventBooking::class);
    }
}
