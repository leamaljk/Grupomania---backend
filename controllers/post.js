const { title } = require('process');
const Post = require('../models/post');
const user = require('../models/user');
const fs = require('fs'); // file system - gives access to functions that allow you to modify the file system


exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.findAll();
    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({ error: 'Error fetching posts' });
  }
};


// get one post
exports.getOne = async (req, res) => {
  const post = await Post.findOne({
    where: {
      id: req.params.id,
    },
  });
  try {
    res.status(200).json(post);
  } catch (error) {
    console.log(error.stack);
    res.status(400).json({
      error: error.message || error,
    });
  }
};



//create post
exports.createPost = async (req, res) => {
  try {
    if (req.file != null) {
      console.log(req.body.post);
      const url = req.protocol + "://" + req.get("host");
      let userId = req.body.userId;
          userId = userId.replace(/^"|"$/g, ''); 
      let { title, message } = req.body;
      const postData = {
        userId,
        title,
        message,
        mediaUrl: url + "/images/" + req.file.filename,
        usersRead: [],
      };
      console.log("Data being inserted:", postData);

      // Inserting the data into the database
      const post = await Post.create(postData);
      res.status(201).json(post);
    } else {
    const postObject = req.body;
      const postData = {
        userId: postObject.userId,
        mediaUrl: null,
        title: postObject.title,
        message: postObject.message,
        usersRead: [postObject.userId],
      };
      // console.log("Data being inserted:", postData);
      // Inserting the data into the database
      const post = await Post.create(postData);
      res.status(201).json(post);
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(400).json({
      error: error.message || error,
    });
  }
};





exports.userRead = async (req, res) => {
  const userId = parseInt(req.body.userId); 

  try {
    const post = await Post.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!post) {
      return res.status(400).json({
        error: "No post found with the specified ID",
      });
    }

    let usersRead = post.usersRead ? post.usersRead : [];

    // Checks if userId is already in usersRead array
    if (!usersRead.includes(userId)) {
      usersRead.push(userId);
      await post.update({ usersRead }); // Updates post with new usersRead array
      return res.status(200).json({
        success: "Post marked as read",
      });
    } else {
      return res.status(304).json({
        message: "Post already marked as read by user",
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: "An error occurred while processing your request.",
    });
  }
};





