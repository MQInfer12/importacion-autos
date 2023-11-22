import styled from 'styled-components'
import Button from '../../../global/components/button';
import Input from '../../../global/components/input';
import Select from '../../../global/components/select';
import { useNavigate } from 'react-router-dom';
import { TypeFilter } from '..';

interface Props {
  typeFilter: TypeFilter
  setTypeFilter: React.Dispatch<React.SetStateAction<TypeFilter>>
  filter: string
  setFilter: React.Dispatch<React.SetStateAction<string>>
}

const Filter = ({ typeFilter, setTypeFilter, filter, setFilter }: Props) => {
  const navigate = useNavigate();

  return (
    <Container>
      <div>
        <Select value={typeFilter} onChange={e => setTypeFilter(e.target.value as TypeFilter)}>
          <option value="nombre">Nombre</option>
          <option value="fecha">Fecha</option>
        </Select>
        <Input 
          type={typeFilter === "nombre" ? "text" : "date"}
          placeholder='Buscar...'
          value={filter}
          onChange={e => setFilter(e.target.value)}
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
  gap: 24px;
  overflow: auto;
  & > div {
    display: flex;
    gap: 16px;
  }
`;