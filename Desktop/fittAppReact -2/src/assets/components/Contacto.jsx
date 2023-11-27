import React, { useState } from 'react';
import './styles/contacto.css';

const Contacto = () => {
 
  const initialState = {
    nombre: '',
    email: '',
    mensaje: '',
  };

  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3030/contacto/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.nombre,
          correo: formData.email,
          message: formData.mensaje,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error al enviar el formulario: ${response.status} - ${response.statusText}`);
      }
      setFormData(initialState);
      // Realizar acciones adicionales si es necesario
      console.log('Formulario enviado con éxito');

    } catch (error) {
      console.error('Error al enviar el formulario:', error.message);
      setError('Error al enviar el formulario. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <div className='contacto-container'>
      <h1>Contacto</h1>
      <br />
      <p>Bienvenido a nuestro formulario de contacto. Estamos aquí para responder tus preguntas y comentarios. ¡Contáctanos!</p>
      <br />
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="nombre">Nombre:</label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
        />

        <label htmlFor="email">Correo Electrónico:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />

        <label htmlFor="mensaje">Mensaje:</label>
        <textarea
          id="mensaje"
          name="mensaje"
          value={formData.mensaje}
          onChange={handleChange}
        ></textarea>

        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default Contacto;