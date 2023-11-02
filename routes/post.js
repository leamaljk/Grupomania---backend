const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer-config');
const auth = require('../middleware/auth');
const postCtrl = require('../controllers/post');


router.get('/', postCtrl.getAllPosts);
router.get('/singlepost/:id', postCtrl.getOne);
router.post('/',  multer, postCtrl.createPost);
router.put('/:id', auth, postCtrl.userRead);


module.exports = router;