import { Link } from "react-router-dom";
import axios from "axios";
import { Formik, useFormik } from "formik";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export function AdminLogin(){

    let navigate = useNavigate();
    const [users, setUsers] = useState([{UserId:'', Password:''}]);
    const [userError, setUserError] = useState('');

    const [cookies, setCookie, removeCookie] = useCookies('adminName');

    const formik = useFormik({
        initialValues : {
            UserId: '',
            Password:''
        },
        onSubmit: (values)=>{
            var user = users.find(item=> item.UserId===values.UserId);
            if(user.Password===values.Password){
                setCookie("adminName", user.UserId);
                navigate("/admindashboard");
            } else {
                setUserError("Invalid Credentials");
            }
        }
    })

    useEffect(()=>{
        axios.get('http://127.0.0.1:2200/admin')
        .then((response)=>{
            setUsers(response.data);
        })
    },[]);



    return(
        <div className="container-fluid d-flex justify-content-center align-items-center" style={{height:'100vh'}}>
            <form className="w-25" onSubmit={formik.handleSubmit}>
                <h3 className="text-center">Admin Login</h3>
                <dl>
                    <dt>Admin Id</dt>
                    <dd><input type="text" className="form-control" onChange={formik.handleChange} name="UserId"/></dd>
                    <dt>Password</dt>
                    <dd><input type="password" className="form-control" onChange={formik.handleChange} name="Password" /></dd>
                </dl>
                <button type="submit" className="btn btn-primary">Login</button>
                <p className="h3 text-danger">{userError}</p>
            </form>
        </div>
    )
}