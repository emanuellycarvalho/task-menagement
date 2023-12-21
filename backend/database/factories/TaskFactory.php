<?php

namespace Database\Factories;
use App\Models\Task;
use App\Models\User;
use App\Models\TaskList;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Task>
 */
class TaskFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->sentence,
            'description' => $this->faker->paragraph,
            'creator_id' => User::inRandomOrder()->first()->id,
            'assigned_id' => User::inRandomOrder()->first()->id,
            'task_list_id' => TaskList::inRandomOrder()->first()->id,
        ];
    }
}
