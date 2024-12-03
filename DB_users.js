const Sequelize = require('sequelize')
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
    },
    Id:{
        type: Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement: true
    }

})
users_table.sync().then(()=>{
    console.log('Users loaded sucessfuly')
})

async function DB_check_user(x){
    let user = await users_table.findOne({where:{Username: x.User , Password: x.Pass}})
    return user
    
    
}

async function DB_users_datas(){
    users_table.findAll()
    .then(users => {
      console.log(users)
    })
    .catch(error => {
      console.error(error);
    });
}

async function DB_create_user(user){
    if(!await DB_check_user(user)){
        users_table.create({Username: user.User , Password: user.Pass}).then(()=>{
            console.log('User added sunccesfuly')
        }).catch((err)=>{
            console.log(err)
        })
    }else{
        console.log('failed to add similar user')
        return false
    }
}

module.exports = {users_table , DB_check_user , DB_create_user , DB_users_datas}
