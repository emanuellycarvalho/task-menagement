<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class CreateTest extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'make:testStub {model}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create a test api for the given model';

    /**
     * Execute the console command.
     */
    public function handle(): void
    {
        $model = $this->argument('model');

        $test = $model . 'Test';

        if (class_exists($test)) {
            $this->error('Test class already exists.');
            return;
        }

        $path = base_path('tests/Unit/' . $test . '.php');
        $stub = file_get_contents(base_path('stubs/test.stub'));

        if (!is_dir(dirname($path))) {
            mkdir(dirname($path), 0755, true);
        }

        $stub = str_replace('{{Model}}', $model, $stub);
        $stub = str_replace('{{model}}', strtolower($model), $stub);

        file_put_contents($path, $stub);

        $this->info('Test created successfully: ' . $test);
    }
}
