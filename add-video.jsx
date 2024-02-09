import React from "react";
import { useState,useEffect } from "react";
import axios from "axios";
import { useFormik } from "formik";
import {useNavigate } from "react-router-dom";

export function AddVideo(){
    const[categories,setCategories]=useState([{Category_Id:0,CategoryName:''}]);

    let navigate=useNavigate();

    const formik=useFormik({
        initialValues:{
            VideoId:0,
            Title:'',
            Url:'',
            Likes:0,
            Comments:'',
            Category_Id:0
        },
        onSubmit:(values)=>{
            axios.post('http://127.0.0.1:2200/addvideo',values);
            alert("Video added successfully");
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
    },[]);


    return(
        <div className="container-fluid">
            <form className="w-25" onSubmit={formik.handleSubmit}>
                <h3>Add Video</h3>
                <dl>
                    <dt>VideoId</dt>
                    <dd><input type="number" name="VideoId" className="form-control" onChange={formik.handleChange} /></dd>
                    <dt>Title</dt>
                    <dd><input type="text" name="Title" className="form-control" onChange={formik.handleChange} /></dd>
                    <dt>Url</dt>
                    <dd><input type="text" name="Url" className="form-control" onChange={formik.handleChange}/></dd>
                    <dt>Likes</dt>
                    <dd><input type="number" name="Likes" className="form-control" onChange={formik.handleChange}/></dd>
                    <dt>Comments</dt>
                    <dd><input type="text" name="Comments" className="form-control" onChange={formik.handleChange}/></dd>
                    <dt>Category</dt>
                    <dd>
                        <select name="Category_Id" onChange={formik.handleChange} >
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
                <button type="submit" className="btn btn-success">Add Video</button>

            </form>

        </div>
    )
}