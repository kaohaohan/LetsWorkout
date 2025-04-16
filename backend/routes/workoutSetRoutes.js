import express from "express";
import Exercise from "../models/Exercise.js";
import WorkoutSet from "../models/WorkoutSet.js";
import Workout from "../models/Workout.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { exerciseId, workoutName, sets } = req.body;
  if (!exerciseId || !Array.isArray(sets) || sets.length === 0) {
    return res.status(400).json({ message: "Missing required fields." });
  }
  try {
    const workoutSet = new WorkoutSet({
      exerciseId,
      workoutName: workoutName || "Workout",
      sets,
      date: new Date(),
    });

    const savedWorkoutSet = await workoutSet.save();
    res.status(201).json({
      success: true,
      message: "Workout set added successfully",
      workoutSet: savedWorkoutSet,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 1. 獲取訓練詳情 歷史紀錄可能需要？

router.get("/:id", async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id).populate({
      path: "exercises",
      populate: {
        path: "exerciseId",
        model: "Exercise",
      },
    });

    res.json(workout);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
