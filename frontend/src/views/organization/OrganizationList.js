import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import NotificationAlert from "react-notification-alert";
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
  ModalFooter
} from 'reactstrap';
import PanelHeader from 'components/PanelHeader/PanelHeader.js';
import OrganizationForm from "views/organization/OrganizationForm.js";

const fetchOrganizations = async (setOrganizations) => {
  try {
    const response = await axios.get('/organizations');
    setOrganizations(response.data.data);
  } catch (error) {
    notify('Error: ' + errror, 'danger');
  }
};

function OrganizationList() {
  const [organizations, setOrganizations] = useState([]);
  const [editModal, setEditModal] = useState(false);
  const [organizationToEdit, setOrganizationToEdit] = useState(null);
  const notificationAlert = React.useRef();

  useEffect(() => {
    fetchOrganizations(setOrganizations);
  }, []);

  const toggleEditModal = (organization) => {
    setOrganizationToEdit(organization);
    setEditModal(!editModal);
  };

  const handleUpdateOrganization = () => {
    // Lógica para atualizar a organização
    setEditModal(false);
  };

  const handleDeleteOrganization = (organizationId) => {
    if (window.confirm('Are you sure you want to delete this organization?')) {
      axios.delete(`/organizations/${organizationId}`)
        .then(response => {
          notify('Organization deleted successfully', 'success');
          fetchOrganizations(setOrganizations);
        })
        .catch(error => {
          notify('Error on delete organizations', 'danger');
        });
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
                <CardTitle tag="h4">Organizations</CardTitle>
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
                      <Button className="btn-sm" color="info" onClick={() => toggleEditModal(organization)}>
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

        <Modal isOpen={editModal} toggle={toggleEditModal}>
          <ModalHeader toggle={toggleEditModal}>Edit Organization</ModalHeader>
          <ModalBody>
            <OrganizationForm organization={organizationToEdit} create={false}/>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={handleUpdateOrganization}>
              Save
            </Button>
            <Button color="secondary" onClick={toggleEditModal}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    </>
  );
}

export default OrganizationList;
