<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Archetype extends Model
{
    use HasFactory;

    protected $fillable = [
        'code',
        'name',
        'faculty',
        'majors',
    ];

    protected $casts = [
        'majors' => 'array',
    ];

    /**
     * Get the careers associated with this archetype.
     */
    public function careers(): BelongsToMany
    {
        return $this->belongsToMany(
            Career::class,
            'career_archetype',
            'archetype_code',
            'career_id',
            'code',
            'id'
        );
    }
}
