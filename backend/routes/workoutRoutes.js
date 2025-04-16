import express from "express";
import Workout from "../models/Workout.js";
import WorkoutSet from "../models/WorkoutSet.js";
const router = express.Router();
//使用者點擊「Start Empty Workout」按鈕時：
//就會發一個 POST /api/workouts，這時 前端根本還沒填任何組數、重量、notes 等等東西
router.post("/", async (req, res) => {
  try {
    const workout = new Workout({
      name: req.body.name || "Workout",
      notes: req.body.notes || "",
      startTime: new Date(),
      status: "in_progress",
    });
    const savedWorkout = await workout.save();
    res.status(201).json({
      success: true,
      message: "Workout created successfully",
      workout: savedWorkout,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create workout",
      error: error.message,
    });
  }
});

//使用者點擊「Finish Workout」按鈕時：
//就會發一個 PUT /api/workouts/:id，這時 前端會把該workout 的組數、重量、notes 等等東西填好
router.put("/:id/finish", async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id);
    if (!workout) {
      return res.status(404).json({
        success: false,
        message: "Workout not found",
      });
    }

    workout.endTime = new Date();
    workout.duration = Math.floor((workout.endTime - workout.startTime) / 1000);
    workout.status = "completed";
    await workout.save();

    // 加入 populate 以返回完整資料
    const completedWorkout = await Workout.findById(workout._id).populate({
      path: "exercises",
      populate: {
        path: "exerciseId",
        model: "Exercise",
      },
    });

    res.status(200).json({
      success: true,
      message: "Workout finished successfully",
      workout: completedWorkout,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to finish workout",
      error: error.message,
    });
  }
});

//使用者點擊 Cancel Wokrout 按鈕時：
//就會發一個 put /api/workouts/:id/cancel，
//
router.delete("/:id/cancel", async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id);
    if (!workout) {
      return res
        .status(404)
        .json({ success: false, message: "Workout not found" });
    }
    await WorkoutSet.deleteMany({ _id: { $in: workout.exercises } });
    await Workout.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Workout deleted (cancelled) successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to cancel workout",
      error: error.message,
    });
  }
});

export default router;
