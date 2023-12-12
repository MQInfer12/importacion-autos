import styled from 'styled-components'
import { colors } from '../styles/colors'
import { useId } from 'react'

interface Props {
  text: string
  value: boolean
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  disabled?: boolean
}

const CheckInput = ({ text, value, onChange, disabled }: Props) => {
  const id = useId();

  return (
    <Container>
      <input 
        id={id}
        type='checkbox' 
        checked={value}
        onChange={onChange}
        disabled={disabled}
      />
      <label htmlFor={id}>{text}</label>
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
    &:disabled {
      background-color: ${colors.gray100};
    }
  }
`;