<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\Organization;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\OrganizationController;

class OrganizationTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_create_organization()
    {
        try {
            $data = [
                'name' => 'Example Organization',
                'category' => 'Example Category',
                'email' => 'example@example.com',
                'address' => '123 Example Street',
                'city' => 'Example City',
                'country' => 'Example Country',
            ];

            $response = $this->postJson('/api/organizations', $data);

            $response->assertStatus(201);
            $this->assertDatabaseHas('organizations', $data);
        } catch (\Exception $e) {
            Log::error("Error in test_can_create_organization: " . $e->getMessage());
            $this->fail($e->getMessage());
        }
    }

    public function test_can_read_organization()
    {
        try {
            $organization = Organization::factory()->create();

            $response = $this->getJson("/api/organizations/{$organization->id}");

            $response->assertStatus(200);
            $response->assertJsonFragment($organization->toArray());
        } catch (\Exception $e) {
            Log::error("Error in test_can_read_organization: " . $e->getMessage());
            $this->fail($e->getMessage());
        }
    }

    public function test_can_update_organization()
    {
        try {
            $organization = Organization::factory()->create();

            $updatedData = [
                'name' => 'Updated Organization Name',
                'category' => 'Updated Category',
            ];

            $response = $this->putJson("/api/organizations/{$organization->id}", $updatedData);

            $response->assertStatus(200);
            $this->assertDatabaseHas('organizations', $updatedData);
        } catch (\Exception $e) {
            Log::error("Error in test_can_update_organization: " . $e->getMessage());
            $this->fail($e->getMessage());
        }
    }

    public function test_can_delete_organization()
    {
        try {
            $organization = Organization::factory()->create();

            $response = $this->deleteJson("/api/organizations/{$organization->id}");

            $response->assertStatus(204);
            $this->assertDatabaseMissing('organizations', ['id' => $organization->id]);
        } catch (\Exception $e) {
            Log::error("Error in test_can_delete_organization: " . $e->getMessage());
            $this->fail($e->getMessage());
        }
    }
}
