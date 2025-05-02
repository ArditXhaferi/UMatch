<?php

namespace Tests\Feature\Http\Controllers;

use App\Models\Faculty;
use App\Models\Programme;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use JMac\Testing\Traits\AdditionalAssertions;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

/**
 * @see \App\Http\Controllers\ProgrammeController
 */
final class ProgrammeControllerTest extends TestCase
{
    use AdditionalAssertions, RefreshDatabase, WithFaker;

    #[Test]
    public function index_displays_view(): void
    {
        $programmes = Programme::factory()->count(3)->create();

        $response = $this->get(route('programmes.index'));

        $response->assertOk();
        $response->assertViewIs('programme.index');
        $response->assertViewHas('programmes');
    }


    #[Test]
    public function create_displays_view(): void
    {
        $response = $this->get(route('programmes.create'));

        $response->assertOk();
        $response->assertViewIs('programme.create');
    }


    #[Test]
    public function store_uses_form_request_validation(): void
    {
        $this->assertActionUsesFormRequest(
            \App\Http\Controllers\ProgrammeController::class,
            'store',
            \App\Http\Requests\ProgrammeStoreRequest::class
        );
    }

    #[Test]
    public function store_saves_and_redirects(): void
    {
        $faculty = Faculty::factory()->create();
        $name = fake()->name();
        $slug = fake()->slug();
        $tuition = fake()->numberBetween(-10000, 10000);
        $ects = fake()->numberBetween(-10000, 10000);
        $duration = fake()->numberBetween(-10000, 10000);
        $scholarship_available = fake()->boolean();
        $open_for_application = fake()->boolean();

        $response = $this->post(route('programmes.store'), [
            'faculty_id' => $faculty->id,
            'name' => $name,
            'slug' => $slug,
            'tuition' => $tuition,
            'ects' => $ects,
            'duration' => $duration,
            'scholarship_available' => $scholarship_available,
            'open_for_application' => $open_for_application,
        ]);

        $programmes = Programme::query()
            ->where('faculty_id', $faculty->id)
            ->where('name', $name)
            ->where('slug', $slug)
            ->where('tuition', $tuition)
            ->where('ects', $ects)
            ->where('duration', $duration)
            ->where('scholarship_available', $scholarship_available)
            ->where('open_for_application', $open_for_application)
            ->get();
        $this->assertCount(1, $programmes);
        $programme = $programmes->first();

        $response->assertRedirect(route('programmes.index'));
        $response->assertSessionHas('programme.id', $programme->id);
    }


    #[Test]
    public function show_displays_view(): void
    {
        $programme = Programme::factory()->create();

        $response = $this->get(route('programmes.show', $programme));

        $response->assertOk();
        $response->assertViewIs('programme.show');
        $response->assertViewHas('programme');
    }


    #[Test]
    public function edit_displays_view(): void
    {
        $programme = Programme::factory()->create();

        $response = $this->get(route('programmes.edit', $programme));

        $response->assertOk();
        $response->assertViewIs('programme.edit');
        $response->assertViewHas('programme');
    }


    #[Test]
    public function update_uses_form_request_validation(): void
    {
        $this->assertActionUsesFormRequest(
            \App\Http\Controllers\ProgrammeController::class,
            'update',
            \App\Http\Requests\ProgrammeUpdateRequest::class
        );
    }

    #[Test]
    public function update_redirects(): void
    {
        $programme = Programme::factory()->create();
        $faculty = Faculty::factory()->create();
        $name = fake()->name();
        $slug = fake()->slug();
        $tuition = fake()->numberBetween(-10000, 10000);
        $ects = fake()->numberBetween(-10000, 10000);
        $duration = fake()->numberBetween(-10000, 10000);
        $scholarship_available = fake()->boolean();
        $open_for_application = fake()->boolean();

        $response = $this->put(route('programmes.update', $programme), [
            'faculty_id' => $faculty->id,
            'name' => $name,
            'slug' => $slug,
            'tuition' => $tuition,
            'ects' => $ects,
            'duration' => $duration,
            'scholarship_available' => $scholarship_available,
            'open_for_application' => $open_for_application,
        ]);

        $programme->refresh();

        $response->assertRedirect(route('programmes.index'));
        $response->assertSessionHas('programme.id', $programme->id);

        $this->assertEquals($faculty->id, $programme->faculty_id);
        $this->assertEquals($name, $programme->name);
        $this->assertEquals($slug, $programme->slug);
        $this->assertEquals($tuition, $programme->tuition);
        $this->assertEquals($ects, $programme->ects);
        $this->assertEquals($duration, $programme->duration);
        $this->assertEquals($scholarship_available, $programme->scholarship_available);
        $this->assertEquals($open_for_application, $programme->open_for_application);
    }


    #[Test]
    public function destroy_deletes_and_redirects(): void
    {
        $programme = Programme::factory()->create();

        $response = $this->delete(route('programmes.destroy', $programme));

        $response->assertRedirect(route('programmes.index'));

        $this->assertModelMissing($programme);
    }
}
