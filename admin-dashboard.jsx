import React from "react";
import { useState,useEffect } from "react";
import axios from "axios";
import { Link,useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export function AdminDashBoard(){
    const[cookies,setCookie,removeCookie]=useCookies('adminName');
    const[videos,setVideos]=useState([{VideoId:0,Title:'', Url:'',Comments:'',Likes:0,Category_Id:0}]);
    let navigate=useNavigate();

    function LoadVideos(){
        axios.get('http://127.0.0.1:2200/videos')
        .then((response)=>{
            setVideos(response.data);
        })
    }

    useEffect(()=>{
        if(cookies['adminName']===undefined){
            navigate('/adminlogin');
        } else{
            LoadVideos();
        }
    })

    return(
        <div className="container-fluid">
            <h3 className="text-center" >{cookies['adminName']} - DashBoard</h3>
            <div>
                <Link to="/addvideo" className="btn btn-primary mb-2">Add Video</Link>
            </div>
            <table className="table table-hover p-3">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Preview</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        videos.map(video=>
                           <tr width="400" key={video.VideoId}>
                            <td width="200" >{video.Title}</td>
                            <td>
                                <iframe src={video.Url} width="300px" height="20px" ></iframe>
                            </td>
                            <td>
                                <Link to={`/editvideo/${video.VideoId}`} className="btn btn-warning me-3"><span className="bi bi-pen-fill"></span>Edit Video</Link>
                                <Link to={`/deletevideo/${video.VideoId}`} className="btn btn-danger" ><span className="bi bi-trash-fill"></span>Delete Video</Link>
                            </td>

                           </tr> 
                            )
                    }
                </tbody>
            </table>

        </div>
    )
}