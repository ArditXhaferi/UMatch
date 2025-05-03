<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CareerFuturePath extends Model
{
    use HasFactory;

    protected $fillable = [
        'career_id',
        'title',
        'years',
        'salary',
    ];

    /**
     * Get the career that owns the future path.
     */
    public function career(): BelongsTo
    {
        return $this->belongsTo(Career::class);
    }
}
