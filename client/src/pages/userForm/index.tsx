import Content from './components/content';
import { Navigate, useParams } from 'react-router-dom';
import { useGet } from '../../hooks/useGet';
import Loading from '../../global/components/loading';
import { User } from '../../global/interfaces/user';
import { Container } from '../../global/styles/components';
import { useUser } from '../../store/user';

const UserForm = () => {
  const { id } = useParams();
  const { res, loading } = useGet<User>(`usuario/${id}`, !!id);
  const { user } = useUser();

  if(user?.rol !== "Admin") return <Navigate to="/dashboard/forms" />
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