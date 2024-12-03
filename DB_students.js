const Sequelize = require('sequelize')
const {where} = require('sequelize')
const sequelize = new Sequelize('crud' , 'postgres' , 'Saman1384' , {
    dialect: 'postgres',
    host: 'localhost',
    post: 5432,
    underscored: true
})
const students_table = sequelize.define(`students_tables`, {
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
    },
    Owner_id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false
    }
})
students_table.sync().then(()=>{
    console.log('Students database connected succesfuly')}).catch(err=>{
        console.log('Failed to connect to students database')
    })
async function DB_students_add(student , owner_id){
    await students_table.create({Name:student.Name , Family:student.Family , Id:student.Id 
        , Date_of_birth:student.Date_of_birth , Major:student.Major 
        , University:student.University , Owner_id:owner_id}).then(()=>{
            console.log('Data added succesfuly')
        }).catch(err=>{
            console.log('Failed to added data')
        })
}
async function DB_students_data(x){
    let user = (await students_table.findAll({where:{Owner_id:x}}))
    if(user){
        return user
    }else{
        return null
    }
}

async function DB_students_update(student){
    students_table.update({Name:student.Name , Family:student.Family
        , Date_of_birth:student.Date_of_birth , Major:student.Major 
        , University:student.University} , {where : {Id : student.Id}}).then(()=>{
        console.log('Data updated succesfuly')
        }).catch(()=>{
            console.log('Failed to update data')
        })   
}

async function DB_students_delete(student){
    students_table.destroy({where : {Id : student.Id}}).then(()=>{
        console.log('Data destroyed completely')
    }).catch(()=>{
        console.log('Failed to destroy data')
    })
}



module.exports = {students_table , DB_students_data , DB_students_delete , DB_students_update , DB_students_add}