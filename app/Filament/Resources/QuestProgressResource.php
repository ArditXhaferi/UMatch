<?php

namespace App\Filament\Resources;

use App\Filament\Resources\QuestProgressResource\Pages;
use App\Filament\Resources\QuestProgressResource\RelationManagers;
use App\Models\QuestProgress;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class QuestProgressResource extends Resource
{
    protected static ?string $model = QuestProgress::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Select::make('quest_id')
                    ->relationship('quest', 'title')
                    ->required(),
                Forms\Components\Select::make('student_profile_id')
                    ->relationship('studentProfile', 'id')
                    ->required(),
                Forms\Components\TextInput::make('current_step')
                    ->required()
                    ->numeric()
                    ->default(0),
                Forms\Components\Toggle::make('completed')
                    ->required(),
                Forms\Components\DateTimePicker::make('started_at')
                    ->required(),
                Forms\Components\DateTimePicker::make('completed_at'),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('quest.title')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('studentProfile.id')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('current_step')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\IconColumn::make('completed')
                    ->boolean(),
                Tables\Columns\TextColumn::make('started_at')
                    ->dateTime()
                    ->sortable(),
                Tables\Columns\TextColumn::make('completed_at')
                    ->dateTime()
                    ->sortable(),
                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                Tables\Columns\TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListQuestProgress::route('/'),
            'create' => Pages\CreateQuestProgress::route('/create'),
            'edit' => Pages\EditQuestProgress::route('/{record}/edit'),
        ];
    }
}
