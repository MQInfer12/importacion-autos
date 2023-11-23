import Button from "../../../global/components/button"
import FileInput from "../../../global/components/fileInput"
import Form from "../../../global/components/form"
import Input from "../../../global/components/input"
import InputContainer from "../../../global/components/inputContainer"
import styled from 'styled-components'
import { useState } from 'react'
import { useUser } from "../../../store/user"
import { sendRequest } from "../../../utilities/sendRequest"
import Swal from "sweetalert2"
import { User } from "../../../global/interfaces/user"
import { http } from "../../../utilities/http"

const Content = () => {
  const signatureState = useState<null | File>(null);
  const { user, setUser } = useUser();
  const [form, setForm] = useState({
    correo: user?.correo || "",
    nombre: user?.nombre || "",
    RUT: user?.RUT || "",
    domicilio: user?.domicilio || "",
    nacionalidad: user?.nacionalidad || "",
    profesion: user?.profesion || ""
  });

  const handleSend = async () => {
    const formData = new FormData();
    formData.append("correo", form.correo);
    formData.append("nombre", form.nombre);
    formData.append("RUT", form.RUT);
    formData.append("domicilio", form.domicilio);
    formData.append("nacionalidad", form.nacionalidad);
    formData.append("profesion", form.profesion);
    const [firma] = signatureState;
    if(firma) {
      formData.append("firma", firma);
    }
    const res = await sendRequest<User>("profile", formData);
    if(res) {
      setUser(res.data);
      if(res.status === 1) {
        Swal.fire({
          icon: "success",
          title: "Éxito",
          text: res.message
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: res.message
        });
      }
    }
  }

  return (
    <Form>
      <Form.Section text="Datos">
        <InputContainer text="Correo electrónico">
          <Input 
            value={form.correo}
            onChange={e => setForm(old => ({...old, correo: e.target.value }))}
          />
        </InputContainer>
        <InputContainer text="Nombre de usuario">
          <Input 
            value={form.nombre}
            onChange={e => setForm(old => ({...old, nombre: e.target.value }))}
          />
        </InputContainer>
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
      </Form.Section>
      <Form.Section text="Firma">
        <FileInput 
          defaultSrc={user?.firma ? `${http.replace("api/", "")}storage/${user.firma}?${new Date().getTime()}` : undefined}
          state={signatureState}
        />
      </Form.Section>
      <ButtonGuardarContainer>
        <Button onClick={handleSend}>Guardar</Button>
      </ButtonGuardarContainer>
    </Form>
  )
}

export default Content

const ButtonGuardarContainer = styled.div`
  align-self: flex-end;
  margin-top: 24px;
`;