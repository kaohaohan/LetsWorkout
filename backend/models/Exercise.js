import mongoose from "mongoose";

const exerciseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  bodyPart: {
    type: String,
    required: true,
    enum: ["chest", "back", "legs", "shoulders", "arms", "core"],
  },
  category: {
    type: String,
    enum: [
      "barbell",
      "dumbbell",
      "machine",
      "bodyweight",
      "cable",
      "kettlebell",
      "bands",
      "other",
    ],
    default: "other",
  },
  defaultReps: {
    type: Number,
    default: 10,
    min: 1,
  },
  description: {
    type: String,
    default: "",
  },
  imageUrl: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// 添加索引以提升查詢效能
exerciseSchema.index({ name: 1 });
exerciseSchema.index({ bodyPart: 1 });
exerciseSchema.index({ category: 1 });

export default mongoose.model("Exercise", exerciseSchema);
