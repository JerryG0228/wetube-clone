import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true, uppercase: true, mmaxLength: 80 },
  fileUrl: { type: String, required: true },
  thumbUrl: { type: String, required: true },
  description: { type: String, required: true, trim: true, minLength: 20 },
  createdAt: { type: Date, required: true, default: Date.now },
  hashtags: [{ type: String }],
  meta: {
    views: { type: Number, default: 0, required: true },
  }, //ref를 통해 objectId가 User모델에서 온다는 것을 명시 해줌
  owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  comments: [{ type: mongoose.Schema.Types.ObjectId, required: true, ref: "Comment" }],
});

videoSchema.static("formatHashtags", (hashtags) => {
  return hashtags.split(",").map((word) => (word.trim().startsWith("#") ? word.trim() : `#${word.trim()}`));
});

const Video = mongoose.model("Video", videoSchema); // Create Model
export default Video;
