import Button from "../../../global/components/button"
import Form from "../../../global/components/form"
import Input from "../../../global/components/input"
import InputContainer from "../../../global/components/inputContainer"
import styled from 'styled-components'
import { useState } from 'react'
import Select from "../../../global/components/select"
import { sendRequest } from "../../../utilities/sendRequest"

const Content = () => {
  const [form, setForm] = useState({
    correo: "",
    password: "",
    nombre: "",
    rol: "Admin",
    RUT: "",
    domicilio: "",
    nacionalidad: "",
    profesion: ""
  });

  const handleSend = async () => {
    const res = await sendRequest("registro", form);
    if(res) {
      alert(res.message);
    }
  }

  return (
    <Form>
      <Form.Section text="Datos del usuario">
        <InputContainer text="Correo electrónico">
          <Input 
            value={form.correo}
            onChange={e => setForm(old => ({...old, correo: e.target.value }))}
          />
        </InputContainer>
        <InputContainer text="Contraseña">
          <Input 
            value={form.password}
            onChange={e => setForm(old => ({...old, password: e.target.value }))}
          />
        </InputContainer>
        <InputContainer text="Nombre">
          <Input 
            value={form.nombre}
            onChange={e => setForm(old => ({...old, nombre: e.target.value }))}
          />
        </InputContainer>
        <InputContainer text="Rol">
          <Select onChange={e => setForm(old => ({...old, rol: e.target.value}))}>
            <option value="Admin">Admin</option>
            <option value="Cliente">Cliente</option>
          </Select>
        </InputContainer>
      </Form.Section>
      {
        form.rol === "Cliente" ?
        <Form.Section text="Datos del cliente">
          <InputContainer text="RUT">
            <Input 
              value={form.RUT}
              onChange={e => setForm(old => ({...old, RUT: e.target.value }))}
            />
          </InputContainer>
          <InputContainer text="Domicilio">
            <Input 
              value={form.domicilio}
              onChange={e => setForm(old => ({...old, domicilio: e.target.value }))}
            />
          </InputContainer>
          <InputContainer text="Nacionalidad">
            <Input 
              value={form.nacionalidad}
              onChange={e => setForm(old => ({...old, nacionalidad: e.target.value }))}
            />
          </InputContainer>
          <InputContainer text="Profesión">
            <Input 
              value={form.profesion}
              onChange={e => setForm(old => ({...old, profesion: e.target.value }))}
            />
          </InputContainer>
        </Form.Section> : <></>
      }
      <ButtonGuardarContainer>
        <Button onClick={handleSend}>Crear</Button>
      </ButtonGuardarContainer>
    </Form>
  )
}

export default Content

const ButtonGuardarContainer = styled.div`
  align-self: flex-end;
  margin-top: 24px;
`;