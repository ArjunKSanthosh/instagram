import React from 'react';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Email from './assets/Components/Email';
import Home from './assets/Components/Home';
import Login from './assets/Components/Login';
import Signup from './assets/Components/Signup';

const App = () => {
  return (
    <BrowserRouter>
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