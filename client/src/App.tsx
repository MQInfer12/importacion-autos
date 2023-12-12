import { HashRouter, Routes, Route } from "react-router-dom"
import Login from "./pages/login"
import Navbar from "./global/components/navbar"
import Home from "./pages/home"
import Profile from "./pages/profile"
import FormPage from "./pages/form"
import UserForm from "./pages/userForm"
import UserPage from "./pages/user"

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="" element={<Login />} />
        <Route path="dashboard" element={<Navbar />}>
          <Route path="forms" element={<Home />} />
          <Route path="profile" element={<Profile />} />
          <Route path="user" element={<UserPage />} />
          <Route path="userForm" element={<UserForm />} />
          <Route path="userForm/:id" element={<UserForm />} />
          <Route path="form" element={<FormPage />} />
          <Route path="form/:id" element={<FormPage />} />
          <Route path="form/:id/PDF" element={<FormPage PDF />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}

export default App
