<?php

namespace Tests\Feature\Http\Controllers;

use App\Models\SkillNode;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use JMac\Testing\Traits\AdditionalAssertions;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

/**
 * @see \App\Http\Controllers\SkillNodeController
 */
final class SkillNodeControllerTest extends TestCase
{
    use AdditionalAssertions, RefreshDatabase, WithFaker;

    #[Test]
    public function index_displays_view(): void
    {
        $skillNodes = SkillNode::factory()->count(3)->create();

        $response = $this->get(route('skill-nodes.index'));

        $response->assertOk();
        $response->assertViewIs('skillNode.index');
        $response->assertViewHas('skillNodes');
    }


    #[Test]
    public function create_displays_view(): void
    {
        $response = $this->get(route('skill-nodes.create'));

        $response->assertOk();
        $response->assertViewIs('skillNode.create');
    }


    #[Test]
    public function store_uses_form_request_validation(): void
    {
        $this->assertActionUsesFormRequest(
            \App\Http\Controllers\SkillNodeController::class,
            'store',
            \App\Http\Requests\SkillNodeStoreRequest::class
        );
    }

    #[Test]
    public function store_saves_and_redirects(): void
    {
        $code = fake()->word();
        $title = fake()->sentence(4);
        $xp_required = fake()->numberBetween(-10000, 10000);

        $response = $this->post(route('skill-nodes.store'), [
            'code' => $code,
            'title' => $title,
            'xp_required' => $xp_required,
        ]);

        $skillNodes = SkillNode::query()
            ->where('code', $code)
            ->where('title', $title)
            ->where('xp_required', $xp_required)
            ->get();
        $this->assertCount(1, $skillNodes);
        $skillNode = $skillNodes->first();

        $response->assertRedirect(route('skillNodes.index'));
        $response->assertSessionHas('skillNode.id', $skillNode->id);
    }


    #[Test]
    public function show_displays_view(): void
    {
        $skillNode = SkillNode::factory()->create();

        $response = $this->get(route('skill-nodes.show', $skillNode));

        $response->assertOk();
        $response->assertViewIs('skillNode.show');
        $response->assertViewHas('skillNode');
    }


    #[Test]
    public function edit_displays_view(): void
    {
        $skillNode = SkillNode::factory()->create();

        $response = $this->get(route('skill-nodes.edit', $skillNode));

        $response->assertOk();
        $response->assertViewIs('skillNode.edit');
        $response->assertViewHas('skillNode');
    }


    #[Test]
    public function update_uses_form_request_validation(): void
    {
        $this->assertActionUsesFormRequest(
            \App\Http\Controllers\SkillNodeController::class,
            'update',
            \App\Http\Requests\SkillNodeUpdateRequest::class
        );
    }

    #[Test]
    public function update_redirects(): void
    {
        $skillNode = SkillNode::factory()->create();
        $code = fake()->word();
        $title = fake()->sentence(4);
        $xp_required = fake()->numberBetween(-10000, 10000);

        $response = $this->put(route('skill-nodes.update', $skillNode), [
            'code' => $code,
            'title' => $title,
            'xp_required' => $xp_required,
        ]);

        $skillNode->refresh();

        $response->assertRedirect(route('skillNodes.index'));
        $response->assertSessionHas('skillNode.id', $skillNode->id);

        $this->assertEquals($code, $skillNode->code);
        $this->assertEquals($title, $skillNode->title);
        $this->assertEquals($xp_required, $skillNode->xp_required);
    }


    #[Test]
    public function destroy_deletes_and_redirects(): void
    {
        $skillNode = SkillNode::factory()->create();

        $response = $this->delete(route('skill-nodes.destroy', $skillNode));

        $response->assertRedirect(route('skillNodes.index'));

        $this->assertModelMissing($skillNode);
    }
}
