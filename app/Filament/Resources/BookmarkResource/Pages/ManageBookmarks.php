<?php

namespace App\Filament\Resources\BookmarkResource\Pages;

use App\Filament\Resources\BookmarkResource;
use Filament\Actions;
use Filament\Resources\Pages\ManageRecords;

class ManageBookmarks extends ManageRecords
{
    protected static string $resource = BookmarkResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
