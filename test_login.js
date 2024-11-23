const express = require('express')
const app = express()
const Sequezlie = require('sequelize')
const {where} = require('sequelize')
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


// login
app.post('/login_check' , (req,res)=>{
    const user = users_table.findOne({where:{
        Username: req.body.User , Password: req.body.Pass
    }})
    if(user){
        console.log('hello')
        
    }else('bye')
    
})