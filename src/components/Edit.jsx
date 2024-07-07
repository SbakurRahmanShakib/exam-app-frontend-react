import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const Edit = () => {
     const { id } =  useParams();
     console.log(id);
     const [name,setName] = useState('');
     const [email,setEmail] = useState('');
     const [phone,setPhone] = useState('');
     const [address,setAddress] = useState('');

     const navigate = useNavigate();



     useEffect(() => {

        axios.get(`http://127.0.0.1:8000/api/student/${id}`,
        {
            headers:{
                Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}`
            }
        }).then((response) => {
              
            setName(response.data.s_name);
            setEmail(response.data.email);
            setPhone(response.data.phone);
            setAddress(response.data.address);
        }).catch((err) => {
            console.log(err);
        }
        )


     }, [id]);

  const handalOnSubmitEdit = (e) => {
    e.preventDefault();

    try{
        axios.post(`http://127.0.0.1:8000/api/student/${id}`,{
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

    return (
        <form onSubmit={handalOnSubmitEdit}>
        <h3 className="text-center mt-5">Student Form Edit</h3>
     
        <div className="row">
        
            <div className="col-md-3 offset-md-5 border">
            
            <div className="text-right">
                <Link to={`/home`} className=" btn btn-success mt-2">Back To Home</Link>
            </div>
            
                <div className="form-group">
                    <label>Name</label>
                    <input type="text" className="form-control" onChange={(e)=>setName(e.target.value)} value={name}/>
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" className="form-control" onChange={(e)=>setEmail(e.target.value)} value={email} />
                </div>
                <div className="form-group">
                    <label>Phone</label>
                    <input type="number" className="form-control" onChange={(e)=>setPhone(e.target.value)} value={phone} />
                </div>
                <div className="form-group">
                    <label>Address</label>
                  <textarea className="form-control" onChange={(e)=>setAddress(e.target.value)} value={address} ></textarea>
                </div>
            
                <button className="btn btn-primary mt-2 mb-2">Save</button>
            </div>
            </div>
        </form>

    )
}
export default Edit;