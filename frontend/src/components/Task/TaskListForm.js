import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { createTaskList } from 'stores/taskListStore'; 

const TaskListForm = ({ isOpen, toggle }) => {
  const [label, setLabel] = useState('');

  const handleCreateTaskList = async ({ label }) => {
    try {
      await createTaskList({ label });
      notify('Task List created successfully', 'success');
      toggle();
    } catch (error) {
      notify('Error: ' + error.response.data.message, 'danger');
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Create Task List</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for="label">Label</Label>
            <Input type="text" id="label" value={label} onChange={(e) => setLabel(e.target.value)} />
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="info" className="btn-sm" onClick={handleCreateTaskList}>
          Create
        </Button>
        <Button color="secondary" className="btn-sm" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default TaskListForm;
