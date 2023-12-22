import React, { useState, useEffect } from 'react';
import PanelHeader from 'components/PanelHeader/PanelHeader.js';
import OrganizationForm from 'components/Organization/OrganizationForm.js';
import NotificationAlert from 'react-notification-alert';
import { notificationSettings } from 'notify';
import { createOrganization } from '../../stores/organizationStore';
import { fetchTasks, createTask } from '../../stores/taskStore';
import { fetchTaskLists, createTaskList } from '../../stores/taskListStore';
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
} from 'reactstrap';

function TaskList() {
  const [createOrganizationModal, setCreateOrganizationModal] = useState(false);
  const [taskLists, setTaskLists] = useState([]);
  const [tasks, setTasks] = useState([]);

  const notificationAlert = React.createRef();

  const notify = (message, type, icon = 'ui-1_bell-53') => {
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
      notify('Error: ' + error.response.data.message, 'error');
    }
  };

  const fetchData = async () => {
    try {
      await fetchTaskLists(setTaskLists);
      await fetchTasks(setTasks);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSaveTaskList = async (taskListData) => {
    try {
      await createTaskList(taskListData);
      notify('Task List created successfully', 'success');
      fetchData();
    } catch (error) {
      notify('Error: ' + error.response.data.message, 'error');
    }
  };

  const handleSaveTask = async (taskData) => {
    try {
      await createTask(taskData);
      notify('Task created successfully', 'success');
      fetchData();
    } catch (error) {
      notify('Error: ' + error.response.data.message, 'error');
    }
  };

  return (
    <>
      <NotificationAlert ref={notificationAlert} />
      <PanelHeader size="sm" />
      <div className="content">
        <Row>
          <Card>
            <CardHeader>
              <Row className="ml-2">
                <CardTitle tag="h4">Lets do it!</CardTitle>
                <Col className="mr-2" align="right">
                  <Button
                    className="btn btn-warning ml-2"
                    onClick={() => toggleCreateOrganizationModal()}
                  >
                    Add task list
                    <i className="ml-2 now-ui-icons design_bullet-list-67" />
                  </Button>
                  <Button
                    className="btn btn-success ml-2"
                    onClick={() => toggleCreateOrganizationModal()}
                  >
                    Add task
                    <i className="ml-2 now-ui-icons ui-1_simple-add" />
                  </Button>
                </Col>
              </Row>
            </CardHeader>
          </Card>
        </Row>
        <Row>
        {taskLists.length > 0 && taskLists.map((taskList, index) => (
            <Col key={taskList.id} xs={12} md={5} lg={5} className="ml-5">
                <Card className="card-tasks">
                    <CardHeader>
                        <h5 className="card-category">{taskList.label}</h5>
                        <CardTitle tag="h4">{taskList.label}</CardTitle>
                    </CardHeader>
                    <CardBody>
                        <div className="table-full-width table-responsive">
                        <Table>
                            <tbody>
                            {tasks
                                .filter((task) => task.task_list_id === taskList.id)
                                .map((task) => (
                                <tr key={task.id}>
                                    <td style={{ width: '2px' }}>
                                    <FormGroup check>
                                        <Label check>
                                        <Input defaultChecked type="checkbox" />
                                        <span className="form-check-sign" />
                                        </Label>
                                    </FormGroup>
                                    </td>
                                    <td className="text-left">{task.name}</td>
                                    <td className="td-actions text-right" style={{ width: '100px' }}>
                                    <Row>
                                        <Col sm="12" md="2">
                                        <Button
                                            className="btn-round btn-icon btn-icon-mini btn-neutral"
                                            color="warning"
                                            type="button"
                                            id={`tooltip-${task.id}-1`}
                                        >
                                            <i className="now-ui-icons users_circle-08" />
                                        </Button>
                                        <UncontrolledTooltip
                                            delay={0}
                                            target={`tooltip-${task.id}-1`}
                                        >
                                            This task is yours!
                                        </UncontrolledTooltip>
                                        </Col>
                                        <Col sm="12" md="2">
                                        <Button
                                            className="btn-round btn-icon btn-icon-mini btn-neutral"
                                            color="info"
                                            type="button"
                                            id={`tooltip-${task.id}-2`}
                                        >
                                            <i className="now-ui-icons travel_info" />
                                        </Button>
                                        <UncontrolledTooltip
                                            delay={0}
                                            target={`tooltip-${task.id}-2`}
                                        >
                                            See more
                                        </UncontrolledTooltip>
                                        </Col>
                                        <Col sm="12" md="2">
                                        <Button
                                            className="btn-round btn-icon btn-icon-mini btn-neutral"
                                            color="danger"
                                            type="button"
                                            id={`tooltip-${task.id}-3`}
                                        >
                                            <i className="now-ui-icons ui-1_simple-remove" />
                                        </Button>
                                        <UncontrolledTooltip
                                            delay={0}
                                            target={`tooltip-${task.id}-3`}
                                        >
                                            Edit Task
                                        </UncontrolledTooltip>
                                        </Col>
                                    </Row>
                                    </td>
                                </tr>
                                ))}
                            </tbody>
                        </Table>
                        </div>
                    </CardBody>
                    <CardFooter>
                        <hr />
                        <div className="stats">
                        <i className="now-ui-icons loader_refresh" /> Updated {(taskList.updated_at)} ago
                        </div>
                    </CardFooter>
                </Card>
            </Col>
        ))}
        </Row>

        <Row>
          <Col xs={12} md={6}></Col>
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

export default TaskList;
