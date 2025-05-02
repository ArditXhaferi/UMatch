<?php

namespace App\Filament\Resources;

use App\Filament\Resources\SquadMemberResource\Pages;
use App\Filament\Resources\SquadMemberResource\RelationManagers;
use App\Models\SquadMember;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class SquadMemberResource extends Resource
{
    protected static ?string $model = SquadMember::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Select::make('squad_id')
                    ->relationship('squad', 'name')
                    ->required(),
                Forms\Components\Select::make('student_profile_id')
                    ->relationship('studentProfile', 'id')
                    ->required(),
                Forms\Components\Toggle::make('is_leader')
                    ->required(),
                Forms\Components\DateTimePicker::make('joined_at')
                    ->required(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('squad.name')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('studentProfile.id')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\IconColumn::make('is_leader')
                    ->boolean(),
                Tables\Columns\TextColumn::make('joined_at')
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
            'index' => Pages\ListSquadMembers::route('/'),
            'create' => Pages\CreateSquadMember::route('/create'),
            'edit' => Pages\EditSquadMember::route('/{record}/edit'),
        ];
    }
}
