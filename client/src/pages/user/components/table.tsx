import styled from 'styled-components'
import { mixins } from '../../../global/styles/mixins';
import { colors } from '../../../global/styles/colors';
import Button from '../../../global/components/button';

const Table = () => {
  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Nombre de usuario</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Mauricio Molina</td>
            <td>Admin</td>
            <td>
              <Button type="secondary" onClick={() => {}}>Eliminar</Button>
            </td>
          </tr>
          <tr>
            <td>Mauricio Molina</td>
            <td>Cliente</td>
            <td>
              <Button type="secondary" onClick={() => {}}>Eliminar</Button>
            </td>
          </tr>
          <tr>
            <td>Mauricio Molina</td>
            <td>Cliente</td>
            <td>
              <Button type="secondary" onClick={() => {}}>Eliminar</Button>
            </td>
          </tr>
          <tr>
            <td>Mauricio Molina</td>
            <td>Admin</td>
            <td>
              <Button type="secondary" onClick={() => {}}>Eliminar</Button>
            </td>
          </tr>
          <tr>
            <td>Mauricio Molina</td>
            <td>Cliente</td>
            <td>
              <Button type="secondary" onClick={() => {}}>Eliminar</Button>
            </td>
          </tr>
        </tbody>
      </table>
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
    }
  }
`;