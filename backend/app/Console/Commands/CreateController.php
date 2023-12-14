<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class CreateController extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'make:controllerStub {model}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create a controller api for the given model';

    /**
     * Execute the console command.
     */
    public function handle(): void
    {
        $model = $this->argument('model');

        $controller = $model . 'Controller';

        if (class_exists($controller)) {
            $this->error('Controller class already exists.');
            return;
        }

        $path = base_path('app/Http/Controllers/' . $controller . '.php');
        $stub = file_get_contents(base_path('stubs/controller.stub'));

        if (!is_dir(dirname($path))) {
            mkdir(dirname($path), 0755, true);
        }

        $stub = str_replace('{{Model}}', $model, $stub);
        $stub = str_replace('{{model}}', strtolower($model), $stub);

        file_put_contents($path, $stub);

        $this->info('Controller created successfully: ' . $controller);
    }
}
