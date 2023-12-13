<?php
namespace Tests\Unit;

use Tests\TestCase;
use App\Models\Organization;
use Illuminate\Foundation\Testing\RefreshDatabase;

class OrganizationCrudTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_create_organization()
    {
        $data = [
            'name' => 'Example Organization',
            'category' => 'Example Category',
            'email' => 'example@example.com',
            'address' => '123 Example Street',
            'city' => 'Example City',
            'country' => 'Example Country',
        ];

        $response = $this->postJson('/api/organizations', $data);

        $response->assertStatus(201); // Status 201 significa Created
        $this->assertDatabaseHas('organizations', $data);
    }

    public function test_can_read_organization()
    {
        $organization = Organization::factory()->create();

        $response = $this->getJson("/api/organizations/{$organization->id}");

        $response->assertStatus(200); // Status 200 significa OK
        $response->assertJson($organization->toArray());
    }

    public function test_can_update_organization()
    {
        $organization = Organization::factory()->create();

        $updatedData = [
            'name' => 'Updated Organization Name',
            'category' => 'Updated Category',
        ];

        $response = $this->putJson("/api/organizations/{$organization->id}", $updatedData);

        $response->assertStatus(200); // Status 200 significa OK
        $this->assertDatabaseHas('organizations', $updatedData);
    }

    public function test_can_delete_organization()
    {
        $organization = Organization::factory()->create();

        $response = $this->deleteJson("/api/organizations/{$organization->id}");

        $response->assertStatus(204); // Status 204 significa No Content
        $this->assertDatabaseMissing('organizations', ['id' => $organization->id]);
    }
}

