import { Line } from "react-chartjs-2";
import { Link } from "react-router-dom";
import React, {  useState } from 'react';
import PanelHeader from "components/PanelHeader/PanelHeader.js";
import OrganizationForm from "components/Organization/OrganizationForm.js";
import NotificationAlert from "react-notification-alert";
import { notificationSettings } from "notify";
import { createOrganization } from '../stores/organizationStore';

import {
  Alert,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
  Table,
  Button,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  Input,
  UncontrolledTooltip,
} from "reactstrap";

import {
  dashboardPanelChart,
} from "variables/charts.js";

function Dashboard() {
  const [createOrganizationModal, setCreateOrganizationModal] = useState(false);

  const notificationAlert = React.createRef();

  const notify = (message, type, icon = "ui-1_bell-53") => {
    const options = notificationSettings(message, type, icon);
    notificationAlert.current.notificationAlert(options);    
  };

  const toggleCreateOrganizationModal = () => {
    setCreateOrganizationModal(!createOrganizationModal);
  };

  const handleSaveOrganization = async (organizationData) => {
    try {
      await createOrganization(organizationData);
      notify('Organization created successfully', 'success');
      toggleCreateOrganizationModal();
    } catch (error) {
      notify('Error: ' +  error.response.data.message, 'success');
    }
  };

  return (
    <>
      <NotificationAlert ref={notificationAlert} />
      <PanelHeader
        size="lg"
        content={
          <Line
            data={dashboardPanelChart.data}
            options={dashboardPanelChart.options}
          />
        }
      />
      <div className="content">
        <Row>
          <Card>
              <CardHeader>
                <Row className="ml-2">
                  <CardTitle tag="h4">Hello, Name!</CardTitle>
                  <Col className="mr-2" align="right">
                    <Button
                      className="btn btn-warning ml-2"
                      onClick={() => toggleCreateOrganizationModal()}
                    >
                      Add organization
                      <i className="ml-2 now-ui-icons business_badge"/>
                    </Button> 

                    <Link 
                      to={'/admin/user/add'} 
                      className="btn btn-info ml-2"
                    >
                      Add teammate
                      <i className="ml-2 now-ui-icons users_single-02"/>
                    </Link> 
                    <Link 
                      to={'#'} 
                      className="btn btn-success ml-2"
                    >
                      Add task
                      <i className="ml-2 now-ui-icons ui-1_simple-add"/>
                    </Link>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Alert
                  color="info"
                  className="alert-with-icon"
                >
                  <span
                    data-notify="icon"
                    className="now-ui-icons arrows-1_minimal-right"
                  />
                  <span data-notify="message">
                    This is a notification with close button and icon.
                  </span>
                </Alert>
              </CardBody>
            </Card>
        </Row>
        <Row>
          <Col xs={12} md={1}></Col>
          <Col xs={12} md={5}>
            <Card className="card-tasks">
              <CardHeader>
                <h5 className="card-category">CATEGORY</h5>
                <CardTitle tag="h4">Tasks</CardTitle>
              </CardHeader>
              <CardBody>
                <div className="table-full-width table-responsive">
                  <Table>
                    <tbody>
                      <tr>
                        <td>
                          <FormGroup check>
                            <Label check>
                              <Input defaultChecked type="checkbox" />
                              <span className="form-check-sign" />
                            </Label>
                          </FormGroup>
                        </td>
                        <td className="text-left">
                          Sign contract for "What are conference organizers
                          afraid of?"
                        </td>
                        <td className="td-actions text-right">
                          <Button
                            className="btn-round btn-icon btn-icon-mini btn-neutral"
                            color="info"
                            id="tooltip731609871"
                            type="button"
                          >
                            <i className="now-ui-icons ui-2_settings-90" />
                          </Button>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip731609871"
                          >
                            Edit Task
                          </UncontrolledTooltip>
                          <Button
                            className="btn-round btn-icon btn-icon-mini btn-neutral"
                            color="danger"
                            id="tooltip923217206"
                            type="button"
                          >
                            <i className="now-ui-icons ui-1_simple-remove" />
                          </Button>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip923217206"
                          >
                            Remove
                          </UncontrolledTooltip>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <FormGroup check>
                            <Label check>
                              <Input type="checkbox" />
                              <span className="form-check-sign" />
                            </Label>
                          </FormGroup>
                        </td>
                        <td className="text-left">
                          Lines From Great Russian Literature? Or E-mails From
                          My Boss?
                        </td>
                        <td className="td-actions text-right">
                          <Button
                            className="btn-round btn-icon btn-icon-mini btn-neutral"
                            color="info"
                            id="tooltip907509347"
                            type="button"
                          >
                            <i className="now-ui-icons ui-2_settings-90" />
                          </Button>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip907509347"
                          >
                            Edit Task
                          </UncontrolledTooltip>
                          <Button
                            className="btn-round btn-icon btn-icon-mini btn-neutral"
                            color="danger"
                            id="tooltip496353037"
                            type="button"
                          >
                            <i className="now-ui-icons ui-1_simple-remove" />
                          </Button>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip496353037"
                          >
                            Remove
                          </UncontrolledTooltip>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <FormGroup check>
                            <Label check>
                              <Input defaultChecked type="checkbox" />
                              <span className="form-check-sign" />
                            </Label>
                          </FormGroup>
                        </td>
                        <td className="text-left">
                          Flooded: One year later, assessing what was lost and
                          what was found when a ravaging rain swept through
                          metro Detroit
                        </td>
                        <td className="td-actions text-right">
                          <Button
                            className="btn-round btn-icon btn-icon-mini btn-neutral"
                            color="info"
                            id="tooltip326247652"
                            type="button"
                          >
                            <i className="now-ui-icons ui-2_settings-90" />
                          </Button>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip326247652"
                          >
                            Edit Task
                          </UncontrolledTooltip>
                          <Button
                            className="btn-round btn-icon btn-icon-mini btn-neutral"
                            color="danger"
                            id="tooltip389516969"
                            type="button"
                          >
                            <i className="now-ui-icons ui-1_simple-remove" />
                          </Button>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip389516969"
                          >
                            Remove
                          </UncontrolledTooltip>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats">
                  <i className="now-ui-icons loader_refresh spin" /> Updated 3
                  minutes ago
                </div>
              </CardFooter>
            </Card>
          </Col>
          <Col xs={12} md={5}>
            <Card className="card-tasks">
              <CardHeader>
                <h5 className="card-category">CATEGORY</h5>
                <CardTitle tag="h4">Tasks</CardTitle>
              </CardHeader>
              <CardBody>
                <div className="table-full-width table-responsive">
                  <Table>
                    <tbody>
                      <tr>
                        <td>
                          <FormGroup check>
                            <Label check>
                              <Input defaultChecked type="checkbox" />
                              <span className="form-check-sign" />
                            </Label>
                          </FormGroup>
                        </td>
                        <td className="text-left">
                          Sign contract for "What are conference organizers
                          afraid of?"
                        </td>
                        <td className="td-actions text-right">
                          <Button
                            className="btn-round btn-icon btn-icon-mini btn-neutral"
                            color="info"
                            id="tooltip731609871"
                            type="button"
                          >
                            <i className="now-ui-icons ui-2_settings-90" />
                          </Button>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip731609871"
                          >
                            Edit Task
                          </UncontrolledTooltip>
                          <Button
                            className="btn-round btn-icon btn-icon-mini btn-neutral"
                            color="danger"
                            id="tooltip923217206"
                            type="button"
                          >
                            <i className="now-ui-icons ui-1_simple-remove" />
                          </Button>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip923217206"
                          >
                            Remove
                          </UncontrolledTooltip>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <FormGroup check>
                            <Label check>
                              <Input type="checkbox" />
                              <span className="form-check-sign" />
                            </Label>
                          </FormGroup>
                        </td>
                        <td className="text-left">
                          Lines From Great Russian Literature? Or E-mails From
                          My Boss?
                        </td>
                        <td className="td-actions text-right">
                          <Button
                            className="btn-round btn-icon btn-icon-mini btn-neutral"
                            color="info"
                            id="tooltip907509347"
                            type="button"
                          >
                            <i className="now-ui-icons ui-2_settings-90" />
                          </Button>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip907509347"
                          >
                            Edit Task
                          </UncontrolledTooltip>
                          <Button
                            className="btn-round btn-icon btn-icon-mini btn-neutral"
                            color="danger"
                            id="tooltip496353037"
                            type="button"
                          >
                            <i className="now-ui-icons ui-1_simple-remove" />
                          </Button>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip496353037"
                          >
                            Remove
                          </UncontrolledTooltip>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <FormGroup check>
                            <Label check>
                              <Input defaultChecked type="checkbox" />
                              <span className="form-check-sign" />
                            </Label>
                          </FormGroup>
                        </td>
                        <td className="text-left">
                          Flooded: One year later, assessing what was lost and
                          what was found when a ravaging rain swept through
                          metro Detroit
                        </td>
                        <td className="td-actions text-right">
                          <Button
                            className="btn-round btn-icon btn-icon-mini btn-neutral"
                            color="info"
                            id="tooltip326247652"
                            type="button"
                          >
                            <i className="now-ui-icons ui-2_settings-90" />
                          </Button>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip326247652"
                          >
                            Edit Task
                          </UncontrolledTooltip>
                          <Button
                            className="btn-round btn-icon btn-icon-mini btn-neutral"
                            color="danger"
                            id="tooltip389516969"
                            type="button"
                          >
                            <i className="now-ui-icons ui-1_simple-remove" />
                          </Button>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip389516969"
                          >
                            Remove
                          </UncontrolledTooltip>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats">
                  <i className="now-ui-icons loader_refresh spin" /> Updated 3
                  minutes ago
                </div>
              </CardFooter>
            </Card>
          </Col>
          <Col xs={12} md={1}></Col>
        </Row>
        <Row>
          <Col xs={12} md={6}>
          </Col>
        </Row>
      </div>

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
    </>
  );
}

export default Dashboard;
