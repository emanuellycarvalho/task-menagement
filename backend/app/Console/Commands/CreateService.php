<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class CreateService extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'make:service {model}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create a service for the given model';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $model = $this->argument('model');

        $service = $model . 'Service';

        if (class_exists($service)) {
            $this->error('Service class already exists.');
            return;
        }

        $path = base_path('app/Services/' . $service . '.php');
        $stub = file_get_contents(base_path('stubs/service.stub'));

        if (file_exists($path)) {
            $this->error('Service already exists.');
            return;
        }

        if (!is_dir(dirname($path))) {
            mkdir(dirname($path), 0755, true);
        }

        $stub = str_replace('{{Model}}', $model, $stub);
        $stub = str_replace('{{model}}', strtolower($model), $stub);

        file_put_contents($path, $stub);

        $this->info('Service created successfully: ' . $service);
    }
}
