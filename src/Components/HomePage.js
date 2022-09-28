import React, { useState } from "react";
import AWS from "aws-sdk";

import styled from "styled-components";
import ReactDOM from "react-dom";
import "../index.css";



import {
  Navbar,
  NavbarBrand,
  Row,
  Container,
  Col,
  Progress,
  Alert,
} from "reactstrap";
/* This example adds a new item to the Music table. */
import { ConfigurationOptions } from "aws-sdk";
import UploadFile from "../uploadFile";
import Login from "./Login";




const configuration: ConfigurationOptions = {
  region: "us-east-1",
  secretAccessKey: "4jTVOHMucCBdTxy3AvuhrJ/2tOMa0PkmtAeB3QRK",
  accessKeyId: "AKIA3KAA6KDAWGTVBE5S",
};

AWS.config.update(configuration);
var dynamodb = new AWS.DynamoDB();

const S3_BUCKET = "testwittgenbucket";

var fileID, fileName, fileModifiedDate, fileSize, fileType;

const theme = {
  blue: {
    default: "#3f51b5",
    hover: "#283593",
  },
};

const Button = styled.button`
  background-color: ${(props) => theme[props.theme].default};

  color: white;
  display: flex;
  justifycontent: Center;
  aligncontent: Center;
  border-radius: 5px;
  outline: 0;
  text-transform: uppercase;
  margin: 100x 500px;
  cursor: pointer;
  box-shadow: 0px 2px 2px lightgray;
  transition: ease background-color 250ms;
  &:hover {
    background-color: ${(props) => theme[props.theme].hover};
  }
  &:disabled {
    cursor: default;
    opacity: 0.7;
  }
`;

Button.defaultProps = {
  theme: "blue",
};

const myBucket = new AWS.S3({
  params: { Bucket: S3_BUCKET },
});

function ErrorHandler({ error }) {
  return (
    <div role="alert">
      <p>An error occurred:</p>
      <pre>{error.message}</pre>
    </div>
  );
}

const UploadImageToS3WithNativeSdk = () => {
  const [progress, setProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);

  try {
    const handleFileInput = (e) => {
      console.log(e?.target?.files[0]);
      setSelectedFile(e.target.files[0]);
    };

    const getStringValue = (value) => {
      if (typeof value == "number") {
        return "" + value + "";
      }
      return value;
    };

    const uploadFile = (file) => {
      const params = {
        ACL: "public-read",
        Body: file,
        Bucket: S3_BUCKET,
        Key: file.name,
      };

      myBucket
        .putObject(params)
        .on("httpUploadProgress", (evt) => {
          setProgress(Math.round((evt.loaded / evt.total) * 100));
        })
        .send((err) => {
          if (err) console.log(err);

          ////////////////////////////////////////////////
          fileID = Math.floor(Math.random() * 100);
          fileName = file.name;
          fileSize = file.size / 1000 + "kB";
          fileModifiedDate = file.lastModifiedDate;
          fileType = file.type;

          // var OB = {
          fileID: getStringValue(fileID);
          fileModifiedDate: getStringValue(
            new Date(fileModifiedDate).toISOString()
          );
          fileName: getStringValue(fileName);
          fileSize: getStringValue(fileSize);
          fileType: getStringValue(fileType);
          //};
          //console.log(OB);
          //});
          // };

          var params = {
            Item: {
              fileID: {
                S: "" + fileID + "",
                //S: "Somewhat Famous"
              },
              fileModifiedDate: {
                S: "" + fileModifiedDate + "",
                //S: "No One You Know"
              },
              fileName: {
                S: "" + fileName + "",
                //S: "Call Me Today"
              },
              fileSize: {
                S: "" + fileSize + "",
                //S: "Call Me Today"
              },
              fileType: {
                S: "" + fileType + "",
                //S: "Call Me Today"
              },
            },
            ReturnConsumedCapacity: "TOTAL",
            TableName: "WittgenDemoTable",
          };

          dynamodb.putItem(params, function (err, data) {
            if (err) console.log(err, err.stack); // an error occurred
            else console.log(data); // successful response
            /*

  data = {
   ConsumedCapacity: {
    CapacityUnits: 1, 
    TableName: "Music"
   }
  }
  */
          });
        });
    };

    
    
    return (
      <div className="myscreen">
        {/* <img
            alt="logo"
            src={require("./assets/img/WittGen_Logo.png")}
            style={{
              height: 40,
              width: 40,
              marginRight: 10,
            }}
          />
         
          WittGen Biotechnologies */}
        <Navbar className="my-2" color="dark" dark>
          <NavbarBrand>
            <img
              alt="logo"
              src={require("./assets/img/WittGen_Logo.png")}
              style={{
                height: 40,
                width: 40,
                marginRight: 10,
              }}
            />
            WittGen Biotechnologies
          </NavbarBrand>
        </Navbar>

       

        <Container>
          <div className="header-body text-center mb-7">
            <Row className="justify-content-center">
              <Col lg="5" md="6">
                <h1 className="text-white wel-text-color">  Welcome!</h1>
                <p className="text-lead text-light wel-text-color">
                  Use these awesome file upload feature
                </p>
              </Col>
            </Row>
            {progress > 0 && progress != 100 && (
              <Progress animated className="my-3" value={progress}>
                {progress}%
              </Progress>
            )}
            <Alert isOpen={progress == 100} color="info">
              <h4 className="alert-heading">Successful Upload!</h4>
              <p>
              Well Done! yeah, you have successfully uploaded the content.  
              </p>
              <hr />
              </Alert>
            <UploadFile
              uploadFile={() => uploadFile(selectedFile)}
              handleFileInput={handleFileInput}
              selectedFile={selectedFile}
            />
          </div>
        </Container>
      </div>
    );
  } catch (error) {
    return <ErrorHandler error={error} />;
  }
};

export default UploadImageToS3WithNativeSdk;
