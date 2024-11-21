import React, { useState } from 'react';
import {Link,useNavigate} from "react-router-dom"
import '../CSS/Login.css'; // Import the CSS file for styling

function Login() {
  const navigate=useNavigate();
  const [loginDetails,setDetails]=useState({
    email:"",
    password:""
  });
  const handleSubmit =async (e) => {
    e.preventDefault();
    const res=await fetch("http://localhost:3000/api/signin",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(loginDetails)
    })
    console.log(res);
    const result=await res.json();
    if(res.status===200){
      sessionStorage.setItem("Auth",result.token)
      alert(result.msg)
      navigate('/')
    }
    else{
      alert(result.msg)
    }
  };
  const handleChange=(e)=>{
    setDetails((pre)=>({...pre,[e.target.name]:e.target.value}))
  }
  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Instagram</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <input type="text" placeholder="example@email.com" value={loginDetails.email} name="email" onChange={handleChange} className="input-field"    />
          <input type="password" placeholder="Password" value={loginDetails.password} name='password' onChange={handleChange} className="input-field" />
          <button type="submit" className="login-btn">Log In</button>
        </form>
        <div className="login-footer">
          <p>Forgotten your password?</p>
          <p>Don't have an account? <Link to={'/email'}>Sign up</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Login;