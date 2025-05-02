<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Squad extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'quest_id',
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
            'quest_id' => 'integer',
        ];
    }

    public function quest(): BelongsTo
    {
        return $this->belongsTo(Quest::class);
    }

    public function squadMembers(): HasMany
    {
        return $this->hasMany(SquadMember::class);
    }

    public function studentProfiles(): BelongsToMany
    {
        return $this->belongsToMany(StudentProfile::class)
            ->using(SquadMember::class)
            ->as('squad_member')
            ->withPivot('id', 'squad_id', 'student_profile_id', 'is_leader', 'joined_at')
            ->withTimestamps();
    }
}
