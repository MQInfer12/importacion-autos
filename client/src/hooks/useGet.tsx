import { useEffect, useRef, useState } from "react";
import { http } from "../utilities/http";

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
  const firstRender = useRef(0);

  const getData = async () => {
    setLoading(true);
    const res = await fetch(`${http}${route}`);
    if(res.ok) {
      const resJson = await res.json();
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