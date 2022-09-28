/*!

=========================================================
* Argon Dashboard React - v1.2.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

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

const fileUpload = (props) => {
  return (
    <>
      <Row className="justify-content-center">
        <Col lg="8" md="9">
          <Card className="bg-secondary shadow border-0">
            <CardBody className="px-lg-5 py-lg-5">
              <Form role="form">
                <div class="container">
                  <div className="inputCssStyle">
                    <div>
                      <i
                        class="fa fa-cloud-upload fa-5x"
                        aria-hidden="true"
                      ></i>
                      <h3>
                      <p className="text-lead text-light wel-text-color">
                        {props?.selectedFile?.name
                          ? props?.selectedFile?.name
                          : "Select the File"}
                          </p>
                      </h3>
                    </div>
                    <input
                      type="file"
                      onChange={props?.handleFileInput}
                      class="hide_file"
                    />
                  </div>
                </div>
                <div className="text-center">
                  <div className="btnCss">
                  <a
                      href="# "
                      className="btn btn-primary active btnCssClass"
                      role="button"
                      data-bs-toggle="button"
                      aria-pressed="true"
                      onClick={() => props?.uploadFile()}
                    >
                      <i
                        class="fa fa-cloud-upload fa-2x"
                        aria-hidden="true"
                      ></i>
                      {"  "}
                      <h4>Upload to Cloud</h4>
                    </a>
                  </div>
                </div>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default fileUpload;
