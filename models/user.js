
const {Sequelize, DataTypes} = require('sequelize');
const sequelize = require('../config/db.config');


const User = sequelize.define("User", {
  id: {
   type: DataTypes.UUID,
   defaultValue: DataTypes.UUIDV4,
   primaryKey: true
  },
  // firstname: {
  //   type: DataTypes.STRING,
  //   allowNull: false,
  // },
  // lastname: {
  //   type: DataTypes.STRING,
  //   allowNull: false,
  // },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
  // position: {
  //   type: DataTypes.STRING,
  //   allowNull: false,
  // }
  
});
module.exports = User;

/*
  firstName: {
    type: DataTypes.STRING,
  },

  lastName: {
    type: DataTypes.STRING,
  },
  
*/

/*
<div class="input-box">            
            <input type="text" placeholder="First Name" required>
            <i class="fa-solid fa-user"></i>
        </div>
        <div class="input-box">
            <input type="password" placeholder="Last Name" required>
            <i class="fa-solid fa-user"></i>
        </div>
*/
