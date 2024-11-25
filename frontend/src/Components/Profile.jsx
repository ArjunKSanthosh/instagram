import React,{useState} from "react";
import axios from "axios"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../CSS/Profile.css';
import img from '../img/igpl.jpg'


const Profile=({setUser,setProfile})=>{
    const navigate=useNavigate();
    const value=localStorage.getItem('Auth');
    const [user,setData]=useState({})
    useEffect(()=>{
        getDetails()
    },[])
    const getDetails=async()=>{
        if(value!==null){
            try {
                const res=await axios.get("http://localhost:3000/api/profile",{headers:{"Authorization":`Bearer ${value}`}})
                console.log(res);
                
                if(res.status==200){
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
    console.log(user);
    return(
        <div className="profile">
            <div className="left1">
                <div className="top">
                    <img src={img} alt="" />
                    <div className="details1">
                        <h2>{user.name}name </h2>
                        <h3>{user.dob}Dob</h3>
                        <p>{user.bio}Bio</p>
                    </div>
                </div>
                <div className="bottom">
                    <button onClick={()=>navigate("/addpost")}>Add Posts</button>
                    <button onClick={()=>navigate('/addprodetails')}>Edit Details</button>
                    <button>Delete Account</button>

                </div>
            </div>
            <div className="right"></div>
        </div>
    )
}
export default Profile;