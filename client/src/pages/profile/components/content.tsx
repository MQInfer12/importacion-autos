import Button from "../../../global/components/button"
import FileInput from "../../../global/components/fileInput"
import Form from "../../../global/components/form"
import Input from "../../../global/components/input"
import InputContainer from "../../../global/components/inputContainer"
import styled from 'styled-components'
import { useState } from 'react'

const Content = () => {
  const signatureState = useState<null | File>(null);

  return (
    <Form>
      <Form.Section text="Datos">
        <InputContainer text="Correo electrónico">
          <Input 
            value="maummq@gmail.com"
          />
        </InputContainer>
        <InputContainer text="Nombre de usuario">
          <Input 
            value="Mauricio"
          />
        </InputContainer>
        <InputContainer text="RUT">
          <Input 
            value="Mauricio"
          />
        </InputContainer>
        <InputContainer text="Domicilio">
          <Input 
            value="Mauricio"
          />
        </InputContainer>
        <InputContainer text="Nacionalidad">
          <Input 
            value="Mauricio"
          />
        </InputContainer>
        <InputContainer text="Profesión">
          <Input 
            value="Mauricio"
          />
        </InputContainer>
      </Form.Section>
      <Form.Section text="Firma">
        <FileInput 
          state={signatureState}
        />
      </Form.Section>
      <ButtonGuardarContainer>
        <Button onClick={() => {}}>Guardar</Button>
      </ButtonGuardarContainer>
    </Form>
  )
}

export default Content

const ButtonGuardarContainer = styled.div`
  align-self: flex-end;
  margin-top: 24px;
`;