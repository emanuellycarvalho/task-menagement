/*!

=========================================================
* Now UI Dashboard React - v1.5.2
=========================================================

* Product Page: https://www.creative-tim.com/product/now-ui-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/now-ui-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";

// reactstrap components
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

// core components
import PanelHeader from "components/PanelHeader/PanelHeader.js";

function User({user, create}) {
  return (
    <>
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
                          required
                          value={user !== null ? user.name : ""}
                          placeholder="First name"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pr-1" md="4">
                      <FormGroup>
                        <label>Last Name*</label>
                        <Input
                          required
                          value={user !== null ? user.lastname : ""}
                          placeholder="Last Name"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup>
                        <label>Nickname*</label>
                        <Input
                          required
                          value={user !== null ? user.nickname : ""}
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
                          required
                          value={user !== null ? user.username : ""}
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
                          required
                          value={user !== null ? user.email : ""} 
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
                        <Input
                          required
                          value={user !== null ? user.company : ""}
                          disabled
                          placeholder="Company"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pr-1" md="6">
                      <FormGroup>
                        <label>Address</label>
                        <Input
                          value={user !== null ? user.address : ""}
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
                          value={user !== null ? user.city : ""}
                          placeholder="City"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <label>Country</label>
                        <Input
                          value={user !== null ? user.country : ""}
                          placeholder="Country"
                          type="text"
                        />
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
            disabled
          >
            Save profile
          </Button>
        </Row>
      </div>
    </>
  );
}

export default User;
