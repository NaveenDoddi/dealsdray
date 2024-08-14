import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './navbar';


function EmployeeList() {
    const [employees, setEmployees] = useState([]);
    const [search, setSearching] = useState(false);
    const [searchList, setSearchingList] = useState([]);
    
    const dele = (user)=>{
        var id = user.target.id
        fetch("http://localhost:3001/api/deleteEmployee/"+id,{
            method: "DELETE",
        })
        .then(response =>{
            if(response.ok){
                window.alert('eployee removed')
                user.target.parentNode.parentNode.style.display = "none"
            }
        })
        
    }

    useEffect(() => {
      const fetchEmployees = async () => {
          try {
                fetch('http://localhost:3001/api/getAllEmployee')
                .then(response => response.json())
                .then((data)=>{
                    setEmployees(data)
                })
            
            } catch (err) {
                console.error(err);
            }
        };
        fetchEmployees();
    }, []);

    function searching(e){
        var value = e.target.value

        var list = employees.filter(item =>
            item.email.toLowerCase().indexOf(value.toLowerCase()) >= 0 ||
            item.name.toLowerCase().indexOf(value.toLowerCase()) >= 0 || 
            item._id.toString().indexOf(value) >= 0 ||
            item.createdate.toString().indexOf(value) >= 0
        )            
        setSearchingList(list)

        if(searchList.length > 0)
            setSearching(true)
        else
            setSearching(false)
        


    }

    return (

        <div>
            <Navbar/>
            <div >
                <h2 style={{display:"flex", justifyContent:"space-between"}}>
                    <span>Employee list</span> 
                    <input type="text" name="searching" id="" onKeyUp={searching}/>
                </h2>
                
            </div>
            
            <table>
                <tr>
                    <th>s/no</th>
                    <th>uniq_id</th>
                    <th>image</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Mobile</th>
                    <th>Designation</th>
                    <th>Gender</th>
                    <th>Course</th>
                    <th>Created Date</th>
                    <th>Action</th>
                </tr>

                {search && searchList.map((employee, index)=>(
                    <tr key={employee._id}>
                        <td>{index+1}</td>
                        <td>{employee._id}</td>
                        <td><img src={employee.image} alt="profile.png"  style={{height:'100px'}}/></td>
                        <td>{employee.name}</td>
                        <td>{employee.email}</td>
                        <td>{employee.mobile}</td>
                        <td>{employee.designation}</td>
                        <td>{employee.gender}</td>
                        <td>{employee.course}</td>
                        <td>{employee.createdate.split('T')[0]}</td>
                        <td>
                            <button><Link to={`/edit-employee?${employee._id}`}>Edit</Link></button>
                            <button onClick={dele}>Delete</button>
                        </td>                    
                    </tr>
                ))}
                
                {!search && employees.map((employee,index) => (
                    <tr key={employee._id}>
                        <td>{index+1}</td>
                        <td>{employee._id}</td>
                        <td><img src={employee.image} alt="profile.png"  style={{height:'100px', width:"100%", borderRadius:"10%"}}/></td>
                        <td>{employee.name}</td>
                        <td>{employee.email}</td>
                        <td>{employee.mobile}</td>
                        <td>{employee.designation}</td>
                        <td>{employee.gender}</td>
                        <td>{employee.course}</td>
                        <td>{employee.createdate.split('T')[0]}</td>
                        <td>
                            <button><Link to={'/edit-employee?'+employee._id}>Edit</Link></button>
                            <button id={employee._id} onClick={dele}>Delete</button>
                        </td>                    
                    </tr>
                ))}
            </table>
            
            {/* <Link to="/create-employee">Create Employee</Link> */}
            <ul>
                
            </ul>
        </div>
    );
}

export default EmployeeList;
