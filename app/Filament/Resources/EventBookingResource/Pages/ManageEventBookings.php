<?php

namespace App\Filament\Resources\EventBookingResource\Pages;

use App\Filament\Resources\EventBookingResource;
use Filament\Actions;
use Filament\Resources\Pages\ManageRecords;

class ManageEventBookings extends ManageRecords
{
    protected static string $resource = EventBookingResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
