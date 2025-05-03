<?php

declare(strict_types=1);

namespace App\Policies;

use App\Models\University;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class UniversityPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return true;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, University $university): bool
    {
        return true;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->isUniversity();
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, University $university): bool
    {
        return $user->isUniversity() && $user->id === $university->user_id;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, University $university): bool
    {
        return $user->isUniversity() && $user->id === $university->user_id;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, University $university): bool
    {
        return $user->isUniversity() && $user->id === $university->user_id;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, University $university): bool
    {
        return $user->isUniversity() && $user->id === $university->user_id;
    }
} 