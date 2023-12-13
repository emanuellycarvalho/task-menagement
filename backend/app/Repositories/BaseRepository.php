<?php

namespace App\Repositories;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

abstract class BaseRepository
{
    protected $model;
    protected $accessLevelFilter = [];

    public function __construct(Model $model)
    {
        $this->model = $model;
    }

    public function getAll(): Collection
    {
        return $this->model->all();
    }

    public function getById(string $id): ?Model
    {
        return $this->model->find($id);
    }

    public function create(array $data): Model
    {
        return $this->model->firstOrCreate($data);
    }

    public function update(Model $model, array $data): bool
    {
        return $model->update($data);
    }

    public function delete(Model $model): bool
    {
        return $model->delete();
    }

    protected function applyAccessLevelFilter($query)
    {
        $user = auth()->user();
        $accessLevel = $user
            ? \Modules\Cas\Entities\AccessLevel::find($user->access_level_id)->access_level_name
            : 'user';

        if (isset($this->accessLevelFilter[$accessLevel])) {
            $filterMethod = $this->accessLevelFilter[$accessLevel];
            $query = $this->$filterMethod($query);
        }

        return $query;
    }
}

