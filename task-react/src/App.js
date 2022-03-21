import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './components/Login/Login';
import Card from './components/Card/Card';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/task' element={<Card />} />
      </Routes>
    </BrowserRouter>
  )
}