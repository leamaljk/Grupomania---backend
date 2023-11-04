const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const multer = require('../middleware/multer-config');
const auth = require('../middleware/auth');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
<<<<<<< HEAD
=======
// router.get("/:id", auth, userCtrl.findOne);
>>>>>>> 09845a3eaf7551a582a729da5a723957f2a04d70
router.delete("/:id", auth, userCtrl.deleteUser);


module.exports = router;