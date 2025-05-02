<?php

namespace App\Filament\Resources\StudentSkillProgressResource\Pages;

use App\Filament\Resources\StudentSkillProgressResource;
use Filament\Actions;
use Filament\Resources\Pages\ManageRecords;

class ManageStudentSkillProgress extends ManageRecords
{
    protected static string $resource = StudentSkillProgressResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
