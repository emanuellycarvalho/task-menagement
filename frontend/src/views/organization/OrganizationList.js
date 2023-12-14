import React, { useEffect, useState } from 'react';
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
import { thead } from 'variables/general';

function OrganizationList() {
  const [organizations, setOrganizations] = useState([]);

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const response = await axios.get('/organizations');
        setOrganizations(response.data.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchOrganizations();
  }, []);

  return (
    <>
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
