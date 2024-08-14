import React, { useEffect } from "react";
import { useState } from "react";

function Navbar(){
    const [user, setUser] = useState("");
    useEffect(()=>{
        try{
            setUser(JSON.parse(sessionStorage.getItem('user')).name)
        }catch{}
        console.log(user)
    },[])
    
    const logoutF = () =>{
        
        window.location.href = "/"
        sessionStorage.removeItem('user');

    }
      return(
            <nav>
                <div className="logo">
                    <img src=".\logo.png" alt="Company Logo" />
                </div>
                <a href="/dashboard">Home</a>
                <a href="/signup">Create Employee</a>
                <a href="/employee-list">Employee List</a>
                <a href=""><span>-{user}</span> </a>
                <button onClick={logoutF}>Logout</button>
                
            </nav>

      )
}

export default Navbar