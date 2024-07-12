import Button from "../../../global/components/button";
import Form from "../../../global/components/form";
import Input from "../../../global/components/input";
import InputContainer from "../../../global/components/inputContainer";
import styled from "styled-components";
import CheckInput from "../../../global/components/checkInput";
import { useState } from "react";
import { User } from "../../../global/interfaces/user";
import { sendRequest } from "../../../utilities/sendRequest";
import Swal from "sweetalert2";
import { Formulario } from "../interfaces/formulario";
import { useGet } from "../../../hooks/useGet";
import { useNavigate } from "react-router-dom";
import { FormularioShow } from "../../../global/interfaces/formulario";
import { useUser } from "../../../store/user";
import { colors } from "../../../global/styles/colors";
import ReactSelect from "react-select";

interface Props {
  formulario?: FormularioShow;
  observacion: string | null;
}

const Content = ({ formulario, observacion }: Props) => {
  const navigate = useNavigate();
  const { user } = useUser();

  const { res: clientesRes } = useGet<User[]>("cliente", !formulario);

  const [selectedUserId, setSelectedUserId] = useState<string>(
    formulario ? String(formulario.idUsuario) : ""
  );
  const handleChangeUser = (opt: any) => {
    setSelectedUserId(String(opt.value));
  };
  const selectedUser: User | undefined = formulario
    ? formulario.usuario
    : clientesRes?.data.find((user) => user.id === Number(selectedUserId));

  const getFormFromShow = () => {
    const newForm: any = {};
    formulario?.respuestas.forEach((respuesta) => {
      newForm[respuesta.tipo] = respuesta.dato;
    });
    return {
      ...newForm,
      documentoInvoice: newForm.documentoInvoice === "SI",
      documentoSwift: newForm.documentoSwift === "SI",
      documentoDispach: newForm.documentoDispach === "SI",
      documentoBL: newForm.documentoBL === "SI",
      documentoContratoCompraVenta:
        newForm.documentoContratoCompraVenta === "SI",
      documentoSrf: newForm.documentoSrf === "SI",
      documentoCrt: newForm.documentoCrt === "SI",
      documentoDus: newForm.documentoDus === "SI",
      documentoMic: newForm.documentoMic === "SI",
      documentoZeta: newForm.documentoZeta === "SI",
      documentoOtros: newForm.documentoOtros === "SI",
      pagoTransferencia: newForm.pagoTransferencia === "SI",
      pagoDeposito: newForm.pagoDeposito === "SI",
      pagoCobro: newForm.pagoCobro === "SI",
      pagoOtros: newForm.pagoOtros === "SI",
    } as Formulario;
  };

  const hoy = new Date();
  const [form, setForm] = useState<Formulario>(
    formulario
      ? getFormFromShow()
      : {
          importadoraNombre: "",
          importadoraEncargado: "",
          importadoraRUT: "",
          importadoraDireccion: "",
          formularioFecha: `${hoy.getFullYear()}-${
            hoy.getMonth() + 1 < 10
              ? `0${hoy.getMonth() + 1}`
              : hoy.getMonth() + 1
          }-${hoy.getDate()}`,
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
          documentoZeta: false,
          documentoSrf: false,
          documentoContratoCompraVenta: false,
          documentoCrt: false,
          documentoDus: false,
          documentoMic: false,
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
          formularioRecibidoConforme: "",
        }
  );
  const [loading, setLoading] = useState(false);
  const [loadingEraser, setLoadingEraser] = useState(false);
  const [loadingEdit, setLoadingEdit] = useState(false);
  const [loadingSend, setLoadingSend] = useState(false);

  const sureSend = (borrador: boolean) => {
    Swal.fire({
      icon: "warning",
      title: "¿Continuar?",
      text: borrador
        ? "Se guardará un borrador de este formulario"
        : "Enviarás este formulario para que el mandante lo revise",
      showDenyButton: true,
      confirmButtonText: "Confirmar",
      confirmButtonColor: colors.gray500,
    }).then((result) => {
      if (result.isConfirmed) {
        handleSend(borrador);
      }
    });
  };

  const handleSend = async (borrador: boolean) => {
    if (borrador) {
      setLoadingEraser(true);
    } else {
      setLoading(true);
    }
    const copyForm: any = { ...form };
    const newForm: Record<string, string> = {};
    for (let key in form) {
      if (typeof copyForm[key] === "boolean") {
        newForm[key] = copyForm[key] ? "SI" : "NO";
      } else {
        newForm[key] = copyForm[key] as string;
      }
    }
    const res = await sendRequest(
      borrador ? "formulario/store/eraser" : "formulario",
      {
        idUsuario: selectedUserId ? +selectedUserId : null,
        respuestas: newForm,
      }
    );
    if (res) {
      Swal.fire({
        title: res.status === 1 ? "Éxito" : "Error",
        icon: res.status === 1 ? "success" : "error",
        text: res.message,
      });
      if (res.status === 1) {
        navigate("/dashboard/forms");
      }
    }
    if (borrador) {
      setLoadingEraser(false);
    } else {
      setLoading(false);
    }
  };

  const sureEdit = () => {
    Swal.fire({
      icon: "warning",
      title: "¿Continuar?",
      text: "Se editará los datos de este formulario",
      showDenyButton: true,
      confirmButtonText: "Confirmar",
      confirmButtonColor: colors.gray500,
    }).then((result) => {
      if (result.isConfirmed) {
        handleEdit();
      }
    });
  };

  const handleEdit = async () => {
    setLoadingEdit(true);
    const copyForm: any = { ...form };
    const newForm: Record<string, string> = {};
    for (let key in form) {
      if (typeof copyForm[key] === "boolean") {
        newForm[key] = copyForm[key] ? "SI" : "NO";
      } else {
        newForm[key] = copyForm[key] as string;
      }
    }
    const res = await sendRequest(`formulario/edit/${formulario?.id}`, {
      respuestas: newForm,
    });
    if (res) {
      Swal.fire({
        title: res.status === 1 ? "Éxito" : "Error",
        icon: res.status === 1 ? "success" : "error",
        text: res.message,
      });
      if (res.status === 1) {
        navigate("/dashboard/forms");
      }
    }
    setLoadingEdit(false);
  };

  const sureCheck = () => {
    Swal.fire({
      icon: "warning",
      title: "¿Continuar?",
      text: "Enviarás este formulario para que el mandante lo revise",
      showDenyButton: true,
      confirmButtonText: "Confirmar",
      confirmButtonColor: colors.gray500,
    }).then((result) => {
      if (result.isConfirmed) {
        handleCheck();
      }
    });
  };

  const handleCheck = async () => {
    setLoadingSend(true);
    const copyForm: any = { ...form };
    const newForm: Record<string, string> = {};
    for (let key in form) {
      if (typeof copyForm[key] === "boolean") {
        newForm[key] = copyForm[key] ? "SI" : "NO";
      } else {
        newForm[key] = copyForm[key] as string;
      }
    }
    const res = await sendRequest(`formulario/check/${formulario?.id}`, {});
    if (res) {
      Swal.fire({
        title: res.status === 1 ? "Éxito" : "Error",
        icon: res.status === 1 ? "success" : "error",
        text: res.message,
      });
      if (res.status === 1) {
        navigate("/dashboard/forms");
      }
    }
    setLoadingSend(false);
  };

  const getDisabled = () => {
    if (!formulario) return false;
    if (user?.rol === "Cliente") return true;
    if (formulario.estado === "Declinado") return false;
    if (formulario.estado === "Firmado") return true;
    return false;
  };

  const formatDolar = (num: string) => {
    return `Total: ${
      num ? `${Intl.NumberFormat("de-DE").format(+num)} US$` : ""
    }`;
  };

  const disabled = getDisabled();
  return (
    <Form>
      {observacion ? (
        <Form.Section text="Observación del mandante">
          <Text>{observacion}</Text>
        </Form.Section>
      ) : (
        <></>
      )}
      <Form.Section text="Datos de la importadora">
        <InputContainer text="Nombre de empresa" id="importadoraNombre">
          <Input
            id="importadoraNombre"
            disabled={disabled}
            value={form.importadoraNombre}
            onChange={(e) =>
              setForm((old) => ({ ...old, importadoraNombre: e.target.value }))
            }
          />
        </InputContainer>
        <InputContainer text="Encargado" id="importadoraEncargado">
          <Input
            id="importadoraEncargado"
            disabled={disabled}
            value={form.importadoraEncargado}
            onChange={(e) =>
              setForm((old) => ({
                ...old,
                importadoraEncargado: e.target.value,
              }))
            }
          />
        </InputContainer>
        <InputContainer text="RUT No." id="importadoraRUT">
          <Input
            id="importadoraRUT"
            disabled={disabled}
            value={form.importadoraRUT}
            onChange={(e) =>
              setForm((old) => ({ ...old, importadoraRUT: e.target.value }))
            }
          />
        </InputContainer>
        <InputContainer text="Dirección" id="importadoraDireccion">
          <Input
            id="importadoraDireccion"
            disabled={disabled}
            value={form.importadoraDireccion}
            onChange={(e) =>
              setForm((old) => ({
                ...old,
                importadoraDireccion: e.target.value,
              }))
            }
          />
        </InputContainer>
      </Form.Section>
      <Form.Section
        text="Datos del mandante"
        input={
          !formulario ? (
            <InputContainer
              widthFull
              text="Seleccionar cliente"
              id="selectCliente"
            >
              <ReactSelect
                styles={{
                  option: (base) => ({
                    ...base,
                    fontSize: "14px",
                    cursor: "pointer",
                  }),
                }}
                isSearchable
                placeholder="Seleccionar cliente"
                noOptionsMessage={() => "Ninguna opción encontrada"}
                isLoading={!clientesRes}
                options={
                  clientesRes?.data.map((user) => ({
                    value: user.id,
                    label: user.nombre,
                  })) || []
                }
                onChange={handleChangeUser}
              />
              {/* <Select
                id="selectCliente"
                defaultOption="Seleccionar cliente"
                onChange={handleChangeUser}
              >
                {clientesRes ? (
                  clientesRes.data.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.nombre}
                    </option>
                  ))
                ) : (
                  <></>
                )}
              </Select> */}
            </InputContainer>
          ) : undefined
        }
      >
        <InputContainer text="Nombre del cliente">
          <Input value={selectedUser?.nombre || ""} disabled />
        </InputContainer>
        <InputContainer text="RUT/DIN No.">
          <Input value={selectedUser?.RUT || ""} disabled />
        </InputContainer>
        <InputContainer text="Domiciliado en">
          <Input value={selectedUser?.domicilio || ""} disabled />
        </InputContainer>
        <InputContainer text="Nacionalidad">
          <Input value={selectedUser?.nacionalidad || ""} disabled />
        </InputContainer>
        <InputContainer text="Profesión">
          <Input value={selectedUser?.profesion || ""} disabled />
        </InputContainer>
        <InputContainer text="Correo electrónico">
          <Input value={selectedUser?.correo || ""} disabled />
        </InputContainer>
      </Form.Section>
      <Form.Section text="Detalles del formulario">
        {formulario ? (
          <InputContainer text="OT">
            <Input
              value={formulario.OT}
              onChange={() => {}}
              disabled={disabled}
            />
          </InputContainer>
        ) : (
          <></>
        )}
        <InputContainer text="Fecha" id="formularioFecha">
          <Input
            id="formularioFecha"
            value={form.formularioFecha}
            onChange={(e) =>
              setForm((old) => ({ ...old, formularioFecha: e.target.value }))
            }
            type="date"
            disabled={disabled}
          />
        </InputContainer>
        <InputContainer text="Ciudad" id="formularioCiudad">
          <Input
            id="formularioCiudad"
            value={form.formularioCiudad}
            onChange={(e) =>
              setForm((old) => ({ ...old, formularioCiudad: e.target.value }))
            }
            disabled={disabled}
          />
        </InputContainer>
        <InputContainer text="País" id="formularioPais">
          <Input
            id="formularioPais"
            value={form.formularioPais}
            onChange={(e) =>
              setForm((old) => ({ ...old, formularioPais: e.target.value }))
            }
            disabled={disabled}
          />
        </InputContainer>
      </Form.Section>
      <Form.Section text="El mandante require el vehículo">
        <InputContainer text="Marca" id="vehiculoMarca">
          <Input
            id="vehiculoMarca"
            value={form.vehiculoMarca}
            onChange={(e) =>
              setForm((old) => ({ ...old, vehiculoMarca: e.target.value }))
            }
            disabled={disabled}
          />
        </InputContainer>
        <InputContainer text="Modelo" id="vehiculoModelo">
          <Input
            id="vehiculoModelo"
            value={form.vehiculoModelo}
            onChange={(e) =>
              setForm((old) => ({ ...old, vehiculoModelo: e.target.value }))
            }
            disabled={disabled}
          />
        </InputContainer>
        <InputContainer text="Año" id="vehiculoYear">
          <Input
            id="vehiculoYear"
            value={form.vehiculoYear}
            onChange={(e) =>
              setForm((old) => ({ ...old, vehiculoYear: e.target.value }))
            }
            disabled={disabled}
          />
        </InputContainer>
        <InputContainer text="VIN" id="vehiculoVIN">
          <Input
            id="vehiculoVIN"
            value={form.vehiculoVIN}
            onChange={(e) =>
              setForm((old) => ({ ...old, vehiculoVIN: e.target.value }))
            }
            disabled={disabled}
          />
        </InputContainer>
        <InputContainer text="OBS." id="vehiculoOBS">
          <Input
            id="vehiculoOBS"
            value={form.vehiculoOBS}
            onChange={(e) =>
              setForm((old) => ({ ...old, vehiculoOBS: e.target.value }))
            }
            disabled={disabled}
          />
        </InputContainer>
        <InputContainer text="Otros" id="vehiculoOtros">
          <Input
            id="vehiculoOtros"
            value={form.vehiculoOtros}
            onChange={(e) =>
              setForm((old) => ({ ...old, vehiculoOtros: e.target.value }))
            }
            disabled={disabled}
          />
        </InputContainer>
      </Form.Section>
      <Form.Section text="Documentos adjuntos">
        <CheckInput
          text="Invoice"
          value={form.documentoInvoice}
          onChange={(e) =>
            setForm((old) => ({ ...old, documentoInvoice: e.target.checked }))
          }
          disabled={disabled}
        />
        <CheckInput
          text="Swift bancario"
          value={form.documentoSwift}
          onChange={(e) =>
            setForm((old) => ({ ...old, documentoSwift: e.target.checked }))
          }
          disabled={disabled}
        />
        <CheckInput
          text="Central dispach"
          value={form.documentoDispach}
          onChange={(e) =>
            setForm((old) => ({ ...old, documentoDispach: e.target.checked }))
          }
          disabled={disabled}
        />
        <CheckInput
          text="BL."
          value={form.documentoBL}
          onChange={(e) =>
            setForm((old) => ({ ...old, documentoBL: e.target.checked }))
          }
          disabled={disabled}
        />
        <CheckInput
          text="BL."
          value={form.documentoBL}
          onChange={(e) =>
            setForm((old) => ({ ...old, documentoBL: e.target.checked }))
          }
          disabled={disabled}
        />
        <CheckInput
          text="Zeta"
          value={form.documentoZeta || false}
          onChange={(e) =>
            setForm((old) => ({ ...old, documentoZeta: e.target.checked }))
          }
          disabled={disabled}
        />
        <CheckInput
          text="Srf"
          value={form.documentoSrf || false}
          onChange={(e) =>
            setForm((old) => ({ ...old, documentoSrf: e.target.checked }))
          }
          disabled={disabled}
        />
        <CheckInput
          text="Contrato de compra y venta"
          value={form.documentoContratoCompraVenta || false}
          onChange={(e) =>
            setForm((old) => ({
              ...old,
              documentoContratoCompraVenta: e.target.checked,
            }))
          }
          disabled={disabled}
        />
        <CheckInput
          text="Dus"
          value={form.documentoDus || false}
          onChange={(e) =>
            setForm((old) => ({ ...old, documentoDus: e.target.checked }))
          }
          disabled={disabled}
        />
        <CheckInput
          text="Mic"
          value={form.documentoMic || false}
          onChange={(e) =>
            setForm((old) => ({ ...old, documentoMic: e.target.checked }))
          }
          disabled={disabled}
        />
        <CheckInput
          text="Crt"
          value={form.documentoCrt || false}
          onChange={(e) =>
            setForm((old) => ({ ...old, documentoCrt: e.target.checked }))
          }
          disabled={disabled}
        />
        <CheckInput
          text="Otros"
          value={form.documentoOtros}
          onChange={(e) =>
            setForm((old) => ({ ...old, documentoOtros: e.target.checked }))
          }
          disabled={disabled}
        />
      </Form.Section>
      <Form.Section text="Formas de pago">
        <CheckInput
          text="Transferencia bancaria"
          value={form.pagoTransferencia}
          onChange={(e) =>
            setForm((old) => ({ ...old, pagoTransferencia: e.target.checked }))
          }
          disabled={disabled}
        />
        <CheckInput
          text="Depósito directo"
          value={form.pagoDeposito}
          onChange={(e) =>
            setForm((old) => ({ ...old, pagoDeposito: e.target.checked }))
          }
          disabled={disabled}
        />
        <CheckInput
          text="Cobro por caja sala VTA. BOL"
          value={form.pagoCobro}
          onChange={(e) =>
            setForm((old) => ({ ...old, pagoCobro: e.target.checked }))
          }
          disabled={disabled}
        />
        <CheckInput
          text="Otros"
          value={form.pagoOtros}
          onChange={(e) =>
            setForm((old) => ({ ...old, pagoOtros: e.target.checked }))
          }
          disabled={disabled}
        />
      </Form.Section>
      {/* <Form.Section text="Legalidad (días, vencimiento)">
        <InputContainer text="VIN" id="legalidadVINDias">
          <Input
            id="legalidadVINDias"
            type="number"
            value={form.legalidadVINDias}
            onChange={(e) =>
              setForm((old) => ({ ...old, legalidadVINDias: e.target.value }))
            }
            disabled={disabled}
          />
          <Input
            value={form.legalidadVINFecha}
            onChange={(e) =>
              setForm((old) => ({ ...old, legalidadVINFecha: e.target.value }))
            }
            type="date"
            disabled={disabled}
          />
        </InputContainer>
        <InputContainer
          text="Compra internacional"
          id="legalidadCompraInternacionalDias"
        >
          <Input
            id="legalidadCompraInternacionalDias"
            type="number"
            value={form.legalidadCompraInternacionalDias}
            onChange={(e) =>
              setForm((old) => ({
                ...old,
                legalidadCompraInternacionalDias: e.target.value,
              }))
            }
            disabled={disabled}
          />
          <Input
            value={form.legalidadCompraInternacionalFecha}
            onChange={(e) =>
              setForm((old) => ({
                ...old,
                legalidadCompraInternacionalFecha: e.target.value,
              }))
            }
            type="date"
            disabled={disabled}
          />
        </InputContainer>
        <InputContainer text="Otros servicios" id="legalidadOtrosServiciosDias">
          <Input
            id="legalidadOtrosServiciosDias"
            type="number"
            value={form.legalidadOtrosServiciosDias}
            onChange={(e) =>
              setForm((old) => ({
                ...old,
                legalidadOtrosServiciosDias: e.target.value,
              }))
            }
            disabled={disabled}
          />
          <Input
            value={form.legalidadOtrosServiciosFecha}
            onChange={(e) =>
              setForm((old) => ({
                ...old,
                legalidadOtrosServiciosFecha: e.target.value,
              }))
            }
            type="date"
            disabled={disabled}
          />
        </InputContainer>
        <InputContainer text="Comisiones varias" id="legalidadComisionesDias">
          <Input
            id="legalidadComisionesDias"
            type="number"
            value={form.legalidadComisionesDias}
            onChange={(e) =>
              setForm((old) => ({
                ...old,
                legalidadComisionesDias: e.target.value,
              }))
            }
            disabled={disabled}
          />
          <Input
            value={form.legalidadComisionesFecha}
            onChange={(e) =>
              setForm((old) => ({
                ...old,
                legalidadComisionesFecha: e.target.value,
              }))
            }
            type="date"
            disabled={disabled}
          />
        </InputContainer>
        <InputContainer text="Otros valores" id="legalidadOtrosValoresDias">
          <Input
            id="legalidadOtrosValoresDias"
            type="number"
            value={form.legalidadOtrosValoresDias}
            onChange={(e) =>
              setForm((old) => ({
                ...old,
                legalidadOtrosValoresDias: e.target.value,
              }))
            }
            disabled={disabled}
          />
          <Input
            value={form.legalidadOtrosValoresFecha}
            onChange={(e) =>
              setForm((old) => ({
                ...old,
                legalidadOtrosValoresFecha: e.target.value,
              }))
            }
            type="date"
            disabled={disabled}
          />
        </InputContainer>
        <InputContainer text="Varios" id="legalidadVariosDias">
          <Input
            id="legalidadVariosDias"
            type="number"
            value={form.legalidadVariosDias}
            onChange={(e) =>
              setForm((old) => ({
                ...old,
                legalidadVariosDias: e.target.value,
              }))
            }
            disabled={disabled}
          />
          <Input
            value={form.legalidadVariosFecha}
            onChange={(e) =>
              setForm((old) => ({
                ...old,
                legalidadVariosFecha: e.target.value,
              }))
            }
            type="date"
            disabled={disabled}
          />
        </InputContainer>
      </Form.Section> */}
      <Form.Section text="Servicios logísticos a cobrar (US$)">
        <InputContainer
          text="Compra del vehículo con mandato"
          id="serviciosCompraVehiculo"
        >
          <Input
            id="serviciosCompraVehiculo"
            value={form.serviciosCompraVehiculo}
            onChange={(e) =>
              setForm((old) => ({
                ...old,
                serviciosCompraVehiculo: e.target.value,
              }))
            }
            type="number"
            disabled={disabled}
            small={formatDolar(form.serviciosCompraVehiculo)}
          />
        </InputContainer>
        <InputContainer
          text="Serv. de representación con mandato"
          id="serviciosRepresentacionMandato"
        >
          <Input
            id="serviciosRepresentacionMandato"
            value={form.serviciosRepresentacionMandato}
            onChange={(e) =>
              setForm((old) => ({
                ...old,
                serviciosRepresentacionMandato: e.target.value,
              }))
            }
            type="number"
            disabled={disabled}
            small={formatDolar(form.serviciosRepresentacionMandato)}
          />
        </InputContainer>
        <InputContainer
          text="Serv. cargos por flete naviero"
          id="serviciosCargosNaviero"
        >
          <Input
            id="serviciosCargosNaviero"
            value={form.serviciosCargosNaviero}
            onChange={(e) =>
              setForm((old) => ({
                ...old,
                serviciosCargosNaviero: e.target.value,
              }))
            }
            type="number"
            disabled={disabled}
            small={formatDolar(form.serviciosCargosNaviero)}
          />
        </InputContainer>
        <InputContainer
          text="Serv. cargos por servicios grúas"
          id="serviciosCargosGruas"
        >
          <Input
            id="serviciosCargosGruas"
            value={form.serviciosCargosGruas}
            onChange={(e) =>
              setForm((old) => ({
                ...old,
                serviciosCargosGruas: e.target.value,
              }))
            }
            type="number"
            disabled={disabled}
            small={formatDolar(form.serviciosCargosGruas)}
          />
        </InputContainer>
        <InputContainer
          text="Cargos por servicios de multas"
          id="serviciosMultas"
        >
          <Input
            id="serviciosMultas"
            value={form.serviciosMultas}
            onChange={(e) =>
              setForm((old) => ({ ...old, serviciosMultas: e.target.value }))
            }
            type="number"
            disabled={disabled}
            small={formatDolar(form.serviciosMultas)}
          />
        </InputContainer>
        <InputContainer
          text="Cargo comisión por serv. logísticos"
          id="serviciosCargosComision"
        >
          <Input
            id="serviciosCargosComision"
            value={form.serviciosCargosComision}
            onChange={(e) =>
              setForm((old) => ({
                ...old,
                serviciosCargosComision: e.target.value,
              }))
            }
            type="number"
            disabled={disabled}
            small={formatDolar(form.serviciosCargosComision)}
          />
        </InputContainer>
      </Form.Section>
      <Form.Section text="Anticipos recibidos (US$)">
        <InputContainer text="Compra del vehículo" id="anticiposCompraVehiculo">
          <Input
            id="anticiposCompraVehiculo"
            value={form.anticiposCompraVehiculo}
            onChange={(e) =>
              setForm((old) => ({
                ...old,
                anticiposCompraVehiculo: e.target.value,
              }))
            }
            type="number"
            disabled={disabled}
            small={formatDolar(form.anticiposCompraVehiculo)}
          />
        </InputContainer>
        <InputContainer text="Servicios logísticos" id="anticiposServicios">
          <Input
            id="anticiposServicios"
            value={form.anticiposServicios}
            onChange={(e) =>
              setForm((old) => ({ ...old, anticiposServicios: e.target.value }))
            }
            type="number"
            disabled={disabled}
            small={formatDolar(form.anticiposServicios)}
          />
        </InputContainer>
      </Form.Section>
      <Form.Section>
        <InputContainer text="Saldo por cobrar (US$)" id="saldoPorCobrar">
          <Input
            id="saldoPorCobrar"
            value={form.saldoPorCobrar}
            onChange={(e) =>
              setForm((old) => ({ ...old, saldoPorCobrar: e.target.value }))
            }
            type="number"
            disabled={disabled}
            small={formatDolar(form.saldoPorCobrar)}
          />
        </InputContainer>
      </Form.Section>
      <Form.Section>
        <InputContainer text="Autor del formulario" id="formularioAutor">
          <Input
            id="formularioAutor"
            value={form.formularioAutor}
            onChange={(e) =>
              setForm((old) => ({ ...old, formularioAutor: e.target.value }))
            }
            disabled={disabled}
          />
        </InputContainer>
        <InputContainer
          text="Recibido conforme por"
          id="formularioRecibidoConforme"
        >
          <Input
            id="formularioRecibidoConforme"
            value={form.formularioRecibidoConforme}
            onChange={(e) =>
              setForm((old) => ({
                ...old,
                formularioRecibidoConforme: e.target.value,
              }))
            }
            disabled={disabled}
          />
        </InputContainer>
      </Form.Section>
      <ButtonGuardarContainer>
        {!formulario && (
          <Button
            onClick={() => sureSend(true)}
            loading={loadingEraser}
            disabled={loading || loadingEdit || loadingSend}
            loadingText="Guardando..."
            type="secondary"
          >
            Guardar borrador
          </Button>
        )}
        {(!formulario || (!!observacion && user?.rol === "Admin")) && (
          <Button
            onClick={() => sureSend(false)}
            loading={loading}
            disabled={loadingEraser || loadingEdit || loadingSend}
            loadingText="Enviando..."
          >
            {!!observacion ? "Volver a enviar" : "Enviar a revisión"}
          </Button>
        )}
        {formulario &&
          user?.rol === "Admin" &&
          (formulario.estado === "Nuevo" ||
            formulario.estado === "Borrador") && (
            <Button
              onClick={sureEdit}
              loading={loadingEraser}
              disabled={loading || loadingEdit || loadingSend}
              loadingText="Enviando..."
              type={formulario.estado === "Borrador" ? "secondary" : "primary"}
            >
              Editar
            </Button>
          )}
        {formulario &&
          user?.rol === "Admin" &&
          formulario.estado === "Borrador" && (
            <Button
              onClick={sureCheck}
              loading={loadingSend}
              disabled={loadingEraser || loadingEdit || loading}
              loadingText="Enviando..."
            >
              Enviar a revisión
            </Button>
          )}
      </ButtonGuardarContainer>
    </Form>
  );
};

export default Content;

const ButtonGuardarContainer = styled.div`
  align-self: flex-end;
  margin-top: 24px;
  display: flex;
  gap: 12px;
`;

const Text = styled.p`
  color: ${colors.gray300};
`;
