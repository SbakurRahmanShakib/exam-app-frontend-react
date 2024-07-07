import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


const Student = () => {

    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [phone,setPhone] = useState('');
    const [address,setAddress] = useState('');
    const navigate = useNavigate();


    const handalOnSubmit=(e)=>{
        e.preventDefault();
        console.log("Form Submitted: "+name+" "+email+" "+phone+" "+address);
        try{
            axios.post(`http://127.0.0.1:8000/api/create-student`,{
                s_name:name,
                email:email,
                phone:phone,
                address:address
            },
            {
                headers:{
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}`
                }
            })

            navigate('/home')

        }
        catch(err){
            console.log(err);
        }
    
    }

 return(
        <form onSubmit={handalOnSubmit}>
        <h3 className="text-center mt-5">Student Form</h3>
     
        <div className="row">
        
            <div className="col-md-3 offset-md-5 border">
            
            <div className="text-right">
                <Link to={`/home`} className=" btn btn-success mt-2">Back To Home</Link>
            </div>
            
                <div className="form-group">
                    <label>Name</label>
                    <input type="text" className="form-control" onChange={(e)=>setName(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" className="form-control" onChange={(e)=>setEmail(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Phone</label>
                    <input type="number" className="form-control" onChange={(e)=>setPhone(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Address</label>
                  <textarea className="form-control" onChange={(e)=>setAddress(e.target.value)} ></textarea>
                </div>
            
                <button className="btn btn-primary mt-2 mb-2">Submit</button>
            </div>
            </div>
        </form>

    );
}
export default Student;

    