const express = require("express")
const Sequelize = require('sequelize')
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

const sequelize = new Sequelize('crud' , 'postgres' , 'Saman1384' , {
    dialect: 'postgres',
    host: 'localhost',
    post: 5432,
    underscored: true
})

let students = null
let users = {User: 'saman' , Pass:'1234'}
let user_name = null



app.post('/login_check' , (req,res)=>{
    if (req.body.User == users.User && req.body.Pass == users.Pass){
        app.get('/login_status' , (req , res)=>{
            res.send('done')
        })

        const table = sequelize.define(`${req.body.User}_tables`, {
            Name:{
                type: Sequelize.STRING,
                allowNull: false
            },
            Family:{
                type: Sequelize.STRING,
                allowNull: false
            },
            Id:{
                type: Sequelize.INTEGER,
                primaryKey: true,
                allowNull: false
            },
            Date_of_birth:{
                type: Sequelize.DATEONLY,
                allowNull: false
            },
            Major:{
                type: Sequelize.STRING,
                allowNull: false
            },
            University:{
                type: Sequelize.STRING,
                allowNull: false
            }
        
        })

        
            function creat_table(){
                table.sync().then(()=>{
                    console.log('Database connected succesfuly')}).catch(err=>{
                        console.log('Failed to connect to database')
                    })
                    
                reload_data()
            }
                creat_table()
            
                async function reload_data(){
                    students = await table.findAll()
                    console.log(students)
                    
                    get_data()
                
                }
            function get_data(){
                console.log(students)
                app.get('/students' , (req , res)=>{
                    res.send(students)
                })
            
                app.get('/students/:id' , (req , res)=>{
                    const student = students.find(x => x.Id == Number(req.params.id))
                    if (!student) {res.status(404).send("Data is not given...")}
                    else{res.send(student)}
                })
            }



                 function add_student(student){
                    table.create({Name:student.Name , Family:student.Family , Id:student.Id 
                        , Date_of_birth:student.Date_of_birth , Major:student.Major 
                        , University:student.University}).then(()=>{
                            console.log('Data added succesfuly')
                        }).catch(err=>{
                            console.log('Failed to added data')
                        })
                }


            app.post("/students" , (req , res) => {

                const student = {
                    Name : req.body.Name , 
                    Family : req.body.Family,
                    Id : req.body.Id,
                    Date_of_birth : req.body.Date_of_birth,
                    Major : req.body.Major,
                    University : req.body.University
                }
                add_student(student)
                students.push(student)
            
                res.send(student)

            })
            app.put("/students/:id" , (req , res) => {
                const student = students.find(x => x.Id == Number(req.params.id))
                if (!student) {res.status(404).send("Data is not given...")}
                else{

                        student.Name = req.body.Name,
                        student.Family = req.body.Family,
                        student.Id = req.body.Id,
                        student.Date_of_birth = req.body.Date_of_birth,
                        student.Major = req.body.Major,
                        student.University = req.body.University
                }
                table.update({Name:student.Name , Family:student.Family
                    , Date_of_birth:student.Date_of_birth , Major:student.Major 
                    , University:student.University} , {where : {Id : student.Id}}).then(()=>{
                        console.log('Data updated succesfuly')
                        res.send('done')
                    }).catch(err=>{
                        console.log('Failed to update data')
                    })
            })
            app.delete("/students/:id" , (req , res) => {
                const student = students.find(x => x.Id == Number(req.params.id))
                table.destroy({where : {Id : student.Id}})
                students.splice(students.indexOf(student) , 1)
                console.log("Data deleted succesfully...")
                res.send('done')
                
            })



    }else{
        app.get('/login_status' , (req,res)=>{
            res.send('failed')
        })
    }
})








