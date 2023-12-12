import { useEffect, useRef, useState } from "react";
import { http } from "../utilities/http";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../utilities/getCookie";

type ApiResponse<T> = {
  status: number,
  message: string, 
  data: T
}

export type Data<T> = ApiResponse<T> | null

interface ReturnData<T> {
  res: Data<T>
  loading: boolean
  firstRender: boolean
  setRes: React.Dispatch<React.SetStateAction<Data<T>>>
  getData: () => void
}

export const useGet = <T,>(route: string, load: boolean = true): ReturnData<T> => {
  const [res, setRes] = useState<Data<T>>(null);
  const [loading, setLoading] = useState(load);
  const navigate = useNavigate();
  const firstRender = useRef(0);

  const getData = async () => {
    setLoading(true);
    const token = getCookie("auth");
    const res = await fetch(`${http}${route}`, token ? {
      headers: {
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`
      }
    } : undefined);
    const resJson = await res.json();
    if(resJson.message === "Unauthenticated.") {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Tu tiempo de sesión ha expirado"
      });
      document.cookie = `token=; max-age=0`;
      navigate("/");
    } else {
      setRes(resJson);
    }
    setLoading(false);
    if(firstRender.current === 0) {
      firstRender.current++;
    }
  };

  useEffect(() => {
    if(load) {
      getData();
    }
  }, []);

  return {
    res,
    loading,
    firstRender: firstRender.current === 0,
    setRes,
    getData
  }
}