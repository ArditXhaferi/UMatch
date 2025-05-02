<?php

namespace App\Filament\Resources;

use App\Filament\Resources\StudentSkillProgressResource\Pages;
use App\Filament\Resources\StudentSkillProgressResource\RelationManagers;
use App\Models\StudentSkillProgress;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class StudentSkillProgressResource extends Resource
{
    protected static ?string $model = StudentSkillProgress::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Select::make('student_profile_id')
                    ->relationship('studentProfile', 'id')
                    ->required(),
                Forms\Components\Select::make('skill_node_id')
                    ->relationship('skillNode', 'title')
                    ->required(),
                Forms\Components\TextInput::make('xp_earned')
                    ->required()
                    ->numeric()
                    ->default(0),
                Forms\Components\Toggle::make('completed')
                    ->required(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('studentProfile.id')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('skillNode.title')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('xp_earned')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\IconColumn::make('completed')
                    ->boolean(),
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
            'index' => Pages\ListStudentSkillProgress::route('/'),
            'create' => Pages\CreateStudentSkillProgress::route('/create'),
            'edit' => Pages\EditStudentSkillProgress::route('/{record}/edit'),
        ];
    }
}
