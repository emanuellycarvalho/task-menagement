import React, { useEffect, useState } from 'react';
import NotificationAlert from "react-notification-alert";
import { notificationSettings } from "notify";
import { createOrganization, deleteOrganization, updateOrganization } from '../../stores/organizationStore';
import axios from '../../axios';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Table,
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
} from 'reactstrap';
import PanelHeader from 'components/PanelHeader/PanelHeader.js';
import OrganizationForm from "components/Organization/OrganizationForm.js";
import OrganizationModal from "components/Organization/OrganizationModal.js";

const fetchOrganizations = async (setOrganizations) => {
  try {
    const response = await axios.get('/organizations');
    setOrganizations(response.data.data);
  } catch (error) {
    notify('Error: ' +  error.response.data.message, 'danger');
  }
};

function OrganizationList() {
  const [createOrganizationModal, setCreateOrganizationModal] = useState(false);
  const [editOrganizationModal, setEditOrganizationModal] = useState(false);
  const [viewOrganizationModal, setViewOrganizationModal] = useState(false);
  const [organizationToEdit, setOrganizationToEdit] = useState(null);
  const [organizationToView, setOrganizationToView] = useState(null);
  const [organizations, setOrganizations] = useState([]);
  const notificationAlert = React.useRef();

  useEffect(() => {
    fetchOrganizations(setOrganizations);
  }, []);

  const toggleViewOrganizationModal = (organization) => {
    setOrganizationToView(organization);
    setViewOrganizationModal(!viewOrganizationModal);
  };

  const toggleEditOrganizationModal = (organization) => {
    setOrganizationToEdit(organization);
    setEditOrganizationModal(!editOrganizationModal);
  };

  const toggleCreateOrganizationModal = () => {
    setCreateOrganizationModal(!createOrganizationModal);
  };
  
  const notify = (message, type, icon = "ui-1_bell-53") => {
    const options = notificationSettings(message, type, icon);
    notificationAlert.current.notificationAlert(options);    
  };

  const handleUpdateOrganization = async (organizationData) => {
    try {
      await updateOrganization(organizationData);
      notify('Organization updated successfully', 'success');
      fetchOrganizations(setOrganizations);
      toggleEditOrganizationModal(organizationData);
    } catch (error) {
      notify('Error: ' +  error.response.data.message, 'success');
    }
  };

  const handleSaveOrganization = async (organizationData) => {
    try {
      await createOrganization(organizationData);
      notify('Organization created successfully', 'success');
      fetchOrganizations(setOrganizations);
      toggleCreateOrganizationModal();
    } catch (error) {
      notify('Error: ' +  error.response.data.message, 'success');
    }
  };

  const handleDeleteOrganization = async (organizationId) => {
    if (window.confirm('Are you sure you want to delete this organization?')){
      try {
        await deleteOrganization(organizationId);
        fetchOrganizations(setOrganizations);
        notify('Organization deleted successfully', 'success');
      } catch (error) {
        notify('Error: ' +  error.response.data.message, 'danger');
      }
    }
  };

  return (
    <>
      <NotificationAlert ref={notificationAlert} />
      <PanelHeader size="sm" />
      <div className="content">
        <Row>
          <Col xs={12}>
            <Card>
              <CardHeader>
                <Row className="ml-2">
                  <CardTitle tag="h4">Organizations</CardTitle>
                  <Col className="mr-2" align="right">
                    <Button
                      className="btn btn-success ml-2"
                      onClick={() => toggleCreateOrganizationModal()}
                    >
                      New
                      <i className="ml-2 now-ui-icons ui-1_simple-add"/>
                    </Button>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
              <Table responsive>
                <thead className="text-primary">
                  <tr>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Email</th>
                    <th className="text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {organizations.map((organization, key) => (
                    <tr key={key}>
                      <td>{organization.name}</td>
                      <td>{organization.category}</td>
                      <td>{organization.email}</td>
                      <td className="text-right">
                      <Button 
                        className="btn-sm" 
                        color="primary" 
                        onClick={() => toggleViewOrganizationModal(organization)}
                      >
                        View
                      </Button>
                      <Button 
                        className="btn-sm ml-1" 
                        color="info" 
                        onClick={() => toggleEditOrganizationModal(organization)}
                      >
                        Edit
                      </Button>
                      <Button
                        className="btn-sm ml-1"
                        color="danger"
                        type="button"
                        onClick={() => handleDeleteOrganization(organization.id)}
                      >
                        Delete
                      </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Modal isOpen={editOrganizationModal} toggle={toggleEditOrganizationModal}>
          <ModalHeader toggle={toggleEditOrganizationModal}>Edit Organization</ModalHeader>
          <ModalBody>
            <OrganizationForm 
              create={false} 
              organization={organizationToEdit} 
              onSave={handleUpdateOrganization} 
              onCancel={toggleEditOrganizationModal}
            />
          </ModalBody>
        </Modal>

        <Modal isOpen={createOrganizationModal} toggle={toggleCreateOrganizationModal}>
          <ModalHeader toggle={toggleCreateOrganizationModal}>Add Organization</ModalHeader>
          <ModalBody>
            <OrganizationForm 
              create={true} 
              organization={null} 
              onSave={handleSaveOrganization} 
              onCancel={toggleCreateOrganizationModal}
            />
          </ModalBody>
        </Modal>

        <OrganizationModal
          isOpen={viewOrganizationModal} 
          toggle={toggleViewOrganizationModal}
          organization={organizationToView}
        />
        
      </div>
    </>
  );
}

export default OrganizationList;
