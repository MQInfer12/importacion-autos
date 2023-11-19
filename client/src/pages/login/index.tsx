import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import InputContainer from '../../global/components/inputContainer';
import Input from '../../global/components/input';
import Button from '../../global/components/button';
import { colors } from '../../global/styles/colors';
import { mixins } from '../../global/styles/mixins';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    navigate('/dashboard/forms');
  }

  return (
    <Container>
      <BG />
      <Form>
        <h1>Importaciones</h1>
        <h2>Iniciar sesión</h2>
        <InputContainer text='Correo electrónico'>
          <Input 
            value=''
          />
        </InputContainer>
        <InputContainer text='Contraseña'>
          <Input 
            value=''
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
    opacity: 0.8;
  }
`;