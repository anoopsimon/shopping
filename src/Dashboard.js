import { Button, Card, Row, Container, Col } from "react-bootstrap";
import React,{useEffect,useState } from "react";
import { getUser, removeUserSession } from "./Utils/Common";
import axios from 'axios';


function Dashboard(props) {
  const user = getUser();
  const [products, setproducts] = useState([])  ;
  
  useEffect(()=> {
  axios.get('http://localhost:4000/products').then(response => 
  {   
    console.log('??' + response.data[0].name)  
    setproducts(response.data);
  }).catch(error => {
    if (error.response?.status === 200)
    console.log('Failed to get products');
    
  })
}, []);

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
      <Container fluid>
        <Row md={4}>
          {products.map((product, key) => (
            <Card key={key} style={{ width: "15rem",marginLeft: '50px',marginTop:'20px'}}>
              <Card.Img
                variant="top"
                src={product.image}
              />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>
                  {product?.description}
                </Card.Text>
                <Button variant="primary">Add to cart</Button>
              </Card.Body>
            </Card>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default Dashboard;
