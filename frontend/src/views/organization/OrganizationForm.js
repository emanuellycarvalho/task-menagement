import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import {
  Button,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
} from "reactstrap";

function OrganizationForm({ organization, create, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    email: '',
    address: '',
    city: '',
    country: '',
  });

  useEffect(() => {
    if (!create) {
      setFormData({
        name: organization.name || '',
        category: organization.category || '',
        email: organization.email || '',
        address: organization.address || '',
        city: organization.city || '',
        country: organization.country || '',
      });
    }
  }, [organization]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onSave(formData);
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <div className="content">
      <Row>
        <Col md="12">
          <Form>
            <Row>
              <Col className="pr-1" md="6">
                <FormGroup>
                  <label>Name*</label>
                  <Input
                    required
                    defaultValue={!create ? formData.name : ""}
                    name="name"
                    placeholder="Name"
                    type="text"
                    onChange={handleInputChange}
                  />
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <label>Category</label>
                  <Input
                    required
                    defaultValue={!create ? formData.category : ""}
                    name="category"
                    placeholder="Category*"
                    type="text"
                    onChange={handleInputChange}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col className="pr-1" md="6">
                <FormGroup>
                  <label htmlFor="exampleInputEmail1">
                    Email*
                  </label>
                  <Input
                    required
                    defaultValue={!create ? formData.email : ""}
                    name="email"
                    placeholder="example@example.com"
                    type="email"
                    onChange={handleInputChange}
                  />
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <label>Address</label>
                  <Input
                    defaultValue={!create ? formData.address : ""}
                    name="address"
                    placeholder="Address"
                    type="text"
                    onChange={handleInputChange}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col className="pr-1" md="6">
                <FormGroup>
                  <label>City</label>
                  <Input
                    defaultValue={!create ? formData.city : ""}
                    name="city"
                    placeholder="City"
                    type="text"
                    onChange={handleInputChange}
                  />
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <label>Country</label>
                  <Input
                    defaultValue={!create ? formData.country : ""}
                    name="country"
                    placeholder="Country"
                    type="text"
                    onChange={handleInputChange}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row className="justify-content-end mr-1">
              <Button
                className="btn-sm"
                color="info"
                type="button"
                onClick={handleSave}
              >
                Save
              </Button>
              <Button
                className="btn-sm"
                color="secondary"
                type="button"
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </Row>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

OrganizationForm.propTypes = {
  organization: PropTypes.object,
  create: PropTypes.bool.isRequired,
  onSave: PropTypes.func,
  onCancel: PropTypes.func,
};

export default OrganizationForm;
