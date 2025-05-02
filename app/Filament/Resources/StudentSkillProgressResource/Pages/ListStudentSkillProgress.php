<?php

namespace App\Filament\Resources\StudentSkillProgressResource\Pages;

use App\Filament\Resources\StudentSkillProgressResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListStudentSkillProgress extends ListRecords
{
    protected static string $resource = StudentSkillProgressResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
