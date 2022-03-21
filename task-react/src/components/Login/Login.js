import { useNavigate } from 'react-router-dom';
import React, {useState, useEffect} from 'react';
import './login.css'

function ImgComponet(props) {
  if(props.type == '晴') {
    return <img src='./asserts/qing.png'/>
  } else if (props.type == '阵雨') {
    return <img src='./asserts/yu.png'/>
  } else if (props.type == '多云') {
    return <img src='./asserts/yin.png'/>
  } else {
    return <img src=''/>
  }
}

export default function Login(props) {
  const [weathers, setWeathers] = useState([]);
  useEffect(() => {
    global.http.get('/api/weather/get', result => {
      setWeathers(result.data.data);
    });
    console.log(weathers);
  }, []);

  const navigate = useNavigate();

  return (
    <div className='login'>
      <div className='weather'>
        {
          weathers.map((value, index) => {
            return (<div className='weather-item' key={index}>
            <span className="city">{value.cityinfo.name}</span>
            <span className='temp'>{value.weather.temperature}°</span>
            <ImgComponet type={value.weather.type} />
          </div>)
          })
        }
      </div>
      <button className='btn' onClick={() => navigate('/task')}>Go</button>
    </div>
  )
}