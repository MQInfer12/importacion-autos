import { Outlet, NavLink, useNavigate, useLocation, Navigate } from 'react-router-dom'
import styled from 'styled-components';
import { colors } from '../styles/colors';
import Button from './button';
/* import ProfilePic from '../../assets/profile.png'; */
import { mixins } from '../styles/mixins';
import { useEffect, useState } from 'react';
import { sendRequest } from '../../utilities/sendRequest';
import Swal from 'sweetalert2';
import { useUser } from '../../store/user';
import Loading from './loading';
import { useGet } from '../../hooks/useGet';
import { User } from '../interfaces/user';

const Navbar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const { user, state, logout, setUser } = useUser();
  const { res: userRes } = useGet<User>("me", state === "loading");

  const handleLogout = async () => {
    /* COMPROBAMOS TOKEN EN COOKIE */
    const token = document.cookie.replace("token=", "");
    if(!token) {
      navigate("/");
      return Swal.fire({
        icon: "error",
        title: "Error",
        text: "No autorizado"
      });
    }

    /* ENVIAMOS LOGOUT */
    const res = await sendRequest("logout", null, {
      method: "GET"
    });
    if(res) {
      if(res.message !== "Unauthenticated.") {
        Swal.fire({
          icon: "success",
          title: "Éxito",
          text: res.message
        });
      }
    }
    document.cookie = `token=; max-age=0`;
    logout();
    navigate("/");
  }

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if(userRes) {
      setUser(userRes.data);
    }
  }, [userRes]);

  if(state === "loading") return (
    <Fullscreen>
      <Loading text="Cargando datos del usuario..." />
    </Fullscreen>
  )
  if(state === "unlogged") return <Navigate to="/" />
  return (
    <>
    <Nav>
      <ButtonBars onClick={() => setOpen(!open)}>
        <i className={`fa-solid fa-${open ? "xmark" : "bars"}`} />
      </ButtonBars>
      <LeftContainer open={open}>
        <h1>Importaciones</h1>
        <div>
          <StyledNavLink to='/dashboard/forms'>Formularios</StyledNavLink>
          {
            user?.rol === "Admin" &&
            <StyledNavLink to='/dashboard/user'>Usuarios</StyledNavLink>
          }
          <StyledNavLink to='/dashboard/profile'>Perfil</StyledNavLink>
        </div>
      </LeftContainer>
      <RightContainer>
        {/* <p>Bienvenido</p>
        <img src={ProfilePic} alt="profile" /> */}
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

const Fullscreen = styled.div`
  width: 100vw;
  height: 100dvh;
`;

const Nav = styled.div`
  width: 100%;
  height: 88px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 80px;
  border-bottom: ${mixins.border1};
  isolation: isolate;

  @media screen and (max-width: 640px) {
    padding: 0 24px;
  }
`;

const ButtonBars = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  height: max-content;
  display: none;
  color: ${colors.white};
  background-color: ${colors.gray500};
  border-radius: 8px;
  border: ${mixins.border1};
  box-shadow: ${mixins.shadow100};
  padding: 10px 20px;
  width: 54px;
  transition: opacity 0.3s;

  &:hover {
    opacity: 0.8;
  }

  @media screen and (max-width: 930px) {
    display: block;
  }
`;

const Main = styled.main`
  width: 100%;
  height: calc(100dvh - 88px);
  background-color: ${colors.bg200};
`;

interface LeftContainerProps {
  open: boolean
}

const LeftContainer = styled.div<LeftContainerProps>`
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

  @media screen and (max-width: 930px) {
    transform: ${props => props.open ? "translateY(0)" : "translateY(-100%)"};
    opacity: ${props => props.open ? "1" : "0"};
    pointer-events: ${props => props.open ? "all" : "none"};
    transition: all 0.3s;
    z-index: -1;
    position: fixed;
    top: 88px;
    left: 0;
    right: 0;
    padding: 12px 24px 0;
    background-color: ${colors.white};
    border-bottom: ${mixins.border1};
    flex-direction: column;
    gap: 24px;
    align-items: flex-start;
    animation: appear 0.3s;
    & > h1 {
      align-self: center;
    }
    & > div {
      width: 100%;
      overflow: auto;
      padding: 0px 0 24px;
    }
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