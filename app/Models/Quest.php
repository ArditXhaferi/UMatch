<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Quest extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'title',
        'description',
        'json_steps',
        'xp_reward',
        'season',
        'is_active',
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
            'json_steps' => 'array',
            'is_active' => 'boolean',
        ];
    }

    public function questProgresses(): HasMany
    {
        return $this->hasMany(QuestProgress::class);
    }

    public function squads(): HasMany
    {
        return $this->hasMany(Squad::class);
    }
}
