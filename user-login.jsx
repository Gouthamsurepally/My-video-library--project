
import { Link } from "react-router-dom";
import axios from "axios";
import { Formik, useFormik } from "formik";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export function UserLogin(){

    let navigate = useNavigate();
    const [users, setUsers] = useState([{UserId:'', UserName:'', Password:'', Email:'', Mobile:''}]);
    const [userError, setUserError] = useState('');

    const [cookies, setCookie, removeCookie] = useCookies('userName');

    const formik = useFormik({
        initialValues : {
            UserId: '',
            Password:''
        },
        onSubmit: (values)=>{
            var user = users.find(item=> item.UserId===values.UserId);
            if(user.Password===values.Password){
                setCookie("userName", user.UserName);
                navigate("/userdashboard");
            } else {
                setUserError("Invalid Credentials");
            }
        }
    })

    useEffect(()=>{
        axios.get('http://127.0.0.1:2200/users')
        .then((response)=>{
            setUsers(response.data);
        })
    },[]);



    return(
        <div className="container-fluid d-flex justify-content-center align-items-center" style={{height:'100vh'}}>
            
            <form className="w-25" onSubmit={formik.handleSubmit}>
            <h3 className="text-center">User Login</h3>
                <dl>
                    <dt>User Id</dt>
                    <dd><input type="text" name="UserId" className="form-control" onChange={formik.handleChange} /></dd>
                    <dt>Password</dt>
                    <dd><input type="password" name="Password" className="form-control" onChange={formik.handleChange} /></dd>
                </dl>
                <button className="btn btn-warning">Login</button>
                <Link to="/userregister" className="btn btn-success ms-2">New User ? </Link>
                <p className="h4 text-danger">{userError}</p>
            </form>
        </div>
    )
}