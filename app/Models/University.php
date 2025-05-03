<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use App\Models\Application;
use App\Models\User;
class University extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id',
        'university_name',
        'city',
        'description',
        'website',
        'logo',
        'branches_offered',
        'qualities_sought',
        'address'
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
            'branches_offered' => 'array',
            'qualities_sought' => 'array'
        ];
    }

    public function faculties(): HasMany
    {
        return $this->hasMany(Faculty::class);
    }

    public function events(): HasMany
    {
        return $this->hasMany(Event::class);
    }

    public function applications() {
        return $this->hasMany(Application::class);
    }

    public function university_owner() {
        return $this->belongsTo(User::class,'user_id');
    }
}
