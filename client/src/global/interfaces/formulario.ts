import { User } from "./user"

export type EstadoFormulario = "Nuevo" | "Firmado" | "Declinado" | "Borrador"

export interface FormularioRes {
  id: number
  OT: string
  estado: EstadoFormulario
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
  estado: EstadoFormulario
  observacion: string | null
  idUsuario: number
  created_at: string
  updated_at: string
  respuestas: Respuesta[]
  usuario: User
}

export interface Respuesta {
  id: number
  idFormulario: number
  tipo: string
  dato: string
  created_at: string
  updated_at: string
}