const { request } = require("express");

const Pool=require("pg").Pool;
const pool=new Pool({
    user:"postgres",
    password:"sush",
    host:"localhost",
    port:5432,
    database:"Employee"
});
const getEmployee=()=>{
    return new Promise(function(resolve,reject){
        pool.query('SELECT * FROM employee ORDER BY empid',(error,results)=>{
            if(error){
                reject(error)
            }
            resolve(results.rows)
        })
    })
}
const createEmployee=(body)=>{
    return new Promise(function(resolve,reject){
        const{firstname,lastname,empid,department}=body
        pool.query('INSERT INTO employee(firstname,lastname,empid,department) VALUES ($1,$2,$3,$4) RETURNING *',[firstname,lastname,empid,department],(error,results)=>{
            if(error){
                reject(error)
            }
            resolve(`A new Employee has been added:${results.rows[0]}`)
        })
    })
}
const deleteEmployee=()=>{
    return new Promise(function(resolve,reject){
        const empid=parseInt(request.params.empid)
        pool.query('DELETE FROM employee WHERE empid=$1',[empid],(error,results)=>{
            if(error){
                reject(error)
            }
            resolve(`Employee deleted with ID:${empid}`)

        })
    })
}
module.exports={
    getEmployee,
    createEmployee,
    deleteEmployee,
}