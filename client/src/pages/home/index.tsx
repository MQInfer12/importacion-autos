import { useState, useEffect } from "react"
import { FormularioRes } from "../../global/interfaces/formulario"
import { Container } from "../../global/styles/components"
import { useGet } from "../../hooks/useGet"
import Filter from "./components/filter"
import Table from "./components/table"
import { filterBy } from "../../utilities/filterBy"
import { useUser } from "../../store/user"
import Button from "../../global/components/button"
import { useNavigate } from "react-router-dom"

export type TypeFilter = "nombre" | "fecha"

const Home = () => {
  const { res } = useGet<FormularioRes[]>("formulario")
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("nombre");
  const [filter, setFilter] = useState("");
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    setFilter("");
  }, [typeFilter]);
  
  return (
    <Container>
      <header>
        <h2>Formularios</h2>
        <div>
        {
          user?.rol === "Admin" &&
          <Button onClick={() => navigate('/dashboard/form')}>Crear</Button>
        }
        </div>
      </header>
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