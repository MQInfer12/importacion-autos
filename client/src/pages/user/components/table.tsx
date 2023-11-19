import styled from 'styled-components'
import { mixins } from '../../../global/styles/mixins';
import { colors } from '../../../global/styles/colors';
import Button from '../../../global/components/button';
import { User } from '../../../global/interfaces/user';
import { sendRequest } from '../../../utilities/sendRequest';
import Loading from '../../../global/components/loading';
import Swal from 'sweetalert2';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

interface Props {
  data: User[] | undefined
  getData: () => void
}

const Table = ({ data, getData }: Props) => {
  const [loading, setLoading] = useState<null | number>(null);
  const navigate  = useNavigate();

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
    <Container>
      {
        data ?
        <table>
          <thead>
            <tr>
              <th>Correo electrónico</th>
              <th>Nombre de usuario</th>
              <th>Rol</th>
              <th>Acciones</th>
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
                        onClick={() => handleDelete(user.id)}
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
    </Container>
  )
}

export default Table

const Container = styled.div`
  margin: 0 24px 24px;
  border: ${mixins.border2};
  border-radius: 8px;
  overflow: auto;
  height: calc(100% - 90px);
  scrollbar-gutter: stable both-edges;
  box-shadow: ${mixins.shadow100};
  & > table {
    width: 100%;
    border-collapse: collapse;
    table-layout: fixed;
    font-size: 14px;
    td {
      /* color: ${colors.gray300}; */
      padding: 24px;
      & > p {
        padding: 4px 12px;
        width: max-content;
        border-radius: 12px;
        &.Nuevo {
          color: ${colors.yellow};
          background-color: ${colors.yellowBG};
        }
        &.Firmado {
          color: ${colors.green};
          background-color: ${colors.greenBG};
        }
        &.Declinado {
          color: ${colors.red};
          background-color: ${colors.redBG};
        }
      }
    }
    th {
      text-align: start;
      padding: 24px;
    }
    tr {
      border-bottom: ${mixins.border2};
    }
    & > thead {
      tr {
        background-color: ${colors.bg200};
      }
    }
    & > tbody {
      tr:nth-child(even) {
        background-color: ${colors.bg200};
      }
      & .buttons {
        display: flex;
        gap: 16px;
      }
    }
  }
`;