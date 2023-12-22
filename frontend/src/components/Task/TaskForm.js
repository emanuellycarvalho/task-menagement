import React, { useState, useEffect } from 'react';
import { Button, Modal, Row, Col, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { createTask } from 'stores/taskStore'; 
import { fetchUsers } from 'stores/userStore';
import { fetchTaskLists } from 'stores/taskListStore';
import NotificationAlert from "react-notification-alert";
import { notificationSettings } from 'boot/notify';

const TaskForm = ({ isOpen, toggle }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [assigned_id, setAssignedId] = useState(null);
  const [task_list_id, setTaskListId] = useState(null);
  const [users, setUsers] = useState([]);
  const [taskLists, setTaskLists] = useState([]);
  const [assignedDropdownOpen, setAssignedDropdownOpen] = useState(false);
  const [taskListDropdownOpen, setTaskListDropdownOpen] = useState(false);
  const notificationAlert = React.useRef();

  useEffect(() => {
    fetchUsers(setUsers);
    fetchTaskLists(setTaskLists);
  }, []);

  const handleToggleAssignedDropdown = () => setAssignedDropdownOpen((prevState) => !prevState);
  const handleToggleTaskListDropdown = () => setTaskListDropdownOpen((prevState) => !prevState);

  const notify = (message, type, icon = 'ui-1_bell-53') => {
    const options = notificationSettings(message, type, icon);
    notificationAlert.current.notificationAlert(options);
  };

  const handleCreateTask = async () => {
    const taskData = {
      name,
      description,
      assigned_id,
      task_list_id,
    };
  
    try {
      await createTask(taskData);
      notify('Task created successfully', 'success');
      fetchTaskLists(setTaskLists);
      setTimeout(() => {
        toggle();
      }, 3000);
    } catch (error) {
      notify('Error: ' + error.response.data.message, 'danger');
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <NotificationAlert ref={notificationAlert} />
      <ModalHeader toggle={toggle}>Create Task</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for="name">Name*</Label>
            <Input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
          </FormGroup>
          <FormGroup>
            <Label for="description">Description</Label>
            <Input type="textarea" id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
          </FormGroup>
          <Row>
            <Col md="6" sm="12">
              <FormGroup>
                <Label for="assigned">Assigned*</Label>
                <Dropdown isOpen={assignedDropdownOpen} toggle={handleToggleAssignedDropdown}>
                  <DropdownToggle caret>
                    {assigned_id ? users.find((user) => user.id === assigned_id).name : 'Select Assigned'}
                  </DropdownToggle>
                  <DropdownMenu>
                    {users.map((user) => (
                      <DropdownItem key={user.id} onClick={() => setAssignedId(user.id)}>
                        {user.name}
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </Dropdown>
              </FormGroup>
            </Col>
            <Col md="6" sm="12">
              <FormGroup>
                <Label for="taskList">Task List*</Label>
                <Dropdown isOpen={taskListDropdownOpen} toggle={handleToggleTaskListDropdown}>
                  <DropdownToggle caret>
                    {task_list_id ? taskLists.find((taskList) => taskList.id === task_list_id).label : 'Select Task List'}
                  </DropdownToggle>
                  <DropdownMenu>
                    {taskLists.map((taskList) => (
                      <DropdownItem key={taskList.id} onClick={() => setTaskListId(taskList.id)}>
                        {taskList.label}
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </Dropdown>
              </FormGroup>
            </Col>
          </Row>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="info" className="btn-sm" onClick={handleCreateTask}>
          Create Task
        </Button>
        <Button color="secondary" className="btn-sm" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default TaskForm;
