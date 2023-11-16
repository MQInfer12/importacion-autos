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
        <InputContainer text="Nombre de usuario">
          <Input 
            value="Mauricio"
          />
        </InputContainer>
        <InputContainer text="Contraseña">
          <Input 
            value="password"
            type="password"
            disabled
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