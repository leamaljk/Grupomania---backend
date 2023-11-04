const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

//sign up
exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then(
    (hash) => {

      const user = new User({
        email: req.body.email,
        password: hash
      });
      console.log(user);
      user.save().then(
        () => {
          res.status(201).json({ //created
            message: 'User added successfully!'
          });
        }
      ).catch(
        (error) => {
          res.status(500).json({ //500 – Internal Server Error
            error: error
          });
        }
      );
    }
  );
};



exports.login = (req, res, next) => {
  User.findOne({ where: { email: req.body.email } })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "User not found !" });
      }
      bcrypt.hash(req.body.password, 10).then((hash) => {
        bcrypt
          .compare(req.body.password, hash, User.password)
          .then((valid) => {
            if (!valid) {
              return res.status(401).json({ error: "Incorrect password !" });
            }
            res.status(200).json({
              userId: user.id,
              password: user.password,
              token: jwt.sign({ userId: User._id }, "RANDOM_TOKEN_SECRET", {
                expiresIn: "24h",
              }),
            });
          })
          .catch((error) => {
            console.log(error.stack);
            res.status(400).json({
              error: error.message || error,
            });
          });
      });
    })
    .catch((error) => {
      console.log(error.stack);
      res.status(400).json({
        error: error.message || error,
      });
    });
};

// delete user
exports.deleteUser = (req, res, next) => {
  const userId = req.params.id;

  if (!userId) {
    return res.status(400).json({
      error: "Invalid user ID",
    });
  }

  User.destroy({ where: { id: userId } })
    .then(() => {
      res.status(200).json({
        message: "Deleted user!",
      });
    })
    .catch((error) => {
      console.error(error.stack);
      res.status(400).json({
        error: error.message || error,
      });
    });
};
