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
<<<<<<< HEAD
}, 
{
  tableName: 'Posts', 
});
module.exports = Post;
=======
}, {
  tableName: 'Posts', 
});
module.exports = Post;


// Synchronizing the model with the database

// (async () => {
//   try {
//     await Post.sync({ force: true });
//     console.log('Database & tables created!');
//   } catch (error) {
//     console.error('Error synchronizing the database:', error);
//   }
// })();
>>>>>>> 09845a3eaf7551a582a729da5a723957f2a04d70
