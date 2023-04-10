import React,{useContext, useEffect} from 'react';
import './style.css'
import {Link,NavLink} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import {UserContext} from '../App'

function Navbar() {
  const {state,dispatch} = useContext(UserContext);

  useEffect(()=>{
    if(document.cookie){
      console.log(document.cookie)
      dispatch({type:"USER",payload:true})
    }
  },[dispatch])
  
  const SidebarList = () =>{
      if(state){
        return <>
            <NavLink className="nav-link my-2" to="/myblogs">my blogs</NavLink>
            <NavLink className="nav-link my-2" to="/post">add blog</NavLink>
            <NavLink className="nav-link my-2" to="/logout">logout</NavLink>
        </>
      }else{
        return <>
            <NavLink className="nav-link my-2" to="/login">login</NavLink>
            <NavLink className="nav-link my-2" to="/register">signup</NavLink>
            <NavLink className="nav-link my-2" to="/">all blogs</NavLink>
        </>
      }
    }


  return (
    <nav className='navbar border-bottom border-danger mb-5'>
        <div className='navbar-brand ms-3'><Link className='nav-link' to='/'>
          <i className='fi fi-br-home'/>
        </Link></div>
        <i className='fi fi-br-menu-burger me-3 mt-2' data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight"/>          
        <div className="offcanvas offcanvas-end" style={{'width':'10rem'}} tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
        <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="offcanvasRightLabel"><Link to='/' className='nav-link'>Home</Link></h5>
        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">
          <ul>
              <SidebarList/>
          </ul>
        </div>
    </div>
    </nav>
  )
}

export default Navbar