import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom'; // Para redirecionamento
import './Signup.css'; // você pode adicionar estilos customizados aqui
import logo from '../../Assets/Logo.png';
import googleIcon from '../../Assets/googleIcon.png';
import telaMenu from '../../Assets/telaMenu.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const history = useHistory(); // Para redirecionar

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3030/login', { email, password });
      setMessage('Login realizado com sucesso');
      
      // Salvando dados no localStorage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user_id', response.data.user_id);
      localStorage.setItem('schedulesCreated', JSON.stringify(response.data.schedulesCreated));
      localStorage.setItem('schedulesJoined', JSON.stringify(response.data.schedulesJoined));
      
      // Redirecionando para a página de criação de agenda
      history.push('/CreateAgenda');
    } catch (error) {
       // Captura e exibe a mensagem de erro do servidor no popup
       if (error.response) {
        console.log('error.response.data.message', error)
        toast.error(error.response.data.message || 'Erro no servidor');
      } else {
        toast.error('Erro de conexão. Tente novamente mais tarde.');
      }
    }
  };

  return (
    <div className="signup-container">
      {/* Componente para exibir os popups */}
      <ToastContainer />

      {/* Lado esquerdo com a imagem e o logo */}
      <div className="left-side">
        <img src={logo} alt="Site Logo" className="logo" />
        <img src={telaMenu} alt="Site Features" className="features-image" />
      </div>

      {/* Lado direito com o formulário de login */}
      <div className="right-side">
        <h2>Log in</h2>
        <button className="google-btn">
          <img src={googleIcon} alt="Google Icon" /> Entrar com Google
        </button>

        <form className="signup-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div className="password-container">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="password-input"
            />
            <span className="toggle-password" onClick={togglePasswordVisibility}>
              {showPassword ? '🙈' : '👁️'}
            </span>
          </div>

          <button type="submit" className="signup-btn">Log in</button>
        </form>

        {message && <p>{message}</p>}

        <p className="Register-text">
          Primeira vez? <a href="/Register" className="register-link">Cadastre-se</a>
        </p>
      </div>
    </div>
  );
};

export default Login;



// import React, { useState } from 'react';
// import './Signup.css'; // você pode adicionar estilos customizados aqui
// import logo from '../../Assets/Logo.png';
// import googleIcon from '../../Assets/googleIcon.png';
// import telaMenu from '../../Assets/telaMenu.png';

// const Login = () => {
//   const [showPassword, setShowPassword] = useState(false);

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   return (
//     <div className="signup-container">
//       {/* Lado esquerdo com a imagem e o logo */}
//       <div className="left-side">
//         <img src={logo} alt="Site Logo" className="logo" />
//         <img src={telaMenu} alt="Site Features" className="features-image" />
//       </div>

//       {/* Lado direito com o formulário de criação de conta */}
//       <div className="right-side">
//         <h2>Crie uma conta</h2>
//         <button className="google-btn">
//           <img src={googleIcon} alt="Google Icon" /> Entrar com Google
//         </button>

//         <form className="signup-form">
//           <input type="email" placeholder="Email" required />

//           <div className="password-container">
//             <input
//               type={showPassword ? 'text' : 'password'}
//               placeholder="Password"
//               required
//               className="password-input"
//             />
//             <span className="toggle-password" onClick={togglePasswordVisibility}>
//               {showPassword ? '🙈' : '👁️'}
//             </span>
//           </div>

//           <button type="submit" className="signup-btn">Log in</button>
//         </form>

//         <p className="Register-text">
//           Primeira vez? <a href="/Register" className="register-link">Log in</a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;







// import React, { useState } from 'react';
// import axios from 'axios';
// import { useHistory } from 'react-router-dom';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [message, setMessage] = useState('');
//   const history = useHistory(); // Adicione esta linha

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:3030/login', { email, password });
//       setMessage('Login successful');
//       localStorage.setItem('token', response.data.token);
//       localStorage.setItem('user_id', response.data.user_id);
//       localStorage.setItem('schedulesCreated', JSON.stringify(response.data.schedulesCreated));
//       localStorage.setItem('schedulesJoined', JSON.stringify(response.data.schedulesJoined));
//       console.log('response.data.schedulesCreated--------in login-', response.data.schedulesCreated)
//       const created = localStorage.getItem('schedulesCreated');
//       console.log('created--------in login-', created)
//       console.log('typeof created--------in login-', typeof created)
      
//       console.log('JSON.parse(created)--------in login-', JSON.parse(created))
//       console.log('response', response.data)
//       history.push('/CreateAgenda'); // Adicione esta linha
//     } catch (error) {
//       setMessage('Login failed');
//     }
//   };

//   return (
//     <div>
//       <h2>Login</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Email:</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//         </div>
//         <div>
//           <label>password:</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//         </div>
//         <button type="submit">Login</button>
//       </form>
//       {message && <p>{message}</p>}
//     </div>
//   );
// };

// export default Login;