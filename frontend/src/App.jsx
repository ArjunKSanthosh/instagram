import React, { useState } from 'react';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Email from './Components/Email';
import Home from './Components/Home';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Nav from './Components/Nav';

const App = () => {
  const [user,setUser]=useState("");
  console.log(`appuser ${user}`);
  
  return (
    <BrowserRouter>
    {user&&<Nav user={user}/>}
      <Routes>
        <Route path='/' Component={Home}/>
        <Route path='/login' Component={Login}/>
        <Route path='/email' Component={Email}/>
        <Route path='/register' Component={Signup}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App