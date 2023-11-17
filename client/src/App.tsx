import { HashRouter, Routes, Route } from "react-router-dom"
import Login from "./pages/login"
import Navbar from "./global/components/navbar"
import Home from "./pages/home"
import Profile from "./pages/profile"
import User from "./pages/user"
import FormPage from "./pages/form"
import UserForm from "./pages/userForm"

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="" element={<Login />} />
        <Route path="dashboard" element={<Navbar />}>
          <Route path="forms" element={<Home />} />
          <Route path="profile" element={<Profile />} />
          <Route path="user" element={<User />} />
          <Route path="userForm" element={<UserForm />} />
          <Route path="form" element={<FormPage />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}

export default App
