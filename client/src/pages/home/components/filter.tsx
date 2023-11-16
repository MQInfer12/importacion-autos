import styled from 'styled-components'
import Button from '../../../global/components/button';
import Input from '../../../global/components/input';
import Select from '../../../global/components/select';
import { useNavigate } from 'react-router-dom';

const Filter = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <div>
        <Select>
          <option value="">Nombre</option>
          <option value="">Fecha</option>
        </Select>
        <Input 
          placeholder='Buscar...'
          value=""
        />
      </div>
      <Button onClick={() => navigate('/dashboard/form')}>Crear</Button>
    </Container>
  )
}

export default Filter

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
  height: 90px;
  flex: 0 0 auto;
  & > div {
    display: flex;
    gap: 16px;
  }
`;