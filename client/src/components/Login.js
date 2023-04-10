import axios from 'axios';
import React,{useState,useContext} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {UserContext} from '../App';
import {useNavigate} from 'react-router-dom';
// import {}

function isValidEmail(email) {
    // Regular expression to validate email address
    const emailRegex = /^\S+@\S+\.\S+$/;
    return emailRegex.test(email);
}

function isValidPassword(password) {
    // Password must be at least 8 characters long and contain at least one digit
    const passwordRegex = /^(?=.*\d).{8,}$/;
    return passwordRegex.test(password);
}

export default function Login() {
    const {dispatch} = useContext(UserContext);
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const navigate = useNavigate();

    async function loginAPI(e){
        if (!isValidEmail(email)) return alert("Please enter a valid email address.")
        if (!isValidPassword(password)) return alert("Please enter a valid password.")
        e.preventDefault();
        try{
            let body = {
                email:email,
                password:password
            }
            let res = await axios.post('/login',body)
            if(res.status === 200){
                dispatch({type:"USER",payload:true})
                window.alert('login successfully')
                navigate('/')
            }
        }
        catch(error){
            console.log(error)
        }
    }

    return (
    <div className='container'>
    <form method='POST'>
        <input type='email' className='form-control my-2 text-light' placeholder='email' onChange={(e)=>setEmail(e.target.value)} maxLength='50'/>
        <input type='password' className='form-control my-2 text-light' placeholder='password' onChange={(e)=>setPassword(e.target.value)} maxLength='50'/>
        <button type='submit' className='btn btn-danger' onClick={loginAPI}>LOGIN</button>
    </form>
    </div>
)}