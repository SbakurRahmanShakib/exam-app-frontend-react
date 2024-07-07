import axios from "axios";
import { useEffect,useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Home=()=>{

  const navigate = useNavigate();

  const[student,setStudent]=useState([]);

  useEffect(() => {
    if (!localStorage.getItem('userInfo')) {
      navigate('/login');
    }
  }, [navigate]);

 


   useEffect(()=>{

    const featchData=async()=>{
        try{
            const response = await axios.get(`http://127.0.0.1:8000/api/home`,
             {
                    headers:{
                      Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}`
                          
                  }
            });
            console.log(response.data);
            setStudent(response.data);


        }
        catch(err){
            console.log(err);
        }
    }
    featchData();
    },[navigate])

    const deleteStudent=async(id)=>{
        try{
            const response = await axios.delete(`http://127.0.0.1:8000/api/student/${id}`,{
                headers:{
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}`
                }
            },
            );
            console.log(response.data);
            setStudent(student.filter((student) => student.id !== id));
          
        }
        catch(err){
            console.log(err);
        }
    }
    
   const logoutHandler=()=>{
    localStorage.removeItem('userInfo');
    navigate('/login');

   
  }


    
    return(
        <>
       <div className="container"> 
        <div className="text-center">
            <h3>This is index page</h3>
        </div>
        <div className="text-right">
        <button style={{float:'right'}} className="btn btn-danger " onClick={logoutHandler}>Logout</button>
        </div>
        <Link to={`/add`} className="btn btn-primary">Add Student</Link>
    
     
       <div>
        <table className="table">
        <thead>
        
         <tr>
            <th scope="col">Id</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
         { student.map((data,index)=>(
            <tr  key={data.id}>
            <th scope="row">{index+1}</th>
            <td>{data.s_name}</td>
            <td>{data.email}</td>
            <td>{data.phone}</td>
            <td><Link to={`/edit/${data.id}`} className="btn btn-primary">Edit</Link> <a onClick={()=>deleteStudent(data.id)} className="btn btn-danger">Delete</a></td>
          </tr>
         ))
}
        
      
        </tbody>
        </table>
        </div>
        </div>      
        </>
    )

}

export default Home;