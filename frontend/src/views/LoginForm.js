import React, { useState } from "react";
import { Button, Card, CardBody, FormGroup, Form, Input, Row, Col } from "reactstrap";
import { loginUser } from 'stores/authStore'; 
import { useNavigate } from 'react-router-dom';
import PanelHeader from "components/PanelHeader/PanelHeader.js";

function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    try {
      await loginUser({ email, password });

      navigate('/dashboard');
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <>
        <PanelHeader size="sm" />
        <Row className="justify-content-center mt-5">
          <Col md="6" sm="12">
            <Card>
              <CardBody>
                <Form>
                  <FormGroup>
                    <label>Email</label>
                    <Input
                      id="email"
                      type="text"
                      defaultValue={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup>
                    <label>Password</label>
                    <Input
                      id="password"
                      type="password"
                      defaultValue={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </FormGroup>
                  {error && <p className="error-message">{error}</p>}
                  <Button color="success" onClick={handleLogin}>
                    Login
                  </Button>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
    </>
  );
}

export default LoginForm;
