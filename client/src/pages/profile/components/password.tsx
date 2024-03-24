import Button from "../../../global/components/button";
import Form from "../../../global/components/form";
import Input from "../../../global/components/input";
import InputContainer from "../../../global/components/inputContainer";
import styled from "styled-components";
import { useState } from "react";
import { sendRequest } from "../../../utilities/sendRequest";
import Swal from "sweetalert2";
import { User } from "../../../global/interfaces/user";

interface Props {
  id: number;
}

const Password = ({ id }: Props) => {
  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    newPasswordRepeat: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    setLoading(true);
    const res = await sendRequest<User>(`password/` + id, form, {
      method: "PATCH",
    });
    if (res) {
      if (res.status === 1) {
        Swal.fire({
          icon: "success",
          title: "Éxito",
          text: res.message,
        });
        setForm({
          oldPassword: "",
          newPassword: "",
          newPasswordRepeat: "",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: res.message,
        });
      }
    }
    setLoading(false);
  };

  return (
    <>
      <Form.Section text="Cambiar contraseña">
        <InputContainer text="Contraseña anterior">
          <Input
            value={form.oldPassword}
            onChange={(e) =>
              setForm((old) => ({ ...old, oldPassword: e.target.value }))
            }
            type="password"
          />
        </InputContainer>
        <InputContainer text="Contraseña nueva">
          <Input
            value={form.newPassword}
            onChange={(e) =>
              setForm((old) => ({ ...old, newPassword: e.target.value }))
            }
            type="password"
          />
        </InputContainer>
        <InputContainer text="Repetir contraseña nueva">
          <Input
            value={form.newPasswordRepeat}
            onChange={(e) =>
              setForm((old) => ({ ...old, newPasswordRepeat: e.target.value }))
            }
            type="password"
          />
        </InputContainer>
      </Form.Section>
      <ButtonGuardarContainer>
        <Button
          onClick={handleSend}
          loading={loading}
          loadingText="Guardando..."
        >
          Cambiar contraseña
        </Button>
      </ButtonGuardarContainer>
    </>
  );
};

export default Password;

const ButtonGuardarContainer = styled.div`
  align-self: flex-end;
  margin-top: 24px;
`;
