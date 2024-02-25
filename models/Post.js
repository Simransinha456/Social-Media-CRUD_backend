import mongoose from 'mongoose';

//  schema for post images
const postImageSchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  caption: {type: String},
  phoneNumber: { type: Number, required: true },
  email: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

// Create a model from the schema
const PostImage = mongoose.model('PostImage', postImageSchema);
export default PostImage; 
