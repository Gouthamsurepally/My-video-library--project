import React from "react";
import { useState,useEffect } from "react";
import axios from "axios";
import { Link,useNavigate } from "react-router-dom";

function RegisterLink(){
 return(
    <div className="container-fluid">
        <Link to='/userregister' className="btn btn-light" >Account not found - Register</Link>

    </div>
 )
}

export function VideosMain(){
    const[users,setUsers]=useState([{UserId:'',UserName:'',Password:'',Email:'', Mobile:''}]);
    const[userEmail,setUserEmail]=useState('');
    const[userError,setUserError]=useState('');

    let navigate=useNavigate();

    useEffect(()=>{
        axios.get('http://127.0.0.1:2200/users')
        .then((response)=>{
            setUsers(response.data);
        })
    },[])

    function handleEmailChange(e){
        setUserEmail(e.target.value);
    }

    function handleGetStartedClick(){
        var user= users.find(item=> item.Email==userEmail);
        if(user==undefined){
           
            setUserError(<RegisterLink/>);
        } else{
            navigate('/userlogin');
        }
    }
    return(
        
        <div className="container-fluid">
            <main className="d-flex justify-content-center mt-4">
                <div>
                    <h1>Watch videos Any Where</h1>
                    <p className="text-center mt-4 mb-4" >please register for more videos</p>
                    <div className="input-group">
                        <input type="email" onChange={handleEmailChange} placeholder="enter your email address" className="form-control" />
                        <button type="submit" onClick={handleGetStartedClick} className="btn btn-success">Get Started</button>
                    </div>
                   <div className="mt-4">
                   <p className="text-danger">{userError}</p>
                   </div>
                </div>

            </main>

        </div>
    )

    }
