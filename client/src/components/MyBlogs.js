import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function MyBlogs() {

    const [blogs,setBlogs] = useState([])

    async function deleteBlog(id){
            try{
                let res = await axios.delete('/blogs/'+id)
                if(res.status === 200) window.alert('deleted')
                console.log(blogs)
                let _blogs = [...blogs]
                let index = _blogs.findIndex((b) => b._id === id)
                _blogs.splice(index,1)
                setBlogs(_blogs)
                console.log(blogs)
            }
            catch(error){
                console.log(error)
            }
    }

    async function fetchBlogs(e){
        // e.preventDefault()
        try{
            let res = await axios.get('/myblogs')
            let data = res.data.blogs
            setBlogs(data)
        }
        catch(err){
            console.log(err)
        }
    }

    useEffect(()=>{
        fetchBlogs()
    },[])
    
  return (
    <div className='container d-flex flex-wrap justify-content-evenly pt-4'>
    {blogs.map((item) => (
        <div className='card my-3 overflow-hidden border border-danger' style={{"height":"12.1rem","width":"18.5rem"}} key={item._id}>
            <div className='card-header d-flex justify-content-between'>
                <h5>{item.title}</h5>
                <div className="dropdown">
                <i className='fi fi-br-menu-dots toggle' data-bs-toggle="dropdown" aria-expanded="false"/>
                    <ul className="dropdown-menu border" style={{'minWidth':'3.6rem'}}>
                    <li onClick={()=>{deleteBlog(item._id)}}><Link className="dropdown-item"><i className='fi fi-br-trash'/></Link></li>
                    <li><Link to={`/update/${item._id}`} className="dropdown-item"><i className='fi fi-br-edit'/></Link></li>
                    </ul>
                </div>
            </div>
            <div className='card-body mb-3 overflow-hidden'>
                <p className='overflow-hidden'>{item.body}</p>
            </div>
            <div className='card-footer'>{item.createdAt}
                <Link to={`/viewfull/${item._id}`} className='link link-dark text-decoration-none float-end'><i className='fi fi-br-book-alt'/></Link>
            </div>
        </div>
    ))}
</div>
  )
}