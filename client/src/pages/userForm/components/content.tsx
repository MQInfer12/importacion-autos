import Button from "../../../global/components/button";
import Form from "../../../global/components/form";
import Input from "../../../global/components/input";
import InputContainer from "../../../global/components/inputContainer";
import styled from "styled-components";
import { useState } from "react";
import Select from "../../../global/components/select";
import { sendRequest } from "../../../utilities/sendRequest";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { User } from "../../../global/interfaces/user";

interface Props {
  user?: User;
}

const Content = ({ user }: Props) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    correo: user?.correo || "",
    password: "",
    nombre: user?.nombre || "",
    rol: user?.rol || "Admin",
    RUT: user?.RUT || "",
    domicilio: user?.domicilio || "",
    nacionalidad: user?.nacionalidad || "",
    profesion: user?.profesion || "",
  });

  const handleSend = async () => {
    setLoading(true);
    const res = await sendRequest(
      user ? `usuario/${user.id}` : "registro",
      form,
      {
        method: user ? "PUT" : "POST",
      }
    );
    if (res) {
      Swal.fire({
        title: res.status === 1 ? "Éxito" : "Error",
        icon: res.status === 1 ? "success" : "error",
        text: res.message,
      });
      if (res.status === 1) {
        navigate("/dashboard/user");
      }
    }
    setLoading(false);
  };

  return (
    <Form>
      <Form.Section text="Datos del usuario">
        <InputContainer text="Correo electrónico">
          <Input
            value={form.correo}
            onChange={(e) =>
              setForm((old) => ({ ...old, correo: e.target.value }))
            }
            disabled={!!user}
          />
        </InputContainer>
        {!user ? (
          <InputContainer text="Contraseña">
            <Input
              value={form.password}
              onChange={(e) =>
                setForm((old) => ({ ...old, password: e.target.value }))
              }
              type="password"
            />
          </InputContainer>
        ) : (
          <></>
        )}
        <InputContainer text="Nombre">
          <Input
            value={form.nombre}
            onChange={(e) =>
              setForm((old) => ({ ...old, nombre: e.target.value }))
            }
          />
        </InputContainer>
        <InputContainer text="Rol">
          <Select
            value={form.rol}
            onChange={(e) =>
              setForm((old) => ({ ...old, rol: e.target.value }))
            }
          >
            <option value="Admin">Admin</option>
            <option value="Cliente">Cliente</option>
          </Select>
        </InputContainer>
      </Form.Section>
      {form.rol === "Cliente" ? (
        <Form.Section text="Datos del cliente">
          <InputContainer text="RUT">
            <Input
              value={form.RUT}
              onChange={(e) =>
                setForm((old) => ({ ...old, RUT: e.target.value }))
              }
            />
          </InputContainer>
          <InputContainer text="Domicilio">
            <Input
              value={form.domicilio}
              onChange={(e) =>
                setForm((old) => ({ ...old, domicilio: e.target.value }))
              }
            />
          </InputContainer>
          <InputContainer text="Nacionalidad">
            <Input
              value={form.nacionalidad}
              onChange={(e) =>
                setForm((old) => ({ ...old, nacionalidad: e.target.value }))
              }
            />
          </InputContainer>
          <InputContainer text="Profesión">
            <Input
              value={form.profesion}
              onChange={(e) =>
                setForm((old) => ({ ...old, profesion: e.target.value }))
              }
            />
          </InputContainer>
        </Form.Section>
      ) : (
        <></>
      )}
      {user ? (
        <Form.Section text="Cambiar contraseña">
          <InputContainer text="Contraseña nueva">
            <Input
              value={form.password}
              placeholder="(Campo opcional)"
              onChange={(e) =>
                setForm((old) => ({ ...old, password: e.target.value }))
              }
              type="password"
            />
          </InputContainer>
        </Form.Section>
      ) : (
        <></>
      )}
      <ButtonGuardarContainer>
        <Button loading={loading} onClick={handleSend}>
          {user ? "Editar" : "Crear"}
        </Button>
      </ButtonGuardarContainer>
    </Form>
  );
};

export default Content;

const ButtonGuardarContainer = styled.div`
  align-self: flex-end;
  margin-top: 24px;
`;
