<?php

namespace App\Filament\Resources\SkillNodeResource\Pages;

use App\Filament\Resources\SkillNodeResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditSkillNode extends EditRecord
{
    protected static string $resource = SkillNodeResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
