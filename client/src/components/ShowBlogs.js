import React,{useEffect,useState} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function ShowBlogs() {
    const [blogs,setBlogs] = useState([])

    
    async function fetchBlogs(){
        try{
            let res = await axios.get('/blogs')
            let data = res.data.blogs
            setBlogs(data)
            console.log(blogs)
        }
        catch(error){
            console.log(error)
        }
    }

    useEffect(()=>{
        fetchBlogs();
    },[]);

    return (
        <div className='container d-flex flex-wrap justify-content-evenly'>
            {blogs.map((item) => (
            <div className='card my-3 overflow-hidden border-danger' style={{"height":"12.1rem","width":"18.5rem"}}>
                <div className='card-header'><h5>{item.title}</h5></div>
                <div className='card-body mb-3 overflow-hidden'>
                    <p className='overflow-hidden'>{item.body}</p>
                </div>
                <div className='card-footer'>{new Date(item.createdAt).toLocaleString()}
                <Link to={`/viewfull/${item._id}`} class="stretched-link" onClick={console.log('hi')}></Link>
                </div>
            </div>
            ))}
        </div>
)}