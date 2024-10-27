const express = require("express")
const cors = require("cors") 
const app = express() 
const path = require("path")
const port = 1111
app.use(express.json()) 
app.use(express.urlencoded())
app.use(cors())

 

app.listen(port , ()=>{ 
    console.log('connected...') 
})

const {Users , sequelize , Login} = require('./DB')
const { where } = require("sequelize")

let students = null
let users = {User: 'saman' , Pass:'1234'}
let user = {}
let per = false
// async function creat_table(){
//     sequelize.sync().then(()=>{
//         console.log('Database connected succesfuly')}).catch(err=>{
//             console.log('Failed to connect to database')
//         })

//     reload_data()
// }
//     creat_table()


    
//     async function reload_data(){
//         students = await Users.findAll()
//         console.log(students)
//         get_data()
        
//     }

// function get_data(){
//     console.log(students)
//     app.get('/students' , (req , res)=>{
//         res.send(students)
//     })

    
//     app.get('/students/:id' , (req , res)=>{
//         const student = students.find(x => x.Id == Number(req.params.id))
//         if (!student) {res.status(404).send("Data is not given...")}
//         else{res.send(student)}
//     })
// }



//     function add_student(student){
//         Users.create({Name:student.Name , Family:student.Family , Id:student.Id 
//             , Date_of_birth:student.Date_of_birth , Major:student.Major 
//             , University:student.University}).then(()=>{
//                 console.log('Data added succesfuly')
//             }).catch(err=>{
//                 console.log('Failed to added data')
//             })
//     }


// app.post("/students" , (req , res) => {

//     const student = {
//         Name : req.body.Name , 
//         Family : req.body.Family,
//         Id : req.body.Id,
//         Date_of_birth : req.body.Date_of_birth,
//         Major : req.body.Major,
//         University : req.body.University
//     }
//     add_student(student)
//     students.push(student)
    
//     res.send(student)
   

    
// })
// app.put("/students/:id" , (req , res) => {
//     const student = students.find(x => x.Id == Number(req.params.id))
//     if (!student) {res.status(404).send("Data is not given...")}
//     else{

//             student.Name = req.body.Name,
//             student.Family = req.body.Family,
//             student.Id = req.body.Id,
//             student.Date_of_birth = req.body.Date_of_birth,
//             student.Major = req.body.Major,
//             student.Universityni = req.body.University
//     }
//     Users.update({Name:student.Name , Family:student.Family
//         , Date_of_birth:student.Date_of_birth , Major:student.Major 
//         , University:student.University} , {where : {Id : student.Id}}).then(()=>{
//             console.log('Data updated succesfuly')
//         }).catch(err=>{
//             console.log('Failed to update data')
//         })
// })
// app.delete("/students/:id" , (req , res) => {
//     const student = students.find(x => x.Id == Number(req.params.id))
//     Users.destroy({where : {Id : student.Id}})
  
//     students.splice(students.indexOf(student) , 1)
//     console.log("Data deleted succesfully...")
// })
app.post('/login' , async (req , res)=>{
    user = await {
        User: req.body.User,
        Pass: req.body.Pass
    }
    
})
app.get("/login" , async (req , res)=>{
    if(user.User){
        if(user.User == users.User && user.Pass == users.Pass){
            await res.send(user.User)
        }else{
           await res.send('error')
        }
    }else{
        res.send('EnterData')
    }

})
