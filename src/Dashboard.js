import { Button, Card, Row, Container, Col } from "react-bootstrap";
import React from "react";
import { getUser, removeUserSession } from "./Utils/Common";

function Dashboard(props) {
  const user = getUser();
  let products = [1, 1, 1, 1, 1];

  // handle click event of logout button
  const handleLogout = () => {
    removeUserSession();
    props.history.push("/login");
  };

  return (
    <div>
      Welcome {user}!
      <Button onClick={handleLogout} value="Logout">
        {" "}
        Logout{" "}
      </Button>
      <Container fluid style={{paddingLeft: '2px', paddingRight: '20px'}}>
        <Row md={4}>
          {products.map((x, key) => (
            <Card style={{ width: "18rem" }}>
              <Card.Img
                variant="top"
                src="https://picsum.photos/200"
              />
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
            </Card>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default Dashboard;
