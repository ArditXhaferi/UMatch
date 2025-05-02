<?php

namespace Tests\Feature\Http\Controllers;

use App\Models\;
use App\Models\Application;
use App\Models\StudentProfile;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Carbon;
use JMac\Testing\Traits\AdditionalAssertions;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

/**
 * @see \App\Http\Controllers\ApplicationController
 */
final class ApplicationControllerTest extends TestCase
{
    use AdditionalAssertions, RefreshDatabase, WithFaker;

    #[Test]
    public function index_displays_view(): void
    {
        $applications = Application::factory()->count(3)->create();

        $response = $this->get(route('applications.index'));

        $response->assertOk();
        $response->assertViewIs('application.index');
        $response->assertViewHas('applications');
    }


    #[Test]
    public function create_displays_view(): void
    {
        $response = $this->get(route('applications.create'));

        $response->assertOk();
        $response->assertViewIs('application.create');
    }


    #[Test]
    public function store_uses_form_request_validation(): void
    {
        $this->assertActionUsesFormRequest(
            \App\Http\Controllers\ApplicationController::class,
            'store',
            \App\Http\Requests\ApplicationStoreRequest::class
        );
    }

    #[Test]
    public function store_saves_and_redirects(): void
    {
        $student_profile = StudentProfile::factory()->create();
        $programme = ::factory()->create();
        $status = fake()->randomElement(/** enum_attributes **/);
        $submitted_at = Carbon::parse(fake()->dateTime());

        $response = $this->post(route('applications.store'), [
            'student_profile_id' => $student_profile->id,
            'programme_id' => $programme->id,
            'status' => $status,
            'submitted_at' => $submitted_at->toDateTimeString(),
        ]);

        $applications = Application::query()
            ->where('student_profile_id', $student_profile->id)
            ->where('programme_id', $programme->id)
            ->where('status', $status)
            ->where('submitted_at', $submitted_at)
            ->get();
        $this->assertCount(1, $applications);
        $application = $applications->first();

        $response->assertRedirect(route('applications.index'));
        $response->assertSessionHas('application.id', $application->id);
    }


    #[Test]
    public function show_displays_view(): void
    {
        $application = Application::factory()->create();

        $response = $this->get(route('applications.show', $application));

        $response->assertOk();
        $response->assertViewIs('application.show');
        $response->assertViewHas('application');
    }


    #[Test]
    public function edit_displays_view(): void
    {
        $application = Application::factory()->create();

        $response = $this->get(route('applications.edit', $application));

        $response->assertOk();
        $response->assertViewIs('application.edit');
        $response->assertViewHas('application');
    }


    #[Test]
    public function update_uses_form_request_validation(): void
    {
        $this->assertActionUsesFormRequest(
            \App\Http\Controllers\ApplicationController::class,
            'update',
            \App\Http\Requests\ApplicationUpdateRequest::class
        );
    }

    #[Test]
    public function update_redirects(): void
    {
        $application = Application::factory()->create();
        $student_profile = StudentProfile::factory()->create();
        $programme = ::factory()->create();
        $status = fake()->randomElement(/** enum_attributes **/);
        $submitted_at = Carbon::parse(fake()->dateTime());

        $response = $this->put(route('applications.update', $application), [
            'student_profile_id' => $student_profile->id,
            'programme_id' => $programme->id,
            'status' => $status,
            'submitted_at' => $submitted_at->toDateTimeString(),
        ]);

        $application->refresh();

        $response->assertRedirect(route('applications.index'));
        $response->assertSessionHas('application.id', $application->id);

        $this->assertEquals($student_profile->id, $application->student_profile_id);
        $this->assertEquals($programme->id, $application->programme_id);
        $this->assertEquals($status, $application->status);
        $this->assertEquals($submitted_at->timestamp, $application->submitted_at);
    }


    #[Test]
    public function destroy_deletes_and_redirects(): void
    {
        $application = Application::factory()->create();

        $response = $this->delete(route('applications.destroy', $application));

        $response->assertRedirect(route('applications.index'));

        $this->assertModelMissing($application);
    }
}
