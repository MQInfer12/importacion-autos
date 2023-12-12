import styled from 'styled-components'
import { mixins } from '../styles/mixins'
import { colors } from '../styles/colors'

interface Props {
  value: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  type?: string
  disabled?: boolean
  id?: string
}

const Input = ({ placeholder, type = "text", disabled, value, onChange, id }: Props) => {
  return (
    <StyledInput 
      id={id}
      onChange={onChange}
      placeholder={placeholder}
      type={type}
      disabled={disabled}
      value={value}
    />
  )
}

export default Input

const StyledInput = styled.input`
  padding: 10px 20px;
  width: 288px;
  max-width: 100%;
  outline: none;
  border: ${mixins.border1};
  box-shadow: ${mixins.shadow100};
  border-radius: 8px;
  color: ${colors.gray300};
  &::placeholder {
    color: ${colors.gray300};
  }
  &:disabled {
    background-color: ${colors.gray100};
  }
`;