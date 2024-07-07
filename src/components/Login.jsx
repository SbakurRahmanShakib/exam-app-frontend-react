
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import ErrorBox from './ErrorBox';

const Login=()=>{
  
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
     const [error, setError] = useState('')
    const navigate = useNavigate(); 


     useEffect(() => {
        if (localStorage.getItem('userInfo')) {
            navigate('/home');
        }
     }, [navigate])
    const handleSubmit=async(e)=>{
        e.preventDefault()
         try
            {
                const response = await axios.post(`http://127.0.0.1:8000/api/login`,
                {
                        email,
                        password
                });
                    console.log(response.data);
                    localStorage.setItem('userInfo',JSON.stringify(response.data));
                    navigate('/home');
                }
                catch(err)
                {
                    setError(err.response.data.message);
                    console.log(err);
                }
            }

  return(
     <form onSubmit={handleSubmit}> 
        <h3 className="text-center mt-5">Login Form</h3>
       {  error && <ErrorBox error={error} />}
           <div className="row ">
                <div className="col-md-3 offset-md-5 border">
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email"
                        value={email}
                         className="form-control" 
                         onChange={(e)=>setEmail(e.target.value)} 
                         />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                         type="password"
                         value={password}
                         className="form-control"
                          onChange={(e)=>setPassword(e.target.value)}
                          />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary btn-block mt-2 mb-2">Login</button>
                    </div>
                </div>
            </div>
     </form>
       
    )
}

export default Login;