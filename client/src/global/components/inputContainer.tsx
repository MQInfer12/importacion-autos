import styled from "styled-components";
import { colors } from "../styles/colors";

interface Props {
  text: string;
  children: JSX.Element | JSX.Element[];
  id?: string;
  widthFull?: boolean;
}

const InputContainer = ({ text, children, id, widthFull = false }: Props) => {
  return (
    <Container widthFull={widthFull}>
      <label htmlFor={id}>{text}</label>
      {children}
    </Container>
  );
};

export default InputContainer;

interface ContainerProps {
  widthFull: boolean;
}

const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: ${(props) => (props.widthFull ? "625px" : "auto")};
  max-width: ${(props) => (props.widthFull ? "100%" : "auto")};
  & label {
    padding-left: 8px;
    font-size: 14px;
    font-weight: 600;
    color: ${colors.gray300};
  }
`;
