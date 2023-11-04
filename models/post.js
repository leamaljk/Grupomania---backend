const Sequelize = require('sequelize');
const sequelize = require("../config/db.config"); // bring in the database

// Post model definition
const Post = sequelize.define("Post", {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  userId: {
    type: Sequelize.UUID,
    allowNull: false,
  },
  mediaUrl: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  message: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  usersRead: {
    type: Sequelize.ARRAY(Sequelize.INTEGER),
    allowNull: true,
  }  
}, 
{
  tableName: 'Posts', 
});
module.exports = Post;
