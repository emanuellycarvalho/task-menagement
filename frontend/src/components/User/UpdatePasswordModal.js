import React, { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from "reactstrap";

const UpdatePasswordModal = ({ isOpen, toggle, handleUpdatePassword }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    updatePasswordError();
  }, [password, confirmPassword]);

  const handleOldPasswordChange = (e) => {
    setOldPassword(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    updatePasswordError();
  };

  const updatePasswordError = () => {
    if (password !== confirmPassword) {
      setPasswordError("Passwords don't match");
      return false;
    } else {
      setPasswordError("");
      return true;
    }
  };

  const handleSave = () => {
    if (updatePasswordError()) {
      handleUpdatePassword(oldPassword, password);
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Update Password</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for="oldPassword">Old Password</Label>
            <Input
              type="password"
              id="oldPassword"
              value={oldPassword}
              onChange={handleOldPasswordChange}
              autoComplete="current-password"
            />
          </FormGroup>
          <FormGroup>
            <Label for="password">New Password</Label>
            <Input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              autoComplete="new-password"
            />
          </FormGroup>
          <FormGroup>
            <Label for="confirmPassword">Confirm Password</Label>
            <Input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
            <p className="error-message">{passwordError}</p>
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button
         className="btn btn-sm"
         color="info" 
         onClick={handleSave}
        >
          Save
        </Button>{" "}
        <Button
         className="btn btn-sm"
         color="secondary" 
         onClick={toggle}
        >
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default UpdatePasswordModal;
