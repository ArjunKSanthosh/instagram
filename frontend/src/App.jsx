import React, { useState } from 'react';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Email from './Components/Email';
import Home from './Components/Home';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Nav from './Components/Nav';
import Profile from './Components/Profile';
import AddPro from './Components/Addpro';
import Post from './Components/Post';
import PostD from './Components/PostDetails';
const App = () => {
  const [user,setUser]=useState("");
  const [profile,setProfile]=useState("");
  console.log(`appuser ${user}`);
  
  return (
    <BrowserRouter>
    {user&&<Nav user={user}/>}
      <Routes>
        <Route path='/' element={<Home setUser={setUser}/>}/>
        <Route path='/login' Component={Login}/>
        <Route path='/email' Component={Email}/>
        <Route path='/register' Component={Signup}/>
        <Route path='/profile' element={<Profile setUser={setUser} setProfile={setProfile}/>}/>
        <Route path='/addprodetails' element={<AddPro  setUser={setUser} setProfile={setProfile}/>}/>
        <Route path='/addpost' element={<Post  setUser={setUser} setProfile={setProfile}/>}/>
        <Route path='/postdetails/:id' element={<PostD  setUser={setUser} setProfile={setProfile}/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App