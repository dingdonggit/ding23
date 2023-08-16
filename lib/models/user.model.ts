import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: String,
  bio: String,
  category: String,
  subCategory: String,
  projects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },
  ],
  onboarded: {
    type: Boolean,
    default: false,
  },
  organizations: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
    },
  ],
//   teams: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Team",
//     },
// ],
// collaborators: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Collaborator",
//     },
// ],
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;