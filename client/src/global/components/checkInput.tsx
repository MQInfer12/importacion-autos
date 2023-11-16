import styled from 'styled-components'
import { colors } from '../styles/colors'

interface Props {
  text: string
}

const CheckInput = ({ text }: Props) => {
  return (
    <Container>
      <input 
        type='checkbox' 
      />
      <label>{text}</label>
    </Container>
  )
}

export default CheckInput

const Container = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  & label {
    padding-left: 8px;
    font-size: 14px;
    font-weight: 600;
    color: ${colors.gray300};
  }
  & input {
    width: 16px;
    height: 16px;
  }
`;