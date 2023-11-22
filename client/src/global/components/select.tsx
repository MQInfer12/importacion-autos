import styled from 'styled-components'
import { mixins } from '../styles/mixins'
import { colors } from '../styles/colors'

interface Props {
  children: JSX.Element[] | JSX.Element
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => any
  defaultOption?: string
}

const Select = ({ children, defaultOption, onChange, value }: Props) => {
  return (
    <StyledInput value={value} onChange={onChange}>
      { defaultOption && <option value="">{ defaultOption }</option> }
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