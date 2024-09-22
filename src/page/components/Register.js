import React, { useState } from 'react';
import axios from 'axios';
import './Signup.css'; // você pode adicionar estilos customizados aqui
import { useHistory } from 'react-router-dom'; // Para redirecionamento
import logo from '../../Assets/Logo.png';
import googleIcon from '../../Assets/googleIcon.png';
import telaMenu from '../../Assets/telaMenu.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const [name, setName] = useState('');
  const [apelido, setApelido] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const history = useHistory(); // Para redirecionar

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let response
    try {
      console.log('Enviando para o servidor:', { name, apelido, email, senha });
      response = await axios.post('http://localhost:3030/create', { name, email, senha });
      console.log('response------', response);
      setMessage('Cadastro realizado com sucesso');

      history.push('/Login');
    } catch (error) {
       // Captura e exibe a mensagem de erro do servidor no popup
       if (error.response) {
        console.log('error.response.data.message', error.response.data.message)
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
      
      <div className="left-side">
        <img src={logo} alt="Site Logo" className="logo" />
        <img src={telaMenu} alt="Site Features" className="features-image" />
      </div>

      <div className="right-side">
        <h2>Crie uma conta</h2>
        <button className="google-btn">
          <img src={googleIcon} alt="Google Icon" /> Continuar com Google
        </button>

        <form className="signup-form" onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              placeholder="Nome completo"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Apelido"
              value={apelido}
              onChange={(e) => setApelido(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="password-container">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              className="password-input"
            />
            <span className="toggle-password" onClick={togglePasswordVisibility}>
              {showPassword ? '🙈' : '👁️'}
            </span>
          </div>
          <button type="submit" className="signup-btn">Cadastrar</button>
        </form>

        {message && <p>{message}</p>}

        <p className="login-text">
          Já esteve aqui antes? <a href="/login" className="login-link">Log in</a>
        </p>
      </div>
    </div>
  );
};

export default Register;

