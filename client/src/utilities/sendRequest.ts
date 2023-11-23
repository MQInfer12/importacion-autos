import Swal from "sweetalert2"
import { http } from "./http"

interface Options {
  method: string
}

type ApiResponse<T> = {
  message: string, 
  data: T,
  status: number
}

export const sendRequest = async <T,>(route: string, body: Record<string, any> | null, options?: Options) => {
  const thisOptions: Options = {
    method: options?.method || "POST",
  }
  const token = document.cookie.replace("token=", "");
  const res = await fetch(`${http}${route}`, {
    method: thisOptions.method,
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": token ? `Bearer ${token}` : ""
    },
    body: thisOptions.method !== "GET" ? JSON.stringify(body || {}) : undefined
  });
  const json: ApiResponse<T> = await res.json();
  if(json.message === "Unauthenticated.") {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Tu tiempo de sesión ha expirado"
    });
  }
  return json;
}