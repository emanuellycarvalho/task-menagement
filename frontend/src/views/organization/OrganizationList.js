import React, { useEffect, useState } from 'react';
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
} from 'reactstrap';
import PanelHeader from 'components/PanelHeader/PanelHeader.js';

const fetchOrganizations = async (setOrganizations) => {
  try {
    const response = await axios.get('/organizations');
    setOrganizations(response.data.data);
  } catch (error) {
    console.error('Error:', error);
  }
};

function OrganizationList() {
  const notificationAlert = React.useRef();
  const [organizations, setOrganizations] = useState([]);

  useEffect(() => {
    fetchOrganizations(setOrganizations);
  }, []);

  const notify = (message, type) => {
    const options = {
      place: 'tc',
      message: message,
      type: type,
      icon: "now-ui-icons ui-1_bell-53",
      autoDismiss: 7,
    };

    notificationAlert.current.notificationAlert(options);
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
                      <Button
                        className="btn-sm"
                        color="info"
                        type="button"
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
      </div>
    </>
  );
}

export default OrganizationList;
