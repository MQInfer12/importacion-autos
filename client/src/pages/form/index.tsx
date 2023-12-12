import Content from './components/content';
import { Container } from '../../global/styles/components';
import { Navigate, useParams } from 'react-router-dom';
import { useGet } from '../../hooks/useGet';
import Loading from '../../global/components/loading';
import { EstadoFormulario, FormularioShow } from '../../global/interfaces/formulario';
import { useUser } from '../../store/user';
import Button from '../../global/components/button';
import { sendRequest } from '../../utilities/sendRequest';
import Swal from 'sweetalert2';
import { useEffect, useState } from 'react';
import { colors } from '../../global/styles/colors';
import { PDFViewer } from '@react-pdf/renderer';
import FormularioReport from '../../reports/formularioReport';

interface Props {
  PDF?: boolean
}

const FormPage = ({ PDF }: Props) => {
  const { id } = useParams();
  const { res, loading } = useGet<FormularioShow>(`formulario/${id}`, !!id);
  const { user } = useUser();
  const [estado, setEstado] = useState<EstadoFormulario>("Nuevo");
  const [loadSign, setLoadSign] = useState(false);
  const [loadDecline, setLoadDecline] = useState(false);
  const [observacion, setObservacion] = useState<string | null>(null);
  const [viewReport, setViewReport] = useState(!!PDF);

  const sureSign = () => {
    Swal.fire({
      icon: "warning",
      title: "¿Continuar?",
      text: "Firmarás este formulario",
      showDenyButton: true,
      confirmButtonText: "Confirmar",
      confirmButtonColor: colors.gray500
    }).then(result => {
      if(result.isConfirmed) {
        handleSign();
      }
    });
  }

  const handleSign = async () => {
    if(!id) return;
    setLoadSign(true);
    const res = await sendRequest(`sign/${id}`, null, {
      method: "PATCH"
    });
    if(res.status === 3) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: res.message
      });
    }
    if(res.status === 1) {
      Swal.fire({
        icon: "success",
        title: "Éxito",
        text: res.message
      });
      setEstado("Firmado");
    }
    setLoadSign(false);
  }

  const sureDecline = () => {
    Swal.fire({
      icon: "warning",
      text: "Escribe tu observación",
      input: "text",
      showDenyButton: true,
      confirmButtonText: "Confirmar",
      confirmButtonColor: colors.gray500
    }).then(result => {
      if(result.isConfirmed) {
        const observacion = Swal.getInput()?.value;
        if(!observacion) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "La observación es requerida",
          });
          return;
        }
        handleDecline(observacion);
      }
    });
  }

  const handleDecline = async (observacion: string) => {
    if(!id) return;
    setLoadDecline(true);
    const res = await sendRequest(`decline/${id}`, {
      observacion
    }, {
      method: "PATCH"
    });
    if(res.status === 1) {
      Swal.fire({
        icon: "success",
        title: "Éxito",
        text: res.message
      });
      setEstado("Declinado");
      setObservacion(observacion);
    }
    setLoadDecline(false);
  }

  const handleReport = () => {
    setViewReport(!viewReport);
  }

  useEffect(() => {
    if(res && res.status === 1) {
      setEstado(res.data.estado);
      setObservacion(res.data.observacion);
    }
  }, [res]);

  if(res?.status === 3 || res?.status === 2) {
    return <Navigate to="/dashboard/forms" />
  }
  return (
    <Container>
      <header>
        <section>
          <h2>{id ? viewReport ? res?.data ? `PDF ${res.data.OT}` : `PDF`  : "Formulario" : "Nuevo formulario"}</h2>
        </section>
        <div>
          {
            (!loading && !!id) &&
            (user?.rol === "Cliente") ? (
              estado === "Firmado" ?
              <Button 
                onClick={handleReport} 
                disabled={loading}
              >{viewReport ? "Ver formulario" : "Ver PDF"}</Button> :
              estado === "Nuevo" ?
              <>
              <Button 
                onClick={sureSign} 
                disabled={loading || loadDecline}
                loading={loadSign}
                loadingText='Firmando...'
              >Firmar</Button>
              <Button 
                type="secondary" 
                onClick={sureDecline}
                disabled={loading || loadSign}
                loading={loadDecline}
                loadingText='Enviando...'
              >Declinar</Button>
              </>
              : <></>
            ) : (
              estado === "Firmado" ?
              <Button 
                onClick={handleReport} 
                disabled={loading}
              >{viewReport ? "Ver formulario" : "Ver PDF"}</Button> :
              <></>
            )
          }
        </div>
      </header>
      <div>
        {
          loading ?
          <Loading /> :
          viewReport ?
          <PDFViewer height={"100%"}>
            <FormularioReport 
              formulario={res?.data}
              handleReport={handleReport}
            />
          </PDFViewer> :
          <Content 
            formulario={res?.data}
            observacion={observacion}
          />
        }
      </div>
    </Container>
  )
}

export default FormPage