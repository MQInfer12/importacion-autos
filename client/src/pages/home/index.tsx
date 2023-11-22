import { FormularioRes } from "../../global/interfaces/formulario"
import { Container } from "../../global/styles/components"
import { useGet } from "../../hooks/useGet"
import Filter from "./components/filter"
import Table from "./components/table"

const Home = () => {
  const { res, getData } = useGet<FormularioRes[]>("formulario")

  return (
    <Container>
      <h2>Formularios</h2>
      <div>
        <Filter />
        <Table 
          data={res?.data}
          getData={getData}
        />
      </div>
    </Container>
  )
}

export default Home