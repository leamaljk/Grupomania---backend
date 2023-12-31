const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer-config');
const auth = require('../middleware/auth');
const postCtrl = require('../controllers/post');


router.get('/', postCtrl.getAllPosts);
router.get('/singlepost/:id', postCtrl.getOne);
router.post('/',  multer, postCtrl.createPost);
<<<<<<< HEAD
router.put('/:id', postCtrl.userRead);
=======
router.put('/:id', auth, postCtrl.userRead);
>>>>>>> 09845a3eaf7551a582a729da5a723957f2a04d70


module.exports = router;