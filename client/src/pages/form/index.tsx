import Content from './components/content';
import { Container } from '../../global/styles/components';
import { useParams } from 'react-router-dom';
import { useGet } from '../../hooks/useGet';
import Loading from '../../global/components/loading';
import { FormularioShow } from '../../global/interfaces/formulario';
import { useUser } from '../../store/user';
import Button from '../../global/components/button';

const FormPage = () => {
  const { id } = useParams();
  const { res, loading } = useGet<FormularioShow>(`formulario/${id}`, !!id);
  const { user } = useUser();

  return (
    <Container>
      <header>
        <h2>{id ? "Ver" : "Nuevo"} formulario</h2>
        <div>
          {
            (user?.rol === "Cliente" && !!id) &&
            <>
            <Button onClick={() => {}}>Firmar</Button>
            <Button type="secondary" onClick={() => {}}>Declinar</Button>
            </>
          }
        </div>
      </header>
      <div>
        {
          loading ?
          <Loading /> :
          <Content 
            formulario={res?.data}
          />
        }
      </div>
    </Container>
  )
}

export default FormPage