import { useState , useEffect} from 'react'
import { useToday } from './hooks/useToday'
import {Routes, Route} from "react-router-dom"
import scheldue from "./scheldueDb.json"
import Nav from './components/Nav';
import Now from './components/Now';

function App() {
  const [count, setCount] = useState(0)
  const today = useToday();
 
  
  const testSubj = new Date();

  testSubj.setHours(12)
  testSubj.setMinutes(30)

  function getTimeRemaining(endtime: string){
    const total = Date.parse(endtime) - Date.parse(today.toString());
    const seconds = Math.floor( (total/1000) % 60 );
    const minutes = Math.floor( (total/1000/60) % 60 );
    const hours = Math.floor( (total/(1000*60*60)) % 24 );
    const days = Math.floor( total/(1000*60*60*24) );
    return {      
      hours,
      minutes,
     
    };
  }
  // <div >
  //   <button onClick={() =>  console.log(today.getHours(),today.getMinutes())}>Now</button>
  //   <button onClick={() =>  console.log(getTimeRemaining(testSubj.toString()))}>Today</button>
  //   <button>Week</button>
  // </div>
  
 
  return (<>
    <Nav />
    <Routes>
      <Route path='/' element={<Now />}/>
      <Route path='/today' element={<h1>Today</h1>}/>
      <Route path='/week' element={<h1>Week</h1>}/>
    </Routes>
  </>    
  )
}

export default App
