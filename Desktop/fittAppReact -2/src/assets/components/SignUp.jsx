import React, { useState } from 'react';

const SignUp = () => {
  const [signupUsername, setSignupUsername] = useState('');
  const [signupLastName, setSignupUserLastName] = useState('');
  const [signupUpCorreo, setSignupUserCorreo] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [showSignUp, setShowSignUp] = useState();

  
  const handleSignUp = async () => {
    try {
      const response = await fetch('http://localhost:3030/users/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: signupUsername,
          lastName: signupLastName,
          correo: signupUpCorreo,
          password: signupPassword,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error al registrarse: ${response.status} - ${response.statusText}`);
      }

   
console.log('Usuario registrado con éxito');
   }
catch (error) {
      
 
console.error('Error al registrarse:', error.message);
    }
  };


  return (
    
    <div>
      <div>
      <h2 className="login-title">Registrarse</h2>
      <form className="login-form">
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
            type="text"
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
        <button type="button" onClick={()=>handleSignUp()} className="login-button">
          Registrarse
        </button>
      </form>
    </div>
    </div>
  );

};
export default SignUp
