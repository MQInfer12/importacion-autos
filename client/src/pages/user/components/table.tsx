import Button from '../../../global/components/button';
import { User } from '../../../global/interfaces/user';
import { sendRequest } from '../../../utilities/sendRequest';
import Loading from '../../../global/components/loading';
import Swal from 'sweetalert2';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { TableContainer } from '../../../global/styles/components';
import { colors } from '../../../global/styles/colors';

interface Props {
  data: User[] | undefined
  getData: () => void
}

const Table = ({ data, getData }: Props) => {
  const [loading, setLoading] = useState<null | number>(null);
  const navigate  = useNavigate();

  const sureDelete = async (id: number) => {
    Swal.fire({
      icon: "warning",
      title: "¿Estás seguro?",
      text: "Se eliminará el usuario permanentemente",
      showDenyButton: true,
      confirmButtonText: "Confirmar",
      confirmButtonColor: colors.gray500
    }).then(result => {
      if(result.isConfirmed) {
        handleDelete(id);
      }
    })
  }

  const handleDelete = async (id: number) => {
    setLoading(id);
    const res = await sendRequest(`usuario/${id}`, null, {
      method: "DELETE"
    });
    if(res) {
      Swal.fire({
        title: "Éxito",
        icon: "success",
        text: res.message
      });
      getData();
    }
    setLoading(null);
  }

  return (
    <TableContainer>
      {
        data ?
        <table>
          <thead>
            <tr>
              <th className='big'>Correo electrónico</th>
              <th className='big'>Nombre</th>
              <th className='medium'>Rol</th>
              <th className='extrabig'>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {
              data.map(user => (
                <tr key={user.id}>
                  <td>{user.correo}</td>
                  <td>{user.nombre}</td>
                  <td>{user.rol}</td>
                  <td>
                    <div className='buttons'>
                      <Button 
                        onClick={() => navigate(`/dashboard/userForm/${user.id}`)}
                      >Editar</Button>
                      <Button 
                        type="secondary" 
                        onClick={() => sureDelete(user.id)}
                        loading={loading === user.id}
                      >Eliminar</Button>
                    </div>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
        : <Loading />
      }
    </TableContainer>
  )
}

export default Table