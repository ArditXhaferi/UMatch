<?php

namespace App\Filament\Resources\QuestProgressResource\Pages;

use App\Filament\Resources\QuestProgressResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListQuestProgress extends ListRecords
{
    protected static string $resource = QuestProgressResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
