<?php
namespace Tests\Unit;

use Tests\TestCase;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Testing\RefreshDatabase;

class UserTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_create_user()
    {
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
        ];

        $response = $this->postJson('/api/users', $data);

        $response->assertStatus(201);
        $this->assertDatabaseHas('users', $data);
    }

    public function test_can_read_user()
    {
        $user = User::factory()->create();

        $response = $this->getJson("/api/users/{$user->id}");

        $response->assertStatus(200);
        $response->assertJsonFragment($user->toArray());
    }

    public function test_can_update_user()
    {
        $user = User::factory()->create();

        $updatedData = [
            'username' => 'john.doe',
        ];

        $response = $this->putJson("/api/users/{$user->id}", $updatedData);

        $response->assertStatus(200);
        $this->assertDatabaseHas('users', $updatedData);
    }

    public function test_can_delete_user()
    {
        $user = User::factory()->create();

        $response = $this->deleteJson("/api/users/{$user->id}");

        $response->assertStatus(204);
        $this->assertDatabaseMissing('users', ['id' => $user->id]);
    }
}

