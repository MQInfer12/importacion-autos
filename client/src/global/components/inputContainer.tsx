import styled from 'styled-components'
import { colors } from '../styles/colors'

interface Props {
  text: string
  children: JSX.Element | JSX.Element[]
  id?: string
}

const InputContainer = ({ text, children, id }: Props) => {
  return (
    <Container>
      <label htmlFor={id}>{text}</label>
      { children }
    </Container>
  )
}

export default InputContainer

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  & label {
    padding-left: 8px;
    font-size: 14px;
    font-weight: 600;
    color: ${colors.gray300};
  }
`;