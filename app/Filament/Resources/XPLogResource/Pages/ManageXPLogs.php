<?php

namespace App\Filament\Resources\XPLogResource\Pages;

use App\Filament\Resources\XPLogResource;
use Filament\Actions;
use Filament\Resources\Pages\ManageRecords;

class ManageXPLogs extends ManageRecords
{
    protected static string $resource = XPLogResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
