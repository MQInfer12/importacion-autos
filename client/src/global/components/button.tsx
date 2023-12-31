import styled from 'styled-components'
import { colors } from '../styles/colors'
import { mixins } from '../styles/mixins'

type ButtonType = "primary" | "secondary";

interface Props {
  children: string
  onClick: (...args: any[]) => any
  disabled?: boolean
  type?: ButtonType
  loading?: boolean
  loadingText?: string
}

const Button = ({ children, onClick, disabled, type = "primary", loading, loadingText = "Cargando..." }: Props) => {
  return (
    <StyledButton
      onClick={onClick}
      disabled={loading || disabled}
      type={type}
    >
      {loading ? loadingText : children}
    </StyledButton>
  )
}

export default Button

interface StyledButtonProps {
  type: ButtonType
}

const StyledButton = styled.button<StyledButtonProps>`
  padding: 10px 20px;
  color: ${props => props.type === "primary" ? colors.white : colors.gray500};
  background-color: ${props => props.type === "primary" ? colors.gray500 : colors.white};
  border-radius: 8px;
  border: ${mixins.border1};
  box-shadow: ${mixins.shadow100};
  cursor: pointer;
  transition: all 0.3s;
  white-space: nowrap;
  &:hover {
    opacity: 0.8;
  }
  &:disabled {
    background-color: ${colors.gray100};
    color: ${colors.gray200};
    pointer-events: none;
  }
`;