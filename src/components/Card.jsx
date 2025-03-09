import React from 'react';
import { useNavigate } from 'react-router-dom';

function Card({ IdProducto, Nombre, Modelo, IdUsuario, image }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/details/${IdProducto}`);
  };

  return (
    <div className="card" onClick={handleClick}>
      <img src={image} alt={Nombre} className="card-image" onError={(e) => e.target.src = "/assets/default.jpg"} />
      <div className="card-details">
        <h3>{Nombre}</h3>
        <p>Modelo: {Modelo}</p>
        <p>ID Producto: {IdProducto}</p>
        <p>ID Usuario: {IdUsuario}</p>
      </div>
    </div>
  );
}

export default Card;
