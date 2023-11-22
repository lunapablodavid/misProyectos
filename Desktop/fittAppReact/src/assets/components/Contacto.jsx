import React, { useState } from 'react';
import './styles/contacto.css';

const Contacto = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    mensaje: '',
  });


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes realizar acciones con los datos del formulario, como enviarlos a la API
    console.log('Datos del formulario:', formData);
    // Puedes agregar la lógica para enviar los datos al servidor NestJS aquí
  };

  return (
    <div className='contacto-container'>
      <h1>Contacto</h1>
      <br />
      <p>Bienvenido a nuestro formulario de contacto. Estamos aquí para responder tus preguntas y comentarios. ¡Contáctanos!</p>
      <br />
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