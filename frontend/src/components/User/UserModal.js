import React from 'react';
import PropTypes from "prop-types";
import {
  Modal,
  ModalHeader,
  ModalBody,
  Row,
  Col,
} from 'reactstrap';

const UserModal = ({ isOpen, toggle, user }) => {
    return (
        <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>{user ? user.name + ' (' + user.nickname + ')': ''} </ModalHeader>
        <ModalBody>
            {user && (
                <Row>
                    <Col md="6">
                        <p><strong>Access Level:</strong> {user.access_level ? user.access_level.name : ''}</p>
                        <p><strong>Email:</strong> {user ? user.email : ''}</p>
                    </Col>
                    <Col md="6">
                        <p><strong>Address:</strong> {user.address || 'N/A'}</p>
                        <p><strong>City:</strong> {user.city || 'N/A'}</p>
                        <p><strong>Country:</strong> {user.country || 'N/A'}</p>
                    </Col>
                </Row>
            )}
        </ModalBody>
        </Modal>
    );
};

UserModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    toggle: PropTypes.func.isRequired,
    user: PropTypes.object,
};

export default UserModal;
