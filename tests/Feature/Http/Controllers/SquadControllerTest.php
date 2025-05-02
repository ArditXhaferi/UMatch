<?php

namespace Tests\Feature\Http\Controllers;

use App\Models\Squad;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use JMac\Testing\Traits\AdditionalAssertions;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

/**
 * @see \App\Http\Controllers\SquadController
 */
final class SquadControllerTest extends TestCase
{
    use AdditionalAssertions, RefreshDatabase, WithFaker;

    #[Test]
    public function index_displays_view(): void
    {
        $squads = Squad::factory()->count(3)->create();

        $response = $this->get(route('squads.index'));

        $response->assertOk();
        $response->assertViewIs('squad.index');
        $response->assertViewHas('squads');
    }


    #[Test]
    public function create_displays_view(): void
    {
        $response = $this->get(route('squads.create'));

        $response->assertOk();
        $response->assertViewIs('squad.create');
    }


    #[Test]
    public function store_uses_form_request_validation(): void
    {
        $this->assertActionUsesFormRequest(
            \App\Http\Controllers\SquadController::class,
            'store',
            \App\Http\Requests\SquadStoreRequest::class
        );
    }

    #[Test]
    public function store_saves_and_redirects(): void
    {
        $name = fake()->name();

        $response = $this->post(route('squads.store'), [
            'name' => $name,
        ]);

        $squads = Squad::query()
            ->where('name', $name)
            ->get();
        $this->assertCount(1, $squads);
        $squad = $squads->first();

        $response->assertRedirect(route('squads.index'));
        $response->assertSessionHas('squad.id', $squad->id);
    }


    #[Test]
    public function show_displays_view(): void
    {
        $squad = Squad::factory()->create();

        $response = $this->get(route('squads.show', $squad));

        $response->assertOk();
        $response->assertViewIs('squad.show');
        $response->assertViewHas('squad');
    }


    #[Test]
    public function edit_displays_view(): void
    {
        $squad = Squad::factory()->create();

        $response = $this->get(route('squads.edit', $squad));

        $response->assertOk();
        $response->assertViewIs('squad.edit');
        $response->assertViewHas('squad');
    }


    #[Test]
    public function update_uses_form_request_validation(): void
    {
        $this->assertActionUsesFormRequest(
            \App\Http\Controllers\SquadController::class,
            'update',
            \App\Http\Requests\SquadUpdateRequest::class
        );
    }

    #[Test]
    public function update_redirects(): void
    {
        $squad = Squad::factory()->create();
        $name = fake()->name();

        $response = $this->put(route('squads.update', $squad), [
            'name' => $name,
        ]);

        $squad->refresh();

        $response->assertRedirect(route('squads.index'));
        $response->assertSessionHas('squad.id', $squad->id);

        $this->assertEquals($name, $squad->name);
    }


    #[Test]
    public function destroy_deletes_and_redirects(): void
    {
        $squad = Squad::factory()->create();

        $response = $this->delete(route('squads.destroy', $squad));

        $response->assertRedirect(route('squads.index'));

        $this->assertModelMissing($squad);
    }
}
