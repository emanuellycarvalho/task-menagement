<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\OrganizationService;


class OrganizationController extends Controller
{
    protected $organizationService;

    public function __construct(OrganizationService $organizationService)
    {
        $this->organizationService = $organizationService;
    }

    public function index(): JsonResponse
    {
        $organizations = $this->organizationService->getAllOrganizations();
        return response()->jsonResponseSuccess($organizations, 'Success', 200);
    }

    public function show(Organization $organization): JsonResponse
    {
        return response()->jsonResponseSuccess($organization, 'Success', 200);
    }

    public function store(OrganizationRequest $request): JsonResponse
    {
        $organization = $this->organizationService->createOrganization($request->all());
        return response()->jsonResponseSuccess($organization, 'Success on create', 201);
    }

    public function update(OrganizationRequest $request, Organization $organization): JsonResponse
    {
        $organization = $this->organizationService->updateOrganization($organization, $request->all());
        return response()->jsonResponseSuccessNoData('Success on update', 200);
    }

    public function destroy(Organization $organization): JsonResponse
    {
        $this->organizationService->deleteOrganization($organization);
        return response()->jsonResponseSuccessNoData('Success on delete', 204);
    }
}
