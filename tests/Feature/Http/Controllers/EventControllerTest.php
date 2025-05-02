<?php

namespace Tests\Feature\Http\Controllers;

use App\Models\Event;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Carbon;
use JMac\Testing\Traits\AdditionalAssertions;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

/**
 * @see \App\Http\Controllers\EventController
 */
final class EventControllerTest extends TestCase
{
    use AdditionalAssertions, RefreshDatabase, WithFaker;

    #[Test]
    public function index_displays_view(): void
    {
        $events = Event::factory()->count(3)->create();

        $response = $this->get(route('events.index'));

        $response->assertOk();
        $response->assertViewIs('event.index');
        $response->assertViewHas('events');
    }


    #[Test]
    public function create_displays_view(): void
    {
        $response = $this->get(route('events.create'));

        $response->assertOk();
        $response->assertViewIs('event.create');
    }


    #[Test]
    public function store_uses_form_request_validation(): void
    {
        $this->assertActionUsesFormRequest(
            \App\Http\Controllers\EventController::class,
            'store',
            \App\Http\Requests\EventStoreRequest::class
        );
    }

    #[Test]
    public function store_saves_and_redirects(): void
    {
        $title = fake()->sentence(4);
        $date = Carbon::parse(fake()->dateTime());
        $location = fake()->word();
        $capacity = fake()->numberBetween(-10000, 10000);

        $response = $this->post(route('events.store'), [
            'title' => $title,
            'date' => $date->toDateTimeString(),
            'location' => $location,
            'capacity' => $capacity,
        ]);

        $events = Event::query()
            ->where('title', $title)
            ->where('date', $date)
            ->where('location', $location)
            ->where('capacity', $capacity)
            ->get();
        $this->assertCount(1, $events);
        $event = $events->first();

        $response->assertRedirect(route('events.index'));
        $response->assertSessionHas('event.id', $event->id);
    }


    #[Test]
    public function show_displays_view(): void
    {
        $event = Event::factory()->create();

        $response = $this->get(route('events.show', $event));

        $response->assertOk();
        $response->assertViewIs('event.show');
        $response->assertViewHas('event');
    }


    #[Test]
    public function edit_displays_view(): void
    {
        $event = Event::factory()->create();

        $response = $this->get(route('events.edit', $event));

        $response->assertOk();
        $response->assertViewIs('event.edit');
        $response->assertViewHas('event');
    }


    #[Test]
    public function update_uses_form_request_validation(): void
    {
        $this->assertActionUsesFormRequest(
            \App\Http\Controllers\EventController::class,
            'update',
            \App\Http\Requests\EventUpdateRequest::class
        );
    }

    #[Test]
    public function update_redirects(): void
    {
        $event = Event::factory()->create();
        $title = fake()->sentence(4);
        $date = Carbon::parse(fake()->dateTime());
        $location = fake()->word();
        $capacity = fake()->numberBetween(-10000, 10000);

        $response = $this->put(route('events.update', $event), [
            'title' => $title,
            'date' => $date->toDateTimeString(),
            'location' => $location,
            'capacity' => $capacity,
        ]);

        $event->refresh();

        $response->assertRedirect(route('events.index'));
        $response->assertSessionHas('event.id', $event->id);

        $this->assertEquals($title, $event->title);
        $this->assertEquals($date->timestamp, $event->date);
        $this->assertEquals($location, $event->location);
        $this->assertEquals($capacity, $event->capacity);
    }


    #[Test]
    public function destroy_deletes_and_redirects(): void
    {
        $event = Event::factory()->create();

        $response = $this->delete(route('events.destroy', $event));

        $response->assertRedirect(route('events.index'));

        $this->assertModelMissing($event);
    }
}
