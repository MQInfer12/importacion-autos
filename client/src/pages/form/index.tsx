import Content from './components/content';
import { Container } from '../../global/styles/components';
import { useParams } from 'react-router-dom';
import { useGet } from '../../hooks/useGet';
import Loading from '../../global/components/loading';
import { FormularioShow } from '../../global/interfaces/formulario';

const FormPage = () => {
  const { id } = useParams();
  const { res, loading } = useGet<FormularioShow>(`formulario/${id}`, !!id);

  return (
    <Container>
      <h2>Nuevo formulario</h2>
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