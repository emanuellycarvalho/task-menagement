import React, { useEffect, useState } from 'react';
import NotificationAlert from "react-notification-alert";
import { notificationSettings } from "../../boot/notify";
import { Link } from "react-router-dom";
import { fetchUsers, deleteUser } from '../../stores/userStore';
import { useNavigate } from 'react-router-dom';
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
import UserModal from "components/User/UserModal.js";

function UserList() {
  const [createUserModal, setCreateUserModal] = useState(false);
  const [editUserModal, setEditUserModal] = useState(false);
  const [viewUserModal, setViewUserModal] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);
  const [userToView, setUserToView] = useState(null);
  const [users, setUsers] = useState([]);
  const notificationAlert = React.useRef();
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers(setUsers);
  }, []);

  const handleEditUser = (user) => {
    navigate(`/admin/user/${user.id}/edit`, { state: { user } });
  };

  const toggleViewUserModal = (user) => {
    setUserToView(user);
    setViewUserModal(!viewUserModal);
  };

  const toggleEditUserModal = (user) => {
    setUserToEdit(user);
    setEditUserModal(!editUserModal);
  };

  const toggleCreateUserModal = () => {
    setCreateUserModal(!createUserModal);
  };
  
  const notify = (message, type, icon = "ui-1_bell-53") => {
    const options = notificationSettings(message, type, icon);
    notificationAlert.current.notificationAlert(options);    
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')){
      try {
        await deleteUser(userId);
        fetchUsers(setUsers);
        notify('User deleted successfully', 'success');
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
                  <CardTitle tag="h4">Users</CardTitle>
                  <Col className="mr-2" align="right">
                    <Link 
                      to={'/admin/user/add'} 
                      className="btn btn-info ml-2"
                    >
                      New
                      <i className="ml-2 now-ui-icons ui-1_simple-add"/>
                    </Link>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
              <Table responsive>
                <thead className="text-primary">
                  <tr>
                    <th>Name</th>
                    <th>Access level</th>
                    <th>Organization</th>
                    <th className="text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, key) => (
                    <tr key={key}>
                      <td>{user.name} ({user.nickname})</td>
                      <td>{user.access_level ? user.access_level.name : 'None'}</td>
                      <td>{user.organization ? user.organization.name : 'Deleted'}</td>
                      <td className="text-right">
                      <Button 
                        className="btn-sm" 
                        color="primary" 
                        onClick={() => toggleViewUserModal(user)}
                      >
                        View
                      </Button>
                      <Button
                        className="btn btn-sm btn-info ml-1"
                        onClick={() => handleEditUser(user)}
                      >
                        Edit
                      </Button>
                      <Button
                        className="btn-sm ml-1"
                        color="danger"
                        type="button"
                        onClick={() => handleDeleteUser(user.id)}
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

        <UserModal
          isOpen={viewUserModal} 
          toggle={toggleViewUserModal}
          user={userToView}
        />
      </div>
    </>
  );
}

export default UserList;
