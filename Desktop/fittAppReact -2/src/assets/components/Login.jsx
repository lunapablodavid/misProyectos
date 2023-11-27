import React, { useState, useEffect } from 'react';
import SignUp from './SignUp';
import './styles/Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showSignUp, setShowSignUp] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [users, setUsers] = useState([]);

 useEffect(() => {
  // Obtener datos de usuarios desde el endpoint de NestJS
  fetch('http://localhost:3030/users/')
    .then((res) => {
      if (!res.ok) throw new Error(`${res.status}.${res.statusText}`);
      return res.json();
    })
    .then((data) => {
      setUsers(data);
      console.log('Usuarios cargados:', users);
    })
    .catch((error) => console.error(error));
}, []);

const handleLogin = () => {
  // Verificar si el usuario y la contraseña coinciden con algún usuario en la lista
  const user = users.find(
    (user) => username === user.correo && password === user.contraseña);

  if (user) {
    console.log(`Iniciando sesión con usuario: ${user.correo} y contraseña: ${user.contraseña}`);

    setLoginError('Iniciando sesion');
  } else {
    setLoginError('Usuario o contraseña incorrectos');

  }

  console.log('Intentando iniciar sesión con usuario:', username, 'y contraseña:', password);
};

const handleSignUpClick = () => {
  // Mostrar el componente SignUp al hacer clic en el botón "Registrarse"
  setShowSignUp(true);
};

const handleCloseSignUp = () => {
  // Ocultar el componente SignUp al cerrarlo
  setShowSignUp(false);
};


return (
  <div className="login-container">
    {showSignUp ? (
      <SignUp onClose={handleCloseSignUp} />
    ) : (
      <>
        <h2 className="login-title">Iniciar Sesión</h2>
        <form className="login-form">
          <label className="login-label">
            Usuario / Correo:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="login-input"
            />
          </label>
          <br />
          <label className="login-label">
            Contraseña:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
            />
          </label>
          <br />
          <button type="button" onClick={() => handleLogin()} className="login-button">
            Iniciar Sesión
          </button>
          <br />
          <button type="button" onClick={handleSignUpClick} className="login-button">
            Registrarse
          </button>
        </form>
        {loginError && <p className="login-error">{loginError}</p>}
      </>
    )}
  </div>
);
};

export default Login;