import React, { useState, useEffect } from 'react';
import Card from './Card';
import SearchBar from './SearchBar';

const CardList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const IdUsuario = localStorage.getItem('IdUsuario'); // Obtener IdUsuario de localStorage
      if (IdUsuario) {
        try {
          const response = await fetch(`http://localhost:8000/db/productos/${IdUsuario}`);
          if (!response.ok) {
            throw new Error('No se pudieron obtener los productos');
          }
          const data = await response.json();
          setProducts(data.productos);
        } catch (error) {
          console.error('Error:', error);
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
    <div>
      <SearchBar onSearch={setSearchTerm} />
      <div className="card-list">
        {filteredProducts.map(product => (
          <Card
            key={product.IdProducto}
            IdProducto={product.IdProducto}
            Nombre={product.Nombre}
            Modelo={product.Modelo}
            IdUsuario={product.IdUsuario}
            image={importImage(product.Modelo)} // Importar la imagen dinámicamente
          />
        ))}
      </div>
    </div>
  );
};

export default CardList;
