import React from "react";
import { useState,useEffect } from "react";
import axios from "axios";
import { Link,useNavigate,useParams } from "react-router-dom";

export function DeleteVideo(){
    const[videos,setVideos]=useState([{VideoId:0,Title:'',Url:'',Likes:0,Comments:'',Category_Id:0}]);
    
    let navigate=useNavigate();
    let params=useParams();

    useEffect(()=>{
        axios.get(`http://127.0.0.1:2200/video/${params.id}`)
        .then((response)=>{
            setVideos(response.data);
        })
    },[]);

    function handleDeleteClick(){
        axios.delete(`http://127.0.0.1:2200/deletevideo/${params.id}`);
        alert("Video deleted");
        navigate('/admindashboard');
    };

    return(
        <div className="container-fluid">
            <h3>Delete Video</h3>
            <div>
           
            <h4>{videos[0].Title}</h4>
            <iframe src={videos[0].Url} width="400" height="300"></iframe>
                
            </div>
            <div>
                <button onClick={handleDeleteClick} className="btn btn-danger me-4">Delete</button>
                <Link to='/admindashboard' className="btn btn-warning">Cancel</Link>
            </div>
        </div>
    )
}


