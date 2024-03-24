import styled from 'styled-components'
import { mixins } from '../styles/mixins'
import { colors } from '../styles/colors'

interface FormProps {
  children: React.ReactNode
}

const Form = ({ children }: FormProps) => {
  return (
    <FormContainer>
      { children }
    </FormContainer>
  )
}

interface FormSectionProps {
  input?: JSX.Element
  children: JSX.Element[] | JSX.Element
  text?: string
}

const Section = ({ children, text, input }: FormSectionProps) => {
  return (
    <FormSectionContainer>
      {text && <h2>{ text }</h2>}
      {
        input &&
        <div>{ input }</div>
      }
      <div>
        { children }
      </div>
    </FormSectionContainer>
  )
}

Form.Section = Section;

export default Form

const FormContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 12px 48px 24px;
  overflow: auto;

  @media screen and (max-width: 640px) {
    padding: 12px 24px 24px;
  }
`;

const FormSectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  border-bottom: ${mixins.border1};
  padding: 24px 0 36px;
  & > h2 {
    font-size: 1.4rem;
    color: ${colors.primary};
  }
  & > div {
    display: flex;
    gap: 24px 48px;
    flex-wrap: wrap;
  }
`;