import React from "react";
import { BrowserRouter,Link,Routes,Route,useNavigate } from "react-router-dom";
import './user-register'
import {UserLogin} from './user-login';
import { UserRegister } from "./user-register";
import { VideosMain } from "./videos-main";
import { useCookies } from "react-cookie";
import { UserDashboard } from "./user-dashboard";
import { AdminLogin } from "./admin-login";
import { AdminDashBoard } from "./admin-dashboard";
import { AddVideo } from "./add-video";
import { DeleteVideo } from "./delete-video";
import { EditVideo } from "./edit-video";


function SignoutComponent(){
    const[cookies,setCookie,removeCookie]=useCookies('UserName');

    let navigate=useNavigate();

    function handleSignout(){
        removeCookie('UserName');
        navigate('/userlogin');
    }

    return(
        <div className="container-fluid">
            <button onClick={handleSignout} className="btn btn-light me-2" >SignOut</button>

        </div>
    )
}


  export function UserIndex(){

    const[cookies,setCookie,removeCookie]=useCookies('UserName');
    return(
        <div className="container-fluid bg-dark text-light" style={{height:'200vh'}}>
            <BrowserRouter>
            <header className="p-2 d-flex justify-content-between" >
             <div>
                <span><Link to='/' style={{textDecoration:'none'}} >Video Library</Link></span>
             </div>
             <div>
                {
                    (cookies['UserName']===undefined) ? <Link to='/userlogin' className="btn btn-light me-2"> User Signin</Link> : <SignoutComponent/>
                }
                <Link to='/adminlogin' className="btn btn-light"><span className="bi bi-person-fill"></span> Admin DashBoard</Link>
             </div>
            </header>

            <section>
                <Routes>
                    <Route path="/" element={<VideosMain/>} />
                    <Route path="userregister" element={<UserRegister/>} />
                    <Route path="userlogin" element={<UserLogin/>}  />
                    <Route path="userdashboard" element={<UserDashboard/>}/>
                    <Route path="adminlogin" element={<AdminLogin/>} />
                    <Route path="admindashboard" element={<AdminDashBoard/>}/>
                    <Route path="addvideo" element={<AddVideo/>}/>
                    <Route path="deletevideo/:id" element={<DeleteVideo/>}/>
                    <Route path="editvideo/:id" element={<EditVideo/>}/>
                </Routes>
            </section>
            </BrowserRouter>

        </div>
    )
 };

