import Content from './components/content';
import { useParams } from 'react-router-dom';
import { useGet } from '../../hooks/useGet';
import Loading from '../../global/components/loading';
import { User } from '../../global/interfaces/user';
import { Container } from '../../global/styles/components';

const UserForm = () => {
  const { id } = useParams();
  const { res, loading } = useGet<User>(`usuario/${id}`, !!id);

  return (
    <Container>
      <h2>{id ? "Editar" : "Crear"} usuario</h2>
      <div>
        {
          loading ?
          <Loading /> :
          <Content 
            user={res?.data}
          />
        }
      </div>
    </Container>
  )
}

export default UserForm