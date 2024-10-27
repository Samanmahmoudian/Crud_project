const Sequelize = require('sequelize')
const sequelize = new Sequelize('postgres','postgres','Saman1384',{
    host:'localhost',dialect:'postgres'
})
const Users = sequelize.define('Students' , {
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
const Login = sequelize.define('Login' , {
    Username:{
        type: Sequelize.STRING,
        allowNull: false,
        uniqe: true
    },
    Password:{
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false
    }
})
module.exports = {Users , sequelize , Login}