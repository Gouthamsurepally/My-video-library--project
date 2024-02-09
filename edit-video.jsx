import React from "react";
import { useState,useEffect } from "react";
import axios from "axios";
import { useFormik } from "formik";
import { Link, useNavigate, useParams } from "react-router-dom";

export function EditVideo(){
    const[categories,setCategories]=useState([{Category_Id:0,CategoryName:''}]);
    const[videos,setVideos]=useState([{VideoId:0,Title:'',Url:'',Likes:0,Comments:'',Category_Id:0}]);

    let navigate=useNavigate();

    let params=useParams();

    const formik=useFormik({
        initialValues:{
            VideoId:videos[0].VideoId,
            Title:videos[0].Title,
            Url:videos[0].Url,
            Likes:videos[0].Likes,
            Comments:videos[0].Comments,
            Category_Id:videos[0].Category_Id
        },
        enableReinitialize:true,
        onSubmit:(values)=>{
            axios.put(`http://127.0.0.1:2200/editvideo/${params.id}`,values);
            alert("Video Updated Successfully");
            navigate('/admindashboard');

        }
    });

    function LoadCategories(){
        axios.get('http://127.0.0.1:2200/categories')
        .then((response)=>{
            response.data.unshift({Category_Id:-1,CategoryName:"Select Category"});
            setCategories(response.data);
        })
    };

    useEffect(()=>{
        LoadCategories();
        axios.get(`http://127.0.0.1:2200/video/${params.id}`)
        .then((response)=>{
            setVideos(response.data);
        })
    },[])

    return(
        <div className="container-fluid">
            <form className="w-25" onSubmit={formik.handleSubmit}>
                <h3>Edit Video</h3>
                <dl>
                    <dt>Video Id</dt>
                    <dd><input type="number" value={formik.values.VideoId} name="VideoId" className="form-control" onChange={formik.handleChange}/></dd>
                    <dt>Title</dt>
                    <dd><input type="text" value={formik.values.Title} name="Title" className="form-control" onChange={formik.handleChange}/></dd>
                    <dt>Url</dt>
                    <dd><input type="text" value={formik.values.Url} name="Url" className="form-control" onChange={formik.handleChange}/></dd>
                    <dt>Likes</dt>
                    <dd><input type="text" value={formik.values.Likes} name="Likes" className="form-control" onChange={formik.handleChange}/></dd>
                    <dt>Comments</dt>
                    <dd><input type="text" value={formik.values.Comments} name="Comments" className="form-control" onChange={formik.handleChange}/></dd>
                    <dt>Category</dt>
                    <dd>
                        <select className="form-select" value={formik.values.Category_Id} name="Category_Id" onChange={formik.handleChange}>
                            {
                                categories.map(category=>
                                    <option value={category.Category_Id} key={category.Category_Id}>
                                        {category.CategoryName.toUpperCase()}

                                    </option>
                                    )
                            }

                        </select>
                    </dd>
                </dl>
                <button className="btn btn-success me-3">Save</button>
                <Link to='/admindashboard' className="btn btn-warning">Cancel</Link>
               

            </form>

        </div>
    )
}