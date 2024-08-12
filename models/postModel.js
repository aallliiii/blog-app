import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  nameUser: {
    type: String,
    required: true,
  },
});

const postModel = mongoose.models.posts || mongoose.model("posts", postSchema);

export default postModel;
