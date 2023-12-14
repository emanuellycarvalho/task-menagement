<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Symfony\Component\Process\Process;

class CreateEntityResources extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'make:entity-resources {model}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create every needed standard resource for the given entity';

    public function handle(): void
    {
        $model = $this->argument('model');

        if(empty($model)) {
            $this->error('Model names is required');
            return;
        }

        $this->createResources([
            'Migration' => "php artisan make:migration create_" . strtolower($model) . "s_table",
            'Model' => "php artisan make:model {$model}",
            'Seeder' => "php artisan make:seed {$model}Seeder",
            'Controller' => "php artisan make:controllerStub {$model}",
            'Request' => "php artisan make:request {$model}Request",
            'Policy' => "php artisan make:policy {$model}Policy",
            'Service' => "php artisan make:service {$model}",
            'Repository' => "php artisan make:repository {$model}",
            'Factory' => "php artisan make:factory {$model}Factory --model={$model}",
            'Test' => "php artisan make:testStub {$model}",
        ]);
    }

    protected function createResources(array $resourceCommands): void
    {
        foreach ($resourceCommands as $resourceName => $command) {
            $process = Process::fromShellCommandline($command);
            $process->run();

            if ($process->isSuccessful()) {
                $this->info("$resourceName created successfully");
            } else {
                $this->error("Failed to create $resourceName");
                $this->output->write($process->getOutput());
                return;
            }
        }
    }
}
