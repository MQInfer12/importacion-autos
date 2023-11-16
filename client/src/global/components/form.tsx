import styled from 'styled-components'
import { mixins } from '../styles/mixins'

interface FormProps {
  children: JSX.Element[] | JSX.Element
}

const Form = ({ children }: FormProps) => {
  return (
    <FormContainer>
      { children }
    </FormContainer>
  )
}

interface FormSectionProps {
  children: JSX.Element[] | JSX.Element
  text: string
}

const Section = ({ children, text }: FormSectionProps) => {
  return (
    <FormSectionContainer>
      <h2>{ text }</h2>
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
  padding: 12px 48px;
  overflow: auto;
`;

const FormSectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  border-bottom: ${mixins.border1};
  padding: 24px 0 36px;
  & > div {
    display: flex;
    gap: 24px 48px;
    flex-wrap: wrap;
  }
`;