const express = require("express")
const Sequelize = require('sequelize')
const {where} = require('sequelize')
const cors = require("cors") 
const port = 1111
const app = express() 
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

const users_table = sequelize.define('users' , {
    Username:{ 
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    Password:{
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    }
})
users_table.sync().then(()=>{
    console.log('Users loaded sucessfuly')
})
function create_user(user){
    users_table.create({Username: user.User , Password: user.Pass}).then(()=>{
        console.log('User added sunccesfuly')
    }).catch(()=>{
        console.log('User added failed')
    })
}

app.post('/signup' , async (req , res)=>{
    if(req.body.User && req.body.Pass){
        let x = new Promise(resolve=>{
            create_user(req.body)
            resolve()
        }).then(()=>{
            app.get('/signup' , (req,res)=>{
                res.send('done')
            })
        })
    }
})

let students = null

let login_state = false

let pr = new Promise((resolve)=>{
    app.post('/login_check' , (req,res)=>{
        
        if (users_table.findOne({where : {
            Username: req.body.User , Password: req.body.Pass
        }})){
            login_state = req.body.User

            const table = sequelize.define(`${login_state}_tables`, {
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
            app.get('/login_check' , (req,res)=>{
                res.send('done')
            })
            
            table.sync().then(()=>{
                console.log('Database connected succesfuly')}).catch(err=>{
                    console.log('Failed to connect to database')
                })
            resolve(table)
        }
    })
}).then(async (table)=>{
    app.get('/students' , async(req , res)=>{
        students =await table.findAll()
        res.send(students)
    })
    app.get('/students/:id' ,async (req , res)=>{
        const student = await students.find(x => x.Id == Number(req.params.id))
        if (!student) {res.status(404).send("Data is not given...")}
        else{res.send(student)}
    })
    function add_student(student){
        table.create({Name:student.Name , Family:student.Family , Id:student.Id 
            , Date_of_birth:student.Date_of_birth , Major:student.Major 
            , University:student.University}).then(()=>{
                console.log('Data added succesfuly')
            }).catch(err=>{
                console.log('Failed to added data')
            })
    }
    
    app.post("/students" , async(req , res) => {
        await new Promise((resolve)=>{
            const student = {
                Name : req.body.Name , 
                Family : req.body.Family,
                Id : req.body.Id,
                Date_of_birth : req.body.Date_of_birth,
                Major : req.body.Major,
                University : req.body.University
            }
            resolve(student)
        }).then((student)=>{
            add_student(student)
            students.push(student)
            res.send(student)
        })

    })
    app.delete("/students/:id" , async (req , res) => {
        const student = await students.find(x => x.Id == Number(req.params.id))
        table.destroy({where : {Id : student.Id}})
        students.splice(students.indexOf(student) , 1)
        console.log("Data deleted succesfully...")
        res.send('done')
        
    })
    app.put("/students/:id" , async(req , res) => {
        const student = await students.find(x => x.Id == Number(req.params.id))
        let request = new Promise((resolve)=>{
            if (!student) {res.status(404).send("Data is not given...")}
            else{
                student.Name = req.body.Name,
                student.Family = req.body.Family,
                student.Id = req.body.Id,
                student.Date_of_birth = req.body.Date_of_birth,
                student.Major = req.body.Major,
                student.University = req.body.University
            }
            resolve(student)
        }).then((student)=>{
            table.update({Name:student.Name , Family:student.Family
            , Date_of_birth:student.Date_of_birth , Major:student.Major 
            , University:student.University} , {where : {Id : student.Id}}).then(()=>{
            console.log('Data updated succesfuly')
            students = table.findAll() 
            res.send('done')
            }).catch(err=>{
                console.log('Failed to update data')
            })   
        })

    })


})




