import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
       
    },
   
  },

   
);
const User = mongoose.models.Users || mongoose.model("Users", userSchema);
export default User;
 
