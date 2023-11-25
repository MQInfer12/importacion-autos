import Button from "../../../global/components/button"
import Form from "../../../global/components/form"
import Input from "../../../global/components/input"
import InputContainer from "../../../global/components/inputContainer"
import styled from 'styled-components'
import CheckInput from "../../../global/components/checkInput"
import Select from "../../../global/components/select"
import { useState } from "react"
import { User } from "../../../global/interfaces/user"
import { sendRequest } from "../../../utilities/sendRequest"
import Swal from "sweetalert2"
import { Formulario } from "../interfaces/formulario"
import { useGet } from "../../../hooks/useGet"
import { useNavigate } from "react-router-dom"
import { FormularioShow } from "../../../global/interfaces/formulario"
import { useUser } from "../../../store/user"
import { colors } from "../../../global/styles/colors"

interface Props {
  formulario?: FormularioShow
  observacion: string | null
}

const Content = ({ formulario, observacion }: Props) => {
  const navigate = useNavigate();
  const { user } = useUser();

  const { res: clientesRes } = useGet<User[]>("cliente", !formulario);

  const [selectedUserId, setSelectedUserId] = useState<string>(formulario ? String(formulario.idUsuario) : "");
  const handleChangeUser = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserId(e.target.value)
  }
  const selectedUser: User | undefined = formulario ? formulario.usuario : clientesRes?.data.find(user => user.id === Number(selectedUserId));

  const getFormFromShow = () => {
    const newForm: any = {};
    formulario?.respuestas.forEach(respuesta => {
      newForm[respuesta.tipo] = respuesta.dato;
    })
    return {
      ...newForm,
      documentoInvoice: newForm.documentoInvoice === "SI",
      documentoSwift: newForm.documentoSwift === "SI",
      documentoDispach: newForm.documentoDispach === "SI",
      documentoBL: newForm.documentoBL === "SI",
      documentoOtros: newForm.documentoOtros === "SI",
      pagoTransferencia: newForm.pagoTransferencia === "SI",
      pagoDeposito: newForm.pagoDeposito === "SI",
      pagoCobro: newForm.pagoCobro === "SI",
      pagoOtros: newForm.pagoOtros === "SI",
    } as Formulario;
  }

  const hoy = new Date();
  const [form, setForm] = useState<Formulario>(
    formulario ?
    getFormFromShow()
    :
    {
      importadoraNombre: "",
      importadoraEncargado: "",
      importadoraRUT: "",
      importadoraDireccion: "",
      formularioFecha: `${hoy.getFullYear()}-${hoy.getMonth() + 1}-${hoy.getDate()}`,
      formularioCiudad: "Cochabamba",
      formularioPais: "Bolivia",
      vehiculoMarca: "",
      vehiculoModelo: "",
      vehiculoYear: "",
      vehiculoVIN: "",
      vehiculoOBS: "",
      vehiculoOtros: "",
      documentoInvoice: false,
      documentoSwift: false,
      documentoDispach: false,
      documentoBL: false,
      documentoOtros: false,
      pagoTransferencia: false,
      pagoDeposito: false,
      pagoCobro: false,
      pagoOtros: false,
      legalidadVINDias: "",
      legalidadVINFecha: "",
      legalidadCompraInternacionalDias: "",
      legalidadCompraInternacionalFecha: "",
      legalidadOtrosServiciosDias: "",
      legalidadOtrosServiciosFecha: "",
      legalidadComisionesDias: "",
      legalidadComisionesFecha: "",
      legalidadOtrosValoresDias: "",
      legalidadOtrosValoresFecha: "",
      legalidadVariosDias: "",
      legalidadVariosFecha: "",
      serviciosCompraVehiculo: "",
      serviciosRepresentacionMandato: "",
      serviciosCargosNaviero: "",
      serviciosCargosGruas: "",
      serviciosMultas: "",
      serviciosCargosComision: "",
      anticiposCompraVehiculo: "",
      anticiposServicios: "",
      saldoPorCobrar: "",
      formularioAutor: "",
      formularioRecibidoConforme: ""
    }
  );
  const [loading, setLoading] = useState(false);

  const sureSend = () => {
    Swal.fire({
      icon: "warning",
      title: "¿Continuar?",
      text: "Enviarás este formulario para que el mandante lo revise",
      showDenyButton: true,
      confirmButtonText: "Confirmar",
      confirmButtonColor: colors.gray500
    }).then(result => {
      if(result.isConfirmed) {
        handleSend();
      }
    });
  }

  const handleSend = async () => {
    setLoading(true);
    const copyForm: any = {...form};
    const newForm: Record<string, string> = {};
    for(let key in form) {
      if(typeof copyForm[key] === "boolean") {
        newForm[key] = copyForm[key] ? "SI" : "NO";
      } else {
        newForm[key] = copyForm[key] as string;
      }
    }
    const res = await sendRequest("formulario", {
      idUsuario: selectedUserId ? +selectedUserId : null,
      respuestas: newForm
    });
    if(res) {
      Swal.fire({
        title: res.status === 1 ? "Éxito" : "Error",
        icon: res.status === 1 ? "success" : "error",
        text: res.message
      });
      if(res.status === 1) {
        navigate("/dashboard/forms");
      }
    }
    setLoading(false);
  }

  return (
    <Form>
      {
        observacion ?
        <Form.Section text="Observación del mandante">
          <Text>{observacion}</Text>
        </Form.Section> : <></>
      }
      <Form.Section text="Datos de la importadora">
        <InputContainer text="Nombre de empresa">
          <Input 
            disabled={!!formulario && !observacion}
            value={form.importadoraNombre}
            onChange={e => setForm(old => ({...old, importadoraNombre: e.target.value }))}
          />
        </InputContainer>
        <InputContainer text="Encargado">
          <Input 
            disabled={!!formulario && !observacion}
            value={form.importadoraEncargado}
            onChange={e => setForm(old => ({...old, importadoraEncargado: e.target.value }))}
          />
        </InputContainer>
        <InputContainer text="RUT No.">
          <Input 
            disabled={!!formulario && !observacion}
            value={form.importadoraRUT}
            onChange={e => setForm(old => ({...old, importadoraRUT: e.target.value }))}
          />
        </InputContainer>
        <InputContainer text="Dirección">
          <Input 
            disabled={!!formulario && !observacion}
            value={form.importadoraDireccion}
            onChange={e => setForm(old => ({...old, importadoraDireccion: e.target.value }))}
          />
        </InputContainer>
      </Form.Section>
      <Form.Section text="Datos del mandante"
        input={
          !formulario ? 
          <InputContainer text="Seleccionar cliente">
            <Select 
              defaultOption="Seleccionar cliente"
              onChange={handleChangeUser}
            >
              {
                clientesRes ?
                clientesRes.data.map(user => <option key={user.id} value={user.id}>{user.nombre}</option>) : <></>
              }
            </Select>
          </InputContainer> : undefined
        }
      >
        <InputContainer text="Nombre del cliente">
          <Input 
            value={selectedUser?.nombre || ""}
            disabled
          />
        </InputContainer>
        <InputContainer text="RUT/DIN No.">
          <Input 
            value={selectedUser?.RUT || ""}
            disabled
          />
        </InputContainer>
        <InputContainer text="Domiciliado en">
          <Input 
            value={selectedUser?.domicilio || ""}
            disabled
          />
        </InputContainer>
        <InputContainer text="Nacionalidad">
          <Input 
            value={selectedUser?.nacionalidad || ""}
            disabled
          />
        </InputContainer>
        <InputContainer text="Profesión">
          <Input 
            value={selectedUser?.profesion || ""}
            disabled
          />
        </InputContainer>
        <InputContainer text="Correo electrónico">
          <Input 
            value={selectedUser?.correo || ""}
            disabled
          />
        </InputContainer>
      </Form.Section>
      <Form.Section text="Detalles del formulario">
        {
          formulario ?
          <InputContainer text="OT">
            <Input 
              value={formulario.OT}
              onChange={() => {}}
              disabled={!!formulario && !observacion}
            />
          </InputContainer> : <></>
        }
        <InputContainer text="Fecha">
          <Input 
            value={form.formularioFecha}
            onChange={e => setForm(old => ({...old, formularioFecha: e.target.value }))}
            type="date"
            disabled={!!formulario && !observacion}
          />
        </InputContainer>
        <InputContainer text="Ciudad">
          <Input 
            value={form.formularioCiudad}
            onChange={e => setForm(old => ({...old, formularioCiudad: e.target.value }))}
            disabled={!!formulario && !observacion}
          />
        </InputContainer>
        <InputContainer text="País">
          <Input 
            value={form.formularioPais}
            onChange={e => setForm(old => ({...old, formularioPais: e.target.value }))}
            disabled={!!formulario && !observacion}
          />
        </InputContainer>
      </Form.Section>
      <Form.Section text="El mandante require el vehículo">
        <InputContainer text="Marca">
          <Input 
            value={form.vehiculoMarca}
            onChange={e => setForm(old => ({...old, vehiculoMarca: e.target.value }))}
            disabled={!!formulario && !observacion}
          />
        </InputContainer>
        <InputContainer text="Modelo">
          <Input 
            value={form.vehiculoModelo}
            onChange={e => setForm(old => ({...old, vehiculoModelo: e.target.value }))}
            disabled={!!formulario && !observacion}
          />
        </InputContainer>
        <InputContainer text="Año">
          <Input 
            value={form.vehiculoYear}
            onChange={e => setForm(old => ({...old, vehiculoYear: e.target.value }))}
            disabled={!!formulario && !observacion}
          />
        </InputContainer>
        <InputContainer text="VIN">
          <Input 
            value={form.vehiculoVIN}
            onChange={e => setForm(old => ({...old, vehiculoVIN: e.target.value }))}
            disabled={!!formulario && !observacion}
          />
        </InputContainer>
        <InputContainer text="OBS.">
          <Input 
            value={form.vehiculoOBS}
            onChange={e => setForm(old => ({...old, vehiculoOBS: e.target.value }))}
            disabled={!!formulario && !observacion}
          />
        </InputContainer>
        <InputContainer text="Otros">
          <Input 
            value={form.vehiculoOtros}
            onChange={e => setForm(old => ({...old, vehiculoOtros: e.target.value }))}
            disabled={!!formulario && !observacion}
          />
        </InputContainer>
      </Form.Section>
      <Form.Section text="Documentos adjuntos">
        <CheckInput 
          text="Invoice"
          value={form.documentoInvoice}
          onChange={e => setForm(old => ({...old, documentoInvoice: e.target.checked }))}
          disabled={!!formulario && !observacion}
        />
        <CheckInput 
          text="Swift bancario"
          value={form.documentoSwift}
          onChange={e => setForm(old => ({...old, documentoSwift: e.target.checked }))}
          disabled={!!formulario && !observacion}
        />
        <CheckInput 
          text="Central dispach"
          value={form.documentoDispach}
          onChange={e => setForm(old => ({...old, documentoDispach: e.target.checked }))}
          disabled={!!formulario && !observacion}
        />
        <CheckInput 
          text="BL."
          value={form.documentoBL}
          onChange={e => setForm(old => ({...old, documentoBL: e.target.checked }))}
          disabled={!!formulario && !observacion}
        />
        <CheckInput 
          text="Otros"
          value={form.documentoOtros}
          onChange={e => setForm(old => ({...old, documentoOtros: e.target.checked }))}
          disabled={!!formulario && !observacion}
        />
      </Form.Section>
      <Form.Section text="Formas de pago">
        <CheckInput 
          text="Transferencia bancaria"
          value={form.pagoTransferencia}
          onChange={e => setForm(old => ({...old, pagoTransferencia: e.target.checked }))}
          disabled={!!formulario && !observacion}
        />
        <CheckInput 
          text="Depósito directo"
          value={form.pagoDeposito}
          onChange={e => setForm(old => ({...old, pagoDeposito: e.target.checked }))}
          disabled={!!formulario && !observacion}
        />
        <CheckInput 
          text="Cobro por caja sala VTA. BOL"
          value={form.pagoCobro}
          onChange={e => setForm(old => ({...old, pagoCobro: e.target.checked }))}
          disabled={!!formulario && !observacion}
        />
        <CheckInput 
          text="Otros"
          value={form.pagoOtros}
          onChange={e => setForm(old => ({...old, pagoOtros: e.target.checked }))}
          disabled={!!formulario && !observacion}
        />
      </Form.Section>
      <Form.Section text="Legalidad (días, vencimiento)">
        <InputContainer text="VIN">
          <Input 
            type="number"
            value={form.legalidadVINDias}
            onChange={e => setForm(old => ({...old, legalidadVINDias: e.target.value }))}
            placeholder="Días"
            disabled={!!formulario && !observacion}
          />
          <Input 
            value={form.legalidadVINFecha}
            onChange={e => setForm(old => ({...old, legalidadVINFecha: e.target.value }))}
            type="date"
            disabled={!!formulario && !observacion}
          />
        </InputContainer>
        <InputContainer text="Compra internacional">
          <Input 
            type="number"
            value={form.legalidadCompraInternacionalDias}
            onChange={e => setForm(old => ({...old, legalidadCompraInternacionalDias: e.target.value }))}
            placeholder="Días"
            disabled={!!formulario && !observacion}
          />
          <Input 
            value={form.legalidadCompraInternacionalFecha}
            onChange={e => setForm(old => ({...old, legalidadCompraInternacionalFecha: e.target.value }))}
            type="date"
            disabled={!!formulario && !observacion}
          />
        </InputContainer>
        <InputContainer text="Otros servicios">
          <Input 
            type="number"
            value={form.legalidadOtrosServiciosDias}
            onChange={e => setForm(old => ({...old, legalidadOtrosServiciosDias: e.target.value }))}
            placeholder="Días"
            disabled={!!formulario && !observacion}
          />
          <Input 
            value={form.legalidadOtrosServiciosFecha}
            onChange={e => setForm(old => ({...old, legalidadOtrosServiciosFecha: e.target.value }))}
            type="date"
            disabled={!!formulario && !observacion}
          />
        </InputContainer>
        <InputContainer text="Comisiones varias">
          <Input 
            type="number"
            value={form.legalidadComisionesDias}
            onChange={e => setForm(old => ({...old, legalidadComisionesDias: e.target.value }))}
            placeholder="Días"
            disabled={!!formulario && !observacion}
          />
          <Input 
            value={form.legalidadComisionesFecha}
            onChange={e => setForm(old => ({...old, legalidadComisionesFecha: e.target.value }))}
            type="date"
            disabled={!!formulario && !observacion}
          />
        </InputContainer>
        <InputContainer text="Otros valores">
          <Input 
            type="number"
            value={form.legalidadOtrosValoresDias}
            onChange={e => setForm(old => ({...old, legalidadOtrosValoresDias: e.target.value }))}
            placeholder="Días"
            disabled={!!formulario && !observacion}
          />
          <Input 
            value={form.legalidadOtrosValoresFecha}
            onChange={e => setForm(old => ({...old, legalidadOtrosValoresFecha: e.target.value }))}
            type="date"
            disabled={!!formulario && !observacion}
          />
        </InputContainer>
        <InputContainer text="Varios">
          <Input 
            type="number"
            value={form.legalidadVariosDias}
            onChange={e => setForm(old => ({...old, legalidadVariosDias: e.target.value }))}
            placeholder="Días"
            disabled={!!formulario && !observacion}
          />
          <Input 
            value={form.legalidadVariosFecha}
            onChange={e => setForm(old => ({...old, legalidadVariosFecha: e.target.value }))}
            type="date"
            disabled={!!formulario && !observacion}
          />
        </InputContainer>
      </Form.Section>
      <Form.Section text="Servicios logísticos a cobrar (US$)">
        <InputContainer text="Compra del vehículo con mandato">
          <Input 
            value={form.serviciosCompraVehiculo}
            onChange={e => setForm(old => ({...old, serviciosCompraVehiculo: e.target.value }))}
            type="number"
            disabled={!!formulario && !observacion}
          />
        </InputContainer>
        <InputContainer text="Serv. de representación con mandato">
          <Input 
            value={form.serviciosRepresentacionMandato}
            onChange={e => setForm(old => ({...old, serviciosRepresentacionMandato: e.target.value }))}
            type="number"
            disabled={!!formulario && !observacion}
          />
        </InputContainer>
        <InputContainer text="Serv. cargos por flete naviero">
          <Input 
            value={form.serviciosCargosNaviero}
            onChange={e => setForm(old => ({...old, serviciosCargosNaviero: e.target.value }))}
            type="number"
            disabled={!!formulario && !observacion}
          />
        </InputContainer>
        <InputContainer text="Serv. cargos por servicios grúas">
          <Input 
            value={form.serviciosCargosGruas}
            onChange={e => setForm(old => ({...old, serviciosCargosGruas: e.target.value }))}
            type="number"
            disabled={!!formulario && !observacion}
          />
        </InputContainer>
        <InputContainer text="Cargos por servicios de multas">
          <Input 
            value={form.serviciosMultas}
            onChange={e => setForm(old => ({...old, serviciosMultas: e.target.value }))}
            type="number"
            disabled={!!formulario && !observacion}
          />
        </InputContainer>
        <InputContainer text="Cargo comisión por serv. logísticos">
          <Input 
            value={form.serviciosCargosComision}
            onChange={e => setForm(old => ({...old, serviciosCargosComision: e.target.value }))}
            type="number"
            disabled={!!formulario && !observacion}
          />
        </InputContainer>
      </Form.Section>
      <Form.Section text="Anticipos recibidos (US$)">
        <InputContainer text="Compra del vehículo">
          <Input 
            value={form.anticiposCompraVehiculo}
            onChange={e => setForm(old => ({...old, anticiposCompraVehiculo: e.target.value }))}
            type="number"
            disabled={!!formulario && !observacion}
          />
        </InputContainer>
        <InputContainer text="Servicios logísticos">
          <Input 
            value={form.anticiposServicios}
            onChange={e => setForm(old => ({...old, anticiposServicios: e.target.value }))}
            type="number"
            disabled={!!formulario && !observacion}
          />
        </InputContainer>
      </Form.Section>
      <Form.Section>
        <InputContainer text="Saldo por cobrar (US$)">
          <Input 
            value={form.saldoPorCobrar}
            onChange={e => setForm(old => ({...old, saldoPorCobrar: e.target.value }))}
            type="number"
            disabled={!!formulario && !observacion}
          />
        </InputContainer>
      </Form.Section>
      <Form.Section>
        <InputContainer text="Autor del formulario">
          <Input 
            value={form.formularioAutor}
            onChange={e => setForm(old => ({...old, formularioAutor: e.target.value }))}
            disabled={!!formulario && !observacion}
          />
        </InputContainer>
        <InputContainer text="Recibido conforme por">
          <Input 
            value={form.formularioRecibidoConforme}
            onChange={e => setForm(old => ({...old, formularioRecibidoConforme: e.target.value }))}
            disabled={!!formulario && !observacion}
          />
        </InputContainer>
      </Form.Section>
      <ButtonGuardarContainer>
        {
          ((user?.rol === "Admin" && !formulario) || !!observacion) &&
          <Button 
            onClick={sureSend} 
            loading={loading}
            loadingText="Enviando..."
          >
            {!!observacion ? "Volver a enviar" : "Enviar a revisión"}
          </Button>
        }
      </ButtonGuardarContainer>
    </Form>
  )
}

export default Content

const ButtonGuardarContainer = styled.div`
  align-self: flex-end;
  margin-top: 24px;
  display: flex;
  gap: 12px;
`;

const Text = styled.p`
  color: ${colors.gray300};
`;