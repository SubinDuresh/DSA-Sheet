import React from 'react'
import './Signup.css'
import { useState,useContext } from 'react';
import { useNavigate } from 'react-router';
import dataContext from '../../context/datacontext';

function Signup(props) {

  const context=useContext(dataContext);
  const {showAlert}=context;
  const [loader,setLoader]=useState(false);
 
    let history=useNavigate();
      const[credentials,setCredentials]=useState({name:"",email:"",password:"",cpassword:""});
      
      const onChange=(e)=>{
       setCredentials({...credentials,[e.target.name]:e.target.value})
      }

      const handleSubmit=async(e)=>{
        setLoader(true);
        e.preventDefault();
        if(credentials.password!=credentials.cpassword){
          showAlert("danger","Confirm Password & Entered Password should be same")
          // console.log(credentials.cpassword);
        //  console.log(credentials.password);
        }
        else{
        const response = await fetch("https://rocky-island-88255.herokuapp.com/api/auth/createuser",{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password})

        });

        const json=await response.json();
        // console.log(json);
        
        if(json.success){
          setLoader(false);
          history('/login');
          showAlert("success","Signup Successfull 🥳🎉")
        }
        else{
        setLoader(false);
          showAlert("danger",json.error[0].msg || json.error)
        }
      }
      }
      document.body.style=props.mode==="light"?"background:white":"background:#0E1C25";
  return (
    <div className="container col-sm-12" id="log" style={{height:"100%"}}>
    <div className={`signupcard-${props.mode} d-flex justify-content-center aling-item-center`}>
  <div className="card-body">
  <form  onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="name" className="form-label">Name</label>
    <input type="text" className="form-control" id="name" onChange={onChange} name='name'/>
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" name='email' onChange={onChange} aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control"  name='password' onChange={onChange} id="exampleInputPassword1"/>
    <label htmlFor="exampleInputPassword1" className="form-label">Confirm Password</label>
    <input type="password" className="form-control" name='cpassword' id="exampleInputPassword2"  onChange={onChange}/>
  </div>
 
  <button type="submit" className="btn" >SignUp &nbsp;
  <span class="spinner-border spinner-border-sm my-1" role="status" aria-hidden="true" style={{display:loader?"box":"none"}}></span></button>
</form>
  </div>
</div>
</div>
  )
}

export default Signup