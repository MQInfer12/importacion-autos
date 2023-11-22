import { useState, useEffect } from "react"
import { FormularioRes } from "../../global/interfaces/formulario"
import { Container } from "../../global/styles/components"
import { useGet } from "../../hooks/useGet"
import Filter from "./components/filter"
import Table from "./components/table"
import { filterBy } from "../../utilities/filterBy"

export type TypeFilter = "nombre" | "fecha"

const Home = () => {
  const { res } = useGet<FormularioRes[]>("formulario")
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("nombre");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    setFilter("");
  }, [typeFilter]);
  
  return (
    <Container>
      <h2>Formularios</h2>
      <div>
        <Filter 
          typeFilter={typeFilter} 
          setTypeFilter={setTypeFilter} 
          filter={filter}
          setFilter={setFilter}
        />
        <Table 
          data={res?.data
            .filter(formulario => 
              filterBy(
                typeFilter === "nombre" ? formulario.nombre_usuario : formulario.fecha,
                filter
              )
            )
          }
        />
      </div>
    </Container>
  )
}

export default Home