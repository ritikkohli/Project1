import React,{useEffect, useState} from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';

export default function ViewFull(){
    const { id } = useParams();
    const [blog,setBlog] = useState({});
    const [author,setAuthor] = useState({});

    async function fetchBlog(){
        try{
            let res = await axios.get(`/blog/${id}`)
            let data = res.data.blog
            setBlog(data)
            setAuthor(res.data.author)
        }    
        catch(error){
            console.log(error)
        }
    }

    useEffect(()=>{
        fetchBlog();
    },[id])

    return (
        <div className='container mb-3'>
            <div className='card border border-danger'>
                <div className='card-header'>
                <h1>{blog.title}</h1>
                <p>{new Date(blog.createdAt).toLocaleString()}</p>
                <span className='badge'>#{blog.category}</span>
                </div>
                <div className='card-body'>
                <p className=''>{blog.body}</p>
                </div>
                <div className='card-footer'>
                <p className='float-end'>By - {author.fname} {author.lname}</p>
                </div>
        </div>
        </div>
)}