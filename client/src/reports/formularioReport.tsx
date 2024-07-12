import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Font,
} from "@react-pdf/renderer";
import { FormularioShow } from "../global/interfaces/formulario";
import { http } from "../utilities/http";
import Swal from "sweetalert2";

interface Props {
  formulario?: FormularioShow;
  handleReport: () => void;
}

const FormularioReport = ({ formulario, handleReport }: Props) => {
  const findBy = (tipo: string) => {
    const respuesta = formulario?.respuestas.find((res) => res.tipo === tipo);
    return respuesta?.dato || "";
  };

  const calcTotalServicios = () => {
    const servicios = [
      findBy("serviciosCompraVehiculo"),
      findBy("serviciosRepresentacionMandato"),
      findBy("serviciosCargosNaviero"),
      findBy("serviciosCargosGruas"),
      findBy("serviciosMultas"),
      findBy("serviciosCargosComision"),
    ];
    return servicios.reduce((acc, val) => acc + Number(val || 0), 0);
  };

  const calcTotalAnticipos = () => {
    const servicios = [
      findBy("anticiposCompraVehiculo"),
      findBy("anticiposServicios"),
    ];
    return servicios.reduce((acc, val) => acc + Number(val || 0), 0);
  };

  if (!formulario) return null;
  if (formulario.estado !== "Firmado") {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Este formulario no está firmado",
    });
    handleReport();
  }

  const formatDolar = (num: string | number) => {
    return num !== "" ? Intl.NumberFormat("de-DE").format(+num) : "";
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.topContainer}>
          <View style={styles.formContainer}>
            <View style={styles.headerContainer}>
              <View style={styles.leftHeaderContainer}>
                <Text style={styles.text}>{findBy("importadoraNombre")}</Text>
                <Text style={styles.text}>
                  RUT No.{findBy("importadoraRUT")}
                </Text>
                <Text style={styles.text}>
                  DIRECCION: {findBy("importadoraDireccion")}
                </Text>
              </View>
              <View style={styles.rightHeaderContainer}>
                <View style={styles.headerCellContainer}>
                  <Text style={styles.text}>No. OT:</Text>
                  <Text style={[styles.text, styles.headerCell]}>
                    {formulario.OT}
                  </Text>
                </View>
                <View style={styles.headerCellContainer}>
                  <Text style={styles.text}>Fecha:</Text>
                  <Text style={[styles.text, styles.headerCell]}>
                    {findBy("formularioFecha")}
                  </Text>
                </View>
                <View style={styles.headerCellContainer}>
                  <Text style={styles.text}>Ciudad:</Text>
                  <Text style={[styles.text, styles.headerCell]}>
                    {findBy("formularioCiudad")}
                  </Text>
                </View>
                <View style={styles.headerCellContainer}>
                  <Text style={styles.text}>Pais:</Text>
                  <Text style={[styles.text, styles.headerCell]}>
                    {findBy("formularioPais")}
                  </Text>
                </View>
              </View>
            </View>
            <Text style={[styles.text, styles2.title]}>ORDEN DE TRABAJO</Text>
            <View style={styles.headerContainer}>
              <View style={styles2.row1LeftTable}>
                <Text style={[styles.text, styles2.row1LeftTitle]}>
                  1) DATOS DEL MANDANTE:
                </Text>
                <View style={styles2.row1LeftTableRow}>
                  <Text style={[styles.text, styles2.row1LeftText]}>
                    NOMBRE CLIENTE:
                  </Text>
                  <Text style={[styles.text, styles2.row1RightText]}>
                    {formulario.usuario.nombre}
                  </Text>
                </View>
                <View style={styles2.row1LeftTableRow}>
                  <Text style={[styles.text, styles2.row1LeftText]}>
                    RUT/DIN No.:
                  </Text>
                  <Text style={[styles.text, styles2.row1RightText]}>
                    {formulario.usuario.RUT}
                  </Text>
                </View>
                <View style={styles2.row1LeftTableRow}>
                  <Text style={[styles.text, styles2.row1LeftText]}>
                    DOMICILIADO EN:
                  </Text>
                  <Text style={[styles.text, styles2.row1RightText]}>
                    {formulario.usuario.domicilio}
                  </Text>
                </View>
                <View style={styles2.row1LeftTableRow}>
                  <Text style={[styles.text, styles2.row1LeftText]}>
                    NACIONALIDAD:
                  </Text>
                  <Text style={[styles.text, styles2.row1RightText]}>
                    {formulario.usuario.nacionalidad}
                  </Text>
                </View>
                <View style={styles2.row1LeftTableRow}>
                  <Text style={[styles.text, styles2.row1LeftText]}>
                    PROFESION:
                  </Text>
                  <Text style={[styles.text, styles2.row1RightText]}>
                    {formulario.usuario.profesion}
                  </Text>
                </View>
                <View style={styles2.row1LeftTableRow}>
                  <Text style={[styles.text, styles2.row1LeftText]}>
                    CORREO ELECTRONICO:
                  </Text>
                  <Text style={[styles.text, styles2.row1RightText]}>
                    {formulario.usuario.correo}
                  </Text>
                </View>
              </View>
              {/* <View style={styles2.row1LeftTable}>
                <View style={styles2.row1LeftTableRow}>
                  <Text style={[styles.text, stylesTable5.leftText]}>
                    5) LEGALIDAD
                  </Text>
                  <Text style={[styles.text, stylesTable5.otherText]}>
                    DIAS
                  </Text>
                  <Text style={[styles.text, stylesTable5.otherText]}>
                    VENCE EL
                  </Text>
                </View>
                <View style={styles2.row1LeftTableRow}>
                  <Text style={[styles.text, stylesTable5.leftText]}>
                    MANDATO SIN REPRESENTACION
                  </Text>
                  <Text style={[styles.text, stylesTable5.otherText]}>
                    {findBy("legalidadVINDias")}
                  </Text>
                  <Text style={[styles.text, stylesTable5.otherText]}>
                    {findBy("legalidadVINFecha")}
                  </Text>
                </View>
                <View style={styles2.row1LeftTableRow}>
                  <Text style={[styles.text, stylesTable5.leftText]}>
                    COMPRA INTERNACIONAL
                  </Text>
                  <Text style={[styles.text, stylesTable5.otherText]}>
                    {findBy("legalidadCompraInternacionalDias")}
                  </Text>
                  <Text style={[styles.text, stylesTable5.otherText]}>
                    {findBy("legalidadCompraInternacionalFecha")}
                  </Text>
                </View>
                <View style={styles2.row1LeftTableRow}>
                  <Text style={[styles.text, stylesTable5.leftText]}>
                    OTROS SERVICIOS
                  </Text>
                  <Text style={[styles.text, stylesTable5.otherText]}>
                    {findBy("legalidadOtrosServiciosDias")}
                  </Text>
                  <Text style={[styles.text, stylesTable5.otherText]}>
                    {findBy("legalidadOtrosServiciosFecha")}
                  </Text>
                </View>
                <View style={styles2.row1LeftTableRow}>
                  <Text style={[styles.text, stylesTable5.leftText]}>
                    COMISIONES VARIAS
                  </Text>
                  <Text style={[styles.text, stylesTable5.otherText]}>
                    {findBy("legalidadComisionesDias")}
                  </Text>
                  <Text style={[styles.text, stylesTable5.otherText]}>
                    {findBy("legalidadComisionesFecha")}
                  </Text>
                </View>
                <View style={styles2.row1LeftTableRow}>
                  <Text style={[styles.text, stylesTable5.leftText]}>
                    OTROS VALORES
                  </Text>
                  <Text style={[styles.text, stylesTable5.otherText]}>
                    {findBy("legalidadOtrosValoresDias")}
                  </Text>
                  <Text style={[styles.text, stylesTable5.otherText]}>
                    {findBy("legalidadOtrosValoresFecha")}
                  </Text>
                </View>
                <View style={styles2.row1LeftTableRow}>
                  <Text style={[styles.text, stylesTable5.leftText]}>
                    VARIOS
                  </Text>
                  <Text style={[styles.text, stylesTable5.otherText]}>
                    {findBy("legalidadVariosDias")}
                  </Text>
                  <Text style={[styles.text, stylesTable5.otherText]}>
                    {findBy("legalidadVariosFecha")}
                  </Text>
                </View>
              </View> */}
              <View style={stylesTable5.bigTable}>
                <View style={styles2.row1LeftTableRow}>
                  <Text style={[styles.text, stylesTable5.minText]}>
                    CÓDIGO
                  </Text>
                  <Text style={[styles.text, stylesTable5.maxText]}>
                    6) SERVICIOS LOGISTICOS A COBRAR
                  </Text>
                  <Text style={[styles.text, stylesTable5.minText]}>
                    TOTAL US$
                  </Text>
                </View>
                <View style={styles2.row1LeftTableRow}>
                  <Text style={[styles.text, stylesTable5.minText]}>1001</Text>
                  <Text style={[styles.text, stylesTable5.maxText]}>
                    COMPRA DEL VEHICULO CON MANDATO
                  </Text>
                  <Text style={[styles.text, stylesTable5.minText]}>
                    {formatDolar(findBy("serviciosCompraVehiculo"))}
                  </Text>
                </View>
                <View style={styles2.row1LeftTableRow}>
                  <Text style={[styles.text, stylesTable5.minText]}>1002</Text>
                  <Text style={[styles.text, stylesTable5.maxText]}>
                    SERVICIOS DE REPRESENTACION CON MANDATO
                  </Text>
                  <Text style={[styles.text, stylesTable5.minText]}>
                    {formatDolar(findBy("serviciosRepresentacionMandato"))}
                  </Text>
                </View>
                <View style={styles2.row1LeftTableRow}>
                  <Text style={[styles.text, stylesTable5.minText]}>1003</Text>
                  <Text style={[styles.text, stylesTable5.maxText]}>
                    SERVICIOS CARGOS POR FLETE NAVIERO{" "}
                  </Text>
                  <Text style={[styles.text, stylesTable5.minText]}>
                    {formatDolar(findBy("serviciosCargosNaviero"))}
                  </Text>
                </View>
                <View style={styles2.row1LeftTableRow}>
                  <Text style={[styles.text, stylesTable5.minText]}>1004</Text>
                  <Text style={[styles.text, stylesTable5.maxText]}>
                    SERVICIOS CARGOS POR SERVICIOS GRUAS
                  </Text>
                  <Text style={[styles.text, stylesTable5.minText]}>
                    {formatDolar(findBy("serviciosCargosGruas"))}
                  </Text>
                </View>
                <View style={styles2.row1LeftTableRow}>
                  <Text style={[styles.text, stylesTable5.minText]}>1005</Text>
                  <Text style={[styles.text, stylesTable5.maxText]}>
                    CARGOS POR SERVICIOS DE MULTAS (VER DETALLE)
                  </Text>
                  <Text style={[styles.text, stylesTable5.minText]}>
                    {formatDolar(findBy("serviciosMultas"))}
                  </Text>
                </View>
                <View style={styles2.row1LeftTableRow}>
                  <Text style={[styles.text, stylesTable5.minText]}>1006</Text>
                  <Text style={[styles.text, stylesTable5.maxText]}></Text>
                  <Text style={[styles.text, stylesTable5.minText]}></Text>
                </View>
                <View style={styles2.row1LeftTableRow}>
                  <Text style={[styles.text, stylesTable5.minText]}>1007</Text>
                  <Text style={[styles.text, stylesTable5.maxText]}>
                    CARGO POR COMISION POR SERVICIOS LOGISTICOS
                  </Text>
                  <Text style={[styles.text, stylesTable5.minText]}>
                    {formatDolar(findBy("serviciosCargosComision"))}
                  </Text>
                </View>
                <View style={styles2.row1LeftTableRow}>
                  <Text style={[styles.text, stylesTable5.minText]}></Text>
                  <Text style={[styles.text, stylesTable5.maxText]}>
                    TOTAL DE LA OPERACIÓN US$
                  </Text>
                  <Text style={[styles.text, stylesTable5.minText]}>
                    {formatDolar(calcTotalServicios())}
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.headerContainer}>
              <View style={styles2.row1LeftTable}>
                <Text style={[styles.text, styles2.row1LeftTitle]}>
                  2) EL MANDANTE REQUIERE EL VEHÍCULO:
                </Text>
                <View style={styles2.row1LeftTableRow}>
                  <Text style={[styles.text, styles2.row1LeftText]}>
                    MARCA:
                  </Text>
                  <Text style={[styles.text, styles2.row1RightText]}>
                    {findBy("vehiculoMarca")}
                  </Text>
                </View>
                <View style={styles2.row1LeftTableRow}>
                  <Text style={[styles.text, styles2.row1LeftText]}>
                    MODELO:
                  </Text>
                  <Text style={[styles.text, styles2.row1RightText]}>
                    {findBy("vehiculoModelo")}
                  </Text>
                </View>
                <View style={styles2.row1LeftTableRow}>
                  <Text style={[styles.text, styles2.row1LeftText]}>AÑO:</Text>
                  <Text style={[styles.text, styles2.row1RightText]}>
                    {findBy("vehiculoYear")}
                  </Text>
                </View>
                <View style={styles2.row1LeftTableRow}>
                  <Text style={[styles.text, styles2.row1LeftText]}>VIN:</Text>
                  <Text style={[styles.text, styles2.row1RightText]}>
                    {findBy("vehiculoVIN")}
                  </Text>
                </View>
                <View style={styles2.row1LeftTableRow}>
                  <Text style={[styles.text, styles2.row1LeftText]}>OBS:</Text>
                  <Text style={[styles.text, styles2.row1RightText]}>
                    {findBy("vehiculoOBS")}
                  </Text>
                </View>
                <View style={styles2.row1LeftTableRow}>
                  <Text style={[styles.text, styles2.row1LeftText]}>
                    OTROS:
                  </Text>
                  <Text style={[styles.text, styles2.row1RightText]}>
                    {findBy("vehiculoOtros")}
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.headerContainer}>
              <View style={stylesTable5.treintaTable}>
                <Text style={[styles.text, styles2.row1LeftTitle]}>
                  3) DOCUMENTOS ADJUNTOS:
                </Text>
                <View style={styles2.row1LeftTableRow}>
                  <Text style={[styles.text, stylesTable5.maximoText]}>
                    1) INVOICE:
                  </Text>
                  <Text style={[styles.text, stylesTable5.minimoText]}>
                    {findBy("documentoInvoice") === "SI" ? "X" : ""}
                  </Text>
                </View>
                <View style={styles2.row1LeftTableRow}>
                  <Text style={[styles.text, stylesTable5.maximoText]}>
                    2) SWIFT BANCARIO:
                  </Text>
                  <Text style={[styles.text, stylesTable5.minimoText]}>
                    {findBy("documentoSwift") === "SI" ? "X" : ""}
                  </Text>
                </View>
                <View style={styles2.row1LeftTableRow}>
                  <Text style={[styles.text, stylesTable5.maximoText]}>
                    3) CENTRAL DISPACH:
                  </Text>
                  <Text style={[styles.text, stylesTable5.minimoText]}>
                    {findBy("documentoDispach") === "SI" ? "X" : ""}
                  </Text>
                </View>
                <View style={styles2.row1LeftTableRow}>
                  <Text style={[styles.text, stylesTable5.maximoText]}>
                    4) BL:
                  </Text>
                  <Text style={[styles.text, stylesTable5.minimoText]}>
                    {findBy("documentoBL") === "SI" ? "X" : ""}
                  </Text>
                </View>
                <View style={styles2.row1LeftTableRow}>
                  <Text style={[styles.text, stylesTable5.maximoText]}>
                    5) ZETA:
                  </Text>
                  <Text style={[styles.text, stylesTable5.minimoText]}>
                    {findBy("documentoZeta") === "SI" ? "X" : ""}
                  </Text>
                </View>
                <View style={styles2.row1LeftTableRow}>
                  <Text style={[styles.text, stylesTable5.maximoText]}>
                    6) SRF:
                  </Text>
                  <Text style={[styles.text, stylesTable5.minimoText]}>
                    {findBy("documentoSrf") === "SI" ? "X" : ""}
                  </Text>
                </View>
                <View style={styles2.row1LeftTableRow}>
                  <Text style={[styles.text, stylesTable5.maximoText]}>
                    7) CONT. COMPRA/VENTA:
                  </Text>
                  <Text style={[styles.text, stylesTable5.minimoText]}>
                    {findBy("documentoContratoCompraVenta") === "SI" ? "X" : ""}
                  </Text>
                </View>
                <View style={styles2.row1LeftTableRow}>
                  <Text style={[styles.text, stylesTable5.maximoText]}>
                    8) DUS:
                  </Text>
                  <Text style={[styles.text, stylesTable5.minimoText]}>
                    {findBy("documentoDus") === "SI" ? "X" : ""}
                  </Text>
                </View>
                <View style={styles2.row1LeftTableRow}>
                  <Text style={[styles.text, stylesTable5.maximoText]}>
                    9) MIC:
                  </Text>
                  <Text style={[styles.text, stylesTable5.minimoText]}>
                    {findBy("documentoMic") === "SI" ? "X" : ""}
                  </Text>
                </View>
                <View style={styles2.row1LeftTableRow}>
                  <Text style={[styles.text, stylesTable5.maximoText]}>
                    10) CRT:
                  </Text>
                  <Text style={[styles.text, stylesTable5.minimoText]}>
                    {findBy("documentoCrt") === "SI" ? "X" : ""}
                  </Text>
                </View>
                <View style={styles2.row1LeftTableRow}>
                  <Text style={[styles.text, stylesTable5.maximoText]}>
                    11) OTROS:
                  </Text>
                  <Text style={[styles.text, stylesTable5.minimoText]}>
                    {findBy("documentoOtros") === "SI" ? "X" : ""}
                  </Text>
                </View>
              </View>
              <View style={stylesTable5.treintaTable2}>
                <Text style={[styles.text, styles2.row1LeftTitle]}>
                  4) FORMAS DE PAGO:
                </Text>
                <View style={styles2.row1LeftTableRow}>
                  <Text style={[styles.text, stylesTable5.maximoText]}>
                    1) TRANSFERENCIA BANCARIA:
                  </Text>
                  <Text style={[styles.text, stylesTable5.minimoText]}>
                    {findBy("pagoTransferencia") === "SI" ? "X" : ""}
                  </Text>
                </View>
                <View style={styles2.row1LeftTableRow}>
                  <Text style={[styles.text, stylesTable5.maximoText]}>
                    2) DEPÓSITO DIRECTO:
                  </Text>
                  <Text style={[styles.text, stylesTable5.minimoText]}>
                    {findBy("pagoDeposito") === "SI" ? "X" : ""}
                  </Text>
                </View>
                <View style={styles2.row1LeftTableRow}>
                  <Text style={[styles.text, stylesTable5.maximoText]}>
                    3) COBRO POR CAJA SALA VTA. BOL:
                  </Text>
                  <Text style={[styles.text, stylesTable5.minimoText]}>
                    {findBy("pagoCobro") === "SI" ? "X" : ""}
                  </Text>
                </View>
                <View style={styles2.row1LeftTableRow}>
                  <Text style={[styles.text, stylesTable5.maximoText]}>
                    4) OTROS:
                  </Text>
                  <Text style={[styles.text, stylesTable5.minimoText]}>
                    {findBy("pagoOtros") === "SI" ? "X" : ""}
                  </Text>
                </View>
              </View>
              <View style={styles2.row1LeftTable}>
                <View style={styles2.row1LeftTableRow}>
                  <Text style={[styles.text, styles2.row1RightText]}>
                    7) ANTICIPOS RECIBIDOS
                  </Text>
                  <Text style={[styles.text, styles2.row1LeftText]}>
                    TOTAL US$
                  </Text>
                </View>
                <View style={styles2.row1LeftTableRow}>
                  <Text style={[styles.text, styles2.row1RightText]}>
                    COMPRA DEL VEHÍCULO:
                  </Text>
                  <Text style={[styles.text, styles2.row1LeftText]}>
                    {formatDolar(findBy("anticiposCompraVehiculo"))}
                  </Text>
                </View>
                <View style={styles2.row1LeftTableRow}>
                  <Text style={[styles.text, styles2.row1RightText]}>
                    SERVICIOS LOGÍSTICOS:
                  </Text>
                  <Text style={[styles.text, styles2.row1LeftText]}>
                    {formatDolar(findBy("anticiposServicios"))}
                  </Text>
                </View>
                <View style={styles2.row1LeftTableRow}>
                  <Text style={[styles.text, styles2.row1RightText]}>
                    TOTAL ANTICIPOS RECIBIDOS US$
                  </Text>
                  <Text style={[styles.text, styles2.row1LeftText]}>
                    {formatDolar(calcTotalAnticipos())}
                  </Text>
                </View>
                <View style={styles2.row1LeftTableRow}>
                  <Text style={[styles.text, styles2.row1RightText]}>
                    SALDO POR COBRAR US$
                  </Text>
                  <Text style={[styles.text, styles2.row1LeftText]}>
                    {formatDolar(findBy("saldoPorCobrar"))}
                  </Text>
                </View>
              </View>
            </View>
            <View style={stylesTable5.lastRow}>
              <Text style={[styles.text, stylesTable5.lastText]}>
                {findBy("formularioAutor")}
              </Text>
              <Text style={[styles.text, stylesTable5.lastText]}>
                RECIBIDO CONFORME POR {findBy("formularioRecibidoConforme")}
              </Text>
            </View>
          </View>
          <Text style={stylesLast.lastDetail}>
            Firman los interesados bajo detalle en anverso de la hoja
          </Text>
        </View>
        <View style={stylesLast.signsContainer}>
          <View style={stylesLast.mySign}>
            <Image
              source={`${http.replace("api/", "")}storage/${
                formulario.usuario.firma
              }`}
              style={stylesLast.signImage}
            />
            <Text style={stylesLast.lastDetail}>
              {formulario.usuario.nombre}
            </Text>
            <Text style={stylesLast.lastDetail}>
              R.U.T. Nº {formulario.usuario.RUT}
            </Text>
            <Text style={stylesLast.lastDetail}>COMPRADOR.</Text>
          </View>
          <View style={stylesLast.lastContainer}>
            <Text style={stylesLast.lastDetail}>
              {findBy("importadoraEncargado")}
            </Text>
            <Text style={stylesLast.lastDetail}>
              P.P. {findBy("importadoraNombre")} VENDEDOR.
            </Text>
          </View>
        </View>
      </Page>
      <Page size="A4" style={stylesSecond.page}>
        <Text style={stylesSecond.paraph}>
          <Text style={stylesSecond.negrita}>PRIMERO. Precio.</Text> El precio
          que deberá pagar el comprador al vendedor por la venta objeto de este
          contrato consiste en el costo de adquisición e importación para el
          vendedor más 200 USD (doscientos dólares americanos). Que, para estos
          efectos, por costo se entenderá el compuesto por las partidas
          señaladas en el Anexo 01, el que firmado por las partes forma parte
          integrante del presente contrato. En consecuencia, el precio de la
          mercancía será el compuesto por las partidas señaladas en el Anexo 01
          de conformidad a su valor real al momento de entrega de la mercancía
          incrementado en 200 USD.
        </Text>
        <Text style={stylesSecond.paraph}>
          <Text style={stylesSecond.negrita}>SEGUNDO. Forma de venta.</Text> La
          venta se efectuará en condiciones ex-warehouse (EXW) sometiéndose. las
          partes contratantes, en cuanto a la interpretación de dicho termino
          comercial, a las reglas internacionales publicadas por la Cámara de
          Comercio Internacional (INCOTERMS 2000) en lo que no se hubieren
          modificado por el presente instrumento.
        </Text>
        <Text style={stylesSecond.paraph}>
          <Text style={stylesSecond.negrita}>TERCERO. Entrega.</Text> El
          vendedor cumplirá su obligación de entrega del presente contrato al
          poner la mercadería en su local comercial a disposición del comprador;
          no siendo responsable de cargar la mercadería en el transporte
          proporcionado por el comprador ni despacharla de aduana para la
          exportación, salvo acuerdo en otro sentido; y siendo de cargo del
          comprador todos los gastos y riesgos de retirar la mercadería desde el
          domicilio del vendedor hasta su destino final.
        </Text>
        <Text style={stylesSecond.paraph}>
          <Text style={stylesSecond.negrita}>CUARTO. Responsabilidad.</Text> Las
          partes dejan constancia que el vendedor adquirirá en subasta en
          Estados Unidos de Norteamérica el automóvil previamente seleccionado
          por el comprador y a que hace referencia la cláusula primera
          precedente, en el estado en que éste se encuentra, que es conocida por
          el comprador y desconocida por el vendedor, no siendo en consecuencia
          el vendedor responsable por el estado de la mercancía objeto del
          contrato que mediante el presente acuerdo transfiere el vendedor al
          comprador.
        </Text>
        <Text style={stylesSecond.paraph}>
          <Text style={stylesSecond.negrita}>QUINTO. Forma de pago.</Text> El
          precio estipulado en el presente acuerdo se hará efectivo por el
          comprador al vendedor de la siguiente forma:
        </Text>
        <Text style={stylesSecond.enum}>
          1. El saldo contra entrega de documentos, al momento de la entrega de
          la mercadería de conformidad a la cláusula cuarta procedente.
        </Text>
        <Text style={stylesSecond.paraph}>
          Queda entendido que el precio pactado se ha calculado en base a los
          costos reales de adquisición e importación del vendedor a la fecha de
          la entrega de la mercadería, en tanto que las partidas del Anexo 01
          corresponden a los costos al día de la fecha del presente contrato.
          Consiguientemente, si entre dicha fecha y la pactada para la entrega
          se modificasen tales costos por causas ajenas a la voluntad del
          vendedor, el comprador estará obligado a soportar, un eventual aumento
          del precio, de acuerdo a los nuevos costos, modificando el monto a
          pagar contra la entrega de documentos. Se deja expresa constancia, que
          para el caso que el comprador realice el pago señalado en el número 1
          precedente mediante orden de pago internacional directamente al
          proveedor extranjero donde se efectúa el remate, deberá acreditar el
          pago mediante la correspondiente orden de pago, certificado de
          recepción u otro.
        </Text>
        <Text style={stylesSecond.paraph}>
          <Text style={stylesSecond.negrita}>SEXTO. Competencia.</Text> Las
          partes de común acuerdo, deciden someter cualquier controversia
          relativa al presente contrato a la competencia de los juzgados y
          tribunales del país del vendedor, y concretamente a los de la
          localidad en donde éste desarrolle sus actividades comerciales,
          debiéndose resolver el litigio de acuerdo con la ley del país del
          vendedor.
        </Text>
        <Text style={stylesSecond.paraph}>
          <Text style={stylesSecond.negrita}>SEPTIMO. Impuestos.</Text> Todos
          los impuestos que graven este contrato en el país del comprador
          correrán de cuenta de éste, debiendo atender el vendedor los que se
          devenguen en su país.
        </Text>
        <Text style={stylesSecond.paraph}>
          <Text style={stylesSecond.negrita}>OCTAVO. Ejemplares.</Text> Para
          constancia, y en señal de aceptación, se firma el presente documento
          en dos ejemplares, en la ciudad de {findBy("formularioCiudad")},{" "}
          {findBy("formularioPais")}, con fecha del {findBy("formularioFecha")}.
        </Text>
      </Page>
    </Document>
  );
};

export default FormularioReport;

Font.register({
  family: "Open Sans",
  fonts: [
    {
      src: "https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-regular.ttf",
    },
    {
      src: "https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-600.ttf",
      fontWeight: 600,
    },
  ],
});

const styles = StyleSheet.create({
  page: {
    padding: 12,
    paddingLeft: 40,
    paddingBottom: 50,
    gap: 20,
    flex: 1,
    justifyContent: "space-between",
  },
  topContainer: {
    gap: 20,
  },
  text: {
    fontSize: 7,
    fontWeight: "bold",
  },
  formContainer: {
    borderWidth: 1,
    borderColor: "#000",
    padding: 12,
    gap: 12,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  leftHeaderContainer: {
    flexDirection: "column",
    gap: 2,
    alignSelf: "flex-end",
  },
  rightHeaderContainer: {
    flexDirection: "column",
    alignItems: "flex-end",
    gap: -1,
  },
  headerCellContainer: {
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
  },
  headerCell: {
    width: 75,
    paddingVertical: 2,
    paddingHorizontal: 2,
    textAlign: "center",
    borderWidth: 1,
    borderColor: "#000",
  },
});

const styles2 = StyleSheet.create({
  title: {
    width: "100%",
    paddingVertical: 2,
    paddingHorizontal: 2,
    textAlign: "center",
    borderWidth: 1,
    borderColor: "#000",
  },
  row1LeftTable: {
    width: "45%",
    gap: -1,
  },
  row1LeftTitle: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#000",
    padding: 2,
  },
  row1LeftTableRow: {
    flexDirection: "row",
  },
  row1LeftText: {
    width: "30%",
    borderWidth: 1,
    borderColor: "#000",
    padding: 2,
  },
  row1RightText: {
    width: "70%",
    borderWidth: 1,
    borderColor: "#000",
    padding: 2,
  },
});

const stylesTable5 = StyleSheet.create({
  bigTable: {
    width: "50%",
    gap: -1,
  },
  leftText: {
    width: "60%",
    borderWidth: 1,
    borderColor: "#000",
    padding: 2,
  },
  otherText: {
    width: "20%",
    borderWidth: 1,
    borderColor: "#000",
    padding: 2,
  },
  maxText: {
    width: "70%",
    borderWidth: 1,
    borderColor: "#000",
    padding: 2,
  },
  minText: {
    width: "15%",
    borderWidth: 1,
    borderColor: "#000",
    padding: 2,
  },
  maximoText: {
    width: "90%",
    borderWidth: 1,
    borderColor: "#000",
    padding: 2,
  },
  minimoText: {
    width: "10%",
    borderWidth: 1,
    borderColor: "#000",
    padding: 2,
  },
  treintaTable: {
    width: "20%",
    gap: -1,
  },
  treintaTable2: {
    width: "25%",
    gap: -1,
  },
  lastRow: {
    alignSelf: "flex-end",
    width: "45%",
    gap: -1,
  },
  lastText: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#000",
    padding: 2,
    textAlign: "center",
  },
});

const stylesLast = StyleSheet.create({
  lastDetail: {
    width: "100%",
    textAlign: "center",
    fontSize: 10,
  },
  signsContainer: {
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: "10%",
    gap: 40,
  },
  mySign: {
    width: "30%",
    alignSelf: "flex-end",
    alignItems: "center",
  },
  signImage: {
    width: 200,
    height: 100,
    marginBottom: 20,
  },
  lastContainer: {
    width: "70%",
    alignSelf: "flex-end",
  },
});

const stylesSecond = StyleSheet.create({
  page: {
    gap: 10,
    padding: 40,
  },
  paraph: {
    fontSize: 10,
  },
  negrita: {
    fontWeight: "bold",
    fontFamily: "Open Sans",
  },
  enum: {
    fontSize: 10,
    paddingLeft: 40,
  },
});
