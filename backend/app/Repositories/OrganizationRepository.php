<?php

namespace App\Repositories;

use App\Repositories\BaseRepository;
use App\Models\Organization;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;

class OrganizationRepository extends BaseRepository
{
    public function __construct(OrganizationRepository $organizationRepository)
    {
        $this->model = $organizationRepository;
    }
}
