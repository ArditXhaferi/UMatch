<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */

    //  protected $fillable = [
    //     'name',
    //     'slug',
    //     'city',
    //     'description',
    //     'website',
    //     'logo',
    // ];


    // "id": 1,
    // "university_name": "University of Tirana",
    // "description": "The University of Tirana is the largest and most prestigious university in Albania, offering a wide range of programs across various disciplines. Founded in 1957, it has a rich history of academic excellence and is renowned for its contributions to research and innovation. The university is home to numerous faculties, including Law, Economics, Social Sciences, and Natural Sciences, and is committed to fostering a dynamic and inclusive learning environment.",
    // "branches_offered": ["Law", "Economics", "Social Sciences", "Natural Sciences"],
    // "qualities_sought": ["Academic excellence", "Leadership skills", "Community involvement"],
    // "address": "Sheshi Nënë Tereza, Tiranë, Albania",
    // "city":"Tirana",
    // "website": "http://www.unitir.edu.al",
    // "image": "https://image.free-apply.com/gallery/l/uni/gallery/lg/1000800026/0a62780cfd74f2903d0bbceac471d9a07b2fb4ce.jpg?s=640"
    public function up(): void
    {
        //
        Schema::table("universities",function(Blueprint $table) {
            $table->renameColumn("name","university_name");
            $table->string("address");
            $table->json("branches_offered");
            $table->json("qualities_sought");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
