<?php

namespace Tests\Feature\Http\Controllers;

use App\Models\Quest;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use JMac\Testing\Traits\AdditionalAssertions;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

/**
 * @see \App\Http\Controllers\QuestController
 */
final class QuestControllerTest extends TestCase
{
    use AdditionalAssertions, RefreshDatabase, WithFaker;

    #[Test]
    public function index_displays_view(): void
    {
        $quests = Quest::factory()->count(3)->create();

        $response = $this->get(route('quests.index'));

        $response->assertOk();
        $response->assertViewIs('quest.index');
        $response->assertViewHas('quests');
    }


    #[Test]
    public function create_displays_view(): void
    {
        $response = $this->get(route('quests.create'));

        $response->assertOk();
        $response->assertViewIs('quest.create');
    }


    #[Test]
    public function store_uses_form_request_validation(): void
    {
        $this->assertActionUsesFormRequest(
            \App\Http\Controllers\QuestController::class,
            'store',
            \App\Http\Requests\QuestStoreRequest::class
        );
    }

    #[Test]
    public function store_saves_and_redirects(): void
    {
        $title = fake()->sentence(4);
        $description = fake()->text();
        $json_steps = fake()->;
        $xp_reward = fake()->numberBetween(-10000, 10000);
        $is_active = fake()->boolean();

        $response = $this->post(route('quests.store'), [
            'title' => $title,
            'description' => $description,
            'json_steps' => $json_steps,
            'xp_reward' => $xp_reward,
            'is_active' => $is_active,
        ]);

        $quests = Quest::query()
            ->where('title', $title)
            ->where('description', $description)
            ->where('json_steps', $json_steps)
            ->where('xp_reward', $xp_reward)
            ->where('is_active', $is_active)
            ->get();
        $this->assertCount(1, $quests);
        $quest = $quests->first();

        $response->assertRedirect(route('quests.index'));
        $response->assertSessionHas('quest.id', $quest->id);
    }


    #[Test]
    public function show_displays_view(): void
    {
        $quest = Quest::factory()->create();

        $response = $this->get(route('quests.show', $quest));

        $response->assertOk();
        $response->assertViewIs('quest.show');
        $response->assertViewHas('quest');
    }


    #[Test]
    public function edit_displays_view(): void
    {
        $quest = Quest::factory()->create();

        $response = $this->get(route('quests.edit', $quest));

        $response->assertOk();
        $response->assertViewIs('quest.edit');
        $response->assertViewHas('quest');
    }


    #[Test]
    public function update_uses_form_request_validation(): void
    {
        $this->assertActionUsesFormRequest(
            \App\Http\Controllers\QuestController::class,
            'update',
            \App\Http\Requests\QuestUpdateRequest::class
        );
    }

    #[Test]
    public function update_redirects(): void
    {
        $quest = Quest::factory()->create();
        $title = fake()->sentence(4);
        $description = fake()->text();
        $json_steps = fake()->;
        $xp_reward = fake()->numberBetween(-10000, 10000);
        $is_active = fake()->boolean();

        $response = $this->put(route('quests.update', $quest), [
            'title' => $title,
            'description' => $description,
            'json_steps' => $json_steps,
            'xp_reward' => $xp_reward,
            'is_active' => $is_active,
        ]);

        $quest->refresh();

        $response->assertRedirect(route('quests.index'));
        $response->assertSessionHas('quest.id', $quest->id);

        $this->assertEquals($title, $quest->title);
        $this->assertEquals($description, $quest->description);
        $this->assertEquals($json_steps, $quest->json_steps);
        $this->assertEquals($xp_reward, $quest->xp_reward);
        $this->assertEquals($is_active, $quest->is_active);
    }


    #[Test]
    public function destroy_deletes_and_redirects(): void
    {
        $quest = Quest::factory()->create();

        $response = $this->delete(route('quests.destroy', $quest));

        $response->assertRedirect(route('quests.index'));

        $this->assertModelMissing($quest);
    }
}
