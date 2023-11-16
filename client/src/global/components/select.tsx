import styled from 'styled-components'
import { mixins } from '../styles/mixins'
import { colors } from '../styles/colors'

interface Props {
  children: JSX.Element[]
}

const Select = ({ children }: Props) => {
  return (
    <StyledInput>
      { children }
    </StyledInput>
  )
}

export default Select

const StyledInput = styled.select`
  padding: 10px 20px;
  outline: none;
  border: ${mixins.border1};
  box-shadow: ${mixins.shadow100};
  border-radius: 8px;
  color: ${colors.gray300};
`;