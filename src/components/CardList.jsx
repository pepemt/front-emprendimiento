import React, { useState, useEffect } from 'react';
import ProductCard from './Card';
import SearchBar from './SearchBar';
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';

const CardList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const IdUsuario = localStorage.getItem('IdUsuario'); // Obtener IdUsuario de localStorage
      if (IdUsuario) {
        try {
          const response = await fetch(`http://10.48.126.190:8000/db/productos/${IdUsuario}`);
          if (!response.ok) {
            throw new Error('No se pudieron obtener los productos');
          }
          const data = await response.json();
          setProducts(data.productos);
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product =>
    product.Nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const importImage = (modelo) => {
    return `/assets/${modelo}.jpg`; // Se asume que las imágenes están en "public/assets/"
  };

  return (
    <Container>
      <h1 className="mt-4">SELECCIONA TU DINO FAVORITO PARA EMPEZAR LA DINO DIVERSION.</h1>
      <SearchBar onSearch={setSearchTerm} />
      
      {loading ? (
        <div className="d-flex justify-content-center mt-4">
          <Spinner animation="border" />
        </div>
      ) : error ? (
        <Alert variant="danger" className="mt-4">
          {error}
        </Alert>
      ) : (
        <Row xs={1} sm={2} md={3} lg={4} className="g-4 mt-4">
          {filteredProducts.map(product => (
            <Col key={product.IdProducto} className='mx-auto'>
              <ProductCard
                IdProducto={product.IdProducto}
                Nombre={product.Nombre}
                Modelo={product.Modelo}
                IdUsuario={product.IdUsuario}
                image={importImage(product.Modelo)} // Importar la imagen dinámicamente
              />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default CardList;