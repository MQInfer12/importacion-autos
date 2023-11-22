import { Container } from "../../global/styles/components"
import Filter from "./components/filter"
import Table from "./components/table"

const Home = () => {
  return (
    <Container>
      <h2>Formularios</h2>
      <div>
        <Filter />
        <Table />
      </div>
    </Container>
  )
}

export default Home