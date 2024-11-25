import React ,{useState,useEffect}from "react";
import axios from "axios"
import {useNavigate} from "react-router-dom"

function AddPro({setUser,setProfile}){
    const navigate=useNavigate();
    const value=localStorage.getItem('Auth')
}