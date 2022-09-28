import { useContext, useState } from "react";
import { createContext } from 'react';
import "../index.css";
import React from "react";
import ReactDOM from "react-dom";
import { AccountContext } from './Account';
import './HomePage';
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";
import { UserAgent } from "amazon-cognito-identity-js";



function Login(pops) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  const { authenticate } = useContext(AccountContext);

  const onSubmit = (e) => {
    e.preventDefault();
    authenticate(username, password)
      .then((data) => {
        console.log(data);
        
        alert(" You are succesfully logged in");
        window.location.href = "/homepage";
        
        // window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        alert("Sorry, Please enter correct information ");
        window.location.reload();
      });
  };

  return (
    <>
      <div className="loginFormcss">
        <Container>
          <div className="header-body text-center mb-7">
            <Row className="justify-content-center">
              <Col lg="5" md="7" className="colcss">
                <Card className="bg-secondary shadow border-0">
                  <CardHeader className="bg-transparent">
                    <div className="text-muted text-center mt-2 mb-3">
                    <p className="text-lead text-light wel-text-color">
                      <h3>  Please Sign in  </h3>
                      </p>
                    </div>
                  </CardHeader>
                  <CardBody className="px-lg-5 py-lg-5 text-center">
                    <Form
                      role="form"
                      className="my-5"
                      style={{
                        height: "20rem",
                      }}
                    >
                      <FormGroup className="mb-4">
                        <InputGroup className="input-group-alternative">
                          <Input
                            bsSize="lg"
                            placeholder="User"
                            type="user"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            autoComplete="new-email"
                          />
                        </InputGroup>
                      </FormGroup>
                      <FormGroup>
                        <InputGroup className="input-group-alternative">
                          <Input
                            bsSize="lg"
                            placeholder="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="new-password"
                          />
                        </InputGroup>
                      </FormGroup>
  
                      <div className="text-center">
                        <Button
                          className="my-4 btncss"
                          color="primary"
                          type="button"
                          onClick={onSubmit}      
                          >
                         
                          <p className="text-lead text-light wel-text-color">
                          Sign in
                          </p>
                          
                        </Button>
                      </div>
                    </Form>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
}


export default Login;


{
  /* <div>
      <>
        <div className="loginFormcss">
          <Container>
            <div className="header-body text-center mb-7">
              <Row className="justify-content-center">
                <Col lg="5" md="7" className="colcss">
                  <Card className="bg-secondary shadow border-0">
                    <CardHeader className="bg-transparent">
                      <div className="text-muted text-center mt-2 mb-3">
                        <h3>Sign in Email</h3>
                      </div>
                    </CardHeader>
                    <CardBody className="px-lg-5 py-lg-5 text-center">
                      <form onSubmit={onSubmit}>
                        Username:
                        <FormGroup className="mb-4">
                          <InputGroup className="input-group-alternative">
                            <input
                              placeholder="User"
                              type="text"
                              value={username}
                              onChange={(e) => setUsername(e.target.value)}
                            />
                          </InputGroup>
                        </FormGroup>
                        <br />
                        Password:
                        <FormGroup>
                          <InputGroup className="input-group-alternative">
                            <input
                              placeholder="Password"
                              type="password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                            />
                          </InputGroup>
                        </FormGroup>
                        <br />
                        <div className="text-center">
                          <button
                            className="my-4 btncss"
                            color="primary"
                            type="submit"
                          >
                            Login
                          </button>
                        </div>
                      </form>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </div>
          </Container>
        </div>
      </>
    </div> */
}
