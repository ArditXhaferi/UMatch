<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SkillTree extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'nodes',
        'links',
        'is_active',
    ];

    protected $casts = [
        'nodes' => 'array',
        'links' => 'array',
        'is_active' => 'boolean',
    ];
}
