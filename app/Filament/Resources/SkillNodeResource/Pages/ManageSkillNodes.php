<?php

namespace App\Filament\Resources\SkillNodeResource\Pages;

use App\Filament\Resources\SkillNodeResource;
use Filament\Actions;
use Filament\Resources\Pages\ManageRecords;

class ManageSkillNodes extends ManageRecords
{
    protected static string $resource = SkillNodeResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
