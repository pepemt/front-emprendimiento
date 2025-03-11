import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';

function ProductCard({ IdProducto, Nombre, Modelo, IdUsuario, image }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/details/${IdProducto}`);
  };

  return (
    
    <Card style={{ width: '18rem', height: "20rem"}} onClick={handleClick}>
      <Card.Header>{Nombre}</Card.Header>
      <Card.Img variant="top" src={image} onError={(e) => e.target.src = "/assets/default.jpg"} />
      <Card.Body>
        <Card.Text>ID Producto: {IdProducto}</Card.Text>
        <Card.Text>ID Usuario: {IdUsuario}</Card.Text>
      </Card.Body>
      <Card.Footer>
        <small className="text-muted">Last updated 3 mins ago</small>
      </Card.Footer>
    </Card>

  );
}

export default ProductCard;
