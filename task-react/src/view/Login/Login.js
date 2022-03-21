import { useNavigate } from 'react-router-dom';
import React, {useState, useEffect} from 'react';
import './login.css'

import Input from '../../components/Input/Input';

export default function Login(props) {
  const [weathers, setWeathers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    global.http.get('/api/weather/get', result => {
      setWeathers(result.data.data);
    });
  }, []);

  return (
    <div className='login'>
      <div className='weather'>
        {
          weathers.map((value, index) => {
            return (<div className='weather-item' key={index}>
            <span className="city">{value.cityinfo.name}</span>
            <span className='temp'>{value.weather.temperature}°</span>
            <Input type={value.weather.type} />
          </div>)
          })
        }
      </div>
      <button className='btn' onClick={() => navigate('/task')}>Go</button>
    </div>
  )
}