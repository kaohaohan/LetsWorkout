import mongoose from "mongoose";

const workoutSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "Workout",
  },
  // 時間相關欄位
  startTime: {
    type: Date,
    required: true,
    default: Date.now, // 預設為創建時的時間
  },
  endTime: {
    type: Date,
    default: null, // 完成時設置
  },
  duration: {
    type: Number, // 單位：秒
    default: 0, // 完成時計算
  },
  // 訓練內容
  exercises: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "WorkoutSet",
    },
  ],
  // 其他欄位
  notes: {
    type: String,
    default: "",
  },
  photoUrl: {
    type: String,
    default: "",
  },
  status: {
    type: String,
    enum: ["in_progress", "completed"],
    default: "in_progress",
  },
});

// 自動計算訓練時長的方法
workoutSchema.methods.calculateDuration = function () {
  if (this.startTime && this.endTime) {
    // 計算時間差（毫秒）並轉換為秒
    this.duration = Math.floor((this.endTime - this.startTime) / 1000);
    return this.duration;
  }
  return 0;
};

// 完成訓練的方法
workoutSchema.methods.finish = function () {
  this.endTime = new Date();
  this.status = "completed";
  this.calculateDuration();
};

// 取消訓練的方法
workoutSchema.methods.cancel = function () {
  this.status = "cancelled";
};

export default mongoose.model("Workout", workoutSchema);
