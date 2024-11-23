import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import '../CSS/Email.scss';
import axios from 'axios'

function Email() {
  const navigate=useNavigate();
  const [email, setEmail] = useState(''); 

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handleChange=(e)=>{
    // console.log(e.target.value);
    setEmp((pre)=>({...pre,[e.target.name]:e.target.value}))
  }
  const handleSubmit = async(event) => {
    event.preventDefault(); 
    // const res=await fetch("http://localhost:3000/api/verifyemail",{
    //   method:"POST",
    //   headers:{"Content-Type":"application/json"},
    //   body:JSON.stringify({email})
    // })
    const res=await axios.post("http://localhost:3000/api/verifyemail",{email},{Headers:{"Content-Type":"application/json"}})

    console.log(res.data.msg);
    
    console.log(res);
    // const result=await res.json();
    if(res.status===201){
      localStorage.setItem('email',email)
      alert(res.data.msg);
      navigate('/login')
    }
    else{
      alert(result.msg)
    }
  };

  return (
    <div className="Email">
      <h1>Email Verification</h1>
      <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" value={email} onChange={handleEmailChange} placeholder="Enter your email" />
        <button type="submit">Verify</button>
      </form>
    </div>
  );
}

export default Email;