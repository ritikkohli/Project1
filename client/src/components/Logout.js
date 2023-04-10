import React ,{useContext} from 'react';
import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import {UserContext} from '../App'


const Logout = () =>{
    const {dispatch} = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(()=>{
        axios.get('/logout')
        .then((res)=>{
            navigate('/login',{replace:true})
            dispatch({type:"USER",payload:false})
            if(res.status !== 200) alert('error')
        }).catch((err)=>console.log(err))
    },[])

    return(
        <>
            logut successfully
        </>
    )
}

export default Logout