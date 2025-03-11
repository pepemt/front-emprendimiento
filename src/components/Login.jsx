import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/login.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://10.48.126.190:8000/db/sign_up', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ correo: email, contrasena: password }),
      });

      if (!response.ok) {
        throw new Error('Usuario no encontrado');
      }

      const data = await response.json();
      console.log('IdUsuario:', data.IdUsuario);
      localStorage.setItem('IdUsuario', data.IdUsuario); 
      navigate('/cardlist');
    } catch (error) {
      console.error('Error:', error);
      alert('Error al iniciar sesión: ' + error.message);
    }
  };

  return (
    <Card style={{ width: '24rem', margin: 'auto', marginTop: '5vh', padding: 0 }}>
      <Card.Img variant="top" src="/assets/background-login.jpg" />
      <Card.Body>
        <Card.Title className="text-center">Login</Card.Title>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email:</Form.Label>
            <Form.Control 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </Form.Group>
          
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password:</Form.Label>
            <Form.Control 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100">Login</Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default Login;
