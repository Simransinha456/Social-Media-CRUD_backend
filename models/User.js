import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
 username: { type: String, unique: true, required: true },
 password: { type: String },
 phoneNumber: {type: Number},
 email: {type: String,},
 });

 const Auth = mongoose.model('Auth', UserSchema);
 export default Auth; 














 

//  $ * * *
//  * $   *
//  *   $ *
//  * * * $
