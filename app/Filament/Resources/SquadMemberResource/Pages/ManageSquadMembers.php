<?php

namespace App\Filament\Resources\SquadMemberResource\Pages;

use App\Filament\Resources\SquadMemberResource;
use Filament\Actions;
use Filament\Resources\Pages\ManageRecords;

class ManageSquadMembers extends ManageRecords
{
    protected static string $resource = SquadMemberResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
