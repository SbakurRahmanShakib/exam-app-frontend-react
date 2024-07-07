import { useState } from 'react'

import './App.css'
import Login from './components/Login'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Home from './components/Home';
import Student from './components/Student';
import Edit from './components/Edit';


function App() {

 return (
    <Router>
         <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} /> 
            <Route path="/add" element={<Student />} />
            <Route path="/edit/:id" element={<Edit />} />
      </Routes>
    </Router>
 )
  
}

export default App
