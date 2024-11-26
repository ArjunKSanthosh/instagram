import React,{useState} from "react";
import axios from "axios"
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../CSS/Profile.css';
import img from '../img/igpl.jpg'


const Profile=({setUser,setProfile})=>{
    const navigate=useNavigate();
    const value=localStorage.getItem('Auth');
    const [user,setData]=useState({})
    const [posts,setPost]=useState([])
    useEffect(()=>{
        getDetails();
        getPosts();
    },[])
    const getDetails=async()=>{
        if(value!==null){
            try {
                const res=await axios.get("http://localhost:3000/api/profile",{headers:{"Authorization":`Bearer ${value}`}})
                console.log(res);
                
                if(res.status==200){
                    // console.log(res.data.profile);
                    setUser(res.data.username)
                    setProfile(res.data.profile.profile)
                    setData(res.data.profile)
                    
                }else if(res.status==403){
                    alert(res.data.msg);
                }
                else{

                }
            } catch (error) {
                console.log("error");
                
            }
        }else{

        }
    }
    const getPosts=async()=>{
        const res=await axios.get("http://localhost:3000/api/getpost",{headers:{"Authorization":`Bearer ${value}`}})
        console.log(res);
        
        setPost(res.data)
        
    }
    console.log(posts);
    
    return(
        <div className="profile">
            <div className="left1">
                <div className="top">
                    <img src={user.profile} alt="" />
                    <div className="details1">
                        <h2>{user.name} </h2>
                        <h3>{user.dob}</h3>
                        <p>{user.bio}</p>
                    </div>
                </div>
                <div className="bottom">
                    <button onClick={()=>navigate("/addpost")}>Add Posts</button>
                    <button onClick={()=>navigate('/addprodetails')}>Edit Details</button>
                    <button>Delete Account</button>

                </div>
            </div>
            <div className="right">
                <div className="post">
                   {posts.map((post)=>{
                    return <img src={post.photos[0]} alt="" />
                   })}
                </div>
            </div>
        </div>
    )
}
export default Profile;