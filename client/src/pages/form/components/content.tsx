import Button from "../../../global/components/button"
import FileInput from "../../../global/components/fileInput"
import Form from "../../../global/components/form"
import Input from "../../../global/components/input"
import InputContainer from "../../../global/components/inputContainer"
import styled from 'styled-components'
import { useState } from 'react'
import CheckInput from "../../../global/components/checkInput"

const Content = () => {
  const signatureState = useState<null | File>(null);

  return (
    <Form>
      <Form.Section text="El mandante require el vehículo">
        <InputContainer text="Marca">
          <Input 
            value=""
          />
        </InputContainer>
        <InputContainer text="Modelo">
          <Input 
            value=""
          />
        </InputContainer>
        <InputContainer text="Año">
          <Input 
            value=""
          />
        </InputContainer>
        <InputContainer text="VIN">
          <Input 
            value=""
          />
        </InputContainer>
        <InputContainer text="OBS.">
          <Input 
            value=""
          />
        </InputContainer>
        <InputContainer text="Otros">
          <Input 
            value=""
          />
        </InputContainer>
      </Form.Section>
      <Form.Section text="Documentos adjuntos">
        <CheckInput 
          text="Invoice"
        />
        <CheckInput 
          text="Swift bancario"
        />
        <CheckInput 
          text="Central dispach"
        />
        <CheckInput 
          text="BL."
        />
        <CheckInput 
          text="Otros"
        />
      </Form.Section>
      <Form.Section text="Formas de pago">
        <CheckInput 
          text="Transferencia bancaria"
        />
        <CheckInput 
          text="Depósito directo"
        />
        <CheckInput 
          text="Cobro por caja sala VTA. BOL"
        />
        <CheckInput 
          text="Otros"
        />
      </Form.Section>
      <Form.Section text="Legalidad">
        <InputContainer text="VIN">
          <Input 
            value=""
            placeholder="Días"
          />
          <Input 
            value=""
            placeholder="Vence el"
          />
        </InputContainer>
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