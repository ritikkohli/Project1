import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {isValidName,isValidTitle,isValidTags} from '../validations/validators';

export default function UpdateBlog() {
    const [blog,setBlog] = useState({});
    const [title,setTitle] = useState('');
    const [tags,setTags] = useState('');
    const [category,setCategory] = useState('');
    const [body,setBody] = useState('');
    const { id } = useParams();

    async function updateAPI(e){
        e.preventDefault()
        if(!isValidTitle(title)) return alert('invalid title')
        if(!isValidName(category)) return alert('invalid category')
        if(!isValidTags(tags)) return alert('invalid tags')
        if(body.length < 50 ) return alert('body must have 20 words')
        try{
            let b = {
                ...blog,
                title:title,
                tags:tags,
                category:category,
                body:body
            }
            let res = await axios.put('/blog/'+id,b)
            console.log(res)
            if(res.status === 201){
                alert('updated')
            }
        }
        catch(error){
            console.log(error)
        }
    }

    async function fetchBlog(){
        try{
            let res = await axios.get(`/blog/${id}`)
            let data = res.data.blog
            setBlog(data)
            setTitle(data.title)
            setTags(data.tags)
            setCategory(data.category)
            setBody(data.body)
            console.log(title,tags,category,body)
        }    
        catch(error){
            console.log(error)
        }
    }
        
    useEffect(()=>{
        fetchBlog();
    },[id])

    return (
      <div className='container'>
          <form>
            <div className='input-group my-2'>
                <span className='input-group-text text-light' style={{'width':'5rem'}}>title</span>
                <input type='text' className='form-control text-light' value={title} onChange={(e)=>setTitle(e.target.value)}/>
            </div>
            <div className='input-group my-2'>
                <span className='input-group-text text-light' style={{'width':'5rem'}}>tags</span>
                <input type='text' className='form-control text-light' value={tags} onChange={(e)=>setTags(e.target.value)}/>
            </div>
            <div className='input-group my-2'>
                <span className='input-group-text text-light' style={{'width':'5rem'}}>category</span>
                <input type='text' className='form-control text-light' value={category} onChange={(e)=>setCategory(e.target.value)}/>
            </div>
            <div className='input-group my-2'>
                <span className='input-group-text text-light' style={{'width':'5rem'}}>body</span>
                <textarea className='form-control text-light' rows='10' style={{resize: "none"}} value={body} onChange={(e)=>setBody(e.target.value)}/>
            </div>
            <button className='btn btn-danger my-2' onClick={updateAPI}>UPDATE</button>
          </form>
      </div>
)}