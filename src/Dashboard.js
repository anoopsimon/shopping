import { Button, Card, Row, Container, Col } from "react-bootstrap";
import React,{useEffect,useState } from "react";
import { getUser, removeUserSession,updateCart,getCart } from "./Utils/Common";
import axios from 'axios';
import PrettyRating from "pretty-rating-react";
import {
  faHeart,
  faHeartBroken,
  faStar,
  faStarHalfAlt,
} from "@fortawesome/free-solid-svg-icons";

const icons = {
  star: {
    complete: faStar,
    half: faStarHalfAlt,
    empty: faStar,
  },
  heart: {
    complete: faHeart,
    half: faHeartBroken,
    empty: faHeart,
  },
};

const colors = {
 star: ['#dcbb02', '#dcbb02', '#dcbb02'],
 heart: ['#9b111e', '#a83f39'],
};

function Dashboard(props) {
  const user = getUser();
  const [products, setproducts] = useState([])  ;
  const [cartCount, setCartCount] = useState(0)  ;
  
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

  const addToCart = (count) => {
    updateCart(count);
    //setCartCount(getCart());
  };

 
  return (
    <div>
      Welcome {user}!
      

      <Button onClick={handleLogout} value="Logout">
        {" "}
        Logout{" "}
      </Button>
      <Button style={{marginLeft:'90%'}}> Cart {getCart()} </Button>

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
                <PrettyRating  rating={product.rating} icons={icons.star} setColors='{colors.star}' />
                <Card.Text style={{color:'green'}}>
                  {product?.price} AUD
                </Card.Text>
                <Button onClick={addToCart(1)} variant="primary">Add to cart</Button>
              </Card.Body>
            </Card>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default Dashboard;
