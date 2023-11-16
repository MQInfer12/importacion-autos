import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import styled from 'styled-components';
import { colors } from '../styles/colors';
import Button from './button';
import ProfilePic from '../../assets/profile.png';
import { mixins } from '../styles/mixins';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  }

  return (
    <>
    <Nav>
      <LeftContainer>
        <h1>Importaciones</h1>
        <div>
          <StyledNavLink to='/dashboard/forms'>Formularios</StyledNavLink>
          <StyledNavLink to='/dashboard/user'>Usuarios</StyledNavLink>
          <StyledNavLink to='/dashboard/profile'>Perfil</StyledNavLink>
        </div>
      </LeftContainer>
      <RightContainer>
        <p>Bienvenido</p>
        <img src={ProfilePic} alt="profile" />
        <Button onClick={handleLogout}>Cerrar sesión</Button>
      </RightContainer>
    </Nav>
    <Main>
      <Outlet />
    </Main>
    </>
  )
}

export default Navbar

const Nav = styled.div`
  width: 100%;
  height: 88px;
  display: flex;
  justify-content: space-between;
  padding: 0 80px;
  border-bottom: ${mixins.border1};
`;

const Main = styled.main`
  width: 100%;
  height: calc(100dvh - 88px);
  background-color: ${colors.bg200};
`;

const LeftContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 48px;
  & > h1 {
    font-size: 1.8rem;
    color: ${colors.primary};
  }
  & > div {
    display: flex;
    gap: 24px;
  }
`;

const StyledNavLink = styled(NavLink)`
  padding: 6px 12px;
  border-radius: 8px;
  text-decoration: none;
  color: ${colors.gray300};
  transition: all 0.3s;
  &:hover, &.active {
    background-color: ${colors.bg100};
    color: ${colors.gray500};
  }
`

const RightContainer = styled.div`
  display: flex;
  gap: 24px;
  align-items: center;
  & > p {
    color: ${colors.gray300};
  }
  & > img {
    height: 44px;
    width: 44px;
    border-radius: 24px;
    object-fit: cover;
    border: ${mixins.border1};
    box-shadow: ${mixins.shadow100};
  }
`;