import React from "react";
import PropTypes from 'prop-types';
import {
  FormGroup,
  Form,
  Input,
  Row,
  Col,
} from "reactstrap";

function OrganizationForm({organization, create}) {
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
                    defaultValue={organization ? organization.name : ""}
                    placeholder="Name"
                    type="text"
                  />
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <label>Category</label>
                  <Input
                    required
                    defaultValue={organization ? organization.category : ""}
                    placeholder="Category"
                    type="text"
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col className="pr-1" md="6">
                <FormGroup>
                  <label htmlFor="exampleInputEmail1">
                    Email address*
                  </label>
                  <Input
                    required
                    defaultValue={organization ? organization.email : ""} 
                    placeholder="example@example.com" 
                    type="email" 
                  />
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <label>Address</label>
                  <Input
                    defaultValue={organization ? organization.address : ""}
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
                    defaultValue={organization ? organization.city : ""}
                    placeholder="City"
                    type="text"
                  />
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <label>Country</label>
                  <Input
                    defaultValue={organization ? organization.country : ""}
                    placeholder="Country"
                    type="text"
                  />
                </FormGroup>
              </Col>
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
};

export default OrganizationForm;
