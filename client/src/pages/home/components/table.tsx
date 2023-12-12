import { useNavigate } from 'react-router-dom';
import Button from '../../../global/components/button';
import Loading from '../../../global/components/loading';
import { FormularioRes } from '../../../global/interfaces/formulario';
import { TableContainer } from '../../../global/styles/components';

interface Props {
  data: FormularioRes[] | undefined
}

const Table = ({ data }: Props) => {
  const navigate = useNavigate();
  
  return (
    <TableContainer>
      {
        data ?
        <table>
          <thead>
            <tr>
              <th className='medium'>OT</th>
              <th className='big'>Nombre del cliente</th>
              <th className='medium'>Fecha</th>
              <th className='medium'>Estado</th>
              <th className='big'>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {
              data.map(formulario => (
                <tr key={formulario.id}>
                  <td>{formulario.OT}</td>
                  <td>{formulario.nombre_usuario}</td>
                  <td>{formulario.fecha}</td>
                  <td>
                    <p className={formulario.estado}>{formulario.estado}</p>
                  </td>
                  <td>
                    <div className='buttons'>
                      <Button type="primary" onClick={() => navigate(`/dashboard/form/${formulario.id}`)}>Ver</Button>
                    {
                      formulario.estado === "Firmado" &&
                      <Button type="secondary" onClick={() => navigate(`/dashboard/form/${formulario.id}/PDF`)}>PDF</Button>
                    }
                    </div>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
        :
        <Loading />
      }
    </TableContainer>
  )
}

export default Table