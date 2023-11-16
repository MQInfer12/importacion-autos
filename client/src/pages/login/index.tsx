import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/dashboard/forms');
  }

  return (
    <div>
      <input />
      <input />
      <button onClick={handleLogin}>Ingresar</button>
    </div>
  )
}

export default Login