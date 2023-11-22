export interface FormularioRes {
  id: number
  OT: string
  estado: "Nuevo" | "Firmado" | "Declinado"
  observacion: string | null
  idUsuario: number
  created_at: string
  updated_at: string
  fecha: string
  nombre_usuario: string
}

export interface FormularioShow {
  id: number
  OT: string
  estado: "Nuevo" | "Firmado" | "Declinado"
  observacion: string | null
  idUsuario: number
  created_at: string
  updated_at: string
  respuestas: Respuesta[]
}

export interface Respuesta {
  id: number
  idFormulario: number
  tipo: string
  dato: string
  created_at: string
  updated_at: string
}