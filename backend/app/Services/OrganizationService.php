<?php

namespace App\Services\OrganizationService;

use App\Models\OrganizationService;
use App\Repositories\OrganizationService\OrganizationServiceRepository;
use Illuminate\Database\Eloquent\Collection;

class OrganizationServiceService
{
    private $organizationServiceRepository;

    public function __construct(OrganizationServiceRepository $organizationServiceRepository)
    {
        $this->organizationServiceRepository = $organizationServiceRepository;
    }

    public function getAllOrganizationServices(): Collection
    {
        return $this->organizationServiceRepository->getAll();
    }

    public function getOrganizationServiceById(string $id): ?OrganizationService
    {
        return $this->organizationServiceRepository->getById($id);
    }

    public function createOrganizationService(array $data): OrganizationService
    {
        return $this->organizationServiceRepository->create($data);
    }

    public function updateOrganizationService(OrganizationService $organizationservice, array $data): bool
    {
        return $this->organizationServiceRepository->update($organizationservice, $data);
    }

    public function deleteOrganizationService(OrganizationService $organizationservice): bool
    {
        return $this->organizationServiceRepository->delete($organizationservice);
    }
}
