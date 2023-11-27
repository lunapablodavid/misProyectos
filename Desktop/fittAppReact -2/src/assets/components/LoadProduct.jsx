import React, { useState, useEffect } from 'react';
import './styles/LoadProduct.css';

const LoadProduct = () => {
  const initialState = {
    id: null,
    name: '',
    description: '',
    image:"",
    price: 0,
  };

  const [product, setProduct] = useState(initialState);
  const [products, setProducts] = useState([]);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    // Cargar productos desde el backend al montar el componente
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:3030/products');
      if (!response.ok) {
        throw new Error('Error al obtener productos');
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error al obtener productos:', error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = editing ? `http://localhost:3030/products/${product.id}` : 'http://localhost:3030/products';

      const response = await fetch(url, {
        method: editing ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });

      if (!response.ok) {
        throw new Error(`Error al ${editing ? 'actualizar' : 'agregar'} el producto`);
      }

      // Después de la operación CRUD, volver a cargar los productos
      fetchProducts();

      // Limpiar el formulario después de la operación CRUD
      setProduct(initialState);
      setEditing(false);
    } catch (error) {
      console.error(`Error al ${editing ? 'actualizar' : 'agregar'} el producto:`, error.message);
    }
  };

  const handleEdit = (id) => {
    // Encontrar el producto por ID y establecerlo como producto actual para edición
    const selectedProduct = products.find((p) => p.id === id);
    setProduct(selectedProduct);
    setEditing(true);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3030/products/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Error al eliminar el producto');
      }

      // Después de la operación CRUD, volver a cargar los productos
      fetchProducts();
    } catch (error) {
      console.error('Error al eliminar el producto:', error.message);
    }
  };

  return (
    <div>
      <h2>CRUD de Productos</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input type="text" name="title" value={product.title} onChange={handleChange} />
        </label>
        <label>
          Descripción:
          <input type="text" name="description" value={product.description} onChange={handleChange} />
        </label>
        <label>
        Imagen:
          <input type="text" name="image" value={product.image} onChange={handleChange} />

        </label>
        <label>
          Precio:
          <input type="number" name="price" value={product.price} onChange={handleChange} />
        </label>
        <button type="submit">{editing ? 'Actualizar' : 'Agregar'}</button>
      </form>

      <table>
  <thead>
    <tr>
      <th>Nombre</th>
      <th>Descripción</th>
      <th>Url de la imagen</th>
      <th>Precio</th>
      <th>Acciones</th>
    </tr>
  </thead>
  <tbody>
    {products.map((product) => (
      <tr key={product.id}>
        <td>{product.title}</td>
        <td>{product.description}</td>
        <td>{product.image}</td>
        <td>{product.price}</td>
        <td>
          {/* Añadir los botones de "Editar" y "Eliminar" */}
          <button onClick={() => handleEdit(product.id)}>Editar</button>
          <button onClick={() => handleDelete(product.id)}>Eliminar</button>
        </td>
      </tr>
    ))}
  </tbody>
</table>
     
    </div>
  );
};

export default LoadProduct; /*<ul>
        {products.map((p) => (
          <li key={p.id}>
            {p.title} - {p.description} - {p.image} - ${p.price}
            <button onClick={() => handleEdit(p.id)}>Editar</button>
            <button onClick={() => handleDelete(p.id)}>Eliminar</button>
          </li>
        ))}
      </ul>*/