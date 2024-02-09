import React from "react";
import axios from "axios";
import { useState,useEffect } from "react";
import { useFormik } from "formik";
import { useNavigate,Link } from "react-router-dom";

export function UserRegister(){
    const[users,setUsers]=useState([{UserId:'',UserName:'',Password:'',Email:'',Mobile:''}]);
    const[userError,setUserError]=useState();

    useEffect(()=>{
        axios.get('http://127.0.0.1:2200/users')
        .then((response)=>{
            setUsers(response.data);
        })
    },[]);

    let navigate=useNavigate;

    const formik=useFormik({
        initialValues:{
            UserId:'',
            UserName:'',
            Password:'',
            Email:'',
            Mobile:''
        },
        onSubmit:(user)=>{
            axios.post('http://127.0.0.1:2200/adduser',user)
            alert("user registered successfully.. ");
            navigate('/userlogin');

        }
    })

    function VerifyUser(e){
        for(var user of users){
            if(user.UserId==e.target.value){
                setUserError("UserId taken - try another");
                break;
            }else{
                setUserError("userId available");
            }
        }
    }

    return(
        <div className="container-fluid d-flex justify-content-center align-items-center" style={{height:'100vh'}}>
            
           <form className="w-25" onSubmit={formik.handleSubmit}>
           <h3 className="text-center">Register User</h3>
           <dl>
                <dt>UserId</dt>
                <dd><input type="text" onKeyUp={VerifyUser} onChange={formik.handleChange} name="UserId" className="form-control" /></dd>
                <dd>{userError}</dd>
                <dt>UserName</dt>
                <dd><input type="text" onChange={formik.handleChange} name="UserName" className="form-control" /></dd>
                <dt>Password</dt>
                <dd><input type="Password" onChange={formik.handleChange} name="Password" className="form-control" /></dd>
                <dt>Email</dt>
                <dd><input type="email" onChange={formik.handleChange} name="Email" className="form-control" /></dd>
                <dt>Mobile</dt>
                <dd><input type="text" onChange={formik.handleChange} name="Mobile" className="form-control" /></dd>
            </dl>
            <button className="btn btn-primary me-3">Register</button>
            <Link to='/userlogin' className="btn btn-success">Existed User..? | Login Here </Link>
           </form>
           
           

        </div>
    )
}