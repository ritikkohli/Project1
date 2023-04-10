import axios from 'axios';
import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import {isValidName, isValidTags} from '../validations/validators';

export default function AddBlog() {
  const [title,setTitle] = useState('');
  const [category,setCategory] = useState('');
  const [tags,setTags] = useState([]);
  const [body,setBody] = useState('');
  const navigate = useNavigate();

  const reset = (e) =>{
    e.preventDefault();
    setTitle('')
    setCategory('')
    setTags([])
    setBody('')
  }

  async function postAPI(e){
    e.preventDefault();
    if(!isValidName(title)) return alert('invalid title')
    if(!isValidName(category)) return alert('invalid category')
    if(!isValidTags(tags)) return alert('invalid tags')
    if(body.length < 50 ) return alert('body must have 20 words')
    try{
      let blog = {
        title:title,
        category:category,
        tags:tags,
        body:body,
      }
      let res = await axios.post('/blogs',blog)
      if(res.status === 201){
        window.alert('blog posted')
        navigate('/')
      } 
    }
    catch(error){
      window.alert(error)
    }
  }

  return (
    <div className='container my-2 p-2'>
      <form method='POST'>
      <input type='text' maxLength='30' value={title} className='form-control text-light my-2' placeholder='title' onChange={(e)=>setTitle(e.target.value)}/>
      <input type='text' value={category} maxLength='20' className='form-control text-light my-2' placeholder='category' onChange={(e)=>setCategory(e.target.value)}/>
      <input type='text' value={tags} maxLength='50' className='form-control text-light my-2' placeholder='tags example- health,person care' onChange={(e)=>setTags((e.target.value).split(','))}/>
      <textarea value={body} minLength='100' className='form-control text-light my-2' rows='10' placeholder='body' style={{resize: "none"}} onChange={(e)=>setBody(e.target.value)}/>
      <button className='btn btn-danger' onClick={postAPI}>PUBLISH</button>
      <button className='btn btn-dark mx-2' onClick={reset}>RESET</button>
      </form>
    </div>
  )
}