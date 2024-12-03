const express = require("express")
const {users_table , DB_check_user , DB_create_user , DB_users_datas} = require('./DB_users')
const {students_table, DB_students_data , DB_students_add , DB_students_update , DB_students_delete} = require('./DB_students')
const {test} = require('./test_DB')
const cors = require("cors") 
const port = 1111
const app = express() 
app.use(express.json()) 
app.use(express.urlencoded())
app.use(cors())
app.listen(port , ()=>{ 
    console.log(`connected to port ${port}`) 
})

let students = null
let owner_id = false
let x = {User:'saman' , Pass:'1234'}


app.post('/signup' , async (req,res)=>{
    if(req.body.User && req.body.Pass && await DB_create_user(req.body) != false){
        await DB_create_user(req.body)
        res.send('done')
    }else{
        res.send('failed')
    }
})


app.post('/login_check' , async(req,res)=>{
    let user = await DB_check_user(req.body)
    if(user){
        owner_id = await user.Id
        await reload_data()
        res.send('done')
        await run_table() 
    }else{
        res.send('failed')
    }
})
async function reload_data(){
    app.get('/students' , async(req , res)=>{
        students =  (await DB_students_data(owner_id))
        res.send(await students)
    })
}
async function run_table(){
    await reload_data()
    app.get('/students/:id' ,async (req , res)=>{
        const student = await students.find(x => x.Id == Number(req.params.id))
        if (!student) {res.status(404).send("Data is not given...")}
        else{res.send(student)}
    })
    app.post("/students" , async(req , res) => {
        return new Promise((resolve)=>{
            const student = {
                Name : req.body.Name , 
                Family : req.body.Family,
                Id : req.body.Id,
                Date_of_birth : req.body.Date_of_birth,
                Major : req.body.Major,
                University : req.body.University,
                Owner_id : owner_id
                
            }
            resolve(student)
        }).then(async (student)=>{
            await DB_students_add(student , owner_id)
            await reload_data()
            res.send('done')
        }).catch((err)=>{
            console.log(err)
        })
    })
    app.delete("/students/:id" , async (req , res) => {
        const student = await students.find(x => x.Id == Number(req.params.id))
        await DB_students_delete(student)
        await reload_data()
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
                student.University = req.body.University,
                student.Owner_id = owner_id

            }
            resolve(student)
        }).then(async (student)=>{
            await DB_students_update(student)
            await reload_data()
            res.send('done')
        }).catch(()=>{
            res.send('failed')
        })

    })


}
