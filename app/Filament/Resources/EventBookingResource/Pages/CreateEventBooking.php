<?php

namespace App\Filament\Resources\EventBookingResource\Pages;

use App\Filament\Resources\EventBookingResource;
use Filament\Actions;
use Filament\Resources\Pages\CreateRecord;

class CreateEventBooking extends CreateRecord
{
    protected static string $resource = EventBookingResource::class;
}
