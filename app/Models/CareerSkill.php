<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CareerSkill extends Model
{
    use HasFactory;

    protected $fillable = [
        'career_id',
        'skill',
    ];

    /**
     * Get the career that owns the skill.
     */
    public function career(): BelongsTo
    {
        return $this->belongsTo(Career::class);
    }
}
