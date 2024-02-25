import express from 'express';
import PostImage from '../models/Post.js';
// import verifyToken from '../middleware/middleware.js'

const router = express.Router();

//  to create a new post image------------------
router.post('/post-images',   async (req, res) => {
  try {
    const { imageUrl, caption, phoneNumber, email } = req.body;
    const postImage = await PostImage.create({ imageUrl, caption, phoneNumber, email });
    // console.log(postImage)
    res.status(201).json(postImage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to get all post images---------------------------------
router.get('/post-images', async (req, res) => {
  try {
    const postImages = await PostImage.find();
    res.json(postImages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// Route to get a single post image by ID-----------------------------------
router.get('/post-images/:id', async (req, res) => {
  try {
    const postImage = await PostImage.findById(req.params.id);
    if (!postImage) {
      return res.status(404).json({ message: 'Post image not found' });
    }
    res.json(postImage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// Route to update a post image by ID-----------------------------------
router.put('/post-images/:id', async (req, res) => {
  try {
    const { imageUrl, caption } = req.body;
    const updatedPostImage = await PostImage.findByIdAndUpdate(req.params.id, { imageUrl, caption }, { new: true });
    if (!updatedPostImage) {
      return res.status(404).json({ message: 'Post image not found' });
    }
    res.json(updatedPostImage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});


// Route to delete a post image by ID--------------------------------------
router.delete('/post-images/:id', async (req, res) => {
  try {
    const deletedPostImage = await PostImage.findByIdAndDelete(req.params.id);
    if (!deletedPostImage) {
      return res.status(404).json({ message: 'Post image not found' });
    }
    res.json({ message: 'Post image deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});


// Define a route to set a cookie-----------------
router.get('/setcookie', (req, res) => {
  res.cookie('mycookie', 'HelloWorld', { maxAge: 900000, httpOnly: true });
  res.send('Cookie is set');
});

router.get('/getcookie', (req, res) => {
  const cookieValue = req.cookies.mycookie;
  res.send('Value of mycookie: ' + cookieValue);
});

export default router;
