import React, { useState } from 'react';

const SignUp = ({ onClose }) => {
  const [signupUsername, setSignupUsername] = useState('');
  const [signupLastName, setSignupUserLastName] = useState('');
  const [signupUpCorreo, setSignupUserCorreo] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [error, setError] = useState('');


  //funcion manejo de inicio de sesion
  const handleSignUp = async () => {
    // Validación de campos
    if (!signupUsername || !signupLastName || !signupUpCorreo || !signupPassword) {
      setError('Todos los campos son obligatorios');
      return;
    }
    //validacion del correo
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(signupUpCorreo)) {
      setError('El correo electrónico no tiene un formato válido');
      return;
    }

    try {
      const response = await fetch('http://localhost:3030/users/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: signupUsername,
          apellido: signupLastName,
          correo: signupUpCorreo,
          contraseña: signupPassword,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error al registrarse: ${response.status} - ${response.statusText}`);
      }

      // Después de registrar con éxito, cargar nuevamente la lista de usuarios
      const updatedUsers = await fetch('http://localhost:3030/users/').then((res) => res.json());
      // Realizar acciones adicionales si es necesario

      console.log('Usuario registrado con éxito');

      // Cerrar el componente SignUp
      onClose();
    } catch (error) {
      console.error('Error al registrarse:', error.message);
      setError('Error al registrarse. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <div>
      <div>
        <h2 className="login-title">Registrarse</h2>
        <form className="login-form">
          {/* Otros campos de entrada */}
          <label className="login-label">
            Nuevo Usuario:
            <input
              type="text"
              value={signupUsername}
              onChange={(e) => setSignupUsername(e.target.value)}
              className="login-input"
            />
          </label>
          <br />
          <label className="login-label">
            Apellido:
            <input
              type="text"
              value={signupLastName}
              onChange={(e) => setSignupUserLastName(e.target.value)}
              className="login-input"
            />
          </label>
          <br />
          <label className="login-label">
            Correo:
            <input
              type="email"
              value={signupUpCorreo}
              onChange={(e) => setSignupUserCorreo(e.target.value)}
              className="login-input"
            />
          </label>
          <br />
          <label className="login-label">
            Nueva Contraseña:
            <input
              type="password"
              value={signupPassword}
              onChange={(e) => setSignupPassword(e.target.value)}
              className="login-input"
            />
          </label>
          <br />
          <button type="button" onClick={handleSignUp} className="login-button">
            Registrarse
          </button>
          {error && <p className="error-message">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default SignUp;