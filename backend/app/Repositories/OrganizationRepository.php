<?php

namespace App\Repositories\OrganizationRepository;

use App\Repositories\BaseRepository;
use App\Models\OrganizationRepository;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;

class OrganizationRepositoryRepository extends BaseRepository
{
    public function __construct(OrganizationRepository $organizationRepository)
    {
        $this->model = $organizationRepository;
    }
}
