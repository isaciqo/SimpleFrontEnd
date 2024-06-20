import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [senha, setsenha] = useState('');
  const [message, setMessage] = useState('');
  const history = useHistory(); // Adicione esta linha

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3030/login', { email, senha });
      setMessage('Login successful');
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user_id', response.data.user_id);
      localStorage.setItem('schedulesCreated', JSON.stringify(response.data.schedulesCreated));
      localStorage.setItem('schedulesJoined', JSON.stringify(response.data.schedulesJoined));
      console.log('response.data.schedulesCreated--------in login-', response.data.schedulesCreated)
      const created = localStorage.getItem('schedulesCreated');
      console.log('created--------in login-', created)
      console.log('typeof created--------in login-', typeof created)
      
      console.log('JSON.parse(created)--------in login-', JSON.parse(created))
      console.log('response', response.data)
      history.push('/CreateAgenda'); // Adicione esta linha
    } catch (error) {
      setMessage('Login failed');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>senha:</label>
          <input
            type="senha"
            value={senha}
            onChange={(e) => setsenha(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Login;
// import React, { useState } from 'react';
// import styled from 'styled-components';

// const Container = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   height: 100vh;
//   background-color: #f0f0f0;
// `;

// const Box = styled.div`
//   background: white;
//   border-radius: 10px;
//   box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
//   padding: 40px;
//   width: 300px;
//   text-align: center;
// `;

// const Title = styled.h2`
//   margin-bottom: 20px;
// `;

// const Input = styled.input`
//   width: 100%;
//   padding: 10px;
//   margin: 10px 0;
//   border: 1px solid #ccc;
//   border-radius: 5px;
// `;

// const Button = styled.button`
//   width: 100%;
//   padding: 10px;
//   margin: 10px 0;
//   border: none;
//   background-color: #007bff;
//   color: white;
//   border-radius: 5px;
//   cursor: pointer;
//   font-size: 16px;
// `;

// const SwitchText = styled.p`
//   cursor: pointer;
//   color: #007bff;
// `;

// const Login = () => {
//   const [isLogin, setIsLogin] = useState(true);

//   const toggleForm = () => {
//     setIsLogin(!isLogin);
//   };

//   return (
//     <Container>
//       <Box>
//         <Title>{isLogin ? 'Login' : 'Cadastrar'}</Title>
//         <form>
//           {!isLogin && (
//             <Input type="text" placeholder="Nome" required />
//           )}
//           <Input type="email" placeholder="Email" required />
//           <Input type="password" placeholder="Senha" required />
//           <Button type="submit">{isLogin ? 'Entrar' : 'Cadastrar'}</Button>
//         </form>
//         <SwitchText onClick={toggleForm}>
//           {isLogin ? 'Não tem uma conta? Cadastre-se' : 'Já tem uma conta? Faça login'}
//         </SwitchText>
//       </Box>
//     </Container>
//   );
// };

// export default Login;