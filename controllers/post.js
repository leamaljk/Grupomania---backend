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

// //create post (this one was working)
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

      // Log the data before the insertion
      console.log("Data being inserted:", postData);

      // Insert the data into the database
      const post = await Post.create(postData);

      // If the insertion is successful, send a success response
      res.status(201).json(post);
    } else {
      // Handle the case when there's no file attached
      // This part assumes the case when `req.file` is not present
      // Insert the post data without mediaUrl
      const postObject = req.body;
      const postData = {
        userId: postObject.userId,
        mediaUrl: null,
        title: postObject.title,
        message: postObject.message,
        usersRead: [postObject.userId],
      };

      // Log the data before the insertion
      console.log("Data being inserted:", postData);

      // Insert the data into the database
      const post = await Post.create(postData);

      // If the insertion is successful, send a success response
      res.status(201).json(post);
    }
  } catch (error) {
    // Log the specific error details for debugging
    console.error("Error:", error);

    // Send an error response to the client
    res.status(400).json({
      error: error.message || error,
    });
  }
};


// users read array handling
exports.userRead = async (req, res) => {
  try {
    let userId = req.body.postUserId;
    userId = userId.replace(/^"|"$/g, '');  // Ensure no extra quotes

    // Fetch post
    const post = await Post.findOne({
      where: {
        id: req.params.id,
      },
    });

    // If no post found, return a 400 error
    if (!post) {
      return res.status(400).json({
        error: "No post found",
      });
    }

    // Parse the stringified array
    const parsedUsersRead = JSON.parse(post.usersRead);
    const usersRead = [...parsedUsersRead];

    // Check if user has already read the post
    if (!usersRead.includes(userId)) {
      usersRead.push(userId);

      await post.update({ usersRead });
      await post.save();

      return res.status(200).json({
        success: "Post read",
      });
    } else {
      return res.status(304).json({
        message: "Post already read by user",
      });
    }
  } catch (error) {
    console.error("Error reading post:", error.message);
    return res.status(500).json({
      error: "An error occurred while processing your request.",
    });
  }
};



