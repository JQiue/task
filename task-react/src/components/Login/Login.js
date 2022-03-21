import { useNavigate } from 'react-router-dom';
import './login.css'

export default function Login(props) {
  const navigate = useNavigate();
  return (
    <div className='login'>
      <div className='weather'>
        <div className='weather-item'>
          <span className="city">城市</span>
          <span className='temp'>温度°</span>
          <img src="/asserts/qing.png" alt="" />
        </div>
        <div className='weather-item'>
          <span className="city">城市</span>
          <span className='temp'>温度°</span>
          <img src="/asserts/yin.png" alt="" />
        </div>
        <div className='weather-item'>
          <span className="city">城市</span>
          <span className='temp'>温度°</span>
          <img src="/asserts/yu.png" alt="" />
        </div>
        <div className='weather-item'>
          <span className="city">城市</span>
          <span className='temp'>温度°</span>
          <img src="/asserts/yu.png" alt="" />
        </div>
      </div>
      <button className='btn' onClick={() => navigate('/task')}>Go</button>
    </div>
  )
}