import styled from 'styled-components'
import Button from '../../../global/components/button';
import Input from '../../../global/components/input';
import { useNavigate } from 'react-router-dom';

interface Props {
  filter: string
  setFilter: React.Dispatch<React.SetStateAction<string>>
}

const Filter = ({ filter, setFilter }: Props) => {
  const navigate = useNavigate();

  const handleCreate = () => {
    navigate("/dashboard/userForm");
  }

  return (
    <Container>
      <div>
        <Input 
          placeholder='Buscar por nombre...'
          value={filter}
          onChange={e => setFilter(e.target.value)}
        />
      </div>
      <Button onClick={handleCreate}>Crear</Button>
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
  gap: 24px;
  & > div {
    display: flex;
    gap: 16px;
    max-width: calc(100% - 104px);
    & > input {
      width: 100%;
    }
  }
`;