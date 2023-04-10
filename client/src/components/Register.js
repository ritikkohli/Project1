import React,{useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import './style.css'
import {isValidEmail,isValidName,isValidPassword,isValidPhone} from '../validations/validators'

export default function Register() {
    const [title,setTitle] = useState('');
    const [fname,setFname] = useState('');
    const [lname,setLname] = useState('');
    const [phone,setPhone] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [cpassword,setCpassword] = useState('');
    const navigate = useNavigate();

    async function apiCall(e){
        e.preventDefault();
        if (title === "") return alert("Please choose title");
        if (!isValidName(fname)) return alert("Invalid first name");
        if (!isValidName(lname)) return alert("Invalid last name");
        if (!isValidPhone(phone)) return alert("Invalid mobile number");
        if (!isValidEmail(email)) return alert("Invalid email address");
        if(password !== cpassword) return window.alert('passwords are not matching');
        if (!isValidPassword(password)) return alert("Invalid password");

        try{
            let body = {
                fname:fname,
                lname:lname,
                title:title,
                phone:phone,
                email:email,
                password:password
            }
            let res = await axios.post('/authors',body)
            if(res.status === 201){
                window.alert('registration successfull')
                navigate('/')            
            }
        }
        catch(error){
            window.alert(error)
        }
    }

    return (
        <div className='container'>
        <form method='POST'>
                <div className='input-group my-2'>
                <label className='input-group-text text-light' style={{'backgroundColor':'inherit'}}>title</label>
                <select className='form-control text-light' style={{'maxWidth':'5rem'}} onChange={(e)=>setTitle(e.target.value)}>
                    <option value="" selected>select</option>
                    <option value='Mr'>Mr</option>
                    <option value='Miss'>Miss</option>
                    <option value='Mrs'>Mrs</option>
                </select>
                <input type='text' placeholder='first name' maxLength='20' className='form-control text-light' onChange={(e)=>setFname(e.target.value)}/>
                <input type='text' placeholder='last name' maxLength='20' className='form-control text-light' onChange={(e)=>setLname(e.target.value)}/>
            </div>
            <input type='tel' placeholder='phone' maxLength='10' className='form-control my-2 text-light' onChange={(e)=>setPhone(e.target.value)}/>
            <input type='email' placeholder='email' maxLength='30' className='form-control my-2 text-light' onChange={(e)=>setEmail(e.target.value)}/>
            <input type='password' placeholder='password' maxLength='15' className='form-control my-2 text-light' onChange={(e)=>setPassword(e.target.value)}/>
            <input type='password' placeholder='verify password' maxLength='15' className='form-control my-2 text-light' onChange={(e)=>setCpassword(e.target.value)}/>
            <button className='btn btn-danger my-2' onClick={apiCall}>REGISTER</button>
        </form>
    </div>
  )
}