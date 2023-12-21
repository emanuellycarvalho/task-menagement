<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\Task;
use App\Models\User;
use App\Models\TaskList;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Log;

class TaskTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_create_task()
    {
        try {
            $data = [
                'name' => 'Task',
                'description' => 'Description',
                'creator_id' => User::inRandomOrder()->first()->id,
                'assigned_id' => User::inRandomOrder()->first()->id,
                'task_list_id' => TaskList::inRandomOrder()->first()->id,
            ];

            $response = $this->postJson('/api/tasks', $data);

            $response->assertStatus(201);
            $this->assertDatabaseHas('tasks', $data);
        } catch (\Exception $e) {
            Log::error("Error in test_can_create_task: " . $e->getMessage());
            $this->fail($e->getMessage());
        }
    }

    public function test_can_read_task()
    {
        try {
            $task = Task::factory()->create();

            $response = $this->getJson("/api/tasks/{$task->id}");

            $response->assertStatus(200);
            $response->assertJsonFragment($task->toArray());
        } catch (\Exception $e) {
            Log::error("Error in test_can_read_task: " . $e->getMessage());
            $this->fail($e->getMessage());
        }
    }

    public function test_can_update_task()
    {
        try {
            $task = Task::factory()->create();

            $updatedData = [
                'name' => 'Updated task',
                'description' => 'Updated description',
                'creator_id' => User::inRandomOrder()->first()->id,
                'assigned_id' => User::inRandomOrder()->first()->id,
                'task_list_id' => TaskList::inRandomOrder()->first()->id,
            ];

            $response = $this->putJson("/api/tasks/{$task->id}", $updatedData);

            $response->assertStatus(200);
            $this->assertDatabaseHas('tasks', $updatedData);
        } catch (\Exception $e) {
            Log::error("Error in test_can_update_task: " . $e->getMessage());
            $this->fail($e->getMessage());
        }
    }

    public function test_can_delete_task()
    {
        try {
            $task = Task::factory()->create();

            $response = $this->deleteJson("/api/tasks/{$task->id}");

            $response->assertStatus(204);
            $this->assertDatabaseMissing('tasks', ['id' => $task->id]);
        } catch (\Exception $e) {
            Log::error("Error in test_can_delete_task: " . $e->getMessage());
            $this->fail($e->getMessage());
        }
    }
}
