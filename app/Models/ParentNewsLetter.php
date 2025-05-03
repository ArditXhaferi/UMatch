<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class ParentNewsLetter extends Model
{
    //

    protected $fillable = [
        'parent_message'
    ];

    public function user_parent() {
        return $this->belongsTo(User::class,'user_id');
    }
}
