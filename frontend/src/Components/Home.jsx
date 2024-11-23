import React,{useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
const Home = () => {
  const navigate=useNavigate();
  const value=localStorage.getItem('Auth');
  useEffect(()=>{
    getDetails()
  })
  const getDetails=async()=>{
    if(value==null){
      try {
        const res=await axios.get("http://localhost:3000/api/home",{headers:{"Authorization":`Bearer ${value}`}})
        console.log(res);
        if(res.status==200){
          setUser(res.data.username)
        }else if(res.status==403){
          alert(res.data.msg)
          navigate('/login')
        }else{
          navigate('/login')
        }
        
      } catch (error) {
        console.log("error");
        navigate('/login')
        
      }
    }else{
      navigate('/login')

    }
  }
  return(
    <div className="nav">
      <h1>Home</h1>
    </div>
  )
}

export default Home