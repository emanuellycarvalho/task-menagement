<?php
namespace Tests\Unit;

use Tests\TestCase;
use App\Models\TaskList;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Http\Controllers\TaskListController;

class TaskListTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_create_tasklist()
    {
        $user = User::factory()->create();
        $data = [
            'label' => 'Label',
            'creator_id' => $user->id
        ];

        $response = $this->postJson('/api/tasklists', $data);

        $response->assertStatus(201);
        $this->assertDatabaseHas('tasklists', $data);
    }

    public function test_can_read_tasklist()
    {
        $tasklist = TaskList::factory()->create();

        $response = $this->getJson("/api/tasklists/{$tasklist->id}");

        $response->assertStatus(200);
        $response->assertJsonFragment($tasklist->toArray());
    }

    public function test_can_update_tasklist()
    {
        $tasklist = TaskList::factory()->create();

        $updatedData = [
            'label' => 'Label'
        ];

        $response = $this->putJson("/api/tasklists/{$tasklist->id}", $updatedData);

        $response->assertStatus(200);
        $this->assertDatabaseHas('tasklists', $updatedData);
    }

    public function test_can_delete_tasklist()
    {
        $tasklist = TaskList::factory()->create();

        $response = $this->deleteJson("/api/tasklists/{$tasklist->id}");

        $response->assertStatus(204);
        $this->assertDatabaseMissing('tasklists', ['id' => $tasklist->id]);
    }
}

