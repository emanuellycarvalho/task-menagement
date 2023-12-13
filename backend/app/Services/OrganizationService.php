<?php

namespace App\Services;

use App\Models\Organization;
use App\Repositories\OrganizationRepository;
use Illuminate\Database\Eloquent\Collection;

class OrganizationService
{
    private $organizationRepository;

    public function __construct(OrganizationRepository $organizationRepository)
    {
        $this->organizationRepository = $organizationRepository;
    }

    public function getAllOrganizations(): Collection
    {
        return $this->organizationRepository->getAll();
    }

    public function getOrganizationById(string $id): ?Organization
    {
        return $this->organizationRepository->getById($id);
    }

    public function createOrganization(array $data): Organization
    {
        return $this->organizationRepository->create($data);
    }

    public function updateOrganization(Organization $organization, array $data): bool
    {
        return $this->organizationRepository->update($organization, $data);
    }

    public function deleteOrganization(Organization $organization): bool
    {
        return $this->organizationRepository->delete($organization);
    }
}
