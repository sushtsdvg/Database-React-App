import React,{useState,useEffect} from 'react';
function App(){
    const [employees,setEmployees]=useState(false);
    useEffect(()=>{
        getEmployee();
    },[]);
    function getEmployee(){
        fetch('http://localhost:3001')
        .then(response=>{
            return response.text();
        })
        .then(data=>{
            setEmployees(data);
        });

    }
    function createEmployee(){
        let firstname=prompt("Enter Employee firstname:");
        let lastname=prompt("Enter Employee lastname:");
        let empid=prompt("Enter Employee empid:");
        let department=prompt("Enter Department:");
        let dateofbirth=prompt("Enter date of birth of employee:");
        let age=prompt("Enter Age of the employee:");
        fetch('http://localhost:3001/employee',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify({firstname,lastname,empid,department,dateofbirth,age}),
        })
        .then(response=>{
            return response.text();
        })
        .then(data=>{
            alert(data);
            getEmployee();
        });
    }
    function deleteEmployee(){
        let empid=prompt('Enter Employee id');
        fetch(`http://localhost:3001/employee/${empid}`,{
            method:'DELETE',
        })
        .then(response=>{
            return response.text();
        })
        .then(data=>{
            alert(data);
            getEmployee();
        });
    }
    return(
        <div>
           {employees ? employees : 'There is no employee data available'}
           <br/>
           <button onClick={createEmployee}>Add Employee</button> 
           <br/>
           <button onClick={deleteEmployee}>Delete Employee</button>
           <br/>
           <button onClick={getEmployee}>Get Employee</button> 
        </div>
    );
}
export default App;