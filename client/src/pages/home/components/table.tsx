import Button from '../../../global/components/button';
import { TableContainer } from '../../../global/styles/components';

const Table = () => {
  return (
    <TableContainer>
      <table>
        <thead>
          <tr>
            <th className='big'>Nombre del cliente</th>
            <th className='medium'>Fecha</th>
            <th className='medium'>Estado</th>
            <th className='big'>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Mauricio Molina</td>
            <td>16-11-2023</td>
            <td>
              <p className="Nuevo">Nuevo</p>
            </td>
            <td>
              <Button type="secondary" onClick={() => {}}>Eliminar</Button>
            </td>
          </tr>
          <tr>
            <td>Mauricio Molina</td>
            <td>16-11-2023</td>
            <td>
              <p className="Firmado">Firmado</p>
            </td>
            <td>
              <Button type="secondary" onClick={() => {}}>Eliminar</Button>
            </td>
          </tr>
          <tr>
            <td>Mauricio Molina</td>
            <td>16-11-2023</td>
            <td>
              <p className="Firmado">Firmado</p>
            </td>
            <td>
              <Button type="secondary" onClick={() => {}}>Eliminar</Button>
            </td>
          </tr>
          <tr>
            <td>Mauricio Molina</td>
            <td>16-11-2023</td>
            <td>
              <p className="Declinado">Declinado</p>
            </td>
            <td>
              <Button type="secondary" onClick={() => {}}>Eliminar</Button>
            </td>
          </tr>
          <tr>
            <td>Mauricio Molina</td>
            <td>16-11-2023</td>
            <td>
              <p className="Declinado">Declinado</p>
            </td>
            <td>
              <Button type="secondary" onClick={() => {}}>Eliminar</Button>
            </td>
          </tr>
        </tbody>
      </table>
    </TableContainer>
  )
}

export default Table