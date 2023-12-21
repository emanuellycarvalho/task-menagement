<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\TaskList;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\TaskListController;

class TaskListTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_create_tasklist()
    {
        try {
            $data = [
                'label' => 'Label',
                'creator_id' => User::inRandomOrder()->first()->id,
            ];

            $response = $this->postJson('/api/tasklists', $data);

            $response->assertStatus(201);
            $this->assertDatabaseHas('task_lists', $data);
        } catch (\Exception $e) {
            Log::error("Error in test_can_create_tasklist: " . $e->getMessage());
            $this->fail($e->getMessage());
        }
    }

    public function test_can_read_tasklist()
    {
        try {
            $tasklist = TaskList::factory()->create();

            $response = $this->getJson("/api/tasklists/{$tasklist->id}");

            $response->assertStatus(200);
            $response->assertJsonFragment($tasklist->toArray());
        } catch (\Exception $e) {
            Log::error("Error in test_can_read_tasklist: " . $e->getMessage());
            $this->fail($e->getMessage());
        }
    }

    public function test_can_update_tasklist()
    {
        try {
            $tasklist = TaskList::factory()->create();

            $updatedData = [
                'label' => 'Label',
            ];

            $response = $this->putJson("/api/tasklists/{$tasklist->id}", $updatedData);

            $response->assertStatus(200);
            $this->assertDatabaseHas('task_lists', $updatedData);
        } catch (\Exception $e) {
            Log::error("Error in test_can_update_tasklist: " . $e->getMessage());
            $this->fail($e->getMessage());
        }
    }

    public function test_can_delete_tasklist()
    {
        try {
            $tasklist = TaskList::factory()->create();

            $response = $this->deleteJson("/api/tasklists/{$tasklist->id}");

            $response->assertStatus(204);
            $this->assertDatabaseMissing('tasklists', ['id' => $tasklist->id]);
        } catch (\Exception $e) {
            Log::error("Error in test_can_delete_tasklist: " . $e->getMessage());
            $this->fail($e->getMessage());
        }
    }
}
