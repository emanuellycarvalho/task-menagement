<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ModelsOrganization>
 */
class OrganizationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $categories = ['Technology', 'Healthcare', 'Retail'];

        return [
            'name' => $this->faker->company,
            'category' => $this->faker->randomElement($categories),
            'email' => $this->faker->unique()->safeEmail,
            'address' => $this->faker->streetAddress,
            'city' => $this->faker->city,
            'country' => $this->faker->country,
        ];
    }
}
