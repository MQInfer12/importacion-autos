import { User } from "../../global/interfaces/user"
import { useGet } from "../../hooks/useGet"
import Filter from "./components/filter"
import Table from "./components/table"
import { useState } from 'react'
import { filterBy } from "../../utilities/filterBy"
import { Container } from "../../global/styles/components"
import { useUser } from "../../store/user"
import { Navigate } from "react-router-dom"

const UserPage = () => {
  const { res, getData } = useGet<User[]>("usuario");
  const [filter, setFilter] = useState("");
  const { user } = useUser();

  if(user?.rol !== "Admin") return <Navigate to="/dashboard/forms" />
  return (
    <Container>
      <h2>Usuarios</h2>
      <div>
        <Filter 
          filter={filter}
          setFilter={setFilter}
        />
        <Table 
          data={res?.data.filter(user => filterBy(user.nombre, filter))}
          getData={getData}
        />
      </div>
    </Container>
  )
}

export default UserPage