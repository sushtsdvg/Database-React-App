const express=require("express");
const app=express();
const port=3001
const employee=require('./db');
const cors=require("cors");
//const pool=require("./db");
//const { response } = require("express");
//middleware
app.use(cors());
app.use(express.json());
app.use(function(req,res,next){
    res.setHeader('Access-Control-Allow-Origin','http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers','Content-Type,Access-Control-Allow-Headers');
    next();
});
app.get('/',(req,res)=>{
    employee.getEmployee()
    .then(response=>{
        res.status(200).send(response);
    })
    .catch(error=>{
        res.status(500).send(error);
    })
})
app.delete('/employee/:id',(req,res)=>{
    employee.deleteEmployee(req.params.id)
    .then(response=>{
        res.status(200).send(response);
    })
    .catch(error=>{
        res.status(500).send(error);
    })
})
app.listen(port,()=>{
    console.log(`App running on port ${port}.`)
})

//ROUTES


//CREATE A EMPLOYEE
//app.post("/employee",async(req,res)=>{
//   try{
//        const{firstname}=req.body;
//        const newEmployee=await pool.query("INSERT INTO EMPLOYEE (firstname) values($1) Returning *",[firstname]);
//        res.json(newEmployee.rows[0]);
//    }catch(err){
//        console.error(err.message);
//    }
//})

//GET ALL EMPLOYEES
//app.get("/employee",async (req,res)=>{
//    try{
//        console.log(req.params);
//        const allEmployees=await pool.query("SELECT * FROM EMPLOYEE");
//        res.json(allEmployees.rows);
//    }catch(err){
//      console.error(err.message)
   
//   }
//})

//GET AN EMPLOYEE
//app.get("/employee/:id",async(req,res)=>{
//    try{
//        const {id}=req.params;
//        const employee=await pool.query("SELECT * FROM employee  WHERE empid=$1",[id] );
//        const employee1=await pool.query("SELECT * FROM employee WHERE firstname=$2",[firstname]);
//        res.json(employee.rows[0]);
//        res.json(employee1.rows[0]);
//    }catch(err){
//        console.error(err.message)
//    }
//})

//UPDATE A EMPLOYEE
//app.put("/employee/:id",async(req,res)=>{
//    try{
//       const {id}=req.params;
//       const {department}=req.body; 
//       const updateEmployee=await pool.query("UPDATE employee SET department=$1 WHERE empid=$2",[department,id]);
//       res.json("Employee was updated");
//    }catch(err){
//        console.error(err.message)
//    }
//})

//DELETE A EMPLOYEE
//app.delete("/employee/:id",async(req,res)=>{
//    try {
//       const{id}=req.params;
//       const deleteEmployee=await pool.query("DELETE FROM employee WHERE empid=$1",[id]);
//       res.json("Employee was deleted");
//    } catch (err) {
//        console.log(err.message)
//    }
//})
//app.listen(5000,()=>{
//    console.log("Server has started on port 5000");
//});
//app.listen(3000,()=>{
//    console.log(`Server has started on port ${port}`);
//});