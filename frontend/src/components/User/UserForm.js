import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import PanelHeader from "components/PanelHeader/PanelHeader.js";
import { fetchUsers, createUser, updateUser } from '../../stores/userStore';
import { fetchOrganizations } from '../../stores/organizationStore';
import { fetchAccessLevels } from '../../stores/accessLevelStore';
import NotificationAlert from "react-notification-alert";
import { notificationSettings } from "notify";
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
} from "reactstrap";

function UserForm({create}) {
  const location = useLocation();
  const { user } = location.state ? location.state : {};

  const [organizations, setOrganizations] = useState([]);
  const [accessLevels, setAccessLevels] = useState([]);
  const [organizationId, setOrganizationId] = useState(user ? user.organization_id : "");
  const [accessLevelId, setAccessLevelId] = useState(user ? user.access_level_id : "");
  const [passwordError, setPasswordError] = useState("");
  const [password, setPassword] = useState(user ? user.password : "");
  const [isSavable, setIsSavable] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(user ? user.confirmPassword : "");
  const notificationAlert = React.useRef();
  const navigate = useNavigate();

  useEffect(() => {
    checkIfIsSavable();
    fetchOrganizations(setOrganizations);
    fetchAccessLevels(setAccessLevels);
  }, [password, confirmPassword]);

  const checkIfIsSavable = () => {
    setIsSavable(updatePasswordError());
  };

  const notify = (message, type, icon = "ui-1_bell-53") => {
    const options = notificationSettings(message, type, icon);
    notificationAlert.current.notificationAlert(options);    
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

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSaveProfile = async () => {
    const userData = {
      first_name: document.getElementById("first_name").value,
      last_name: document.getElementById("last_name").value,
      nickname: document.getElementById("nickname").value,
      username: document.getElementById("username").value,
      email: document.getElementById("email").value,
      address: document.getElementById("address").value,
      city: document.getElementById("city").value,
      country: document.getElementById("country").value,
      organization_id: document.getElementById("organization").value,
      access_level_id: document.getElementById("access_level").value,
      password: password,
    };

    try {
      console.log(create)
      if (create) {
        await createUser(userData);
      } else {
        userData.id = user.id;
        await updateUser(userData);
      }

      notify('The profile was saved successfully', 'success');

      setTimeout(() => {
        navigate('/admin/users');
      }, 3000);

    } catch (error) {
      notify('Error: ' + error.response.data.message, 'danger');
    }
  };

  return (
    <>
      <NotificationAlert ref={notificationAlert} />
      <PanelHeader size="sm" />
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <h5 className="title">{create ? "Add " : "Edit "} User</h5>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row>
                    <Col className="pr-1" md="4">
                      <FormGroup>
                        <label>First Name*</label>
                        <Input
                          id="first_name"
                          required
                          defaultValue={user ? user.first_name : ""}
                          placeholder="First name"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pr-1" md="4">
                      <FormGroup>
                        <label>Last Name*</label>
                        <Input
                          id="last_name"
                          required
                          defaultValue={user ? user.last_name : ""}
                          placeholder="Last Name"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup>
                        <label>Nickname*</label>
                        <Input
                          id="nickname"
                          required
                          defaultValue={user ? user.nickname : ""}
                          placeholder="How do you wanna be called?"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="6">
                      <FormGroup>
                        <label>Username*</label>
                        <Input
                          id="username"
                          required
                          defaultValue={user ? user.username : ""}
                          placeholder="Letters, numbers and symbols allowed"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <label htmlFor="exampleInputEmail1">
                          Email address*
                        </label>
                        <Input
                          id="email"
                          required
                          defaultValue={user ? user.email : ""} 
                          placeholder="example@example.com" 
                          type="email" 
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6">
                      <FormGroup>
                        <label>Organization*</label>
                        <select
                          id="organization"
                          required
                          value={organizationId}
                          onChange={(e) => setOrganizationId(e.target.value)}
                          className="form-control"
                        >
                          <option value="" disabled>Select an organization</option>
                          {organizations.map((organization) => (
                            <option key={organization.id} value={organization.id}>
                              {organization.name}
                            </option>
                          ))}
                        </select>
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <label>Access level*</label>
                        <select
                          id="access_level"
                          required
                          value={accessLevelId}
                          onChange={(e) => setAccessLevelId(e.target.value)}
                          className="form-control"
                        >
                          <option value="" disabled>Select an access level</option>
                          {accessLevels.map((access_level) => (
                            <option key={access_level.id} value={access_level.id}>
                              {access_level.name}
                            </option>
                          ))}
                        </select>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <label>Address</label>
                        <Input
                          id="address"
                          defaultValue={user ? user.address : ""}
                          placeholder="Home Address"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="6">
                      <FormGroup>
                        <label>City</label>
                        <Input
                          id="city"
                          defaultValue={user ? user.city : ""}
                          placeholder="City"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <label>Country</label>
                        <Input
                          id="country"
                          defaultValue={user ? user.country : ""}
                          placeholder="Country"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="6">
                      <FormGroup>
                        <label>Password*</label>
                        <Input
                          id="password"
                          value={password}
                          placeholder="Password"
                          type="password"
                          autoComplete="new-password"
                          onChange={handlePasswordChange}
                        />
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <label>Confirm password*</label>
                        <Input
                          value={confirmPassword}
                          placeholder="Confirm password"
                          type="password"
                          onChange={handleConfirmPasswordChange}
                        />
                        {passwordError && <p className="error-message ml-1">{passwordError}</p>}
                      </FormGroup>
                    </Col>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row className="justify-content-end mr-1">
          <Button
            className="btn-round btn-neutral mr-2"
            color="warning"
            id="update-password"
            type="button"
          >
            Update password
          </Button>
          <Button
            className="btn-round btn-neutral"
            color="success"
            id="update-password"
            type="button"
            disabled={!isSavable}
            onClick={handleSaveProfile}
          >
            Save profile
          </Button>
        </Row>
      </div>
    </>
  );
}

UserForm.propTypes = {
  create: PropTypes.bool.isRequired,
};

export default UserForm;
