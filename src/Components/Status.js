import { useContext, useEffect, useState } from "react";
import { AccountContext } from "./Account";
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

const Status = () => {
  const [status, setStatus] = useState(false);
  const { getSession, logout } = useContext(AccountContext);

  useEffect(() => {
    getSession()
      .then((session) => {
        console.log("Session: ", session);
        setStatus(true);
      })
      .catch((err) => {
        console.log("Session: ", err);
        setStatus(false);
      });
  }, [status]);

  return (
    <div>
      <div className="myscreen"></div>
      <Container>
        <div className="header-body text-center mb-7">
          <Row className="justify-content-center">
            <Col lg="5" md="7" className="shadow">
              <Card className="myscreen">
                <CardHeader className="bg-transparent">
                  <div className="text-muted text-center mt-2 mb-3">
                    {status ? (
                      <div>
                        {" "}
                        You are logged in.
                        <button onClick={logout}>Logout</button>
                      </div>
                    ) : (
                      "Please Login"
                    )}
                  </div>
                </CardHeader>
              </Card>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default Status;
