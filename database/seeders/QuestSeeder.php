<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Quest;

class QuestSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //

        $the_quests = file_get_contents(database_path("data/quests.json"));
        $quests = json_decode($the_quests,true);

        foreach($quests as $quest) {
            Quest::create($quest);
        }
    }
}
