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

<<<<<<< HEAD


//create post
=======
// //create post (this one was working)
>>>>>>> 09845a3eaf7551a582a729da5a723957f2a04d70
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
<<<<<<< HEAD
      console.log("Data being inserted:", postData);

      // Inserting the data into the database
      const post = await Post.create(postData);
      res.status(201).json(post);
    } else {
    const postObject = req.body;
=======

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
>>>>>>> 09845a3eaf7551a582a729da5a723957f2a04d70
      const postData = {
        userId: postObject.userId,
        mediaUrl: null,
        title: postObject.title,
        message: postObject.message,
        usersRead: [postObject.userId],
      };
<<<<<<< HEAD
      // console.log("Data being inserted:", postData);
      // Inserting the data into the database
      const post = await Post.create(postData);
      res.status(201).json(post);
    }
  } catch (error) {
    console.error("Error:", error);
=======

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
>>>>>>> 09845a3eaf7551a582a729da5a723957f2a04d70
    res.status(400).json({
      error: error.message || error,
    });
  }
};


<<<<<<< HEAD



exports.userRead = async (req, res) => {
  const userId = parseInt(req.body.userId); 

  try {
=======
// users read array handling
exports.userRead = async (req, res) => {
  try {
    let userId = req.body.postUserId;
    userId = userId.replace(/^"|"$/g, '');  // Ensure no extra quotes

    // Fetch post
>>>>>>> 09845a3eaf7551a582a729da5a723957f2a04d70
    const post = await Post.findOne({
      where: {
        id: req.params.id,
      },
    });

<<<<<<< HEAD
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
=======
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
>>>>>>> 09845a3eaf7551a582a729da5a723957f2a04d70
    return res.status(500).json({
      error: "An error occurred while processing your request.",
    });
  }
};



<<<<<<< HEAD


=======
>>>>>>> 09845a3eaf7551a582a729da5a723957f2a04d70
