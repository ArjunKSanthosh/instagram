import React,{useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
const Home = () => {
  const navigate=useNavigate();
  let auth=sessionStorage.getItem('Auth')
  useEffect(()=>{
    auth=sessionStorage.getItem('Auth');
    if (auth===null) {
          navigate('/login')      
    }
  })
  return (
    <div className="nav">
        <h1>Home</h1>
    </div>
  )
}

export default Home