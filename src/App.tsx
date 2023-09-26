import { useState} from 'react'
import { useToday } from './hooks/useToday'
import {Routes, Route} from "react-router-dom"
import Nav from './components/Nav';
import Now from './components/Now';
import Today from './components/Today';

function App() {
  return (<div className="w-[min(90%,40rem)] mx-auto py-6 h-[100vh]  bg-gray-100">
    <Nav />
    <Routes>
      <Route path='/' element={<Now />}/>
      <Route path='/today' element={<Today />}/>
      <Route path='/week' element={<h1>Week</h1>}/>
    </Routes>
  </div>    
  )
}

export default App
