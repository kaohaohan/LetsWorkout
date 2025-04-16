import mongoose from "mongoose";

const workoutSetSchema = new mongoose.Schema({
  exerciseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Exercise",
    required: true,
  },
  workoutName: {
    type: String,
    default: "Workout",
  },
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  // 訓練組數記錄
  sets: [
    {
      weight: {
        type: Number,
        required: true,
      },
      reps: {
        type: Number,
        required: true,
      },
      isPersonalRecord: {
        type: Boolean,
        default: false,
      },
    },
  ],
  // 計算欄位
  calculated1RM: {
    type: Number,
  },
  totalVolume: {
    type: Number,
  },
});

// 前置保存鉤子自動計算 1RM 和 volume
//每當你 workoutSet.save() 時，它都會自動先跑這段程式碼，再去真的把資料存進 MongoDB。
workoutSetSchema.pre("save", function (next) {
  // 計算總訓練量
  this.totalVolume = this.sets.reduce(
    (sum, set) => sum + set.weight * set.reps,
    0
  );

  // 計算最大 1RM（使用 Brzycki 公式: weight * (36 / (37 - reps))）
  const oneRMs = this.sets.map((set) => set.weight * (36 / (37 - set.reps)));
  this.calculated1RM = Math.max(...oneRMs);

  next();
});

export default mongoose.model("WorkoutSet", workoutSetSchema);
