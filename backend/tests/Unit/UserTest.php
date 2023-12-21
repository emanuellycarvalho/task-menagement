<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\User;
use App\Models\Organization;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log; // Adicionado o uso do Facade Log
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Testing\RefreshDatabase;

class UserTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_create_user()
    {
        try {
            $data = [
                'first_name' => 'John',
                'last_name' => 'Doe',
                'nickname' => 'johndoe',
                'username' => 'john_doe',
                'email' => 'john.doe@example.com',
                'password' => Hash::make('password123'),
                'address' => '123 Main Street',
                'city' => 'Cityville',
                'country' => 'Countryland',
                'organization_id' => Organization::inRandomOrder()->first()->id,
            ];
    
            $response = $this->postJson('/api/users', $data);
    
            $response->assertStatus(201);
            $this->assertDatabaseHas('users', $data);
        } catch (\Exception $e) {
            Log::error("Error in test_can_create_user: " . $e->getMessage());
            $this->fail($e->getMessage());
        }
    }

    public function test_can_read_user()
    {
        try {
            $user = User::factory()->create();

            $response = $this->getJson("/api/users/{$user->id}");

            $response->assertStatus(200);
            $response->assertJsonFragment($user->toArray());
        } catch (\Exception $e) {
            Log::error("Error in test_can_read_user: " . $e->getMessage());
            $this->fail($e->getMessage());
        }
    }

    public function test_can_update_user()
    {
        try {
            $user = User::factory()->create();

            $updatedData = [
                'username' => 'john.doe',
            ];

            $response = $this->putJson("/api/users/{$user->id}", $updatedData);

            $response->assertStatus(200);
            $this->assertDatabaseHas('users', $updatedData);
        } catch (\Exception $e) {
            Log::error("Error in test_can_update_user: " . $e->getMessage());
            $this->fail($e->getMessage());
        }
    }

    public function test_can_delete_user()
    {
        try {
            $user = User::factory()->create();

            $response = $this->deleteJson("/api/users/{$user->id}");

            $response->assertStatus(204);
            $this->assertDatabaseMissing('users', ['id' => $user->id]);
        } catch (\Exception $e) {
            Log::error("Error in test_can_delete_user: " . $e->getMessage());
            $this->fail($e->getMessage());
        }
    }
}
