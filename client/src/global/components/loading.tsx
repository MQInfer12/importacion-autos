import styled from "styled-components"
import { colors } from "../styles/colors";

const Loading = () => {
  return (
    <Container>
      <div className="loader" />
      <p>Cargando...</p>
    </Container>
  )
}

export default Loading

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 12px;

  p {
    font-size: 12px;
    color: ${colors.gray300};
  }

  .loader {
    width: 48px;
    height: 48px;
    border: 3px solid ${colors.primary};
    border-radius: 50%;
    display: inline-block;
    position: relative;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
  }
  .loader::after {
    content: '';  
    box-sizing: border-box;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 56px;
    height: 56px;
    border-radius: 50%;
    border: 3px solid;
    border-color: ${colors.primary} transparent;
  }

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  } 
`;