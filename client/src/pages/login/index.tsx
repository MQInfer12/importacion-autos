import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import InputContainer from '../../global/components/inputContainer';
import Input from '../../global/components/input';
import Button from '../../global/components/button';
import { colors } from '../../global/styles/colors';
import { mixins } from '../../global/styles/mixins';
import { useState } from 'react';
import { sendRequest } from '../../utilities/sendRequest';
import Swal from 'sweetalert2';
import { useUser } from '../../store/user';
import { LoginRes } from './interfaces/login';

const Login = () => {
  const navigate = useNavigate();
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useUser();

  const handleLogin = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const res = await sendRequest<LoginRes>("login", {
      correo, password
    });
    if(res) {
      if(res.status === 2 || res.status === 3) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: res.message
        });
      } else if(res.status === 1) {
        Swal.fire({
          icon: "success",
          title: "Éxito",
          text: res.message
        });
        setUser(res.data.user);
        document.cookie = `token=${res.data.access_token}; path=/; samesite=stric`;
        navigate("/dashboard/forms");
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: res.message
        });
      }
    }
  }

  return (
    <Container>
      <BG />
      <BGG />
      <Form>
        <h1>Importaciones</h1>
        <h2>Iniciar sesión</h2>
        <InputContainer text='Correo electrónico'>
          <Input 
            value={correo}
            onChange={e => setCorreo(e.target.value)}
          />
        </InputContainer>
        <InputContainer text='Contraseña'>
          <Input 
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </InputContainer>
        <Button onClick={handleLogin}>Ingresar</Button>
      </Form>
    </Container>
  )
}

export default Login

const BG = styled.div`
  position: absolute;
  inset: 0;
  background-color: #F2F2F2;
  opacity: 0.1;
  background-image:  repeating-radial-gradient( circle at 0 0, transparent 0, #F2F2F2 40px ), repeating-linear-gradient( #10182855, #101828 );
  z-index: -2;
`;

const BGG = styled.div`
  position: absolute;
  inset: 0;
  background-color: ${colors.primary};
  opacity: 0.1;
  z-index: -1;
`;


const Container = styled.main`
  height: 100dvh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  isolation: isolate;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 48px;
  border-radius: 16px;
  box-shadow: ${mixins.shadow100};
  width: 360px;
  background-color: ${colors.white};
  & > h1 {
    text-align: center;
    color: ${colors.primary};
  }
  & > h2 {
    text-align: center;
    color: ${colors.primary};
    opacity: 0.8x;
  }
`;