import styled from 'styled-components'
import { colors } from '../../global/styles/colors';
import { mixins } from '../../global/styles/mixins';
import Content from './components/content';

const UserForm = () => {
  return (
    <Container>
      <h2>Crear usuario</h2>
      <div>
        <Content />
      </div>
    </Container>
  )
}

export default UserForm

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 44px;
  align-items: center;
  gap: 24px;

  & > h2 {
    margin-left: 10%;
    align-self: flex-start;
    color: ${colors.gray500};
    flex: 0 0 auto;
  }
  & > div {
    width: 80%;
    background-color: ${colors.bg300};
    border: ${mixins.border2};
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    height: calc(100% - 60px);
  }
`;