import styled from 'styled-components'
import { mixins } from '../styles/mixins'
import { colors } from '../styles/colors'

interface Props {
  value: string
  placeholder?: string
  type?: string
  disabled?: boolean
}

const Input = ({ placeholder, type = "text", disabled, value }: Props) => {
  return (
    <StyledInput 
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