import React from "react";
import "../CSS/Nav.css"
import { Link } from "react-router-dom";

const Nav=({user})=>{
    console.log(user);
    
return (
    <div className="navv">
        <div className="left">Instagram</div>
        <div className="right">
            <img src="" alt="" className="pfp" />
       <Link to={"/profile"}> {user.toUpperCase()}</Link>
        </div>
   

    </div>
)
}
export default Nav