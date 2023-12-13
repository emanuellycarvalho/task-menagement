<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class CreateRepository extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'make:repository {model}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create a repository for the given model';

    /**
     * Execute the console command.
     */
    public function handle(): void
    {
        $model = $this->argument('model');

        $repository = $model . 'Repository';

        if (class_exists($repository)) {
            $this->error('Repository class already exists.');
            return;
        }

        $path = base_path('app/Repositories/' . $model . '.php');
        $stub = file_get_contents(base_path('stubs/repository.stub'));

        if (!is_dir(dirname($path))) {
            mkdir(dirname($path), 0755, true);
        }

        $stub = str_replace('{{Model}}', $model, $stub);
        $stub = str_replace('{{model}}', strtolower($model), $stub);

        file_put_contents($path, $stub);

        $this->info('Repository created successfully: ' . $repository);
    }
}
