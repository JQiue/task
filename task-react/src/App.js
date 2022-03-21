import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './view/Login/Login';
import Task from './view/Task/Task';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/task' element={<Task />} />
      </Routes>
    </BrowserRouter>
  )
}