import React, { useState } from 'react';
import axios from 'axios';
import { setUserSession } from './Utils/Common';
import {Container,Row,Col,Button,Form} from 'react-bootstrap';
function Login(props) {
  const [loading, setLoading] = useState(false);
  const username = useFormInput('');
  const password = useFormInput('');
  const [error, setError] = useState(null);

  // handle button click of login form
  const handleLogin = () => {
    setError(null);
    setLoading(true);
    axios.post('http://localhost:4000/login', { email: username.value, password: password.value }).then(response => {
      setLoading(false);
      setUserSession(response.data.accessToken, username.value);
      props.history.push('/dashboard');
    }).catch(error => {
      setLoading(false);
      if (error.response?.status === 401) setError(error.response.data.message);
      else setError("Something went wrong. Please try again later. Looks like auth api is down..");
    });
  }

  return (
    <Container>
  <Row></Row>
  <Row></Row><Row></Row>
  <Row>
  <Col></Col>
    <Col>
    <div style={{marginLeft:'auto',marginRight:'auto'}}>
      Login<br /><br />
      <div>
        <Form.Label>Email address</Form.Label>
        <Form.Control {...username} type="email" placeholder="password.." />
      </div>
      <div style={{ marginTop: 10 }}>
          <Form.Label>Password</Form.Label>
        <Form.Control {...password} type="password" placeholder="password.." />

      </div>
      {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
      <Button value={loading ? 'Loading...' : 'Login'} onClick={handleLogin} disabled={loading} > Login</Button><br />
    </div>
    </Col>
    <Col></Col>
  </Row>
</Container>

    
  );
}

const useFormInput = initialValue => {
  const [value, setValue] = useState(initialValue);

  const handleChange = e => {
    setValue(e.target.value);
  }
  return {
    value,
    onChange: handleChange
  }
}

export default Login;