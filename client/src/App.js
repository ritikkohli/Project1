import React from 'react';
import './App.css'
import Navbar from './components/Navbar';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import AddBlog from './components/AddBlog';
import ShowBlogs from './components/ShowBlogs';
import ViewFull from './components/ViewFull';
import Logout from './components/Logout';
import {useReducer,createContext} from 'react'
import {initialState,reducer} from './reducer/useReducer';
import MyBlogs from './components/MyBlogs';
import UpdateBlog from './components/UpdateBlog';

export const UserContext = createContext();

function App() {
  const [state,dispatch] = useReducer(reducer,initialState);

  return (<>
      <UserContext.Provider value={{state,dispatch}}>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/" element={<ShowBlogs/>} />
          <Route path="login" element={<Login/>} />
          <Route path="register" element={<Register/>} />
          <Route path="logout" element={<Logout/>}/>
          <Route path="post" element={<AddBlog/>} />
          <Route path="dashboard" element={<ShowBlogs/>} />
          <Route path="myblogs" element={<MyBlogs/>} />
          <Route path="viewfull/:id" element={<ViewFull/>}/>
          <Route path="update/:id" element={<UpdateBlog/>}/>
        </Routes>
      </BrowserRouter>
      </UserContext.Provider>
      {/* {console.log(document.cookie)} */}
  </>
  );
}

export default App;