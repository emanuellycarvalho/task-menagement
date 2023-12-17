import React from 'react';
import PropTypes from "prop-types";
import {
  Modal,
  ModalHeader,
  ModalBody,
  Row,
  Col,
} from 'reactstrap';

const OrganizationModal = ({ isOpen, toggle, organization }) => {
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>{organization ? organization.name : ''}</ModalHeader>
      <ModalBody>
        {organization && (
            <Row>
            <Col md="6">
                <p><strong>Category:</strong> {organization ? organization.category : ''}</p>
                <p><strong>Email:</strong> {organization ? organization.email : ''}</p>
            </Col>
            <Col md="6">
                <p><strong>Address:</strong> {organization.address || 'N/A'}</p>
                <p><strong>City:</strong> {organization.city || 'N/A'}</p>
                <p><strong>Country:</strong> {organization.country || 'N/A'}</p>
            </Col>
            </Row>
        )}
      </ModalBody>
    </Modal>
  );
};

OrganizationModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.bool.isRequired,
  organization: PropTypes.object.isRequired,
};

export default OrganizationModal;
