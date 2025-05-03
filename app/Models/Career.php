<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Career extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'salary_range',
        'growth_rate',
        'education',
    ];

    /**
     * Get the skills associated with this career.
     */
    public function skills(): HasMany
    {
        return $this->hasMany(CareerSkill::class);
    }

    /**
     * Get the future career paths associated with this career.
     */
    public function futurePaths(): HasMany
    {
        return $this->hasMany(CareerFuturePath::class);
    }

    /**
     * Get the archetypes associated with this career.
     */
    public function archetypes(): BelongsToMany
    {
        return $this->belongsToMany(
            Archetype::class,
            'career_archetype',
            'career_id',
            'archetype_code',
            'id',
            'code'
        );
    }
}
