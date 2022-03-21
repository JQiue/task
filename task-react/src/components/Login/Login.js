import { useNavigate } from 'react-router-dom';

export default function Login(props) {
  const navigate = useNavigate();
  return (<div>
    <h2>Login Form</h2>
    <button onClick={() => navigate('/task')}>Go</button>
  </div>)
}