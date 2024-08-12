import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  imageUrl: {
    type: String,
  },
});

const userModel = mongoose.models.Users || mongoose.model("Users", UserSchema);

export default userModel;
